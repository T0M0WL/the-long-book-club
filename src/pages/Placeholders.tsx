
import { Helmet } from 'react-helmet-async';

const PlaceholderPage = ({ title }: { title: string }) => (
    <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '4rem 2rem',
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Helmet>
            <title>{title} | The Long Book Club</title>
        </Helmet>
        <h1 style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-brand-forrest)'
        }}>
            {title}
        </h1>
        <p style={{
            fontSize: '1.2rem',
            color: 'var(--color-brand-slate)',
            fontFamily: 'var(--font-serif-accent)'
        }}>
            Coming Soon
        </p>
    </div>
);


export const ClubJournal = () => <PlaceholderPage title="Club Journal" />;
export const BookCalculator = () => <PlaceholderPage title="Book Calculator" />;
export const Offers = () => <PlaceholderPage title="Offers" />;
export const About = () => <PlaceholderPage title="About The LBC" />;
