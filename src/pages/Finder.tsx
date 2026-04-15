import { useRef, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { books } from '../data/books';
import { BookGrid } from '../components/BookGrid';
import { FilterBar } from '../components/FilterBar';
import { SEO } from '../components/SEO';
import { useSetHeaderTheme } from '../context/HeaderContext';

export const Finder = () => {
    useSetHeaderTheme({
        logoColor: 'var(--color-brand-coral)',
        textColor: 'var(--color-brand-coral)',
        hamburgerColor: 'var(--color-brand-coral)',
        activeLink: 'finder',
        activeLinkBg: 'var(--color-brand-coral)',
        activeLinkText: 'var(--color-brand-forrest)'
    });

    const [searchParams, setSearchParams] = useSearchParams();
    const heroImageRef = useRef<HTMLImageElement>(null);

    // 1. Get State from URL (Single Source of Truth)
    const selectedGenre = searchParams.get('genre') || 'All';
    const minLength = Number(searchParams.get('length')) || 10;
    const sortBy = (searchParams.get('sort') as 'default' | 'length-desc' | 'length-asc') || 'length-desc';
    const searchTerm = searchParams.get('q') || '';

    // 2. Handlers to Update URL
    const updateParams = (key: string, value: string | number) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            if (value === 'All' || value === 10 || value === 'length-desc' || value === '') {
                newParams.delete(key);
            } else {
                newParams.set(key, String(value));
            }
            return newParams;
        }, { replace: false });
    };

    const handleGenreChange = (genre: string) => {
        updateParams('genre', genre);
    };

    const handleClearAll = () => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.delete('genre');
            newParams.delete('length');
            newParams.delete('sort');
            newParams.delete('q');
            return newParams;
        }, { replace: false });
    };

    // 3. Filtering Logic
    const filteredBooks = useMemo(() => {
        const result = books.filter(book => {
            const matchesGenre = selectedGenre === 'All' ||
                (Array.isArray(book.genre)
                    ? book.genre.includes(selectedGenre)
                    : book.genre === selectedGenre);

            const matchesLength = book.lengthHours >= minLength;
            const matchesSearch =
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (book.narrator && book.narrator?.toLowerCase().includes(searchTerm.toLowerCase()));

            return matchesGenre && matchesLength && matchesSearch;
        });

        if (sortBy === 'length-desc') {
            result.sort((a, b) => b.lengthHours - a.lengthHours);
        } else if (sortBy === 'length-asc') {
            result.sort((a, b) => a.lengthHours - b.lengthHours);
        }

        return result;
    }, [selectedGenre, minLength, sortBy, searchTerm]);

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

    // Scroll-to helper for chevron
    const scrollToContent = () => {
        const content = document.getElementById('finder-content');
        if (content) {
            content.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <SEO
                title="Long Book Finder Tool | TLBC"
                description="Filter, sort, and search our entire catalog of long audiobooks. Find your next 20+ hour listen by genre, length, or narrator."
                canonical="https://thelongbookclub.com/long-book-finder"
                themeColor="#eae8da"
            />

            {/* Custom Finder Hero (Matches Genre Page Style) */}
            <section style={{
                position: 'relative',
                width: '100%',
                minHeight: '600px', // Matches Journal
                padding: '11rem 1rem 8rem 1rem', // Matches Journal
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                backgroundColor: '#eae8da',
                marginBottom: '2rem',
                overflow: 'hidden'
            }}>
                <style>{`
                    @keyframes hero-intro-scale {
                        from { transform: scale(1.3); }
                        to { transform: scale(1); }
                    }
                `}</style>
                {/* Background Image Wrapper (Intro Animation) */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    animation: 'hero-intro-scale 2.5s cubic-bezier(0.19, 1, 0.22, 1) forwards',
                    overflow: 'hidden'
                }}>
                    <img
                        ref={heroImageRef}
                        src="/assets/collections-hero-images/LongBookClub-Forrest-Hero-Image-01.gif"
                        alt=""
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            willChange: 'transform',
                            transition: 'transform 0.1s linear',
                            filter: 'brightness(0.65)' // Darken for legibility
                        }}
                    />
                </div>

                {/* Mask for Curved Bottom */}
                <div style={{
                    position: 'absolute',
                    bottom: -1.5, // Sub-pixel nudge
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
                <div style={{ 
                    position: 'relative', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    maxWidth: '800px',
                    width: '100%',
                    padding: '0 1.5rem' // Side padding for text safety
                }}>

                    {/* Top Graphic */}
                    <div style={{
                        width: '50px',
                        maxWidth: '90vw',
                        height: '50px',
                        backgroundColor: 'var(--color-brand-coral)',
                        maskImage: 'url("/assets/mag-gfx.svg")',
                        WebkitMaskImage: 'url("/assets/mag-gfx.svg")',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center',
                        marginBottom: '1rem',
                        marginTop: '0',
                        position: 'relative',
                        mixBlendMode: 'color-dodge',
                        opacity: 0.88,
                        zIndex: 2
                    }} />

                    {/* H1 Headline */}
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '4.5rem', // Matches Journal
                        color: 'var(--color-brand-coral)',
                        marginBottom: '1rem',
                        lineHeight: 1.05,
                        fontWeight: 400,
                        opacity: 0.88,
                        position: 'relative',
                        mixBlendMode: 'color-dodge',
                        zIndex: 2
                    }}>
                        Long Book<br />Finder
                    </h1>

                    {/* Divider */}
                    <div style={{
                        width: '50px',
                        height: '1px',
                        backgroundColor: 'var(--color-brand-coral)',
                        margin: '1.5rem auto',
                        opacity: 0.6,
                        position: 'relative',
                        mixBlendMode: 'color-dodge',
                        zIndex: 2
                    }} />

                    {/* Intro Paragraph */}
                    <p style={{
                        fontFamily: 'var(--font-serif-accent)',
                        fontSize: '1.4rem', // Matches Journal
                        color: 'var(--color-brand-coral)',
                        maxWidth: '660px',
                        margin: '0 auto',
                        lineHeight: 1.6,
                        opacity: 0.95,
                        position: 'relative',
                        mixBlendMode: 'color-dodge',
                        zIndex: 2
                    }}>
                        Use the search tool below to search by length, genre, author and even narrator. Your next long-listen is waiting to be discovered.
                    </p>

                    <div
                        onClick={scrollToContent}
                        style={{
                            marginTop: '3rem',
                            cursor: 'pointer',
                            opacity: 0.8,
                            animation: 'bounce 2s infinite',
                            position: 'relative',
                            zIndex: 2
                        }}>
                        <img
                            src="/assets/down-chevron.svg"
                            alt="Scroll Down"
                            style={{
                                width: '48px',
                                height: 'auto',
                                filter: 'brightness(0) saturate(100%) invert(51%) sepia(60%) saturate(1514%) hue-rotate(330deg) brightness(102%) contrast(101%)'
                            }}
                        />
                    </div>
                </div>
            </section>

            <div className="page-container" id="finder-content" style={{ paddingTop: '1rem' }}>


                <FilterBar
                    selectedGenre={selectedGenre}
                    onGenreChange={handleGenreChange}
                    minLength={minLength}
                    onLengthChange={(len) => updateParams('length', len)}
                    sortBy={sortBy}
                    onSortChange={(sort) => updateParams('sort', sort)}
                    searchTerm={searchTerm}
                    onSearchChange={(term) => updateParams('q', term)}
                    onClearAll={handleClearAll}
                />

                <BookGrid
                    books={filteredBooks}
                    showCollections={false} // Don't show collections here, just books
                />

                {/* SEO Content Section for Google */}
                <div style={{
                    maxWidth: '800px',
                    margin: '4rem auto 2rem auto',
                    padding: '2rem 1.5rem',
                    color: 'var(--color-brand-forrest)',
                    textAlign: 'center'
                }}>
                    <h2 style={{
                        fontFamily: 'var(--font-serif-accent)', // Lora
                        fontSize: 'clamp(2.2rem, 4vw, 2.8rem)',
                        marginBottom: '1.5rem',
                        lineHeight: 1.2,
                        color: 'var(--color-brand-coral)',
                        fontWeight: 400
                    }}>
                        How to find the perfect Long Book
                    </h2>
                    <p style={{
                        fontFamily: 'var(--font-serif-accent)',
                        fontSize: '1.2rem',
                        lineHeight: 1.7,
                        marginBottom: '1.5rem'
                    }}>
                        Welcome to the ultimate tool for discovering the best long audiobooks on the market. At The Long Book Club, we believe that an audiobook should be an investment—not just in money or Audible credits, but in time. Whether you are preparing for a massive cross-country road trip, training for a marathon, or simply looking to escape into a thick, immersive world, sometimes a standard 10-hour book just isn't enough.
                    </p>
                    <p style={{
                        fontFamily: 'var(--font-serif-accent)',
                        fontSize: '1.2rem',
                        lineHeight: 1.7,
                        marginBottom: '1.5rem'
                    }}>
                        Our hand-curated library guarantees that every single listen here offers exceptional value. Use the filters above to navigate our catalog of epic-length listens. You can sort by total listening time to uncover massive 40, 50, and 60-hour behemoths, filter seamlessly by your preferred genre, or search directly for specific authors and beloved narrators.
                    </p>
                    <p style={{
                        fontFamily: 'var(--font-serif-accent)',
                        fontSize: '1.2rem',
                        lineHeight: 1.7,
                        marginBottom: '0'
                    }}>
                        From staggering high fantasy sagas and deep-dive historical biographies, to terrifying uncut Stephen King horror classics, the Long Audiobook Finder ensures your credits stretch further, pulling you into entirely new, fully-realised worlds for weeks at a time.
                    </p>
                </div>
            </div>
        </div>
    );
};
