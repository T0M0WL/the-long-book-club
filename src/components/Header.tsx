import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6';

import { StickyHeader } from './StickyHeader';
import { useHeaderContext } from '../context/HeaderContext';

export const Header = () => {
    const { pathname } = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme } = useHeaderContext();

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
                color: 'var(--color-brand-cloud)',
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
                <div style={{
                    width: '100%',
                    maxWidth: '1240px',
                    margin: '0 auto',
                    padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 3.5rem) clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 3.5rem)',
                    maxHeight: '94vh',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box'
                }}>
                    {/* Header Strip inside Overlay */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 'clamp(2rem, 3.5vw, 2.75rem)',
                        borderBottom: '1px solid rgba(203, 214, 171, 0.2)',
                        paddingBottom: '1rem'
                    }}>
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}
                        >
                            <img src="/assets/lbc-fav.svg" alt="" style={{ height: '30px', width: 'auto' }} />
                            <span style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'var(--color-brand-sage)'
                            }}>
                                The Long Book Club • Directory
                            </span>
                        </Link>
                        <span className="menu-hide-on-mobile" style={{
                            fontFamily: 'var(--font-serif-accent)',
                            fontStyle: 'italic',
                            fontSize: '0.9rem',
                            color: 'rgba(234, 232, 218, 0.65)'
                        }}>
                            Curated 10+ Hour Audio Immersion
                        </span>
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
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                color: 'var(--color-brand-coral)',
                                marginBottom: '0.75rem'
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
                                    fontWeight: 500,
                                    fontSize: 'clamp(1.85rem, 2.3vw, 2.35rem)',
                                    color: 'var(--color-brand-cloud)',
                                    textDecoration: 'none',
                                    lineHeight: 1.15,
                                    marginBottom: '0.85rem',
                                    transition: 'color 0.25s ease, transform 0.25s ease',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.45rem'
                                }}
                            >
                                <span>Curated Collections</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7, flexShrink: 0, transition: 'transform 0.2s ease, opacity 0.2s ease' }}>
                                    <line x1="4" y1="12" x2="20" y2="12" />
                                    <polyline points="14 6 20 12 14 18" />
                                </svg>
                            </Link>
                            <div style={{ width: '35px', height: '1px', backgroundColor: 'var(--color-brand-coral)', opacity: 0.5, marginBottom: '1.25rem' }} />

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                                {[
                                    { label: 'Silkpunk & Asian Fantasy', path: '/collections/silkpunk/' },
                                    { label: 'British Espionage & Cold War', path: '/collections/british-espionage/' },
                                    { label: 'Epic Romantasy Long Listens', path: '/collections/romantasy/' },
                                    { label: 'Grimdark & Moral Ambiguity', path: '/collections/grimdark-fantasy/' },
                                    { label: 'Cinematic Full-Cast Audio', path: '/collections/graphic-audio/' },
                                    { label: 'The Longest Ever (60+ Hours)', path: '/collections/longest-ever/' },
                                    { label: 'Explore All 16 Collections →', path: '/collections/', isSpecial: true }
                                ].map(item => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="menu-sub-link"
                                        style={{
                                            fontFamily: 'var(--font-serif-accent)',
                                            fontSize: item.isSpecial ? '0.95rem' : '1.05rem',
                                            fontWeight: item.isSpecial ? 600 : 400,
                                            fontStyle: item.isSpecial ? 'italic' : 'normal',
                                            color: item.isSpecial ? 'var(--color-brand-coral)' : 'rgba(234, 232, 218, 0.85)',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s ease, transform 0.2s ease',
                                            lineHeight: 1.3
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* COLUMN 2: LIBRARY & SUBGENRES */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                color: 'var(--color-brand-coral)',
                                marginBottom: '0.75rem'
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
                                    fontWeight: 500,
                                    fontSize: 'clamp(1.85rem, 2.3vw, 2.35rem)',
                                    color: 'var(--color-brand-cloud)',
                                    textDecoration: 'none',
                                    lineHeight: 1.15,
                                    marginBottom: '0.35rem',
                                    transition: 'color 0.25s ease, transform 0.25s ease',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.45rem'
                                }}
                            >
                                <span>Long Book Finder</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7, flexShrink: 0, transition: 'transform 0.2s ease, opacity 0.2s ease' }}>
                                    <line x1="4" y1="12" x2="20" y2="12" />
                                    <polyline points="14 6 20 12 14 18" />
                                </svg>
                            </Link>
                            <span style={{ fontFamily: 'var(--font-serif-accent)', fontSize: '0.9rem', color: 'var(--color-brand-sage)', opacity: 0.85, marginBottom: '0.75rem' }}>
                                Filter 450+ audiobooks by hours & tags
                            </span>
                            <div style={{ width: '35px', height: '1px', backgroundColor: 'var(--color-brand-coral)', opacity: 0.5, marginBottom: '1.25rem' }} />

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                                {[
                                    { label: 'Progression Fantasy & LitRPG', path: '/genre/progression-fantasy/' },
                                    { label: 'Cozy Fantasy & Slice-of-Life', path: '/genre/cozy-fantasy/' },
                                    { label: 'Space Opera & Galactic Empire', path: '/genre/space-opera/' },
                                    { label: 'Dark Academia & Collegiate Gothic', path: '/genre/dark-academia/' },
                                    { label: 'Nordic Noir & Scandi Procedurals', path: '/genre/nordic-noir/' },
                                    { label: 'Historical Fiction Epics', path: '/genre/historical-fiction/' }
                                ].map(item => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="menu-sub-link"
                                        style={{
                                            fontFamily: 'var(--font-serif-accent)',
                                            fontSize: '1.05rem',
                                            color: 'rgba(234, 232, 218, 0.85)',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s ease, transform 0.2s ease',
                                            lineHeight: 1.3
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            {/* The Journal */}
                            <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px dashed rgba(203, 214, 171, 0.25)' }}>
                                <Link
                                    to="/journal/"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="menu-primary-link"
                                    style={{
                                        fontFamily: 'var(--font-serif-accent)',
                                        fontStyle: 'italic',
                                        fontWeight: 500,
                                        fontSize: '1.5rem',
                                        color: 'var(--color-brand-cloud)',
                                        textDecoration: 'none',
                                        lineHeight: 1.2,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.45rem',
                                        marginBottom: '0.25rem',
                                        transition: 'color 0.25s ease, transform 0.25s ease'
                                    }}
                                >
                                    <span>The Journal</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7, flexShrink: 0, transition: 'transform 0.2s ease, opacity 0.2s ease' }}>
                                        <line x1="4" y1="12" x2="20" y2="12" />
                                        <polyline points="14 6 20 12 14 18" />
                                    </svg>
                                </Link>
                                <span style={{ fontFamily: 'var(--font-serif-accent)', fontSize: '0.85rem', color: 'rgba(234, 232, 218, 0.65)' }}>
                                    Deep-dive essays, guides & listening stamina
                                </span>
                            </div>
                        </div>

                        {/* COLUMN 3: THE CREATORS */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                color: 'var(--color-brand-coral)',
                                marginBottom: '0.75rem'
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
                                    fontWeight: 500,
                                    fontSize: 'clamp(1.85rem, 2.3vw, 2.35rem)',
                                    color: 'var(--color-brand-cloud)',
                                    textDecoration: 'none',
                                    lineHeight: 1.15,
                                    marginBottom: '0.35rem',
                                    transition: 'color 0.25s ease, transform 0.25s ease',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.45rem'
                                }}
                            >
                                <span>Narrators Hub</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7, flexShrink: 0, transition: 'transform 0.2s ease, opacity 0.2s ease' }}>
                                    <line x1="4" y1="12" x2="20" y2="12" />
                                    <polyline points="14 6 20 12 14 18" />
                                </svg>
                            </Link>
                            <span style={{ fontFamily: 'var(--font-serif-accent)', fontSize: '0.9rem', color: 'var(--color-brand-sage)', opacity: 0.85, marginBottom: '0.75rem' }}>
                                177 voice talents & verified Soundchecks
                            </span>
                            <div style={{ width: '35px', height: '1px', backgroundColor: 'var(--color-brand-coral)', opacity: 0.5, marginBottom: '1.25rem' }} />

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                                {[
                                    { label: '100+ Hour Hall of Fame Leaderboard', path: '/narrators/leaderboard/' },
                                    { label: 'Browse by Vocal Style Badges', path: '/narrators/' },
                                    { label: 'Gravelly & Authoritative Narrators', path: '/narrator-styles/gravelly-authoritative/' },
                                    { label: 'Theatrical & Dynamic Performers', path: '/narrator-styles/theatrical-dynamic/' }
                                ].map(item => (
                                    <Link
                                        key={item.label}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="menu-sub-link"
                                        style={{
                                            fontFamily: 'var(--font-serif-accent)',
                                            fontSize: '1.05rem',
                                            color: 'rgba(234, 232, 218, 0.85)',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s ease, transform 0.2s ease',
                                            lineHeight: 1.3
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            {/* Authors Directory */}
                            <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px dashed rgba(203, 214, 171, 0.25)' }}>
                                <Link
                                    to="/authors/"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="menu-primary-link"
                                    style={{
                                        fontFamily: 'var(--font-serif-accent)',
                                        fontStyle: 'italic',
                                        fontWeight: 500,
                                        fontSize: '1.5rem',
                                        color: 'var(--color-brand-cloud)',
                                        textDecoration: 'none',
                                        lineHeight: 1.2,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.45rem',
                                        marginBottom: '0.25rem',
                                        transition: 'color 0.25s ease, transform 0.25s ease'
                                    }}
                                >
                                    <span>Authors Directory</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7, flexShrink: 0, transition: 'transform 0.2s ease, opacity 0.2s ease' }}>
                                        <line x1="4" y1="12" x2="20" y2="12" />
                                        <polyline points="14 6 20 12 14 18" />
                                    </svg>
                                </Link>
                                <span style={{ fontFamily: 'var(--font-serif-accent)', fontSize: '0.85rem', color: 'rgba(234, 232, 218, 0.65)' }}>
                                    166 master storytellers & epic worldbuilders
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Understated Footer Strip */}
                    <div style={{
                        marginTop: 'clamp(2rem, 3.5vw, 3rem)',
                        paddingTop: '1.25rem',
                        borderTop: '1px solid rgba(203, 214, 171, 0.2)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        fontSize: '0.85rem',
                        color: 'rgba(234, 232, 218, 0.6)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link
                                to="/"
                                onClick={() => setIsMenuOpen(false)}
                                style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-brand-coral)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'inherit'}
                            >
                                Home
                            </Link>
                            <span>•</span>
                            <Link
                                to="/about/"
                                onClick={() => setIsMenuOpen(false)}
                                style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-brand-coral)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'inherit'}
                            >
                                About The Club
                            </Link>
                            <span>•</span>
                            <Link
                                to="/privacy/"
                                onClick={() => setIsMenuOpen(false)}
                                style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-brand-coral)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'inherit'}
                            >
                                Privacy Policy
                            </Link>
                            <span>•</span>
                            <span>&copy; {new Date().getFullYear()} The Long Book Club</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                            <a
                                href="https://www.instagram.com/thelongbookclub"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'rgba(234, 232, 218, 0.6)', fontSize: '1.15rem', transition: 'color 0.2s, transform 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-brand-coral)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(234, 232, 218, 0.6)'; e.currentTarget.style.transform = 'scale(1)'; }}
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="https://www.tiktok.com/@thelongbookclub"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'rgba(234, 232, 218, 0.6)', fontSize: '1.15rem', transition: 'color 0.2s, transform 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-brand-coral)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(234, 232, 218, 0.6)'; e.currentTarget.style.transform = 'scale(1)'; }}
                                aria-label="TikTok"
                            >
                                <FaTiktok />
                            </a>
                            <a
                                href="https://www.youtube.com/@TheLongBookClub"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'rgba(234, 232, 218, 0.6)', fontSize: '1.15rem', transition: 'color 0.2s, transform 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-brand-coral)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(234, 232, 218, 0.6)'; e.currentTarget.style.transform = 'scale(1)'; }}
                                aria-label="YouTube"
                            >
                                <FaYoutube />
                            </a>
                        </div>
                    </div>
                </div>

                <style>{`
                    .menu-primary-link:hover {
                        color: var(--color-brand-sage) !important;
                        transform: translateX(4px);
                    }
                    .menu-primary-link:hover svg {
                        opacity: 1 !important;
                        transform: translateX(3px);
                    }
                    .menu-sub-link:hover {
                        color: var(--color-brand-coral) !important;
                        transform: translateX(4px);
                    }
                    @media (max-width: 880px) {
                        .menu-columns-grid {
                            grid-template-columns: 1fr !important;
                            gap: 2.75rem !important;
                        }
                        .menu-hide-on-mobile {
                            display: none !important;
                        }
                    }
                `}</style>




            </div>
        </>
    );
};
