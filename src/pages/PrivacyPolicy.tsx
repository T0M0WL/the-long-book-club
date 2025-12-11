import React, { useEffect } from 'react';

export const PrivacyPolicy: React.FC = () => {

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
            <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.5rem',
                marginBottom: '2rem',
                borderBottom: '1px solid var(--color-primary)'
            }}>
                Privacy Policy & Disclosures
            </h1>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Amazon Affiliate Disclosure</h2>
                <p style={{ lineHeight: '1.7', marginBottom: '1rem' }}>
                    The Long Book Club is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com and Amazon.co.uk.
                </p>
                <p style={{ lineHeight: '1.7' }}>
                    As an Amazon Associate, we earn from qualifying purchases.
                </p>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Audible & Subscriptions</h2>
                <p style={{ lineHeight: '1.7' }}>
                    We promote Audible memberships and audiobooks. We may receive a fixed "bounty" commission if you sign up for a free trial or paid membership through our links. This comes at no additional cost to you and helps support the site.
                </p>
            </section>
        </div>
    );
};
