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

import { ThankYou } from './pages/ThankYou';
import { Footer } from './components/Footer';
import { Links } from './pages/Links';


import { StickyNewsletter } from './components/StickyNewsletter';
import ReactGA from 'react-ga4';
import React, { useEffect } from 'react';
import { ScrollToTop } from './components/ScrollToTop';

import { SEO } from './components/SEO';
import { HeaderThemeProvider } from './context/HeaderContext';

// Initialize GA4 with a placeholder ID
// REPLACE 'G-XXXXXXXXXX' with your actual Measurement ID
ReactGA.initialize('G-1XT8V4LVRG');

// Tracker component to handle page view events on route change
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Send pageview with a custom path
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return null;
};
const NoiseOverlay = () => {
  const location = useLocation();
  const isCollectionsPage = location.pathname === '/collections';

  if (isCollectionsPage) return null;

  return <div className="noise-overlay" />;
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isLinksPage = location.pathname === '/links';

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
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/collections/:slug" element={<CollectionDetail />} />
                <Route path="/generator" element={<BookCurator />} />


                <Route path="/about" element={<About />} />
                <Route path="/genre/:slug" element={<Genre />} />
                <Route path="/long-book-finder" element={<Finder />} />

                {/* Journal Routes */}
                <Route path="/journal" element={<Journal />} />
                <Route path="/journal/:slug" element={<JournalPost />} />
                <Route path="/journal-generator" element={<JournalGenerator />} />
                
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
