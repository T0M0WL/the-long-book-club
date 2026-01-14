import { useParams, Navigate, Link } from 'react-router-dom';
import { collections } from '../data/collections';
import { books } from '../data/books';
import { FaClock } from 'react-icons/fa';
import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { slugify } from '../utils/slugify';

export const CollectionDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const collection = collections.find(c => c.slug === slug);

    if (!collection) {
        return <Navigate to="/collections" replace />;
    }

    // Resolve books
    const collectionBooks = collection.bookIds
        .map(id => books.find(b => b.id === id))
        .filter(b => b !== undefined);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <SEO
                title={collection.title}
                description={collection.description}
                canonical={`https://thelongbookclub.com/collections/${collection.slug}`}
                image={collection.coverUrl}
            />

            {/* Hero Section - Edge to Edge for specific collections */}
            {collection.slug === 'best-long-books-2025' ? (
                <>
                    <Hero
                        backgroundImage="/assets/collections-hero-images/LongBookClub-Forrest-Hero-Image-01.gif"
                        topGraphic="/assets/collections-hero-images/best-of-2025-icon.svg"
                        title="Best Long Books of 2025"
                        subtitle="A curated selection of the most immersive and standout long-form audiobooks released or celebrated in 2025."
                        useDynamicColor={false}
                        titleColor="white"
                        subtitleColor="white"
                        showLogo={false}
                        compactLogo={true}
                        showCornerGraphics={false} // Removed for cleaner look
                        overlayOpacity={0} // Matches Collections page
                        topGraphicBlendMode="overlay"
                        topGraphicFilter="brightness(0) invert(1)"
                        topGraphicOpacity={0.9}
                        contentBlendMode="overlay" // Matches Collections page
                        chevronBlendMode="overlay"
                    />
                </>
            ) : collection.slug === 'romantasy' ? (
                <>
                    <Hero
                        backgroundImage="/assets/collections-hero-images/LongBookClub-Collections-background-01.jpg"
                        topGraphic="/assets/collections-hero-images/romantasy-icon.svg"
                        topGraphicDimensions={{ height: 'clamp(128px, 25.5vw, 195px)' }} // ~1.5x size
                        title="Epic Romantasy Long Listens"
                        titleFontSize="clamp(5.8rem, 13.6vmin, 9.4rem)" // Reduced by 15%
                        subtitle={collection.description}
                        useDynamicColor={false}
                        titleColor="white"
                        subtitleColor="white"
                        showLogo={false}
                        compactLogo={true}
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
                        topGraphic="/assets/collections-hero-images/academia-collection-icon.svg"
                        title="Long, Dark Academia Listens"
                        titleFontSize="clamp(5.8rem, 13.5vmin, 9.5rem)"
                        subtitle={collection.description}
                        useDynamicColor={false}
                        titleColor="white"
                        subtitleColor="rgba(203, 214, 171, 0.5)" // Sage at 50% opacity
                        separatorColor="rgba(203, 214, 171, 0.5)" // Sage at 50% opacity
                        showLogo={false}
                        compactLogo={true}
                        showCornerGraphics={false}
                        overlayOpacity={0}
                        topGraphicBlendMode="overlay"
                        topGraphicFilter="brightness(0) invert(1)"
                        topGraphicOpacity={0.9}
                        contentBlendMode="normal"
                        titleBlendMode="overlay"
                        subtitleBlendMode="normal"
                        chevronColor="var(--color-brand-sage)"
                        chevronOpacity={0.5}
                    />
                </>
            ) : collection.slug === 'longest-ever' ? (
                <>
                    <Hero
                        backgroundImage="/assets/collections-hero-images/LongBookClub-Sage-Hero-Image-01.gif"
                        topGraphic="/assets/collections-hero-images/longest-ever-audiobooks-icon.svg"
                        topGraphicColor="var(--color-brand-forrest)"
                        title="The Longest Ever Audiobooks (60+ Hours)"
                        titleFontSize="clamp(5.1rem, 12vmin, 8.25rem)" // Reduced by 25%
                        subtitle={collection.description}
                        useDynamicColor={false}
                        titleColor="rgba(44, 81, 67, 0.8)"
                        subtitleColor="rgba(44, 81, 67, 0.8)"
                        separatorColor="rgba(44, 81, 67, 0.8)"
                        showLogo={false}
                        compactLogo={true}
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
                        topGraphic="/assets/collections-hero-images/long-life-icon.svg"
                        title="Long Life Stories"
                        subtitle={collection.description}
                        useDynamicColor={false}
                        titleColor="white"
                        subtitleColor="white"
                        showLogo={false}
                        compactLogo={true}
                        showCornerGraphics={false}
                        overlayOpacity={0}
                        topGraphicBlendMode="overlay"
                        topGraphicFilter="brightness(0) invert(1)"
                        topGraphicOpacity={0.9}
                        contentBlendMode="overlay"
                        chevronBlendMode="overlay"
                    />
                </>
            ) : collection.slug === 'bucket-list' ? (
                <>
                    <Hero
                        backgroundImage="/assets/collections-hero-images/LongBookClub-Slate-Hero-Image-01.gif"
                        topGraphic="/assets/collections-hero-images/bucket-list-icon.svg"
                        title="Bucket List Long Listens"
                        titleFontSize="clamp(5.8rem, 13.5vmin, 9.5rem)"
                        subtitle={collection.description}
                        useDynamicColor={false}
                        titleColor="white"
                        subtitleColor="rgba(203, 214, 171, 0.5)" // Sage at 50% opacity
                        separatorColor="rgba(203, 214, 171, 0.5)" // Sage at 50% opacity
                        showLogo={false}
                        compactLogo={true}
                        showCornerGraphics={false}
                        overlayOpacity={0}
                        topGraphicBlendMode="overlay"
                        topGraphicFilter="brightness(0) invert(1)"
                        topGraphicOpacity={0.9}
                        contentBlendMode="normal"
                        titleBlendMode="overlay"
                        subtitleBlendMode="normal"
                        chevronColor="var(--color-brand-sage)"
                        chevronOpacity={0.5}
                    />
                </>
            ) : (
                <div className="page-container" style={{ paddingTop: '0' }}>
                    <header style={{ marginBottom: '6rem', textAlign: 'center', paddingTop: '120px', paddingLeft: '1.5rem', paddingRight: '1.5rem', maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
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
                            {collection.description}
                        </p>
                    </header>
                </div>
            )}

            <div className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '1000px' }}>
                <div id="scroll-target" style={{ scrollMarginTop: '2rem', height: 0 }} />
                {/* <header> Removed moved to conditional above */}

                <div className="collection-list">
                    {collectionBooks.map((book, index) => (
                        <div key={book!.id} style={{ marginBottom: '8rem' }}>
                            <div className="book-details-grid" style={{
                                display: 'grid',
                                gridTemplateColumns: 'minmax(300px, 350px) 1fr',
                                gap: '4rem',
                                alignItems: 'start'
                            }}>
                                {/* Left Column: Cover & Meta & CTAs */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <div style={{ position: 'relative' }}>
                                        <img
                                            src={book!.coverUrl}
                                            alt={`Cover of ${book!.title}`}
                                            loading="lazy"
                                            style={{
                                                width: '100%',
                                                borderRadius: '12px',
                                                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
                                                border: '1px solid rgba(0,0,0,0.05)'
                                            }}
                                        />
                                        {/* Length Badge */}
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: '50%',
                                            transform: 'translate(-50%, 50%)',
                                            width: '100px',
                                            height: '100px',
                                            background: 'var(--color-brand-forrest)',
                                            border: '4px solid #fff',
                                            borderRadius: '50%',
                                            color: 'var(--color-brand-cloud)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                                            zIndex: 10,
                                            lineHeight: 1.2
                                        }}>
                                            <FaClock size={16} style={{ position: 'absolute', top: '22px' }} />
                                            <span style={{
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                fontFamily: 'Inter, sans-serif',
                                                marginTop: '10px'
                                            }}>{book!.length}</span>
                                        </div>
                                    </div>

                                    {/* CTAs */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', marginTop: '4rem' }}>
                                        <a
                                            href={book!.affiliateLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem',
                                                backgroundColor: 'var(--color-primary)',
                                                color: '#fff',
                                                padding: '1rem 1.5rem',
                                                borderRadius: '2rem',
                                                fontSize: '1rem',
                                                fontWeight: 600,
                                                textDecoration: 'none',
                                                transition: 'background-color 0.2s',
                                                width: '100%'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
                                        >
                                            <img src="/flags/uk.png" alt="UK" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: 'none' }} />
                                            Listen on Audible UK
                                            <img src="/audible-chevron.png" alt="" style={{ width: '21px', height: 'auto' }} />
                                        </a>

                                        {book!.affiliateLinkUS && (
                                            <a
                                                href={book!.affiliateLinkUS}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '0.5rem',
                                                    backgroundColor: 'var(--color-primary)',
                                                    color: '#fff',
                                                    padding: '1rem 1.5rem',
                                                    borderRadius: '2rem',
                                                    fontSize: '1rem',
                                                    fontWeight: 600,
                                                    textDecoration: 'none',
                                                    transition: 'background-color 0.2s',
                                                    width: '100%'
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
                                            >
                                                <img src="/flags/us.png" alt="US" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: 'none' }} />
                                                Listen on Audible US
                                                <img src="/audible-chevron.png" alt="" style={{ width: '21px', height: 'auto' }} />
                                            </a>
                                        )}
                                        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-brand-forrest)', fontWeight: 'bold', textAlign: 'center' }}>
                                            *A free trial is available for non members.
                                        </p>
                                    </div>
                                </div>

                                {/* Right Column: Content */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    textAlign: 'left'
                                }}>
                                    {/* Genre Pill */}
                                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                        {(Array.isArray(book!.genre) ? book!.genre : [book!.genre]).map((g, i) => (
                                            <Link key={i} to={`/genre/${slugify(g)}`} style={{ textDecoration: 'none' }}>
                                                <div style={{
                                                    display: 'inline-block',
                                                    padding: '0.25rem 0.75rem',
                                                    backgroundColor: 'var(--color-brand-forrest)',
                                                    color: 'var(--color-brand-cloud)',
                                                    borderRadius: '1rem',
                                                    fontSize: '0.75rem',
                                                    fontFamily: 'Inter, sans-serif',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.05em',
                                                    textTransform: 'uppercase',
                                                    transition: 'background-color 0.2s',
                                                }}
                                                    onMouseEnter={e => {
                                                        e.currentTarget.style.backgroundColor = '#2a4a3d';
                                                        e.currentTarget.style.color = 'var(--color-brand-coral-light)';
                                                    }}
                                                    onMouseLeave={e => {
                                                        e.currentTarget.style.backgroundColor = 'var(--color-brand-forrest)';
                                                        e.currentTarget.style.color = 'var(--color-brand-cloud)';
                                                    }}
                                                >
                                                    {g}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Titles */}
                                    <h2 style={{
                                        fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                                        marginBottom: '0.5rem',
                                        lineHeight: 1.1,
                                        fontFamily: 'var(--font-serif-accent)',
                                        color: 'var(--color-brand-forrest)',
                                        fontWeight: 700
                                    }}>
                                        {book!.title}
                                    </h2>
                                    <h3 style={{
                                        color: 'var(--color-brand-forrest)',
                                        marginBottom: '2.5rem',
                                        fontSize: '1.5rem'
                                    }}>
                                        {book!.author}
                                    </h3>

                                    {/* Curator Title (Catchy Headline) */}
                                    {book!.curatorTitle && (
                                        <h3 style={{
                                            fontSize: '1.5rem',
                                            fontWeight: 700,
                                            fontFamily: 'var(--font-serif-accent)',
                                            color: 'var(--color-brand-forrest)',
                                            marginBottom: '1.5rem',
                                            alignSelf: 'flex-start',
                                            textAlign: 'left',
                                            width: '100%'
                                        }}>
                                            {book!.curatorTitle}
                                        </h3>
                                    )}

                                    {/* New: Custom Collections Meta Block */}
                                    {(book!.narrator || book!.longBookClubTake || book!.curatorNote || book!.soundCheck) && (
                                        <div style={{
                                            marginBottom: '2.5rem',
                                            padding: '0',
                                            fontFamily: 'var(--font-body)',
                                            color: 'var(--color-brand-slate)'
                                        }}>
                                            {book!.narrator && (
                                                <div style={{ marginBottom: '0.75rem', fontSize: '1.1rem', lineHeight: '1.5' }}>
                                                    <strong style={{ color: 'var(--color-brand-forrest)' }}>Narrator:</strong> {book!.narrator}
                                                </div>
                                            )}
                                            <div style={{ marginBottom: '0.75rem', fontSize: '1.1rem', lineHeight: '1.5' }}>
                                                <strong style={{ color: 'var(--color-brand-forrest)' }}>Length:</strong> {book!.length}
                                            </div>
                                            {(book!.longBookClubTake || book!.curatorNote) && (
                                                <div
                                                    className="curator-note-content"
                                                    style={{ marginBottom: '0.75rem', fontSize: '1.1rem', lineHeight: '1.5' }}
                                                >
                                                    <strong style={{ color: 'var(--color-brand-forrest)' }}>The Long Book Club Take:</strong>
                                                    <span dangerouslySetInnerHTML={{ __html: ' ' + (book!.longBookClubTake || book!.curatorNote) }} />
                                                </div>
                                            )}
                                            {book!.soundCheck && (
                                                <div style={{ marginBottom: '0.75rem', fontSize: '1.1rem', lineHeight: '1.5' }}>
                                                    <strong style={{ color: 'var(--color-brand-forrest)' }}>Sound Check:</strong> {book!.soundCheck}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Publisher's Summary */}
                                    <h4 style={{
                                        color: 'var(--color-brand-forrest)',
                                        marginBottom: '1rem',
                                        alignSelf: 'flex-start',
                                        textAlign: 'left',
                                        width: '100%',
                                        fontSize: '1.1rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        fontWeight: 700
                                    }}>
                                        Publisher's Summary
                                    </h4>
                                    <p style={{
                                        fontSize: '1.05rem',
                                        lineHeight: 1.7,
                                        color: 'var(--color-brand-slate)',
                                        marginBottom: '3rem',
                                        fontFamily: 'var(--font-body)',
                                        maxWidth: '60ch',
                                        textAlign: 'left',
                                        alignSelf: 'flex-start',
                                        opacity: 0.9
                                    }}>
                                        {book!.description}
                                    </p>
                                </div>
                            </div>

                            {/* Divider Line (except for the last item) */}
                            {index < collectionBooks.length - 1 && (
                                <hr style={{
                                    border: 'none',
                                    borderTop: '1px solid var(--color-border)',
                                    margin: '6rem auto 0',
                                    width: '100%',
                                    opacity: 0.3
                                }} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Style for mobile responsiveness */}
            <style>{`
            @media (max-width: 850px) {
                .book-details-grid {
                    grid-template-columns: 1fr !important;
                    gap: 3rem !important;
                }
            }
            `}</style>
        </div>
    );
};
