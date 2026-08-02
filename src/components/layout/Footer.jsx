import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Mail } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0F172A] border-t border-[#334155] text-[#94A3B8] pt-14 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 text-xs">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src="/assets/logo_transparent.png" alt="Demozi Logo" className="h-10 w-auto object-contain" />
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight font-display block leading-none">DEMOZİ</span>
                <p className="text-[10px] text-[#52B5C9] font-bold uppercase font-sans mt-1">KOZMETİK VE MAKİNA DIŞ TİCARET</p>
              </div>
            </div>
            <p className="leading-relaxed text-[#CBD5E1]">
              {t('footer_company_desc')}
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-sans border-b border-[#334155] pb-1.5">
              {t('footer_categories')}
            </h4>
            <ul className="space-y-1.5 text-[#CBD5E1]">
              <li><Link to="/products?category=Cosmetics" className="hover:text-[#52B5C9] transition-colors">Cosmetics & Personal Care</Link></li>
              <li><Link to="/products?category=Industrial Equipment" className="hover:text-[#52B5C9] transition-colors">Machinery Equipment & Hardware</Link></li>
              <li><Link to="/solutions" className="hover:text-[#52B5C9] transition-colors">External Trade & Supply</Link></li>
              <li><Link to="/brands" className="hover:text-[#52B5C9] transition-colors">Global Brands & Partners</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-sans border-b border-[#334155] pb-1.5">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-[#CBD5E1]">
              <li><Link to="/" className="hover:text-[#52B5C9] transition-colors">{t('nav_home')}</Link></li>
              <li><Link to="/products" className="hover:text-[#52B5C9] transition-colors">{t('nav_products')}</Link></li>
              <li><Link to="/brands" className="hover:text-[#52B5C9] transition-colors">{t('nav_brands')}</Link></li>
              <li><Link to="/solutions" className="hover:text-[#52B5C9] transition-colors">{t('nav_solutions')}</Link></li>
              <li><Link to="/contact" className="hover:text-[#52B5C9] transition-colors">{t('nav_contact')}</Link></li>
            </ul>
          </div>

          {/* Regional Offices */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-sans border-b border-[#334155] pb-1.5">
              {t('footer_offices')}
            </h4>
            <div className="space-y-2 text-xs text-[#CBD5E1]">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-[#52B5C9] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">{t('hq_title')}</strong>
                  <span>{t('hq_addr')}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-[#52B5C9] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">{t('branch_title')}</strong>
                  <span>{t('branch_addr')}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Mail className="w-3.5 h-3.5 text-[#52B5C9] shrink-0 mt-0.5" />
                <a href="mailto:info@demozi.com" className="hover:text-white">info@demozi.com</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#334155] flex flex-col md:flex-row items-center justify-between text-[11px] text-[#94A3B8] gap-3">
          <p>{t('rights')}</p>
          <div className="flex gap-4">
            <Link to="/legal" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/legal" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/legal" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
