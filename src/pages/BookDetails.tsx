import { useParams, Link } from 'react-router-dom';
import { books } from '../data/books';
import { collections } from '../data/collections';
import { BookCard } from '../components/BookCard';
import { FaArrowLeft, FaClock } from 'react-icons/fa';
import { SEO } from '../components/SEO'; // Use Global SEO Component
import { slugify } from '../utils/slugify';

export const BookDetails = () => {
    const { slug } = useParams<{ slug: string }>();
    // Backward compatibility: Find by slug (new) OR id (old)
    const book = books.find(b => b.slug === slug || b.id === slug);

    if (!book) {
        return (
            <div style={{ textAlign: 'center', padding: '6rem 1rem', color: 'var(--color-brand-forrest)' }}>
                <SEO title="Book Not Found" />
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem' }}>Book not found</h2>
                <Link to="/" style={{ color: 'var(--color-brand-coral)', textDecoration: 'underline' }}>Return Home</Link>
            </div>
        );
    }

    // Helper to convert "62h 48m" -> "PT62H48M" (ISO 8601)
    const formatDuration = (str: string) => {
        const parts = str.split(' ');
        let iso = 'PT';
        parts.forEach(p => iso += p.toUpperCase());
        return iso;
    };

    const structuredData = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Audiobook",
        "name": book.title,
        "author": [{
            "@type": "Person",
            "name": book.author
        }],
        "description": book.description,
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
        <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '2rem 1.5rem 6rem 1.5rem',
            animation: 'fadeIn 0.5s ease'
        }}>
            <SEO
                title={`${book.title} by ${book.author}`}
                description={`Listen to ${book.title} by ${book.author}. Length: ${book.length}. Genre: ${book.genre}. ${book.description.substring(0, 150)}...`}
                image={book.coverUrl}
                canonical={`https://thelongbookclub.com/book/${book.slug}`}
                type="book"
                schema={structuredData}
            />

            {/* Breadcrumb */}
            <Link to="/" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '3rem',
                backgroundColor: 'var(--color-brand-coral)',
                color: '#fff',
                padding: '0.5rem 1.2rem',
                borderRadius: '100px',
                fontSize: '0.9rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
            >
                <FaArrowLeft size={12} /> Back to Library
            </Link>

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
                                borderRadius: '12px',
                                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)', // Deep premium shadow
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
                            border: '4px solid #fff',
                            borderRadius: '50%',
                            color: 'var(--color-brand-cloud)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                            zIndex: 10,
                            lineHeight: 1.2
                        }}>
                            <FaClock size={16} style={{ position: 'absolute', top: '22px' }} />
                            <span style={{
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'Inter, sans-serif',
                                marginTop: '10px'
                            }}>{book.length}</span>
                        </div>
                    </div>

                    {/* CTAs Moved Here */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', marginTop: '4rem' }}>
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

                        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-brand-forrest)', fontWeight: 'bold', textAlign: 'center' }}>
                            *A free trial is available for non members.
                        </p>
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
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1.5rem' }}>
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
                        fontWeight: 700
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
                    {book.curatorNote ? (
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
                                {book.curatorTitle || "Why this is the best long audiobook for your credit"}
                            </h2>
                            <p className="curator-note-content" style={{
                                fontSize: '1.15rem',
                                lineHeight: 1.7,
                                color: 'var(--color-brand-slate)',
                                marginBottom: '2.5rem',
                                fontFamily: 'var(--font-body)',
                                maxWidth: '60ch',
                                textAlign: 'left',
                                alignSelf: 'flex-start'
                            }}
                                dangerouslySetInnerHTML={{ __html: book.curatorNote }}
                            />

                            {/* Additional Metadata (Narrator, Sound Check) */}
                            {(book.narrator || book.soundCheck) && (
                                <div style={{
                                    marginBottom: '2.5rem',
                                    padding: '0',
                                    fontFamily: 'var(--font-body)',
                                    color: 'var(--color-brand-slate)'
                                }}>
                                    {book.narrator && (
                                        <div style={{ marginBottom: '0.75rem', fontSize: '1.1rem', lineHeight: '1.5' }}>
                                            <strong style={{ color: 'var(--color-brand-forrest)' }}>Narrator:</strong> {book.narrator}
                                        </div>
                                    )}
                                    {book.soundCheck && (
                                        <div style={{ marginBottom: '0.75rem', fontSize: '1.1rem', lineHeight: '1.5' }}>
                                            <strong style={{ color: 'var(--color-brand-forrest)' }}>Sound Check:</strong> {book.soundCheck}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Divider */}
                            <hr style={{
                                width: '100%',
                                border: 'none',
                                borderTop: '1px solid rgba(0,0,0,0.1)',
                                margin: '0 0 3rem 0'
                            }} />

                            {/* Publisher's Summary Header */}
                            <h2 style={{
                                color: 'var(--color-brand-forrest)',
                                marginBottom: '1.5rem',
                                alignSelf: 'flex-start',
                                textAlign: 'left',
                                width: '100%'
                            }}>
                                Publisher's Summary
                            </h2>

                            {/* Publisher's Summary Text */}
                            <p style={{
                                fontSize: '1.05rem',
                                lineHeight: 1.7,
                                color: 'var(--color-brand-slate)',
                                marginBottom: '3rem',
                                fontFamily: 'var(--font-body)',
                                maxWidth: '60ch',
                                textAlign: 'left',
                                alignSelf: 'flex-start',
                                opacity: 0.9
                            }}>
                                {book.description}
                            </p>
                        </>
                    ) : (
                        // Fallback for books without a curator note
                        <>
                            {/* Publisher's Summary Header (Standardized) */}
                            <h2 style={{
                                color: 'var(--color-brand-forrest)',
                                marginBottom: '1.5rem',
                                alignSelf: 'flex-start',
                                textAlign: 'left',
                                width: '100%'
                            }}>
                                Publisher's Summary
                            </h2>
                            <p style={{
                                fontSize: '1.05rem', // Matched to the new size (down from 1.15)
                                lineHeight: 1.7,
                                color: 'var(--color-brand-slate)',
                                marginBottom: '3rem',
                                fontFamily: 'var(--font-body)',
                                maxWidth: '60ch',
                                opacity: 0.9
                            }}>
                                {book.description}
                            </p>
                        </>
                    )}


                </div>
            </div>

            {/* Style for mobile responsiveness and rich text content */}
            <style>{`
            @media (max-width: 850px) {
                .book-details-grid {
                    grid-template-columns: 1fr !important;
                    gap: 3rem !important;
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

                // 2. If no manual IDs, generate recommendations
                if (relatedBooks.length === 0) {
                    // Strategy: Match by Author first, then Genre
                    const byAuthor = books.filter(b => b.author === book.author && b.id !== book.id);
                    const byGenre = books.filter(b => b.genre === book.genre && b.id !== book.id);

                    // Combine and deduplicate
                    const combined = [...byAuthor, ...byGenre];
                    const uniqueMap = new Map();
                    combined.forEach(b => uniqueMap.set(b.id, b));
                    relatedBooks = Array.from(uniqueMap.values());
                }

                // 3. Render if we have recommendations OR a linked collection
                // We limit related books to 2 if we have a collection, or 3 if we don't, to preserve the 3-column grid look.
                const maxBooks = linkedCollection ? 2 : 3;
                const displayBooks = relatedBooks.slice(0, maxBooks);

                if (displayBooks.length > 0 || linkedCollection) {
                    return (
                        <div style={{ marginTop: '6rem', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '4rem' }}>
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
                                            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                                            transition: 'transform 0.3s ease, filter 0.3s ease',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            borderRadius: '8px', // Slightly rounded to match book cards if they are? Book cards are usually squareish or have their own style.
                                            overflow: 'hidden' // Ensure rounded corners work
                                        }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-5px)';
                                                e.currentTarget.style.filter = 'drop-shadow(0 10px 15px rgba(0,0,0,0.15))';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.filter = 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))';
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
                                                backgroundColor: '#efeee6',
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
                                                    padding: '0.5rem 1.5rem',
                                                    borderRadius: '50px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 600,
                                                    textTransform: 'uppercase',
                                                    marginTop: 'auto' // Push button to bottom
                                                }}>
                                                    View Collection
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
