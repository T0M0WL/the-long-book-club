import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
                    gap: '1rem',
                    alignItems: 'center',
                    pointerEvents: isMenuOpen ? 'none' : 'auto', // Disable clicks when menu open
                    opacity: isMenuOpen ? 0 : 1, // Hide when menu open
                    transition: 'opacity 0.3s ease'
                }}>
                    {[
                        { id: 'finder', label: 'Long Book Finder', path: '/long-book-finder' },
                        { id: 'collections', label: 'Collections', path: '/collections' },
                        { id: 'journal', label: 'Journal', path: '/journal' }
                    ].map(link => {
                        const isActive = theme.activeLink === link.id;
                        return (
                            <Link
                                key={link.id}
                                to={link.path}
                                className="nav-text-hover"
                                style={{
                                    fontFamily: 'Lora, serif', // Spec: Lora
                                    fontSize: '1.375rem', // Increased by 25% (was 1.1rem)
                                    color: isActive ? theme.activeLinkText : theme.textColor,
                                    textDecoration: 'none',
                                    padding: '0.5rem 1.5rem',
                                    borderRadius: '50px', // Lozenge shape
                                    backgroundColor: isActive ? theme.activeLinkBg : 'transparent',
                                    transition: 'background-color 0.3s ease, color 0.3s ease', // Specific transitions to allow class to handle transform
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
                        transition: 'opacity 0.3s ease'
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
                zIndex: 100,
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
                        padding: '0.5rem'
                    }}
                    aria-label="Close Menu"
                >
                    {/* Sage Close Icon (Sharp Corners) - Size 40 - Stroke 4 */}
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
                        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
                    </svg>
                </button>

                <nav style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem', // Reduced gap for dividers
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: '600px'
                }}>
                    {[
                        { label: 'Home', path: '/' },
                        { label: 'Long Book Finder', path: '/long-book-finder' },
                        { label: 'Collections', path: '/collections' },
                        { label: 'Journal', path: '/journal' },
                        { label: 'About', path: '/about' }
                    ].map((link, index, arr) => (
                        <div key={link.path} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <Link
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(3rem, 6vw, 5rem)', // Reduced by ~33%
                                    color: 'var(--color-brand-coral)',
                                    textDecoration: 'none',
                                    transition: 'color 0.3s, transform 0.3s',
                                    lineHeight: 1
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = 'var(--color-brand-sage)';
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = 'var(--color-brand-coral)';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                {link.label}
                            </Link>
                            {/* Divider (except after last item) */}
                            {index < arr.length - 1 && (
                                <div style={{
                                    width: '40px',
                                    height: '2px',
                                    backgroundColor: 'var(--color-brand-coral)',
                                    marginTop: '1.5rem',
                                    opacity: 0.5
                                }} />
                            )}
                        </div>
                    ))}
                </nav>




            </div>
        </>
    );
};
