import { genres } from '../data/books';

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
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            marginBottom: '2rem',
            padding: '1rem',
            background: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            border: '1px solid var(--color-border)'
        }}>
            {/* Search Input */}
            <div style={{ flex: '1 1 300px', minWidth: '200px' }}>
                <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--color-border)',
                        fontSize: '1rem',
                        fontFamily: 'var(--font-body)',
                        backgroundColor: 'var(--color-surface)',
                        color: 'var(--color-text)'
                    }}
                />
            </div>

            {/* Genre Filter */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                    onClick={() => onGenreChange('All')}
                    style={{
                        background: selectedGenre === 'All' ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
                        color: selectedGenre === 'All' ? '#fff' : 'var(--color-text)',
                        border: 'none',
                        borderRadius: '2rem',
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem'
                    }}
                >
                    All Genres
                </button>
                {genres.map(genre => (
                    <button
                        key={genre}
                        onClick={() => onGenreChange(genre)}
                        style={{
                            background: selectedGenre === genre ? 'var(--color-primary)' : 'rgba(0,0,0,0.05)',
                            color: selectedGenre === genre ? '#fff' : 'var(--color-text)',
                            border: '1px solid var(--color-border)',
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            transition: 'all 0.2s'
                        }}
                    >
                        {genre}
                    </button>
                ))}
            </div>

            {/* Length Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.05)', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text)', whiteSpace: 'nowrap' }}>
                    Min Length: <strong>{minLength}h</strong>
                </span>
                <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={minLength}
                    onChange={(e) => onLengthChange(parseInt(e.target.value))}
                    style={{
                        cursor: 'pointer',
                        accentColor: 'var(--color-primary)'
                    }}
                />
            </div>

            {/* Sort Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value as 'default' | 'length-desc' | 'length-asc')}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-surface)',
                        color: 'var(--color-text)',
                        fontSize: '0.875rem',
                        cursor: 'pointer'
                    }}
                >
                    <option value="default">Default Sort</option>
                    <option value="length-desc">Longest First</option>
                    <option value="length-asc">Shortest First</option>
                </select>
            </div>
        </div>
    );
};
