import { useParams, Link } from 'react-router-dom';
import { books } from '../data/books';
import { BookCard } from '../components/BookCard';
import { FaArrowLeft, FaClock } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

export const BookDetails = () => {
    const { id } = useParams<{ id: string }>();
    const book = books.find(b => b.id === id);

    if (!book) {
        return (
            <div style={{ textAlign: 'center', padding: '6rem 1rem', color: 'var(--color-brand-forrest)' }}>
                <Helmet>
                    <title>Book Not Found - The Long Book Club</title>
                </Helmet>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem' }}>Book not found</h2>
                <Link to="/" style={{ color: 'var(--color-brand-coral)', textDecoration: 'underline' }}>Return Home</Link>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '2rem 1.5rem 6rem 1.5rem',
            animation: 'fadeIn 0.5s ease'
        }}>
            <Helmet>
                <title>{book.title} by {book.author} | The Long Book Club</title>
                <meta name="description" content={`Listen to ${book.title} by ${book.author}. Length: ${book.length}. Genre: ${book.genre}. ${book.description.substring(0, 150)}...`} />
            </Helmet>

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
                    <div style={{
                        marginBottom: '1.5rem',
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        backgroundColor: 'var(--color-brand-forrest)',
                        color: 'var(--color-brand-cloud)',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                    }}>
                        {book.genre}
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
                            <p style={{
                                fontSize: '1.15rem',
                                lineHeight: 1.7,
                                color: 'var(--color-brand-slate)',
                                marginBottom: '3rem',
                                fontFamily: 'var(--font-body)',
                                maxWidth: '60ch',
                                textAlign: 'left',
                                alignSelf: 'flex-start'
                            }}>
                                {book.curatorNote}
                            </p>

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

            {/* Style for mobile responsiveness */}
            <style>{`
            @media (max-width: 850px) {
                .book-details-grid {
                    grid-template-columns: 1fr !important;
                    gap: 3rem !important;
                }
            }
        `}</style>

            {/* Related Books Section */}
            {book.relatedBookIds && book.relatedBookIds.length > 0 && (
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
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', // Smaller min-width to fit 3 easily
                        gap: '2rem'
                    }}>
                        {book.relatedBookIds
                            .map(id => books.find(b => b.id === id))
                            .filter(b => b) // Filter out undefined if any ID is missing
                            .slice(0, 6) // Limit to 6 related books
                            .map(relatedBook => (
                                <BookCard key={relatedBook!.id} book={relatedBook!} />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};
