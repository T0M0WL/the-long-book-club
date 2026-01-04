import { useRef, useEffect } from 'react';

export const Hero = () => {
    const heroImageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (!heroImageRef.current) return;
                    const scrollY = window.scrollY;
                    const windowHeight = window.innerHeight;
                    // Calculate scale: 1 + fraction of viewport scrolled * 0.3 (max 30%)
                    // We cap the scroll influence at 1 viewport height to stop scaling if user scrolls way down
                    const progress = Math.min(scrollY / windowHeight, 1);
                    const scale = 1 + (progress * 0.5);

                    heroImageRef.current.style.transform = `scale(${scale})`;
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            className="hero-section"
            style={{
                position: 'relative',
                height: '100vh', // Full viewport height
                minHeight: '700px',
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // This SVG divider handles the curve
                marginBottom: '4rem',
                backgroundColor: '#1a202c' // Fallback dark
            }}
        >
            {/* 
                TEXTURED MASK DIVIDER
                Instead of a solid SVG fill, we use a Div with the same background as the body,
                and mask it using the SVG shape. This allows the global paper texture to show.
            */}
            <div style={{
                position: 'absolute',
                bottom: -1,
                left: 0,
                width: '100%',
                height: 'clamp(20px, 5vw, 60px)',
                zIndex: 15,
                pointerEvents: 'none',
                // 1. The Look: Match the global body background exactly
                backgroundColor: 'var(--color-bg)',
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url('/paper-texture.png')`,
                backgroundRepeat: 'repeat',
                // 2. The Shape: Use the User's SVG path as a mask
                // We encode the SVG as a Data URI. Note: # characters must be encoded as %23 if present (none here)
                maskImage: `url("data:image/svg+xml,%3Csvg id='Layer_1' xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 595.3 30.4' preserveAspectRatio='none'%3E%3Cpath d='M392.5,0h0c-22.9,0-46.2,3.1-63.9,8.5-9.1,2.7-16.2,5.9-21.2,9.5-5.1,3.6-7.7,7.3-7.8,11.1h-2c0,0-2,0-2,0-.1-3.8-2.7-7.5-7.8-11.1-5-3.5-12.2-6.7-21.2-9.5C248.9,3.1,225.7,0,202.9,0H0v30.4h595.1V0h-202.7'/%3E%3C/svg%3E")`,
                WebkitMaskImage: `url("data:image/svg+xml,%3Csvg id='Layer_1' xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 595.3 30.4' preserveAspectRatio='none'%3E%3Cpath d='M392.5,0h0c-22.9,0-46.2,3.1-63.9,8.5-9.1,2.7-16.2,5.9-21.2,9.5-5.1,3.6-7.7,7.3-7.8,11.1h-2c0,0-2,0-2,0-.1-3.8-2.7-7.5-7.8-11.1-5-3.5-12.2-6.7-21.2-9.5C248.9,3.1,225.7,0,202.9,0H0v30.4h595.1V0h-202.7'/%3E%3C/svg%3E")`,
                maskSize: '100% 100%',
                WebkitMaskSize: '100% 100%',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'bottom center',
                WebkitMaskPosition: 'bottom center'
            }} />

            {/* Background Image */}
            <img
                ref={heroImageRef}
                src="/assets/home-hero-images/LongBookClub-Forrest-Hero-Image-01.webp"
                alt=""
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0,
                    willChange: 'transform', // Performance hint
                    transition: 'transform 0.1s linear' // Smooth out any jank
                }}
            />

            {/* Dark Overlay gradient (for text readability) */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.3)', // Adjust opacity as needed
                zIndex: 1
            }} />

            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none', // Allow clicks through
                zIndex: 10,
                padding: 'clamp(1.5rem, 5vw, 3rem)' // Responsive padding
            }}>
                {/* Top Left: Fleur Icon */}
                <img
                    src="/assets/lbc-fleur.svg"
                    alt=""
                    className="hide-on-mobile"
                    style={{ position: 'absolute', top: 'clamp(1.5rem, 5vw, 3rem)', left: 'clamp(1.5rem, 5vw, 3rem)', height: 'clamp(80px, 12vw, 120px)', width: 'auto' }}
                />

                {/* Top Center: Logo (Pinned to Top) */}
                <img
                    src="/assets/lbc-logo-horiz.svg"
                    alt="The Long Book Club"
                    style={{
                        position: 'absolute',
                        top: 'clamp(1.5rem, 5vw, 3rem)', // Matches corners
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 'clamp(260px, 50vw, 400px)',
                        height: 'auto',
                        filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))',
                        zIndex: 20
                    }}
                />

                {/* Top Right: Triptych */}
                <img
                    src="/assets/LBC-Logo-Icon-Triptych.svg"
                    alt=""
                    className="hide-on-mobile"
                    style={{ position: 'absolute', top: 'clamp(1.5rem, 5vw, 3rem)', right: 'clamp(1.5rem, 5vw, 3rem)', height: 'clamp(40px, 6vw, 60px)', width: 'auto' }}
                />

                {/* Bottom Left: Bookmark */}
                <img
                    src="/assets/bookmark.svg"
                    alt=""
                    style={{ position: 'absolute', bottom: 'clamp(3rem, 10vw, 7rem)', left: 'clamp(1.5rem, 5vw, 3rem)', height: 'clamp(60px, 8vw, 100px)', width: 'auto' }}
                />

                {/* Bottom Right: Headphones */}
                <img
                    src="/assets/headphones.svg"
                    alt=""
                    style={{ position: 'absolute', bottom: 'clamp(3rem, 10vw, 7rem)', right: 'clamp(1.5rem, 5vw, 3rem)', height: 'clamp(120px, 12vw, 180px)', width: 'auto' }}
                />
            </div>

            {/* Central Content */}
            <div style={{
                position: 'relative',
                zIndex: 20,
                textAlign: 'center',
                padding: '0 2.5rem', // Increased mobile padding (was 0 1rem)
                paddingTop: 'clamp(180px, 20vh, 240px)', // Increased safe zone (120px -> 180px)
                maxWidth: '900px'
            }}>
                {/* Logo Removed from here (Moved to Absolute Top) */}

                <h1 style={{
                    fontSize: 'clamp(6.8rem, 16vmin, 11rem)', // Increased mobile size ~33%
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-brand-coral)',
                    lineHeight: 0.85, // Tighter leading for 2 lines
                    margin: 0,
                    fontWeight: 400,
                    // fontStyle: 'italic', // REMOVED
                    textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    letterSpacing: '-0.02em' // Slightly relaxed tightness
                }}>
                    Lost in <br /> <span style={{ fontStyle: 'italic' }}>Listening</span>
                </h1>

                {/* Separator Line */}
                <div style={{
                    width: '60px',
                    height: '2px',
                    backgroundColor: 'var(--color-brand-coral)',
                    margin: '3rem auto 2rem auto',
                    opacity: 0.8
                }} />

                <p style={{
                    fontSize: 'clamp(1.4rem, 3vw, 1.6rem)', // Increased mobile base by ~25% (1.1 -> 1.4)
                    color: '#cbd6ab', // Custom sage green
                    maxWidth: '660px', // Increased from 600px to fix wrapping
                    margin: '0 auto',
                    lineHeight: 1.6,
                    fontFamily: 'var(--font-serif-accent)', // User Switch: Fraunces
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                }}>
                    The Long Book Club curates the longest audiobooks for you to lose yourself in. We help you get the most value from Audible and other audiobook providers.
                </p>

                {/* Chevron */}
                <div
                    onClick={() => {
                        document.getElementById('scroll-target')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                        marginTop: '4rem',
                        cursor: 'pointer',
                        padding: '1rem' // Increase touch target
                    }}
                >
                    <img
                        src="/assets/down-chevron.svg"
                        alt="Scroll Down"
                        style={{
                            width: 'clamp(30px, 4vw, 50px)',
                            height: 'auto',
                            opacity: 0.8,
                            animation: 'bounce 2s infinite'
                        }}
                    />
                </div>

                <style>{`
                    @keyframes bounce {
                        0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
                        40% {transform: translateY(-10px);}
                        60% {transform: translateY(-5px);}
                    }
                    @media (max-width: 768px) {
                        .hide-on-mobile {
                            display: none !important;
                        }
                    }
                `}</style>
            </div>

        </section >
    );
};
