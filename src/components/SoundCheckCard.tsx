import React from 'react';
import AudioPlayer from './AudioPlayer';

interface SoundCheckCardProps {
    narrator: string;
    soundCheckText: string;
    affiliateLinkUK: string;
    affiliateLinkUS?: string;
    audioPreviewUrl?: string;
}

const SoundCheckCard: React.FC<SoundCheckCardProps> = ({
    narrator,
    soundCheckText,
    affiliateLinkUK,
    affiliateLinkUS,
    audioPreviewUrl
}) => {
    // If no text, don't render (shouldn't happen if validated, but safe)
    if (!soundCheckText) return null;

    return (
        <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '1.5rem',
            padding: '3.75rem',
            marginTop: '0',
            width: '100%',
            maxWidth: '100%',
            marginBottom: '3.75rem'
        }}>
            {/* Top Graphic */}
            {/* Top Graphic - Using Mask for robust coloring */}
            <div style={{
                marginBottom: '1rem',
                width: '100%',
                maxWidth: '400px',
                aspectRatio: '2199 / 474', // Matches SVG viewBox 0 0 2198.9 474.3
                backgroundColor: 'var(--color-brand-coral)',
                maskImage: 'url(/assets/sound-check-graphic.svg)',
                WebkitMaskImage: 'url(/assets/sound-check-graphic.svg)',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'left center',
                WebkitMaskPosition: 'left center'
            }} />

            {/* Title */}
            <h3 style={{
                fontFamily: 'var(--font-serif-accent)', // Lora
                fontWeight: 400, // Regular
                color: 'var(--color-brand-coral)',
                fontSize: '28px',
                margin: '0 0 0.5rem 0',
                lineHeight: 1.1
            }}>
                Soundcheck:
            </h3>

            {/* Narrator */}
            <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--color-brand-forrest)',
                fontWeight: 700,
                marginBottom: '1.5rem'
            }}>
                Narrator: {narrator}
            </p>

            {/* Audio Player Preview */}
            {audioPreviewUrl && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <AudioPlayer src={audioPreviewUrl} />
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        color: 'var(--color-brand-forrest)',
                        opacity: 0.7,
                        marginTop: '0.25rem',
                        textAlign: 'center',
                        fontStyle: 'italic'
                    }}>
                        Apple Books preview. Narration may vary.
                    </p>
                </div>
            )}

            {/* Review Text */}
            <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.6,
                color: 'var(--color-brand-slate)',
                marginBottom: '2rem',
                opacity: 0.9
            }} dangerouslySetInnerHTML={{ __html: soundCheckText }} />

            {/* Footer Links */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                alignItems: 'center',
                marginTop: 'auto'
            }}>
                {/* UK Link */}
                <a
                    href={affiliateLinkUK}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        textDecoration: 'none',
                        color: 'var(--color-brand-coral)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-body)',
                        borderBottom: '1px solid var(--color-brand-coral)' // Underline style
                    }}
                >
                    <img
                        src="/flags/uk.png"
                        alt="UK"
                        style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    Hear a sample UK
                    {/* Play Triangle Icon */}
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 6L0 12L0 0L10 6Z" fill="currentColor" />
                    </svg>
                </a>

                {/* US Link - Only show if available */}
                {affiliateLinkUS && (
                    <a
                        href={affiliateLinkUS}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            textDecoration: 'none',
                            color: 'var(--color-brand-coral)',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            fontFamily: 'var(--font-body)',
                            borderBottom: '1px solid var(--color-brand-coral)' // Underline style
                        }}
                    >
                        <img
                            src="/flags/us.png"
                            alt="US"
                            style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        Hear a sample US
                        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 6L0 12L0 0L10 6Z" fill="currentColor" />
                        </svg>
                    </a>
                )}
            </div>
        </div>
    );
};

export default SoundCheckCard;
