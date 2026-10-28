import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6';

import { StickyHeader } from './StickyHeader';
import { useHeaderContext } from '../context/HeaderContext';
import { collections } from '../data/collections';
import { books } from '../data/books';

export const Header = () => {
    const { pathname } = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme } = useHeaderContext();

    // Dynamically calculate live counts for directory subheadings
    const { totalCollections, totalBooksRounded, totalNarrators, totalAuthors } = useMemo(() => {
        const collCount = collections.length;
        const roundedBooks = `${Math.floor(books.length / 50) * 50}+`;
        const authors = new Set<string>();
        const narrators = new Set<string>();

        books.forEach(b => {
            if (b.author) {
                b.author.split(/,|&| and /i).forEach(a => {
                    const clean = a.trim();
                    if (clean) authors.add(clean);
                });
            }
            if (b.narrator) {
                b.narrator.replace(/\((UK|US|Unabridged|GraphicAudio|Anniversary[^\)]*)\)/gi, '')
                          .split(/,|\/| and |&/i).forEach(n => {
                    const clean = n.trim().replace(/^Full Cast$/i, '').replace(/^[,\s]+|[,\s]+$/g, '');
                    if (clean.length > 2 && !clean.toLowerCase().includes('full cast') && !clean.toLowerCase().includes('graphicaudio')) {
                        narrators.add(clean);
                    }
                });
            }
        });

        return {
            totalCollections: collCount,
            totalBooksRounded: roundedBooks,
            totalNarrators: narrators.size || 177,
            totalAuthors: authors.size || 166
        };
    }, []);

    // Close menu on route change
    useEffect(() => {
        if (isMenuOpen) setIsMenuOpen(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    // Determine if we are on a page with a Hero section (Home or Collections)
    // NOTE: This logic might be redundant if we use the Context correctly on all pages,
    // but for now we keep the layout logic simple. All pages get the new header structure.

    return (
        <>
            <StickyHeader onMenuOpen={() => setIsMenuOpen(true)} />

            {/* Static "Chameleon" Header */}
            <header style={{
                padding: 'clamp(2rem, 3vw, 2.5rem) clamp(2rem, 6vw, 3.5rem)', // Increased padding (Top/Bottom, Left/Right)
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                display: 'flex', // Default to Flex for Mobile
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'transparent',
                pointerEvents: 'none' // Allow clicks to pass through empty space
            }} className="site-header">
                {/* 1. LEFT: Logo */}
                <Link to="/" className="nav-interactive" style={{ display: 'block', visibility: pathname === '/' ? 'hidden' : 'visible', justifySelf: 'start', pointerEvents: pathname === '/' ? 'none' : 'auto' }}>
                    <div className="header-logo" style={{
                        width: '140px', // Mobile Size (Significantly Larger)
                        height: '78px',
                        backgroundColor: isMenuOpen ? 'var(--color-brand-coral)' : theme.logoColor,
                        transition: 'background-color 0.3s ease',
                        maskImage: 'url(/assets/lbc-logo-stack-v2.svg)',
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'left center',
                        WebkitMaskImage: 'url(/assets/lbc-logo-stack-v2.svg)',
                        WebkitMaskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'left center',
                    }} />
                </Link>

                {/* 2. CENTER: Navigation Links (Desktop Only) */}
                <nav className="desktop-nav" style={{
                    justifySelf: 'center',
                    display: 'none', // Hidden by default (mobile), shown via media query
                    gap: '0.75rem',
                    alignItems: 'center',
                    pointerEvents: isMenuOpen ? 'none' : 'auto', // Disable clicks when menu open
                    opacity: isMenuOpen ? 0 : 1, // Hide when menu open
                    transition: 'opacity 0.3s ease'
                }}>
                    {[
                        { id: 'finder', label: 'Long Book Finder', path: '/long-book-finder/' },
                        { id: 'collections', label: 'Collections', path: '/collections/' },
                        { id: 'narrators', label: 'Narrators', path: '/narrators/' },
                        { id: 'journal', label: 'Journal', path: '/journal/' }
                    ].map(link => {
                        const isActive = theme.activeLink === link.id;
                        return (
                            <Link
                                key={link.id}
                                to={link.path}
                                className="nav-text-hover"
                                style={{
                                    fontFamily: 'Lora, serif',
                                    fontSize: 'clamp(1.1rem, 1.25vw, 1.25rem)',
                                    color: isActive ? theme.activeLinkText : theme.textColor,
                                    textDecoration: 'none',
                                    padding: '0.45rem 1.25rem',
                                    borderRadius: '50px', // Lozenge shape
                                    backgroundColor: isActive ? theme.activeLinkBg : 'transparent',
                                    transition: 'background-color 0.3s ease, color 0.3s ease',
                                    fontWeight: isActive ? 600 : 400,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <style>{`
                    @media (min-width: 960px) {
                        .site-header {
                            display: grid !important;
                            grid-template-columns: 1fr auto 1fr !important;
                            justify-content: unset !important;
                        }
                        .header-logo {
                            width: 180px !important; // Desktop Size (Bolder)
                            height: 100px !important;
                        }
                        .desktop-nav {
                            display: flex !important;
                        }
                    }
                `}</style>


                {/* 3. RIGHT: Hamburger Menu */}
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="nav-interactive"
                    style={{
                        justifySelf: 'end',
                        background: 'none',
                        border: 'none',
                        color: theme.hamburgerColor,
                        cursor: 'pointer',
                        padding: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: isMenuOpen ? 'none' : 'auto', // Disable when open (let close button underneath work)
                        opacity: isMenuOpen ? 0 : 1, // Hide when open
                        transition: 'opacity 0.3s ease',
                        touchAction: 'manipulation',
                        WebkitTapHighlightColor: 'transparent'
                    }}
                    aria-label="Open Menu"
                >
                    {/* Sage Hamburger (Sharp Corners) - Size 32 (smaller for nav) */}
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 4H21" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
                        <path d="M3 12H21" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
                        <path d="M3 20H21" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
                    </svg>
                </button>
            </header>

            {/* Full Screen Overlay - Page Turn Effect */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'color-mix(in srgb, var(--color-brand-slate), black 20%)',
                color: 'var(--color-brand-coral-light)',
                zIndex: 100000,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transformOrigin: 'right center',
                transform: isMenuOpen ? 'perspective(2000px) rotateY(0deg)' : 'perspective(2000px) rotateY(90deg)',
                opacity: isMenuOpen ? 1 : 0,
                visibility: isMenuOpen ? 'visible' : 'hidden',
                transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease, visibility 0.6s',
                boxShadow: isMenuOpen ? 'inset -20px 0 50px rgba(0,0,0,0.3)' : 'none',
            }}>
                <button
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                        position: 'absolute',
                        top: '2rem',
                        right: 'clamp(1.5rem, 5vw, 3rem)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-brand-coral)', // Updated to Coral
                        cursor: 'pointer',
                        padding: '0.5rem',
                        touchAction: 'manipulation',
                        WebkitTapHighlightColor: 'transparent'
                    }}
                    aria-label="Close Menu"
                >
                    {/* Sage Close Icon (Sharp Corners) - Size 40 - Stroke 4 */}
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
                        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
                    </svg>
                </button>

                {/* 3-Column Literary Editorial Index Takeover */}
                <div
                    className="menu-overlay-container"
                    style={{
                        width: '100%',
                        maxWidth: '1240px',
                        margin: '0 auto',
                        padding: 'clamp(3rem, 5vw, 4.25rem) clamp(1.5rem, 5vw, 3.5rem) clamp(2rem, 3.5vw, 3rem) clamp(1.5rem, 5vw, 3.5rem)',
                        maxHeight: '94vh',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxSizing: 'border-box'
                    }}
                >
                    {/* Top Centered Brand Block */}
                    <div
                        className="menu-brand-block"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            marginBottom: 'clamp(2rem, 3.5vw, 2.75rem)'
                        }}
                    >
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                display: 'inline-block',
                                textDecoration: 'none',
                                marginBottom: 'clamp(1.5rem, 4.5vw, 4.5rem)', // Doubled space under logo on desktop
                                transition: 'transform 0.25s ease'
                            }}
                            className="menu-logo-link"
                        >
                            <img
                                src="/assets/lbc-logo-stack-coral.svg"
                                alt="The Long Book Club"
                                className="menu-logo-img"
                                style={{
                                    width: 'clamp(185px, 16vw, 220px)',
                                    height: 'auto',
                                    display: 'block',
                                    margin: '0 auto'
                                }}
                            />
                        </Link>
                        <div
                            className="menu-tagline"
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: 'clamp(0.68rem, 0.8vw, 0.75rem)',
                                fontWeight: 700,
                                letterSpacing: '0.16em',
                                textTransform: 'uppercase',
                                color: 'var(--color-brand-coral)',
                                opacity: 0.9,
                                marginBottom: 'clamp(1.5rem, 2.5vw, 2.25rem)'
                            }}
                        >
                            THE LONG BOOK CLUB DIRECTORY • CURATED LONG-FORM AUDIOBOOK IMMERSION
                        </div>
                        <div style={{
                            width: '100%',
                            height: '1px',
                            backgroundColor: 'var(--color-brand-coral)',
                            opacity: 0.25
                        }} />
                    </div>

                    {/* 3-Column Content Grid */}
                    <div className="menu-columns-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 'clamp(2rem, 3.5vw, 3.5rem)',
                        alignItems: 'start',
                        textAlign: 'left'
                    }}>
                        {/* COLUMN 1: CURATED COLLECTIONS */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                color: 'var(--color-brand-coral)',
                                marginBottom: '0.85rem'
                            }}>
                                01 / Curated Sagas
                            </div>
                            <Link
                                to="/collections/"
                                onClick={() => setIsMenuOpen(false)}
                                className="menu-primary-link"
                                style={{
                                    fontFamily: 'var(--font-serif-accent)',
                                    fontStyle: 'italic',
                                    fontWeight: 400,
                                    fontSize: 'clamp(2.7rem, 3.1vw, 3.6rem)', // 15% bigger
                                    color: 'var(--color-brand-coral)',
                                    textDecoration: 'none',
                                    lineHeight: 0.96,
                                    letterSpacing: '-0.035em',
                                    display: 'inline-block',
                                    transition: 'color 0.25s ease, transform 0.25s ease'
                                }}
                            >
                                <span>Curated<br />Collections</span>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: '-1px', marginLeft: '0.45rem', opacity: 0.8, transition: 'transform 0.2s ease, opacity 0.2s ease' }}>
                                    <line x1="4" y1="12" x2="20" y2="12" />
                                    <polyline points="14 6 20 12 14 18" />
                                </svg>
                            </Link>
                            <span style={{
                                fontFamily: 'var(--font-serif-accent)',
                                fontStyle: 'italic',
                                fontWeight: 400,
                                fontSize: '0.82rem',
                                color: 'var(--color-brand-coral)',
                                opacity: 0.85,
                                marginTop: '0.95rem', // More space under heading
                                display: 'block'
                            }}>
                                {totalCollections} Collections of compelling curated themes
                            </span>
                            <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--color-brand-coral)', opacity: 0.25, marginTop: '1.25rem', marginBottom: '1.25rem' }} />

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {[
                                    { label: `EXPLORE ALL ${totalCollections} COLLECTIONS →`, path: '/collections/', isSpecial: true },
                                    { label: 'SILKPUNK & ASIAN FANTASY', path: '/collections/silkpunk/' },
                                    { label: 'BRITISH ESPIONAGE & COLD WAR', path: '/collections/british-espionage/' },
                                    { label: 'EPIC ROMANTASY LONG LISTENS', path: '/collections/romantasy/' },
                                    { label: 'GRIMDARK & MORAL AMBIGUITY', path: '/collections/grimdark-fantasy/' },
                                    { label: 'CINEMATIC FULL-CAST AUDIO', path: '/collections/graphic-audio/' },
                                    { label: 'THE LONGEST EVER (60+ HOURS)', path: '/collections/longest-ever/' }
                                ].map(item => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="menu-sub-link"
                                        style={{
                                            fontFamily: 'Inter, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '0.78rem',
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase',
                                            color: 'var(--color-brand-coral)',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s ease, transform 0.2s ease',
                                            lineHeight: 1.4,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.55rem'
                                        }}
                                    >
                                        <span className="menu-bullet" style={{ color: 'var(--color-brand-coral)', fontSize: '0.85rem', flexShrink: 0, opacity: 0.9, transition: 'color 0.2s ease, opacity 0.2s ease' }}>•</span>
                                        <span>{item.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* COLUMN 2: LIBRARY & SUBGENRES */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                color: 'var(--color-brand-coral)',
                                marginBottom: '0.85rem'
                            }}>
                                02 / Library & Niches
                            </div>
                            <Link
                                to="/long-book-finder/"
                                onClick={() => setIsMenuOpen(false)}
                                className="menu-primary-link"
                                style={{
                                    fontFamily: 'var(--font-serif-accent)',
                                    fontStyle: 'italic',
                                    fontWeight: 400,
                                    fontSize: 'clamp(2.7rem, 3.1vw, 3.6rem)', // 15% bigger
                                    color: 'var(--color-brand-coral)',
                                    textDecoration: 'none',
                                    lineHeight: 0.96,
                                    letterSpacing: '-0.035em',
                                    display: 'inline-block',
                                    transition: 'color 0.25s ease, transform 0.25s ease'
                                }}
                            >
                                <span>Long Book<br />Finder</span>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: '-1px', marginLeft: '0.45rem', opacity: 0.8, transition: 'transform 0.2s ease, opacity 0.2s ease' }}>
                                    <line x1="4" y1="12" x2="20" y2="12" />
                                    <polyline points="14 6 20 12 14 18" />
                                </svg>
                            </Link>
                            <span style={{
                                fontFamily: 'var(--font-serif-accent)',
                                fontStyle: 'italic',
                                fontWeight: 400,
                                fontSize: '0.82rem',
                                color: 'var(--color-brand-coral)',
                                opacity: 0.85,
                                marginTop: '0.95rem', // More space under heading
                                display: 'block'
                            }}>
                                Filter {totalBooksRounded} audiobooks by hours & tags
                            </span>
                            <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--color-brand-coral)', opacity: 0.25, marginTop: '1.25rem', marginBottom: '1.25rem' }} />

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {[
                                    { label: 'THE LONG BOOK FINDER TOOL HOME', path: '/long-book-finder/' },
                                    { label: 'PROGRESSION FANTASY & LITRPG', path: '/genre/progression-fantasy/' },
                                    { label: 'COZY FANTASY & SLICE-OF-LIFE', path: '/genre/cozy-fantasy/' },
                                    { label: 'SPACE OPERA & GALACTIC EMPIRE', path: '/genre/space-opera/' },
                                    { label: 'DARK ACADEMIA & COLLEGIATE GOTHIC', path: '/genre/dark-academia/' },
                                    { label: 'NORDIC NOIR & SCANDI PROCEDURALS', path: '/genre/nordic-noir/' },
                                    { label: 'HISTORICAL FICTION EPICS', path: '/genre/historical-fiction/' }
                                ].map(item => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="menu-sub-link"
                                        style={{
                                            fontFamily: 'Inter, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '0.78rem',
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase',
                                            color: 'var(--color-brand-coral)',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s ease, transform 0.2s ease',
                                            lineHeight: 1.4,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.55rem'
                                        }}
                                    >
                                        <span className="menu-bullet" style={{ color: 'var(--color-brand-coral)', fontSize: '0.85rem', flexShrink: 0, opacity: 0.9, transition: 'color 0.2s ease, opacity 0.2s ease' }}>•</span>
                                        <span>{item.label}</span>
                                    </Link>
                                ))}
                            </div>

                            {/* The Journal */}
                            <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--color-brand-coral)', opacity: 0.25, marginTop: '1.5rem', marginBottom: '1.25rem' }} />
                            <div>
                                <Link
                                    to="/journal/"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="menu-primary-link"
                                    style={{
                                        fontFamily: 'var(--font-serif-accent)',
                                        fontStyle: 'italic',
                                        fontWeight: 400,
                                        fontSize: 'clamp(1.65rem, 1.85vw, 2.05rem)',
                                        color: 'var(--color-brand-coral)',
                                        textDecoration: 'none',
                                        lineHeight: 1.1,
                                        letterSpacing: '-0.035em',
                                        display: 'inline-block',
                                        transition: 'color 0.25s ease, transform 0.25s ease'
                                    }}
                                >
                                    <span>The Journal</span>
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: '-1px', marginLeft: '0.45rem', opacity: 0.8, transition: 'transform 0.2s ease, opacity 0.2s ease' }}>
                                        <line x1="4" y1="12" x2="20" y2="12" />
                                        <polyline points="14 6 20 12 14 18" />
                                    </svg>
                                </Link>
                                <span style={{
                                    fontFamily: 'var(--font-serif-accent)',
                                    fontStyle: 'italic',
                                    fontWeight: 400,
                                    fontSize: '0.82rem',
                                    color: 'var(--color-brand-coral)',
                                    opacity: 0.85,
                                    marginTop: '0.35rem',
                                    display: 'block'
                                }}>
                                    Deep-dive essays, guides & listening stamina
                                </span>
                            </div>
                        </div>

                        {/* COLUMN 3: THE CREATORS */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                color: 'var(--color-brand-coral)',
                                marginBottom: '0.85rem'
                            }}>
                                03 / The Creators
                            </div>
                            <Link
                                to="/narrators/"
                                onClick={() => setIsMenuOpen(false)}
                                className="menu-primary-link"
                                style={{
                                    fontFamily: 'var(--font-serif-accent)',
                                    fontStyle: 'italic',
                                    fontWeight: 400,
                                    fontSize: 'clamp(2.7rem, 3.1vw, 3.6rem)', // 15% bigger
                                    color: 'var(--color-brand-coral)',
                                    textDecoration: 'none',
                                    lineHeight: 0.96,
                                    letterSpacing: '-0.035em',
                                    display: 'inline-block',
                                    transition: 'color 0.25s ease, transform 0.25s ease'
                                }}
                            >
                                <span>Narrators<br />Hub</span>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: '-1px', marginLeft: '0.45rem', opacity: 0.8, transition: 'transform 0.2s ease, opacity 0.2s ease' }}>
                                    <line x1="4" y1="12" x2="20" y2="12" />
                                    <polyline points="14 6 20 12 14 18" />
                                </svg>
                            </Link>
                            <span style={{
                                fontFamily: 'var(--font-serif-accent)',
                                fontStyle: 'italic',
                                fontWeight: 400,
                                fontSize: '0.82rem',
                                color: 'var(--color-brand-coral)',
                                opacity: 0.85,
                                marginTop: '0.95rem', // More space under heading
                                display: 'block'
                            }}>
                                {totalNarrators} voice talents & verified Soundchecks
                            </span>
                            <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--color-brand-coral)', opacity: 0.25, marginTop: '1.25rem', marginBottom: '1.25rem' }} />

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {[
                                    { label: '100+ HOUR HALL OF FAME LEADERBOARD', path: '/narrators/leaderboard/' },
                                    { label: 'BROWSE BY VOCAL STYLE BADGES', path: '/narrators/' },
                                    { label: 'GRAVELLY & AUTHORITATIVE NARRATORS', path: '/narrator-styles/gravelly-authoritative/' },
                                    { label: 'THEATRICAL & DYNAMIC PERFORMERS', path: '/narrator-styles/theatrical-dynamic/' }
                                ].map(item => (
                                    <Link
                                        key={item.label}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="menu-sub-link"
                                        style={{
                                            fontFamily: 'Inter, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '0.78rem',
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase',
                                            color: 'var(--color-brand-coral)',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s ease, transform 0.2s ease',
                                            lineHeight: 1.4,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.55rem'
                                        }}
                                    >
                                        <span className="menu-bullet" style={{ color: 'var(--color-brand-coral)', fontSize: '0.85rem', flexShrink: 0, opacity: 0.9, transition: 'color 0.2s ease, opacity 0.2s ease' }}>•</span>
                                        <span>{item.label}</span>
                                    </Link>
                                ))}
                            </div>

                            {/* Authors Directory */}
                            <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--color-brand-coral)', opacity: 0.25, marginTop: '1.5rem', marginBottom: '1.25rem' }} />
                            <div>
                                <Link
                                    to="/authors/"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="menu-primary-link"
                                    style={{
                                        fontFamily: 'var(--font-serif-accent)',
                                        fontStyle: 'italic',
                                        fontWeight: 400,
                                        fontSize: 'clamp(1.65rem, 1.85vw, 2.05rem)',
                                        color: 'var(--color-brand-coral)',
                                        textDecoration: 'none',
                                        lineHeight: 1.1,
                                        letterSpacing: '-0.035em',
                                        display: 'inline-block',
                                        transition: 'color 0.25s ease, transform 0.25s ease'
                                    }}
                                >
                                    <span>Authors Directory</span>
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: '-1px', marginLeft: '0.45rem', opacity: 0.8, transition: 'transform 0.2s ease, opacity 0.2s ease' }}>
                                        <line x1="4" y1="12" x2="20" y2="12" />
                                        <polyline points="14 6 20 12 14 18" />
                                    </svg>
                                </Link>
                                <span style={{
                                    fontFamily: 'var(--font-serif-accent)',
                                    fontStyle: 'italic',
                                    fontWeight: 400,
                                    fontSize: '0.82rem',
                                    color: 'var(--color-brand-coral)',
                                    opacity: 0.85,
                                    marginTop: '0.35rem',
                                    display: 'block'
                                }}>
                                    {totalAuthors} master storytellers & epic worldbuilders
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Understated Footer Strip - Left Links, Right Socials */}
                    <div style={{
                        marginTop: 'clamp(2rem, 3.5vw, 3.5rem)',
                        paddingTop: '1.25rem',
                        borderTop: '1px solid rgba(255, 107, 74, 0.25)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        fontSize: '0.82rem',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        color: 'var(--color-brand-coral)'
                    }}>
                        {/* Links */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.85rem',
                            flexWrap: 'wrap'
                        }}>
                            <Link
                                to="/"
                                onClick={() => setIsMenuOpen(false)}
                                className="menu-footer-link"
                                style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
                            >
                                Home
                            </Link>
                            <span style={{ color: 'var(--color-brand-coral)', opacity: 0.7 }}>•</span>
                            <Link
                                to="/about/"
                                onClick={() => setIsMenuOpen(false)}
                                className="menu-footer-link"
                                style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
                            >
                                About The Club
                            </Link>
                            <span style={{ color: 'var(--color-brand-coral)', opacity: 0.7 }}>•</span>
                            <Link
                                to="/privacy/"
                                onClick={() => setIsMenuOpen(false)}
                                className="menu-footer-link"
                                style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
                            >
                                Privacy Policy
                            </Link>
                            <span style={{ color: 'var(--color-brand-coral)', opacity: 0.7 }}>•</span>
                            <span>&copy; {new Date().getFullYear()} The Long Book Club</span>
                        </div>

                        {/* Social Icons */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.25rem'
                        }}>
                            <a
                                href="https://www.instagram.com/thelongbookclub"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="menu-social-link"
                                style={{ color: 'var(--color-brand-coral)', fontSize: '1.15rem', transition: 'color 0.2s, transform 0.2s' }}
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="https://www.tiktok.com/@thelongbookclub"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="menu-social-link"
                                style={{ color: 'var(--color-brand-coral)', fontSize: '1.15rem', transition: 'color 0.2s, transform 0.2s' }}
                                aria-label="TikTok"
                            >
                                <FaTiktok />
                            </a>
                            <a
                                href="https://www.youtube.com/@TheLongBookClub"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="menu-social-link"
                                style={{ color: 'var(--color-brand-coral)', fontSize: '1.15rem', transition: 'color 0.2s, transform 0.2s' }}
                                aria-label="YouTube"
                            >
                                <FaYoutube />
                            </a>
                        </div>
                    </div>
                </div>

                <style>{`
                    .menu-primary-link:hover {
                        color: var(--color-brand-cloud) !important;
                        transform: translateX(4px);
                    }
                    .menu-primary-link:hover svg {
                        opacity: 1 !important;
                        transform: translateX(3px);
                    }
                    .menu-sub-link:hover {
                        color: var(--color-brand-cloud) !important;
                        transform: translateX(4px);
                    }
                    .menu-sub-link:hover .menu-bullet {
                        color: var(--color-brand-cloud) !important;
                        opacity: 1 !important;
                    }
                    .menu-footer-link:hover {
                        color: var(--color-brand-cloud) !important;
                    }
                    .menu-social-link:hover {
                        color: var(--color-brand-cloud) !important;
                        transform: scale(1.18);
                    }
                    .menu-logo-link:hover {
                        transform: scale(1.03);
                    }
                    @media (max-width: 880px) {
                        .menu-overlay-container {
                            padding: 2.25rem 1.25rem 2rem 1.25rem !important;
                        }
                        .menu-brand-block {
                            margin-bottom: 1.5rem !important;
                        }
                        .menu-logo-link {
                            margin-bottom: 1.15rem !important;
                        }
                        .menu-logo-img {
                            width: 140px !important;
                        }
                        .menu-tagline {
                            margin-bottom: 1.15rem !important;
                            font-size: 0.65rem !important;
                            letter-spacing: 0.12em !important;
                        }
                        .menu-columns-grid {
                            grid-template-columns: 1fr !important;
                            gap: 2.25rem !important;
                        }
                    }
                `}</style>




            </div>
        </>
    );
};
