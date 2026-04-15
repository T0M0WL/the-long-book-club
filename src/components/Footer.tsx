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
                backgroundImage: "url('/assets/collections-hero-images/LongBookClub-Collections-background-01.gif')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderTop: 'none',
                color: 'var(--color-brand-cloud)', // User Update: Cloud Text
                fontSize: '0.875rem',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    {/* Brand Logo - Tinted to Cloud */}
                    <div className="footer-logo" style={{
                        width: '225px', // Increased by 25% (180 -> 225)
                        height: '125px', // Increased by 25% (100 -> 125)
                        backgroundColor: 'var(--color-brand-cloud)', // Cloud Color
                        maskImage: 'url(/assets/lbc-logo-stack-v2.svg)',
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskImage: 'url(/assets/lbc-logo-stack-v2.svg)',
                        WebkitMaskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        marginBottom: '2rem'
                    }} />

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
                        As an Amazon Associate we may earn a small amount from qualifying purchases.
                    </p>
                </div>
            </footer>
        </>
    );
};
