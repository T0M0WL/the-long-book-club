import { type ReactNode } from 'react';

interface SpineBannerProps {
    backgroundImage: string;
    title?: ReactNode;
    subtitle?: ReactNode;
    buttonText?: ReactNode;
    onButtonClick?: () => void;
    minHeight?: string;
    fullWidth?: boolean;
    topGraphic?: ReactNode;
    subtitleColor?: string;
    separatorColor?: string;
    separatorMixBlendMode?: React.CSSProperties['mixBlendMode'];
    brightness?: number; // Added for adjustable background darkening
    children?: ReactNode;
}

export const SpineBanner = ({
    backgroundImage,
    title,
    subtitle,
    buttonText,
    onButtonClick,
    minHeight = '560px',
    fullWidth = false,
    topGraphic,
    subtitleColor = '#cbd6ab', // Sage default
    separatorColor = '#cbd6ab', // Sage default
    separatorMixBlendMode,
    brightness = 0.8,
    children
}: SpineBannerProps) => {
    return (
        <section style={{
            width: '100%',
            maxWidth: fullWidth ? '100%' : '1280px',
            margin: '2rem auto 4rem auto',
            position: 'relative',
        }}>
            <div style={{
                position: 'relative',
                width: '100%',
                minHeight: minHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                zIndex: 1,

                maskImage: `
                    linear-gradient(black, black),
                    url(/assets/homepage-banner-components/feature-curve.svg),
                    url(/assets/homepage-banner-components/feature-curve-inverted.svg)
                `,
                WebkitMaskImage: `
                    linear-gradient(black, black),
                    url(/assets/homepage-banner-components/feature-curve.svg),
                    url(/assets/homepage-banner-components/feature-curve-inverted.svg)
                `,
                maskPosition: 'center, top center, bottom center',
                WebkitMaskPosition: 'center, top center, bottom center',
                maskSize: '100% 100%, 356px auto, 356px auto',
                WebkitMaskSize: '100% 100%, 356px auto, 356px auto',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskComposite: 'exclude',
                WebkitMaskComposite: 'xor',
            }}>
                {/* Background Image Layer (No Zoom as per user request) */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 0,
                        filter: `brightness(${brightness})` // Adjustable filter
                    }}
                />

                {/* Content Overlay */}
                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    textAlign: 'center',
                    color: '#fff',
                    padding: '0',
                    width: '100%', // Ensure children can fill the width
                    maxWidth: 'none' // Allow full-width for immersive carousel
                }}>
                    {children ? (
                        children
                    ) : (
                        <>
                            {topGraphic && (
                                <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
                                    {topGraphic}
                                </div>
                            )}
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(3.5rem, 8vw, 5rem)',
                                lineHeight: 0.9,
                                letterSpacing: '-0.02em',
                                color: '#eae8da', // Cloud
                                marginBottom: '0',
                                fontWeight: 400
                            }}>
                                {title}
                            </h2>

                            {/* Separator Line */}
                            <div style={{
                                width: '60px',
                                height: '2px',
                                backgroundColor: separatorColor,
                                margin: '1.5rem auto 1.5rem auto',
                                mixBlendMode: separatorMixBlendMode
                            }} />

                            {subtitle && (
                                <div style={{
                                    fontFamily: 'var(--font-serif-accent)',
                                    fontSize: 'clamp(1.4rem, 3vw, 1.6rem)',
                                    lineHeight: 1.4,
                                    color: subtitleColor,
                                    maxWidth: '600px',
                                    margin: '0 auto 2.5rem auto'
                                }}>
                                    {subtitle}
                                </div>
                            )}

                            <button
                                onClick={onButtonClick}
                                style={{
                                    backgroundColor: 'var(--color-brand-coral)',
                                    color: 'var(--color-brand-cloud)',
                                    border: 'none',
                                    padding: '1rem 2rem',
                                    borderRadius: '2rem',
                                    fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                                    fontFamily: 'var(--font-serif-accent)',
                                    fontWeight: 400,
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#cc563b';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--color-brand-coral)';
                                }}
                            >
                                {buttonText}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};
