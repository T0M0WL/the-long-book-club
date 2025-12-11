import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer style={{
            marginTop: '4rem',
            padding: '3rem 1rem',
            borderTop: '1px solid var(--color-border, rgba(0,0,0,0.1))',
            color: 'var(--color-text-muted, #666)',
            fontSize: '0.875rem',
            textAlign: 'center',
            opacity: 0.8
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <p style={{ marginBottom: '1rem', fontWeight: 500 }}>
                    The Long Book Club
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                    &copy; {new Date().getFullYear()} All rights reserved. | <a href="/privacy" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy Policy</a>
                </p>

                {/* Amazon Associates Disclosure */}
                <p style={{
                    fontSize: '0.75rem',
                    fontStyle: 'italic',
                    opacity: 0.8,
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    As an Amazon Associate I earn from qualifying purchases.
                </p>
            </div>
        </footer>
    );
};
