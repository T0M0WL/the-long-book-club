import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { BookCard } from './BookCard';
import { books } from '../data/books';

type TabKey = 'titans' | 'favorites' | 'newest';

export const HallOfFameCarousel = () => {
    const cardWidth = 300;
    const gap = 67;
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<TabKey>('titans');

    // 1. Calculate dynamic max hours for Titans tab
    const maxHours = useMemo(() => {
        return Math.round(Math.max(...books.map(b => b.lengthHours || 0)));
    }, []);

    // 2. Tab Datasets (10 books each)
    // Tab 1: The Titans (60h - maxHours)
    const titansBooks = useMemo(() => {
        return [...books]
            .filter(b => (b.lengthHours || 0) >= 60)
            .sort((a, b) => (b.lengthHours || 0) - (a.lengthHours || 0))
            .slice(0, 10);
    }, []);

    // Tab 2: Epic Fan Favorites (30h - 58h iconic masterpieces)
    const FAVORITE_IDS = ['1', '5', '8', '6', '7', '18', '19', '11', '12', '2'];
    const favoritesBooks = useMemo(() => {
        const mapped = FAVORITE_IDS.map(id => books.find(b => b.id === id)).filter(Boolean) as typeof books;
        if (mapped.length >= 10) return mapped.slice(0, 10);
        const others = books.filter(b => (b.lengthHours || 0) >= 30 && (b.lengthHours || 0) <= 58 && !mapped.some(m => m.id === b.id));
        return [...mapped, ...others].slice(0, 10);
    }, []);

    // Tab 3: Newly Inducted (Most recently added 10 books with min 30 hours)
    const newestBooks = useMemo(() => {
        return [...books]
            .filter(b => (b.lengthHours || 0) >= 30)
            .slice(-10)
            .reverse();
    }, []);

    // Active 10 books
    const topBooks = useMemo(() => {
        if (activeTab === 'favorites') return favoritesBooks;
        if (activeTab === 'newest') return newestBooks;
        return titansBooks;
    }, [activeTab, titansBooks, favoritesBooks, newestBooks]);

    // Infinite loop triple array
    const displayBooks = useMemo(() => [...topBooks, ...topBooks, ...topBooks], [topBooks]);

    const [currentIndex, setCurrentIndex] = useState(topBooks.length);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [containerWidth, setContainerWidth] = useState(window.innerWidth);

    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [gestureLock, setGestureLock] = useState(false);

    const minSwipeDistance = 40;

    // Handle tab change: smoothly reset carousel to center
    const handleTabChange = (tab: TabKey) => {
        if (tab === activeTab) return;
        setIsTransitioning(false);
        setActiveTab(tab);
        setCurrentIndex(topBooks.length);
    };

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            } else {
                setContainerWidth(window.innerWidth);
            }

            if (window.innerWidth < 1100) {
                setItemsPerPage(1);
            } else if (window.innerWidth < 1500) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        const timer = setTimeout(handleResize, 100);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    }, []);

    const nextSlide = useCallback(() => {
        if (!isTransitioning || gestureLock) return;
        setCurrentIndex(prev => prev + 1);
        setGestureLock(true);
    }, [isTransitioning, gestureLock]);

    const prevSlide = useCallback(() => {
        if (!isTransitioning || gestureLock) return;
        setCurrentIndex(prev => prev - 1);
        setGestureLock(true);
    }, [isTransitioning, gestureLock]);

    useEffect(() => {
        if (gestureLock) {
            const timer = setTimeout(() => setGestureLock(false), 350); 
            return () => clearTimeout(timer);
        }
    }, [gestureLock]);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaX) > 25) {
                if (e.deltaX > 25) {
                    nextSlide();
                } else if (e.deltaX < -25) {
                    prevSlide();
                }
            }
        };

        const currentRef = containerRef.current;
        if (currentRef) {
            currentRef.addEventListener('wheel', handleWheel, { passive: true });
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('wheel', handleWheel);
            }
        };
    }, [nextSlide, prevSlide]);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextSlide();
        } else if (isRightSwipe) {
            prevSlide();
        }
    };

    const handleTransitionEnd = () => {
        if (currentIndex >= topBooks.length * 2) {
            setIsTransitioning(false);
            setCurrentIndex(currentIndex - topBooks.length);
        } else if (currentIndex < topBooks.length) {
            setIsTransitioning(false);
            setCurrentIndex(currentIndex + topBooks.length);
        }
    };

    useEffect(() => {
        if (!isTransitioning) {
            const timer = setTimeout(() => setIsTransitioning(true), 50);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    const totalActiveWidth = itemsPerPage * cardWidth + (itemsPerPage - 1) * gap;
    const middleOfActiveIndex = currentIndex + (itemsPerPage - 1) / 2;
    const centerOfItemBlock = (middleOfActiveIndex * (cardWidth + gap)) + (cardWidth / 2);
    const translateX = (containerWidth / 2) - centerOfItemBlock;

    const ChevronArrow = ({ direction }: { direction: 'left' | 'right' }) => (
        <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-brand-coral)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s, background-color 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            color: '#ffffff'
        }}>
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                    display: 'block',
                    marginLeft: direction === 'left' ? '-2px' : '2px'
                }}
            >
                {direction === 'left' ? (
                    <polyline points="15 18 9 12 15 6" />
                ) : (
                    <polyline points="9 18 15 12 9 6" />
                )}
            </svg>
        </div>
    );

    return (
        <div 
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ 
                paddingTop: 'calc(6rem + 20px)',
                paddingBottom: 'calc(6rem + 50px)', 
                position: 'relative', 
                width: '100%',
                overflow: 'hidden',
                touchAction: 'pan-y' 
            }}
        >
            <style>{`
                .hof-tab-btn {
                    border-radius: 100px;
                    padding: 0.8rem 1.6rem;
                    font-family: var(--font-serif-accent);
                    font-size: clamp(0.95rem, 1.2vw, 1.05rem);
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border: 2px solid var(--color-brand-forrest);
                    background: transparent;
                    color: var(--color-brand-forrest);
                    outline: none;
                    white-space: nowrap;
                    line-height: 1;
                    font-weight: 500;
                }

                .hof-tab-btn:hover {
                    background: rgba(44, 81, 67, 0.08);
                }

                .hof-tab-btn.active {
                    background: var(--color-brand-coral);
                    color: #ffffff;
                    border-color: var(--color-brand-coral);
                    box-shadow: 0 4px 12px rgba(224, 90, 71, 0.25);
                    font-weight: 600;
                }

                .hof-tab-btn.active:hover {
                    background: #cc563b;
                    border-color: #cc563b;
                }
            `}</style>

            {/* Branded Section Header */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '4rem',
                padding: '0 1rem'
            }}>
                {/* Branding Icon */}
                <div style={{
                    width: 'clamp(48px, 6vw, 72px)',
                    height: 'clamp(39px, 4.8vw, 59px)',
                    backgroundColor: 'var(--color-brand-forrest)',
                    maskImage: 'url("/assets/LBC_HallOfFame.svg")',
                    WebkitMaskImage: 'url("/assets/LBC_HallOfFame.svg")',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    maskSize: 'contain',
                    marginBottom: '1.5rem'
                }} />

                <h2 style={{
                    fontFamily: 'Lora, Georgia, serif',
                    fontStyle: 'italic',
                    color: 'var(--color-brand-forrest)',
                    fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                    marginBottom: '1.25rem',
                    fontWeight: 400,
                    textAlign: 'center',
                    lineHeight: 1.15
                }}>
                    Long Book Club Hall of Fame
                </h2>

                {/* Decorative Divider */}
                <div style={{
                    width: '60px',
                    height: '1px',
                    backgroundColor: 'var(--color-brand-forrest)',
                    opacity: 0.8,
                    marginBottom: '1.25rem'
                }} />

                {/* Editorial Tagline */}
                <p style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-brand-forrest)',
                    fontSize: '1.1rem',
                    textAlign: 'center',
                    maxWidth: '600px',
                    margin: '0 auto',
                    opacity: 0.9,
                    lineHeight: 1.4
                }}>
                    {activeTab === 'titans' && (
                        <>The definitive Top 10 longest audiobooks<br />that your credits can get you.</>
                    )}
                    {activeTab === 'favorites' && (
                        <>The most acclaimed 30+ hour masterpieces<br />beloved by our listener community.</>
                    )}
                    {activeTab === 'newest' && (
                        <>The 10 latest 30+ hour epics<br />inducted into The Long Book Club library.</>
                    )}
                </p>

                {/* 3 Showcase Tabs */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.85rem',
                    flexWrap: 'wrap',
                    marginTop: '2rem'
                }}>
                    <button
                        type="button"
                        onClick={() => handleTabChange('titans')}
                        className={`hof-tab-btn ${activeTab === 'titans' ? 'active' : ''}`}
                    >
                        The Titans (60h – {maxHours}h)
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTabChange('favorites')}
                        className={`hof-tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
                    >
                        Epic Fan Favorites (30h – 55h)
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTabChange('newest')}
                        className={`hof-tab-btn ${activeTab === 'newest' ? 'active' : ''}`}
                    >
                        Newly Inducted
                    </button>
                </div>
            </div>

            {/* Carousel Slider Track */}
            <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                minHeight: '520px',
                paddingTop: '20px'
            }}>
                <div 
                    onTransitionEnd={handleTransitionEnd}
                    style={{
                        display: 'flex',
                        gap: `${gap}px`,
                        transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                        transform: `translateX(${translateX}px)`,
                        width: 'max-content'
                    }}
                >
                    {displayBooks.map((book, idx) => {
                        const isActive = idx >= currentIndex && idx < currentIndex + itemsPerPage;
                        const rankNumber = (idx % topBooks.length) + 1;
                        return (
                            <div 
                                key={`${book.id}-${idx}-${activeTab}`} 
                                style={{ 
                                    width: `${cardWidth}px`, 
                                    flexShrink: 0,
                                    opacity: isActive ? 1 : 0.45,
                                    transition: isTransitioning ? 'opacity 0.6s ease-in-out' : 'none'
                                }}
                            >
                                <BookCard book={book} rank={rankNumber} />
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={prevSlide}
                    aria-label="Previous Slide"
                    style={{
                        position: 'absolute',
                        left: `calc(50% - ${totalActiveWidth / 2}px - ${gap / 2}px)`,
                        top: 'calc(50% + 17px)',
                        transform: 'translate(-50%, -50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        zIndex: 20
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'}
                >
                    <ChevronArrow direction="left" />
                </button>
                <button
                    onClick={nextSlide}
                    aria-label="Next Slide"
                    style={{
                        position: 'absolute',
                        right: `calc(50% - ${totalActiveWidth / 2}px - ${gap / 2}px)`,
                        top: 'calc(50% + 17px)',
                        transform: 'translate(50%, -50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        zIndex: 20
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(50%, -50%) scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(50%, -50%) scale(1)'}
                >
                    <ChevronArrow direction="right" />
                </button>
            </div>
        </div>
    );
};
