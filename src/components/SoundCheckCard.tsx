import React from 'react';
import AudioPlayer from './AudioPlayer';
import type { GraphicAudioPart } from '../data/books';

interface SoundCheckCardProps {
    narrator: string;
    soundCheckText: string;
    affiliateLinkUK?: string;
    affiliateLink?: string;
    affiliateLinkUS?: string;
    audioPreviewUrl?: string;
    graphicAudioParts?: GraphicAudioPart[];
}

const SoundCheckCard: React.FC<SoundCheckCardProps> = ({
    narrator,
    soundCheckText,
    affiliateLinkUK,
    affiliateLink,
    audioPreviewUrl,
    graphicAudioParts
}) => {
    // If no text, don't render (shouldn't happen if validated, but safe)
    if (!soundCheckText) return null;

    const audibleLink = affiliateLink || affiliateLinkUK;

    return (
        <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '1.5rem',
            padding: '2.5rem', // Symmetrical 2.5rem on all sides
            marginTop: '0',
            width: '100%',
            maxWidth: '100%',
            marginBottom: '3.75rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start' // Back to left align
        }}>
            {/* Title */}
            <h3 style={{
                fontFamily: 'var(--font-serif-accent)', // Lora
                fontWeight: 400, // Regular
                color: 'var(--color-brand-coral)',
                fontSize: '28px',
                margin: '0 0 1.5rem 0', // Keeping matched margin
                lineHeight: 1.1,
                textAlign: 'left'
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
                textAlign: 'left'
            }}>
                Narrator: {narrator}
            </p>

            {/* Audio Player Preview */}
            {audioPreviewUrl && (
                <div style={{ marginBottom: '1.5rem', width: '100%' }}>
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
                textAlign: 'left',
                maxWidth: '100%' 
            }} dangerouslySetInnerHTML={{ __html: soundCheckText }} />

            {/* Footer Link & Regional Disclaimer */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                marginTop: 'auto',
                width: '100%'
            }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '1rem 1.5rem'
                }}>
                    {audibleLink && (
                        <a
                            href={audibleLink}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                textDecoration: 'none',
                                color: 'var(--color-brand-coral)',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                fontFamily: 'var(--font-body)',
                                borderBottom: '1px solid var(--color-brand-coral)',
                                width: 'fit-content'
                            }}
                        >
                            Listen on Audible
                            {/* Play Triangle Icon */}
                            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 6L0 12L0 0L10 6Z" fill="currentColor" />
                            </svg>
                        </a>
                    )}

                    {graphicAudioParts && graphicAudioParts.length > 0 && (
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '0.4rem',
                            fontSize: '0.95rem',
                            fontFamily: 'var(--font-body)',
                            color: '#2c5143'
                        }}>
                            <span style={{ fontWeight: 600 }}>Graphic Audio Version:</span>
                            {graphicAudioParts.map((part, idx) => (
                                <React.Fragment key={idx}>
                                    <a
                                        href={part.affiliateLink}
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                        style={{
                                            color: '#2c5143',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            borderBottom: '1px solid #2c5143',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.2rem'
                                        }}
                                    >
                                        {part.shortLabel} →
                                    </a>
                                    {idx < graphicAudioParts.length - 1 && <span style={{ opacity: 0.4 }}>|</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </div>

                {/* Regional Narrator Disclaimer */}
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: 'var(--color-brand-forrest)',
                    opacity: 0.7,
                    margin: '0.25rem 0 0 0',
                    fontStyle: 'italic',
                    lineHeight: 1.4
                }}>
                    *Note: Narrators may differ across regional releases and audiobook editions.
                </p>
            </div>
        </div>
    );
};

export default SoundCheckCard;
