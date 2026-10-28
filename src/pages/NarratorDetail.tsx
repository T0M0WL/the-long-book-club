import { useParams, Link, Navigate } from 'react-router-dom';
import { books, type Book } from '../data/books';
import { reviews } from '../data/reviews';
import { BookGrid } from '../components/BookGrid';
import { SEO } from '../components/SEO';
import AudioPlayer from '../components/AudioPlayer';
import { getNarratorBySlug } from '../utils/creatorUtils';
import { getRoundedHours } from '../utils/formatLength';
import { slugify } from '../utils/slugify';
import {
    narratorData,
    NARRATOR_BADGES,
    getHighestMarathonBadge,
    type NarratorBadgeDef,
    type NarratorStyleBadgeId
} from '../data/narratorData';
import { useEffect, useRef } from 'react';
import { useSetHeaderTheme } from '../context/HeaderContext';

/**
 * Renders text that may contain Markdown links [Label](/path/) as React Router Links.
 */
function renderBioWithLinks(text: string) {
    const parts: React.ReactNode[] = [];
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }
        const label = match[1];
        const url = match[2];
        if (url.startsWith('/')) {
            parts.push(
                <Link key={match.index} to={url}>
                    {label}
                </Link>
            );
        } else {
            parts.push(
                <a key={match.index} href={url} target="_blank" rel="noopener noreferrer">
                    {label}
                </a>
            );
        }
        lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }

    return parts;
}

/**
 * Computes top N genres from a narrator's books.
 */
function getTopGenresForBooks(narratorBooks: Book[], count = 4): string[] {
    const freq = new Map<string, number>();
    for (const b of narratorBooks) {
        const gList = Array.isArray(b.genre) ? b.genre : [b.genre];
        for (const g of gList) {
            if (!g) continue;
            freq.set(g, (freq.get(g) || 0) + 1);
        }
    }
    return Array.from(freq.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, count)
        .map(([g]) => g);
}

/**
 * Extracts a concise pull-quote fallback from the narrator's reviews if not manually curated.
 */
function getFallbackArchiveQuote(narratorBooks: Book[]): { quote: string; bookTitle: string; bookSlug: string } {
    for (const b of narratorBooks) {
        const rev = reviews[b.title];
        const sc = rev?.soundCheck || b.soundCheck;
        if (sc) {
            const sentences = sc.split(/(?<=[.!?])\s+/);
            const chosen = sentences.find(s => s.length >= 60 && s.length <= 165) || sentences[0];
            const cleaned = chosen.replace(/^["'“”]+|["'“”.]+$/g, '').trim();
            return {
                quote: cleaned,
                bookTitle: b.title,
                bookSlug: b.slug || b.id
            };
        }
    }
    const first = narratorBooks[0];
    return {
        quote: `An unforgettable, immersive vocal performance that commands every hour of this marathon listen`,
        bookTitle: first?.title || '',
        bookSlug: first?.slug || first?.id || ''
    };
}

/**
 * Infers fallback vocal style badges when not explicitly configured in narratorData.
 */
function getFallbackStyleBadges(topGenres: string[], narratorBooks: Book[]): NarratorStyleBadgeId[] {
    const joined = topGenres.join(' ').toLowerCase();
    const hasCoNarrator = narratorBooks.some(b => (b.narrator || '').includes(',') || (b.narrator || '').includes('&'));
    const badges: NarratorStyleBadgeId[] = [];

    if (joined.includes('history') || joined.includes('classic') || joined.includes('biography') || joined.includes('war')) {
        badges.push('historical-gravitas');
    } else if (joined.includes('cozy') || joined.includes('slice of life') || joined.includes('fairy tale')) {
        badges.push('fireside-warmth');
    } else if (joined.includes('humour') || joined.includes('satire') || joined.includes('comedy')) {
        badges.push('satirical-bite');
    } else {
        badges.push('propulsive-momentum');
    }

    if (hasCoNarrator) {
        badges.push('dual-pov-synergy');
    } else if (!badges.includes('dialect-immersion')) {
        badges.push('dialect-immersion');
    }

    return badges.slice(0, 2);
}

export const NarratorDetail = () => {
    useSetHeaderTheme({
        logoColor: 'var(--color-brand-forrest)',
        textColor: 'var(--color-brand-forrest)',
        hamburgerColor: 'var(--color-brand-forrest)',
        activeLink: '',
        activeLinkBg: 'var(--color-brand-forrest)',
        activeLinkText: 'var(--color-brand-cloud)'
    });

    const { slug } = useParams<{ slug: string }>();
    const heroImageRef = useRef<HTMLImageElement>(null);

    const narrator = slug ? getNarratorBySlug(slug, books, 1) : undefined;

    // Single-book narrators automatically route to their individual book page
    if (narrator && narrator.bookCount === 1 && narrator.books[0]?.slug) {
        return <Navigate to={`/book/${narrator.books[0].slug}/`} replace />;
    }

    // Scroll Effect for Hero Image
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (!heroImageRef.current) return;
                    const scrollY = window.scrollY;
                    const windowHeight = window.innerHeight;
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

    if (!narrator || narrator.books.length === 0) {
        return (
            <div className="page-container" style={{ padding: '8rem 2rem 4rem', textAlign: 'center', minHeight: '60vh' }}>
                <SEO title="Narrator Not Found" description="The requested narrator could not be found." />
                <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>Narrator Not Found</h1>
                <p style={{ marginBottom: '2rem', color: 'var(--color-text-muted)' }}>
                    We couldn't find any qualifying audiobooks for this narrator in our catalog.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/narrators/" style={{ color: 'var(--color-brand-coral)', textDecoration: 'underline' }}>Browse All Narrators</Link>
                    <span style={{ opacity: 0.5 }}>•</span>
                    <Link to="/" style={{ color: 'var(--color-brand-coral)', textDecoration: 'underline' }}>Return Home</Link>
                </div>
            </div>
        );
    }

    const profile = narratorData[narrator.slug];
    const lastName = narrator.name.trim().split(/\s+/).slice(-1)[0] || narrator.name;

    // 1. Hero Bio
    const heroBioText = profile?.heroBio
        || `Masterful voice performances by ${narrator.name}. Experience marathon listening journeys brought to life with world-class vocal pacing, distinct character voices, and stamina.`;
    const plainHeroBio = heroBioText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');

    // 2. Earned Badges (Style Badges + Single Highest Marathon Badge)
    const topGenres = (profile?.topGenres && profile.topGenres.length > 0)
        ? profile.topGenres.slice(0, 4)
        : getTopGenresForBooks(narrator.books, 4);

    const styleBadgeIds = profile?.styleBadges || getFallbackStyleBadges(topGenres, narrator.books);
    const earnedBadges: NarratorBadgeDef[] = styleBadgeIds
        .map(id => NARRATOR_BADGES[id])
        .filter(Boolean);

    const marathonBadge = getHighestMarathonBadge(narrator.totalHours);
    if (marathonBadge) {
        earnedBadges.push(marathonBadge);
    }

    // 3. Links
    const audibleUrl = profile?.audibleUrl
        || `https://www.amazon.co.uk/s?k=${encodeURIComponent(narrator.name)}&i=audible&tag=thelongbookclub-21`;
    const referenceUrl = profile?.referenceUrl;
    const referenceLabel = profile?.referenceLabel || `${narrator.name} Wiki`;

    // 4. Dashboard Metrics
    const roundedTotalHours = Math.floor(narrator.totalHours);
    // Calculate days and weeks for Block 1
    // Note: For 880 hours, 880 / 24 = 36.67 -> 37 days (and 36 days = 5 weeks and 1 day)
    const totalDays = Math.round(roundedTotalHours / 24);
    const weeks = Math.floor(roundedTotalHours / (24 * 7));
    const remDays = Math.max(1, Math.floor((roundedTotalHours % (24 * 7)) / 24));

    // Longest continuous performance (narrator.books is sorted by lengthHours descending)
    const longestBook = narrator.books[0];
    const longestBookHours = getRoundedHours(longestBook.length);

    // Vocal Hallmarks (Block 5)
    const vocalKeywords = profile?.vocalHallmarksKeywords || [
        'Dynamic',
        'Pacing,',
        'Immersive',
        'Presence'
    ];
    const vocalSummary = profile?.vocalHallmarksSummary
        || `${lastName}'s commanding vocal presence and nuanced character differentiation sustain listener immersion across every marathon chapter.`;

    // Review Archive Quote (Block 6)
    const archiveQuote = profile?.archiveQuote || getFallbackArchiveQuote(narrator.books);

    // Soundcheck Sample Book (Block 7)
    const soundcheckBook = (profile?.soundcheckBookSlug
        ? narrator.books.find(b => b.slug === profile.soundcheckBookSlug)
        : undefined)
        || narrator.books.find(b => Boolean(b.audioPreviewUrl))
        || longestBook;

    // Top 3 Books (Block 8)
    const topThreeBooks: Book[] = profile?.topBookSlugs
        ? profile.topBookSlugs
            .map(s => narrator.books.find(b => b.slug === s))
            .filter((b): b is Book => Boolean(b))
        : narrator.books.slice(0, 3);

    const pageTitle = `${narrator.name} Long Audiobooks & Narrations`;
    const seoDescription = `${plainHeroBio} Explore ${narrator.bookCount} epic audiobooks narrated by ${narrator.name} totaling over ${roundedTotalHours} hours.`;
    const canonicalUrl = `https://thelongbookclub.com/narrator/${narrator.slug}/`;

    const scrollToContent = () => {
        const content = document.getElementById('narrator-content');
        if (content) {
            content.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToBooks = () => {
        const booksEl = document.getElementById('narrator-books');
        if (booksEl) {
            booksEl.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const schemaData = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: pageTitle,
        description: seoDescription,
        url: canonicalUrl,
        about: {
            '@type': 'Person',
            name: narrator.name,
            description: `${plainHeroBio} ${vocalSummary}`,
            award: earnedBadges.map(b => `The Long Book Club ${b.name} Award`),
            knowsAbout: [...topGenres, ...vocalKeywords.map(k => k.replace(/,/g, ''))],
            ...(referenceUrl ? { sameAs: [referenceUrl] } : {})
        },
        mainEntity: {
            '@type': 'ItemList',
            numberOfItems: narrator.bookCount,
            itemListElement: narrator.books.map((b, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'Audiobook',
                    name: b.title,
                    readBy: {
                        '@type': 'Person',
                        name: narrator.name
                    },
                    url: `https://thelongbookclub.com/book/${b.slug || b.id}/`
                }
            }))
        }
    });

    const cardHeaderStyle: React.CSSProperties = {
        fontFamily: 'var(--font-serif-accent)',
        fontStyle: 'italic',
        fontWeight: 600,
        fontSize: '1.12rem',
        lineHeight: 1.22,
        color: 'var(--color-brand-forrest)',
        marginBottom: '0.5rem'
    };

    const circleStyle: React.CSSProperties = {
        width: '134px',
        height: '134px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-brand-forrest)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0.5rem auto',
        flexShrink: 0,
        boxShadow: '0 4px 10px rgba(44, 81, 67, 0.14)'
    };

    const circleNumberStyle: React.CSSProperties = {
        fontFamily: 'var(--font-serif-accent)',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '2.9rem',
        lineHeight: 0.92,
        letterSpacing: '-0.03em',
        color: 'var(--color-brand-coral)'
    };

    const circleSubLabelStyle: React.CSSProperties = {
        fontFamily: 'var(--font-serif-accent)',
        fontStyle: 'italic',
        fontWeight: 600,
        fontSize: '0.95rem',
        color: '#ffffff',
        marginTop: '0.3rem',
        lineHeight: 1
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <SEO
                title={pageTitle}
                description={seoDescription}
                canonical={canonicalUrl}
                themeColor="#eae8da"
                schema={schemaData}
            />

            {/* Custom Narrator Hero */}
            <section style={{
                position: 'relative',
                width: '100%',
                minHeight: '580px',
                padding: '8rem 1rem 7.5rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                backgroundColor: '#eae8da',
                marginBottom: '1.5rem',
                overflow: 'hidden'
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

                {/* Mask for Curved Bottom (Same as Home & Genre Hero) */}
                <div style={{
                    position: 'absolute',
                    bottom: -1.5,
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
                    {/* Clickable Narrator Hub Pill */}
                    <Link
                        to="/narrators/"
                        style={{
                            display: 'inline-block',
                            padding: '0.35rem 1.2rem',
                            backgroundColor: 'var(--color-brand-forrest)',
                            color: 'var(--color-brand-cloud)',
                            borderRadius: '2rem',
                            fontSize: '0.8rem',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            marginBottom: '3.25rem',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            textDecoration: 'none',
                            transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--color-brand-coral)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--color-brand-cloud)';
                        }}
                    >
                        Narrator Hub
                    </Link>

                    {/* H1 Headline */}
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                        color: 'var(--color-brand-forrest)',
                        marginBottom: '0.75rem',
                        lineHeight: 1.05,
                        fontWeight: 400,
                        opacity: 0.88
                    }}>
                        {narrator.name}
                    </h1>

                    {/* Divider */}
                    <div style={{
                        width: '50px',
                        height: '1px',
                        backgroundColor: 'var(--color-brand-forrest)',
                        margin: '1.25rem auto 1.5rem auto',
                        opacity: 0.6
                    }} />

                    {/* Bespoke 25-30 Word Overview */}
                    <p
                        className="narrator-hero-bio"
                        style={{
                            fontFamily: 'var(--font-serif-accent)',
                            fontSize: 'clamp(1.15rem, 2.2vw, 1.35rem)',
                            color: 'var(--color-brand-forrest)',
                            maxWidth: '640px',
                            margin: '0 auto',
                            lineHeight: 1.55,
                            opacity: 0.95
                        }}
                    >
                        {renderBioWithLinks(heroBioText)}
                    </p>

                    {/* Chevron */}
                    <div
                        onClick={scrollToContent}
                        style={{
                            marginTop: '2.75rem',
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

            {/* Main Narrator Dashboard & Books Container */}
            <div className="page-container" id="narrator-content" style={{ paddingTop: '2rem', overflow: 'visible' }}>

                {/* 1. Narrator Awards Section */}
                {earnedBadges.length > 0 && (
                    <section style={{ marginBottom: '4.75rem', textAlign: 'center' }}>
                        <h2 style={{
                            fontFamily: 'var(--font-serif-accent)',
                            fontStyle: 'italic',
                            fontWeight: 400,
                            fontSize: 'clamp(1.75rem, 3vw, 2.2rem)',
                            color: 'var(--color-brand-forrest)',
                            marginBottom: '0.85rem'
                        }}>
                            Narrator Awards
                        </h2>

                        {/* Divider under Narrator Awards */}
                        <div style={{
                            width: '50px',
                            height: '1px',
                            backgroundColor: 'var(--color-brand-forrest)',
                            margin: '0 auto 3rem auto',
                            opacity: 0.6
                        }} />

                        {/* Earned Shields Row */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            gap: '2.25rem',
                            flexWrap: 'wrap'
                        }}>
                            {earnedBadges.map((badge) => {
                                const isMarathon = badge.id.endsWith('-club');
                                const targetUrl = isMarathon ? '/narrators/leaderboard/' : `/narrator-styles/${badge.id}/`;

                                return (
                                    <Link
                                        key={badge.id}
                                        to={targetUrl}
                                        className="narrator-badge-item"
                                        tabIndex={0}
                                        aria-label={`${badge.name}: ${badge.tooltip}`}
                                        style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                    >
                                        <div className="narrator-badge-tooltip">
                                            <strong style={{ display: 'block', color: 'var(--color-brand-coral-light)', marginBottom: '0.2rem' }}>
                                                {badge.name}
                                            </strong>
                                            {badge.tooltip}
                                            <span style={{ display: 'block', marginTop: '0.4rem', fontSize: '0.7rem', opacity: 0.8, color: 'var(--color-brand-coral-light)' }}>
                                                {isMarathon ? 'Click to view Marathon Leaderboard →' : 'Click to explore this Vocal Style →'}
                                            </span>
                                        </div>
                                        <img
                                            src={badge.imageUrl}
                                            alt={badge.name}
                                            className="narrator-badge-shield"
                                            loading="eager"
                                        />
                                        <div style={{
                                            marginTop: '0.55rem',
                                            fontFamily: 'Inter, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '0.8rem',
                                            lineHeight: 1.25,
                                            color: 'var(--color-brand-forrest)',
                                            textAlign: 'center'
                                        }}>
                                            <div>{badge.labelLines[0]}</div>
                                            <div>{badge.labelLines[1]}</div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* 2. Top 3 Coral Action Pills Row */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1.15rem',
                    flexWrap: 'wrap',
                    marginBottom: '4rem'
                }}>
                    <button
                        type="button"
                        onClick={scrollToBooks}
                        className="narrator-coral-pill"
                        style={{
                            padding: '0.55rem 1.75rem',
                            fontSize: '1.02rem',
                            minWidth: '230px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        All {narrator.name} Books
                    </button>

                    <a
                        href={audibleUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="narrator-coral-pill"
                        style={{
                            padding: '0.55rem 1.75rem',
                            fontSize: '1.02rem',
                            minWidth: '230px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {narrator.name} on Audible
                        <img src="/audible-chevron.png" alt="" style={{ width: '19px', height: 'auto' }} />
                    </a>

                    {referenceUrl && (
                        <a
                            href={referenceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="narrator-coral-pill"
                            style={{
                                padding: '0.55rem 1.75rem',
                                fontSize: '1.02rem',
                                minWidth: '230px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {referenceLabel}
                        </a>
                    )}
                </div>

                {/* 3. The 8-Block Narrator Dashboard Grid */}
                <section className="narrator-dashboard-grid" aria-label={`${narrator.name} Listening Dashboard`}>

                    {/* Block 1: Total Hours of Narration */}
                    <div className="narrator-dashboard-card">
                        <h3 style={cardHeaderStyle}>
                            Total Hours<br />of Narration
                        </h3>

                        <div style={circleStyle}>
                            <span style={circleNumberStyle}>{roundedTotalHours}</span>
                            <span style={circleSubLabelStyle}>Hours!</span>
                        </div>

                        <p style={{
                            fontFamily: 'var(--font-serif-accent)',
                            fontStyle: 'italic',
                            fontSize: '0.9rem',
                            lineHeight: 1.38,
                            color: 'var(--color-brand-forrest)',
                            margin: 0
                        }}>
                            {totalDays >= 7 ? (
                                <>
                                    That’s <strong>{totalDays} days</strong><br />
                                    or <strong>{weeks} {weeks === 1 ? 'week' : 'weeks'} and {remDays} {remDays === 1 ? 'day' : 'days'}</strong><br />
                                    of continuous narration!
                                </>
                            ) : (
                                <>
                                    That’s <strong>{totalDays} full {totalDays === 1 ? 'day' : 'days'}</strong><br />
                                    (or <strong>{roundedTotalHours} one-hour commutes</strong>)<br />
                                    of continuous narration!
                                </>
                            )}
                        </p>
                    </div>

                    {/* Block 2: TLBC Book Count */}
                    <div className="narrator-dashboard-card">
                        <h3 style={cardHeaderStyle}>
                            TLBC<br />Book Count
                        </h3>

                        <div style={circleStyle}>
                            <span style={circleNumberStyle}>{narrator.bookCount}</span>
                            <span style={circleSubLabelStyle}>Epic Listens</span>
                        </div>

                        <button
                            type="button"
                            onClick={scrollToBooks}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                fontFamily: 'var(--font-serif-accent)',
                                fontStyle: 'italic',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                lineHeight: 1.38,
                                color: 'var(--color-brand-coral)',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}
                        >
                            Explore all {lastName}’s<br />
                            Audiobooks on TLBC
                        </button>
                    </div>

                    {/* Block 3: Longest Continuous Performance */}
                    <div className="narrator-dashboard-card">
                        <h3 style={cardHeaderStyle}>
                            Longest Continuous<br />Performance
                        </h3>

                        <div style={circleStyle}>
                            <span style={circleNumberStyle}>{longestBookHours}</span>
                            <span style={circleSubLabelStyle}>Hours</span>
                        </div>

                        <div style={{
                            fontFamily: 'var(--font-serif-accent)',
                            fontStyle: 'italic',
                            fontSize: '0.9rem',
                            lineHeight: 1.35,
                            color: 'var(--color-brand-forrest)'
                        }}>
                            <div>From:</div>
                            <Link
                                to={`/book/${longestBook.slug || longestBook.id}/`}
                                style={{
                                    color: 'var(--color-brand-coral)',
                                    fontWeight: 600,
                                    textDecoration: 'underline',
                                    display: 'inline-block'
                                }}
                            >
                                {longestBook.title}<br />
                                {longestBook.author}
                            </Link>
                        </div>
                    </div>

                    {/* Block 4: Genres Best Known for */}
                    <div className="narrator-dashboard-card">
                        <h3 style={cardHeaderStyle}>
                            Genres Best<br />Known for:
                        </h3>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.65rem',
                            width: '100%',
                            margin: 'auto 0',
                            padding: '0.25rem 0.25rem'
                        }}>
                            {topGenres.map((g) => (
                                <Link
                                    key={g}
                                    to={`/genre/${slugify(g)}/`}
                                    className="narrator-coral-pill"
                                    style={{
                                        padding: '0.42rem 0.85rem',
                                        fontSize: '0.95rem',
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.35rem'
                                    }}
                                >
                                    {g} <span style={{ fontStyle: 'normal', fontSize: '0.95em' }}>&rarr;</span>
                                </Link>
                            ))}
                        </div>

                        <div style={{ height: '4px' }} />
                    </div>

                    {/* Block 5: Vocal Hallmarks */}
                    <div className="narrator-dashboard-card">
                        <h3 style={cardHeaderStyle}>
                            Vocal Hallmarks
                        </h3>

                        <div style={{
                            fontFamily: 'var(--font-serif-accent)',
                            fontStyle: 'italic',
                            fontWeight: 400,
                            fontSize: 'clamp(1.85rem, 2.4vw, 2.15rem)',
                            lineHeight: 1.05,
                            letterSpacing: '-0.03em',
                            color: 'var(--color-brand-coral)',
                            margin: '0.35rem 0'
                        }}>
                            {vocalKeywords.map((line, i) => (
                                <div key={i}>{line}</div>
                            ))}
                        </div>

                        {/* Center Divider */}
                        <div style={{
                            width: '36px',
                            height: '1px',
                            backgroundColor: 'var(--color-brand-forrest)',
                            opacity: 0.45,
                            margin: '0.4rem auto'
                        }} />

                        <p style={{
                            fontFamily: 'var(--font-serif-accent)',
                            fontStyle: 'italic',
                            fontSize: '0.88rem',
                            lineHeight: 1.36,
                            color: 'var(--color-brand-forrest)',
                            margin: 0
                        }}>
                            {vocalSummary}
                        </p>
                    </div>

                    {/* Block 6: From TLBC Review Archive */}
                    <div className="narrator-dashboard-card">
                        <h3 style={cardHeaderStyle}>
                            From TLBC<br />Review Archive
                        </h3>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            margin: '0.15rem 0'
                        }}>
                            <span
                                aria-hidden="true"
                                style={{
                                    fontFamily: 'Georgia, var(--font-serif-accent)',
                                    fontWeight: 700,
                                    fontSize: '2.9rem',
                                    lineHeight: 0.55,
                                    color: 'var(--color-brand-coral)',
                                    alignSelf: 'flex-start',
                                    marginLeft: '0.15rem',
                                    marginBottom: '0.2rem'
                                }}
                            >
                                &ldquo;
                            </span>

                            <p style={{
                                fontFamily: 'var(--font-serif-accent)',
                                fontStyle: 'italic',
                                fontSize: '1.1rem',
                                lineHeight: 1.34,
                                color: 'var(--color-brand-forrest)',
                                margin: 0,
                                padding: '0 0.25rem'
                            }}>
                                {archiveQuote.quote}
                            </p>

                            <span
                                aria-hidden="true"
                                style={{
                                    fontFamily: 'Georgia, var(--font-serif-accent)',
                                    fontWeight: 700,
                                    fontSize: '2.9rem',
                                    lineHeight: 0.35,
                                    color: 'var(--color-brand-coral)',
                                    alignSelf: 'flex-end',
                                    marginRight: '0.15rem',
                                    marginTop: '0.45rem'
                                }}
                            >
                                &rdquo;
                            </span>
                        </div>

                        <div style={{
                            fontFamily: 'var(--font-serif-accent)',
                            fontStyle: 'italic',
                            fontSize: '0.88rem',
                            lineHeight: 1.35,
                            color: 'var(--color-brand-forrest)'
                        }}>
                            <div>From:</div>
                            <Link
                                to={`/book/${archiveQuote.bookSlug}/`}
                                style={{
                                    color: 'var(--color-brand-coral)',
                                    fontWeight: 600,
                                    textDecoration: 'underline'
                                }}
                            >
                                {archiveQuote.bookTitle}
                            </Link>
                        </div>
                    </div>

                    {/* Block 7: Narrator Soundcheck */}
                    <div className="narrator-dashboard-card">
                        <h3 style={cardHeaderStyle}>
                            Narrator<br />Soundcheck
                        </h3>

                        <p style={{
                            fontFamily: 'var(--font-serif-accent)',
                            fontStyle: 'italic',
                            fontSize: '0.88rem',
                            lineHeight: 1.35,
                            color: 'var(--color-brand-forrest)',
                            margin: '0.25rem 0'
                        }}>
                            Listen to a sample of<br />
                            {narrator.name}’s<br />
                            vocal artistry
                        </p>

                        <div style={{ width: '100%', padding: '0.25rem 0' }}>
                            {soundcheckBook.audioPreviewUrl ? (
                                <AudioPlayer src={soundcheckBook.audioPreviewUrl} compact={true} />
                            ) : (
                                <Link
                                    to={`/book/${soundcheckBook.slug || soundcheckBook.id}/`}
                                    className="narrator-coral-pill"
                                    style={{
                                        display: 'inline-block',
                                        padding: '0.5rem 1rem',
                                        fontSize: '0.9rem',
                                        width: '100%'
                                    }}
                                >
                                    Read Soundcheck &rarr;
                                </Link>
                            )}
                        </div>

                        <div style={{
                            fontFamily: 'var(--font-serif-accent)',
                            fontStyle: 'italic',
                            fontSize: '0.88rem',
                            lineHeight: 1.35,
                            color: 'var(--color-brand-forrest)'
                        }}>
                            <div>From:</div>
                            <Link
                                to={`/book/${soundcheckBook.slug || soundcheckBook.id}/`}
                                style={{
                                    color: 'var(--color-brand-coral)',
                                    fontWeight: 600,
                                    textDecoration: 'underline',
                                    display: 'inline-block'
                                }}
                            >
                                {soundcheckBook.title}<br />
                                {soundcheckBook.author}
                            </Link>
                        </div>
                    </div>

                    {/* Block 8: Top Narrator Audio Books */}
                    <div className="narrator-dashboard-card">
                        <h3 style={cardHeaderStyle}>
                            Top {narrator.name}<br />Audio Books
                        </h3>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: topThreeBooks.length <= 2 ? '0.9rem' : '0.65rem',
                            margin: 'auto 0',
                            width: '100%'
                        }}>
                            {topThreeBooks.map((b) => (
                                <div key={b.id}>
                                    <Link
                                        to={`/book/${b.slug || b.id}/`}
                                        style={{
                                            fontFamily: 'var(--font-serif-accent)',
                                            fontStyle: 'italic',
                                            fontWeight: 600,
                                            fontSize: '0.92rem',
                                            lineHeight: 1.25,
                                            color: 'var(--color-brand-coral)',
                                            textDecoration: 'underline',
                                            display: 'inline-block'
                                        }}
                                    >
                                        {b.title}
                                    </Link>
                                    {topThreeBooks.length <= 2 && (
                                        <div style={{
                                            fontFamily: 'var(--font-serif-accent)',
                                            fontStyle: 'italic',
                                            fontSize: '0.8rem',
                                            color: 'var(--color-brand-forrest)',
                                            opacity: 0.85,
                                            marginTop: '0.1rem'
                                        }}>
                                            {b.author}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <a
                            href={audibleUrl}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="narrator-coral-pill"
                            style={{
                                padding: '0.45rem 1rem',
                                fontSize: '0.88rem',
                                lineHeight: 1.2,
                                width: '100%',
                                display: 'inline-flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: '0.5rem'
                            }}
                        >
                            <span>{narrator.name}</span>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                                on Audible
                                <img src="/audible-chevron.png" alt="" style={{ width: '15px', height: 'auto' }} />
                            </span>
                        </a>
                    </div>

                </section>

                {/* 4. Listed Books Grid */}
                <div id="narrator-books" style={{ scrollMarginTop: '2rem', textAlign: 'center' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-serif-accent)',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: 'clamp(1.75rem, 3vw, 2.2rem)',
                        color: 'var(--color-brand-forrest)',
                        marginBottom: '0.85rem'
                    }}>
                        All TLBC {narrator.name} Narrations
                    </h2>

                    {/* Divider under All Narrations Heading */}
                    <div style={{
                        width: '50px',
                        height: '1px',
                        backgroundColor: 'var(--color-brand-forrest)',
                        margin: '0 auto 2.5rem auto',
                        opacity: 0.6
                    }} />

                    <div style={{ textAlign: 'left' }}>
                        <BookGrid books={narrator.books} />
                    </div>
                </div>
            </div>
        </div>
    );
};
