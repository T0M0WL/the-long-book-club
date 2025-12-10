import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '100px 1rem 2rem 1rem',
            marginBottom: '2rem'
        }}>
            <Link to="/" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
                <img
                    src="/logo.png"
                    alt="The Long Book Club"
                    style={{
                        maxWidth: '600px',
                        width: '100%',
                        height: 'auto',
                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                    }}
                />
                {/* SEO-only invisible Title */}
                <h1 style={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    padding: 0,
                    margin: -1,
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                    whiteSpace: 'nowrap',
                    border: 0
                }}>
                    The Long Book Club
                </h1>
            </Link>
        </header>
    );
};
