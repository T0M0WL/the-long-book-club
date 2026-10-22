import { books } from '../data/books';
import { CreatorCard } from '../components/CreatorCard';
import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { getNarratorStats } from '../utils/creatorUtils';
import { useSetHeaderTheme } from '../context/HeaderContext';

export const Narrators = () => {
    useSetHeaderTheme({
        logoColor: 'var(--color-brand-cloud)',
        textColor: 'var(--color-brand-cloud)',
        hamburgerColor: 'var(--color-brand-cloud)',
        activeLink: 'narrators',
        activeLinkBg: 'var(--color-brand-cloud)',
        activeLinkText: 'var(--color-brand-coral)'
    });

    const narrators = getNarratorStats(books);

    const schemaData = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Audiobook Narrators | The Long Book Club',
        description: 'Directory of voice artists and narrators with two or more epic audiobooks in our curated collection.',
        url: 'https://thelongbookclub.com/narrators/',
        mainEntity: {
            '@type': 'ItemList',
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
        }
    });

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <SEO
                title="Audiobook Narrators"
                description="Meet the legendary voice artists who bring our longest audiobooks to life. Explore narrators with 2 or more epic performances in our catalog, complete with narration reviews."
                canonical="https://thelongbookclub.com/narrators/"
                schema={schemaData}
            />
            <Hero
                backgroundImage="/assets/collections-hero-images/LongBookClub-Collections-background-01.gif"
                title={<>Audiobook <br /> Narrators</>}
                subtitle="Meet the voices who bring our longest listening journeys to life. Explore voice artists with two or more epic narrations featured in our curated library."
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
                    {narrators.map(narrator => (
                        <CreatorCard key={narrator.slug} creator={narrator} type="narrator" />
                    ))}
                </div>
            </div>
        </div>
    );
};
