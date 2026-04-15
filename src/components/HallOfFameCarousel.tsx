import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { BookCard } from './BookCard';
import { baseBooks } from '../data/books';

export const HallOfFameCarousel = () => {
    const cardWidth = 300;
    const gap = 67;
    const containerRef = useRef<HTMLDivElement>(null);

    // Get top 10 longest books
    const topBooks = useMemo(() => {
        return [...baseBooks]
            .sort((a, b) => (b.lengthHours || 0) - (a.lengthHours || 0))
            .slice(0, 10);
    }, []);

    const displayBooks = useMemo(() => [...topBooks, ...topBooks, ...topBooks], [topBooks]);

    const [currentIndex, setCurrentIndex] = useState(topBooks.length);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [containerWidth, setContainerWidth] = useState(window.innerWidth);

    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [gestureLock, setGestureLock] = useState(false);

    const minSwipeDistance = 40;

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
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-brand-coral)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s'
        }}>
            <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'var(--color-brand-cloud)', 
                maskImage: 'url("/assets/down-chevron.svg")',
                WebkitMaskImage: 'url("/assets/down-chevron.svg")',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                maskSize: 'contain',
                transform: direction === 'left' ? 'rotate(90deg)' : 'rotate(-90deg)'
            }} />
        </div>
    );

    return (
        <div 
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ 
                paddingTop: 'calc(6rem + 30px)', // Reduced by 20px
                paddingBottom: 'calc(6rem + 50px)', 
                position: 'relative', 
                width: '100%',
                overflow: 'hidden',
                touchAction: 'pan-y' 
            }}
        >
            {/* Branded Section Header */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '5rem'
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
                    fontFamily: 'var(--font-serif-accent)',
                    color: 'var(--color-brand-forrest)',
                    fontSize: '2rem',
                    marginBottom: '1.25rem',
                    fontWeight: 400,
                    textAlign: 'center',
                    lineHeight: 1
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
                    The definitive Top 10 longest audiobooks<br />
                    that your credits can get you.
                </p>
            </div>

            <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                minHeight: '500px'
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
                        return (
                            <div 
                                key={`${book.id}-${idx}`} 
                                style={{ 
                                    width: `${cardWidth}px`, 
                                    flexShrink: 0,
                                    opacity: isActive ? 1 : 0.5,
                                    transition: isTransitioning ? 'opacity 0.6s ease-in-out' : 'none'
                                }}
                            >
                                <BookCard book={book} />
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={prevSlide}
                    style={{
                        position: 'absolute',
                        left: `calc(50% - ${totalActiveWidth / 2}px - ${gap / 2}px)`,
                        top: '50%',
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
                    style={{
                        position: 'absolute',
                        right: `calc(50% - ${totalActiveWidth / 2}px - ${gap / 2}px)`,
                        top: '50%',
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
