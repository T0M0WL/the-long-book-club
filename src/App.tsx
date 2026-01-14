import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { BookDetails } from './pages/BookDetails';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Collections } from './pages/Collections';
import { CollectionDetail } from './pages/CollectionDetail';
import { ReviewGenerator } from './pages/ReviewGenerator';
import { About } from './pages/About';
import { Genre } from './pages/Genre';

import { ThankYou } from './pages/ThankYou';
import { Footer } from './components/Footer';

import { CookieConsent } from './components/CookieConsent';
import { StickyNewsletter } from './components/StickyNewsletter';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import { ScrollToTop } from './components/ScrollToTop';

import { SEO } from './components/SEO';

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

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="app-container">
          <ScrollToTop />
          <AnalyticsTracker />
          <SEO />
          <NoiseOverlay />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book/:slug" element={<BookDetails />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/collections/:slug" element={<CollectionDetail />} />
              <Route path="/generator" element={<ReviewGenerator />} />
              <Route path="/generator" element={<ReviewGenerator />} />

              <Route path="/about" element={<About />} />
              <Route path="/genre/:slug" element={<Genre />} />
            </Routes>
          </main>
          <Footer />
          <StickyNewsletter />
          <CookieConsent />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
