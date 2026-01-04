import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

export const ThankYou = () => {
    return (
        <div className="page-container" style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            animation: 'fadeIn 0.5s ease'
        }}>
            <Helmet>
                <title>Welcome to the Club | The Long Book Club</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            <div style={{
                color: 'var(--color-primary)',
                marginBottom: '2rem',
                fontSize: '4rem'
            }}>
                <FaCheckCircle />
            </div>

            <h1 style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                lineHeight: 1.1
            }}>
                You're in!
            </h1>

            <p style={{
                fontSize: '1.25rem',
                color: 'var(--color-text-muted)',
                maxWidth: '600px',
                marginBottom: '3rem',
                lineHeight: 1.6
            }}>
                Thanks for joining The Long Book Club. <br />
                We'll only send you the absolute best long-form audiobooks.
            </p>

            <Link
                to="/"
                style={{
                    backgroundColor: 'var(--color-primary)',
                    color: '#fff',
                    padding: '1rem 2.5rem',
                    borderRadius: '2rem',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: 'var(--shadow-glow)',
                    transition: 'transform 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
                Back to Library
            </Link>
        </div>
    );
};
