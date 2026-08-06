import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { brandsData } from '../data/brandsData';
import { ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export const BrandsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white border border-[#CBD5E1] p-4 shadow-sm my-4 font-sans text-xs max-w-[1024px] mx-auto space-y-4">
      
      {/* Header */}
      <div className="border-2 border-[#1E3A8A] bg-[#F1F5F9] p-4 text-center space-y-2">
        <span className="px-2 py-0.5 bg-[#1E3A8A] text-white text-[10px] font-mono font-bold uppercase">
          {t('global_manufacturers')}
        </span>
        <h1 className="text-2xl font-extrabold text-[#0F172A] uppercase font-display">
          {t('direct_brands')}
        </h1>
        <p className="text-xs text-[#334155] max-w-2xl mx-auto leading-relaxed">
          DEMOZİ KOZMETİK VE MAKİNA DIŞ TİCARET LİMİTED ŞİRKETİ provides certified manufacturer supply, factory warranties, and technical support across Turkey and Iraq.
        </p>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {brandsData.map((brand) => (
          <div
            key={brand.id}
            className="bg-white border-2 border-[#0F172A] p-4 flex flex-col justify-between group hover:bg-[#F8FAFC] transition-colors"
          >
            <div>
              <div className="w-full h-20 bg-[#F1F5F9] border border-[#CBD5E1] p-2 mb-3 flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'assets/logo_dark.png';
                  }}
                />
              </div>

              <span className="text-[10px] font-bold text-[#1E3A8A] uppercase font-mono block mb-1">
                [{brand.category || 'Manufacturer'}]
              </span>

              <h3 className="text-sm font-extrabold text-[#0F172A] mb-1 font-display uppercase">
                {brand.name}
              </h3>

              <p className="text-[11px] text-[#475569] leading-snug mb-3 line-clamp-2">
                {brand.description}
              </p>
            </div>

            <Link
              to={`/brand-detail?id=${brand.id}`}
              className="w-full py-2 bg-[#1E3A8A] hover:bg-[#1E293B] text-white text-xs font-bold font-mono uppercase flex items-center justify-center gap-1.5 border border-[#1E3A8A]"
            >
              <span>Explore {brand.name} Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
};
