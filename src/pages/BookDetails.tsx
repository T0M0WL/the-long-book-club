import { useParams, Link, useLocation, Navigate } from 'react-router-dom';
import { books } from '../data/books';
import { getRoundedHours } from '../utils/formatLength';
import { collections } from '../data/collections';
import { BookCard } from '../components/BookCard';
import { FaClock } from 'react-icons/fa';
import { SEO } from '../components/SEO'; // Use Global SEO Component
import { slugify } from '../utils/slugify';
import { isQualifyingAuthor } from '../utils/creatorUtils';
import { useSetHeaderTheme } from '../context/HeaderContext';
import { reviews } from '../data/reviews';
import SoundCheckCard from '../components/SoundCheckCard';
import Breadcrumbs from '../components/Breadcrumbs';
import AudiobookCommuteCalculator from '../components/AudiobookCommuteCalculator';
import AudiobookValueCalculator from '../components/AudiobookValueCalculator';
import { AudiblePromoBanner } from '../components/AudiblePromoBanner';

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
        return <Navigate to={`/book/${book.slug}/`} replace />;
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
                canonical={`https://thelongbookclub.com/book/${book.slug}/`}
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
                <div className="book-left-col" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="book-packshot-block" style={{ position: 'relative' }}>
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
                    <div className="audible-cta-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%', marginTop: '3.5rem' }}>
                        <div className="audible-buttons-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%' }}>
                            {book.affiliateLink && (
                                <a
                                    href={book.affiliateLink}
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        backgroundColor: 'var(--color-primary)',
                                        color: '#fff',
                                        padding: '1rem 1.5rem',
                                        borderRadius: '2rem',
                                        fontSize: '1.05rem',
                                        fontWeight: 600,
                                        textDecoration: 'none',
                                        transition: 'background-color 0.2s',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
                                >
                                    Listen on Audible
                                    <img src="/audible-chevron.png" alt="" style={{ width: '21px', height: 'auto' }} />
                                </a>
                            )}

                            {book.graphicAudioParts && book.graphicAudioParts.map((part, index) => (
                                <a
                                    key={index}
                                    href={part.affiliateLink}
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    className="graphic-audio-cta-btn"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        backgroundColor: '#2c5143',
                                        color: '#fff',
                                        padding: '0.9rem 1.25rem',
                                        borderRadius: '2rem',
                                        fontSize: '0.95rem',
                                        fontWeight: 600,
                                        textDecoration: 'none',
                                        transition: 'background-color 0.2s, transform 0.15s ease',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.backgroundColor = '#386554';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.backgroundColor = '#2c5143';
                                    }}
                                >
                                    {part.title}
                                    <img src="/audible-chevron.png" alt="" style={{ width: '19px', height: 'auto' }} />
                                </a>
                            ))}
                        </div>

                        {/* Audible Special Offer Promo Banner */}
                        {book.affiliateLink && (
                            <AudiblePromoBanner affiliateLink={book.affiliateLink} />
                        )}
                    </div>

                    {/* Interactive Calculators Block (Reordered below Review on Mobile) */}
                    <div className="book-calculators-block" style={{ marginTop: book.affiliateLink ? '0.5rem' : '2rem', width: '100%', display: 'flex', flexDirection: 'column' }}>
                        {/* Audiobook Commute Calculator Widget */}
                        <div style={{ width: '100%' }}>
                            <AudiobookCommuteCalculator initialBookLength={book.length} />
                        </div>

                        {/* Audiobook Value Calculator Widget */}
                        <div style={{ width: '100%' }}>
                            <AudiobookValueCalculator initialBookLength={book.length} />
                        </div>
                    </div>
                </div>

                {/* Right Column: Content */}
                <div className="book-right-col" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    textAlign: 'left'
                }}>

                    {/* Genre Pill - Matched to BookCard */}
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: '0.4rem', marginBottom: '1.25rem' }}>
                        {(Array.isArray(book.genre) ? book.genre : [book.genre]).map((g, i) => (
                            <Link
                                key={i}
                                to={`/genre/${slugify(g)}/`}
                                className="genre-tag"
                                style={{
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    lineHeight: 1,
                                    padding: '0.48rem 0.75rem',
                                    backgroundColor: 'var(--color-brand-coral)',
                                    color: '#ffffff',
                                    borderRadius: '50px',
                                    fontSize: '0.65rem',
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 700,
                                    letterSpacing: '0.04em',
                                    textTransform: 'uppercase',
                                    whiteSpace: 'nowrap',
                                    transition: 'background-color 0.2s, color 0.2s'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.backgroundColor = 'var(--color-brand-forrest)';
                                    e.currentTarget.style.color = '#ffffff';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.backgroundColor = 'var(--color-brand-coral)';
                                    e.currentTarget.style.color = '#ffffff';
                                }}
                            >
                                {g}
                            </Link>
                        ))}
                    </div>

                    {/* Titles - Matched to BookCard */}
                    <h1 style={{
                        fontSize: 'clamp(3rem, 4.8vw, 4.2rem)',
                        marginBottom: '0.5rem',
                        lineHeight: 1.08,
                        fontFamily: 'var(--font-serif-accent)', // Lora
                        fontStyle: 'italic',
                        fontWeight: 400,
                        letterSpacing: '-0.03em',
                        color: 'var(--color-brand-forrest)'
                    }}>
                        {book.title}
                    </h1>
                    <h2 style={{
                        color: 'var(--color-brand-forrest)',
                        marginBottom: '2.5rem',
                        fontWeight: 700
                    }}>
                        {isQualifyingAuthor(book.author) ? (
                            <Link
                                to={`/author/${slugify(book.author)}/`}
                                style={{
                                    color: 'var(--color-brand-coral)',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    transition: 'color 0.2s ease'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brand-forrest)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-brand-coral)'; }}
                            >
                                {book.author}
                            </Link>
                        ) : (
                            <span style={{ fontWeight: 700, color: 'var(--color-brand-forrest)' }}>
                                {book.author}
                            </span>
                        )}
                    </h2>

                    {/* Content Logic: Curator Note vs Publisher Summary */}
                    {review?.curatorNote || book.curatorNote ? (
                        <>
                            {/* Curator's Note (SEO Hook) */}
                            <h2 style={{
                                fontFamily: 'var(--font-serif-accent)', // Lora
                                fontWeight: 400, // Lightest Lora regular
                                fontStyle: 'normal',
                                color: 'var(--color-brand-forrest)',
                                marginBottom: '2.75rem', // Generous breathing room before Soundcheck
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
                                    audioPreviewUrl={book.audioPreviewUrl}
                                    graphicAudioParts={book.graphicAudioParts}
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
                                dangerouslySetInnerHTML={{
                                    __html: (review?.curatorNote || book.curatorNote || '')
                                        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                                        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
                                        .replace(/(?:\n|<br\s*\/?>)\s*((?:•|\d+\.)\s*(?:(?!\n|<br\s*\/?>).)+)/g, '<span class="series-book-item">$1</span>')
                                }}
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
            .curator-note-content .series-book-item {
                display: block;
                font-size: 0.75em;
                line-height: 1.5;
                margin-top: 0.28rem;
                padding-left: 0.95em;
                text-indent: -0.95em;
            }

            @media (max-width: 850px) {
                .book-details-grid {
                    display: flex !important;
                    flex-direction: column !important;
                    gap: 0 !important;
                }

                .book-left-col {
                    display: contents !important;
                }

                .book-packshot-block {
                    order: 1;
                    width: 100%;
                    margin-bottom: 4.25rem !important; /* Clears the overlapping hours badge */
                }

                .book-right-col {
                    order: 2;
                    width: 100%;
                }

                .book-calculators-block {
                    order: 3;
                    width: 100%;
                    margin-top: 0.25rem !important;
                }

                /* Sleek Sticky Audible Dock on Mobile (Button + 1-Line Promo Ribbon) */
                .audible-cta-container {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    z-index: 1000;
                    background-color: var(--color-brand-cloud);
                    padding: 0.55rem 0.85rem calc(0.5rem + env(safe-area-inset-bottom, 0px)) 0.85rem !important;
                    box-shadow: 0 -4px 20px rgba(0,0,0,0.12);
                    margin-top: 0 !important;
                    border-top: 1px solid rgba(44, 81, 67, 0.1);
                    flex-direction: column !important;
                    gap: 0.35rem !important;
                    box-sizing: border-box;
                }

                .audible-buttons-wrapper {
                    width: 100% !important;
                    gap: 0.35rem !important;
                }

                .audible-buttons-wrapper > a {
                    width: 100% !important;
                    padding: 0.68rem 1.25rem !important;
                    font-size: 0.92rem !important;
                    justify-content: center !important;
                    box-sizing: border-box;
                }

                .audible-buttons-wrapper > a img {
                    height: 16px !important;
                    width: auto !important;
                    object-fit: contain;
                }

                /* Hide secondary multi-part GraphicAudio buttons in sticky bar (already in Soundcheck card) */
                .graphic-audio-cta-btn {
                    display: none !important;
                }

                .book-details-container {
                    padding-bottom: 8.5rem !important; /* Compact clearance for sleek sticky dock */
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
                                        to={`/collections/${linkedCollection.slug}/`}
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
