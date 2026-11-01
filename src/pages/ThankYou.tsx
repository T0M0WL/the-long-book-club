import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { useSetHeaderTheme } from '../context/HeaderContext';

export const ThankYou = () => {
    useSetHeaderTheme({
        logoColor: 'var(--color-brand-forrest)',
        textColor: 'var(--color-brand-forrest)',
        hamburgerColor: 'var(--color-brand-forrest)',
        activeLink: '',
        activeLinkBg: 'var(--color-brand-forrest)',
        activeLinkText: 'var(--color-brand-cloud)'
    });

    return (
        <div className="page-container" style={{
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '10rem 2rem 6rem 2rem',
            animation: 'fadeIn 0.5s ease'
        }}>
            <Helmet>
                <title>Welcome to the Club | The Long Book Club</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            <div style={{
                color: 'var(--color-brand-forrest)',
                marginBottom: '2rem',
                fontSize: '4rem'
            }}>
                <FaCheckCircle />
            </div>

            <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                marginBottom: '1rem',
                lineHeight: 1.1,
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-brand-forrest)'
            }}>
                You're in!
            </h1>

            <p style={{
                fontSize: '1.25rem',
                color: 'var(--color-brand-slate)',
                maxWidth: '600px',
                marginBottom: '3rem',
                lineHeight: 1.6,
                fontFamily: 'Lora, serif'
            }}>
                Thanks for joining The Long Book Club. <br />
                We'll only send you the absolute best long-form audiobooks.
            </p>

            <Link
                to="/"
                style={{
                    backgroundColor: 'var(--color-brand-coral)',
                    color: '#fff',
                    padding: '1rem 2.5rem',
                    borderRadius: '2rem',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: 'var(--shadow-glow)',
                    transition: 'transform 0.2s, background-color 0.2s',
                    fontFamily: 'Lora, serif'
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#e55a3b';
                    e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'var(--color-brand-coral)';
                    e.currentTarget.style.transform = 'scale(1)';
                }}
            >
                Back to Library
            </Link>
        </div>
    );
};
