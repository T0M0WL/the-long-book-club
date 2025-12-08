import { useParams, Link } from 'react-router-dom';
import { books } from '../data/books';
import { FaArrowLeft, FaClock, FaBookOpen } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

export const BookDetails = () => {
    const { id } = useParams<{ id: string }>();
    const book = books.find(b => b.id === id);

    if (!book) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <Helmet>
                    <title>Book Not Found - The Long Book Club</title>
                </Helmet>
                <h2>Book not found</h2>
                <Link to="/" style={{ color: 'var(--color-primary)' }}>Return Home</Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', animation: 'fadeIn 0.5s ease' }}>
            <Helmet>
                <title>{book.title} by {book.author} | The Long Book Club</title>
                <meta name="description" content={`Listen to ${book.title} by ${book.author}. Length: ${book.length}. Genre: ${book.genre}. ${book.description.substring(0, 150)}...`} />
            </Helmet>
            <Link to="/" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '2rem',
                color: 'var(--color-text-muted)',
                fontSize: '0.875rem'
            }}>
                <FaArrowLeft /> Back to Library
            </Link>

            {/* SEO-friendly H1 */}
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.1 }}>{book.title}</h1>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '2rem', fontWeight: 400 }}>
                by <span style={{ color: 'var(--color-text)' }}>{book.author}</span>
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(250px, 300px) 1fr',
                gap: '3rem',
                alignItems: 'start'
            }} className="book-details-grid">

                {/* Cover Column */}
                <div style={{ position: 'relative' }}>
                    <img
                        src={book.coverUrl}
                        alt={`Cover of ${book.title}`}
                        style={{
                            width: '100%',
                            borderRadius: '1rem',
                            boxShadow: 'var(--shadow-lg)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    />

                    <div style={{
                        marginTop: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '1rem',
                        borderRadius: '0.5rem'
                    }}>
                        <FaClock color="var(--color-accent)" size={20} />
                        <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>{book.length}</span>
                    </div>
                </div>

                {/* Content Column */}
                <div>
                    <div style={{
                        marginBottom: '1rem',
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        background: 'rgba(129, 140, 248, 0.15)',
                        color: 'var(--color-primary)',
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: 600
                    }}>
                        {book.genre}
                    </div>

                    <p style={{
                        fontSize: '1.125rem',
                        lineHeight: 1.8,
                        color: 'var(--color-text-muted)',
                        marginBottom: '2.5rem'
                    }}>
                        {book.description}
                    </p>

                    {/* Primary CTA */}
                    <a
                        href={book.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            backgroundColor: 'var(--color-primary)',
                            color: '#fff',
                            padding: '1rem 2rem',
                            borderRadius: '0.75rem',
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            boxShadow: 'var(--shadow-glow)',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <FaBookOpen />
                        Listen on Audible
                    </a>

                    <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                        *A free trial is available for new members.
                    </p>
                </div>
            </div>

            {/* Style for mobile responsiveness */}
            <style>{`
            @media (max-width: 768px) {
                .book-details-grid {
                    grid-template-columns: 1fr !important;
                    gap: 2rem !important;
                }
            }
        `}</style>
        </div>
    );
};
