import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useQuote } from '../../context/QuoteContext';
import { Menu, X, Globe, Phone, Mail, ShoppingBag, MapPin } from 'lucide-react';

export const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { totalCount, setIsDrawerOpen } = useQuote();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: t('nav_home'), path: '/' },
    { name: t('nav_products'), path: '/products' },
    { name: t('nav_brands'), path: '/brands' },
    { name: t('nav_solutions'), path: '/solutions' },
    { name: t('nav_contact'), path: '/contact' }
  ];

  const handleLinkClick = (e, link) => {
    if (link.path === '/contact') {
      if (location.pathname === '/') {
        e.preventDefault();
        const elem = document.getElementById('contact');
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate('/contact');
        }
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0F172A]/95 backdrop-blur-md border-b border-[#334155] shadow-md">
      
      {/* Top Utility Bar */}
      <div className="bg-[#0B131A] border-b border-[#1E293B] text-[11px] text-[#94A3B8] py-1.5 px-4 hidden sm:block font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 font-medium whitespace-nowrap text-[#CBD5E1]">
              <MapPin className="w-3.5 h-3.5 text-[#52B5C9] shrink-0" /> {t('hq_title')} & {t('branch_title')}
            </span>
            <a href="mailto:info@demozi.com" className="flex items-center gap-1 text-[#52B5C9] hover:text-white transition-colors whitespace-nowrap">
              <Mail className="w-3.5 h-3.5 shrink-0" /> info@demozi.com
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-semibold text-white whitespace-nowrap font-mono">
              <Phone className="w-3.5 h-3.5 text-[#52B5C9] shrink-0" /> +90 539 661 9004 | +964 770 933 2185
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo Image */}
          <Link to="/" className="flex items-center shrink-0 group">
            <img
              src="/assets/logo_transparent.png"
              alt="DEMOZİ Logo"
              className="h-10 sm:h-12 w-auto max-w-[240px] sm:max-w-[320px] object-contain transition-transform group-hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'assets/logo.png';
              }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#1E293B] border border-[#334155] rounded-lg p-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded transition-all whitespace-nowrap font-sans ${
                    isActive
                      ? 'bg-[#3A8899] text-white shadow-sm'
                      : 'text-[#CBD5E1] hover:text-white hover:bg-[#334155]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Controls: RFQ Basket & Lang Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Language Toggle */}
            <div className="flex items-center bg-[#1E293B] border border-[#334155] rounded-lg p-0.5 text-[11px] font-bold">
              <Globe className="w-3.5 h-3.5 text-[#52B5C9] mx-1.5 shrink-0 hidden sm:inline-block" />
              {['en', 'tr', 'ar'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded uppercase transition-all whitespace-nowrap font-sans ${
                    lang === l
                      ? 'bg-[#3A8899] text-white font-extrabold'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Quote Basket CTA */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#3A8899] hover:bg-[#2B6F7E] text-white font-extrabold text-xs transition-all shadow-sm whitespace-nowrap font-sans"
            >
              <ShoppingBag className="w-4 h-4 text-white shrink-0" />
              <span className="hidden sm:inline">{t('quote_basket')}</span>
              {totalCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#0B131A] text-[#52B5C9] font-extrabold text-[10px] flex items-center justify-center sm:-mr-1 font-mono">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile / Tablet Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-[#1E293B] border border-[#334155] text-[#94A3B8] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile / Tablet Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0F172A] border-b border-[#334155] px-4 py-4 space-y-2.5 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={(e) => handleLinkClick(e, link)}
              className={`block px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors font-sans ${
                location.pathname === link.path
                  ? 'bg-[#3A8899] text-white font-bold'
                  : 'text-[#CBD5E1] hover:bg-[#1E293B] hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-3 border-t border-[#334155] flex items-center justify-between text-xs">
            <span className="text-[#94A3B8] flex items-center gap-1 font-semibold font-sans">
              <Globe className="w-4 h-4 text-[#52B5C9]" /> Language:
            </span>
            <div className="flex gap-1.5 font-bold">
              {['en', 'tr', 'ar'].map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2.5 py-1 rounded uppercase font-sans ${
                    lang === l ? 'bg-[#3A8899] text-white' : 'bg-[#1E293B] text-[#94A3B8]'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
