import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { books } from '../data/books';
import { getNarratorStats, cleanNarrators, type CreatorItem } from '../utils/creatorUtils';
import { useSetHeaderTheme } from '../context/HeaderContext';
import {
    narratorData,
    NARRATOR_BADGES,
    getHighestMarathonBadge,
    type NarratorBadgeDef,
    type NarratorStyleBadgeId
} from '../data/narratorData';
import { FaArrowLeft } from 'react-icons/fa6';

/**
 * Extracts narrator surname for the custom hub button copy (e.g. "KRAMER", "READING")
 */
const getLastName = (fullName: string): string => {
    const parts = fullName.trim().split(/\s+/);
    return parts[parts.length - 1].toUpperCase();
};

/**
 * Portrait Leaderboard Card matching the bespoke editorial design
 */
interface LeaderboardCardProps {
    narrator: CreatorItem;
    overallRank: number;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ narrator, overallRank }) => {
    const [isHovered, setIsHovered] = useState(false);
    const profile = narratorData[narrator.slug];
    const totalHoursRounded = Math.round(narrator.totalHours);

    // Find longest book for this narrator
    let longestBook = narrator.books[0];
    narrator.books.forEach(b => {
        const h = b.lengthHours || 0;
        const curLongestH = longestBook?.lengthHours || 0;
        if (h > curLongestH) longestBook = b;
    });

    const marathonBadge = getHighestMarathonBadge(narrator.totalHours);
    const styleBadgeDefs = profile?.styleBadges
        ? (profile.styleBadges as NarratorStyleBadgeId[])
              .map(id => NARRATOR_BADGES[id])
              .filter(Boolean)
        : [];

    // Order: Marathon shield FIRST on leaderboard cards, followed by up to 2 vocal style hallmarks
    const cardBadges: NarratorBadgeDef[] = marathonBadge
        ? [marathonBadge, ...styleBadgeDefs.slice(0, 2)]
        : styleBadgeDefs.slice(0, 2);

    const lastName = getLastName(narrator.name);

    return (
        <div
            style={{
                paddingTop: '36px', // Headroom for the overlapping top circle
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '320px',
                margin: '0 auto'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                style={{
                    position: 'relative',
                    backgroundColor: '#eeefeb',
                    borderRadius: '1.75rem',
                    border: '1px solid rgba(44, 81, 67, 0.08)',
                    boxShadow: isHovered
                        ? '0 12px 30px rgba(44, 81, 67, 0.12)'
                        : '0 4px 18px rgba(44, 81, 67, 0.04)',
                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    padding: '0 1.5rem 2rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    flex: 1
                }}
            >
                {/* Overlapping Circular Hours Badge */}
                <div
                    style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        backgroundColor: '#2c5143',
                        marginTop: '-36px',
                        marginBottom: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(25, 45, 38, 0.28)',
                        zIndex: 2
                    }}
                >
                    <span
                        style={{
                            fontFamily: 'Lora, Georgia, serif',
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            color: '#fa7052',
                            lineHeight: 1
                        }}
                    >
                        {totalHoursRounded.toLocaleString()}
                    </span>
                    <span
                        style={{
                            fontFamily: 'Lora, Georgia, serif',
                            fontStyle: 'italic',
                            fontSize: '0.82rem',
                            color: '#ffffff',
                            lineHeight: 1,
                            marginTop: '0.2rem'
                        }}
                    >
                        hours
                    </span>
                </div>

                {/* Rank Header */}
                <span
                    style={{
                        fontFamily: 'Lora, Georgia, serif',
                        fontWeight: 700,
                        fontSize: '1.45rem',
                        color: '#fa7052',
                        lineHeight: 1.2,
                        marginBottom: '0.35rem'
                    }}
                >
                    Rank #{overallRank}
                </span>

                {/* Narrator Name in Lora Italic */}
                <h3
                    style={{
                        fontFamily: 'Lora, Georgia, serif',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: '1.35rem',
                        color: '#2c5143',
                        lineHeight: 1.25,
                        margin: '0 0 1.15rem 0'
                    }}
                >
                    {narrator.name}
                </h3>

                {/* Green Pills Row */}
                <div
                    style={{
                        display: 'flex',
                        gap: '0.45rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        marginBottom: '1.5rem'
                    }}
                >
                    <span
                        style={{
                            backgroundColor: '#2c5143',
                            color: '#ffffff',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            fontFamily: 'Inter, sans-serif',
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            padding: '0.3rem 0.75rem',
                            borderRadius: '9999px',
                            lineHeight: 1.2,
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {narrator.bookCount} {narrator.bookCount === 1 ? 'BOOK' : 'BOOKS'}
                    </span>
                    {longestBook && (
                        <span
                            style={{
                                backgroundColor: '#2c5143',
                                color: '#ffffff',
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                fontFamily: 'Inter, sans-serif',
                                letterSpacing: '0.04em',
                                textTransform: 'uppercase',
                                padding: '0.3rem 0.75rem',
                                borderRadius: '9999px',
                                lineHeight: 1.2,
                                whiteSpace: 'nowrap'
                            }}
                        >
                            LONGEST {longestBook.lengthHours} hrs
                        </span>
                    )}
                </div>

                {/* Badges Row (3 shields: Marathon first, then style hallmarks) */}
                <div
                    style={{
                        display: 'flex',
                        gap: '0.45rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '1.85rem',
                        minHeight: '56px'
                    }}
                >
                    {cardBadges.map(badge => (
                        <img
                            key={badge.id}
                            src={badge.imageUrl}
                            alt={badge.name}
                            style={{
                                width: '52px',
                                height: 'auto',
                                filter: 'drop-shadow(0 4px 8px rgba(25, 45, 38, 0.22))'
                            }}
                        />
                    ))}
                </div>

                {/* Personalized Explore Hub Button */}
                <Link
                    to={`/narrator/${narrator.slug}/`}
                    style={{
                        backgroundColor: isHovered ? '#e65e40' : '#fa7052',
                        color: '#ffffff',
                        padding: '0.65rem 1.6rem',
                        borderRadius: '9999px',
                        fontSize: '0.78rem',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        boxShadow: isHovered
                            ? '0 4px 12px rgba(250, 112, 82, 0.35)'
                            : '0 2px 8px rgba(250, 112, 82, 0.25)',
                        transition: 'all 0.2s ease',
                        marginTop: 'auto'
                    }}
                >
                    EXPLORE {lastName}'S HUB <span style={{ fontSize: '0.9rem', lineHeight: 1 }}>→</span>
                </Link>
            </div>
        </div>
    );
};

export const NarratorsLeaderboard: React.FC = () => {
    useSetHeaderTheme({
        logoColor: 'var(--color-brand-cloud)',
        textColor: 'var(--color-brand-cloud)',
        hamburgerColor: 'var(--color-brand-cloud)',
        activeLink: 'narrators',
        activeLinkBg: 'var(--color-brand-cloud)',
        activeLinkText: 'var(--color-brand-coral)'
    });

    const [activeTierFilter, setActiveTierFilter] = useState<string>('all');

    // Get all qualifying narrators (>= 2 books), sorted descending by totalHours
    const narrators = [...getNarratorStats().filter(n => n.bookCount >= 2)].sort((a, b) => b.totalHours - a.totalHours);

    const totalCatalogHours = Math.round(narrators.reduce((acc, n) => acc + n.totalHours, 0));
    const totalCatalogDays = (totalCatalogHours / 24).toFixed(1);

    // Dynamic metrics across catalog
    const enduranceLeader = narrators[0];
    const mostProlific = [...narrators].sort((a, b) => b.bookCount - a.bookCount)[0];
    // Longest single solo performance across catalog (filtering out multi-narrator ensembles)
    const longestSoloPerformance = [...books]
        .filter(b => cleanNarrators(b.narrator).length === 1)
        .sort((a, b) => (b.lengthHours || 0) - (a.lengthHours || 0))[0];

    // Group narrators into club tiers
    const tier1000 = narrators.filter(n => n.totalHours >= 1000);
    const tier500 = narrators.filter(n => n.totalHours >= 500 && n.totalHours < 1000);
    const tier300 = narrators.filter(n => n.totalHours >= 300 && n.totalHours < 500);
    const tier200 = narrators.filter(n => n.totalHours >= 200 && n.totalHours < 300);
    const tier100 = narrators.filter(n => n.totalHours >= 100 && n.totalHours < 200);
    const tier50 = narrators.filter(n => n.totalHours >= 50 && n.totalHours < 100);
    const tierContenders = narrators.filter(n => n.totalHours < 50);

    const tiers = [
        ...(tier1000.length > 0 ? [{
            id: '1000-club',
            badgeId: '1000-club' as const,
            titleLine1: 'The 1,000 + Hour Club',
            titleLine2: '(Living Legends)',
            subtitle: 'The supreme summit of marathon narration. Over 1000 continuous hours.',
            narrators: tier1000
        }] : []),
        {
            id: '500-club',
            badgeId: '500-club' as const,
            titleLine1: 'The 500 + Hour Club',
            titleLine2: '(The Titans)',
            subtitle: 'Over 20 continuous days of narration. Elite vocal endurance legends.',
            narrators: tier500
        },
        {
            id: '300-club',
            badgeId: '300-club' as const,
            titleLine1: 'The 300 + Hour Club',
            titleLine2: '(The Giants)',
            subtitle: 'Surpassing 300 continuous listening hours across sprawling series.',
            narrators: tier300
        },
        {
            id: '200-club',
            badgeId: '200-club' as const,
            titleLine1: 'The 200 + Hour Club',
            titleLine2: '(The Heavyweights)',
            subtitle: 'Anchoring massive multi-volume audio sagas with peerless stamina.',
            narrators: tier200
        },
        {
            id: '100-club',
            badgeId: '100-club' as const,
            titleLine1: 'The 100 + Hour Club',
            titleLine2: '(The Centurions)',
            subtitle: 'Crossing the century mark in continuous recorded performance.',
            narrators: tier100
        },
        {
            id: '50-club',
            badgeId: '50-club' as const,
            titleLine1: 'The 50 + Hour Club',
            titleLine2: '(The Endurance Masters)',
            subtitle: 'Two or more full days of continuous audio storytelling.',
            narrators: tier50
        },
        {
            id: 'contenders',
            badgeId: null,
            titleLine1: 'Rising Contenders',
            titleLine2: '(Under 50 Hours)',
            subtitle: 'Qualifying voice artists with multiple epic performances in our catalog.',
            narrators: tierContenders
        }
    ];

    const activeTiers = (activeTierFilter === 'all'
        ? tiers
        : tiers.filter(t => t.id === activeTierFilter)
    ).filter(t => t.narrators.length > 0);

    const schemaData = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'The TLBC Narrators Leaderboard',
        description: 'Audiobook narrators ranked by total continuous hours of performance across The Long Book Club catalog.',
        url: 'https://thelongbookclub.com/narrators/leaderboard/',
        numberOfItems: narrators.length,
        itemListElement: narrators.map((n, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            item: {
                '@type': 'Person',
                name: n.name,
                url: `https://thelongbookclub.com/narrator/${n.slug}/`
            }
        }))
    });

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <SEO
                title="Audiobook Narrators Leaderboard: Ranked by Marathon Hours | The Long Book Club"
                description={`Explore all ${narrators.length} qualifying audiobook narrators ranked by continuous listening runtime. Celebrating ${totalCatalogHours.toLocaleString()} total hours of masterclass audio storytelling.`}
                canonical="https://thelongbookclub.com/narrators/leaderboard/"
                schema={schemaData}
            />

            {/* Premium Hero Section with signature shape device */}
            <Hero
                backgroundImage="/assets/collections-hero-images/LongBookClub-Collections-background-01.gif"
                title={<>Narrators <br /> Leaderboard</>}
                subtitle="Celebrating the endurance champions of long-form audiobooks. Every qualifying voice artist ranked by verified continuous booth runtime."
                showCornerGraphics={false}
                topGraphic="/assets/collections-hero-images/collections-graphic.svg"
                topGraphicDimensions={{ width: '120px', height: '85px' }}
                sectionHeight="auto"
                sectionMinHeight="600px"
                sectionPadding="11rem 1rem 8rem 1rem"
                contentPaddingTop="0"
                titleFontSize="4.5rem"
                titleLineHeight={1.05}
                titleOpacity={0.88}
                titleColor="white"
                subtitleColor="white"
                contentBlendMode="overlay"
                titleBlendMode="overlay"
                subtitleBlendMode="overlay"
                topGraphicBlendMode="normal"
                chevronBlendMode="overlay"
                overlayOpacity={0}
            />

            <div className="page-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 1.5rem 5rem 1.5rem', width: '100%', boxSizing: 'border-box' }}>
                <div id="scroll-target" style={{ scrollMarginTop: '2rem', height: 0 }} />

                {/* Back to All Narrators Pill (Centered) */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4.5rem' }}>
                    <Link
                        to="/narrators/"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            padding: '0.45rem 1.25rem',
                            borderRadius: '9999px',
                            backgroundColor: '#eeefeb',
                            color: 'var(--color-brand-forrest)',
                            textDecoration: 'none',
                            fontSize: '0.78rem',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            transition: 'all 0.2s ease',
                            border: '1px solid rgba(25, 45, 38, 0.1)',
                            boxShadow: '0 2px 6px rgba(25, 45, 38, 0.04)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-brand-coral)';
                            e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#eeefeb';
                            e.currentTarget.style.color = 'var(--color-brand-forrest)';
                        }}
                    >
                        <FaArrowLeft size={10} />
                        All Narrators Directory
                    </Link>
                </div>

                {/* 4 Metric Circles Bar (20% Larger Circles, Lora Italic Tighter Letter Spacing) */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        gap: '2.5rem',
                        flexWrap: 'wrap',
                        marginBottom: '5.5rem',
                        width: '100%'
                    }}
                >
                    {/* Circle 1: Total Booth Runtime (Green Circle) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '190px' }}>
                        <p style={{ fontFamily: 'Lora, Georgia, serif', fontStyle: 'italic', fontSize: '1.15rem', letterSpacing: '-0.02em', color: '#2c5143', margin: '0 0 1.25rem 0', minHeight: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1.25 }}>
                            Total Booth<br />Runtime
                        </p>
                        <div style={{ width: '132px', height: '132px', borderRadius: '50%', backgroundColor: '#2c5143', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(44, 81, 67, 0.18)' }}>
                            <span style={{ fontFamily: 'Lora, Georgia, serif', fontStyle: 'italic', fontSize: '2.15rem', fontWeight: 400, letterSpacing: '-0.04em', color: '#fa7052', lineHeight: 1 }}>
                                {totalCatalogHours.toLocaleString()}
                            </span>
                            <span style={{ fontFamily: 'Lora, Georgia, serif', fontStyle: 'italic', fontSize: '1.15rem', letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1, marginTop: '0.25rem' }}>
                                hours
                            </span>
                        </div>
                        <p style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '0.92rem', color: '#2c5143', opacity: 0.85, margin: '1.35rem 0 0 0', lineHeight: 1.45 }}>
                            Equal to {totalCatalogDays}<br /><span style={{ fontStyle: 'italic' }}>continuous days<br />of listening</span>
                        </p>
                    </div>

                    {/* Circle 2: Highest Ranking Endurance Narrator (Coral Circle) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '190px' }}>
                        <p style={{ fontFamily: 'Lora, Georgia, serif', fontStyle: 'italic', fontSize: '1.15rem', letterSpacing: '-0.02em', color: '#2c5143', margin: '0 0 1.25rem 0', minHeight: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1.25 }}>
                            Highest Ranking<br />Endurance Narrator
                        </p>
                        <div style={{ width: '132px', height: '132px', borderRadius: '50%', backgroundColor: '#fa7052', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(250, 112, 82, 0.3)' }}>
                            <span style={{ fontFamily: 'Lora, Georgia, serif', fontStyle: 'italic', fontSize: '2.15rem', fontWeight: 400, letterSpacing: '-0.04em', color: '#2c5143', lineHeight: 1 }}>
                                {Math.round(enduranceLeader.totalHours).toLocaleString()}
                            </span>
                            <span style={{ fontFamily: 'Lora, Georgia, serif', fontStyle: 'italic', fontSize: '1.15rem', letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1, marginTop: '0.25rem' }}>
                                hours
                            </span>
                        </div>
                        <div style={{ margin: '1.35rem 0 0 0', lineHeight: 1.45 }}>
                            <Link
                                to={`/narrator/${enduranceLeader.slug}/`}
                                style={{
                                    fontFamily: 'Lora, Georgia, serif',
                                    fontSize: '0.95rem',
                                    color: '#2c5143',
                                    fontWeight: 600,
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '3px',
                                    transition: 'color 0.2s ease'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = '#fa7052'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = '#2c5143'; }}
                            >
                                {enduranceLeader.name}
                            </Link>
                            <p style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '0.88rem', color: '#2c5143', opacity: 0.75, margin: '0.2rem 0 0 0' }}>
                                ({enduranceLeader.bookCount} books)
                            </p>
                        </div>
                    </div>

                    {/* Circle 3: Most Prolific Narrator (Green Circle) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '190px' }}>
                        <p style={{ fontFamily: 'Lora, Georgia, serif', fontStyle: 'italic', fontSize: '1.15rem', letterSpacing: '-0.02em', color: '#2c5143', margin: '0 0 1.25rem 0', minHeight: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1.25 }}>
                            Most Prolific<br />Narrator
                        </p>
                        <div style={{ width: '132px', height: '132px', borderRadius: '50%', backgroundColor: '#2c5143', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(44, 81, 67, 0.18)' }}>
                            <span style={{ fontFamily: 'Lora, Georgia, serif', fontStyle: 'italic', fontSize: '2.15rem', fontWeight: 400, letterSpacing: '-0.04em', color: '#fa7052', lineHeight: 1 }}>
                                {mostProlific.bookCount}
                            </span>
                            <span style={{ fontFamily: 'Lora, Georgia, serif', fontStyle: 'italic', fontSize: '1.15rem', letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1, marginTop: '0.25rem' }}>
                                books
                            </span>
                        </div>
                        <div style={{ margin: '1.35rem 0 0 0', lineHeight: 1.45 }}>
                            <Link
                                to={`/narrator/${mostProlific.slug}/`}
                                style={{
                                    fontFamily: 'Lora, Georgia, serif',
                                    fontSize: '0.95rem',
                                    color: '#2c5143',
                                    fontWeight: 600,
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '3px',
                                    transition: 'color 0.2s ease'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = '#fa7052'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = '#2c5143'; }}
                            >
                                {mostProlific.name}
                            </Link>
                            <p style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '0.88rem', color: '#2c5143', opacity: 0.75, margin: '0.2rem 0 0 0' }}>
                                ({mostProlific.bookCount} books)
                            </p>
                        </div>
                    </div>

                    {/* Circle 4: Longest Single Performance (Coral Circle) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '190px' }}>
                        <p style={{ fontFamily: 'Lora, Georgia, serif', fontStyle: 'italic', fontSize: '1.15rem', letterSpacing: '-0.02em', color: '#2c5143', margin: '0 0 1.25rem 0', minHeight: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1.25 }}>
                            Longest Single<br />Performance
                        </p>
                        <div style={{ width: '132px', height: '132px', borderRadius: '50%', backgroundColor: '#fa7052', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(250, 112, 82, 0.3)' }}>
                            <span style={{ fontFamily: 'Lora, Georgia, serif', fontStyle: 'italic', fontSize: '2.15rem', fontWeight: 400, letterSpacing: '-0.04em', color: '#2c5143', lineHeight: 1 }}>
                                {longestSoloPerformance ? longestSoloPerformance.lengthHours : 126.6}
                            </span>
                            <span style={{ fontFamily: 'Lora, Georgia, serif', fontStyle: 'italic', fontSize: '1.15rem', letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1, marginTop: '0.25rem' }}>
                                hours
                            </span>
                        </div>
                        <div style={{ margin: '1.35rem 0 0 0', lineHeight: 1.45 }}>
                            {longestSoloPerformance ? (
                                <Link
                                    to={`/book/${longestSoloPerformance.slug}/`}
                                    style={{
                                        fontFamily: 'Lora, Georgia, serif',
                                        fontSize: '0.92rem',
                                        color: '#2c5143',
                                        textDecoration: 'underline',
                                        textUnderlineOffset: '3px',
                                        display: 'block',
                                        transition: 'color 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fa7052'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = '#2c5143'; }}
                                >
                                    {longestSoloPerformance.title} – {longestSoloPerformance.author}
                                </Link>
                            ) : (
                                <span style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '0.92rem', color: '#2c5143' }}>
                                    The Decline and Fall of the Roman Empire – Edward Gibbon
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Minimalist Pipe-Separated Filter Bar */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '0.65rem 0.85rem',
                        marginBottom: '4rem',
                        paddingBottom: '2.5rem',
                        borderBottom: '1px solid rgba(44, 81, 67, 0.15)',
                        width: '100%',
                        maxWidth: '900px',
                        margin: '0 auto 4rem auto'
                    }}
                >
                    {[
                        { id: 'all', label: 'All Tiers' },
                        ...(tier1000.length > 0 ? [{ id: '1000-club', label: '1000 Club' }] : []),
                        { id: '500-club', label: '500 Club' },
                        { id: '300-club', label: '300 Club' },
                        { id: '200-club', label: '200 Club' },
                        { id: '100-club', label: '100 Club' },
                        { id: '50-club', label: '50 Club' },
                        { id: 'contenders', label: 'Contenders' }
                    ].map((item, idx, arr) => {
                        const isActive = activeTierFilter === item.id;
                        return (
                            <React.Fragment key={item.id}>
                                <button
                                    onClick={() => setActiveTierFilter(item.id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: '0.2rem 0.35rem',
                                        cursor: 'pointer',
                                        fontFamily: 'Lora, Georgia, serif',
                                        fontSize: '1.05rem',
                                        fontWeight: isActive ? 700 : 400,
                                        color: isActive ? '#fa7052' : '#2c5143',
                                        transition: 'color 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) e.currentTarget.style.color = '#fa7052';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) e.currentTarget.style.color = '#2c5143';
                                    }}
                                >
                                    {item.label}
                                </button>
                                {idx < arr.length - 1 && (
                                    <span style={{ color: '#2c5143', opacity: 0.35, fontSize: '0.95rem' }}>|</span>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Tier Sections */}
                {activeTiers.map((tier, tIdx) => {
                    const badge = tier.badgeId ? NARRATOR_BADGES[tier.badgeId] : null;

                    return (
                        <React.Fragment key={tier.id}>
                            <section style={{ marginBottom: '2rem', width: '100%' }}>
                                {/* Centered Tier Header */}
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        marginBottom: '2.5rem'
                                    }}
                                >
                                    {badge && (
                                        <img
                                            src={badge.imageUrl}
                                            alt={badge.name}
                                            style={{
                                                width: '68px',
                                                height: 'auto',
                                                marginBottom: '1.25rem',
                                                filter: 'drop-shadow(0 4px 10px rgba(25, 45, 38, 0.22))'
                                            }}
                                        />
                                    )}
                                    <h2
                                        style={{
                                            fontFamily: 'Lora, Georgia, serif',
                                            fontSize: '2.1rem',
                                            fontWeight: 400,
                                            color: '#2c5143',
                                            margin: '0 0 0.25rem 0',
                                            lineHeight: 1.2
                                        }}
                                    >
                                        {tier.titleLine1}
                                    </h2>
                                    <span
                                        style={{
                                            fontFamily: 'Lora, Georgia, serif',
                                            fontStyle: 'italic',
                                            fontSize: '1.65rem',
                                            color: '#2c5143',
                                            lineHeight: 1.2,
                                            marginBottom: '0.85rem'
                                        }}
                                    >
                                        {tier.titleLine2}
                                    </span>
                                    <p
                                        style={{
                                            fontFamily: 'Lora, Georgia, serif',
                                            fontStyle: 'italic',
                                            fontSize: '0.95rem',
                                            color: '#2c5143',
                                            opacity: 0.85,
                                            margin: 0,
                                            maxWidth: '620px',
                                            lineHeight: 1.55
                                        }}
                                    >
                                        {tier.subtitle} ({tier.narrators.length} {tier.narrators.length === 1 ? 'Narrator' : 'Narrators'})
                                    </p>
                                </div>

                                {/* Cards Container: Centered flex for 1-2 cards, 3-column responsive grid for 3+ */}
                                <div
                                    style={{
                                        display: tier.narrators.length <= 2 ? 'flex' : 'grid',
                                        ...(tier.narrators.length <= 2
                                            ? {
                                                  justifyContent: 'center',
                                                  gap: '2rem',
                                                  flexWrap: 'wrap' as const
                                              }
                                            : {
                                                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 320px))',
                                                  justifyContent: 'center',
                                                  gap: '2.5rem 2rem'
                                              }),
                                        maxWidth: '1060px',
                                        margin: '0 auto'
                                    }}
                                >
                                    {tier.narrators.map(narrator => {
                                        const overallRank = narrators.findIndex(n => n.slug === narrator.slug) + 1;
                                        return (
                                            <LeaderboardCard
                                                key={narrator.slug}
                                                narrator={narrator}
                                                overallRank={overallRank}
                                            />
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Divider between sections */}
                            {tIdx < activeTiers.length - 1 && (
                                <hr
                                    style={{
                                        border: 'none',
                                        borderTop: '1px solid rgba(44, 81, 67, 0.15)',
                                        maxWidth: '900px',
                                        margin: '5rem auto 4.5rem auto'
                                    }}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};
