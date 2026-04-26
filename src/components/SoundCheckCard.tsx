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
            padding: '2.5rem 2rem', // Matched with calculators
            marginTop: '0',
            width: '100%',
            maxWidth: '100%',
            marginBottom: '3.75rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center' // Center content to match calculators
        }}>
            {/* Title */}
            <h3 style={{
                fontFamily: 'var(--font-serif-accent)', // Lora
                fontWeight: 400, // Regular
                color: 'var(--color-brand-coral)',
                fontSize: '28px',
                margin: '0 0 1.5rem 0', // Matched with calculators
                lineHeight: 1.1,
                textAlign: 'center'
            }}>
                Narrator Soundcheck
            </h3>

            {/* Narrator */}
            <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--color-brand-forrest)',
                fontWeight: 700,
                marginBottom: '1.5rem',
                textAlign: 'center'
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
                color: 'var(--color-brand-forrest)', // Switch to forrest for better visibility on centered layout
                marginBottom: '2rem',
                opacity: 0.9,
                textAlign: 'center',
                maxWidth: '700px' // Keep it readable
            }} dangerouslySetInnerHTML={{ __html: soundCheckText }} />

            {/* Footer Links */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                alignItems: 'center',
                justifyContent: 'center', // Center the flags
                marginTop: 'auto',
                width: '100%'
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
