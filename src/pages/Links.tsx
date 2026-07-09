import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { baseBooks } from '../data/books';

export const Links = () => {
  // 9 Books for the 9-Day Campaign (Order them as you like)
  const campaignSlugs = [
    'i-am-pilgrim-terry-hayes',
    'the-goldfinch-donna-tartt',
    'the-way-of-kings-brandon-sanderson',
    'galaxy-outlaws-js-morin',
    'it-stephen-king',
    'my-name-is-barbra-barbra-streisand',
    'the-pillars-of-the-earth-ken-follett',
    'outlander-diana-gabaldon',
    'sherlock-holmes-the-definitive-collection-arthur-conan-doyle',
  ];

  // Map slugs to actual book data to get correct covers and titles
  const campaignBooks = campaignSlugs.map(slug => 
    baseBooks.find(b => b.slug === slug)
  ).filter((book): book is typeof baseBooks[0] => Boolean(book)); 

  // Logic to find "Today's" book
  // Change this date to your actual Campaign Start Date
  const startDate = new Date('2026-04-30'); 
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // The index of the book to highlight (0 to 8)
  // If the campaign is over or hasn't started, activeIndex will be outside 0-8
  const activeIndex = diffDays >= 0 && diffDays < 9 ? diffDays : -1;

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
            <Link to="/" className="nav-interactive" style={{ display: 'block' }}>
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
            </Link>
            
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

          {/* 3x3 Campaign Grid */}
          <div style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '1rem'
          }}>
            {campaignBooks.map((book, index) => {
              const isActive = index === activeIndex;
              return (
                <Link 
                  key={book.slug} 
                  to={`/book/${book.slug}`}
                  className="nav-interactive"
                  style={{
                    position: 'relative',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    // Optional Glow Effect
                    boxShadow: isActive ? '0 0 20px var(--color-brand-coral)' : 'none',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    zIndex: isActive ? 2 : 1,
                    border: isActive ? '2px solid var(--color-brand-coral)' : '2px solid transparent',
                  }}
                >
                  <img 
                    src={book.coverUrl} 
                    alt={book.title}
                    style={{
                      width: '100%',
                      aspectRatio: '1/1',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      display: 'block'
                    }}
                  />
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      backgroundColor: 'var(--color-brand-coral)',
                      color: 'white',
                      fontSize: '0.65rem',
                      fontWeight: 'bold',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      textTransform: 'uppercase',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      Today
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Button Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '1rem' }}>
            
            {/* Primary Action */}
            <Link to="/long-book-finder/" style={{
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
            <a href="https://thelongbookclub.com/collections/longest-ever/" style={{
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
            <Link to="/collections/romantasy/" style={{
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
            <Link to="/collections/" style={{
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
            }} className="nav-interactive links-outline-button">
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
