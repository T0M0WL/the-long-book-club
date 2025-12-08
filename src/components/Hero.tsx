export const Hero = () => {
    return (
        <section style={{
            textAlign: 'center',
            padding: '4rem 1rem',
            background: 'linear-gradient(to bottom, var(--color-surface), transparent)',
            borderRadius: '1rem',
            marginBottom: '3rem',
            border: '1px solid rgba(255,255,255,0.05)'
        }}>
            <h2 style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                background: 'linear-gradient(to right, #fff, var(--color-text-muted))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
            }}>
                Maximize Your Listen
            </h2>
            <p style={{
                fontSize: '1.25rem',
                color: 'var(--color-text-muted)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: 1.6
            }}>
                Curated long-form audiobooks to help you get the most out of your monthly credits.
                Filter by genre and duration to find your next epic journey.
            </p>
        </section>
    );
};
