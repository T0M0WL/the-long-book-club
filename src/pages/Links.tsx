import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const Links = () => {
  return (
    <>
      <Helmet>
        <title>Social Hub | The Long Book Club</title>
      </Helmet>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '3rem 1.5rem',
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg)',
      }}>
        {/* Container */}
        <div style={{
          width: '100%',
          maxWidth: '480px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}>
          
          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{
                width: '133px',
                height: '75px',
                backgroundColor: 'var(--color-brand-coral)',
                maskImage: 'url(/assets/lbc-logo-stack-v2.svg)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskImage: 'url(/assets/lbc-logo-stack-v2.svg)',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
            }} />
            
            <div style={{
              width: '40px',
              height: '1px',
              backgroundColor: 'var(--color-brand-forrest)',
              margin: '30px 0',
              opacity: 0.5
            }} />

            <h1 style={{ 
              fontFamily: 'var(--font-serif-accent)',
              fontSize: '1.5rem',
              color: 'var(--color-brand-forrest)',
              margin: 0,
              textAlign: 'center'
            }}>
              Home of the 20 - 100+ Hour <br /> Audiobooks.
            </h1>
          </div>

          {/* Button Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '1rem' }}>
            
            {/* Primary Action */}
            <Link to="/long-book-finder" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--color-brand-slate)',
              color: 'var(--color-bg)',
              fontFamily: 'var(--font-serif-accent)',
              fontSize: '1.125rem',
              fontWeight: 600,
              borderRadius: '50px',
              textAlign: 'center',
              transition: 'transform 0.2s',
              boxShadow: 'var(--shadow-md)'
            }} className="nav-interactive">
              The Long Book Finder Tool
            </Link>

            {/* Featured Collection */}
            <a href="https://www.thelongbookclub.com/collections/longest-ever" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--color-brand-slate)',
              color: 'var(--color-bg)',
              fontFamily: 'var(--font-serif-accent)',
              fontSize: '1.125rem',
              fontWeight: 600,
              borderRadius: '50px',
              textAlign: 'center',
              transition: 'transform 0.2s',
              boxShadow: 'var(--shadow-md)'
            }} className="nav-interactive">
              The Longest Ever Audiobooks (60+ Hours)
            </a>

            {/* Target Niche */}
            <Link to="/collections/romantasy" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--color-brand-slate)',
              color: 'var(--color-bg)',
              fontFamily: 'var(--font-serif-accent)',
              fontSize: '1.125rem',
              fontWeight: 600,
              borderRadius: '50px',
              textAlign: 'center',
              transition: 'transform 0.2s',
              boxShadow: 'var(--shadow-md)'
            }} className="nav-interactive">
              Epic Romantasy Long Listens
            </Link>

            {/* Utility Links */}
            <Link to="/collections" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              padding: '1.25rem 1.5rem',
              backgroundColor: 'transparent',
              color: 'var(--color-brand-slate)',
              border: '2px solid var(--color-brand-slate)',
              fontFamily: 'var(--font-serif-accent)',
              fontSize: '1.125rem',
              fontWeight: 600,
              borderRadius: '50px',
              textAlign: 'center',
              transition: 'transform 0.2s, background-color 0.2s',
              marginTop: '0.5rem'
            }} className="nav-interactive"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-brand-slate)';
              e.currentTarget.style.color = 'var(--color-bg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-brand-slate)';
            }}>
              Browse All Curated Collections
            </Link>

          </div>

          {/* Footer */}
          <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
            <p style={{
              opacity: 0.6,
              fontSize: '0.85rem',
              color: 'var(--color-brand-slate)',
              textAlign: 'center'
            }}>
              As an Amazon Associate, I earn from qualifying purchases.
            </p>
          </div>
          
        </div>
      </div>
    </>
  );
};
