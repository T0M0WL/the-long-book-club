import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';
import { collections, type Collection } from '../data/collections';
import { books, type Book } from '../data/books';
import { getRoundedHours } from '../utils/formatLength';
import { slugify } from '../utils/slugify';

interface ArchOverlayMeta {
    blankArchUrl: string;
    iconSvg: string;
    iconColor: string;
    collectionNumber: string;
    shortHeadline: string;
}

// Complete overlay metadata for all 18 collections (including 001–007)
// so every collection can render with a 180-degree flipped bookmark arch
// while keeping its icon, "LBC CURATED COLLECTION", and number right-side up.
const COLLECTION_ARCH_META: Record<string, ArchOverlayMeta> = {
    'cozy-crime': {
        blankArchUrl: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Sage-Green.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/cozy-crime-icon.svg',
        iconColor: '#2c5143',
        collectionNumber: '018',
        shortHeadline: 'The Best Long Cozy Crime & Village Mystery Audiobooks for Armchair Detectives.'
    },
    'time-travel': {
        blankArchUrl: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Purple.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/time-travel-icon.svg',
        iconColor: '#bba08f',
        collectionNumber: '017',
        shortHeadline: 'The Best Long Time Travel, Time Loops & Alternate History Audiobooks.'
    },
    'silkpunk': {
        blankArchUrl: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Green.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/silkpunk-icon.svg',
        iconColor: '#ed835e',
        collectionNumber: '016',
        shortHeadline: 'The Best Long Silkpunk & East Asian Fantasy Audiobooks.'
    },
    'british-espionage': {
        blankArchUrl: '/assets/Collections-Cards-Gfx/Collection-Card-Top-DarkGrey.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/british-espionage-icon.svg',
        iconColor: '#e56a4e',
        collectionNumber: '015',
        shortHeadline: 'The Best Long British Espionage & Cold War Thriller Audiobooks.'
    },
    'space-opera': {
        blankArchUrl: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Coral-Red.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/space-opera-icon.svg',
        iconColor: '#c0c39a',
        collectionNumber: '014',
        shortHeadline: 'The Best Long Space Opera & Galactic Empire Audiobooks.'
    },
    'mythology-epics': {
        blankArchUrl: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Sage-Green.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/mythology-icon.svg',
        iconColor: '#2c5143',
        collectionNumber: '013',
        shortHeadline: 'The Best Long Mythological Retellings & Ancient Epics.'
    },
    'cozy-fantasy': {
        blankArchUrl: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Purple.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/cozy-fantasy-icon.svg',
        iconColor: '#bba08f',
        collectionNumber: '012',
        shortHeadline: 'The Best Long Cozy Fantasy & Slice of Life Audiobooks.'
    },
    'grimdark-fantasy': {
        blankArchUrl: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Green.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/grimdark-fantasy-icon.svg',
        iconColor: '#ed835e',
        collectionNumber: '011',
        shortHeadline: 'The Best Long Grimdark Fantasy Audiobooks: Blood & Moral Ambiguity.'
    },
    'nordic-noir': {
        blankArchUrl: '/assets/Collections-Cards-Gfx/Collection-Card-Top-DarkGrey.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/nordic-noir-icon.svg',
        iconColor: '#e56a4e',
        collectionNumber: '010',
        shortHeadline: 'The Best Long Nordic Noir & Scandi Crime Audiobooks.'
    },
    'litrpg-gamelit': {
        blankArchUrl: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Coral-Red.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/litrpg-icon.svg',
        iconColor: '#c0c39a',
        collectionNumber: '009',
        shortHeadline: 'The Best Long LitRPG & Progression Fantasy Audiobooks.'
    },
    'magical-realism': {
        blankArchUrl: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Sage-Green.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/magical-realism-icon.svg',
        iconColor: '#2c5143',
        collectionNumber: '008',
        shortHeadline: 'The Best Long Magical Realism Audiobooks: Surreal Dreams.'
    },
    'graphic-audio': {
        blankArchUrl: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Purple.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/best-cinematic-icon.svg',
        iconColor: '#bba08f',
        collectionNumber: '007',
        shortHeadline: 'The Best, Longest Cinematic Full-Cast Audiobook Productions.'
    },
    'bucket-list': {
        blankArchUrl: '/assets/Collections-Cards-Gfx/Collection-Card-Top-DarkGrey.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/bucket-list-icon.svg',
        iconColor: '#c0c39a',
        collectionNumber: '006',
        shortHeadline: 'Bucket List Classic Long Listens Made Effortless in Audio.'
    },
    'long-life-stories': {
        blankArchUrl: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Green.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/long-life-stories.svg',
        iconColor: '#c0c39a',
        collectionNumber: '005',
        shortHeadline: 'Long Life Stories: The Definitive Biography Audiobooks.'
    },
    'longest-ever': {
        blankArchUrl: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Sage-Green.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/best-longest-ever-audiobooks.svg',
        iconColor: '#2c5143',
        collectionNumber: '004',
        shortHeadline: 'The Longest Ever Audiobooks (60 to 200+ Hours) for Maximum Credit Value.'
    },
    'romantasy': {
        blankArchUrl: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Coral-Red.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/best-long-romantasy.svg',
        iconColor: '#c0c39a',
        collectionNumber: '003',
        shortHeadline: 'Epic Romantasy Long Audiobook Listens: High Magic & Scorching Stakes.'
    },
    'dark-academia': {
        blankArchUrl: '/assets/Collections-Cards-Gfx/Collection-Card-Top-DarkGrey.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/Best-long-dark-academia-icon.svg',
        iconColor: '#e56a4e',
        collectionNumber: '002',
        shortHeadline: 'Long, Atmospheric Dark Academia & Collegiate Gothic Audiobooks.'
    },
    'best-long-books-2025': {
        blankArchUrl: '/assets/Collections-Cards-Gfx/Collection-Card-Top-Green.gif',
        iconSvg: '/assets/collections-hero-images/Collections Icons SVGs/best-of-2025-icon.svg',
        iconColor: '#ed835e',
        collectionNumber: '001',
        shortHeadline: 'The Standout Critically Acclaimed Long Audiobooks from 2025.'
    }
};

const CLASSIC_PILLAR_COLLECTION_SLUGS = [
    'cozy-crime',
    'british-espionage',
    'nordic-noir',
    'long-life-stories',
    'bucket-list',
    'longest-ever',
    'best-long-books-2025'
];

const MICRO_GENRE_COLLECTION_SLUGS = [
    'cozy-fantasy',
    'time-travel',
    'silkpunk',
    'grimdark-fantasy',
    'litrpg-gamelit',
    'space-opera',
    'mythology-epics',
    'magical-realism',
    'graphic-audio',
    'dark-academia',
    'romantasy'
];

// Helper to compute total listening hours for a collection or genre
const getCollectionTotalHours = (slug: string): number => {
    const col = collections.find(c => c.slug === slug);
    if (!col) return 150;
    const total = col.bookIds.reduce((sum, id) => {
        const b = books.find(book => book.id === id);
        return sum + (b?.lengthHours || 0);
    }, 0);
    return Math.round(total);
};

const getGenreTotalHours = (genreSlug: string): number => {
    const matching = books.filter(b => {
        const list = Array.isArray(b.genre) ? b.genre : [b.genre];
        return list.some(g => slugify(g) === genreSlug);
    });
    const total = matching.reduce((sum, b) => sum + (b.lengthHours || 0), 0);
    return Math.round(total);
};

// Formats narrator lists to max 2 names, appending "(+ more)" for ensemble/cast audiobooks
const formatNarratorList = (raw?: string): string => {
    if (!raw) return '';
    const hasFullCast = /full cast/i.test(raw);

    // Clean out parenthetical qualifiers
    const text = raw.replace(/\((UK|US|Unabridged|GraphicAudio|Anniversary[^\)]*)\)/gi, '').trim();

    // Split by comma, slash, '&', or ' and '
    const parts = text
        .split(/,|\/|\band\b|&/i)
        .map(p => p.trim().replace(/\bet al\.?\b/gi, '').replace(/^[,\s]+|[,\s]+$/g, ''))
        .filter(p => p.length > 1);

    if (parts.length === 0) {
        return hasFullCast ? 'Full Cast' : raw.trim();
    }

    if (parts.length <= 2) {
        return parts.join(', ');
    }

    return `${parts.slice(0, 2).join(', ')} (+ more)`;
};

interface FlippedCollectionArchProps {
    collection: Collection;
}

const FlippedCollectionArch: React.FC<FlippedCollectionArchProps> = ({ collection }) => {
    const meta = COLLECTION_ARCH_META[collection.slug] || {
        blankArchUrl: collection.topGraphic || '/assets/Collections-Cards-Gfx/Collection-Card-Top-Sage-Green.gif',
        iconSvg: collection.iconSvg || '/assets/collections-hero-images/Collections Icons SVGs/cozy-crime-icon.svg',
        iconColor: collection.iconColor || '#2c5143',
        collectionNumber: collection.collectionNumber || '018',
        shortHeadline: collection.title
    };

    return (
        <div
            className="two-worlds-bookmark-arch"
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '340px',
                margin: '0 auto 1.6rem auto'
            }}
        >
            {/* Background Arch Flipped 180 Degrees (Pointing Downward) */}
            <img
                src={meta.blankArchUrl}
                alt={collection.title}
                style={{
                    width: '100%',
                    display: 'block',
                    transform: 'rotate(180deg)'
                }}
            />

            {/* Right-Side Up Top-Left Stamp: LBC CURATED COLLECTION */}
            <div
                style={{
                    position: 'absolute',
                    top: '9%',
                    left: '5.5%',
                    color: meta.iconColor,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(0.62rem, 1vw, 0.76rem)',
                    lineHeight: 1.05,
                    letterSpacing: '0.03em',
                    textAlign: 'left',
                    textTransform: 'uppercase',
                    pointerEvents: 'none'
                }}
            >
                LBC<br />CURATED<br />COLLECTION
            </div>

            {/* Right-Side Up Top-Right Stamp: Open Book Icon + Collection Number */}
            <div
                style={{
                    position: 'absolute',
                    top: '9%',
                    right: '5.5%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    pointerEvents: 'none'
                }}
            >
                <div
                    style={{
                        width: '26px',
                        height: '27px',
                        backgroundColor: meta.iconColor,
                        maskImage: 'url("/assets/Collections-Cards-Gfx/NUMBER-BOOK-ICON.svg")',
                        WebkitMaskImage: 'url("/assets/Collections-Cards-Gfx/NUMBER-BOOK-ICON.svg")',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center'
                    }}
                />
                <span
                    style={{
                        color: meta.iconColor,
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 800,
                        fontSize: 'clamp(0.78rem, 1.15vw, 0.92rem)',
                        lineHeight: 1,
                        letterSpacing: '0.02em'
                    }}
                >
                    {meta.collectionNumber}
                </span>
            </div>

            {/* Right-Side Up Center Collection Icon */}
            <div
                style={{
                    position: 'absolute',
                    top: '44%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '26%',
                    height: '38%',
                    backgroundColor: meta.iconColor,
                    maskImage: `url("${meta.iconSvg}")`,
                    WebkitMaskImage: `url("${meta.iconSvg}")`,
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                    pointerEvents: 'none'
                }}
            />
        </div>
    );
};

interface FeatureRowProps {
    mainTitleLine1: string;
    mainTitleLine2: string;
    subHeadline: string;
    description: string;
    links: { label: string; hours: number; path: string }[];
    themeColor: string;
    pillCollectionLabel: string;
    pillBookLabel: string;
    featuredCollection: Collection;
    featuredBook: Book;
}

const FeatureRow: React.FC<FeatureRowProps> = ({
    mainTitleLine1,
    mainTitleLine2,
    subHeadline,
    description,
    links,
    themeColor,
    pillCollectionLabel,
    pillBookLabel,
    featuredCollection,
    featuredBook
}) => {
    const archMeta = COLLECTION_ARCH_META[featuredCollection.slug];
    const collectionDisplayHeadline = archMeta?.shortHeadline || featuredCollection.title;

    return (
        <div className="two-worlds-grid">
            {/* COLUMN 1: Editorial Typography & Curated Deep Links */}
            <div className="two-worlds-col two-worlds-col-left">
                <h2
                    style={{
                        fontFamily: 'var(--font-serif-accent), Lora, Georgia, serif',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: 'clamp(3.6rem, 5.2vw, 5.1rem)',
                        lineHeight: 0.88,
                        letterSpacing: '-0.04em',
                        color: themeColor,
                        margin: '0 0 0.55rem 0'
                    }}
                >
                    {mainTitleLine1}
                    <br />
                    {mainTitleLine2}
                </h2>

                <div
                    style={{
                        fontFamily: 'var(--font-serif-accent), Lora, Georgia, serif',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: 'clamp(1.45rem, 2vw, 1.85rem)',
                        lineHeight: 1.15,
                        letterSpacing: '-0.025em',
                        color: themeColor,
                        marginBottom: '1.35rem'
                    }}
                >
                    {subHeadline}
                </div>

                <p
                    style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        fontSize: '0.92rem',
                        lineHeight: 1.5,
                        color: themeColor,
                        margin: '0 0 2rem 0',
                        maxWidth: '330px'
                    }}
                    className="two-worlds-desc"
                >
                    {description}
                </p>

                {/* 50px Hairline Divider */}
                <div
                    className="two-worlds-col1-rule"
                    style={{
                        width: '50px',
                        height: '1px',
                        backgroundColor: themeColor,
                        opacity: 0.4,
                        marginBottom: '2rem'
                    }}
                />

                <h3
                    style={{
                        fontFamily: 'var(--font-serif-accent), Lora, Georgia, serif',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: 'clamp(1.45rem, 2vw, 1.85rem)',
                        lineHeight: 1.15,
                        letterSpacing: '-0.025em',
                        color: themeColor,
                        margin: '0 0 0.55rem 0'
                    }}
                >
                    Curated Collections:
                </h3>

                <ul
                    style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.15rem'
                    }}
                >
                    {links.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className="two-worlds-deep-link"
                                style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '0.84rem',
                                    lineHeight: 1.3,
                                    color: themeColor,
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'baseline',
                                    gap: '0.35rem',
                                    transition: 'transform 0.2s ease, opacity 0.2s ease'
                                }}
                            >
                                <span style={{ fontWeight: 700 }}>• {item.label}</span>
                                <span style={{ fontWeight: 400, opacity: 0.9 }}>({item.hours} Hours)</span>
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link
                            to="/collections/"
                            className="two-worlds-deep-link"
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.84rem',
                                lineHeight: 1.3,
                                color: themeColor,
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'baseline',
                                gap: '0.35rem',
                                transition: 'transform 0.2s ease, opacity 0.2s ease',
                                marginTop: '0.15rem'
                            }}
                        >
                            <span style={{ fontWeight: 700 }}>• VIEW ALL COLLECTIONS &rarr;</span>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Hairline Vertical Divider 1 */}
            <div
                className="two-worlds-divider"
                style={{
                    width: '1px',
                    backgroundColor: themeColor,
                    opacity: 0.3,
                    alignSelf: 'stretch'
                }}
            />

            {/* COLUMN 2: Featured Collection with 180-deg Flipped Bookmark Arch */}
            <div className="two-worlds-col two-worlds-col-center">
                <div
                    style={{
                        backgroundColor: themeColor,
                        color: '#ffffff',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        padding: '0.38rem 1.15rem',
                        borderRadius: '9999px',
                        marginBottom: '1.75rem',
                        display: 'inline-block',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {pillCollectionLabel}
                </div>

                <Link
                    to={`/collections/${featuredCollection.slug}/`}
                    style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        flex: 1
                    }}
                    className="two-worlds-collection-link"
                >
                    <FlippedCollectionArch collection={featuredCollection} />

                    <h3
                        style={{
                            fontFamily: 'var(--font-serif-accent), Lora, Georgia, serif',
                            fontStyle: 'italic',
                            fontWeight: 400,
                            fontSize: 'clamp(1.45rem, 1.95vw, 1.75rem)',
                            lineHeight: 1.25,
                            letterSpacing: '-0.025em',
                            color: themeColor,
                            textAlign: 'center',
                            margin: '0 auto 2.25rem auto',
                            maxWidth: '250px'
                        }}
                    >
                        {collectionDisplayHeadline}
                    </h3>

                    <div
                        className="two-worlds-cta-btn"
                        style={{
                            marginTop: 'auto',
                            backgroundColor: themeColor,
                            color: '#ffffff',
                            fontFamily: 'var(--font-serif-accent), Lora, Georgia, serif',
                            fontStyle: 'italic',
                            fontSize: '1.15rem',
                            fontWeight: 400,
                            padding: '0.65rem 2.2rem',
                            borderRadius: '9999px',
                            transition: 'transform 0.2s ease, filter 0.2s ease',
                            display: 'inline-block',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        View Collection &rarr;
                    </div>
                </Link>
            </div>

            {/* Hairline Vertical Divider 2 */}
            <div
                className="two-worlds-divider"
                style={{
                    width: '1px',
                    backgroundColor: themeColor,
                    opacity: 0.3,
                    alignSelf: 'stretch'
                }}
            />

            {/* COLUMN 3: Featured Audiobook Packshot + Overlapping Hours Badge */}
            <div className="two-worlds-col two-worlds-col-right">
                <div
                    style={{
                        backgroundColor: themeColor,
                        color: '#ffffff',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        padding: '0.38rem 1.15rem',
                        borderRadius: '9999px',
                        marginBottom: '1.75rem',
                        display: 'inline-block',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {pillBookLabel}
                </div>

                <Link
                    to={`/book/${featuredBook.slug || featuredBook.id}/`}
                    aria-label={`Read review and Soundcheck for ${featuredBook.title} by ${featuredBook.author}`}
                    style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        flex: 1
                    }}
                    className="two-worlds-book-link"
                >
                    {/* Packshot Container with Half-Overlapping Runtime Badge */}
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '276px',
                            aspectRatio: '1 / 1',
                            margin: '0 auto 4.75rem auto'
                        }}
                    >
                        <img
                            src={featuredBook.coverUrl}
                            alt={featuredBook.title}
                            loading="lazy"
                            className="two-worlds-book-cover"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                                transition: 'transform 0.25s ease'
                            }}
                        />

                        {/* Overlapping Runtime Circle Badge */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: '50%',
                                transform: 'translate(-50%, 50%)',
                                width: '96px',
                                height: '96px',
                                backgroundColor: '#3f5a49',
                                border: '7px solid var(--color-brand-coral)',
                                borderRadius: '50%',
                                color: 'var(--color-brand-cloud)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.16)',
                                zIndex: 2,
                                lineHeight: 1
                            }}
                        >
                            <FaClock size={12} style={{ opacity: 0.9, marginBottom: '3px' }} />
                            <span
                                style={{
                                    fontSize: '1.9rem',
                                    fontWeight: 400,
                                    fontFamily: 'var(--font-serif-accent), Lora, Georgia, serif',
                                    letterSpacing: '-0.03em',
                                    lineHeight: 0.9
                                }}
                            >
                                {getRoundedHours(featuredBook.length)}
                            </span>
                            <span
                                style={{
                                    fontSize: '0.72rem',
                                    fontWeight: 500,
                                    fontFamily: 'Inter, sans-serif',
                                    opacity: 0.9,
                                    marginTop: '2px'
                                }}
                            >
                                hours
                            </span>
                        </div>
                    </div>

                    {/* Book Metadata Block (Author & Narrator) */}
                    <div
                        style={{
                            textAlign: 'center',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.86rem',
                            lineHeight: 1.5,
                            color: themeColor,
                            maxWidth: '280px',
                            marginBottom: '1.35rem'
                        }}
                    >
                        <div>
                            Author: <span style={{ fontWeight: 600 }}>{featuredBook.author}</span>
                        </div>
                        {featuredBook.narrator && (
                            <div>
                                Narrator: <span style={{ fontWeight: 600 }}>{formatNarratorList(featuredBook.narrator)}</span>
                            </div>
                        )}
                    </div>

                    <div
                        className="two-worlds-cta-btn"
                        style={{
                            marginTop: 'auto',
                            backgroundColor: themeColor,
                            color: '#ffffff',
                            fontFamily: 'var(--font-serif-accent), Lora, Georgia, serif',
                            fontStyle: 'italic',
                            fontSize: '1.15rem',
                            fontWeight: 400,
                            padding: '0.65rem 1.85rem',
                            borderRadius: '9999px',
                            transition: 'transform 0.2s ease, filter 0.2s ease',
                            display: 'inline-block',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Read Review &amp; Soundcheck &rarr;
                    </div>
                </Link>
            </div>
        </div>
    );
};

export const TwoWorldsFeature: React.FC = () => {
    const classicGreen = '#54755b';
    const microCoral = 'var(--color-brand-coral)';

    // Dynamically compute hours for the 4 Classic Pillars links & 4 Micro Genres links
    const { classicLinks, microLinks } = useMemo(() => {
        return {
            classicLinks: [
                {
                    label: 'British Espionage & Cold War',
                    hours: getCollectionTotalHours('british-espionage'),
                    path: '/collections/british-espionage/'
                },
                {
                    label: 'Cozy Crime & Village Mystery',
                    hours: getCollectionTotalHours('cozy-crime'),
                    path: '/collections/cozy-crime/'
                },
                {
                    label: 'Historical Fiction Sagas',
                    hours: getGenreTotalHours('historical-fiction'),
                    path: '/genre/historical-fiction/'
                },
                {
                    label: 'Definitive Biographies & History',
                    hours: getCollectionTotalHours('long-life-stories'),
                    path: '/collections/long-life-stories/'
                }
            ],
            microLinks: [
                {
                    label: 'Time Loops & Temporal Epics',
                    hours: getCollectionTotalHours('time-travel'),
                    path: '/collections/time-travel/'
                },
                {
                    label: 'Silkpunk & East Asian Fantasy',
                    hours: getCollectionTotalHours('silkpunk'),
                    path: '/collections/silkpunk/'
                },
                {
                    label: 'Grimdark & Moral Ambiguity',
                    hours: getCollectionTotalHours('grimdark-fantasy'),
                    path: '/collections/grimdark-fantasy/'
                },
                {
                    label: 'LitRPG & Progression Fantasy',
                    hours: getCollectionTotalHours('litrpg-gamelit'),
                    path: '/collections/litrpg-gamelit/'
                }
            ]
        };
    }, []);

    // Select a random Classic Pillar collection & book, and a random Micro Genre collection & book on mount
    const {
        featuredClassicCollection,
        featuredClassicBook,
        featuredMicroCollection,
        featuredMicroBook
    } = useMemo(() => {
        const classicCols = collections.filter(c => CLASSIC_PILLAR_COLLECTION_SLUGS.includes(c.slug));
        const microCols = collections.filter(c => MICRO_GENRE_COLLECTION_SLUGS.includes(c.slug));

        const chosenClassicCol =
            classicCols[Math.floor(Math.random() * classicCols.length)] || collections[0];
        const chosenMicroCol =
            microCols[Math.floor(Math.random() * microCols.length)] || collections[1];

        // Collect all book IDs belonging to Classic Pillar collections
        const classicBookIds = new Set<string>();
        classicCols.forEach(c => c.bookIds.forEach(id => classicBookIds.add(id)));
        const classicBooksPool = books.filter(b => classicBookIds.has(b.id) && b.coverUrl);

        // Collect all book IDs belonging to Micro Genre collections
        const microBookIds = new Set<string>();
        microCols.forEach(c => c.bookIds.forEach(id => microBookIds.add(id)));
        const microBooksPool = books.filter(b => microBookIds.has(b.id) && b.coverUrl);

        const chosenClassicBook =
            classicBooksPool[Math.floor(Math.random() * classicBooksPool.length)] || books[0];
        const chosenMicroBook =
            microBooksPool[Math.floor(Math.random() * microBooksPool.length)] || books[1];

        return {
            featuredClassicCollection: chosenClassicCol,
            featuredClassicBook: chosenClassicBook,
            featuredMicroCollection: chosenMicroCol,
            featuredMicroBook: chosenMicroBook
        };
    }, []);

    return (
        <section
            aria-label="Classic Pillars and Micro Genres"
            style={{
                width: '100%',
                maxWidth: '1240px',
                margin: '1.5rem auto 7rem auto',
                padding: '0 clamp(1.5rem, 4vw, 3rem)',
                boxSizing: 'border-box'
            }}
        >
            <style>{`
                .two-worlds-grid {
                    display: grid;
                    grid-template-columns: 1fr 1px 1fr 1px 1fr;
                    align-items: stretch;
                    width: 100%;
                }
                .two-worlds-col {
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    padding: 0.5rem clamp(1.5rem, 3vw, 3rem);
                }
                .two-worlds-col-left {
                    align-items: flex-start;
                    text-align: left;
                    padding-left: 0;
                }
                .two-worlds-col-center {
                    align-items: center;
                    text-align: center;
                }
                .two-worlds-col-right {
                    align-items: center;
                    text-align: center;
                    padding-right: 0;
                }
                .two-worlds-deep-link:hover {
                    transform: translateX(4px);
                    opacity: 0.85;
                }
                .two-worlds-collection-link:hover .two-worlds-cta-btn,
                .two-worlds-book-link:hover .two-worlds-cta-btn {
                    transform: scale(1.04);
                    filter: brightness(0.9);
                }
                .two-worlds-book-link:hover .two-worlds-book-cover {
                    transform: scale(1.03);
                }
                .two-worlds-section-Rule {
                    width: 100%;
                    height: 1px;
                    background-color: rgba(84, 117, 91, 0.22);
                    margin: 5.5rem 0;
                }

                @media (max-width: 960px) {
                    .two-worlds-grid {
                        grid-template-columns: 1fr;
                        gap: 0;
                    }
                    .two-worlds-col {
                        padding: 0 1.25rem !important;
                        align-items: center !important;
                        text-align: center !important;
                    }
                    .two-worlds-desc,
                    .two-worlds-col1-rule {
                        margin-left: auto !important;
                        margin-right: auto !important;
                    }
                    .two-worlds-divider {
                        width: 65% !important;
                        height: 1px !important;
                        margin: 3rem auto !important;
                    }
                    /* Hide the Column 2 bookmark arch graphic on mobile to save vertical space */
                    .two-worlds-bookmark-arch {
                        display: none !important;
                    }
                    .two-worlds-section-Rule {
                        margin: 4rem auto !important;
                        width: 85% !important;
                    }
                }
            `}</style>

            {/* 1. CLASSIC PILLARS & HEAVY HITTERS (#54755b Theme) */}
            <FeatureRow
                mainTitleLine1="Classic"
                mainTitleLine2="Pillars"
                subHeadline="& Heavy Hitters"
                description="Curated Collections of the best long audiobooks from well-loved genres and established authors and narrators."
                links={classicLinks}
                themeColor={classicGreen}
                pillCollectionLabel="FEATURED PILLAR COLLECTION"
                pillBookLabel="FEATURED PILLAR AUDIOBOOK"
                featuredCollection={featuredClassicCollection}
                featuredBook={featuredClassicBook}
            />

            {/* Horizontal Section Divider Between the Two Worlds */}
            <div className="two-worlds-section-Rule" />

            {/* 2. MICRO GENRES & TRENDING NICHES (Coral Theme) */}
            <FeatureRow
                mainTitleLine1="Micro"
                mainTitleLine2="Genres"
                subHeadline="& Trending Niches"
                description="Curated Collections of Trending Niches, Modern Moods and Cult Subgenre Long Audiobooks."
                links={microLinks}
                themeColor={microCoral}
                pillCollectionLabel="FEATURED NICHE COLLECTION"
                pillBookLabel="FEATURED NICHE AUDIOBOOK"
                featuredCollection={featuredMicroCollection}
                featuredBook={featuredMicroBook}
            />
        </section>
    );
};
