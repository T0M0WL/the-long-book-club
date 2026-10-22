import { books } from '../data/books';
import { CreatorCard } from '../components/CreatorCard';
import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { getAuthorStats } from '../utils/creatorUtils';
import { useSetHeaderTheme } from '../context/HeaderContext';

export const Authors = () => {
    useSetHeaderTheme({
        logoColor: 'var(--color-brand-cloud)',
        textColor: 'var(--color-brand-cloud)',
        hamburgerColor: 'var(--color-brand-cloud)',
        activeLink: 'authors',
        activeLinkBg: 'var(--color-brand-cloud)',
        activeLinkText: 'var(--color-brand-coral)'
    });

    const authors = getAuthorStats(books);

    const schemaData = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Audiobook Authors | The Long Book Club',
        description: 'Directory of authors with two or more epic audiobooks in our curated collection.',
        url: 'https://thelongbookclub.com/authors/',
        mainEntity: {
            '@type': 'ItemList',
            numberOfItems: authors.length,
            itemListElement: authors.map((a, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                item: {
                    '@type': 'Person',
                    name: a.name,
                    url: `https://thelongbookclub.com/author/${a.slug}/`
                }
            }))
        }
    });

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <SEO
                title="Audiobook Authors"
                description="Explore our directory of epic audiobook authors with 2 or more 20+ hour audiobooks in our curated catalog. Discover the masterminds behind your favorite marathon listens."
                canonical="https://thelongbookclub.com/authors/"
                schema={schemaData}
            />
            <Hero
                backgroundImage="/assets/collections-hero-images/LongBookClub-Collections-background-01.gif"
                title={<>Audiobook <br /> Authors</>}
                subtitle="Explore the masterminds behind our longest listens. Discover every author with two or more marathon audiobooks featured in our curated library."
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

                <div className="collections-grid">
                    {authors.map(author => (
                        <CreatorCard key={author.slug} creator={author} type="author" />
                    ))}
                </div>
            </div>
        </div>
    );
};
