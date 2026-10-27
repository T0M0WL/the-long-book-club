import React, { useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { books } from '../data/books';
import { useSetHeaderTheme } from '../context/HeaderContext';
import {
    narratorData,
    NARRATOR_BADGES,
    NARRATOR_STYLE_HUBS,
    type NarratorStyleBadgeId,
    getHighestMarathonBadge
} from '../data/narratorData';
import { cleanNarrators, getNarratorStats } from '../utils/creatorUtils';
import { slugify } from '../utils/slugify';
import AudioPlayer from '../components/AudioPlayer';
import { FaClock, FaAudible } from 'react-icons/fa6';

export const NarratorStyleDetail: React.FC = () => {
    useSetHeaderTheme({
        logoColor: 'var(--color-brand-cloud)',
        textColor: 'var(--color-brand-cloud)',
        hamburgerColor: 'var(--color-brand-cloud)',
        activeLink: 'narrators',
        activeLinkBg: 'var(--color-brand-cloud)',
        activeLinkText: 'var(--color-brand-coral)'
    });

    const { styleSlug } = useParams<{ styleSlug: string }>();
    const styleId = styleSlug as NarratorStyleBadgeId;

    const hubDef = styleId ? NARRATOR_STYLE_HUBS[styleId] : null;
    const badgeDef = styleId ? NARRATOR_BADGES[styleId] : null;

    if (!hubDef || !badgeDef) {
        return <Navigate to="/narrators/" replace />;
    }

    const [selectedGenre, setSelectedGenre] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'longest' | 'shortest' | 'alphabetical'>('longest');

    // Get all qualifying narrators who hold this style badge
    const allNarratorStats = useMemo(() => getNarratorStats(), []);
    const honoredNarrators = useMemo(() => {
        return Object.values(narratorData)
            .filter(profile => profile.styleBadges.includes(styleId))
            .map(profile => {
                const stat = allNarratorStats.find(n => n.slug === profile.slug);
                return {
                    profile,
                    stat,
                    totalHours: stat?.totalHours || 0,
                    bookCount: stat?.bookCount || 0
                };
            })
            .sort((a, b) => b.totalHours - a.totalHours);
    }, [styleId, allNarratorStats]);

    const honoredSlugs = useMemo(() => new Set(honoredNarrators.map(n => n.profile.slug)), [honoredNarrators]);

    // Find all books in the catalog narrated by ANY of these honored narrators
    const styleBooks = useMemo(() => {
        return books.filter(b => {
            if (!b.narrator) return false;
            const names = cleanNarrators(b.narrator);
            return names.some(name => honoredSlugs.has(slugify(name)));
        });
    }, [honoredSlugs]);

    // Collect all genres for filtering
    const availableGenres = useMemo(() => {
        const genreSet = new Set<string>();
        styleBooks.forEach(b => {
            if (Array.isArray(b.genre)) {
                b.genre.forEach(g => genreSet.add(g));
            } else if (typeof b.genre === 'string') {
                genreSet.add(b.genre);
            }
        });
        return Array.from(genreSet).sort();
    }, [styleBooks]);

    const genreCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        styleBooks.forEach(b => {
            const genres = Array.isArray(b.genre) ? b.genre : [b.genre];
            genres.forEach(g => {
                if (g) counts[g] = (counts[g] || 0) + 1;
            });
        });
        return counts;
    }, [styleBooks]);

    // Filter & Sort books
    const displayedBooks = useMemo(() => {
        let result = styleBooks.filter(b => {
            if (selectedGenre === 'all') return true;
            if (Array.isArray(b.genre)) return b.genre.includes(selectedGenre);
            return b.genre === selectedGenre;
        });

        result.sort((a, b) => {
            const hA = a.lengthHours || 0;
            const hB = b.lengthHours || 0;
            if (sortBy === 'longest') return hB - hA;
            if (sortBy === 'shortest') return hA - hB;
            return a.title.localeCompare(b.title);
        });

        return result;
    }, [styleBooks, selectedGenre, sortBy]);

    const displayedHours = Math.round(
        displayedBooks.reduce((acc, b) => acc + (b.lengthHours || 0), 0)
    );

    const schemaData = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${hubDef.name} Audiobooks & Narrators | The Long Book Club`,
        description: hubDef.metaDescription,
        url: `https://thelongbookclub.com/narrator-styles/${hubDef.id}/`
    });

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <SEO
                title={`${hubDef.seoTitle} | The Long Book Club`}
                description={hubDef.metaDescription}
                canonical={`https://thelongbookclub.com/narrator-styles/${hubDef.id}/`}
                schema={schemaData}
            />

            {/* Premium Hero Section with signature shape device */}
            <Hero
                backgroundImage="/assets/collections-hero-images/LongBookClub-Collections-background-01.gif"
                title={<>{hubDef.name}</>}
                subtitle={hubDef.tagline}
                showCornerGraphics={false}
                topGraphic={badgeDef.heroGraphicUrl || badgeDef.imageUrl}
                topGraphicDimensions={{ width: 'auto', height: '110px' }}
                topGraphicFilter={badgeDef.heroGraphicUrl ? 'none' : 'drop-shadow(0 8px 18px rgba(0, 0, 0, 0.35))'}
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
                topGraphicBlendMode={badgeDef.heroGraphicUrl ? 'overlay' : 'normal'}
                topGraphicOpacity={badgeDef.heroGraphicUrl ? 0.88 : 1}
                chevronBlendMode="overlay"
                overlayOpacity={0}
            />

            <div className="page-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 1.5rem 6rem 1.5rem', width: '100%' }}>
                <div id="scroll-target" style={{ scrollMarginTop: '2rem', height: 0 }} />

                {/* Top Navigation Coral Pills */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4.5rem' }}>
                    <Link
                        to="/narrators/"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            padding: '0.65rem 1.6rem',
                            borderRadius: '9999px',
                            backgroundColor: 'var(--color-brand-coral)',
                            color: '#ffffff',
                            textDecoration: 'none',
                            fontSize: '0.82rem',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            boxShadow: '0 4px 14px rgba(250, 112, 82, 0.28)',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 18px rgba(250, 112, 82, 0.38)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 14px rgba(250, 112, 82, 0.28)';
                        }}
                    >
                        ALL NARRATORS →
                    </Link>
                    <Link
                        to="/narrators/leaderboard/"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            padding: '0.65rem 1.6rem',
                            borderRadius: '9999px',
                            backgroundColor: 'var(--color-brand-coral)',
                            color: '#ffffff',
                            textDecoration: 'none',
                            fontSize: '0.82rem',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            boxShadow: '0 4px 14px rgba(250, 112, 82, 0.28)',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 18px rgba(250, 112, 82, 0.38)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 14px rgba(250, 112, 82, 0.28)';
                        }}
                    >
                        NARRATORS LEADERBOARD →
                    </Link>
                </div>

                {/* Section 1: The Philosophy (Clean, Centered, No Box) */}
                <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 5.5rem auto' }}>
                    <h2 style={{
                        fontFamily: 'Lora, Georgia, serif',
                        fontStyle: 'italic',
                        fontSize: 'clamp(2.1rem, 3.8vw, 2.75rem)',
                        fontWeight: 400,
                        letterSpacing: '-0.04em',
                        color: 'var(--color-brand-forrest)',
                        margin: '0 0 1.25rem 0',
                        lineHeight: 1.15
                    }}>
                        The Philosophy of {hubDef.name}
                    </h2>
                    <div style={{
                        width: '45px',
                        height: '1px',
                        backgroundColor: 'var(--color-brand-forrest)',
                        opacity: 0.35,
                        margin: '0 auto 1.5rem auto'
                    }} />
                    <p style={{
                        fontFamily: 'Lora, Georgia, serif',
                        fontStyle: 'italic',
                        fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
                        fontWeight: 400,
                        lineHeight: 1.38,
                        letterSpacing: '-0.02em',
                        color: 'var(--color-brand-forrest)',
                        opacity: 0.9,
                        margin: 0
                    }}>
                        {hubDef.description}
                    </p>
                </div>

                {/* Section 2: Honored Narrators (Centered Title + 3-Column Lozenge Cards) */}
                <div style={{ marginBottom: '6rem', textAlign: 'center' }}>
                    <h2 style={{
                        fontFamily: 'Lora, Georgia, serif',
                        fontStyle: 'italic',
                        fontSize: 'clamp(1.9rem, 3.5vw, 2.45rem)',
                        fontWeight: 400,
                        letterSpacing: '-0.04em',
                        color: 'var(--color-brand-forrest)',
                        margin: '0 auto 0.75rem auto',
                        lineHeight: 1.2,
                        maxWidth: '720px'
                    }}>
                        {hubDef.honoredTitle || `Narrators Honored with ${hubDef.name}`}
                    </h2>
                    <p style={{
                        fontFamily: 'Lora, Georgia, serif',
                        fontStyle: 'italic',
                        fontSize: '1.05rem',
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        color: 'var(--color-brand-forrest)',
                        opacity: 0.85,
                        margin: '0 auto 2.5rem auto'
                    }}>
                        <strong style={{ fontWeight: 700, fontStyle: 'italic' }}>{honoredNarrators.length} voice artists</strong> recognized for this hallmark acoustic signature in The Long Book Club.
                    </p>

                    <div style={{
                        width: '100%',
                        height: '1px',
                        backgroundColor: 'rgba(44, 81, 67, 0.12)',
                        marginBottom: '3rem'
                    }} />

                    {/* 3-Column Lozenge Cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1.25rem'
                    }}>
                        {honoredNarrators.map(({ profile, totalHours, bookCount }) => {
                            const marathonBadge = getHighestMarathonBadge(totalHours);
                            return (
                                <Link
                                    key={profile.slug}
                                    to={`/narrator/${profile.slug}/`}
                                    style={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: '1.25rem',
                                        padding: '1.15rem 1.4rem',
                                        textDecoration: 'none',
                                        color: '#192d26',
                                        border: '1px solid rgba(25, 45, 38, 0.08)',
                                        boxShadow: '0 4px 16px rgba(25, 45, 38, 0.04)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1.15rem',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 6px 18px rgba(25, 45, 38, 0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(25, 45, 38, 0.04)';
                                    }}
                                >
                                    {marathonBadge && (
                                        <img
                                            src={marathonBadge.imageUrl}
                                            alt={marathonBadge.name}
                                            style={{
                                                width: '46px',
                                                height: 'auto',
                                                filter: 'drop-shadow(0 2px 4px rgba(25, 45, 38, 0.16))',
                                                flexShrink: 0
                                            }}
                                        />
                                    )}
                                    <div style={{ flex: 1, textAlign: 'left' }}>
                                        <h3 style={{
                                            fontFamily: 'Lora, Georgia, serif',
                                            fontStyle: 'italic',
                                            fontSize: '1.25rem',
                                            fontWeight: 400,
                                            letterSpacing: '-0.025em',
                                            margin: '0 0 0.2rem 0',
                                            color: 'var(--color-brand-forrest)',
                                            lineHeight: 1.25
                                        }}>
                                            {profile.name}
                                        </h3>
                                        <p style={{
                                            fontSize: '0.82rem',
                                            color: '#71717a',
                                            fontFamily: 'Inter, sans-serif',
                                            margin: 0
                                        }}>
                                            {Math.round(totalHours)} hrs • {bookCount} {bookCount === 1 ? 'book' : 'books'}
                                        </p>
                                    </div>
                                    <span style={{ color: 'var(--color-brand-coral)', fontSize: '1.15rem', fontWeight: 600, flexShrink: 0 }}>
                                        →
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Section 3: Audiobooks Header & Dropdowns */}
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <h2 style={{
                        fontFamily: 'Lora, Georgia, serif',
                        fontStyle: 'italic',
                        fontSize: 'clamp(2rem, 3.8vw, 2.65rem)',
                        fontWeight: 400,
                        letterSpacing: '-0.04em',
                        color: 'var(--color-brand-forrest)',
                        margin: '0 auto 0.75rem auto',
                        lineHeight: 1.2,
                        maxWidth: '780px'
                    }}>
                        All The Long Book Club<br />
                        Audiobooks With {hubDef.name}
                    </h2>
                    <p style={{
                        fontFamily: 'Lora, Georgia, serif',
                        fontStyle: 'italic',
                        fontSize: '1.05rem',
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        color: 'var(--color-brand-forrest)',
                        opacity: 0.85,
                        margin: '0 auto 2.25rem auto'
                    }}>
                        Showing <strong style={{ fontWeight: 700, fontStyle: 'italic' }}>{displayedBooks.length}</strong> long-form audiobooks (<strong style={{ fontWeight: 700, fontStyle: 'italic' }}>{displayedHours}</strong> total listening hours)
                    </p>

                    {/* Centered Coral Dropdowns */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1rem',
                        flexWrap: 'wrap'
                    }}>
                        {/* Genre Dropdown */}
                        <div style={{ position: 'relative' }}>
                            <select
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}
                                style={{
                                    backgroundColor: 'var(--color-brand-coral)',
                                    color: '#ffffff',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '0.92rem',
                                    fontWeight: 600,
                                    padding: '0.8rem 2.85rem 0.8rem 1.6rem',
                                    borderRadius: '2rem',
                                    border: 'none',
                                    cursor: 'pointer',
                                    appearance: 'none',
                                    WebkitAppearance: 'none',
                                    boxShadow: '0 4px 14px rgba(250, 112, 82, 0.28)',
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 1.25rem center',
                                    outline: 'none',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <option value="all" style={{ backgroundColor: '#ffffff', color: 'var(--color-brand-forrest)' }}>
                                    All Genres ({styleBooks.length})
                                </option>
                                {availableGenres.map(g => (
                                    <option key={g} value={g} style={{ backgroundColor: '#ffffff', color: 'var(--color-brand-forrest)' }}>
                                        {g} ({genreCounts[g] || 0})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort Dropdown */}
                        <div style={{ position: 'relative' }}>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'longest' | 'shortest' | 'alphabetical')}
                                style={{
                                    backgroundColor: 'var(--color-brand-coral)',
                                    color: '#ffffff',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '0.92rem',
                                    fontWeight: 600,
                                    padding: '0.8rem 2.85rem 0.8rem 1.6rem',
                                    borderRadius: '2rem',
                                    border: 'none',
                                    cursor: 'pointer',
                                    appearance: 'none',
                                    WebkitAppearance: 'none',
                                    boxShadow: '0 4px 14px rgba(250, 112, 82, 0.28)',
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 1.25rem center',
                                    outline: 'none',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <option value="longest" style={{ backgroundColor: '#ffffff', color: 'var(--color-brand-forrest)' }}>
                                    Longest First
                                </option>
                                <option value="shortest" style={{ backgroundColor: '#ffffff', color: 'var(--color-brand-forrest)' }}>
                                    Shortest First
                                </option>
                                <option value="alphabetical" style={{ backgroundColor: '#ffffff', color: 'var(--color-brand-forrest)' }}>
                                    Title (A-Z)
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Section 4: Redesigned Book Cards Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '2rem'
                }}>
                    {displayedBooks.map(book => {
                        const scText = book.soundCheck || '';
                        const cleanQuote = scText.replace(/<[^>]*>/g, '').substring(0, 160).trim();

                        return (
                            <div
                                key={book.slug}
                                style={{
                                    backgroundColor: '#eeefeb',
                                    borderRadius: '1.25rem',
                                    padding: '2rem 1.75rem 1.5rem 1.75rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    border: '1px solid rgba(25, 45, 38, 0.08)',
                                    boxShadow: '0 4px 16px rgba(25, 45, 38, 0.03)',
                                    textAlign: 'center'
                                }}
                            >
                                <div>
                                    {/* 1:1 Aspect Ratio Packshot centralized at the top */}
                                    <Link
                                        to={`/book/${book.slug}/`}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            maxWidth: '190px',
                                            aspectRatio: '1 / 1',
                                            margin: '0 auto 1.25rem auto'
                                        }}
                                    >
                                        <img
                                            src={book.coverUrl}
                                            alt={book.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                aspectRatio: '1 / 1',
                                                objectFit: 'cover',
                                                borderRadius: '12px',
                                                boxShadow: '0 8px 22px rgba(25, 45, 38, 0.16)',
                                                transition: 'transform 0.2s ease',
                                                display: 'block'
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                        />
                                    </Link>

                                    {/* Length Indicator */}
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.35rem',
                                        fontSize: '0.78rem',
                                        color: 'var(--color-brand-coral)',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.06em',
                                        marginBottom: '0.45rem'
                                    }}>
                                        <FaClock size={11} /> {book.length || `${book.lengthHours}h`}
                                    </span>

                                    {/* Centralized Book Title in Lora Italic */}
                                    <h3 style={{
                                        fontFamily: 'Lora, Georgia, serif',
                                        fontStyle: 'italic',
                                        fontSize: '1.35rem',
                                        fontWeight: 400,
                                        letterSpacing: '-0.03em',
                                        margin: '0 0 0.35rem 0',
                                        lineHeight: 1.25
                                    }}>
                                        <Link
                                            to={`/book/${book.slug}/`}
                                            style={{ color: 'var(--color-brand-forrest)', textDecoration: 'none' }}
                                        >
                                            {book.title}
                                        </Link>
                                    </h3>

                                    {/* Centralized Author in Lora Italic */}
                                    <p style={{
                                        fontFamily: 'Lora, Georgia, serif',
                                        fontStyle: 'italic',
                                        fontSize: '0.92rem',
                                        fontWeight: 400,
                                        letterSpacing: '-0.02em',
                                        color: 'var(--color-brand-forrest)',
                                        opacity: 0.85,
                                        margin: '0 0 0.35rem 0'
                                    }}>
                                        by {book.author}
                                    </p>

                                    {/* Centralized Narrator */}
                                    <p style={{
                                        fontFamily: 'Lora, Georgia, serif',
                                        fontSize: '0.9rem',
                                        color: 'var(--color-brand-forrest)',
                                        fontWeight: 600,
                                        margin: '0 0 1.25rem 0'
                                    }}>
                                        Narrated by {book.narrator}
                                    </p>

                                    {/* Centralized Soundcheck Quote in Lora Italic (No vertical orange line) */}
                                    {cleanQuote && (
                                        <div style={{
                                            marginBottom: '1.25rem',
                                            fontFamily: 'Lora, Georgia, serif',
                                            fontStyle: 'italic',
                                            fontSize: '0.92rem',
                                            fontWeight: 400,
                                            lineHeight: 1.55,
                                            letterSpacing: '-0.02em',
                                            color: 'var(--color-brand-forrest)',
                                            opacity: 0.9,
                                            textAlign: 'center',
                                            padding: '0 0.5rem'
                                        }}>
                                            "{cleanQuote}..."
                                        </div>
                                    )}

                                    {/* Audio Preview Player */}
                                    {book.audioPreviewUrl && (
                                        <div style={{ marginBottom: '1.25rem' }}>
                                            <AudioPlayer src={book.audioPreviewUrl} />
                                        </div>
                                    )}
                                </div>

                                {/* Action Links */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingTop: '1rem',
                                    borderTop: '1px solid rgba(25, 45, 38, 0.08)'
                                }}>
                                    <Link
                                        to={`/book/${book.slug}/`}
                                        style={{
                                            fontSize: '0.88rem',
                                            fontWeight: 700,
                                            color: 'var(--color-brand-coral)',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        Curator Review →
                                    </Link>

                                    {book.affiliateLink && (
                                        <a
                                            href={book.affiliateLink}
                                            target="_blank"
                                            rel="noopener noreferrer nofollow"
                                            style={{
                                                fontSize: '0.85rem',
                                                fontWeight: 600,
                                                color: 'var(--color-brand-forrest)',
                                                textDecoration: 'none',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.45rem',
                                                borderBottom: '1px dotted var(--color-brand-forrest)',
                                                transition: 'color 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brand-coral)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-brand-forrest)')}
                                        >
                                            <span>On Audible</span>
                                            <FaAudible
                                                size={15}
                                                style={{
                                                    display: 'inline-block',
                                                    verticalAlign: 'middle',
                                                    flexShrink: 0
                                                }}
                                            />
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
