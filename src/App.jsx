import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { QuoteProvider } from './context/QuoteContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { QuoteDrawer } from './components/layout/QuoteDrawer';

import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { BrandsPage } from './pages/BrandsPage';
import { BrandDetailPage } from './pages/BrandDetailPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPages } from './pages/LegalPages';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
};

export const App = () => {
  return (
    <LanguageProvider>
      <QuoteProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-b2b-bg text-[#0F172A]">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/brands" element={<BrandsPage />} />
                <Route path="/brand-detail" element={<BrandDetailPage />} />
                <Route path="/solutions" element={<SolutionsPage />} />
                <Route path="/article-detail" element={<ArticleDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/legal" element={<LegalPages />} />
              </Routes>
            </main>
            <Footer />
            <QuoteDrawer />
          </div>
        </BrowserRouter>
      </QuoteProvider>
    </LanguageProvider>
  );
};

export default App;
