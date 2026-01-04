import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
    const { pathname } = useLocation();

    // Hide global header on Home page because Hero has its own branding
    if (pathname === '/') return null;

    return (
        <header style={{
            padding: '2rem clamp(1.5rem, 5vw, 3rem)', // Mobile breathing room
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Link to="/" style={{ display: 'block' }}>
                <img
                    src="/assets/lbc-logo-horiz.svg"
                    alt="The Long Book Club"
                    style={{
                        width: '100%', // Fills container (minus padding)
                        maxWidth: '440px', // Caps at desktop size
                        height: 'auto'
                    }}
                />
            </Link>
        </header>
    );
};
