import type { Book } from '../data/books';
import { getRoundedHours } from '../utils/formatLength';
import { FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { slugify } from '../utils/slugify';

interface BookCardProps {
    book: Book;
    navigationState?: any;
}

export const BookCard = ({ book, navigationState }: BookCardProps) => {
    return (
        <article
            className="book-card"
            style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: '0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(255,255,255,0.05)',
                height: '100%',
                position: 'relative'
            }}
        >
            <Link
                to={`/book/${book.slug || book.id}`}
                state={navigationState}
                style={{ display: 'block', position: 'relative', paddingTop: '100%', color: 'inherit' }}
            >
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
                    width: '100px', // Slightly larger to accommodate big text? 90px might be tight for 200+. Let's try 94px first or keep 90px.
                    height: '100px',
                    background: 'var(--color-brand-forrest)', // User Request: Forest
                    border: '8px solid var(--color-brand-coral)',
                    borderRadius: '50%',
                    color: 'var(--color-brand-cloud)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
                    zIndex: 2,
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
            </Link>

            <div style={{ padding: '1rem', paddingTop: '4.75rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* 1. Title */}
                <Link
                    to={`/book/${book.slug || book.id}`}
                    state={navigationState}
                    style={{ textDecoration: 'none', color: 'inherit', width: '100%', textAlign: 'center' }}
                >
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


                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
                    {(Array.isArray(book.genre) ? book.genre : [book.genre]).slice(0, 3).map((g, i) => (
                        <Link key={i} to={`/genre/${slugify(g)}`} style={{ textDecoration: 'none' }}>
                            <div
                                className="genre-tag"
                                style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--color-brand-cloud)',
                                    backgroundColor: 'var(--color-brand-forrest)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '1rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    fontWeight: 700,
                                    fontFamily: 'Inter, sans-serif',
                                    display: 'inline-block'
                                }}
                            >
                                {g}
                            </div>
                        </Link>
                    ))}
                </div>

                <p style={{
                    fontSize: '1rem', // Bumped from 0.875rem to match CollectionCard
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.4, // Reduced from 1.6 as per user request
                    marginBottom: '1.5rem',
                    padding: '0 0.5rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {book.cardOverview || book.description}
                </p>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                    <Link
                        to={`/book/${book.slug || book.id}`}
                        state={navigationState}
                        className="book-card-action"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            backgroundColor: 'var(--color-brand-coral)', // Using Coral explicitly as primary
                            color: '#fff',
                            padding: '0.75rem',
                            borderRadius: '2rem',
                            fontSize: '1rem', // Bumped up slightly for serif readability
                            fontWeight: 400,
                            fontFamily: 'var(--font-serif-accent)',
                            textDecoration: 'none',
                            width: '100%',
                            letterSpacing: '0',
                            textTransform: 'none'
                        }}
                    >
                        Read Full Review <span style={{ fontSize: '1.1em', lineHeight: 1, fontFamily: 'var(--font-body)' }}>&rarr;</span>
                    </Link>
                </div>
            </div>
        </article >
    );
};
