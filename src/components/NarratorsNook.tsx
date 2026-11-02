import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { NOOK_STYLES } from '../data/narratorNookData';
import { isQualifyingNarrator } from '../utils/creatorUtils';
import { slugify } from '../utils/slugify';

const ACCENT_COLOR = '#dcd3b4';

export const NarratorsNook: React.FC = () => {
    const totalStyles = NOOK_STYLES.length;
    // Triple array for smooth infinite carousel looping
    const displaySlides = React.useMemo(() => [...NOOK_STYLES, ...NOOK_STYLES, ...NOOK_STYLES], []);

    const containerRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Carousel state
    const [currentIndex, setCurrentIndex] = useState(totalStyles); // start in middle group (index 7)
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [containerWidth, setContainerWidth] = useState(1200);
    const [gestureLock, setGestureLock] = useState(false);

    // Option A: Map of style index (0-6) -> selected narrator index (0-2)
    const [selectedNarrators, setSelectedNarrators] = useState<Record<number, number>>({
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0
    });

    // Audio player state
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [audioDuration, setAudioDuration] = useState(0);

    // Touch & drag state
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchEndX, setTouchEndX] = useState<number | null>(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [mouseStartX, setMouseStartX] = useState<number | null>(null);

    // Active style index normalized to 0..6
    const activeStyleIndex = ((currentIndex % totalStyles) + totalStyles) % totalStyles;
    const activeNarratorIndex = selectedNarrators[activeStyleIndex] ?? 0;
    const activeStyle = NOOK_STYLES[activeStyleIndex];
    const activeNarrator = activeStyle.narrators[activeNarratorIndex] || activeStyle.narrators[0];

    // Responsive dimensions
    const [cardWidth, setCardWidth] = useState(500);
    const [cardGap, setCardGap] = useState(36);
    const [badgeWidth, setBadgeWidth] = useState(105);
    const [badgeHeight, setBadgeHeight] = useState(125);

    useEffect(() => {
        const handleResize = () => {
            const width = containerRef.current?.offsetWidth || window.innerWidth;
            setContainerWidth(width);

            if (width < 640) {
                setCardWidth(Math.min(width - 24, 380));
                setCardGap(14);
                setBadgeWidth(85);
                setBadgeHeight(100);
            } else if (width < 1024) {
                setCardWidth(Math.min(width - 48, 440));
                setCardGap(24);
                setBadgeWidth(95);
                setBadgeHeight(115);
            } else {
                setCardWidth(500);
                setCardGap(36);
                setBadgeWidth(105);
                setBadgeHeight(125);
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

    // Pause audio whenever slide changes
    const pauseAudio = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }, []);

    // Slide navigation
    const nextSlide = useCallback(() => {
        if (!isTransitioning || gestureLock) return;
        pauseAudio();
        setCurrentIndex(prev => prev + 1);
        setGestureLock(true);
    }, [isTransitioning, gestureLock, pauseAudio]);

    const prevSlide = useCallback(() => {
        if (!isTransitioning || gestureLock) return;
        pauseAudio();
        setCurrentIndex(prev => prev - 1);
        setGestureLock(true);
    }, [isTransitioning, gestureLock, pauseAudio]);

    // Gesture unlock timer
    useEffect(() => {
        if (gestureLock) {
            const timer = setTimeout(() => setGestureLock(false), 350);
            return () => clearTimeout(timer);
        }
    }, [gestureLock]);

    // Loop reset on transition end
    const handleTransitionEnd = () => {
        if (currentIndex >= totalStyles * 2) {
            setIsTransitioning(false);
            setCurrentIndex(currentIndex - totalStyles);
        } else if (currentIndex < totalStyles) {
            setIsTransitioning(false);
            setCurrentIndex(currentIndex + totalStyles);
        }
    };

    useEffect(() => {
        if (!isTransitioning) {
            const timer = setTimeout(() => setIsTransitioning(true), 50);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    // Trackpad horizontal wheel support
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaX) > 28) {
                if (e.deltaX > 28) {
                    nextSlide();
                } else if (e.deltaX < -28) {
                    prevSlide();
                }
            }
        };

        const el = containerRef.current;
        if (el) {
            el.addEventListener('wheel', handleWheel, { passive: true });
        }
        return () => {
            if (el) {
                el.removeEventListener('wheel', handleWheel);
            }
        };
    }, [nextSlide, prevSlide]);

    // Touch swipe handlers
    const minSwipeDistance = 45;

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEndX(null);
        setTouchStartX(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEndX(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStartX || !touchEndX) return;
        const distance = touchStartX - touchEndX;
        if (distance > minSwipeDistance) {
            nextSlide();
        } else if (distance < -minSwipeDistance) {
            prevSlide();
        }
    };

    // Mouse drag handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsMouseDown(true);
        setMouseStartX(e.clientX);
    };

    const handleMouseMove = (_e: React.MouseEvent) => {
        if (!isMouseDown || mouseStartX === null) return;
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (!isMouseDown || mouseStartX === null) return;
        const diff = mouseStartX - e.clientX;
        if (diff > minSwipeDistance) {
            nextSlide();
        } else if (diff < -minSwipeDistance) {
            prevSlide();
        }
        setIsMouseDown(false);
        setMouseStartX(null);
    };

    // Audio handlers
    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(() => {
                setIsPlaying(false);
            });
        }
    };

    const handleNarratorChange = (styleIdx: number, narrIdx: number) => {
        setSelectedNarrators(prev => ({ ...prev, [styleIdx]: narrIdx }));
        const newNarrator = NOOK_STYLES[styleIdx].narrators[narrIdx];
        if (audioRef.current) {
            const wasPlaying = isPlaying;
            audioRef.current.pause();
            audioRef.current.src = newNarrator.audioPreviewUrl;
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
            if (wasPlaying) {
                audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
            } else {
                setIsPlaying(false);
            }
        }
    };

    const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const effectiveDuration = audioDuration || 30;
        const newTime = clickRatio * effectiveDuration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatAudioTime = (sec: number) => {
        if (!sec || isNaN(sec)) return '4.59';
        const mins = Math.floor(sec / 60);
        const secs = Math.floor(sec % 60);
        return `${mins}.${secs < 10 ? '0' : ''}${secs}`;
    };

    // Renders narrator name as clickable Link if qualifying page exists
    const renderNarratorLink = (name: string, isCenter: boolean) => {
        if (name.includes(' & ') || name.includes(', ')) {
            const parts = name.split(/( & |, )/);
            return (
                <span>
                    {parts.map((part, i) => {
                        if (part === ' & ' || part === ', ') {
                            return <span key={i}>{part}</span>;
                        }
                        const slug = slugify(part);
                        if (isQualifyingNarrator(part)) {
                            return (
                                <Link
                                    key={i}
                                    to={`/narrator/${slug}/`}
                                    onClick={(e) => {
                                        if (!isCenter) e.preventDefault();
                                    }}
                                    style={{
                                        color: ACCENT_COLOR,
                                        textDecoration: 'underline',
                                        textUnderlineOffset: '3px',
                                        transition: 'color 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-brand-coral)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = ACCENT_COLOR}
                                >
                                    {part}
                                </Link>
                            );
                        }
                        return <span key={i}>{part}</span>;
                    })}
                </span>
            );
        }

        const slug = slugify(name);
        if (isQualifyingNarrator(name)) {
            return (
                <Link
                    to={`/narrator/${slug}/`}
                    onClick={(e) => {
                        if (!isCenter) e.preventDefault();
                    }}
                    style={{
                        color: ACCENT_COLOR,
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                        transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-brand-coral)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = ACCENT_COLOR}
                >
                    {name}
                </Link>
            );
        }
        return <span>{name}</span>;
    };

    // Translate calculation: centers the active card perfectly
    const centerOffset = (containerWidth / 2) - (currentIndex * (cardWidth + cardGap) + cardWidth / 2);

    return (
        <div
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
                width: '100%',
                position: 'relative',
                paddingTop: 'calc(5rem + 15px)',
                paddingBottom: 'calc(4rem + 15px)',
                overflow: 'hidden',
                color: ACCENT_COLOR,
                userSelect: isMouseDown ? 'none' : 'auto'
            }}
        >
            <style>{`
                .nook-dimmed-card {
                    opacity: 0.35;
                    filter: grayscale(20%);
                    transform: scale(0.965);
                    cursor: pointer;
                    transition: opacity 0.4s ease, transform 0.4s ease, filter 0.4s ease, background-color 0.3s ease;
                }
                .nook-dimmed-card:hover {
                    opacity: 0.65 !important;
                    filter: grayscale(0%) !important;
                    transform: scale(0.98) !important;
                }
                .nook-arrow-btn {
                    background: none;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #dcd3b4;
                    cursor: pointer;
                    padding: 6px;
                    transition: transform 0.2s ease, color 0.2s ease, opacity 0.2s ease;
                    outline: none;
                    z-index: 25;
                    opacity: 0.85;
                }
                .nook-arrow-btn:hover {
                    transform: scale(1.2);
                    color: var(--color-brand-coral);
                    opacity: 1;
                }
                @media (max-width: 768px) {
                    .nook-arrow-btn {
                        display: none;
                    }
                }
            `}</style>

            {/* Hidden HTML Audio element for Soundcheck playback */}
            <audio
                ref={audioRef}
                src={activeNarrator.audioPreviewUrl}
                preload="metadata"
                onTimeUpdate={() => {
                    if (audioRef.current) {
                        setCurrentTime(audioRef.current.currentTime);
                    }
                }}
                onLoadedMetadata={() => {
                    if (audioRef.current) {
                        setAudioDuration(audioRef.current.duration);
                    }
                }}
                onEnded={() => {
                    setIsPlaying(false);
                    setCurrentTime(0);
                }}
            />

            {/* --- SECTION HEADER --- */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem', padding: '0 1.5rem' }}>
                {/* Microphone Icon in Brand Coral */}
                <div
                    style={{
                        width: '46px',
                        height: '56px',
                        backgroundColor: 'var(--color-brand-coral)',
                        maskImage: 'url("/assets/Narrator-hub-Graphics/mic-badge.svg")',
                        WebkitMaskImage: 'url("/assets/Narrator-hub-Graphics/mic-badge.svg")',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center',
                        margin: '0 auto 1.15rem auto',
                        filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))'
                    }}
                />

                <h2 style={{
                    fontFamily: 'Lora, Georgia, serif',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-brand-coral)',
                    margin: 0
                }}>
                    Narrators’ Nook
                </h2>
            </div>

            {/* --- CAROUSEL TRACK STAGE --- */}
            <div style={{
                position: 'relative',
                width: '100%',
                minHeight: '440px',
                display: 'flex',
                alignItems: 'center'
            }}>
                {/* Left Floating Arrow Button */}
                <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous narrator style"
                    className="nook-arrow-btn"
                    style={{
                        position: 'absolute',
                        left: `calc(50% - ${cardWidth / 2}px - 36px)`,
                        transform: 'translate(-50%, -50%)',
                        top: '50%'
                    }}
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                {/* Right Floating Arrow Button */}
                <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next narrator style"
                    className="nook-arrow-btn"
                    style={{
                        position: 'absolute',
                        right: `calc(50% - ${cardWidth / 2}px - 36px)`,
                        transform: 'translate(50%, -50%)',
                        top: '50%'
                    }}
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>

                {/* Carousel Track */}
                <div
                    onTransitionEnd={handleTransitionEnd}
                    style={{
                        display: 'flex',
                        gap: `${cardGap}px`,
                        transition: isTransitioning ? 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
                        transform: `translateX(${centerOffset}px)`,
                        width: 'max-content'
                    }}
                >
                    {displaySlides.map((slide, virtualIdx) => {
                        const styleIdx = virtualIdx % totalStyles;
                        const isCenter = virtualIdx === currentIndex;
                        const isPrev = virtualIdx === currentIndex - 1;
                        const isNext = virtualIdx === currentIndex + 1;
                        const currentNarrIndex = selectedNarrators[styleIdx] ?? 0;
                        const currentNarr = slide.narrators[currentNarrIndex] || slide.narrators[0];

                        // Effective progress ratio for scrubber
                        const effectiveDuration = audioDuration || 30;
                        const progressPercent = isCenter && isPlaying
                            ? Math.min(100, (currentTime / effectiveDuration) * 100)
                            : 0;

                        const nameWords = slide.name.split(' ');

                        return (
                            <div
                                key={`${slide.id}-${virtualIdx}`}
                                className={!isCenter ? 'nook-dimmed-card' : ''}
                                onClick={() => {
                                    if (isPrev) prevSlide();
                                    else if (isNext) nextSlide();
                                }}
                                style={{
                                    width: `${cardWidth}px`,
                                    flexShrink: 0,
                                    opacity: isCenter ? 1 : undefined,
                                    transform: isCenter ? 'scale(1)' : undefined,
                                    filter: isCenter ? 'none' : undefined,
                                    cursor: isCenter ? 'default' : 'pointer',
                                    padding: '1.8rem 2.2rem 2.8rem 2.2rem',
                                    backgroundColor: 'transparent',
                                    boxShadow: 'none',
                                    borderRight: isCenter ? '1px solid rgba(220, 211, 180, 0.25)' : 'none',
                                    borderLeft: isCenter ? '1px solid rgba(220, 211, 180, 0.25)' : 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    minHeight: '450px'
                                }}
                            >
                                <div>
                                    {/* --- 1. TOP ROW: SHIELD (+25% size, color #dcd3b4) + 2-LINE TITLE & INTRA REGULAR DESCRIPTION --- */}
                                    <div style={{
                                        display: 'flex',
                                        gap: '1.4rem',
                                        alignItems: 'flex-start',
                                        marginBottom: '2.2rem',
                                        textAlign: 'left'
                                    }}>
                                        {/* Badge Graphic Shield - Increased by 25% with #dcd3b4 color */}
                                        <div
                                            style={{
                                                width: `${badgeWidth}px`,
                                                height: `${badgeHeight}px`,
                                                flexShrink: 0,
                                                backgroundColor: ACCENT_COLOR,
                                                maskImage: `url("${slide.badgeSvg}")`,
                                                WebkitMaskImage: `url("${slide.badgeSvg}")`,
                                                maskSize: 'contain',
                                                WebkitMaskSize: 'contain',
                                                maskRepeat: 'no-repeat',
                                                WebkitMaskRepeat: 'no-repeat',
                                                maskPosition: 'center',
                                                WebkitMaskPosition: 'center',
                                                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.35))'
                                            }}
                                        />

                                        {/* Style Name (2 lines) & Description (Inter Regular, #dcd3b4) */}
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{
                                                fontFamily: 'var(--font-serif-accent)',
                                                fontStyle: 'italic',
                                                fontSize: 'clamp(1.75rem, 2.3vw, 2.25rem)',
                                                lineHeight: 1.05,
                                                color: 'var(--color-brand-coral)',
                                                margin: '0 0 0.55rem 0',
                                                fontWeight: 500,
                                                letterSpacing: '-0.01em'
                                            }}>
                                                {nameWords[0]}
                                                {nameWords.length > 1 && (
                                                    <>
                                                        <br />
                                                        {nameWords.slice(1).join(' ')}
                                                    </>
                                                )}
                                            </h3>
                                            <p style={{
                                                fontFamily: 'var(--font-body)', // Inter Regular
                                                fontWeight: 400,
                                                fontStyle: 'normal',
                                                fontSize: 'clamp(0.82rem, 0.98vw, 0.92rem)',
                                                lineHeight: 1.48,
                                                color: ACCENT_COLOR,
                                                margin: 0,
                                                opacity: 0.95
                                            }}>
                                                “{slide.description}”
                                            </p>
                                        </div>
                                    </div>

                                    {/* --- 2. SOUNDCHECK SECTION HEADER (Inter Bold, uppercase, Coral) --- */}
                                    <div style={{
                                        textAlign: 'center',
                                        fontFamily: 'var(--font-body)', // Inter Bold
                                        fontWeight: 700,
                                        fontSize: '0.82rem',
                                        letterSpacing: '0.16em',
                                        color: 'var(--color-brand-coral)',
                                        marginTop: '1.4rem',
                                        marginBottom: '1.4rem',
                                        textTransform: 'uppercase'
                                    }}>
                                        Soundcheck
                                    </div>

                                    {/* --- 3. 3 NARRATOR PILLS (Lora Italic) --- */}
                                    <div style={{
                                        display: 'flex',
                                        gap: '0.65rem',
                                        justifyContent: 'center',
                                        marginBottom: '2.2rem',
                                        flexWrap: 'wrap'
                                    }}>
                                        {slide.narrators.map((narr, nIdx) => {
                                            const isSelected = currentNarrIndex === nIdx;
                                            return (
                                                <button
                                                    key={narr.name}
                                                    type="button"
                                                    disabled={!isCenter}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleNarratorChange(styleIdx, nIdx);
                                                    }}
                                                    style={{
                                                        backgroundColor: isSelected
                                                            ? 'var(--color-brand-coral)'
                                                            : 'rgba(255, 107, 74, 0.16)',
                                                        color: isSelected ? '#ffffff' : 'var(--color-brand-coral)',
                                                        border: isSelected
                                                            ? '1px solid var(--color-brand-coral)'
                                                            : '1px solid rgba(255, 107, 74, 0.38)',
                                                        padding: '0.45rem 1.15rem',
                                                        borderRadius: '9999px',
                                                        fontSize: 'clamp(0.82rem, 1vw, 0.92rem)',
                                                        fontFamily: 'var(--font-serif-accent)', // Lora Italic
                                                        fontStyle: 'italic',
                                                        fontWeight: isSelected ? 600 : 400,
                                                        cursor: isCenter ? 'pointer' : 'default',
                                                        transition: 'all 0.2s ease',
                                                        boxShadow: isSelected
                                                            ? '0 3px 10px rgba(255, 107, 74, 0.35)'
                                                            : 'none',
                                                        outline: 'none'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (isCenter && !isSelected) {
                                                            e.currentTarget.style.backgroundColor = 'rgba(255, 107, 74, 0.28)';
                                                            e.currentTarget.style.color = '#ffffff';
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (isCenter && !isSelected) {
                                                            e.currentTarget.style.backgroundColor = 'rgba(255, 107, 74, 0.16)';
                                                            e.currentTarget.style.color = 'var(--color-brand-coral)';
                                                        }
                                                    }}
                                                >
                                                    {narr.name}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* --- 4. AUDIO PLAYER (Light elements in #dcd3b4, compact length) --- */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.85rem',
                                        width: '86%',
                                        maxWidth: '360px',
                                        margin: '0 auto 0.9rem auto'
                                    }}>
                                        {/* Play / Pause circular button in #dcd3b4 */}
                                        <button
                                            type="button"
                                            disabled={!isCenter}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                togglePlay();
                                            }}
                                            aria-label={isCenter && isPlaying ? 'Pause soundcheck' : 'Play soundcheck'}
                                            style={{
                                                width: '38px',
                                                height: '38px',
                                                borderRadius: '50%',
                                                backgroundColor: ACCENT_COLOR, // #dcd3b4
                                                border: 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: isCenter ? 'pointer' : 'default',
                                                flexShrink: 0,
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                                                transition: 'transform 0.15s ease, background-color 0.15s ease',
                                                outline: 'none'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (isCenter) e.currentTarget.style.transform = 'scale(1.08)';
                                            }}
                                            onMouseLeave={(e) => {
                                                if (isCenter) e.currentTarget.style.transform = 'scale(1)';
                                            }}
                                        >
                                            {isCenter && isPlaying ? (
                                                // Pause Icon
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-brand-coral)">
                                                    <rect x="6" y="4" width="4" height="16" rx="1.5" />
                                                    <rect x="14" y="4" width="4" height="16" rx="1.5" />
                                                </svg>
                                            ) : (
                                                // Play Icon
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-brand-coral)" style={{ marginLeft: '2px' }}>
                                                    <polygon points="5 3 19 12 5 21 5 3" />
                                                </svg>
                                            )}
                                        </button>

                                        {/* Scrubber Track in #dcd3b4 */}
                                        <div
                                            onClick={(e) => {
                                                if (isCenter) {
                                                    e.stopPropagation();
                                                    handleScrubberClick(e);
                                                }
                                            }}
                                            style={{
                                                flex: 1,
                                                height: '14px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                cursor: isCenter ? 'pointer' : 'default',
                                                position: 'relative'
                                            }}
                                        >
                                            <div style={{
                                                width: '100%',
                                                height: '3px',
                                                backgroundColor: 'rgba(220, 211, 180, 0.28)', // #dcd3b4 track
                                                borderRadius: '3px',
                                                position: 'relative'
                                            }}>
                                                {/* Progress Bar Fill in #dcd3b4 */}
                                                <div style={{
                                                    width: `${progressPercent}%`,
                                                    height: '100%',
                                                    backgroundColor: ACCENT_COLOR, // #dcd3b4
                                                    borderRadius: '3px',
                                                    transition: 'width 0.1s linear'
                                                }} />

                                                {/* Scrubber Thumb Knob in #dcd3b4 */}
                                                <div style={{
                                                    position: 'absolute',
                                                    left: `${progressPercent}%`,
                                                    top: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    width: '11px',
                                                    height: '11px',
                                                    borderRadius: '50%',
                                                    backgroundColor: ACCENT_COLOR, // #dcd3b4
                                                    boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                                                    transition: 'left 0.1s linear'
                                                }} />
                                            </div>
                                        </div>

                                        {/* Time Indicator in #dcd3b4, Inter Regular */}
                                        <div style={{
                                            fontFamily: 'var(--font-body)',
                                            fontSize: '0.88rem',
                                            fontWeight: 500,
                                            color: ACCENT_COLOR,
                                            minWidth: '32px',
                                            textAlign: 'right',
                                            userSelect: 'none'
                                        }}>
                                            {isCenter && isPlaying ? formatAudioTime(currentTime) : currentNarr.defaultDuration}
                                        </div>
                                    </div>

                                    {/* --- 5. NARRATOR CITATION (Inter Bold, #dcd3b4, under player) --- */}
                                    <div style={{
                                        textAlign: 'center',
                                        padding: '0 0.5rem',
                                        marginTop: '0.4rem',
                                        marginBottom: '0.8rem',
                                        fontFamily: 'var(--font-body)', // Inter Bold
                                        fontWeight: 700,
                                        fontSize: 'clamp(0.82rem, 1vw, 0.9rem)',
                                        color: ACCENT_COLOR,
                                        lineHeight: 1.4
                                    }}>
                                        {renderNarratorLink(currentNarr.name, isCenter)}, from the Audio book{' '}
                                        <Link
                                            to={`/book/${currentNarr.bookSlug}/`}
                                            onClick={(e) => {
                                                if (!isCenter) e.preventDefault();
                                            }}
                                            style={{
                                                color: ACCENT_COLOR,
                                                textDecoration: 'underline',
                                                textUnderlineOffset: '3px',
                                                transition: 'color 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-brand-coral)'}
                                            onMouseLeave={(e) => e.currentTarget.style.color = ACCENT_COLOR}
                                        >
                                            {currentNarr.bookTitle}
                                        </Link>
                                    </div>
                                </div>

                                {/* --- 6. BOTTOM CTA BUTTON (Lora Italic) --- */}
                                <div style={{ textAlign: 'center', marginTop: '1.2rem', paddingBottom: '0.6rem' }}>
                                    <Link
                                        to={`/narrator-styles/${slide.slug}/`}
                                        onClick={(e) => {
                                            if (!isCenter) e.preventDefault();
                                        }}
                                        style={{
                                            display: 'inline-block',
                                            backgroundColor: 'var(--color-brand-coral)',
                                            color: '#ffffff',
                                            padding: '0.72rem 1.9rem',
                                            borderRadius: '9999px',
                                            fontFamily: 'var(--font-serif-accent)', // Lora Italic
                                            fontStyle: 'italic',
                                            fontSize: 'clamp(0.88rem, 1.08vw, 0.98rem)',
                                            fontWeight: 500,
                                            textDecoration: 'none',
                                            boxShadow: '0 4px 14px rgba(0,0,0,0.22)',
                                            transition: 'background-color 0.2s ease, transform 0.2s ease',
                                            pointerEvents: isCenter ? 'auto' : 'none'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#cc563b';
                                            e.currentTarget.style.transform = 'translateY(-1px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'var(--color-brand-coral)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        All Narrators with {slide.name} →
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
