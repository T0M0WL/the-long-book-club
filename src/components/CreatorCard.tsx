import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { CreatorItem } from '../utils/creatorUtils';
import {
    narratorData,
    NARRATOR_BADGES,
    getHighestMarathonBadge,
    type NarratorBadgeDef,
    type NarratorStyleBadgeId
} from '../data/narratorData';

interface CreatorCardProps {
    creator: CreatorItem;
    type: 'author' | 'narrator';
}

export const CreatorCard: React.FC<CreatorCardProps> = ({ creator, type }) => {
    const [isHovered, setIsHovered] = useState(false);
    const linkPath = `/${type}/${creator.slug}/`;
    
    // Singular / Plural badge copy
    const labelSingular = type === 'author' ? 'AUDIOBOOK' : 'PERFORMANCE';
    const labelPlural = type === 'author' ? 'AUDIOBOOKS' : 'PERFORMANCES';
    const countBadge = `${creator.bookCount} ${creator.bookCount === 1 ? labelSingular : labelPlural}`;
    const hoursBadge = `OVER ${Math.floor(creator.totalHours)} HRS`;

    // Preview up to 3 book covers
    const previewCovers = creator.books.slice(0, 3);

    // Profile & badges (for narrators: marathon endurance honor + vocal style hallmarks)
    const profile = type === 'narrator' ? narratorData[creator.slug] : undefined;
    const styleBadgeDefs = profile?.styleBadges
        ? (profile.styleBadges as NarratorStyleBadgeId[])
              .map(id => NARRATOR_BADGES[id])
              .filter(Boolean)
        : [];
    const marathonBadge = type === 'narrator' ? getHighestMarathonBadge(creator.totalHours) : null;
    const narratorBadges: NarratorBadgeDef[] = marathonBadge
        ? [...styleBadgeDefs, marathonBadge]
        : styleBadgeDefs;

    // Curated Landmark Titles in Lora Italic (Max 3 so cards stay scannable, elegant, and balanced)
    let displayTitles: string[] = [];
    if (creator.books.length <= 3) {
        displayTitles = creator.books.map(b => b.title);
    } else {
        if (profile?.topBookSlugs && profile.topBookSlugs.length > 0) {
            displayTitles = profile.topBookSlugs
                .map(slug => creator.books.find(b => b.slug === slug)?.title)
                .filter(Boolean) as string[];
        }
        if (displayTitles.length < 3) {
            const remaining = creator.books.filter(b => !displayTitles.includes(b.title));
            displayTitles = [...displayTitles, ...remaining.slice(0, 3 - displayTitles.length).map(b => b.title)];
        }
        displayTitles = displayTitles.slice(0, 3);
    }
    const remainingCount = creator.books.length - displayTitles.length;

    return (
        <Link
            to={linkPath}
            style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                marginBottom: '2rem',
                paddingTop: '45px', // Creates headroom for the books to overlap above the card rectangle
                boxSizing: 'border-box'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                style={{
                    position: 'relative',
                    backgroundColor: '#edeeea',
                    borderRadius: '1.25rem',
                    border: '1px solid rgba(44, 81, 67, 0.08)',
                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                    transition: 'transform 0.3s ease',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '0 1.75rem 2.25rem 1.75rem'
                }}
            >
                {/* Floating Fanned Covers Overlapping the Top Edge */}
                <div
                    style={{
                        position: 'relative',
                        marginTop: '-45px', // Pops the books 45px outside the top edge of the card
                        height: '92px',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '1.75rem',
                        zIndex: 3
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            height: '92px'
                        }}
                    >
                        {previewCovers.map((book, idx) => {
                            // Fan out effect if multiple covers
                            const offset = previewCovers.length === 1 ? 0 : (idx - (previewCovers.length - 1) / 2) * 28;
                            const rotation = previewCovers.length === 1 ? 0 : (idx - (previewCovers.length - 1) / 2) * 6;
                            const zIndex = idx === 1 ? 2 : 1;

                            return (
                                <img
                                    key={book.id}
                                    src={book.coverUrl}
                                    alt={book.title}
                                    loading="lazy"
                                    style={{
                                        width: '86px',
                                        height: '86px',
                                        objectFit: 'cover',
                                        borderRadius: '0.5rem',
                                        boxShadow: '0 8px 20px rgba(0,0,0,0.22)',
                                        border: '2px solid #ffffff',
                                        transform: `translateX(${offset}px) rotate(${rotation}deg)`,
                                        zIndex,
                                        position: previewCovers.length > 1 ? 'absolute' : 'relative',
                                        transition: 'transform 0.3s ease'
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Creator Name */}
                <h2
                    style={{
                        fontSize: '1.65rem',
                        fontFamily: 'var(--font-serif-accent)',
                        color: '#2c5143',
                        fontWeight: 500,
                        lineHeight: 1.2,
                        margin: '0 0 1.25rem 0',
                        textAlign: 'center'
                    }}
                >
                    {creator.name}
                </h2>

                {/* Subtle Divider Line */}
                <div
                    style={{
                        width: '48px',
                        height: '1.5px',
                        backgroundColor: '#2c5143',
                        margin: '0 auto 1.5rem auto',
                        opacity: 0.35
                    }}
                />

                {/* Dark Green Badges */}
                <div
                    style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        marginBottom: narratorBadges.length > 0 ? '1.85rem' : '2.15rem'
                    }}
                >
                    <span
                        style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            fontFamily: 'Inter, sans-serif',
                            backgroundColor: '#2c5143',
                            color: '#ffffff',
                            padding: '0.3rem 0.75rem',
                            borderRadius: '9999px',
                            lineHeight: 1.2
                        }}
                    >
                        {countBadge}
                    </span>
                    <span
                        style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            fontFamily: 'Inter, sans-serif',
                            backgroundColor: '#2c5143',
                            color: '#ffffff',
                            padding: '0.3rem 0.75rem',
                            borderRadius: '9999px',
                            lineHeight: 1.2
                        }}
                    >
                        {hoursBadge}
                    </span>
                </div>

                {/* Vocal & Marathon Badges Row (For Narrators - Enlarged Shields, No Background, 2-Line Labels) */}
                {narratorBadges.length > 0 && (
                    <div
                        style={{
                            display: 'flex',
                            gap: '0.4rem',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            marginBottom: '1.85rem'
                        }}
                    >
                        {narratorBadges.map(badge => {
                            const lines = (badge.labelLines && badge.labelLines.length > 0)
                                ? badge.labelLines
                                : badge.name.split(' ');

                            return (
                                <div
                                    key={badge.id}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        width: '66px'
                                    }}
                                >
                                    <img
                                        src={badge.imageUrl}
                                        alt={badge.name}
                                        style={{
                                            width: '62px',
                                            height: 'auto',
                                            marginBottom: '0.4rem',
                                            filter: 'drop-shadow(0 4px 8px rgba(25, 45, 38, 0.22))'
                                        }}
                                    />
                                    <div
                                        style={{
                                            fontSize: '0.7rem',
                                            fontWeight: 600,
                                            color: '#2c5143',
                                            lineHeight: 1.18,
                                            fontFamily: 'Inter, sans-serif',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {lines.map((line, lIdx) => (
                                            <span key={lIdx} style={{ display: 'block' }}>
                                                {line}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Notable Titles in Lora Italic (Curated Landmarks) */}
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: '100%',
                        padding: '0 0.85rem',
                        marginBottom: '1.85rem'
                    }}
                >
                    <p
                        className="creator-card-titles"
                        style={{
                            fontSize: '1.05rem',
                            fontFamily: 'Lora, Georgia, serif',
                            fontStyle: 'italic',
                            color: '#2c5143',
                            opacity: 0.85,
                            lineHeight: 1.68,
                            textAlign: 'center',
                            margin: 0
                        }}
                    >
                        {displayTitles.join(' • ')}
                    </p>
                    {remainingCount > 0 && (
                        <span
                            style={{
                                fontSize: '0.85rem',
                                fontFamily: 'Lora, Georgia, serif',
                                fontStyle: 'italic',
                                color: '#2c5143',
                                opacity: 0.6,
                                marginTop: '0.5rem'
                            }}
                        >
                            + {remainingCount} more in catalog
                        </span>
                    )}
                </div>

                {/* Coral Pill Button with Lora Italic Text */}
                <div
                    style={{
                        backgroundColor: isHovered ? '#e65e40' : '#fa7052',
                        color: '#ffffff',
                        padding: '0.65rem 1.85rem',
                        borderRadius: '9999px',
                        fontSize: '1.05rem',
                        fontFamily: 'Lora, Georgia, serif',
                        fontStyle: 'italic',
                        fontWeight: 500,
                        boxShadow: '0 2px 8px rgba(250, 112, 82, 0.25)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        marginTop: 'auto',
                        transition: 'background-color 0.2s ease, transform 0.2s ease'
                    }}
                >
                    Explore Hub <span style={{ fontStyle: 'normal' }}>→</span>
                </div>
            </div>
        </Link>
    );
};
