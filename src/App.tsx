import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { BookDetails } from './pages/BookDetails';

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
            </Routes>
          </main>

          <footer style={{
            marginTop: '4rem',
            padding: '2rem 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            color: 'var(--color-text-muted)',
            fontSize: '0.875rem'
          }}>
            <p>© {new Date().getFullYear()} The Long Book Club. All rights reserved.</p>
          </footer>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
