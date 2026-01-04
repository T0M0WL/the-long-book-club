import type { Book } from '../data/books';
import { FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface BookCardProps {
    book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
    return (
        <article style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: '2rem',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s, box-shadow 0.2s',
            border: '1px solid rgba(255,255,255,0.05)',
            height: '100%',
            position: 'relative',
            boxShadow: 'var(--shadow-md)'
        }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
        >
            <Link to={`/book/${book.id}`} style={{ display: 'block', position: 'relative', paddingTop: '100%', color: 'inherit' }}>
                <img
                    src={book.coverUrl}
                    alt={book.title}
                    loading="lazy"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translate(-50%, 50%)',
                    width: '90px',
                    height: '90px',
                    background: 'var(--color-brand-forrest)', // Spec: Forrest
                    border: '4px solid #fff',
                    borderRadius: '50%',
                    color: 'var(--color-brand-cloud)', // User update: Cloud
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    zIndex: 2,
                    lineHeight: 1.2
                }}>
                    <FaClock size={14} style={{ position: 'absolute', top: '20px' }} />
                    <span style={{
                        fontSize: '12px', // Spec: 12pt (using px for web consistency near 12pt)
                        fontWeight: 600,  // Spec: Semi Bold 600
                        fontFamily: 'Inter, sans-serif',
                        marginTop: '8px'
                    }}>{book.length}</span>
                </div>
            </Link>

            <div style={{ padding: '1rem', paddingTop: '3.5rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* 1. Title */}
                <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit', width: '100%', textAlign: 'center' }}>
                    <h3 style={{
                        fontSize: '1.25rem', // Spec: 19pt ~ 25px, but 20px (1.25rem) is safer for cards. 1.5rem = 24px. Let's try 1.2rem first to fit.
                        marginBottom: '0.25rem',
                        lineHeight: 1.2,
                        fontFamily: 'var(--font-serif-accent)', // User Switch: Fraunces
                        fontWeight: 700,
                        color: 'var(--color-brand-forrest)' // Spec: Forrest
                    }}>
                        {book.title}
                    </h3>
                </Link>

                {/* 2. Author */}
                <p style={{
                    color: 'var(--color-brand-forrest)', // Spec: Forrest
                    fontSize: '1.25rem', // Spec: 19pt ~ 25px. Matching title size as per visual logic if layout permits.
                    fontFamily: 'var(--font-serif-accent)', // User Switch: Fraunces
                    fontWeight: 400,
                    marginBottom: '1rem',
                    lineHeight: 1.2
                }}>
                    {book.author}
                </p>

                {/* 3. Genre Lozenge (Moved Here) */}
                <div style={{
                    display: 'inline-block',
                    fontSize: '0.75rem',
                    color: 'var(--color-brand-cloud)', // User update: Cloud
                    backgroundColor: 'var(--color-brand-forrest)', // Spec: Background Forrest
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    fontFamily: 'Inter, sans-serif'
                }}>
                    {book.genre}
                </div>

                <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.5,
                    marginBottom: '1.5rem',
                    flex: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {book.description}
                </p>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
                            padding: '0.75rem',
                            borderRadius: '2rem',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            textDecoration: 'none',
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
                                padding: '0.75rem',
                                borderRadius: '2rem',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                textDecoration: 'none',
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
            </div>
        </article >
    );
};
