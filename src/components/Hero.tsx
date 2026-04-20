import { useRef, useEffect, useState, type ReactNode } from 'react';

interface HeroProps {
    backgroundImage?: string;
    title?: ReactNode;
    subtitle?: string;
    showCornerGraphics?: boolean;
    topGraphic?: string;
    titleColor?: string;
    subtitleColor?: string;
    overlayOpacity?: number;
    topGraphicOpacity?: number;
    contentBlendMode?: React.CSSProperties['mixBlendMode'];
    chevronBlendMode?: React.CSSProperties['mixBlendMode'];
    topGraphicBlendMode?: React.CSSProperties['mixBlendMode'];
    titleBlendMode?: React.CSSProperties['mixBlendMode'];
    subtitleBlendMode?: React.CSSProperties['mixBlendMode'];
    subtitleShadow?: string;
    chevronColor?: string;
    chevronOpacity?: number;
    topGraphicFilter?: string;
    separatorColor?: string;
    useDynamicColor?: boolean;
    titleFontSize?: string;
    subtitleFontSize?: string;
    topGraphicDimensions?: { width?: string; height?: string };
    topGraphicColor?: string;
    contentPaddingTop?: string;
    showSeparator?: boolean;
    subtitleLineHeight?: string | number;
    subtitleMarginTop?: string;
    sectionHeight?: string;
    sectionMinHeight?: string;
    sectionPadding?: string;
    titleLineHeight?: string | number;
    titleOpacity?: number;
}

export const Hero = ({
    backgroundImage = "/assets/home-hero-images/LongBookClub-GreenTexture-Hero-Image-02.webp",
    title = (
        <>
            Lost in <br /> <span style={{ fontStyle: 'italic' }}>Listening</span>
        </>
    ),
    subtitle = "The Long Book Club curates the longest audiobooks for you to lose yourself in. We help you get the most value from Audible and other audiobook providers.",
    showCornerGraphics = true,
    topGraphic,
    titleColor = 'var(--color-brand-coral)',
    subtitleColor = '#cbd6ab',
    overlayOpacity = 0,
    topGraphicOpacity = 1,
    contentBlendMode,
    chevronBlendMode,
    chevronColor,
    chevronOpacity,
    topGraphicBlendMode,
    titleBlendMode,
    subtitleBlendMode,
    subtitleShadow,
    topGraphicFilter,
    separatorColor,
    useDynamicColor = false,
    titleFontSize,
    subtitleFontSize,
    topGraphicDimensions,
    topGraphicColor,
    contentPaddingTop = 'clamp(45px, 10vh, 85px)',
    showSeparator = true,
    subtitleLineHeight,
    subtitleMarginTop,
    sectionHeight,
    sectionMinHeight,
    sectionPadding,
    titleLineHeight,
    titleOpacity,
    // Removed legacy logo props: compactLogo, showLogo
}: HeroProps) => {
    const heroImageRef = useRef<HTMLImageElement>(null);
    const [dynamicTheme, setDynamicTheme] = useState<'light' | 'dark' | null>(null);

    // Helper for legacy filter logic
    const toFilter = (blendMode?: React.CSSProperties['mixBlendMode']) =>
        blendMode ? 'brightness(0) invert(1)' : 'none';

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (!useDynamicColor) return;

        try {
            const img = e.currentTarget;
            const canvas = document.createElement('canvas');
            canvas.width = 50; // Small size for performance
            canvas.height = 50;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Draw image to canvas to read pixel data
            ctx.drawImage(img, 0, 0, 50, 50);

            // Get image data
            const imageData = ctx.getImageData(0, 0, 50, 50);
            const data = imageData.data;
            let r, g, b, avg;
            let colorSum = 0;

            // Calculate average brightness
            for (let x = 0, len = data.length; x < len; x += 4) {
                r = data[x];
                g = data[x + 1];
                b = data[x + 2];
                avg = Math.floor((r + g + b) / 3);
                colorSum += avg;
            }

            const brightness = Math.floor(colorSum / (50 * 50));
            // Threshold: 128 is middle. 
            // If brightness > 150 (light background) -> use dark text
            // If brightness <= 150 (dark background) -> use light text
            setDynamicTheme(brightness > 150 ? 'light' : 'dark');

        } catch (error) {
            console.warn('Failed to detect image luminance:', error);
            // Fallback to null (use default props)
        }
    };

    // Determine final colors
    // If dynamic detection is active and we have a result:
    // - Light theme (light background) -> Dark Text (Forrest/Slate)
    // - Dark theme (dark background) -> Light Text (Cloud/Coral)
    // Otherwise use props.
    const effectiveTitleColor = (useDynamicColor && dynamicTheme)
        ? (dynamicTheme === 'light' ? 'var(--color-brand-forrest)' : 'var(--color-brand-cloud)')
        : titleColor;

    const effectiveSubtitleColor = (useDynamicColor && dynamicTheme)
        ? (dynamicTheme === 'light' ? 'var(--color-brand-slate)' : 'var(--color-brand-coral)')
        : subtitleColor;

    const effectiveSeparatorColor = separatorColor || effectiveTitleColor;

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

    // Z-Index Handling for Blending:
    // If we have a specific grouping blend mode (e.g. 'overlay' on the container), we need the container to have z-index to group them.
    // If we have 'normal' blend mode on container (passthrough), we want children to blend with the background individually.
    // However, the container creates a stacking context if it has z-index, preventing child blend modes from seeing the background.
    // So: If contentBlendMode is 'normal' (or undefined), we remove z-index from container (auto) and put it on children.
    const isPassthrough = !contentBlendMode || contentBlendMode === 'normal';
    const containerZIndex = isPassthrough ? 'auto' : 20; // Auto allows sharing stacking context
    const childPosition = isPassthrough ? 'relative' as const : undefined;
    const childZIndex = isPassthrough ? 20 : undefined;

    return (
        <section
            className="hero-section"
            style={{
                position: 'relative',
                height: sectionHeight || '100vh', // Default to full-screen
                minHeight: sectionMinHeight || '700px',
                padding: sectionPadding || '0',
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
            {/* ... (Texture and BG Image stay same) ... */}
            <div style={{
                position: 'absolute',
                bottom: -1.5, // Sub-pixel nudge
                left: 0,
                width: '100%',
                height: 'clamp(20px, 5vw, 60px)',
                zIndex: 15,
                pointerEvents: 'none',
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

            {/* Background Image Wrapper (Intro Animation) */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                animation: 'hero-intro-scale 2.5s cubic-bezier(0.19, 1, 0.22, 1) forwards', // Smooth ease-out
                overflow: 'hidden'
            }}>
                <img
                    ref={heroImageRef}
                    src={backgroundImage}
                    alt=""
                    crossOrigin={useDynamicColor ? "anonymous" : undefined}
                    onLoad={handleImageLoad}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        willChange: 'transform',
                        transition: 'transform 0.1s linear'
                    }}
                />
            </div>

            <style>{`
                @keyframes hero-intro-scale {
                    from { transform: scale(1.3); }
                    to { transform: scale(1); }
                }
            `}</style>

            {/* Dark Overlay gradient */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: `rgba(0,0,0,${overlayOpacity})`,
                zIndex: 1
            }} />

            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 10,
                padding: 'clamp(1.5rem, 5vw, 3rem)'
            }}>
                {showCornerGraphics && (
                    <>
                        <img
                            src="/assets/lbc-fleur.svg"
                            alt=""
                            className="hide-on-mobile"
                            style={{ position: 'absolute', top: 'clamp(1.5rem, 5vw, 3rem)', left: 'clamp(1.5rem, 5vw, 3rem)', height: 'clamp(80px, 12vw, 120px)', width: 'auto' }}
                        />
                        <img
                            src="/assets/bookmark.svg"
                            alt=""
                            style={{ position: 'absolute', bottom: 'clamp(3rem, 10vw, 7rem)', left: 'clamp(1.5rem, 5vw, 3rem)', height: 'clamp(60px, 8vw, 100px)', width: 'auto' }}
                        />
                        <img
                            src="/assets/headphones.svg"
                            alt=""
                            style={{ position: 'absolute', bottom: 'clamp(3rem, 10vw, 7rem)', right: 'clamp(1.5rem, 5vw, 3rem)', height: 'clamp(120px, 12vw, 180px)', width: 'auto' }}
                        />
                    </>
                )}
            </div>

            {/* Central Content */}
            <div style={{
                position: 'relative',
                zIndex: containerZIndex, // Use calculated Z-index
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '0 clamp(1rem, 5vw, 2.5rem)', // Reduced mobile padding to prevent text overflow
                paddingTop: contentPaddingTop,
                width: '100%', // Enforce width
                maxWidth: '900px',
                mixBlendMode: contentBlendMode,
                margin: '0 auto' // Ensure relative centering if width is constrained
            }}>
                {/* Top Graphic */}
                {topGraphic && (
                    topGraphicColor ? (
                        <div style={{
                            display: 'block',
                            margin: '0 auto 1rem auto',
                            width: topGraphicDimensions?.width || 'auto',
                            height: topGraphicDimensions?.height || 'clamp(76px, 15.3vw, 117px)',
                            backgroundColor: topGraphicColor,
                            maskImage: `url("${topGraphic}")`,
                            WebkitMaskImage: `url("${topGraphic}")`,
                            maskRepeat: 'no-repeat',
                            WebkitMaskRepeat: 'no-repeat',
                            maskSize: 'contain',
                            WebkitMaskSize: 'contain',
                            maskPosition: 'center',
                            WebkitMaskPosition: 'center',
                            mixBlendMode: topGraphicBlendMode,
                            opacity: topGraphicOpacity,
                            position: childPosition,
                            zIndex: childZIndex,
                            maxWidth: '100%' // Ensure resizing works
                        }} />
                    ) : (
                        <img
                            src={topGraphic}
                            alt=""
                            style={{
                                display: 'block',
                                margin: '0 auto 1rem auto',
                                width: topGraphicDimensions?.width ?? 'auto',
                                height: topGraphicDimensions?.height ?? 'clamp(76px, 15.3vw, 117px)',
                                maxWidth: '100%',
                                objectFit: 'contain',
                                mixBlendMode: topGraphicBlendMode,
                                opacity: topGraphicOpacity,
                                filter: topGraphicFilter,
                                position: childPosition, // Promote if needed
                                zIndex: childZIndex
                            }}
                        />
                    )
                )}

                <h1 style={{
                    fontSize: titleFontSize ?? 'clamp(6.2rem, 12vw, 9rem)', // Bigger Mobile (6.2rem), Smaller Desktop (9rem)
                    fontFamily: 'var(--font-heading)',
                    color: effectiveTitleColor,
                    transition: 'color 0.5s ease',
                    lineHeight: titleLineHeight ?? 0.85,
                    margin: '0 auto 1rem auto',
                    fontWeight: 400,
                    letterSpacing: 'normal',
                    mixBlendMode: titleBlendMode,
                    opacity: titleOpacity ?? 0.88,
                    position: childPosition, // Promote if needed
                    zIndex: childZIndex
                }}>
                    {title}
                </h1>

                {/* Separator Line */}
                {showSeparator && (
                    <div style={{
                        width: '60px',
                        height: '1px',
                        backgroundColor: effectiveSeparatorColor,
                        transition: 'background-color 0.5s ease',
                        margin: '1.5rem auto',
                        opacity: 0.8,
                        position: childPosition, // Promote if needed
                        zIndex: childZIndex
                    }} />
                )}

                <p className="hero-subtitle" style={{
                    fontSize: subtitleFontSize ?? '1.4rem',
                    color: effectiveSubtitleColor,
                    transition: 'color 0.5s ease',
                    maxWidth: '660px',
                    margin: '0 auto',
                    marginTop: subtitleMarginTop,
                    lineHeight: subtitleLineHeight ?? 1.6,
                    fontFamily: 'var(--font-serif-accent)',
                    mixBlendMode: subtitleBlendMode,
                    textShadow: subtitleShadow,
                    position: childPosition, // Promote if needed
                    zIndex: childZIndex
                }}>
                    {subtitle}
                </p>

                <div
                    onClick={() => {
                        document.getElementById('scroll-target')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                        marginTop: '3rem',
                        cursor: 'pointer',
                        position: childPosition, // Promote if needed
                        zIndex: childZIndex
                    }}
                >
                    {chevronColor ? (
                        <div style={{
                            width: 'clamp(30px, 4vw, 50px)',
                            aspectRatio: '299.6 / 193.3',
                            backgroundColor: chevronColor,
                            opacity: chevronOpacity ?? 0.8,
                            animation: 'bounce 2s infinite',
                            maskImage: `url("/assets/down-chevron.svg")`,
                            WebkitMaskImage: `url("/assets/down-chevron.svg")`,
                            maskRepeat: 'no-repeat',
                            WebkitMaskRepeat: 'no-repeat',
                            maskSize: 'contain',
                            WebkitMaskSize: 'contain',
                            maskPosition: 'center',
                            WebkitMaskPosition: 'center',
                            mixBlendMode: chevronBlendMode,
                            margin: '0 auto' // Center the block element
                        }} />
                    ) : (
                        <img
                            src="/assets/down-chevron.svg"
                            alt="Scroll Down"
                            style={{
                                width: 'clamp(30px, 4vw, 50px)',
                                height: 'auto',
                                opacity: chevronOpacity ?? 0.8,
                                animation: 'bounce 2s infinite',
                                mixBlendMode: chevronBlendMode,
                                filter: toFilter(chevronBlendMode)
                            }}
                        />
                    )}
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
                        .hero-subtitle {
                            padding-left: 25px !important;
                            padding-right: 25px !important;
                        }
                    }
                `}</style>
            </div>

        </section >
    );
};
