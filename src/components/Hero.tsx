export const Hero = () => {
    return (
        <section style={{
            textAlign: 'center',
            padding: '0 1rem 4rem 1rem',
            marginBottom: '3rem'
        }}>
            <h2 style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                color: 'var(--color-primary)',
                display: 'inline-block',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '-0.02em'
            }}>
                Maximize Your Listen
            </h2>
            <p style={{
                fontSize: '1.4rem',
                color: '#0408f3',
                maxWidth: '650px',
                margin: '0 auto',
                lineHeight: 1.5,
                fontWeight: 400,
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.02em'
            }}>
                Curated long-form audiobooks to help you get the most out of your monthly credits.
                Filter by genre and duration to find your next epic journey.
            </p>
        </section>
    );
};
