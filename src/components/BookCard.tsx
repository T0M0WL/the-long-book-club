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
            borderRadius: '0.75rem',
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
            <Link to={`/book/${book.id}`} style={{ display: 'block', position: 'relative', paddingTop: '160%', color: 'inherit' }}>
                <img
                    src={book.coverUrl}
                    alt={book.title}
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
                    bottom: '1rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '0.5rem 1.5rem',
                    background: '#8b5cf6', // Bright purple from visual
                    border: '2px solid #fff',
                    borderRadius: '0.5rem',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                    whiteSpace: 'nowrap',
                    zIndex: 2
                }}>
                    <FaClock size={16} />
                    <span>{book.length}</span>
                </div>
            </Link>

            <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-accent)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 600,
                    marginBottom: '0.25rem'
                }}>
                    {book.genre}
                </div>
                <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 style={{
                        fontSize: '1.125rem',
                        marginBottom: '0.25rem',
                        lineHeight: 1.3,
                        fontFamily: 'var(--font-body)',
                        fontWeight: 700
                    }}>
                        {book.title}
                    </h3>
                </Link>
                <p style={{
                    color: 'var(--color-text-muted)',
                    fontSize: '0.875rem',
                    marginBottom: '1rem'
                }}>
                    {book.author}
                </p>

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
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        marginTop: 'auto'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
                >
                    <img src="/audible-chevron.png" alt="" style={{ width: '21px', height: 'auto' }} />
                    Listen on Audible
                </a>
            </div>
        </article>
    );
};
