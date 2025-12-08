import { genres } from '../data/books';

interface FilterBarProps {
    selectedGenre: string;
    onSelectGenre: (genre: string) => void;
    minLength: number;
    onSetMinLength: (hours: number) => void;
    sortBy: string;
    onSortChange: (sort: string) => void;
}

export const FilterBar = ({ selectedGenre, onSelectGenre, minLength, onSetMinLength, sortBy, onSortChange }: FilterBarProps) => {
    return (
        <div style={{
            marginBottom: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.03)',
            padding: '1rem',
            borderRadius: '0.75rem',
            border: '1px solid rgba(255,255,255,0.05)'
        }}>

            {/* Genre Filter */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                    onClick={() => onSelectGenre('All')}
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
                        onClick={() => onSelectGenre(genre)}
                        style={{
                            background: selectedGenre === genre ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
                            color: selectedGenre === genre ? '#fff' : 'var(--color-text)',
                            border: 'none',
                            borderRadius: '2rem',
                            padding: '0.5rem 1rem',
                            fontSize: '0.875rem'
                        }}
                    >
                        {genre}
                    </button>
                ))}
            </div>

            <div style={{ width: '1px', height: '2rem', background: 'rgba(255,255,255,0.1)' }} className="divider" />

            {/* Length Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <label style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                    Min Length: <strong style={{ color: 'var(--color-text)' }}>{minLength}h+</strong>
                </label>
                <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={minLength}
                    onChange={(e) => onSetMinLength(Number(e.target.value))}
                    style={{
                        accentColor: 'var(--color-accent)',
                        cursor: 'pointer'
                    }}
                />
            </div>

            <div style={{ width: '1px', height: '2rem', background: 'rgba(255,255,255,0.1)' }} className="divider" />

            {/* Sort Control */}
            <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                style={{
                    background: 'rgba(255,255,255,0.1)',
                    color: 'var(--color-text)',
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                }}
            >
                <option value="default">Default</option>
                <option value="longest">Longest First</option>
                <option value="shortest">Shortest First</option>
            </select>
        </div>
    );
};

