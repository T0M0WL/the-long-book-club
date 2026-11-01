import { useMemo, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { collections } from '../data/collections';
import { books } from '../data/books';
import { getNarratorStats } from '../utils/creatorUtils';
import { CollectionCard } from '../components/CollectionCard';
import { SEO } from '../components/SEO';
import { useSetHeaderTheme } from '../context/HeaderContext';
import { SpineBanner } from '../components/SpineBanner';
import { HallOfFameCarousel } from '../components/HallOfFameCarousel';
import { LongBookLedger } from '../components/LongBookLedger';
import { TwoWorldsFeature } from '../components/TwoWorldsFeature';
import { QuickBookFinder } from '../components/QuickBookFinder';

export const Home = () => {
    useSetHeaderTheme({
        logoColor: '#dbd7bc',
        textColor: '#dbd7bc',
        hamburgerColor: '#dbd7bc',
        activeLink: 'home',
        activeLinkBg: '#dbd7bc',
        activeLinkText: 'var(--color-brand-slate)'
    });

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // 1. Legacy Redirect Logic (SEO Safeguard)
    useEffect(() => {
        const hasFilter = searchParams.has('genre') || searchParams.has('length') || searchParams.has('q');
        if (hasFilter) {
            // Reconstruct the search string and redirect
            navigate(`/long-book-finder?${searchParams.toString()}`, { replace: true });
        }
    }, [searchParams, navigate]);

    // Randomly select 3 featured collections on mount
    const featuredCollections = useMemo(() => {
        return [...collections]
            .sort(() => 0.5 - Math.random()) // Simple shuffle
            .slice(0, 3);
    }, []);

    // Dynamic Catalog Authority Statistics (100% automated from data)
    const heroStats = useMemo(() => {
        const epicsCount = `${Math.floor(books.length / 10) * 10}+ Vetted Epics`;
        const collectionsCount = `${collections.length} Curated Collections`;
        const narratorsCount = `${getNarratorStats(books).length}+ Narrators`;
        const totalHours = Math.round(books.reduce((acc, b) => acc + (b.lengthHours || 0), 0));
        const hoursCount = `${totalHours.toLocaleString()} Hours`;
        return { epicsCount, collectionsCount, narratorsCount, hoursCount };
    }, []);

    const websiteSchema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "The Long Book Club",
        "url": "https://thelongbookclub.com",
        "description": "Curated long audiobooks for deep listening. We help you find the best 20+ hour books to maximize your credits.",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://thelongbookclub.com/long-book-finder?q={search_term_string}", // Updated to new URL
            "query-input": "required name=search_term_string"
        }
    });



    return (
        <>
            <SEO
                title="Curated Long Audiobooks"
                description="Discover 470+ curated long audiobooks (10 to 280+ hours) across 18 collections and 74+ voice artists to maximize your monthly listening credits."
                canonical="https://thelongbookclub.com/"
                schema={websiteSchema}
            />

            {/* Semantic H1 for Google & screen-readers (preserves the pristine, uncluttered visual masthead) */}
            <h1 className="sr-only">
                The Long Book Club — Curated Long Audiobooks for Deep Listening
            </h1>

            <Hero
                showCornerGraphics={false}
                topGraphic="/assets/lbc-logo-stack-v2.svg"
                topGraphicDimensions={{ width: 'clamp(200px, 50vw, 360px)', height: 'clamp(111px, 28vw, 200px)' }}
                topGraphicColor="#dbd7bc"
                showSeparator={false}
                subtitleLineHeight={1.4}
                subtitleMarginTop="50px"
                contentPaddingTop="clamp(5px, 10vh, 45px)"
                overlayOpacity={0}
                title={null}
                titleFontSize="clamp(2.5rem, 5vw, 4rem)"
                titleColor="#dbd7bc"
                separatorColor="#dbd7bc"
                subtitle="The Long Book Club finds you the longest, most immersive audiobooks. We are the definitive resource for long-form listening, curated to get you maximum entertainment from every single Audiobook credit or purchase."
                subtitleColor="#dbd7bc"
                chevronColor="#dbd7bc"
                chevronOpacity={1}
            >
                {/* Dynamic Catalog Authority Statistics Ticker */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'clamp(0.4rem, 1vw, 0.75rem)',
                        flexWrap: 'wrap',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 'clamp(0.68rem, 0.85vw, 0.76rem)',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#dbd7bc',
                        opacity: 0.9,
                        maxWidth: '900px',
                        margin: 'clamp(2.5rem, 5vh, 3.75rem) auto clamp(2rem, 4.5vh, 3.5rem) auto'
                    }}
                >
                    <span style={{ whiteSpace: 'nowrap' }}>{heroStats.epicsCount}</span>
                    <span style={{ opacity: 0.35 }}>•</span>
                    <span style={{ whiteSpace: 'nowrap' }}>{heroStats.collectionsCount}</span>
                    <span style={{ opacity: 0.35 }}>•</span>
                    <span style={{ whiteSpace: 'nowrap' }}>{heroStats.narratorsCount}</span>
                    <span style={{ opacity: 0.35 }}>•</span>
                    <span style={{ whiteSpace: 'nowrap' }}>{heroStats.hoursCount}</span>
                </div>
            </Hero>

            <div id="scroll-target" style={{ scrollMarginTop: '2rem', height: 0 }} />

            {/* Two Worlds Feature Section: Classic Pillars & Micro Genres */}
            <TwoWorldsFeature />

            {/* Quick Book Finder Section */}
            <QuickBookFinder />



            <SpineBanner
                backgroundImage="/assets/genre-specific-gfx/genre-hero-background.gif"
                fullWidth={true}
                minHeight="800px"
                brightness={0.95}
            >
                <HallOfFameCarousel />
            </SpineBanner>

            {/* The Long Book Ledger (Audiobook News & Offers) */}
            <LongBookLedger />

            {/* Featured Collections Section */}
            <div style={{
                width: '100%',
                maxWidth: '1280px',
                margin: '6rem auto 6rem auto',
                padding: '0 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div style={{
                    width: 'clamp(96px, 12vw, 144px)', // Increased by 20%
                    height: 'clamp(72px, 9.6vw, 108px)', // Increased by 20%
                    backgroundColor: 'var(--color-brand-forrest)',
                    maskImage: 'url("/assets/collections-graphic-1.svg")',
                    WebkitMaskImage: 'url("/assets/collections-graphic-1.svg")',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                    marginBottom: '1rem'
                }} />

                <h3 style={{
                    fontFamily: 'Lora, Georgia, serif',
                    fontStyle: 'italic',
                    color: 'var(--color-brand-forrest)',
                    fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    fontWeight: 400,
                    marginBottom: '0',
                    textAlign: 'center'
                }}>
                    Featured Collections
                </h3>

                <div style={{
                    width: '60px',
                    height: '1px',
                    backgroundColor: 'var(--color-brand-forrest)', // Forest color
                    margin: '1.5rem auto calc(1.5rem + 50px) auto',
                }} />



                <div className="collections-grid-container" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    justifyContent: 'center',
                    marginBottom: '3rem',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    {featuredCollections.map(collection => (
                        <CollectionCard key={collection.id} collection={collection} />
                    ))}
                </div>

                {/* View All Button */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to="/collections/" style={{
                        backgroundColor: 'var(--color-brand-coral)',
                        color: 'var(--color-brand-cloud)',
                        textDecoration: 'none',
                        padding: '1rem 2rem',
                        borderRadius: '2rem',
                        fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                        fontFamily: 'var(--font-serif-accent)',
                        textAlign: 'center',
                        transition: 'background 0.2s',
                        display: 'inline-block'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#cc563b';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-brand-coral)';
                        }}
                    >
                        View all Collections
                    </Link>
                </div>
            </div>

            <div className="page-container">
                {/* Content removed (Moved to Finder page) */}
            </div>
        </>
    );
};
