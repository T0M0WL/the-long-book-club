import { primaryGenres, secondaryGenres } from '../data/curatedGenres';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface FilterBarProps {
    selectedGenre: string;
    onGenreChange: (genre: string) => void;
    minLength: number;
    onLengthChange: (length: number) => void;
    sortBy: 'default' | 'length-desc' | 'length-asc';
    onSortChange: (sort: 'default' | 'length-desc' | 'length-asc') => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onClearAll: () => void;
}

export const FilterBar = ({
    selectedGenre,
    onGenreChange,
    minLength,
    onLengthChange,
    sortBy,
    onSortChange,
    searchTerm,
    onSearchChange,
    onClearAll
}: FilterBarProps) => {
    // Local state for smooth sliding without constant URL updates
    const [localMinLength, setLocalMinLength] = useState(minLength);

    // State for genre expansion - auto-expand if selected genre is secondary
    const [isExpanded, setIsExpanded] = useState(() => {
        return secondaryGenres.includes(selectedGenre);
    });

    // Effect to expand if external change selects a hidden genre
    useEffect(() => {
        if (secondaryGenres.includes(selectedGenre)) {
            setIsExpanded(true);
        }
    }, [selectedGenre]);

    // Sync local state when prop changes (e.g. clear all)
    useEffect(() => {
        setLocalMinLength(minLength);
    }, [minLength]);

    // Debounce the parent update
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localMinLength !== minLength) {
                onLengthChange(localMinLength);
            }
        }, 300); // Wait 300ms after last move before updating URL

        return () => clearTimeout(timer);
    }, [localMinLength, minLength, onLengthChange]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            marginBottom: '2rem',
            padding: '1rem',
            width: '100%'
        }}>
            {/* Top Section: Length Slider (Centered) */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1rem',
                width: '100%'
            }}>
                {/* Length Filter - REDESIGNED: Coral Lozenge */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column', // Stack vertical
                    justifyContent: 'center', // Center vertically
                    gap: '0.5rem', // Space between labels and line
                    background: 'var(--color-brand-forrest)',
                    padding: '1.5rem clamp(1rem, 5vw, 3rem)', // Reduced side padding on mobile for breathing room
                    borderRadius: '100vw', // Restored perfect pill shape
                    flex: '0 1 auto',
                    minWidth: 'min(350px, 100%)', // Responsive base for smaller iPhones
                    maxWidth: '650px',
                    width: '100%',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    color: 'var(--color-brand-cloud)',
                    position: 'relative',
                    marginTop: '1.5rem', // More space for the bubble
                    height: '100px' // Fixed height for consistent look
                }}>
                    {/* Floating Value Bubble (Fixed Center) */}
                    {/* Floating Value Bubble (Fixed Center) */}
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        top: '-40px', // Adjusted for larger size
                        width: '80px', // Larger bubble
                        height: '80px',
                        borderRadius: '50%',
                        background: 'var(--color-brand-coral)',
                        display: 'flex',
                        flexDirection: 'column', // Stack number and text
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontFamily: 'var(--font-serif-accent)',
                        zIndex: 4,
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                    }}>
                        <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>
                            {localMinLength >= 70 ? '70+' : localMinLength}
                        </span>
                        <span style={{ fontSize: '0.9rem', lineHeight: 1, opacity: 0.9 }}>
                            hours
                        </span>
                    </div>

                    {/* Labels Row (Above the line) */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '0 7px', // Align with track ends visually
                        marginBottom: '4px'
                    }}>
                        <span style={{
                            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                            fontFamily: 'var(--font-serif-accent)',
                            fontWeight: 400,
                            letterSpacing: '0.02em'
                        }}>Long: 10h</span>
                        <span style={{
                            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                            fontFamily: 'var(--font-serif-accent)',
                            fontWeight: 400,
                            letterSpacing: '0.02em'
                        }}>Epic: 70h +</span>
                    </div>

                    {/* Custom Range Slider (Full Width) */}
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        {/* Track (Cloud Line) */}
                        <div style={{
                            position: 'absolute',
                            left: '0',
                            right: '0',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            height: '6px',
                            background: 'var(--color-brand-cloud)',
                            borderRadius: '3px',
                            pointerEvents: 'none'
                        }} />

                        {/* Input (Touch Target) */}
                        <input
                            type="range"
                            min="10"
                            max="70"
                            value={localMinLength}
                            className="coral-slider-input"
                            onChange={(e) => setLocalMinLength(Number(e.target.value))}
                            style={{
                                width: 'calc(100% + 20px)', // Extend hit area by thumb width
                                position: 'absolute',
                                top: 0,
                                left: '-10px', // Center input over visual track
                                height: '100%',
                                opacity: 0,
                                cursor: 'pointer',
                                zIndex: 2,
                                margin: 0
                            }}
                        />

                        {/* Thumb (Visual) */}
                        <div style={{
                            position: 'absolute',
                            left: `calc(${((localMinLength - 10) / (70 - 10)) * 100}% - 10px)`,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: 'var(--color-brand-coral)',
                            pointerEvents: 'none',
                            zIndex: 3,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                        }} />
                    </div>
                </div>
            </div>



            {/* Genre Filter */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginBottom: '1.5rem' // Space before search
            }}>
                <button
                    onClick={() => onGenreChange('All')}
                    onMouseEnter={(e) => {
                        if (selectedGenre !== 'All') e.currentTarget.style.background = '#cc563b'; // 20% darker coral
                    }}
                    onMouseLeave={(e) => {
                        if (selectedGenre !== 'All') e.currentTarget.style.background = 'var(--color-brand-coral)';
                    }}
                    style={{
                        background: selectedGenre === 'All' ? 'var(--color-brand-forrest)' : 'var(--color-brand-coral)',
                        color: 'var(--color-brand-cloud)', // User Update: Cloud
                        border: 'none',
                        borderRadius: '2rem',
                        padding: '0.75rem 1.5rem', // Slightly smaller padding for better density
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)', // Scaled down slightly
                        fontFamily: 'var(--font-serif-accent)', // User Switch: Fraunces
                        fontWeight: 400, // Regular weight
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    All Genres
                </button>

                {/* Primary Genres */}
                {primaryGenres.map(genre => (
                    <button
                        key={genre}
                        onClick={() => onGenreChange(selectedGenre === genre ? 'All' : genre)}
                        onMouseEnter={(e) => {
                            if (selectedGenre !== genre) e.currentTarget.style.background = '#cc563b';
                        }}
                        onMouseLeave={(e) => {
                            if (selectedGenre !== genre) e.currentTarget.style.background = 'var(--color-brand-coral)';
                        }}
                        style={{
                            background: selectedGenre === genre ? 'var(--color-brand-forrest)' : 'var(--color-brand-coral)',
                            color: 'var(--color-brand-cloud)',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '2rem',
                            cursor: 'pointer',
                            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                            fontFamily: 'var(--font-serif-accent)',
                            fontWeight: 400,
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        {genre}
                    </button>
                ))}

                {/* Secondary Genres (Conditional) */}
                {isExpanded && secondaryGenres.map(genre => (
                    <button
                        key={genre}
                        onClick={() => onGenreChange(selectedGenre === genre ? 'All' : genre)}
                        onMouseEnter={(e) => {
                            if (selectedGenre !== genre) e.currentTarget.style.background = '#cc563b';
                        }}
                        onMouseLeave={(e) => {
                            if (selectedGenre !== genre) e.currentTarget.style.background = 'var(--color-brand-coral)';
                        }}
                        style={{
                            background: selectedGenre === genre ? 'var(--color-brand-forrest)' : 'var(--color-brand-coral)',
                            color: 'var(--color-brand-cloud)',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '2rem',
                            cursor: 'pointer',
                            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                            fontFamily: 'var(--font-serif-accent)',
                            fontWeight: 400,
                            transition: 'background 0.2s',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            animation: 'fadeIn 0.3s ease-out'
                        }}
                    >
                        {genre}
                    </button>
                ))}

                {/* Show More/Less Toggle */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{
                        background: 'transparent',
                        color: 'var(--color-brand-forrest)',
                        border: '2px solid var(--color-brand-forrest)',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '2rem',
                        cursor: 'pointer',
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        fontFamily: 'var(--font-serif-accent)',
                        fontWeight: 600,
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'var(--color-brand-forrest)';
                        e.currentTarget.style.color = 'var(--color-brand-cloud)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--color-brand-forrest)';
                    }}
                >
                    {isExpanded ? 'Show Less -' : 'Show More +'}
                </button>
            </div>

            {/* Search & Sort & Clear Row */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                width: '100%',
                maxWidth: '900px', // Increased max-width to allow comfortable side-by-side
                margin: '0 auto 1.5rem auto',
                flexWrap: 'wrap' // Allow wrapping on mobile
            }}>
                {/* Search Input (Grows to fill space) */}
                <div style={{
                    flex: '1 1 300px', // Grow, shrink, base of 300px
                    minWidth: '280px',
                    position: 'relative'
                }}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1.25rem 2rem',
                            borderRadius: '2rem',
                            border: '1px solid var(--color-border)',
                            fontSize: '1rem',
                            fontFamily: 'var(--font-body)',
                            backgroundColor: 'var(--color-surface)',
                            color: 'var(--color-text)',
                            textAlign: 'center'
                        }}
                    />
                    {!searchTerm && (
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#777',
                            fontFamily: 'var(--font-body)',
                            fontSize: '1rem',
                            width: '100%',
                            justifyContent: 'center'
                        }}>
                            <FaSearch style={{ color: 'var(--color-brand-forrest)' }} />
                            <span>Search by title, author or narrator...</span>
                        </div>
                    )}
                </div>

                {/* Controls Group (Sort + Clear) - Keeps them together */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    flex: '0 0 auto',
                    alignItems: 'center'
                }}>
                    {/* Sort Dropdown */}
                    <div style={{ flex: '0 0 auto' }}>
                        <select
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value as 'default' | 'length-desc' | 'length-asc')}
                            style={{
                                padding: '1.25rem 3rem 1.25rem 2rem',
                                borderRadius: '2rem',
                                border: '1px solid var(--color-border)',
                                backgroundColor: '#fff',
                                color: 'var(--color-text)',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                appearance: 'none',
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 1.25rem center',
                                fontWeight: 500
                            }}
                        >
                            <option value="default">Sort by...</option>
                            <option value="length-desc">Longest First</option>
                            <option value="length-asc">Shortest First</option>
                        </select>
                    </div>

                    {/* Clear Filters Button (Conditionally Rendered) */}
                    {(selectedGenre !== 'All' || minLength > 10 || sortBy !== 'default' || searchTerm !== '') && (
                        <button
                            onClick={onClearAll}
                            style={{
                                background: 'var(--color-brand-coral)',
                                color: 'var(--color-brand-cloud)',
                                border: 'none',
                                padding: '1rem 2rem',
                                borderRadius: '3rem',
                                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                                fontFamily: 'var(--font-serif-accent)',
                                fontWeight: 400,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                height: 'fit-content',
                                animation: 'fadeIn 0.3s ease-out'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 8px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                            }}
                        >
                            <FaTimes size={16} />
                            Clear Filters
                        </button>
                    )}
                </div>
            </div>
        </div >
    );
};
