import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import AudioPlayer from './AudioPlayer';
import type { GraphicAudioPart } from '../data/books';
import { slugify } from '../utils/slugify';
import { isQualifyingNarrator, cleanNarrators, getNarratorStats } from '../utils/creatorUtils';
import {
    narratorData,
    NARRATOR_BADGES,
    type NarratorStyleBadgeId
} from '../data/narratorData';

interface SoundCheckCardProps {
    narrator: string;
    soundCheckText: string;
    affiliateLinkUK?: string;
    affiliateLink?: string;
    affiliateLinkUS?: string;
    audioPreviewUrl?: string;
    graphicAudioParts?: GraphicAudioPart[];
}

interface BadgeDisplayItem {
    id: string;
    name: string;
    lines: string[];
    imageUrl: string;
    tooltip: string;
    targetUrl: string;
    isMarathon: boolean;
}

const renderNarratorWithLinks = (rawNarrator: string) => {
    const cleaned = cleanNarrators(rawNarrator);
    if (cleaned.length === 0) return rawNarrator;

    const qualifyingNames = cleaned.filter(name => isQualifyingNarrator(name));
    if (qualifyingNames.length === 0) return rawNarrator;

    const escaped = qualifyingNames.map(n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const regex = new RegExp(`(${escaped})`, 'g');
    const parts = rawNarrator.split(regex);

    return parts.map((part, index) => {
        if (qualifyingNames.includes(part)) {
            return (
                <Link
                    key={index}
                    to={`/narrator/${slugify(part)}/`}
                    style={{
                        color: 'inherit',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        borderBottom: '1px dotted var(--color-brand-forrest)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-brand-coral)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-brand-forrest)'; }}
                >
                    {part}
                </Link>
            );
        }
        return part;
    });
};

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

    // Look up qualifying narrators to display their earned awards badges
    const allStats = useMemo(() => getNarratorStats(), []);
    const qualifyingProfiles = useMemo(() => {
        const cleaned = cleanNarrators(narrator);
        return cleaned
            .filter(name => isQualifyingNarrator(name))
            .map(name => {
                const slug = slugify(name);
                const profile = narratorData[slug];
                const stat = allStats.find(n => n.slug === slug);
                return {
                    name,
                    slug,
                    profile,
                    totalHours: stat?.totalHours || 0
                };
            })
            .filter(item => Boolean(item.profile));
    }, [narrator, allStats]);

    // Deduplicate badges across all qualifying narrators on this audiobook.
    // NOTE: Marathon hour badges (e.g. 500-club) are intentionally omitted from book pages
    // to prevent listeners from confusing narrator total career hours with book runtime.
    // Only descriptive vocal style badges are displayed here.
    const uniqueBadges = useMemo<BadgeDisplayItem[]>(() => {
        if (qualifyingProfiles.length === 0) return [];

        const badgeMap = new Map<string, BadgeDisplayItem>();

        // All unique vocal style badges earned by the qualifying narrators on this book
        qualifyingProfiles.forEach(p => {
            const styleIds = p.profile?.styleBadges || [];
            styleIds.forEach((id: NarratorStyleBadgeId) => {
                const def = NARRATOR_BADGES[id];
                if (def && !badgeMap.has(def.id)) {
                    let lines = [...def.labelLines, 'Badge'];
                    if (def.id === 'dual-pov-synergy') {
                        lines = ['Dual POV', 'Energy', 'Badge'];
                    }
                    badgeMap.set(def.id, {
                        id: def.id,
                        name: def.name,
                        lines,
                        imageUrl: def.imageUrl,
                        tooltip: def.tooltip,
                        targetUrl: `/narrator-styles/${def.id}/`,
                        isMarathon: false
                    });
                }
            });
        });

        return Array.from(badgeMap.values());
    }, [qualifyingProfiles]);

    return (
        <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '1.5rem',
            padding: '2.5rem',
            marginTop: '0',
            width: '100%',
            maxWidth: '100%',
            marginBottom: '3.75rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
        }}>
            {/* Title */}
            <h3 style={{
                fontFamily: 'var(--font-serif-accent)', // Lora
                fontWeight: 400,
                color: 'var(--color-brand-coral)',
                fontSize: '28px',
                margin: '0 0 1.25rem 0',
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
                Narrator: {renderNarratorWithLinks(narrator)}
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
                        marginTop: '0.35rem',
                        textAlign: 'center',
                        fontStyle: 'italic'
                    }}>
                        Apple Books preview. Narration may vary.
                    </p>
                </div>
            )}

            {/* Deduplicated Left-Aligned Award Badges Under Audio Player */}
            {uniqueBadges.length > 0 && (
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1.4rem',
                    flexWrap: 'wrap',
                    marginTop: audioPreviewUrl ? '0.85rem' : '0.25rem',
                    marginBottom: '2rem',
                    width: '100%',
                    justifyContent: 'flex-start'
                }}>
                    {uniqueBadges.map(badge => (
                        <Link
                            key={badge.id}
                            to={badge.targetUrl}
                            className="narrator-badge-item"
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '84px'
                            }}
                            tabIndex={0}
                            aria-label={`${badge.name}: ${badge.tooltip}`}
                        >
                            {/* Rich Tooltip on hover/focus */}
                            <div className="narrator-badge-tooltip">
                                <strong style={{
                                    display: 'block',
                                    color: 'var(--color-brand-coral-light)',
                                    marginBottom: '0.25rem',
                                    fontSize: '0.85rem'
                                }}>
                                    {badge.name}
                                </strong>
                                {badge.tooltip}
                                <span style={{
                                    display: 'block',
                                    marginTop: '0.45rem',
                                    fontSize: '0.7rem',
                                    opacity: 0.85,
                                    color: 'var(--color-brand-coral-light)'
                                }}>
                                    {badge.isMarathon ? 'Click to view Marathon Leaderboard →' : 'Click to explore this Vocal Style →'}
                                </span>
                            </div>

                            {/* Badge Image - Enlarged 20% to 67px */}
                            <img
                                src={badge.imageUrl}
                                alt={badge.name}
                                style={{
                                    width: '67px',
                                    height: 'auto',
                                    filter: 'drop-shadow(2px 4px 6px rgba(25, 45, 38, 0.22))',
                                    transition: 'transform 0.2s ease'
                                }}
                            />

                            {/* Caption Underneath in Smaller Font */}
                            <div style={{
                                marginTop: '0.5rem',
                                fontSize: '0.64rem',
                                fontFamily: 'var(--font-body)',
                                fontWeight: 700,
                                color: 'var(--color-brand-forrest)',
                                textAlign: 'center',
                                lineHeight: 1.2,
                                width: '100%'
                            }}>
                                {badge.lines.map((line, idx) => (
                                    <span key={idx} style={{ display: 'block' }}>
                                        {line}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Review Text */}
            <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.6,
                color: 'var(--color-brand-forrest)',
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
