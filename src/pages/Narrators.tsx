import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { books } from '../data/books';
import { CreatorCard } from '../components/CreatorCard';
import { LeaderboardPromoCard } from '../components/LeaderboardPromoCard';
import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { getNarratorStats } from '../utils/creatorUtils';
import { useSetHeaderTheme } from '../context/HeaderContext';
import { NarratorFilterBar, type NarratorSortOption } from '../components/NarratorFilterBar';
import {
    NARRATOR_BADGES,
    getNarratorVocalStyles,
    type NarratorStyleBadgeId
} from '../data/narratorData';

const STYLE_BADGE_IDS: NarratorStyleBadgeId[] = [
    'character-chameleon',
    'dialect-immersion',
    'dual-pov-synergy',
    'fireside-warmth',
    'historical-gravitas',
    'propulsive-momentum',
    'satirical-bite'
];

export const Narrators: React.FC = () => {
    useSetHeaderTheme({
        logoColor: 'var(--color-brand-cloud)',
        textColor: 'var(--color-brand-cloud)',
        hamburgerColor: 'var(--color-brand-cloud)',
        activeLink: 'narrators',
        activeLinkBg: 'var(--color-brand-cloud)',
        activeLinkText: 'var(--color-brand-coral)'
    });

    const [searchParams, setSearchParams] = useSearchParams();

    const searchTerm = searchParams.get('q') || '';
    const selectedStyle = searchParams.get('style') || 'All';
    const selectedGenre = searchParams.get('genre') || 'All';
    const sortBy = (searchParams.get('sort') as NarratorSortOption) || 'default';

    const updateParams = (key: string, value: string) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            if (!value || value === 'All' || value === 'default') {
                next.delete(key);
            } else {
                next.set(key, value);
            }
            return next;
        }, { replace: true });
    };

    const handleClearAll = () => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            next.delete('q');
            next.delete('style');
            next.delete('genre');
            next.delete('sort');
            return next;
        }, { replace: true });
    };

    const allNarrators = useMemo(() => getNarratorStats(books, 1), []);

    // Compute dynamic Vocal Style options with counts
    const styleOptions = useMemo(() => {
        const counts = new Map<NarratorStyleBadgeId, number>();
        STYLE_BADGE_IDS.forEach(id => counts.set(id, 0));

        allNarrators.forEach(narrator => {
            const badges = getNarratorVocalStyles(narrator.name, narrator.books);
            badges.forEach(b => {
                if (counts.has(b)) {
                    counts.set(b, (counts.get(b) || 0) + 1);
                }
            });
        });

        return STYLE_BADGE_IDS.map(id => ({
            id,
            name: NARRATOR_BADGES[id]?.name || id,
            count: counts.get(id) || 0
        })).sort((a, b) => a.name.localeCompare(b.name));
    }, [allNarrators]);

    // Extract dynamic genre options across all qualifying narrators with counts
    const genreOptions = useMemo(() => {
        const counts = new Map<string, number>();
        allNarrators.forEach(narrator => {
            const distinctGenres = new Set<string>();
            narrator.books.forEach(b => {
                const list = Array.isArray(b.genre) ? b.genre : [b.genre];
                list.forEach(g => {
                    if (g && g.trim()) distinctGenres.add(g.trim());
                });
            });
            distinctGenres.forEach(g => {
                counts.set(g, (counts.get(g) || 0) + 1);
            });
        });

        // Filter to genres having at least 2 narrators for a curated dropdown, sorted alphabetically
        return Array.from(counts.entries())
            .filter(([_, count]) => count >= 2)
            .map(([genre, count]) => ({ genre, count }))
            .sort((a, b) => a.genre.localeCompare(b.genre));
    }, [allNarrators]);

    // Filter narrators by search (name, book titles, series, author), vocal style, and genre
    const filteredNarrators = useMemo(() => {
        const query = searchTerm.toLowerCase().trim();

        return allNarrators.filter(narrator => {
            // Search query matches: Narrator Name, Book Titles, Series, or Book Authors!
            const matchesSearch = !query ||
                narrator.name.toLowerCase().includes(query) ||
                narrator.books.some(b =>
                    b.title.toLowerCase().includes(query) ||
                    (b.series && b.series.toLowerCase().includes(query)) ||
                    (b.author && b.author.toLowerCase().includes(query))
                );

            if (!matchesSearch) return false;

            // Vocal Style filter
            if (selectedStyle !== 'All') {
                const badges = getNarratorVocalStyles(narrator.name, narrator.books);
                if (!badges.includes(selectedStyle as NarratorStyleBadgeId)) {
                    return false;
                }
            }

            // Genre filter
            if (selectedGenre !== 'All') {
                const targetGenre = selectedGenre.toLowerCase();
                const matchesGenre = narrator.books.some(b => {
                    const list = Array.isArray(b.genre) ? b.genre : [b.genre];
                    return list.some(g => g && g.trim().toLowerCase() === targetGenre);
                });
                if (!matchesGenre) return false;
            }

            return true;
        });
    }, [allNarrators, searchTerm, selectedStyle, selectedGenre]);

    // Sort narrators according to the selected order
    const sortedNarrators = useMemo(() => {
        return [...filteredNarrators].sort((a, b) => {
            if (sortBy === 'hours-desc') {
                return b.totalHours - a.totalHours;
            }
            if (sortBy === 'longest-performance') {
                const aMax = Math.max(...a.books.map(b => b.lengthHours || 0));
                const bMax = Math.max(...b.books.map(b => b.lengthHours || 0));
                return bMax - aMax;
            }
            if (sortBy === 'name-asc') {
                return a.name.localeCompare(b.name);
            }
            if (sortBy === 'name-desc') {
                return b.name.localeCompare(a.name);
            }
            // Default: most books descending, then total hours descending
            if (b.bookCount !== a.bookCount) {
                return b.bookCount - a.bookCount;
            }
            return b.totalHours - a.totalHours;
        });
    }, [filteredNarrators, sortBy]);

    const schemaData = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Audiobook Narrators | The Long Book Club',
        description: 'Directory of voice artists and narrators with two or more epic audiobooks in our curated collection.',
        url: 'https://thelongbookclub.com/narrators/',
        mainEntity: {
            '@type': 'ItemList',
            numberOfItems: allNarrators.length,
            itemListElement: allNarrators.map((n, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                item: {
                    '@type': 'Person',
                    name: n.name,
                    url: n.bookCount === 1 && n.books[0]?.slug
                        ? `https://thelongbookclub.com/book/${n.books[0].slug}/`
                        : `https://thelongbookclub.com/narrator/${n.slug}/`
                }
            }))
        }
    });

    // Interleave LeaderboardPromoCard at position 2 in top row and every 10 narrators down the directory
    const gridItems: React.ReactNode[] = [];
    let promoIndex = 0;

    sortedNarrators.forEach((narrator, index) => {
        // Position 2 in top row (between 1st and 2nd narrator)
        if (index === 1) {
            promoIndex++;
            gridItems.push(<LeaderboardPromoCard key={`leaderboard-promo-${promoIndex}`} />);
        }

        gridItems.push(
            <CreatorCard key={narrator.slug} creator={narrator} type="narrator" />
        );

        // Repeat every 10 narrators thereafter
        if (index > 1 && (index - 1) % 10 === 0 && index < sortedNarrators.length - 1) {
            promoIndex++;
            gridItems.push(<LeaderboardPromoCard key={`leaderboard-promo-${promoIndex}`} />);
        }
    });

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <SEO
                title="Audiobook Narrators"
                description="Meet the legendary voice artists who bring our longest audiobooks to life. Explore every voice artist featured in our curated library, complete with narration reviews."
                canonical="https://thelongbookclub.com/narrators/"
                schema={schemaData}
            />
            <Hero
                backgroundImage="/assets/collections-hero-images/LongBookClub-Collections-background-01.gif"
                title={<>Audiobook <br /> Narrators</>}
                subtitle="Meet the voices who bring our longest listening journeys to life. Explore every voice artist featured in our curated library."
                showCornerGraphics={false}
                topGraphic="/assets/Narrator-hub-Graphics/mic-badge.svg"
                topGraphicDimensions={{ width: '68px', height: '84px' }}
                topGraphicFilter="brightness(0) invert(1)"
                topGraphicBlendMode="overlay"
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
                chevronBlendMode="overlay"
                overlayOpacity={0}
            />

            <div className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div id="scroll-target" style={{ scrollMarginTop: '2rem', height: 0 }} />

                {/* Filter & Search Bar with Vocal Style, Genre, and Sort */}
                <NarratorFilterBar
                    searchTerm={searchTerm}
                    onSearchChange={(term) => updateParams('q', term)}
                    selectedStyle={selectedStyle}
                    onStyleChange={(style) => updateParams('style', style)}
                    styleOptions={styleOptions}
                    selectedGenre={selectedGenre}
                    onGenreChange={(genre) => updateParams('genre', genre)}
                    genreOptions={genreOptions}
                    sortBy={sortBy}
                    onSortChange={(sort) => updateParams('sort', sort)}
                    totalNarratorsCount={allNarrators.length}
                    filteredCount={sortedNarrators.length}
                    onClearAll={handleClearAll}
                />

                {/* Narrators Grid or Empty State */}
                {sortedNarrators.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 1rem', width: '100%', maxWidth: '600px' }}>
                        <h3 style={{
                            fontFamily: 'var(--font-serif-accent), Lora, Georgia, serif',
                            fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
                            color: 'var(--color-brand-forrest)',
                            fontWeight: 400,
                            marginBottom: '0.5rem'
                        }}>
                            No narrators found
                        </h3>
                        <p style={{
                            fontFamily: 'var(--font-serif-accent), Lora, Georgia, serif',
                            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                            color: 'var(--color-brand-forrest)',
                            opacity: 0.85,
                            marginBottom: '2rem'
                        }}>
                            Try searching for another narrator, book, or author, or clear your active filters.
                        </p>
                        <button
                            onClick={handleClearAll}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '1rem 2rem',
                                borderRadius: '2rem',
                                border: 'none',
                                backgroundColor: 'var(--color-brand-slate)',
                                color: '#ffffff',
                                fontSize: '1rem',
                                fontFamily: 'var(--font-body)',
                                fontWeight: 600,
                                cursor: 'pointer',
                                margin: '0 auto',
                                boxShadow: '0 4px 12px rgba(53, 61, 61, 0.22)'
                            }}
                        >
                            <FaTimes size={14} />
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="collections-grid">
                        {gridItems}
                    </div>
                )}
            </div>
        </div>
    );
};
