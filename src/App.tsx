import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { BookDetails } from './pages/BookDetails';
import { PrivacyPolicy } from './pages/PrivacyPolicy';

import { Footer } from './components/Footer';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
