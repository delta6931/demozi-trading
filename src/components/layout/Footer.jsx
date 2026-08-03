import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0F172A] border-t-2 border-[#1E3A8A] text-[#94A3B8] font-sans text-xs py-6">
      <div className="max-w-[1024px] mx-auto px-4 space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pb-4 border-b border-[#334155]">
          
          <div>
            <h4 className="text-white font-bold uppercase font-mono text-xs border-b border-[#334155] pb-1 mb-2">
              ABOUT DEMOZİ
            </h4>
            <p className="text-[11px] text-[#CBD5E1] leading-relaxed">
              DEMOZİ KOZMETİK VE MAKİNA DIŞ TİCARET LİMİTED ŞİRKETİ is an international wholesale trading company.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase font-mono text-xs border-b border-[#334155] pb-1 mb-2">
              PRODUCT SECTORS
            </h4>
            <ul className="space-y-1 text-[11px] text-[#CBD5E1]">
              <li><Link to="/products?category=Cosmetics" className="hover:text-white">▸ Cosmetics & Personal Care</Link></li>
              <li><Link to="/products?category=Industrial Equipment" className="hover:text-white">▸ Machinery & Hardware</Link></li>
              <li><Link to="/solutions" className="hover:text-white">▸ External Trade & Customs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase font-mono text-xs border-b border-[#334155] pb-1 mb-2">
              B2B DIRECTORY
            </h4>
            <ul className="space-y-1 text-[11px] text-[#CBD5E1]">
              <li><Link to="/" className="hover:text-white">▸ Home Portal</Link></li>
              <li><Link to="/products" className="hover:text-white">▸ Full Product Catalog</Link></li>
              <li><Link to="/brands" className="hover:text-white">▸ Partner Brands</Link></li>
              <li><Link to="/contact" className="hover:text-white">▸ Request Pro-Forma RFQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase font-mono text-xs border-b border-[#334155] pb-1 mb-2">
              REGIONAL HQ OFFICES
            </h4>
            <div className="text-[11px] text-[#CBD5E1] space-y-1.5 font-mono">
              <div>
                <strong className="text-white">Turkey HQ:</strong> Istanbul, Türkiye
              </div>
              <div>
                <strong className="text-white">Iraq Branch:</strong> Erbil, Iraq
              </div>
              <div>
                <strong className="text-white">Email:</strong> info@demozi.com
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-[#94A3B8] gap-2">
          <p>© 2010-2026 DEMOZİ KOZMETİK VE MAKİNA DIŞ TİCARET LİMİTED ŞİRKETİ. All Rights Reserved.</p>
          <div className="flex gap-3">
            <Link to="/legal" className="hover:text-white">Terms of Trade</Link>
            <Link to="/legal" className="hover:text-white">Privacy Policy</Link>
            <Link to="/legal" className="hover:text-white">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
