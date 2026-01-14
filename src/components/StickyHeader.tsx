import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const StickyHeader = ({ onMenuOpen }: { onMenuOpen: () => void }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past the Hero area (approx 500px)
            const show = window.scrollY > 500;
            setIsVisible(show);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '50px', // Visible height (Reduced from 80px)
                backgroundColor: 'var(--color-brand-forrest)',
                zIndex: 40, // Below the overlay menu (100) but above everything else
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 clamp(1.5rem, 5vw, 3rem)',
                transform: isVisible ? 'translateY(0)' : 'translateY(-110px)', // Hide bar (50) + tab (58)
                transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
        >
            {/* The Main Bar Background is handled by parent styles above, 
                BUT for the curve we need an extra element hanging below. */}

            {/* 
                Sticky Nav Tab - SVG Asset
                Positioned flush center bottom.
                Dimensions: 178.1 x 29 (Natural) -> Scaled 2x to 356 x 58
            */}
            <img
                src="/assets/Sticky-Nav-Tab.svg"
                alt=""
                style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '356px',
                    height: '58px',
                    pointerEvents: 'none',
                    zIndex: 40,
                    display: 'block'
                }}
            />

            {/* Centered Logo Icon */}
            <Link to="/" style={{
                zIndex: 41,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // Nudge it down into the curve
                transform: 'translateY(20px)'
            }}>
                <img
                    src="/assets/lbc-fav.svg"
                    alt="Home"
                    style={{
                        height: '40px',
                        width: 'auto'
                    }}
                />
            </Link>

            {/* Hamburger (Pinned Right) */}
            <button
                onClick={onMenuOpen}
                style={{
                    position: 'absolute',
                    right: 'clamp(1.5rem, 5vw, 3rem)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-brand-coral)', // Same as main header now
                    cursor: 'pointer',
                    padding: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                aria-label="Open Menu"
            >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 5H21" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
                    <path d="M3 12H21" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
                    <path d="M3 19H21" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
                </svg>
            </button>
        </header>
    );
};
