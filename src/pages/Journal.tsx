import { SEO } from '../components/SEO';
import { useHeaderContext } from '../context/HeaderContext';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { journalPosts } from '../data/journal';

export const Journal = () => {
    const { setHeaderTheme } = useHeaderContext();
    const heroImageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setHeaderTheme({
            logoColor: 'var(--color-brand-forrest)',
            textColor: 'var(--color-brand-forrest)',
            hamburgerColor: 'var(--color-brand-forrest)',
            activeLink: 'journal',
            activeLinkBg: 'var(--color-brand-forrest)',
            activeLinkText: 'var(--color-brand-cloud)'
        });
    }, [setHeaderTheme]);

    // Scroll Effect for Hero Image
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (!heroImageRef.current) return;
                    const scrollY = window.scrollY;
                    const windowHeight = window.innerHeight;
                    // Calculate scale: 1 + fraction of viewport scrolled * 0.5 (max 50%)
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

    // Sort posts by date (newest first)
    const sortedPosts = [...journalPosts].sort((a, b) => b.date.localeCompare(a.date));

    const scrollToContent = () => {
        const content = document.getElementById('journal-content');
        if (content) {
            content.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
            <SEO 
                title="The Journal"
                description="News, trends, and value hacks for those who listen deep—whether it’s spotting the next big epic or navigating the audiobook industry."
                themeColor="#eae8da"
            />

            {/* HERO SECTION - Genre Style */}
            <section style={{
                position: 'relative',
                width: '100%',
                minHeight: '600px', // Substantial height for the hero
                padding: '11rem 1rem 8rem 1rem', // Top padding increased to 11rem (~50px extra)
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                backgroundColor: '#eae8da', // Fallback
                marginBottom: '2rem',
                overflow: 'hidden' // Ensure scale doesn't overflow
            }}>
                {/* Background Image */}
                <img
                    ref={heroImageRef}
                    src="/assets/genre-specific-gfx/genre-hero-background.gif"
                    alt=""
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0,
                        willChange: 'transform',
                        transition: 'transform 0.1s linear'
                    }}
                />

                {/* Mask for Curved Bottom */}
                <div style={{
                    position: 'absolute',
                    bottom: -1.5, // Sub-pixel nudge
                    left: 0,
                    width: '100%',
                    height: 'clamp(20px, 5vw, 60px)',
                    zIndex: 1,
                    backgroundColor: 'var(--color-bg)',
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url('/paper-texture.png')`,
                    backgroundRepeat: 'repeat',
                    maskImage: `url("data:image/svg+xml,%3Csvg id='Layer_1' xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 595.28 30.38' preserveAspectRatio='none'%3E%3Cpath d='M392.5,0h0c-22.9,0-46.2,3.1-63.9,8.5-9.1,2.7-16.2,5.9-21.2,9.5-5.1,3.6-7.7,7.3-7.8,11.1h-2c0,0-2,0-2,0-.1-3.8-2.7-7.5-7.8-11.1-5-3.5-12.2-6.7-21.2-9.5C248.9,3.1,225.7,0,202.9,0H0v30.38H595.13V0h-202.63'/%3E%3C/svg%3E")`,
                    WebkitMaskImage: `url("data:image/svg+xml,%3Csvg id='Layer_1' xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 595.28 30.38' preserveAspectRatio='none'%3E%3Cpath d='M392.5,0h0c-22.9,0-46.2,3.1-63.9,8.5-9.1,2.7-16.2,5.9-21.2,9.5-5.1,3.6-7.7,7.3-7.8,11.1h-2c0,0-2,0-2,0-.1-3.8-2.7-7.5-7.8-11.1-5-3.5-12.2-6.7-21.2-9.5C248.9,3.1,225.7,0,202.9,0H0v30.38H595.13V0h-202.63'/%3E%3C/svg%3E")`,
                    maskSize: '100% 100%',
                    WebkitMaskSize: '100% 100%',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'bottom center',
                    WebkitMaskPosition: 'bottom center',
                    transform: 'scaleY(1.05)',
                    transformOrigin: 'bottom'
                }} />

                {/* Content Container */}
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px' }}>



                    {/* Top Graphic */}
                    <div style={{
                        width: '50px',
                        maxWidth: '90vw',
                        height: '50px',
                        backgroundColor: 'var(--color-brand-forrest)',
                        maskImage: 'url("/assets/journal-icon.svg")',
                        WebkitMaskImage: 'url("/assets/journal-icon.svg")',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center',
                        marginBottom: '1rem',
                        marginTop: '0',
                        position: 'relative',
                        mixBlendMode: 'multiply',
                        opacity: 0.88,
                        zIndex: 2
                    }} />

                    {/* H1 Headline */}
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '4.5rem',
                        color: 'var(--color-brand-forrest)',
                        marginBottom: '1rem',
                        lineHeight: 1.05,
                        fontWeight: 400,
                        opacity: 0.88,
                        mixBlendMode: 'multiply'
                    }}>
                        The Long Book<br />Club Journal
                    </h1>

                    {/* Divider */}
                    <div style={{
                        width: '50px',
                        height: '1px',
                        backgroundColor: 'var(--color-brand-forrest)',
                        margin: '1.5rem auto',
                        opacity: 0.6
                    }} />

                    {/* Intro Paragraph */}
                    <p className="journal-hero-text" style={{
                        fontFamily: 'var(--font-serif-accent)',
                        fontSize: '1.4rem',
                        color: 'var(--color-brand-forrest)',
                        maxWidth: '660px',
                        margin: '0 auto',
                        lineHeight: 1.6,
                        opacity: 0.95
                    }}>
                        News, trends, and value hacks for those who listen deep. From exploring emerging genres to finding you an audiobook series that will last all year.
                    </p>

                    <style>{`
                        @media (max-width: 768px) {
                            .journal-hero-text {
                                padding-left: 20px !important;
                                padding-right: 20px !important;
                            }
                        }
                    `}</style>

                    {/* Chevron */}
                    <div
                        onClick={scrollToContent}
                        style={{
                            marginTop: '3rem',
                            cursor: 'pointer',
                            opacity: 0.8,
                            animation: 'bounce 2s infinite'
                        }}>
                        <img
                            src="/assets/down-chevron.svg"
                            alt="Scroll Down"
                            style={{
                                width: '48px',
                                height: 'auto',
                                filter: 'brightness(0) saturate(100%) invert(26%) sepia(13%) saturate(1989%) hue-rotate(106deg) brightness(96%) contrast(92%)'
                            }}
                        />
                    </div>
                </div>
            </section>


            {/* POSTS GRID SECTION */}
            <main id="journal-content" style={{
                // Removed Gray background to match Genre style (transparent/paper)
                minHeight: '80vh',
                padding: '4rem 2rem 8rem 2rem'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1280px',
                    margin: '0 auto'
                }}>
                    {sortedPosts.map(post => (
                        <Link
                            to={`/journal/${post.slug}`}
                            key={post.id}
                            style={{
                                display: 'block',
                                textDecoration: 'none',
                                height: '100%' // Ensure link takes full height
                            }}
                            className="journal-card-hover"
                        >
                            <div style={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                            }}
                            >
                                {/* Cover Image - Flush at top, full width */}
                                {post.coverUrl && (
                                    <img
                                        src={post.coverUrl}
                                        alt={post.title}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            objectFit: 'cover',
                                            display: 'block',
                                            aspectRatio: '16/9'
                                        }}
                                    />
                                )}

                                <article style={{
                                    backgroundColor: '#fff',
                                    padding: '2rem 2.5rem 1rem 2.5rem', // Adjusted padding
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center', // Center content horizontally
                                    justifyContent: 'space-between',
                                    textAlign: 'center' // Center text alignment
                                }}>
                                    <div>
                                        <h2 style={{
                                            fontFamily: 'var(--font-serif-accent)',
                                            fontSize: '1.75rem',
                                            lineHeight: 1.3,
                                            color: 'var(--color-brand-forrest)',
                                            marginBottom: '1rem',
                                            fontWeight: 400,
                                            marginTop: 0
                                        }}>
                                            {post.title}
                                        </h2>
                                        {/* Excerpt */}
                                        <p style={{
                                            color: 'var(--color-brand-slate)',
                                            lineHeight: 1.6,
                                            fontSize: '1.05rem',
                                            opacity: 0.8,
                                            fontFamily: 'var(--font-body)'
                                        }}>
                                            {post.excerpt.split(' ').slice(0, 25).join(' ') + (post.excerpt.split(' ').length > 25 ? '...' : '')}
                                        </p>
                                    </div>

                                    <span style={{
                                        fontFamily: 'var(--font-serif-accent)',
                                        fontSize: '1.2rem',
                                        color: 'var(--color-brand-slate)',
                                        marginTop: '2rem',
                                        borderBottom: '1px solid transparent',
                                        paddingBottom: '2px',
                                        transition: 'border-color 0.3s'
                                    }}>
                                        Read on...
                                    </span>
                                </article>

                                {/* Bottom Curve */}
                                <img
                                    src="/assets/Collections-Cards-Gfx/collectionsCard_bottom-Curve.svg"
                                    alt=""
                                    style={{
                                        width: '100%',
                                        height: '50px',
                                        display: 'block',
                                        // transform: 'none', // Removed rotation to flip it back
                                        filter: 'brightness(0) invert(1)',
                                        marginTop: '-2px', // Seamless connection
                                        transform: 'scaleY(1.1)', // Tiny scale to ensure coverage
                                        transformOrigin: 'top',
                                        pointerEvents: 'none'
                                    }}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};
