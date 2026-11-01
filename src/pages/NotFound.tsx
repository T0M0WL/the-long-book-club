import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSetHeaderTheme } from '../context/HeaderContext';
import { books } from '../data/books';
import { BookCard } from '../components/BookCard';

// Curated selection of epic listens about being lost, exile, and finding your way home
const FEATURED_LOST_BOOK_IDS = [
    '260', // Odyssey by Stephen Fry (The ultimate voyage home)
    '223', // Project Hail Mary by Andy Weir (Stranded in deep space)
    '132', // The Terror by Dan Simmons (Lost Arctic expedition survival)
    '24',  // Shantaram by Gregory David Roberts (Exiled fugitive finding home in Bombay)
    '45',  // The Fellowship of the Ring by J.R.R. Tolkien (There and back again)
    '36'   // Outlander by Diana Gabaldon (Lost in time, fighting to return)
];

export const NotFound = () => {
    useSetHeaderTheme({
        logoColor: 'var(--color-brand-forrest)',
        textColor: 'var(--color-brand-forrest)',
        hamburgerColor: 'var(--color-brand-forrest)',
        activeLink: '',
        activeLinkBg: 'var(--color-brand-forrest)',
        activeLinkText: 'var(--color-brand-cloud)'
    });

    const lostBooks = FEATURED_LOST_BOOK_IDS
        .map(id => books.find(b => b.id === id))
        .filter((b): b is typeof books[0] => Boolean(b));

    const scrollToShelf = (e: React.MouseEvent) => {
        e.preventDefault();
        const shelf = document.getElementById('secret-shelf');
        if (shelf) {
            shelf.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="page-container" style={{
            minHeight: '75vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 'clamp(9rem, 16vh, 12rem) 1.5rem 8rem 1.5rem',
            animation: 'fadeIn 0.5s ease',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <Helmet>
                <title>Lost in the Library (404) | The Long Book Club</title>
                <meta name="robots" content="noindex, follow" />
                <meta name="description" content="You have stumbled into our secret, uncatalogued collection: epic audiobooks about getting lost and finding your way home." />
            </Helmet>

            {/* --- 404 HERO / MESSAGE --- */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                maxWidth: '780px',
                margin: '0 auto 3.5rem auto'
            }}>
                {/* Branded Fleur Ornament */}
                <img
                    src="/assets/lbc-fleur.svg"
                    alt=""
                    style={{
                        width: '46px',
                        height: '46px',
                        marginBottom: '1.75rem',
                        opacity: 0.9
                    }}
                />

                {/* Eyebrow */}
                <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-coral)',
                    marginBottom: '1rem'
                }}>
                    A Secret Archive • 404
                </div>

                {/* Main Headline */}
                <h1 style={{
                    fontSize: 'clamp(3.5rem, 8vw, 5.5rem)',
                    fontFamily: 'var(--font-serif-accent), Lora, Georgia, serif',
                    fontStyle: 'italic',
                    color: 'var(--color-brand-forrest)',
                    lineHeight: 0.95,
                    fontWeight: 400,
                    letterSpacing: '-0.04em',
                    margin: '0 0 1.75rem 0'
                }}>
                    Lost in <br />
                    the Library
                </h1>

                {/* Editorial Story */}
                <p style={{
                    fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
                    color: 'var(--color-brand-slate)',
                    fontFamily: 'Lora, serif',
                    fontStyle: 'italic',
                    lineHeight: 1.65,
                    maxWidth: '680px',
                    marginBottom: '1.25rem'
                }}>
                    You may have taken a wrong turn down an unmarked corridor of the stacks, but consider this a fortunate misdirection: you’ve slipped behind the hidden bookcase into the club’s private vault.
                </p>

                <p style={{
                    fontSize: '1.1rem',
                    color: 'var(--color-brand-slate)',
                    fontFamily: 'Lora, serif',
                    lineHeight: 1.6,
                    maxWidth: '620px',
                    marginBottom: '2.5rem',
                    opacity: 0.9
                }}>
                    The specific page you sought has vanished into the shadows, but in its place, you’ve discovered our secret, unlisted collection of mammoth audiobooks dedicated to the art of getting hopelessly lost—and the monumental journeys taken to find your way home.
                </p>

                {/* Action CTAs */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                }}>
                    <a
                        href="#secret-shelf"
                        onClick={scrollToShelf}
                        style={{
                            backgroundColor: 'var(--color-brand-coral)',
                            color: '#fff',
                            padding: '0.95rem 2.25rem',
                            borderRadius: '2rem',
                            fontSize: '1.05rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            fontFamily: 'Lora, serif',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                            transition: 'transform 0.2s, background-color 0.2s',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#e55a3b';
                            e.currentTarget.style.transform = 'scale(1.04)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'var(--color-brand-coral)';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        Discover The Secret Shelf ↓
                    </a>

                    <Link
                        to="/long-book-finder/"
                        style={{
                            backgroundColor: 'transparent',
                            color: 'var(--color-brand-forrest)',
                            border: '1.5px solid var(--color-brand-forrest)',
                            padding: '0.9rem 2rem',
                            borderRadius: '2rem',
                            fontSize: '1.05rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            fontFamily: 'Lora, serif',
                            transition: 'transform 0.2s, background-color 0.2s, color 0.2s'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = 'var(--color-brand-forrest)';
                            e.currentTarget.style.color = '#fff';
                            e.currentTarget.style.transform = 'scale(1.04)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--color-brand-forrest)';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        Search Long Book Finder →
                    </Link>
                </div>

                {/* Subtle Home Link */}
                <Link
                    to="/"
                    style={{
                        fontSize: '0.95rem',
                        color: 'var(--color-brand-slate)',
                        fontFamily: 'Lora, serif',
                        textDecoration: 'underline',
                        textUnderlineOffset: '4px',
                        opacity: 0.75,
                        transition: 'opacity 0.2s, color 0.2s'
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.opacity = '1';
                        e.currentTarget.style.color = 'var(--color-brand-coral)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.opacity = '0.75';
                        e.currentTarget.style.color = 'var(--color-brand-slate)';
                    }}
                >
                    Or return to the Home Library
                </Link>
            </div>

            {/* --- THEMATIC SHELF: GETTING LOST & FINDING YOUR WAY HOME --- */}
            {lostBooks.length > 0 && (
                <section
                    id="secret-shelf"
                    style={{
                        width: '100%',
                        marginTop: '2rem',
                        paddingTop: '4.5rem',
                        borderTop: '1px solid rgba(44, 81, 67, 0.15)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        scrollMarginTop: '100px'
                    }}
                >
                    <div style={{
                        textAlign: 'center',
                        maxWidth: '740px',
                        marginBottom: '3.5rem'
                    }}>
                        <div style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--color-brand-coral)',
                            marginBottom: '0.75rem'
                        }}>
                            The Uncatalogued Vault
                        </div>
                        <h2 style={{
                            fontFamily: 'Lora, serif',
                            fontStyle: 'italic',
                            fontWeight: 400,
                            fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                            color: 'var(--color-brand-forrest)',
                            lineHeight: 1.2,
                            marginBottom: '1.25rem'
                        }}>
                            The Secret Shelf: Epics in Getting Lost & Finding Home
                        </h2>
                        <p style={{
                            fontFamily: 'Lora, serif',
                            fontSize: '1.15rem',
                            lineHeight: 1.65,
                            color: 'var(--color-brand-slate)',
                            opacity: 0.95
                        }}>
                            You won’t find this collection on our public menu. Curated exclusively for those who wander off the beaten path, these mammoth audiobooks chronicle lone astronauts, mythic mariners, fugitive exiles, and polar explorers—stories that prove the only thing more exhilarating than losing your way is the monumental journey back.
                        </p>
                    </div>

                    {/* Responsive Grid of Featured Books */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '2rem',
                        width: '100%',
                        maxWidth: '1200px'
                    }}>
                        {lostBooks.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};
