import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

export type NarratorSortOption = 'default' | 'hours-desc' | 'longest-performance' | 'name-asc' | 'name-desc';

export interface NarratorFilterBarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    selectedStyle: string;
    onStyleChange: (style: string) => void;
    styleOptions: { id: string; name: string; count: number }[];
    selectedGenre: string;
    onGenreChange: (genre: string) => void;
    genreOptions: { genre: string; count: number }[];
    sortBy: NarratorSortOption;
    onSortChange: (sort: NarratorSortOption) => void;
    totalNarratorsCount: number;
    filteredCount: number;
    onClearAll: () => void;
}

export const NarratorFilterBar: React.FC<NarratorFilterBarProps> = ({
    searchTerm,
    onSearchChange,
    selectedStyle,
    onStyleChange,
    styleOptions,
    selectedGenre,
    onGenreChange,
    genreOptions,
    sortBy,
    onSortChange,
    totalNarratorsCount,
    filteredCount,
    onClearAll
}) => {
    const isFiltered = searchTerm.trim() !== '' || selectedStyle !== 'All' || selectedGenre !== 'All' || sortBy !== 'default';

    // Shaved padding so controls are compact and horizontal space is optimized
    const lozengeSelectStyle: React.CSSProperties = {
        width: '100%',
        padding: '1.15rem 2.25rem 1.15rem 1.35rem',
        borderRadius: '2rem',
        border: '1px solid var(--color-brand-coral)',
        backgroundColor: 'var(--color-brand-coral)',
        color: '#ffffff',
        fontSize: '0.95rem',
        fontFamily: 'var(--font-body)',
        cursor: 'pointer',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.95rem center',
        fontWeight: 600,
        boxShadow: '0 4px 12px rgba(250, 112, 82, 0.22)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        outline: 'none'
    };

    // Slate lozenge style for Clear Filters
    const slateButtonStyle: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '1.15rem 1.6rem',
        borderRadius: '2rem',
        border: 'none',
        backgroundColor: 'var(--color-brand-slate)',
        color: '#ffffff',
        fontSize: '0.95rem',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(53, 61, 61, 0.22)',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
        flex: '0 0 auto'
    };

    const activeStyleObj = styleOptions.find(s => s.id === selectedStyle);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1240px',
            margin: '0 auto 2.5rem auto',
            padding: '0 1rem'
        }}>
            {/* Main Controls Row: Search + Vocal Style + Genre + Sort + Clear */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.85rem',
                width: '100%',
                flexWrap: 'wrap'
            }}>
                {/* Instant Typeahead Search Input (Wider with comfortable breathing room) */}
                <div style={{
                    flex: '1 1 320px',
                    minWidth: '270px',
                    maxWidth: '380px',
                    position: 'relative'
                }}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1.15rem 2.25rem 1.15rem 2rem',
                            borderRadius: '2rem',
                            border: '1px solid var(--color-border)',
                            fontSize: '0.95rem',
                            fontFamily: 'var(--font-body)',
                            backgroundColor: 'var(--color-surface)',
                            color: 'var(--color-text)',
                            textAlign: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                            outline: 'none'
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
                            fontSize: '0.92rem',
                            width: '100%',
                            justifyContent: 'center',
                            padding: '0 1rem',
                            boxSizing: 'border-box',
                            whiteSpace: 'nowrap'
                        }}>
                            <FaSearch style={{ color: 'var(--color-brand-forrest)', flexShrink: 0 }} />
                            <span>Search narrators, books, authors...</span>
                        </div>
                    )}
                    {searchTerm && (
                        <button
                            onClick={() => onSearchChange('')}
                            style={{
                                position: 'absolute',
                                right: '1.15rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                color: '#888',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.25rem'
                            }}
                            aria-label="Clear search"
                        >
                            <FaTimes size={15} />
                        </button>
                    )}
                </div>

                {/* Vocal Style Dropdown (Coral Lozenge with Shaved Padding) */}
                <div style={{ flex: '0 1 225px', minWidth: '195px' }}>
                    <select
                        value={selectedStyle}
                        onChange={(e) => onStyleChange(e.target.value)}
                        style={lozengeSelectStyle}
                        aria-label="Filter narrators by vocal style"
                    >
                        <option value="All" style={{ color: 'var(--color-text)', backgroundColor: '#ffffff' }}>
                            All Vocal Styles ({totalNarratorsCount})
                        </option>
                        {styleOptions.map(({ id, name, count }) => (
                            <option
                                key={id}
                                value={id}
                                style={{ color: 'var(--color-text)', backgroundColor: '#ffffff' }}
                            >
                                {name} ({count})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Genre Dropdown (Coral Lozenge with Shaved Padding) */}
                <div style={{ flex: '0 1 185px', minWidth: '165px' }}>
                    <select
                        value={selectedGenre}
                        onChange={(e) => onGenreChange(e.target.value)}
                        style={lozengeSelectStyle}
                        aria-label="Filter narrators by genre"
                    >
                        <option value="All" style={{ color: 'var(--color-text)', backgroundColor: '#ffffff' }}>
                            All Genres ({totalNarratorsCount})
                        </option>
                        {genreOptions.map(({ genre, count }) => (
                            <option
                                key={genre}
                                value={genre}
                                style={{ color: 'var(--color-text)', backgroundColor: '#ffffff' }}
                            >
                                {genre} ({count})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort Selector Dropdown (Coral Lozenge with Shaved Padding) */}
                <div style={{ flex: '0 1 265px', minWidth: '240px' }}>
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value as NarratorSortOption)}
                        style={lozengeSelectStyle}
                        aria-label="Sort narrators"
                    >
                        <option value="default" style={{ color: 'var(--color-text)', backgroundColor: '#ffffff' }}>
                            Sort by: Most Audiobooks
                        </option>
                        <option value="hours-desc" style={{ color: 'var(--color-text)', backgroundColor: '#ffffff' }}>
                            Total Listening Hours
                        </option>
                        <option value="longest-performance" style={{ color: 'var(--color-text)', backgroundColor: '#ffffff' }}>
                            Longest Single Performance
                        </option>
                        <option value="name-asc" style={{ color: 'var(--color-text)', backgroundColor: '#ffffff' }}>
                            Narrator Name (A to Z)
                        </option>
                        <option value="name-desc" style={{ color: 'var(--color-text)', backgroundColor: '#ffffff' }}>
                            Narrator Name (Z to A)
                        </option>
                    </select>
                </div>

                {/* Clear Filters Button (Slate Lozenge) */}
                {isFiltered && (
                    <button
                        onClick={onClearAll}
                        style={slateButtonStyle}
                        className="fade-in-element"
                    >
                        <FaTimes size={13} />
                        Clear Filters
                    </button>
                )}
            </div>

            {/* Results Count Summary */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginTop: '1.75rem',
                padding: '0 0.5rem',
                textAlign: 'center'
            }}>
                <p style={{
                    fontFamily: 'var(--font-serif-accent), Lora, Georgia, serif',
                    fontStyle: 'italic',
                    fontSize: '1.15rem',
                    color: 'var(--color-brand-forrest)',
                    margin: 0
                }}>
                    Showing <span style={{ fontWeight: 700, fontStyle: 'italic' }}>{filteredCount}</span> {filteredCount === 1 ? 'narrator' : 'narrators'}
                    {activeStyleObj && <span> with <strong>{activeStyleObj.name}</strong></span>}
                    {selectedGenre !== 'All' && <span> in <strong>{selectedGenre}</strong></span>}
                    {searchTerm && <span> matching &ldquo;<strong>{searchTerm}</strong>&rdquo;</span>}
                </p>
            </div>
        </div>
    );
};
