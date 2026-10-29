
import { useParams, Navigate, Link } from 'react-router-dom';
import { collections } from '../data/collections';
import { books } from '../data/books';
import { FaClock } from 'react-icons/fa';
import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { useSetHeaderTheme } from '../context/HeaderContext';
import { getRoundedHours } from '../utils/formatLength';

const BASE_WIDTH = 88;
const BASE_HEIGHT = 63;

const getBalancedDims = (slug: string) => {
    const nudges: Record<string, number> = {
        'romantasy': 1.1,
        'dark-academia': 0.95,
        'long-life-stories': 0.85
    };
    const scale = nudges[slug] || 1.0;
    return {
        width: `${BASE_WIDTH * scale}px`,
        height: `${BASE_HEIGHT * scale}px`
    };
};

export const CollectionDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const collection = collections.find(c => c.slug === slug);

    // Determine Theme based on Collection (Hero Image Brightness)
    // Determine Theme based on Collection (Hero Image Brightness)
    let themeColor = 'var(--color-brand-forrest)'; // Default (Dark Text for Light Heros)

    if (['romantasy', 'graphic-audio', 'litrpg-gamelit', 'space-opera'].includes(slug || '')) {
        themeColor = 'var(--color-brand-cloud)'; // White for Dark Heros
    } else if (['bucket-list', 'dark-academia', 'long-life-stories', 'best-long-books-2025', 'nordic-noir', 'grimdark-fantasy', 'mythology-epics', 'british-espionage', 'silkpunk', 'time-travel'].includes(slug || '')) {
        themeColor = 'var(--color-brand-sage)'; // Sage for Bucket List, Dark Academia, Long Life, Best of 2025, Nordic Noir, Grimdark, Mythology, British Espionage, Silkpunk, Time Travel
    }

    // Determine Active Link Text Color based on spec
    const getActiveLinkTextColor = (s: string | undefined) => {
        if (!s) return 'var(--color-brand-slate)';
        if (['romantasy', 'graphic-audio', 'litrpg-gamelit', 'space-opera'].includes(s)) return 'var(--color-brand-coral)';
        if (['longest-ever', 'magical-realism', 'cozy-fantasy', 'cozy-crime'].includes(s)) return 'var(--color-brand-sage)';
        if (['long-life-stories', 'bucket-list', 'grimdark-fantasy', 'mythology-epics', 'silkpunk', 'time-travel'].includes(s)) return 'var(--color-brand-forrest)';
        // Default for others (including dark-academia and nordic-noir which use Slate)
        return 'var(--color-brand-slate)';
    };

    useSetHeaderTheme({
        logoColor: themeColor,
        textColor: themeColor,
        hamburgerColor: themeColor,
        activeLink: 'collections',
        activeLinkBg: themeColor,
        activeLinkText: getActiveLinkTextColor(slug)
    });

    if (!collection) {
        return <Navigate to="/collections/" replace />;
    }


    // Resolve books
    const collectionBooks = collection.bookIds
        .map(id => books.find(b => b.id === id))
        .filter(b => b !== undefined);


    // Map brand themes to hex codes for the browser status bar (theme-color)
    const brandColors: Record<string, string> = {
        'var(--color-brand-forrest)': '#2c5143',
        'var(--color-brand-sage)': '#cbd6ab',
        'var(--color-brand-slate)': '#353d3d',
        'var(--color-brand-cloud)': '#eae8da'
    };
    const currentThemeColor = brandColors[themeColor] || '#2c5143';

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <SEO
                title={collection.title}
                description={collection.heroSubtitle || collection.cardOverview || collection.description}
                canonical={`https://thelongbookclub.com/collections/${collection.slug}/`}
                image={collection.coverUrl}
                themeColor={currentThemeColor}
            />

            {/* Hero Section - Edge to Edge for specific collections */}
            {
                collection.slug === 'best-long-books-2025' ? (
                    <>
                        <Hero
                            backgroundImage="/assets/collections-hero-images/LongBookClub-Forrest-Hero-Image-01.gif"
                            topGraphic="/assets/collections-hero-images/Collections Icons SVGs/best-of-2025-icon.svg"
                            topGraphicDimensions={getBalancedDims('best-long-books-2025')}
                            title={collection.title}
                            subtitle={collection.heroSubtitle || collection.description}
                            sectionHeight="auto"
                            sectionMinHeight="600px"
                            sectionPadding="11rem 1rem 8rem 1rem"
                            contentPaddingTop="0"
                            titleFontSize="4.5rem"
                            titleLineHeight={1.05}
                            subtitleFontSize="1.4rem"
                            subtitleLineHeight={1.6}
                            useDynamicColor={false}
                            titleColor="var(--color-brand-sage)"
                            subtitleColor="var(--color-brand-sage)"
                            separatorColor="var(--color-brand-sage)"
                            showCornerGraphics={false}
                            overlayOpacity={0}
                            topGraphicColor="var(--color-brand-sage)"
                            topGraphicBlendMode="normal"
                            topGraphicFilter="none"
                            topGraphicOpacity={0.9}
                            contentBlendMode="normal"
                            titleBlendMode="normal"
                            titleOpacity={1}
                            chevronColor="var(--color-brand-sage)"
                            chevronOpacity={0.5}
                        />
                    </>
                ) : collection.slug === 'romantasy' ? (
                    <>
                        <Hero
                            backgroundImage="/assets/collections-hero-images/LongBookClub-Collections-background-01.jpg"
                            topGraphic="/assets/collections-hero-images/Collections Icons SVGs/best-long-romantasy.svg"
                            topGraphicDimensions={getBalancedDims('romantasy')}
                            title="Epic Romantasy Long Listens"
                            sectionHeight="auto"
                            sectionMinHeight="600px"
                            sectionPadding="11rem 1rem 8rem 1rem"
                            contentPaddingTop="0"
                            titleFontSize="4.5rem"
                            titleLineHeight={1.05}
                            titleOpacity={0.88}
                            subtitleFontSize="1.4rem"
                            subtitleLineHeight={1.6}
                            subtitle={collection.heroSubtitle || collection.description}
                            useDynamicColor={false}
                            titleColor="white"
                            subtitleColor="white"
                            showCornerGraphics={false}
                            overlayOpacity={0}
                            topGraphicBlendMode="overlay"
                            topGraphicFilter="brightness(0) invert(1)"
                            topGraphicOpacity={0.9}
                            contentBlendMode="overlay"
                            titleBlendMode="overlay"
                            subtitleBlendMode="overlay"
                            chevronBlendMode="overlay"
                        />
                    </>
                ) : collection.slug === 'graphic-audio' ? (
                    <>
                        <Hero
                            backgroundImage="/assets/collections-hero-images/LongBookClub-Collections-background-01.jpg"
                            topGraphic="/assets/collections-hero-images/Collections Icons SVGs/best-cinematic-icon.svg"
                            topGraphicDimensions={getBalancedDims('graphic-audio')}
                            title={collection.title}
                            sectionHeight="auto"
                            sectionMinHeight="600px"
                            sectionPadding="11rem 1rem 8rem 1rem"
                            contentPaddingTop="0"
                            titleFontSize="4.5rem"
                            titleLineHeight={1.05}
                            titleOpacity={0.88}
                            subtitleFontSize="1.4rem"
                            subtitleLineHeight={1.6}
                            subtitle={collection.heroSubtitle || collection.description}
                            useDynamicColor={false}
                            titleColor="white"
                            subtitleColor="white"
                            showCornerGraphics={false}
                            overlayOpacity={0}
                            topGraphicBlendMode="overlay"
                            topGraphicFilter="brightness(0) invert(1)"
                            topGraphicOpacity={0.9}
                            contentBlendMode="overlay"
                            titleBlendMode="overlay"
                            subtitleBlendMode="overlay"
                            chevronBlendMode="overlay"
                        />
                    </>
                ) : collection.slug === 'dark-academia' ? (
                    <>
                        <Hero
                            backgroundImage="/assets/collections-hero-images/LongBookClub-Slate-Hero-Image-01.gif"
                            topGraphic="/assets/collections-hero-images/Collections Icons SVGs/Best-long-dark-academia-icon.svg"
                            topGraphicDimensions={getBalancedDims('dark-academia')}
                            title="Long, Dark Academia Listens"
                            sectionHeight="auto"
                            sectionMinHeight="600px"
                            sectionPadding="11rem 1rem 8rem 1rem"
                            contentPaddingTop="0"
                            titleFontSize="4.5rem"
                            titleLineHeight={1.05}
                            subtitleFontSize="1.4rem"
                            subtitleLineHeight={1.6}
                            subtitle={collection.heroSubtitle || collection.description}
                            useDynamicColor={false}
                            subtitleColor="rgba(203, 214, 171, 0.5)"
                            separatorColor="rgba(203, 214, 171, 0.5)"
                            showCornerGraphics={false}
                            overlayOpacity={0}
                            topGraphicColor="rgba(203, 214, 171, 0.5)"
                            topGraphicBlendMode="normal"
                            topGraphicFilter="none"
                            topGraphicOpacity={0.9}
                            contentBlendMode="normal"
                            titleColor="rgba(203, 214, 171, 0.5)"
                            titleBlendMode="normal"
                            titleOpacity={1}
                            chevronColor="var(--color-brand-sage)"
                            chevronOpacity={0.5}
                        />
                    </>
                ) : collection.slug === 'longest-ever' ? (
                    <>
                        <Hero
                            backgroundImage="/assets/collections-hero-images/LongBookClub-Sage-Hero-Image-01.gif"
                            topGraphic="/assets/collections-hero-images/Collections Icons SVGs/best-longest-ever-audiobooks.svg"
                            topGraphicDimensions={getBalancedDims('longest-ever')}
                            topGraphicColor="var(--color-brand-forrest)"
                            title="The Longest Ever Audiobooks (60+ Hours)"
                            sectionHeight="auto"
                            sectionMinHeight="600px"
                            sectionPadding="11rem 1rem 8rem 1rem"
                            contentPaddingTop="0"
                            titleFontSize="4.5rem"
                            titleLineHeight={1.05}
                            titleOpacity={0.88}
                            subtitleFontSize="1.4rem"
                            subtitleLineHeight={1.6}
                            subtitle={collection.heroSubtitle || collection.description}
                            useDynamicColor={false}
                            titleColor="rgba(44, 81, 67, 0.8)"
                            subtitleColor="rgba(44, 81, 67, 0.8)"
                            separatorColor="rgba(44, 81, 67, 0.8)"
                            showCornerGraphics={false}
                            overlayOpacity={0}
                            topGraphicBlendMode="multiply"
                            topGraphicOpacity={0.8}
                            contentBlendMode="multiply"
                            titleBlendMode="multiply"
                            subtitleBlendMode="multiply"
                            chevronColor="var(--color-brand-forrest)"
                            chevronBlendMode="multiply"
                            chevronOpacity={0.8}
                        />
                    </>
                ) : collection.slug === 'long-life-stories' ? (
                    <>
                        <Hero
                            backgroundImage="/assets/collections-hero-images/LongBookClub-Forrest-Hero-Image-01.gif"
                            topGraphic="/assets/collections-hero-images/Collections Icons SVGs/long-life-stories.svg"
                            topGraphicDimensions={getBalancedDims('long-life-stories')}
                            title="Long Life Stories"
                            sectionHeight="auto"
                            sectionMinHeight="600px"
                            sectionPadding="11rem 1rem 8rem 1rem"
                            contentPaddingTop="0"
                            titleFontSize="4.5rem"
                            titleLineHeight={1.05}
                            subtitleFontSize="1.4rem"
                            subtitleLineHeight={1.6}
                            subtitle={collection.heroSubtitle || collection.description}
                            useDynamicColor={false}
                            titleColor="var(--color-brand-sage)"
                            subtitleColor="var(--color-brand-sage)"
                            separatorColor="var(--color-brand-sage)"
                            showCornerGraphics={false}
                            overlayOpacity={0}
                            topGraphicColor="var(--color-brand-sage)"
                            topGraphicBlendMode="normal"
                            topGraphicFilter="none"
                            topGraphicOpacity={0.9}
                            contentBlendMode="normal"
                            titleBlendMode="normal"
                            titleOpacity={1}
                            chevronColor="var(--color-brand-sage)"
                            chevronOpacity={0.5}
                        />
                    </>
                ) : collection.slug === 'bucket-list' ? (
                    <>
                        <Hero
                            backgroundImage="/assets/collections-hero-images/LongBookClub-Slate-Hero-Image-01.gif"
                            topGraphic="/assets/collections-hero-images/Collections Icons SVGs/bucket-list-icon.svg"
                            topGraphicDimensions={getBalancedDims('bucket-list')}
                            title="Bucket List Long Listens"
                            sectionHeight="auto"
                            sectionMinHeight="600px"
                            sectionPadding="11rem 1rem 8rem 1rem"
                            contentPaddingTop="0"
                            titleFontSize="4.5rem"
                            titleLineHeight={1.05}
                            subtitleFontSize="1.4rem"
                            subtitleLineHeight={1.6}
                            subtitle={collection.heroSubtitle || collection.description}
                            useDynamicColor={false}
                            subtitleColor="rgba(203, 214, 171, 0.5)"
                            separatorColor="rgba(203, 214, 171, 0.5)"
                            showCornerGraphics={false}
                            overlayOpacity={0}
                            topGraphicColor="rgba(203, 214, 171, 0.5)"
                            topGraphicBlendMode="normal"
                            topGraphicFilter="none"
                            topGraphicOpacity={0.9}
                            contentBlendMode="normal"
                            titleColor="rgba(203, 214, 171, 0.5)"
                            titleBlendMode="normal"
                            titleOpacity={1}
                            chevronColor="var(--color-brand-sage)"
                            chevronOpacity={0.5}
                        />
                    </>
                ) : collection.slug === 'magical-realism' ? (
                    <>
                        <Hero
                            backgroundImage="/assets/collections-hero-images/LongBookClub-Sage-Hero-Image-01.gif"
                            topGraphic="/assets/collections-hero-images/Collections Icons SVGs/magical-realism-icon.svg"
                            topGraphicDimensions={getBalancedDims('magical-realism')}
                            topGraphicColor="var(--color-brand-forrest)"
                            title="Magical Realism Long Listens"
                            sectionHeight="auto"
                            sectionMinHeight="600px"
                            sectionPadding="11rem 1rem 8rem 1rem"
                            contentPaddingTop="0"
                            titleFontSize="4.5rem"
                            titleLineHeight={1.05}
                            titleOpacity={0.88}
                            subtitleFontSize="1.4rem"
                            subtitleLineHeight={1.6}
                            subtitle={collection.heroSubtitle || collection.description}
                            useDynamicColor={false}
                            titleColor="rgba(44, 81, 67, 0.8)"
                            subtitleColor="rgba(44, 81, 67, 0.8)"
                            separatorColor="rgba(44, 81, 67, 0.8)"
                            showCornerGraphics={false}
                            overlayOpacity={0}
                            topGraphicBlendMode="multiply"
                            topGraphicOpacity={0.8}
                            contentBlendMode="multiply"
                            titleBlendMode="multiply"
                            subtitleBlendMode="multiply"
                            chevronColor="var(--color-brand-forrest)"
                            chevronBlendMode="multiply"
                            chevronOpacity={0.8}
                        />
                    </>
                ) : collection.slug === 'time-travel' ? (
                    <>
                        <Hero
                            backgroundImage="/assets/collections-hero-images/LongBookClub-Slate-Hero-Image-01.gif"
                            topGraphic="/assets/collections-hero-images/Collections Icons SVGs/time-travel-icon.svg"
                            topGraphicDimensions={getBalancedDims('time-travel')}
                            title="Time Travel, Temporal Journeys &amp; Alternative Histories"
                            sectionHeight="auto"
                            sectionMinHeight="600px"
                            sectionPadding="11rem 1rem 8rem 1rem"
                            contentPaddingTop="0"
                            titleFontSize="4.5rem"
                            titleLineHeight={1.05}
                            subtitleFontSize="1.4rem"
                            subtitleLineHeight={1.6}
                            subtitle={collection.heroSubtitle || collection.description}
                            useDynamicColor={false}
                            subtitleColor="rgba(203, 214, 171, 0.5)"
                            separatorColor="rgba(203, 214, 171, 0.5)"
                            showCornerGraphics={false}
                            overlayOpacity={0}
                            topGraphicColor="rgba(203, 214, 171, 0.5)"
                            topGraphicBlendMode="normal"
                            topGraphicFilter="none"
                            topGraphicOpacity={0.9}
                            contentBlendMode="normal"
                            titleColor="rgba(203, 214, 171, 0.5)"
                            titleBlendMode="normal"
                            titleOpacity={1}
                            chevronColor="var(--color-brand-sage)"
                            chevronOpacity={0.5}
                        />
                    </>
                ) : collection.slug === 'silkpunk' ? (
                    <>
                        <Hero
                            backgroundImage="/assets/collections-hero-images/LongBookClub-Forrest-Hero-Image-01.gif"
                            topGraphic="/assets/collections-hero-images/Collections Icons SVGs/silkpunk-icon.svg"
                            topGraphicDimensions={getBalancedDims('silkpunk')}
                            title="Silkpunk &amp; Imperial Epics"
                            sectionHeight="auto"
                            sectionMinHeight="600px"
                            sectionPadding="11rem 1rem 8rem 1rem"
                            contentPaddingTop="0"
                            titleFontSize="4.5rem"
                            titleLineHeight={1.05}
                            subtitleFontSize="1.4rem"
                            subtitleLineHeight={1.6}
                            subtitle={collection.heroSubtitle || collection.description}
                            useDynamicColor={false}
                            titleColor="var(--color-brand-sage)"
                            subtitleColor="var(--color-brand-sage)"
                            separatorColor="var(--color-brand-sage)"
                            showCornerGraphics={false}
                            overlayOpacity={0}
                            topGraphicColor="var(--color-brand-sage)"
                            topGraphicBlendMode="normal"
                            topGraphicFilter="none"
                            topGraphicOpacity={0.9}
                            contentBlendMode="normal"
                            titleBlendMode="normal"
                            titleOpacity={1}
                            chevronColor="var(--color-brand-sage)"
                            chevronOpacity={0.5}
                        />
                    </>
                ) : collection.slug === 'british-espionage' ? (
                    <>
                        <Hero
                            backgroundImage="/assets/collections-hero-images/LongBookClub-Slate-Hero-Image-01.gif"
                            topGraphic="/assets/collections-hero-images/Collections Icons SVGs/british-espionage-icon.svg"
                            topGraphicDimensions={getBalancedDims('british-espionage')}
                            title="British Espionage &amp; Cold War Thrillers"
                            sectionHeight="auto"
                            sectionMinHeight="600px"
                            sectionPadding="11rem 1rem 8rem 1rem"
                            contentPaddingTop="0"
                            titleFontSize="4.5rem"
                            titleLineHeight={1.05}
                            subtitleFontSize="1.4rem"
                            subtitleLineHeight={1.6}
                            subtitle={collection.heroSubtitle || collection.description}
                            useDynamicColor={false}
                            subtitleColor="rgba(203, 214, 171, 0.5)"
                            separatorColor="rgba(203, 214, 171, 0.5)"
                            showCornerGraphics={false}
                            overlayOpacity={0}
                            topGraphicColor="rgba(203, 214, 171, 0.5)"
                            topGraphicBlendMode="normal"
                            topGraphicFilter="none"
                            topGraphicOpacity={0.9}
                            contentBlendMode="normal"
                            titleColor="rgba(203, 214, 171, 0.5)"
                            titleBlendMode="normal"
                            titleOpacity={1}
                            chevronColor="var(--color-brand-sage)"
                            chevronOpacity={0.5}
                        />
                    </>
                ) : collection.slug === 'space-opera' ? (
                    <>
                        <Hero
                            backgroundImage="/assets/collections-hero-images/LongBookClub-Collections-background-01.jpg"
                            topGraphic="/assets/collections-hero-images/Collections Icons SVGs/space-opera-icon.svg"
                            topGraphicDimensions={getBalancedDims('space-opera')}
                            title="Space Opera &amp; Galactic Empires"
                            sectionHeight="auto"
                            sectionMinHeight="600px"
                            sectionPadding="11rem 1rem 8rem 1rem"
                            contentPaddingTop="0"
                            titleFontSize="4.5rem"
                            titleLineHeight={1.05}
                            titleOpacity={0.9}
                            subtitleFontSize="1.4rem"
                            subtitleLineHeight={1.6}
                            subtitle={collection.heroSubtitle || collection.description}
                            useDynamicColor={false}
                            titleColor="white"
                            subtitleColor="white"
                            showCornerGraphics={false}
                            overlayOpacity={0}
                            topGraphicBlendMode="overlay"
                            topGraphicFilter="brightness(0) invert(1)"
                            topGraphicOpacity={0.95}
                            contentBlendMode="overlay"
                            titleBlendMode="overlay"
                            subtitleBlendMode="overlay"
                            chevronBlendMode="overlay"
                        />
                    </>
                ) : collection.slug === 'mythology-epics' ? (
                    <>
                        <Hero
                            backgroundImage="/assets/collections-hero-images/LongBookClub-Forrest-Hero-Image-01.gif"
                            topGraphic="/assets/collections-hero-images/Collections Icons SVGs/mythology-icon.svg"
                            topGraphicDimensions={getBalancedDims('mythology-epics')}
                            title="Mythological Retellings &amp; Ancient Epics"
                            sectionHeight="auto"
                            sectionMinHeight="600px"
                            sectionPadding="11rem 1rem 8rem 1rem"
                            contentPaddingTop="0"
                            titleFontSize="4.5rem"
                            titleLineHeight={1.05}
                            subtitleFontSize="1.4rem"
                            subtitleLineHeight={1.6}
                            subtitle={collection.heroSubtitle || collection.description}
                            useDynamicColor={false}
                            titleColor="var(--color-brand-sage)"
                            subtitleColor="var(--color-brand-sage)"
                            separatorColor="var(--color-brand-sage)"
                            showCornerGraphics={false}
                            overlayOpacity={0}
                            topGraphicColor="var(--color-brand-sage)"
                            topGraphicBlendMode="normal"
                            topGraphicFilter="none"
                            topGraphicOpacity={0.9}
                            contentBlendMode="normal"
                            titleBlendMode="normal"
                            titleOpacity={1}
                            chevronColor="var(--color-brand-sage)"
                            chevronOpacity={0.5}
                        />
                    </>
                ) : collection.slug === 'cozy-fantasy' ? (
                    <>
                        <Hero
                            backgroundImage="/assets/collections-hero-images/LongBookClub-Sage-Hero-Image-01.gif"
                            topGraphic="/assets/collections-hero-images/Collections Icons SVGs/cozy-fantasy-icon.svg"
                            topGraphicDimensions={getBalancedDims('cozy-fantasy')}
                            title="Cozy Fantasy &amp; Slice of Life"
                            sectionHeight="auto"
                            sectionMinHeight="600px"
                            sectionPadding="11rem 1rem 8rem 1rem"
                            contentPaddingTop="0"
                            titleFontSize="4.5rem"
                            titleLineHeight={1.05}
                            subtitleFontSize="1.4rem"
                            subtitleLineHeight={1.6}
                            subtitle={collection.heroSubtitle || collection.description}
                            useDynamicColor={false}
                            titleColor="var(--color-brand-forrest)"
                            subtitleColor="var(--color-brand-forrest)"
                            separatorColor="var(--color-brand-forrest)"
                            showCornerGraphics={false}
                            overlayOpacity={0}
                            topGraphicColor="var(--color-brand-forrest)"
                            topGraphicBlendMode="normal"
                            topGraphicFilter="none"
                            topGraphicOpacity={0.9}
                            contentBlendMode="normal"
                            titleBlendMode="normal"
                            titleOpacity={1}
                            chevronColor="var(--color-brand-forrest)"
                            chevronOpacity={0.8}
                        />
                    </>
                ) : collection.slug === 'cozy-crime' ? (
                    <>
                        <Hero
                            backgroundImage="/assets/collections-hero-images/LongBookClub-Sage-Hero-Image-01.gif"
                            topGraphic="/assets/collections-hero-images/Collections Icons SVGs/cozy-crime-icon.svg"
                            topGraphicDimensions={getBalancedDims('cozy-crime')}
                            title="Cozy Crime &amp; Village Mysteries"
                            sectionHeight="auto"
                            sectionMinHeight="600px"
                            sectionPadding="11rem 1rem 8rem 1rem"
                            contentPaddingTop="0"
                            titleFontSize="4.5rem"
                            titleLineHeight={1.05}
                            subtitleFontSize="1.4rem"
                            subtitleLineHeight={1.6}
                            subtitle={collection.heroSubtitle || collection.description}
                            useDynamicColor={false}
                            titleColor="var(--color-brand-forrest)"
                            subtitleColor="var(--color-brand-forrest)"
                            separatorColor="var(--color-brand-forrest)"
                            showCornerGraphics={false}
                            overlayOpacity={0}
                            topGraphicColor="var(--color-brand-forrest)"
                            topGraphicBlendMode="normal"
                            topGraphicFilter="none"
                            topGraphicOpacity={0.9}
                            contentBlendMode="normal"
                            titleBlendMode="normal"
                            titleOpacity={1}
                            chevronColor="var(--color-brand-forrest)"
                            chevronOpacity={0.8}
                        />
                    </>
                ) : collection.slug === 'grimdark-fantasy' ? (
                    <>
                        <Hero
                            backgroundImage="/assets/collections-hero-images/LongBookClub-Forrest-Hero-Image-01.gif"
                            topGraphic="/assets/collections-hero-images/Collections Icons SVGs/grimdark-fantasy-icon.svg"
                            topGraphicDimensions={getBalancedDims('grimdark-fantasy')}
                            title="Epic Grimdark Fantasy"
                            sectionHeight="auto"
                            sectionMinHeight="600px"
                            sectionPadding="11rem 1rem 8rem 1rem"
                            contentPaddingTop="0"
                            titleFontSize="4.5rem"
                            titleLineHeight={1.05}
                            subtitleFontSize="1.4rem"
                            subtitleLineHeight={1.6}
                            subtitle={collection.heroSubtitle || collection.description}
                            useDynamicColor={false}
                            titleColor="var(--color-brand-sage)"
                            subtitleColor="var(--color-brand-sage)"
                            separatorColor="var(--color-brand-sage)"
                            showCornerGraphics={false}
                            overlayOpacity={0}
                            topGraphicColor="var(--color-brand-sage)"
                            topGraphicBlendMode="normal"
                            topGraphicFilter="none"
                            topGraphicOpacity={0.9}
                            contentBlendMode="normal"
                            titleBlendMode="normal"
                            titleOpacity={1}
                            chevronColor="var(--color-brand-sage)"
                            chevronOpacity={0.5}
                        />
                    </>
                ) : collection.slug === 'nordic-noir' ? (
                    <>
                        <Hero
                            backgroundImage="/assets/collections-hero-images/LongBookClub-Slate-Hero-Image-01.gif"
                            topGraphic="/assets/collections-hero-images/Collections Icons SVGs/nordic-noir-icon.svg"
                            topGraphicDimensions={getBalancedDims('nordic-noir')}
                            title="Nordic Noir & Scandi Crime"
                            sectionHeight="auto"
                            sectionMinHeight="600px"
                            sectionPadding="11rem 1rem 8rem 1rem"
                            contentPaddingTop="0"
                            titleFontSize="4.5rem"
                            titleLineHeight={1.05}
                            subtitleFontSize="1.4rem"
                            subtitleLineHeight={1.6}
                            subtitle={collection.heroSubtitle || collection.description}
                            useDynamicColor={false}
                            subtitleColor="rgba(203, 214, 171, 0.5)"
                            separatorColor="rgba(203, 214, 171, 0.5)"
                            showCornerGraphics={false}
                            overlayOpacity={0}
                            topGraphicColor="rgba(203, 214, 171, 0.5)"
                            topGraphicBlendMode="normal"
                            topGraphicFilter="none"
                            topGraphicOpacity={0.9}
                            contentBlendMode="normal"
                            titleColor="rgba(203, 214, 171, 0.5)"
                            titleBlendMode="normal"
                            titleOpacity={1}
                            chevronColor="var(--color-brand-sage)"
                            chevronOpacity={0.5}
                        />
                    </>
                ) : collection.slug === 'litrpg-gamelit' ? (
                    <>
                        <Hero
                            backgroundImage="/assets/collections-hero-images/LongBookClub-Collections-background-01.jpg"
                            topGraphic="/assets/collections-hero-images/Collections Icons SVGs/litrpg-icon.svg"
                            topGraphicDimensions={getBalancedDims('litrpg-gamelit')}
                            title="LitRPG & GameLit Long Listens"
                            sectionHeight="auto"
                            sectionMinHeight="600px"
                            sectionPadding="11rem 1rem 8rem 1rem"
                            contentPaddingTop="0"
                            titleFontSize="4.5rem"
                            titleLineHeight={1.05}
                            titleOpacity={0.9}
                            subtitleFontSize="1.4rem"
                            subtitleLineHeight={1.6}
                            subtitle={collection.heroSubtitle || collection.description}
                            useDynamicColor={false}
                            titleColor="white"
                            subtitleColor="white"
                            showCornerGraphics={false}
                            overlayOpacity={0}
                            topGraphicBlendMode="overlay"
                            topGraphicFilter="brightness(0) invert(1)"
                            topGraphicOpacity={0.95}
                            contentBlendMode="overlay"
                            titleBlendMode="overlay"
                            subtitleBlendMode="overlay"
                            chevronBlendMode="overlay"
                        />
                    </>
                ) : (
                    <div className="page-container" style={{ paddingTop: '0' }}>
                        <header style={{ marginBottom: '6rem', textAlign: 'center', paddingTop: '120px', paddingLeft: '2rem', paddingRight: '2rem', maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
                            <h1 style={{
                                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                color: 'var(--color-brand-forrest)',
                                fontFamily: 'var(--font-heading)',
                                marginBottom: '1rem'
                            }}>
                                {collection.title}
                            </h1>
                            <p style={{
                                fontSize: '1.2rem',
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.6',
                                maxWidth: '750px',
                                margin: '0 auto'
                            }}>
                                {collection.heroSubtitle || collection.description}
                            </p>
                        </header>
                    </div>
                )
            }

            <div className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '1280px', padding: '0 2rem 6rem 2rem' }}>
                <div id="scroll-target" style={{ scrollMarginTop: '2rem', height: 0 }} />

                {/* Curator's Briefing / Editorial Intro */}
                {collection.editorialIntro && (
                    <section
                        aria-label="Curator's Briefing"
                        style={{
                            maxWidth: '650px',
                            margin: '0 auto',
                            paddingTop: 0,
                            paddingBottom: 'clamp(3rem, 5vw, 4.25rem)',
                            paddingLeft: '1rem',
                            paddingRight: '1rem',
                            textAlign: 'center'
                        }}
                    >
                        <div style={{
                            display: 'inline-block',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--color-brand-forrest)',
                            marginBottom: '1.25rem'
                        }}>
                            {collection.editorialHeading || "Curator's Briefing"}
                        </div>
                        <div style={{
                            width: '42px',
                            height: '1px',
                            backgroundColor: 'var(--color-brand-forrest)',
                            margin: '0 auto 1.5rem auto',
                            opacity: 0.55
                        }} />
                        <p
                            style={{
                                fontFamily: 'var(--font-serif-accent)', // Lora
                                fontSize: 'clamp(1.05rem, 1.8vw, 1.15rem)',
                                lineHeight: 1.65,
                                color: 'var(--color-brand-forrest)',
                                margin: 0,
                                fontWeight: 400
                            }}
                            dangerouslySetInnerHTML={{
                                __html: collection.editorialIntro
                                    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                                    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: var(--color-brand-coral); text-decoration: underline; text-underline-offset: 3px; font-weight: 500;">$1</a>')
                            }}
                        />
                    </section>
                )}

                <div className="collection-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)', // Updated to 3 columns
                    columnGap: '3rem',
                    rowGap: '6rem',
                    width: '100%'
                }}>
                    {collectionBooks.map((book) => (
                        <div key={book!.id} style={{ display: 'flex', flexDirection: 'column' }}>
                            {/* Book Card Container */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column', // Always vertical
                                gap: '2rem',
                                height: '100%' // Full height for alignment
                            }}>
                                {/* Top: Cover Image (Clickable) */}
                                <Link
                                    to={`/book/${book!.slug}/`}
                                    state={{ from: { label: collection.title, path: `/collections/${collection.slug}` } }}
                                    style={{ display: 'block', position: 'relative', textDecoration: 'none', color: 'inherit' }}
                                >
                                    <div style={{ position: 'relative' }}>
                                        <img
                                            src={book!.coverUrl}
                                            alt={`Cover of ${book!.title}`}
                                            loading="lazy"
                                            style={{
                                                width: '100%',
                                                aspectRatio: '1 / 1', // Ensure distinct square/rect shape consistency
                                                objectFit: 'cover',
                                                borderRadius: '0',
                                                border: '1px solid rgba(0,0,0,0.05)',
                                                transition: 'transform 0.2s',
                                                display: 'block'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                        />

                                        {/* Length Badge - Centered on Cover for that 'Poster' look */}
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '-25px', // Breaking out of the image slightly
                                            left: '50%',      // Center align
                                            transform: 'translateX(-50%)', // Center align
                                            width: '90px',
                                            height: '90px',
                                            background: 'var(--color-brand-forrest)',
                                            border: '6px solid var(--color-brand-coral)',
                                            borderRadius: '50%',
                                            color: 'var(--color-brand-cloud)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            zIndex: 10,
                                            lineHeight: 1
                                        }}>
                                            <FaClock size={12} style={{ opacity: 0.9, marginBottom: '4px' }} />
                                            <span style={{
                                                fontSize: '1.8rem',
                                                fontWeight: 400,
                                                fontFamily: 'var(--font-serif-accent)',
                                                letterSpacing: '-0.03em',
                                                lineHeight: '0.9',
                                                marginTop: '0'
                                            }}>{getRoundedHours(book!.length)}</span>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                fontWeight: 500,
                                                fontFamily: 'Inter, sans-serif',
                                                opacity: 0.9,
                                                marginTop: '2px'
                                            }}>hours</span>
                                        </div>
                                    </div>
                                </Link>

                                {/* Bottom: Content */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start', // Left aligned
                                    textAlign: 'left',
                                    paddingTop: '0.5rem', // Space for the badge overlap
                                    flex: 1, // Ensure it fills remaining height
                                }}>


                                    {/* Titles */}
                                    <h2 style={{
                                        fontSize: 'clamp(2rem, 2.5vw, 2.8rem)', // Slightly smaller for 2-col
                                        marginBottom: '0.75rem',
                                        lineHeight: 1.1,
                                        fontFamily: 'var(--font-serif-accent), Lora, Georgia, serif',
                                        fontStyle: 'italic',
                                        fontWeight: 400,
                                        letterSpacing: '-0.03em',
                                        color: 'var(--color-brand-forrest)'
                                    }}>
                                        <Link
                                            to={`/book/${book!.slug}/`}
                                            state={{ from: { label: collection.title, path: `/collections/${collection.slug}` } }}
                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                        >
                                            {book!.title}
                                        </Link>
                                    </h2>

                                    <h3 style={{
                                        color: 'var(--color-brand-forrest)',
                                        marginBottom: '2rem',
                                        fontSize: '1.2rem',
                                        opacity: 0.9,
                                        fontFamily: 'var(--font-serif-accent)', // Lora
                                        fontWeight: 400 // Regular
                                    }}>
                                        <Link
                                            to={`/book/${book!.slug}/`}
                                            state={{ from: { label: collection.title, path: `/collections/${collection.slug}` } }}
                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                        >
                                            {book!.author}
                                        </Link>
                                    </h3>

                                    {/* Curator Title / Teaser Title */}
                                    {(book!.teaserTitle || book!.curatorTitle) && (
                                        <h4 style={{
                                            fontSize: '1.25rem',
                                            fontWeight: 700,
                                            fontFamily: 'var(--font-serif-accent)',
                                            color: 'var(--color-brand-forrest)', // Updated to Forrest
                                            marginBottom: '0.75rem',
                                            lineHeight: 1.3
                                        }}>
                                            {book!.teaserTitle || book!.curatorTitle}
                                        </h4>
                                    )}

                                    {/* Description / Teaser */}
                                    <p style={{
                                        fontSize: '1rem',
                                        lineHeight: 1.6,
                                        color: 'var(--color-brand-slate)',
                                        marginBottom: '1.5rem',
                                        fontFamily: 'var(--font-body)',
                                        opacity: 0.9
                                    }}>
                                        {book!.teaser || book!.cardOverview || book!.description.substring(0, 180) + "..."}
                                    </p>

                                    {/* Read More Button */}
                                    <div style={{ marginTop: 'auto', width: '100%' }}> {/* Push to bottom and full width */}
                                        <Link
                                            to={`/book/${book!.slug}/`}
                                            state={{ from: { label: collection.title, path: `/collections/${collection.slug}` } }}
                                            style={{
                                                display: 'flex', // Changed to flex for centering
                                                justifyContent: 'center', // Center text horizontally
                                                alignItems: 'center',
                                                width: '100%', // Full width
                                                color: 'white',
                                                fontSize: '1rem',
                                                fontWeight: 400,
                                                fontFamily: 'var(--font-serif-accent)',
                                                textDecoration: 'none',
                                                textAlign: 'center', // Ensure multi-line text is centered
                                                backgroundColor: 'var(--color-brand-coral)',
                                                padding: '0.75rem 2rem',
                                                borderRadius: '2rem',
                                                transition: 'all 0.2s ease',
                                                boxSizing: 'border-box', // Ensure padding doesn't overflow width
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }}
                                        >
                                            Read Full Review + Soundcheck <span style={{ fontSize: '1.1em', lineHeight: 1, fontFamily: 'var(--font-body)' }}>&rarr;</span>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Style for mobile responsiveness */}
            <style>{`
            @media (max-width: 900px) {
                .collection-grid {
                    grid-template-columns: 1fr !important;
                    gap: 5rem !important; /* Larger gap for vertical scroll feel */
                }
                
                .page-container {
                    padding: 0 1.5rem !important;
                }
            }
            `}</style>
        </div >
    );
};
