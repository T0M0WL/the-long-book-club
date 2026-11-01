import { useMemo, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { collections } from '../data/collections';
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
                title="Curated Epic Audiobooks"
                description="Discover the best long audiobooks to maximize your monthly credits. Curated selection of 40+ hour epics across all genres."
                canonical="https://thelongbookclub.com/"
                schema={websiteSchema}
            />
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
            />

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
