import { genres } from '../data/books';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface FilterBarProps {
    selectedGenre: string;
    onGenreChange: (genre: string) => void;
    minLength: number;
    onLengthChange: (length: number) => void;
    sortBy: 'default' | 'length-desc' | 'length-asc';
    onSortChange: (sort: 'default' | 'length-desc' | 'length-asc') => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

export const FilterBar = ({
    selectedGenre,
    onGenreChange,
    minLength,
    onLengthChange,
    sortBy,
    onSortChange,
    searchTerm,
    onSearchChange
}: FilterBarProps) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            marginBottom: '2rem',
            padding: '1rem',
            width: '100%'
        }}>
            {/* Top Section: Filters */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {/* Genre Filter */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
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
                            padding: '1rem 2rem',
                            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', // Match Hero Intro
                            fontFamily: 'var(--font-serif-accent)', // User Switch: Fraunces
                            fontWeight: 400, // Regular weight
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                        }}
                    >
                        All Genres
                    </button>
                    {genres.map(genre => (
                        <button
                            key={genre}
                            onClick={() => onGenreChange(selectedGenre === genre ? 'All' : genre)}
                            onMouseEnter={(e) => {
                                if (selectedGenre !== genre) e.currentTarget.style.background = '#cc563b'; // 20% darker coral
                            }}
                            onMouseLeave={(e) => {
                                if (selectedGenre !== genre) e.currentTarget.style.background = 'var(--color-brand-coral)';
                            }}
                            style={{
                                background: selectedGenre === genre ? 'var(--color-brand-forrest)' : 'var(--color-brand-coral)',
                                color: 'var(--color-brand-cloud)', // User Update: Cloud
                                border: 'none',
                                padding: '1rem 2rem',
                                borderRadius: '2rem',
                                cursor: 'pointer',
                                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', // Match Hero Intro
                                fontFamily: 'var(--font-serif-accent)', // User Switch: Fraunces
                                fontWeight: 400, // Regular weight
                                transition: 'background 0.2s'
                            }}
                        >
                            {genre}
                        </button>
                    ))}
                </div>

                {/* Length Filter */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.05)', padding: '1rem 2rem', borderRadius: '2rem', border: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text)', whiteSpace: 'nowrap' }}>
                        Min Length: <strong>{minLength}h</strong>
                    </span>
                    <input
                        type="range"
                        min="10"
                        max="130"
                        value={minLength}
                        onChange={(e) => onLengthChange(Number(e.target.value))}
                        style={{
                            cursor: 'pointer',
                            accentColor: 'var(--color-primary)'
                        }}
                    />
                </div>

                {/* Sort Filter */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value as 'default' | 'length-desc' | 'length-asc')}
                        style={{
                            padding: '1rem 3.5rem 1rem 2rem',
                            borderRadius: '2rem',
                            border: '1px solid var(--color-border)',
                            backgroundColor: 'var(--color-surface)',
                            color: 'var(--color-text)',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            minWidth: '200px',
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%231f2937' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1.5rem center'
                        }}
                    >
                        <option value="default">Default Sort</option>
                        <option value="length-desc">Longest First</option>
                        <option value="length-asc">Shortest First</option>
                    </select>
                </div>
            </div>

            {/* Bottom Section: Search Input */}
            <div style={{ width: '100%', marginTop: '100px', position: 'relative' }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '1rem 2rem',
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
                        color: '#777', // Placeholder gray (Darkened)
                        fontFamily: 'var(--font-body)', // Match input font
                        fontSize: '1rem', // Match input size
                        width: '100%',
                        justifyContent: 'center'
                    }}>
                        <FaSearch style={{ color: 'var(--color-brand-forrest)' }} />
                        <span>Search by title, author or narrator...</span>
                    </div>
                )}
            </div>

            {/* Clear Filters Button */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth ease-out
                maxHeight: (selectedGenre !== 'All' || minLength > 10 || sortBy !== 'default' || searchTerm !== '') ? '120px' : '0',
                opacity: (selectedGenre !== 'All' || minLength > 10 || sortBy !== 'default' || searchTerm !== '') ? 1 : 0,
                marginTop: (selectedGenre !== 'All' || minLength > 10 || sortBy !== 'default' || searchTerm !== '') ? '1.5rem' : '0',
                paddingTop: (selectedGenre !== 'All' || minLength > 10 || sortBy !== 'default' || searchTerm !== '') ? '10px' : '0',
                overflow: 'hidden',
                pointerEvents: (selectedGenre !== 'All' || minLength > 10 || sortBy !== 'default' || searchTerm !== '') ? 'auto' : 'none'
            }}>
                <button
                    onClick={() => {
                        onGenreChange('All');
                        onLengthChange(10);
                        onSortChange('default');
                        onSearchChange('');
                    }}
                    style={{
                        background: 'var(--color-brand-slate)',
                        color: 'var(--color-brand-cloud)',
                        border: 'none',
                        padding: '1rem 2rem',
                        borderRadius: '3rem',
                        fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                        fontFamily: 'var(--font-serif-accent)',
                        fontWeight: 400,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
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
                    <FaTimes size={16} /> {/* Cross Icon */}
                    Clear All Filters
                </button>
            </div>
        </div>
    );
};
