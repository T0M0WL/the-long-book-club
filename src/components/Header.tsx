import { FaHeadphones } from 'react-icons/fa';

export const Header = () => {
    return (
        <header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem 0',
            marginBottom: '2rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FaHeadphones size={28} color="var(--color-primary)" />
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>The Long Book Club</h1>
            </div>
            <nav>
                {/* Placeholder for future links if needed */}
            </nav>
        </header>
    );
};
