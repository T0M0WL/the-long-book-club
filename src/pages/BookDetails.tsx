import { useParams, Link, useLocation, Navigate } from 'react-router-dom';
import { books } from '../data/books';
import { getRoundedHours } from '../utils/formatLength';
import { collections } from '../data/collections';
import { BookCard } from '../components/BookCard';
import { FaClock } from 'react-icons/fa';
import { SEO } from '../components/SEO'; // Use Global SEO Component
import { slugify } from '../utils/slugify';
import { useSetHeaderTheme } from '../context/HeaderContext';
import { reviews } from '../data/reviews';
import SoundCheckCard from '../components/SoundCheckCard';
import Breadcrumbs from '../components/Breadcrumbs';
import AudiobookCommuteCalculator from '../components/AudiobookCommuteCalculator';
import AudiobookValueCalculator from '../components/AudiobookValueCalculator';

export const BookDetails = () => {
    useSetHeaderTheme({
        logoColor: 'var(--color-brand-coral)',
        textColor: 'var(--color-brand-coral)',
        hamburgerColor: 'var(--color-brand-coral)',
        activeLink: '',
        activeLinkBg: 'var(--color-brand-coral)',
        activeLinkText: 'var(--color-brand-slate)'
    });

    const { slug } = useParams<{ slug: string }>();
    const location = useLocation();
    // Backward compatibility: Find by slug (new) OR id (old)
    const book = books.find(b => b.slug === slug || b.id === slug);
    const review = book ? reviews[book.title] : undefined;

    // Determine previous page from state, default to Library/Home if direct access
    const from = location.state?.from;

    if (!book) {
        return (
            <div style={{ textAlign: 'center', padding: '6rem 1rem', color: 'var(--color-brand-forrest)' }}>
                <SEO title="Book Not Found" />
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem' }}>Book not found</h2>
                <Link to="/" style={{ color: 'var(--color-brand-coral)', textDecoration: 'underline' }}>Return Home</Link>
            </div>
        );
    }

    // Redirect old ID-based URLs to new Slug-based URLs
    if (slug === book.id && book.slug && slug !== book.slug) {
        return <Navigate to={`/book/${book.slug}`} replace />;
    }

    // Helper to convert "62h 48m" -> "PT62H48M" (ISO 8601)
    const formatDuration = (str: string) => {
        const parts = str.split(' ');
        let iso = 'PT';
        parts.forEach(p => iso += p.toUpperCase());
        return iso;
    };

    // Generate completely original SEO text, ignoring the Amazon description
    const rawNote = (review?.curatorNote || book.curatorNote || "").replace(/<[^>]*>?/gm, '');
    const seoDesc = book.teaser || book.cardOverview || (rawNote.length > 10 ? rawNote.substring(0, 150) + "..." : `Listen to ${book.title} by ${book.author}. ${getRoundedHours(book.length)} hours of epic narration.`);

    const structuredData = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Audiobook",
        "name": book.title,
        "author": [{
            "@type": "Person",
            "name": book.author
        }],
        "description": seoDesc,
        "datePublished": "2024", // Optional: We don't have this in data yet, could omit or add later
        "duration": formatDuration(book.length),
        "inLanguage": "en",
        "format": "AudiobookFormat",
        "url": `https://thelongbookclub.com/book/${book.slug}`,
        "image": `https://thelongbookclub.com${book.coverUrl}`,
        "offers": {
            "@type": "Offer",
            "price": "0.00", // Subscription model indicator or actual price
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": book.affiliateLink
        },
        ...(book.narrator && {
            "readBy": {
                "@type": "Person",
                "name": book.narrator
            }
        })
    });

    return (
        <div className="book-details-container" style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '0 2rem 6rem 2rem',
            animation: 'fadeIn 0.5s ease'
        }}>
            <SEO
                title={`${book.title} by ${book.author}`}
                description={seoDesc}
                image={book.coverUrl}
                canonical={`https://thelongbookclub.com/book/${book.slug}`}
                type="book"
                schema={structuredData}
            />

            {/* Breadcrumb */}
            {/* Breadcrumb Navigation - Clears fixed header */}
            <Breadcrumbs items={[
                { label: 'Home', path: '/' },
                from ? { label: from.label, path: from.path } : { label: 'Long Book Finder', path: '/' },
                { label: book.title }
            ]} />

            <div className="book-details-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(300px, 350px) 1fr',
                gap: '4rem',
                alignItems: 'start'
            }}>

                {/* Left Column: Cover & Meta & CTAs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ position: 'relative' }}>
                        <img
                            src={book.coverUrl}
                            alt={`Cover of ${book.title}`}
                            loading="eager"
                            style={{
                                width: '100%',
                                borderRadius: '0',
                                border: '1px solid rgba(0,0,0,0.05)'
                            }}
                        />

                        {/* Length Badge - Matched to BookCard (Overlapping Circle) */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            transform: 'translate(-50%, 50%)',
                            width: '100px', // Slightly larger than card (90px)
                            height: '100px',
                            background: 'var(--color-brand-forrest)',
                            border: '8px solid var(--color-brand-coral)',
                            borderRadius: '50%',
                            color: 'var(--color-brand-cloud)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 10,
                            lineHeight: 1
                        }}>
                            <FaClock size={12} style={{ opacity: 0.9, marginBottom: '4px' }} />
                            <span style={{
                                fontSize: '2rem',
                                fontWeight: 400,
                                fontFamily: 'var(--font-serif-accent)',
                                letterSpacing: '-0.03em',
                                lineHeight: '0.9',
                                marginTop: '0'
                            }}>{getRoundedHours(book.length)}</span>
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                fontFamily: 'Inter, sans-serif',
                                opacity: 0.9,
                                marginTop: '2px'
                            }}>hours</span>
                        </div>
                    </div>

                    {/* CTAs Moved Here */}
                    <div className="audible-cta-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', marginTop: '4rem' }}>
                        <div className="audible-buttons-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                            {book.affiliateLink && (
                                <a
                                    href={book.affiliateLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        backgroundColor: 'var(--color-primary)',
                                        color: '#fff',
                                        padding: '1rem 1.5rem',
                                        borderRadius: '2rem',
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        textDecoration: 'none',
                                        transition: 'background-color 0.2s',
                                        width: '100%'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
                                >
                                    <img src="/flags/uk.png" alt="UK" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: 'none' }} />
                                    Listen on Audible UK
                                    <img src="/audible-chevron.png" alt="" style={{ width: '21px', height: 'auto' }} />
                                </a>
                            )}

                            {book.affiliateLinkUS && (
                                <a
                                    href={book.affiliateLinkUS}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        backgroundColor: 'var(--color-primary)',
                                        color: '#fff',
                                        padding: '1rem 1.5rem',
                                        borderRadius: '2rem',
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        textDecoration: 'none',
                                        transition: 'background-color 0.2s',
                                        width: '100%'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
                                >
                                    <img src="/flags/us.png" alt="US" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: 'none' }} />
                                    Listen on Audible US
                                    <img src="/audible-chevron.png" alt="" style={{ width: '21px', height: 'auto' }} />
                                </a>
                            )}
                        </div>

                        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-brand-forrest)', fontWeight: 'bold', textAlign: 'center' }}>
                            *A free trial is available for non members.
                        </p>
                    </div>

                    {/* Audiobook Commute Calculator Widget */}
                    <div style={{ marginTop: '2rem', width: '100%' }}>
                        <AudiobookCommuteCalculator initialBookLength={book.length} />
                    </div>

                    {/* Audiobook Value Calculator Widget */}
                    <div style={{ width: '100%' }}>
                        <AudiobookValueCalculator initialBookLength={book.length} />
                    </div>
                </div>

                {/* Right Column: Content */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    textAlign: 'left'
                }}>

                    {/* Genre Pill - Matched to BookCard */}
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        {(Array.isArray(book.genre) ? book.genre : [book.genre]).map((g, i) => (
                            <Link key={i} to={`/genre/${slugify(g)}`} style={{ textDecoration: 'none' }}>
                                <div style={{
                                    padding: '0.25rem 0.75rem',
                                    backgroundColor: 'var(--color-brand-forrest)',
                                    color: 'var(--color-brand-cloud)',
                                    borderRadius: '1rem',
                                    fontSize: '0.75rem',
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 700,
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase',
                                    display: 'inline-block',
                                    transition: 'background-color 0.2s',
                                    whiteSpace: 'nowrap' // Prevent breaking inside the pill
                                }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.backgroundColor = '#2a4a3d';
                                        e.currentTarget.style.color = 'var(--color-brand-coral-light)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.backgroundColor = 'var(--color-brand-forrest)';
                                        e.currentTarget.style.color = 'var(--color-brand-cloud)';
                                    }}
                                >
                                    {g}
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Titles - Matched to BookCard */}
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                        marginBottom: '0.5rem',
                        lineHeight: 1.1,
                        fontFamily: 'var(--font-serif-accent)', // Fraunces
                        color: 'var(--color-brand-forrest)',
                        fontWeight: 500
                    }}>
                        {book.title}
                    </h1>
                    <h2 style={{
                        color: 'var(--color-brand-forrest)',
                        marginBottom: '2.5rem'
                    }}>
                        {book.author}
                    </h2>

                    {/* Content Logic: Curator Note vs Publisher Summary */}
                    {review?.curatorNote || book.curatorNote ? (
                        <>
                            {/* Curator's Note (SEO Hook) */}
                            <h2 style={{
                                color: 'var(--color-brand-forrest)',
                                marginBottom: '1.5rem',
                                fontWeight: 700,
                                alignSelf: 'flex-start',
                                textAlign: 'left',
                                width: '100%'
                            }}>
                                {review?.curatorTitle || book.curatorTitle || "Why this is the best long audiobook for your credit"}
                            </h2>

                            {/* SoundCheck Feature Card - New High Position */}
                            {review?.soundCheck && review?.narrator && (
                                <SoundCheckCard
                                    narrator={review.narrator}
                                    soundCheckText={review.soundCheck}
                                    affiliateLinkUK={book.affiliateLink}
                                    affiliateLinkUS={book.affiliateLinkUS}
                                    audioPreviewUrl={book.audioPreviewUrl}
                                />
                            )}

                            <p className="curator-note-content" style={{
                                fontSize: '1.15rem',
                                lineHeight: 1.7,
                                color: 'var(--color-brand-slate)',
                                marginBottom: '2.5rem',
                                fontFamily: 'var(--font-body)',
                                maxWidth: '60ch',
                                textAlign: 'left',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word'
                            }}
                                dangerouslySetInnerHTML={{ __html: review?.curatorNote || book.curatorNote || '' }}
                            />





                            {/* Divider */}



                        </>
                    ) : (
                        // Fallback for books without a curator note - Empty now as Publisher's Summary is removed
                        <></>
                    )}




                </div>
            </div>

            {/* Style for mobile responsiveness and rich text content */}
            <style>{`
            @media (max-width: 850px) {
                .book-details-grid {
                    grid-template-columns: 1fr !important;
                    gap: 6rem !important; /* Increased from 3rem to clear the time badge */
                }
                
                /* Sticky Audible Buttons on Mobile */
                .audible-cta-container {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    z-index: 1000;
                    background-color: var(--color-brand-cloud);
                    padding: 1.25rem 0.75rem 0.5rem 0.75rem; /* Increased top padding */
                    box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
                    margin-top: 0 !important;
                    border-top: 1px solid rgba(0,0,0,0.05);
                    flex-direction: column !important; /* Stack buttons above text */
                    gap: 0.25rem !important;
                }

                .audible-buttons-wrapper {
                    flex-direction: row !important; /* Horizontal buttons */
                    gap: 0.5rem !important;
                }

                .audible-buttons-wrapper > a {
                    flex: 1;
                    padding: 0.75rem 0.25rem !important; /* Tight padding */
                    font-size: 0.8rem !important; /* Slightly larger than 0.75rem */
                    width: auto !important;
                    white-space: nowrap; /* Keep on one line */
                }

                .audible-buttons-wrapper > a img {
                    height: 16px !important; /* Fixed height */
                    width: auto !important; /* Maintain aspect ratio */
                    object-fit: contain;
                }
                
                .audible-cta-container p {
                    font-size: 0.65rem !important;
                    margin-top: 0 !important;
                    opacity: 0.8;
                }
                
                /* Add padding to body or main container to prevent occlusion at bottom */
                /* Since we can't easily reach body here, we'll add it to the component root container via .book-details-grid margin or similar if needed. 
                   Actually, the root div has padding-bottom: 6rem (line 85), which might be enough. 
                   Let's check line 85: padding: '0 2rem 6rem 2rem'. 
                   If sticky header is ~150px, 6rem (96px) might be tight. Let's increase it to 10rem on mobile.
                */
            }
            
            @media (max-width: 850px) {
               .book-details-container {
                   padding-bottom: 14rem !important; /* Increased space for sticky footer */
               }
            }
        `}</style>

            {/* Related Books Section */}
            {/* Related Books & Collections Section */}
            {(() => {
                // 0. Check if this book belongs to a collection
                const linkedCollection = collections.find(c => c.bookIds.includes(book.id));

                // 1. Use manual IDs if they exist
                let relatedBooks = book.relatedBookIds
                    ? book.relatedBookIds.map(id => books.find(b => b.id === id)).filter(Boolean)
                    : [];

                // 2. If no manual IDs, generate smarter recommendations based on genre overlap
                if (relatedBooks.length === 0) {
                    const currentGenres = Array.isArray(book.genre) ? book.genre : [book.genre];
                    
                    relatedBooks = books
                        .filter(b => b.id !== book.id)
                        .map(b => {
                            const otherGenres = Array.isArray(b.genre) ? b.genre : [b.genre];
                            const overlap = otherGenres.filter(g => currentGenres.includes(g));
                            
                            // Scoring:
                            // - Exact Author match is very strong
                            // - Each shared genre adds points
                            let score = overlap.length;
                            if (b.author === book.author) score += 10; 
                            
                            return { book: b, score };
                        })
                        .filter(item => item.score > 0)
                        .sort((a, b) => b.score - a.score)
                        .map(item => item.book);
                }

                // 3. Render if we have recommendations OR a linked collection
                // We limit related books to 2 if we have a collection, or 3 if we don't, to preserve the 3-column grid look.
                const maxBooks = linkedCollection ? 2 : 3;
                const displayBooks = relatedBooks.slice(0, maxBooks);

                if (displayBooks.length > 0 || linkedCollection) {
                    return (
                        <div style={{ marginTop: '1.3rem', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '4rem' }}>
                            <h3 style={{
                                fontFamily: 'var(--font-serif-accent)',
                                fontSize: '2rem',
                                color: 'var(--color-brand-forrest)',
                                marginBottom: '2rem',
                                textAlign: 'left'
                            }}>
                                You Might Also Like
                            </h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                gap: '2rem'
                            }}>
                                {/* Render Collection Card if it exists */}
                                {linkedCollection && (
                                    <Link
                                        to={`/collections/${linkedCollection.slug}`}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            display: 'block'
                                        }}
                                    >
                                        <div style={{
                                            transition: 'transform 0.3s ease',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            borderRadius: '0',
                                            overflow: 'hidden' // Ensure square corners work
                                        }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-5px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }}
                                        >
                                            {/* Top Graphic */}
                                            {linkedCollection.topGraphic ? (
                                                <img
                                                    src={linkedCollection.topGraphic}
                                                    alt={linkedCollection.title}
                                                    style={{
                                                        width: '100%',
                                                        display: 'block',
                                                        // Removed background color to allow transparency
                                                    }}
                                                />
                                            ) : (
                                                <div style={{ height: '150px', background: '#ccc' }}></div>
                                            )}

                                            {/* Content Area - Mimicking the Collections Grid Style */}
                                            <div style={{
                                                backgroundColor: '#f2f1e7',
                                                padding: '1.5rem',
                                                flex: 1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                textAlign: 'center'
                                            }}>
                                                <h3 style={{
                                                    fontSize: '1.5rem',
                                                    marginBottom: '0.5rem',
                                                    fontFamily: 'var(--font-serif-accent)',
                                                    color: 'var(--color-brand-forrest)',
                                                    fontWeight: 400,
                                                    lineHeight: 1.2
                                                }}>
                                                    {linkedCollection.title}
                                                </h3>

                                                {/* Divider Line */}
                                                <div style={{
                                                    width: '40px',
                                                    height: '2px',
                                                    backgroundColor: 'var(--color-brand-forrest)',
                                                    margin: '1rem 0',
                                                    opacity: 0.6
                                                }}></div>

                                                <p style={{
                                                    fontSize: '0.9rem',
                                                    color: 'var(--color-text-muted)',
                                                    marginBottom: '1.5rem',
                                                    lineHeight: '1.5',
                                                    fontFamily: 'var(--font-body)',
                                                    flex: 1
                                                }}>
                                                    {linkedCollection.description}
                                                </p>

                                                <div style={{
                                                    backgroundColor: 'var(--color-brand-coral)',
                                                    color: 'white',
                                                    padding: '0.75rem 2rem',
                                                    borderRadius: '50px',
                                                    fontSize: '1rem',
                                                    fontWeight: 400,
                                                    fontFamily: 'var(--font-serif-accent)',
                                                    marginTop: 'auto' // Push button to bottom
                                                }}>
                                                    View Collection <span style={{ fontSize: '1.1em', lineHeight: 1, fontFamily: 'var(--font-body)' }}>&rarr;</span>
                                                </div>
                                            </div>
                                            {/* Bottom Curve */}
                                            <img
                                                src="/assets/Collections-Cards-Gfx/collectionsCard_bottom-Curve.svg"
                                                alt=""
                                                style={{
                                                    width: '100%',
                                                    display: 'block',
                                                    marginTop: '-1px'
                                                }}
                                            />
                                        </div>
                                    </Link>
                                )}

                                {/* Render Related Books */}
                                {displayBooks.map(relatedBook => (
                                    <BookCard key={relatedBook!.id} book={relatedBook!} />
                                ))}
                            </div>
                        </div>
                    );
                }
                return null;
            })()}
        </div>
    );
};
