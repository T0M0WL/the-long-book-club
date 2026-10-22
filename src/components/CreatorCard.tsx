import React from 'react';
import { Link } from 'react-router-dom';
import type { CreatorItem } from '../utils/creatorUtils';

interface CreatorCardProps {
    creator: CreatorItem;
    type: 'author' | 'narrator';
}

export const CreatorCard: React.FC<CreatorCardProps> = ({ creator, type }) => {
    const linkPath = `/${type}/${creator.slug}/`;
    const labelSingular = type === 'author' ? 'Audiobook' : 'Performance';
    const labelPlural = type === 'author' ? 'Audiobooks' : 'Performances';
    const countLabel = `${creator.bookCount} ${creator.bookCount === 1 ? labelSingular : labelPlural}`;
    const hoursLabel = `Over ${Math.floor(creator.totalHours)} hrs`;

    // Preview up to 3 book covers
    const previewCovers = creator.books.slice(0, 3);

    return (
        <Link
            to={linkPath}
            style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                height: '100%',
                marginBottom: '2rem'
            }}
        >
            <div
                style={{
                    backgroundColor: '#f2f1e7',
                    borderRadius: '1.25rem',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(44, 81, 67, 0.08)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(44, 81, 67, 0.15)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
                }}
            >
                {/* Visual Cover Header */}
                <div style={{
                    padding: '2rem 1.5rem 1rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(44, 81, 67, 0.04)',
                    borderBottom: '1px solid rgba(44, 81, 67, 0.06)',
                    position: 'relative',
                    minHeight: '150px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        height: '120px'
                    }}>
                        {previewCovers.map((book, idx) => {
                            // Fan out effect if multiple covers
                            const offset = previewCovers.length === 1 ? 0 : (idx - (previewCovers.length - 1) / 2) * 28;
                            const rotation = previewCovers.length === 1 ? 0 : (idx - (previewCovers.length - 1) / 2) * 6;
                            const zIndex = idx === 1 ? 2 : 1;

                            return (
                                <img
                                    key={book.id}
                                    src={book.coverUrl}
                                    alt={book.title}
                                    loading="lazy"
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'cover',
                                        borderRadius: '0.5rem',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
                                        border: '2px solid #f2f1e7',
                                        transform: `translateX(${offset}px) rotate(${rotation}deg)`,
                                        zIndex,
                                        position: previewCovers.length > 1 ? 'absolute' : 'relative',
                                        transition: 'transform 0.3s ease'
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Card Content */}
                <div style={{
                    padding: '1.75rem 1.75rem 2rem 1.75rem',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
                    {/* Badges */}
                    <div style={{
                        display: 'flex',
                        gap: '0.4rem',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        marginBottom: '1rem'
                    }}>
                        <span style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            fontFamily: 'Inter, sans-serif',
                            backgroundColor: 'var(--color-brand-forrest)',
                            color: 'var(--color-brand-cloud)',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '1rem'
                        }}>
                            {countLabel}
                        </span>
                        <span style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            fontFamily: 'Inter, sans-serif',
                            backgroundColor: 'rgba(44, 81, 67, 0.1)',
                            color: 'var(--color-brand-forrest)',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '1rem'
                        }}>
                            {hoursLabel}
                        </span>
                    </div>

                    {/* Creator Name */}
                    <h2 style={{
                        fontSize: '1.75rem',
                        fontFamily: 'var(--font-serif-accent)',
                        color: 'var(--color-brand-forrest)',
                        fontWeight: 400,
                        lineHeight: 1.15,
                        marginBottom: '0.75rem'
                    }}>
                        {creator.name}
                    </h2>

                    {/* Subtle divider */}
                    <div style={{
                        width: '40px',
                        height: '1px',
                        backgroundColor: 'var(--color-brand-forrest)',
                        margin: '0.5rem auto 1rem auto',
                        opacity: 0.3
                    }} />

                    {/* Notable titles */}
                    <p style={{
                        fontSize: '0.9rem',
                        color: 'var(--color-text-muted)',
                        fontFamily: 'var(--font-body)',
                        lineHeight: 1.45,
                        marginBottom: '1.75rem',
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {creator.books.map(b => b.title).join(' • ')}
                    </p>

                    {/* Button */}
                    <div style={{
                        backgroundColor: 'var(--color-brand-coral)',
                        color: 'white',
                        padding: '0.65rem 1.6rem',
                        borderRadius: '50px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        fontFamily: 'Inter, sans-serif',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        boxShadow: '0 2px 6px rgba(237, 131, 94, 0.3)',
                        transition: 'background-color 0.2s ease, transform 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                    }}>
                        Explore Hub <span>→</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
