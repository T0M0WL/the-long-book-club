import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { StickyHeader } from './StickyHeader';
import { LogoSmall } from './LogoSmall';

export const Header = () => {
    const { pathname } = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // Close menu on route change
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
    const isHeroPage = pathname === '/' || pathname.startsWith('/genre/') || pathname === '/collections' || pathname === '/collections/best-long-books-2025' || pathname === '/collections/dark-academia' || pathname === '/collections/romantasy' || pathname === '/collections/longest-ever' || pathname === '/collections/long-life-stories' || pathname === '/collections/bucket-list';

    return (
        <>
            <StickyHeader onMenuOpen={() => setIsMenuOpen(true)} />
            {/* ... Header JSX ... */}
            <header style={{
                padding: 'clamp(1.5rem, 5vw, 3rem)',
                marginBottom: isHeroPage ? 0 : '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', // Always center content (Logo)
                position: isHeroPage ? 'absolute' : 'relative',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                backgroundColor: 'transparent'
            }}>
                {!isHeroPage ? (
                    <Link to="/" style={{ display: 'block', maxWidth: '300px' }}>
                        <img
                            src="/assets/lbc-logo-horiz.svg"
                            alt="The Long Book Club"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </Link>
                ) : pathname.includes('/collections') ? (
                    <Link to="/" style={{ display: 'block', maxWidth: '240px' }}>
                        <LogoSmall
                            color="var(--color-brand-cloud)"
                            style={{
                                width: '100%',
                                height: 'auto'
                            }}
                        />
                    </Link>
                ) : <div />}
                <button
                    onClick={() => setIsMenuOpen(true)}
                    style={{
                        position: 'absolute', // Absolute position to keep Logo centered
                        right: 'clamp(1.5rem, 5vw, 3rem)', // Match container padding
                        top: 'clamp(1.5rem, 5vw, 3rem)', // Match right padding for symmetry
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-brand-coral)', // Reverted to Coral
                        cursor: 'pointer',
                        padding: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 60
                    }}
                    aria-label="Open Menu"
                >
                    {/* Sage Hamburger (Sharp Corners) - Size 42 - Stroke 4 - Gap 4 */}
                    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 4H21" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
                        <path d="M3 12H21" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
                        <path d="M3 20H21" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
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
                        { label: 'Collections', path: '/collections' },
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

                {/* Social Icons */}
                <div style={{
                    marginTop: '3rem',
                    display: 'flex',
                    gap: '2rem',
                    alignItems: 'center'
                }}>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                        style={{ color: 'var(--color-brand-coral)', transition: 'color 0.3s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--color-brand-sage)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--color-brand-coral)'}
                    >
                        <FaInstagram size={32} />
                    </a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                        style={{ color: 'var(--color-brand-coral)', transition: 'color 0.3s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--color-brand-sage)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--color-brand-coral)'}
                    >
                        <FaTiktok size={28} />
                    </a>
                </div>


            </div>
        </>
    );
};
