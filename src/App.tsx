import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { BookDetails } from './pages/BookDetails';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Collections } from './pages/Collections';
import { CollectionDetail } from './pages/CollectionDetail';
import { BookCurator } from './pages/BookCurator';
import { About } from './pages/About';
import { Genre } from './pages/Genre';
import { Finder } from './pages/Finder';
import { Journal } from './pages/Journal';
import { JournalPost } from './pages/JournalPost';
import { JournalGenerator } from './pages/JournalGenerator';
import { Authors } from './pages/Authors';
import { AuthorDetail } from './pages/AuthorDetail';
import { Narrators } from './pages/Narrators';
import { NarratorDetail } from './pages/NarratorDetail';

import { ThankYou } from './pages/ThankYou';
import { Footer } from './components/Footer';
import { Links } from './pages/Links';


import { StickyNewsletter } from './components/StickyNewsletter';
import ReactGA from 'react-ga4';
import React, { useEffect } from 'react';
import { ScrollToTop } from './components/ScrollToTop';

import { SEO } from './components/SEO';
import { HeaderThemeProvider } from './context/HeaderContext';

// Initialize GA4 only on live production domain (excludes localhost dev)
const isProduction = typeof window !== 'undefined' &&
  window.location.hostname !== 'localhost' &&
  window.location.hostname !== '127.0.0.1' &&
  !window.location.hostname.endsWith('.local');

if (isProduction) {
  ReactGA.initialize('G-1XT8V4LVRG');
}

// Tracker component to handle page view events on route change
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (isProduction) {
      ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    }
  }, [location]);

  return null;
};
const NoiseOverlay = () => {
  const location = useLocation();
  const isCollectionsPage = location.pathname === '/collections' || location.pathname === '/collections/';

  if (isCollectionsPage) return null;

  return <div className="noise-overlay" />;
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isLinksPage = location.pathname === '/links' || location.pathname === '/links/';

  return (
    <>
      <ScrollToTop />
      <AnalyticsTracker />
      <SEO />
      <NoiseOverlay />
      {!isLinksPage && <Header />}
      <main>
        {children}
      </main>
      {!isLinksPage && <Footer />}
      {!isLinksPage && <StickyNewsletter />}
    </>
  );
};

function App() {
  return (
    <HelmetProvider>
      <HeaderThemeProvider>
        <BrowserRouter>
          <div className="app-container">
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book/:slug" element={<BookDetails />} />
                <Route path="/books/:slug" element={<BookDetails />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/collections/:slug" element={<CollectionDetail />} />
                
                {/* Admin/Generator Routes - Hidden in Production */}
                {import.meta.env.DEV && (
                  <>
                    <Route path="/generator" element={<BookCurator />} />
                    <Route path="/journal-generator" element={<JournalGenerator />} />
                  </>
                )}



                <Route path="/about" element={<About />} />
                <Route path="/genre/:slug" element={<Genre />} />
                <Route path="/genres/:slug" element={<Genre />} />
                <Route path="/long-book-finder" element={<Finder />} />

                {/* Author Routes */}
                <Route path="/authors" element={<Authors />} />
                <Route path="/author/:slug" element={<AuthorDetail />} />
                <Route path="/authors/:slug" element={<AuthorDetail />} />

                {/* Narrator Routes */}
                <Route path="/narrators" element={<Narrators />} />
                <Route path="/narrator/:slug" element={<NarratorDetail />} />
                <Route path="/narrators/:slug" element={<NarratorDetail />} />

                {/* Journal Routes */}
                <Route path="/journal" element={<Journal />} />
                <Route path="/journal/:slug" element={<JournalPost />} />

                
                {/* Social Hub Links Page */}
                <Route path="/links" element={<Links />} />
              </Routes>
            </MainLayout>

            {/* <CookieConsent /> - Temporarily disabled until traffic increases or ads are hosted */}
          </div>
        </BrowserRouter>
      </HeaderThemeProvider>
    </HelmetProvider>
  );
}

export default App;
