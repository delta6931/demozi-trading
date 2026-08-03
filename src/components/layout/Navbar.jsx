import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useQuote } from '../../context/QuoteContext';
import { Search, ShoppingCart, Globe, Phone, Mail, MapPin } from 'lucide-react';

export const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { totalCount, setIsDrawerOpen } = useQuote();
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const navTabs = [
    { name: t('nav_home'), path: '/' },
    { name: t('nav_products'), path: '/products' },
    { name: t('nav_brands'), path: '/brands' },
    { name: t('nav_solutions'), path: '/solutions' },
    { name: t('nav_contact'), path: '/contact' }
  ];

  return (
    <header className="bg-white border-b-2 border-[#1E3A8A] font-sans">
      
      {/* 1. 2010 Light Gray B2B Utility Top Strip */}
      <div className="bg-[#F1F5F9] text-[#334155] text-[11px] py-1.5 px-3 border-b border-[#CBD5E1]">
        <div className="max-w-[1024px] mx-auto flex items-center justify-between font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-[#1E3A8A]" /> {t('hq_title')} & {t('branch_title')}
            </span>
            <a href="mailto:info@demozi.com" className="flex items-center gap-1 text-[#1E3A8A] hover:underline font-bold">
              <Mail className="w-3.5 h-3.5" /> info@demozi.com
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#0F172A] font-bold">
              <Phone className="w-3.5 h-3.5 text-[#1E3A8A]" /> +90 539 661 9004 | +964 770 933 2185
            </span>
            <div className="flex items-center gap-1 border-l border-[#CBD5E1] pl-3">
              <Globe className="w-3.5 h-3.5 text-[#1E3A8A]" />
              {['en', 'tr', 'ar'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-0.5 text-[10px] uppercase font-bold border ${
                    lang === l
                      ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                      : 'bg-white text-[#475569] border-[#CBD5E1] hover:bg-[#E2E8F0]'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. 2010 B2B Main Branding & Search Header */}
      <div className="max-w-[1024px] mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
        
        {/* Left: Logo Asset EMOZI (4).png */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src="/assets/header_logo.png"
            alt="DEMOZİ"
            className="h-10 sm:h-12 w-auto max-w-[300px] object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'assets/header_logo.png';
            }}
          />
        </Link>

        {/* Center: 2010 B2B Catalog Search Box */}
        <form onSubmit={handleSearchSubmit} className="flex items-center border-2 border-[#1E3A8A] bg-white w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search_placeholder')}
            className="flex-1 px-3 py-1.5 text-xs text-[#0F172A] outline-none font-mono"
          />
          <button
            type="submit"
            className="px-5 py-1.5 bg-[#1E3A8A] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 font-sans"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>
        </form>

        {/* Right: RFQ Inquiry Basket Box */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 px-3 py-2 bg-[#F1F5F9] border border-[#1E3A8A] hover:bg-[#E2E8F0] text-[#0F172A] font-bold text-xs shrink-0 font-mono"
        >
          <ShoppingCart className="w-4 h-4 text-[#1E3A8A]" />
          <span>{t('quote_basket')}</span>
          <span className="px-1.5 py-0.5 bg-[#1E3A8A] text-white text-[10px] font-extrabold">
            {totalCount}
          </span>
        </button>

      </div>

      {/* 3. 2010 Horizontal Navigation Tab Bar */}
      <div className="bg-[#1E3A8A] border-t border-[#1E293B]">
        <div className="max-w-[1024px] mx-auto flex items-center overflow-x-auto text-xs font-bold text-white uppercase font-sans">
          {navTabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`px-5 py-2.5 border-r border-[#3B82F6]/30 hover:bg-[#1E293B] transition-colors whitespace-nowrap ${
                  isActive ? 'bg-[#0F172A] text-white border-b-2 border-amber-400' : 'text-slate-100'
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>

    </header>
  );
};
