import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { books } from '../data/books';
import { BookCard } from './BookCard';
import { FaChevronDown } from 'react-icons/fa';

const DURATION_OPTIONS = [
    { label: '10+ Hours', value: 10 },
    { label: '25+ Hours', value: 25 },
    { label: '50+ Hours', value: 50 }
];

const TOP_GENRES = [
    'All',
    'Fantasy',
    'Science Fiction',
    'Historical Fiction',
    'Thriller',
    'Mystery',
    'Cozy Crime',
    'Non-Fiction',
    'Classics',
    'Romantasy',
    'Space Opera',
    'Cozy Fantasy',
    'Grimdark',
    'LitRPG',
    'Horror',
    'Biography',
    'Time Travel',
    'Dark Academia',
    'Full-Cast',
    'Epic Fantasy'
];

export const QuickBookFinder = () => {
    const [minLength, setMinLength] = useState<number>(10);
    const [selectedGenre, setSelectedGenre] = useState<string>('All');

    // 1. Calculate matching books & prioritize tier representation
    const { displayedBooks, totalMatching } = useMemo(() => {
        const matches = books.filter(b => {
            const matchesLength = minLength <= 10 ? true : b.lengthHours >= minLength;
            const genreList = Array.isArray(b.genre) ? b.genre : [b.genre];
            const matchesGenre = selectedGenre === 'All' ||
                genreList.some(g =>
                    g.toLowerCase().includes(selectedGenre.toLowerCase()) ||
                    selectedGenre.toLowerCase().includes(g.toLowerCase())
                );
            return matchesLength && matchesGenre;
        });

        if (matches.length <= 3) {
            return { displayedBooks: matches, totalMatching: matches.length };
        }

        // Tier preference so clicking 10+, 25+, 50+ surfaces distinct books
        let tierSubset = matches;
        if (minLength === 10) {
            tierSubset = matches.filter(b => b.lengthHours < 25);
        } else if (minLength === 25) {
            tierSubset = matches.filter(b => b.lengthHours < 50);
        } else {
            tierSubset = matches.filter(b => b.lengthHours >= 50);
        }

        let chosen: typeof books = [];
        if (tierSubset.length >= 3) {
            chosen = tierSubset.slice(0, 3);
        } else {
            // Supplement with other matches if tier has fewer than 3
            chosen = [...tierSubset];
            for (const b of matches) {
                if (!chosen.some(item => item.id === b.id)) {
                    chosen.push(b);
                }
                if (chosen.length === 3) break;
            }
        }

        return { displayedBooks: chosen, totalMatching: matches.length };
    }, [minLength, selectedGenre]);

    // Destination URL for Long Book Finder
    const finderTargetUrl = useMemo(() => {
        const params = new URLSearchParams();
        if (minLength > 10) {
            params.set('length', String(minLength));
        }
        if (selectedGenre !== 'All') {
            params.set('genre', selectedGenre);
        }
        const query = params.toString();
        return query ? `/long-book-finder/?${query}` : '/long-book-finder/';
    }, [minLength, selectedGenre]);

    // Dynamic grid column layout to center-align results when fewer than 3 books
    const gridColumnsStyle = useMemo(() => {
        if (displayedBooks.length === 0) {
            // Single zero-results card centered
            return 'minmax(280px, 320px)';
        }
        if (displayedBooks.length === 1) {
            // 1 book + 1 portal card = 2 cards centered
            return 'repeat(2, minmax(260px, 310px))';
        }
        if (displayedBooks.length === 2) {
            // 2 books + 1 portal card = 3 cards centered
            return 'repeat(3, minmax(260px, 305px))';
        }
        // 3 books + 1 portal card = 4 columns full width
        return 'repeat(4, 1fr)';
    }, [displayedBooks.length]);

    // Portal Card headline
    const portalHeadline = useMemo(() => {
        if (totalMatching === 1) {
            return 'Explore more books in the Long Book Finder \u2192';
        }
        return `Explore all ${totalMatching} matching audiobooks in the Long Book Finder \u2192`;
    }, [totalMatching]);

    return (
        <section
            className="quick-book-finder-section"
            style={{
                width: '100%',
                maxWidth: '1280px',
                margin: '0 auto 7rem auto',
                padding: '0 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <style>{`
                .quick-finder-controls-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1.25rem;
                    width: 100%;
                    max-width: 960px;
                    margin-bottom: 3.5rem;
                    flex-wrap: wrap;
                }

                .duration-buttons-group {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .duration-pill-btn {
                    border-radius: 100px;
                    padding: 0.8rem 1.4rem;
                    font-family: var(--font-serif-accent);
                    font-size: clamp(0.95rem, 1.2vw, 1.05rem);
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border: 2px solid var(--color-brand-coral);
                    background: transparent;
                    color: var(--color-brand-coral);
                    outline: none;
                    white-space: nowrap;
                    font-weight: 500;
                    line-height: 1;
                }

                .duration-pill-btn:hover {
                    background: rgba(224, 90, 71, 0.1);
                    color: #cc563b;
                    border-color: #cc563b;
                }

                .duration-pill-btn.active {
                    background: var(--color-brand-coral);
                    color: #ffffff;
                    border-color: var(--color-brand-coral);
                    box-shadow: 0 4px 12px rgba(224, 90, 71, 0.25);
                    font-weight: 600;
                }

                .duration-pill-btn.active:hover {
                    background: #cc563b;
                    border-color: #cc563b;
                }

                .genre-dropdown-wrapper {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                }

                .genre-select-pill {
                    border-radius: 100px;
                    padding: 0.8rem 2.85rem 0.8rem 1.6rem;
                    font-family: var(--font-serif-accent);
                    font-size: clamp(0.95rem, 1.2vw, 1.05rem);
                    font-weight: 500;
                    cursor: pointer;
                    border: 2px solid var(--color-brand-coral);
                    background: var(--color-brand-coral);
                    color: #ffffff;
                    appearance: none;
                    -webkit-appearance: none;
                    outline: none;
                    box-shadow: 0 4px 12px rgba(224, 90, 71, 0.2);
                    transition: all 0.2s ease;
                    white-space: nowrap;
                    line-height: 1;
                }

                .genre-select-pill:hover {
                    background: #cc563b;
                    border-color: #cc563b;
                }

                .genre-chevron-icon {
                    position: absolute;
                    right: 1.25rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #ffffff;
                    pointer-events: none;
                }

                .quick-finder-grid {
                    display: grid;
                    gap: 1.75rem;
                    width: 100%;
                    align-items: stretch;
                    justify-content: center;
                }

                @keyframes quickFinderCardFadeUp {
                    0% {
                        opacity: 0;
                        transform: translateY(24px) scale(0.97);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                .quick-finder-card-anim {
                    animation: quickFinderCardFadeUp 0.38s cubic-bezier(0.22, 1, 0.36, 1) both;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }

                @media (prefers-reduced-motion: reduce) {
                    .quick-finder-card-anim {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }

                .portal-cta-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    background-color: var(--color-brand-coral);
                    color: #ffffff;
                    padding: 12px 28px;
                    border-radius: 50px;
                    font-family: var(--font-serif-accent);
                    font-size: 1.05rem;
                    width: 100%;
                    max-width: 210px;
                    box-shadow: 0 4px 12px rgba(224, 90, 71, 0.2);
                    transition: all 0.2s ease;
                }

                .portal-card-link:hover .portal-cta-btn {
                    background-color: #cc563b;
                    box-shadow: 0 6px 16px rgba(224, 90, 71, 0.35);
                }

                @media (max-width: 1080px) {
                    .quick-finder-grid {
                        grid-template-columns: repeat(auto-fit, minmax(260px, 320px)) !important;
                        gap: 2rem;
                    }
                }

                @media (max-width: 768px) {
                    .quick-finder-controls-container {
                        flex-direction: column;
                        gap: 1.25rem;
                    }
                }

                @media (max-width: 580px) {
                    .duration-buttons-group {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        width: 100%;
                        max-width: 320px;
                    }
                    .duration-pill-btn {
                        text-align: center;
                        padding: 0.75rem 0.5rem;
                    }
                    .genre-select-pill {
                        width: 100%;
                        min-width: 280px;
                    }
                    .quick-finder-grid {
                        grid-template-columns: 1fr !important;
                        max-width: 380px;
                        margin: 0 auto;
                    }
                }
            `}</style>

            {/* 1. Centered Graphic */}
            <div
                style={{
                    width: '72px',
                    height: '72px',
                    backgroundColor: 'var(--color-brand-forrest)',
                    maskImage: 'url("/assets/lbc-Logo-Icon.svg")',
                    WebkitMaskImage: 'url("/assets/lbc-Logo-Icon.svg")',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                    marginBottom: '1.25rem',
                    marginTop: '1rem'
                }}
            />

            {/* 2. Header Title & Subtitle */}
            <h3
                style={{
                    fontFamily: 'Lora, Georgia, serif',
                    fontStyle: 'italic',
                    color: 'var(--color-brand-forrest)',
                    fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                    marginBottom: '1rem',
                    fontWeight: 400,
                    textAlign: 'center',
                    lineHeight: 1.15
                }}
            >
                Quick Book Finder
            </h3>

            <p
                style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-brand-slate)',
                    lineHeight: 1.6,
                    marginBottom: '2.5rem',
                    fontSize: '1rem',
                    maxWidth: '680px',
                    textAlign: 'center'
                }}
            >
                Quickly Search 470+ epics by duration and genre or visit our{' '}
                <Link
                    to="/long-book-finder/"
                    style={{
                        color: 'var(--color-brand-coral)',
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                        fontWeight: 500
                    }}
                >
                    Long Book Finder Tool
                </Link>{' '}
                to drill down even deeper in our collection.
            </p>

            {/* 3. Controls: 4 Coral Duration Buttons + Coral Lozenge Dropdown */}
            <div className="quick-finder-controls-container">
                <div className="duration-buttons-group">
                    {DURATION_OPTIONS.map(opt => {
                        const isActive = minLength === opt.value;
                        return (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => setMinLength(opt.value)}
                                className={`duration-pill-btn ${isActive ? 'active' : ''}`}
                            >
                                {opt.label}
                            </button>
                        );
                    })}
                </div>

                <div className="genre-dropdown-wrapper">
                    <select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className="genre-select-pill"
                        aria-label="Filter audiobooks by genre"
                    >
                        {TOP_GENRES.map(g => (
                            <option
                                key={g}
                                value={g}
                                style={{
                                    backgroundColor: 'var(--color-brand-forrest)',
                                    color: 'var(--color-brand-cloud)',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '1rem',
                                    padding: '8px'
                                }}
                            >
                                {g === 'All' ? 'All Genres' : g}
                            </option>
                        ))}
                    </select>

                    <FaChevronDown size={13} className="genre-chevron-icon" />
                </div>
            </div>

            {/* 4. Live Update Grid (Cards dynamically center-aligned when fewer than 4) */}
            <div
                className="quick-finder-grid"
                style={{
                    gridTemplateColumns: gridColumnsStyle
                }}
            >
                {displayedBooks.length === 0 ? (
                    /* Zero Results Card (Designed in exact style of the 4th bookcard) */
                    <div
                        key={`zero-${minLength}-${selectedGenre}`}
                        className="quick-finder-card-anim"
                        style={{ animationDelay: '0ms' }}
                    >
                        <article
                            className="book-card quick-finder-portal-card"
                            style={{
                                backgroundColor: '#ffffff',
                                borderRadius: '0',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                border: '1px solid rgba(44, 81, 67, 0.12)',
                                height: '100%',
                                minHeight: '440px',
                                position: 'relative',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                            }}
                        >
                            <Link
                                to={selectedGenre !== 'All' ? `/long-book-finder/?genre=${encodeURIComponent(selectedGenre)}` : '/long-book-finder/'}
                                className="portal-card-link"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    height: '100%',
                                    padding: 'clamp(2.5rem, 3.5vw, 3.25rem) 1.5rem',
                                    boxSizing: 'border-box',
                                    textDecoration: 'none',
                                    color: 'inherit'
                                }}
                            >
                                {/* Centered Coral Circle showing 0 audiobooks */}
                                <div
                                    style={{
                                        width: '136px',
                                        height: '136px',
                                        borderRadius: '50%',
                                        backgroundColor: 'var(--color-brand-coral)',
                                        color: '#ffffff',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        boxShadow: '0 6px 18px rgba(224, 90, 71, 0.28)',
                                        marginBottom: '1.75rem',
                                        flexShrink: 0
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: '3.25rem',
                                            fontWeight: 400,
                                            fontFamily: 'Lora, Georgia, serif',
                                            fontStyle: 'italic',
                                            lineHeight: 1
                                        }}
                                    >
                                        0
                                    </span>
                                    <span
                                        style={{
                                            fontSize: '0.68rem',
                                            fontWeight: 600,
                                            fontFamily: 'Inter, sans-serif',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.06em',
                                            marginTop: '4px',
                                            opacity: 0.95
                                        }}
                                    >
                                        audiobooks
                                    </span>
                                </div>

                                {/* Centered Headline */}
                                <h4
                                    style={{
                                        fontSize: 'clamp(1.25rem, 1.5vw, 1.45rem)',
                                        lineHeight: 1.28,
                                        fontFamily: 'var(--font-serif-accent)',
                                        fontWeight: 400,
                                        fontStyle: 'italic',
                                        color: 'var(--color-brand-forrest)',
                                        marginBottom: '1rem',
                                        maxWidth: '260px',
                                        textAlign: 'center'
                                    }}
                                >
                                    No {minLength}h+ audiobooks found in {selectedGenre === 'All' ? 'this duration' : selectedGenre} yet &rarr;
                                </h4>

                                {/* Centered Description */}
                                <p
                                    style={{
                                        fontSize: '0.92rem',
                                        color: 'var(--color-brand-slate)',
                                        lineHeight: 1.5,
                                        marginBottom: '2rem',
                                        maxWidth: '240px',
                                        textAlign: 'center',
                                        opacity: 0.85
                                    }}
                                >
                                    Try selecting a shorter duration or browse all titles in the full Long Book Finder.
                                </p>

                                {/* Centered Pill Button */}
                                <div className="portal-cta-btn">
                                    <span>Open Full Finder</span>
                                    <span style={{ fontSize: '1.15em', lineHeight: 1 }}>&rarr;</span>
                                </div>
                            </Link>
                        </article>
                    </div>
                ) : (
                    <>
                        {/* Books 1 - 3 with Staggered Fade Up */}
                        {displayedBooks.map((book, idx) => (
                            <div
                                key={`${book.id}-${minLength}-${selectedGenre}`}
                                className="quick-finder-card-anim"
                                style={{ animationDelay: `${idx * 75}ms` }}
                            >
                                <BookCard book={book} />
                            </div>
                        ))}

                        {/* Card 4: Full White Background & Centered Spacing */}
                        <div
                            key={`portal-${minLength}-${selectedGenre}`}
                            className="quick-finder-card-anim"
                            style={{ animationDelay: `${displayedBooks.length * 75}ms` }}
                        >
                            <article
                                className="book-card quick-finder-portal-card"
                                style={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: '0',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: '1px solid rgba(44, 81, 67, 0.12)',
                                    height: '100%',
                                    position: 'relative',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                    transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'none';
                                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                                }}
                            >
                                <Link
                                    to={finderTargetUrl}
                                    className="portal-card-link"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        height: '100%',
                                        padding: 'clamp(2.5rem, 3.5vw, 3.25rem) 1.5rem',
                                        boxSizing: 'border-box',
                                        textDecoration: 'none',
                                        color: 'inherit'
                                    }}
                                >
                                    {/* Centered Coral Circle showing Total Book Count */}
                                    <div
                                        style={{
                                            width: '136px',
                                            height: '136px',
                                            borderRadius: '50%',
                                            backgroundColor: 'var(--color-brand-coral)',
                                            color: '#ffffff',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            boxShadow: '0 6px 18px rgba(224, 90, 71, 0.28)',
                                            marginBottom: '1.75rem',
                                            flexShrink: 0
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: totalMatching >= 100 ? '2.75rem' : '3.25rem',
                                                fontWeight: 400,
                                                fontFamily: 'Lora, Georgia, serif',
                                                fontStyle: 'italic',
                                                letterSpacing: '-0.03em',
                                                lineHeight: 1
                                            }}
                                        >
                                            {totalMatching}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: '0.68rem',
                                                fontWeight: 600,
                                                fontFamily: 'Inter, sans-serif',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.06em',
                                                marginTop: '4px',
                                                opacity: 0.95
                                            }}
                                        >
                                            {totalMatching === 1 ? 'audiobook' : 'audiobooks'}
                                        </span>
                                    </div>

                                    {/* Centered Header Text */}
                                    <h4
                                        style={{
                                            fontSize: 'clamp(1.25rem, 1.5vw, 1.45rem)',
                                            lineHeight: 1.28,
                                            fontFamily: 'var(--font-serif-accent)',
                                            fontWeight: 400,
                                            fontStyle: 'italic',
                                            color: 'var(--color-brand-forrest)',
                                            marginBottom: '1rem',
                                            maxWidth: '260px',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {portalHeadline}
                                    </h4>

                                    {/* Centered Description */}
                                    <p
                                        style={{
                                            fontSize: '0.92rem',
                                            color: 'var(--color-brand-slate)',
                                            lineHeight: 1.5,
                                            marginBottom: '2rem',
                                            maxWidth: '240px',
                                            textAlign: 'center',
                                            opacity: 0.85
                                        }}
                                    >
                                        Filter by narrator styles, search by author, and find your next deep listen.
                                    </p>

                                    {/* Centered Pill Button */}
                                    <div className="portal-cta-btn">
                                        <span>Open Finder</span>
                                        <span style={{ fontSize: '1.15em', lineHeight: 1 }}>&rarr;</span>
                                    </div>
                                </Link>
                            </article>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};
