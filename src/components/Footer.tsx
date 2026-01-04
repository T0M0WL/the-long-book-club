import React from 'react';
import { Newsletter } from './Newsletter';

export const Footer: React.FC = () => {
    return (
        <>
            <Newsletter />
            <footer style={{
                position: 'relative', // Context for z-index
                zIndex: 10000, // Sit above global noise overlay
                padding: '3rem 1rem',
                backgroundColor: 'var(--color-brand-coral)', // User Update: Coral Background
                borderTop: 'none',
                color: 'var(--color-brand-slate)', // User Update: Slate Text ("Flipped")
                fontSize: '0.875rem',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    {/* Brand Logo - Tinted to Cloud */}
                    <img
                        src="/assets/lbc-logo-horiz.svg"
                        alt="The Long Book Club"
                        className="footer-logo"
                    />

                    <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                        &copy; {new Date().getFullYear()} All rights reserved. | <a href="/privacy" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy Policy</a>
                    </p>

                    {/* Amazon Associates Disclosure */}
                    <p style={{
                        fontSize: '0.75rem',
                        fontStyle: 'italic',
                        opacity: 0.7,
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        As an Amazon Associate I earn from qualifying purchases.
                    </p>
                </div>
            </footer>
        </>
    );
};
