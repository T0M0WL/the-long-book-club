import { useParams, Link, Navigate } from 'react-router-dom';
import { books } from '../data/books';
import { BookGrid } from '../components/BookGrid';
import { SEO } from '../components/SEO';
import { getAuthorBySlug } from '../utils/creatorUtils';
import { useEffect, useRef } from 'react';
import { useSetHeaderTheme } from '../context/HeaderContext';

export const AuthorDetail = () => {
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

    const author = slug ? getAuthorBySlug(slug, books, 1) : undefined;

    // Single-book authors automatically route to their individual book page
    if (author && author.bookCount === 1 && author.books[0]?.slug) {
        return <Navigate to={`/book/${author.books[0].slug}/`} replace />;
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

    if (!author || author.books.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '8rem 1rem', color: 'var(--color-brand-forrest)' }}>
                <SEO title="Author Not Found" />
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '1rem' }}>Author Not Found</h2>
                <p style={{ fontFamily: 'var(--font-serif-accent)', fontSize: '1.2rem', marginBottom: '2rem' }}>
                    We only create bespoke hubs for authors with 2 or more long-form audiobooks in our library.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/authors/" style={{ color: 'var(--color-brand-coral)', textDecoration: 'underline' }}>Browse All Authors</Link>
                    <span style={{ opacity: 0.5 }}>•</span>
                    <Link to="/" style={{ color: 'var(--color-brand-coral)', textDecoration: 'underline' }}>Return Home</Link>
                </div>
            </div>
        );
    }

    const pageTitle = `${author.name} Audiobooks Over 20 Hours`;
    const seoDescription = `Discover the best, longest audiobooks by ${author.name}. Explore ${author.bookCount} epic listens totaling over ${Math.floor(author.totalHours)} hours of immersive storytelling, complete with narration reviews and soundchecks.`;
    const canonicalUrl = `https://thelongbookclub.com/author/${author.slug}/`;

    const scrollToContent = () => {
        const content = document.getElementById('author-content');
        if (content) {
            content.scrollIntoView({ behavior: 'smooth' });
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
            name: author.name
        },
        mainEntity: {
            '@type': 'ItemList',
            numberOfItems: author.bookCount,
            itemListElement: author.books.map((b, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'Audiobook',
                    name: b.title,
                    author: {
                        '@type': 'Person',
                        name: b.author
                    },
                    url: `https://thelongbookclub.com/book/${b.slug || b.id}/`
                }
            }))
        }
    });

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <SEO
                title={pageTitle}
                description={seoDescription}
                canonical={canonicalUrl}
                themeColor="#eae8da"
                schema={schemaData}
            />

            {/* Custom Author Hero */}
            <section style={{
                position: 'relative',
                width: '100%',
                minHeight: '600px',
                padding: '8rem 1rem 8rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                backgroundColor: '#eae8da',
                marginBottom: '2rem',
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

                {/* Mask for Curved Bottom */}
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
                    {/* Author Pill */}
                    <div style={{
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
                        marginBottom: '3.5rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        Author Hub
                    </div>

                    {/* H1 Headline */}
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                        color: 'var(--color-brand-forrest)',
                        marginBottom: '1rem',
                        lineHeight: 1.05,
                        fontWeight: 400,
                        opacity: 0.88
                    }}>
                        {author.name}
                    </h1>

                    {/* Divider */}
                    <div style={{
                        width: '50px',
                        height: '1px',
                        backgroundColor: 'var(--color-brand-forrest)',
                        margin: '1.5rem auto',
                        opacity: 0.6
                    }} />

                    {/* Intro */}
                    <p style={{
                        fontFamily: 'var(--font-serif-accent)',
                        fontSize: '1.35rem',
                        color: 'var(--color-brand-forrest)',
                        maxWidth: '620px',
                        margin: '0 auto',
                        lineHeight: 1.6,
                        opacity: 0.95
                    }}>
                        Every long-listen edition by {author.name} in our collection, curated for expansive storytelling, deep worldbuilding, and maximum credit value.
                    </p>

                    {/* Chevron */}
                    <div
                        onClick={scrollToContent}
                        style={{
                            marginTop: '3rem',
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

            <div className="page-container" id="author-content" style={{ paddingTop: '2.5rem', scrollMarginTop: '2rem', textAlign: 'center' }}>
                {/* Stats in 2 Lines, Double Size Lora Italic with Bold Italic Numbers */}
                <p style={{
                    fontFamily: 'var(--font-serif-accent), Lora, Georgia, serif',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)',
                    color: 'var(--color-brand-forrest)',
                    margin: '0 auto 2rem auto',
                    lineHeight: 1.35
                }}>
                    <span style={{ fontWeight: 700, fontStyle: 'italic' }}>{author.bookCount}</span> {author.bookCount === 1 ? 'audiobook' : 'audiobooks'}
                    <br />
                    Over <span style={{ fontWeight: 700, fontStyle: 'italic' }}>{Math.floor(author.totalHours)}</span> hours of listening
                </p>

                {/* Small horizontal divide line */}
                <div style={{
                    width: '50px',
                    height: '1px',
                    backgroundColor: 'var(--color-brand-forrest)',
                    margin: '0 auto 3.5rem auto',
                    opacity: 0.6
                }} />

                <div style={{ textAlign: 'left' }}>
                    <BookGrid books={author.books} />
                </div>
            </div>
        </div>
    );
};
