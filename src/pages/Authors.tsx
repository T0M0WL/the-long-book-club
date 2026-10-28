import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { books } from '../data/books';
import { CreatorCard } from '../components/CreatorCard';
import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { getAuthorStats } from '../utils/creatorUtils';
import { useSetHeaderTheme } from '../context/HeaderContext';
import { AuthorFilterBar, type AuthorSortOption } from '../components/AuthorFilterBar';
import { FaTimes } from 'react-icons/fa';

export const Authors = () => {
    useSetHeaderTheme({
        logoColor: 'var(--color-brand-cloud)',
        textColor: 'var(--color-brand-cloud)',
        hamburgerColor: 'var(--color-brand-cloud)',
        activeLink: 'authors',
        activeLinkBg: 'var(--color-brand-cloud)',
        activeLinkText: 'var(--color-brand-coral)'
    });

    const [searchParams, setSearchParams] = useSearchParams();

    const searchTerm = searchParams.get('q') || '';
    const selectedGenre = searchParams.get('genre') || 'All';
    const sortBy = (searchParams.get('sort') as AuthorSortOption) || 'default';

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
            next.delete('genre');
            next.delete('sort');
            return next;
        }, { replace: true });
    };

    const allAuthors = useMemo(() => getAuthorStats(books, 1), []);

    // Extract dynamic genre options across all qualifying authors with counts
    const genreOptions = useMemo(() => {
        const counts = new Map<string, number>();
        allAuthors.forEach(author => {
            const distinctGenres = new Set<string>();
            author.books.forEach(b => {
                const list = Array.isArray(b.genre) ? b.genre : [b.genre];
                list.forEach(g => {
                    if (g && g.trim()) distinctGenres.add(g.trim());
                });
            });
            distinctGenres.forEach(g => {
                counts.set(g, (counts.get(g) || 0) + 1);
            });
        });

        // Filter to genres having at least 2 authors for a clean, curated dropdown, sorted alphabetically
        return Array.from(counts.entries())
            .filter(([_, count]) => count >= 2)
            .map(([genre, count]) => ({ genre, count }))
            .sort((a, b) => a.genre.localeCompare(b.genre));
    }, [allAuthors]);

    // Filter authors by search query (author name, landmark book titles, series) and genre
    const filteredAuthors = useMemo(() => {
        const query = searchTerm.toLowerCase().trim();

        return allAuthors.filter(author => {
            // Search filter
            const matchesSearch = !query ||
                author.name.toLowerCase().includes(query) ||
                author.books.some(b =>
                    b.title.toLowerCase().includes(query) ||
                    (b.series && b.series.toLowerCase().includes(query))
                );

            if (!matchesSearch) return false;

            // Genre filter
            if (selectedGenre !== 'All') {
                const targetGenre = selectedGenre.toLowerCase();
                const matchesGenre = author.books.some(b => {
                    const list = Array.isArray(b.genre) ? b.genre : [b.genre];
                    return list.some(g => g && g.trim().toLowerCase() === targetGenre);
                });
                if (!matchesGenre) return false;
            }

            return true;
        });
    }, [allAuthors, searchTerm, selectedGenre]);

    // Sort authors according to the selected order
    const sortedAuthors = useMemo(() => {
        return [...filteredAuthors].sort((a, b) => {
            if (sortBy === 'hours-desc') {
                return b.totalHours - a.totalHours;
            }
            if (sortBy === 'name-asc') {
                return a.name.localeCompare(b.name);
            }
            if (sortBy === 'name-desc') {
                return b.name.localeCompare(a.name);
            }
            if (sortBy === 'longest-book') {
                const aMax = Math.max(...a.books.map(b => b.lengthHours || 0));
                const bMax = Math.max(...b.books.map(b => b.lengthHours || 0));
                return bMax - aMax;
            }
            // Default: most books descending, then total hours descending
            if (b.bookCount !== a.bookCount) {
                return b.bookCount - a.bookCount;
            }
            return b.totalHours - a.totalHours;
        });
    }, [filteredAuthors, sortBy]);

    const schemaData = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Audiobook Authors | The Long Book Club',
        description: 'Directory of authors with two or more epic audiobooks in our curated collection.',
        url: 'https://thelongbookclub.com/authors/',
        mainEntity: {
            '@type': 'ItemList',
            numberOfItems: allAuthors.length,
            itemListElement: allAuthors.map((a, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                item: {
                    '@type': 'Person',
                    name: a.name,
                    url: a.bookCount === 1 && a.books[0]?.slug
                        ? `https://thelongbookclub.com/book/${a.books[0].slug}/`
                        : `https://thelongbookclub.com/author/${a.slug}/`
                }
            }))
        }
    });

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <SEO
                title="Audiobook Authors"
                description="Explore our directory of epic audiobook authors with 20+ hour audiobooks in our curated catalog. Discover the masterminds behind your favorite marathon listens."
                canonical="https://thelongbookclub.com/authors/"
                schema={schemaData}
            />
            <Hero
                backgroundImage="/assets/collections-hero-images/LongBookClub-Collections-background-01.gif"
                title={<>Audiobook <br /> Authors</>}
                subtitle="Explore the masterminds behind our longest listens. Discover every author featured in our curated library."
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

            <div className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div id="scroll-target" style={{ scrollMarginTop: '2rem', height: 0 }} />

                {/* Filter & Search Bar styled like Book Finder */}
                <AuthorFilterBar
                    searchTerm={searchTerm}
                    onSearchChange={(term) => updateParams('q', term)}
                    selectedGenre={selectedGenre}
                    onGenreChange={(genre) => updateParams('genre', genre)}
                    genreOptions={genreOptions}
                    sortBy={sortBy}
                    onSortChange={(sort) => updateParams('sort', sort)}
                    totalAuthorsCount={allAuthors.length}
                    filteredCount={sortedAuthors.length}
                    onClearAll={handleClearAll}
                />

                {/* Authors Grid or Empty State */}
                {sortedAuthors.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 1rem', width: '100%', maxWidth: '600px' }}>
                        <h3 style={{
                            fontFamily: 'var(--font-serif-accent), Lora, Georgia, serif',
                            fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
                            color: 'var(--color-brand-forrest)',
                            fontWeight: 400,
                            marginBottom: '0.5rem'
                        }}>
                            No authors found
                        </h3>
                        <p style={{
                            fontFamily: 'var(--font-serif-accent), Lora, Georgia, serif',
                            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                            color: 'var(--color-brand-forrest)',
                            opacity: 0.85,
                            marginBottom: '2rem'
                        }}>
                            Try searching for another name or clearing your active filters.
                        </p>
                        <button
                            onClick={handleClearAll}
                            className="clear-button"
                            style={{ margin: '0 auto', display: 'inline-flex' }}
                        >
                            <FaTimes size={15} />
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="collections-grid">
                        {sortedAuthors.map(author => (
                            <CreatorCard key={author.slug} creator={author} type="author" />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
