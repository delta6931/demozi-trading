import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { brandsData } from '../../data/brandsData';
import { ArrowRight, Award } from 'lucide-react';

export const BrandBar = () => {
  const { t, isRtl } = useLanguage();
  const featuredBrands = brandsData.slice(0, 6);

  return (
    <section className="py-12 bg-[#F8FAFC] border-b border-[#CBD5E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <img src="/assets/logo_dark.png" alt="Demozi" className="h-7 w-auto object-contain" />
              <span className="px-2.5 py-0.5 rounded bg-[#E2E8F0] border border-[#CBD5E1] text-[#0F172A] text-[10px] font-extrabold font-sans uppercase tracking-wider">
                {t('direct_brands')}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-display">
              {t('global_manufacturers')}
            </h2>
          </div>

          <Link
            to="/brands"
            className="px-4 py-2 rounded-lg bg-white hover:bg-[#E2E8F0] border border-[#CBD5E1] text-[#0F172A] text-xs font-bold flex items-center gap-2 transition-colors shadow-xs font-sans"
          >
            <span>{t('view_all_brands')}</span>
            <ArrowRight className={`w-3.5 h-3.5 text-[#3A8899] ${isRtl ? 'rotate-180' : ''}`} />
          </Link>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredBrands.map((brand) => (
            <Link
              key={brand.id}
              to={`/brands?id=${brand.id}`}
              className="p-4 rounded-xl bg-white border border-[#CBD5E1] hover:border-[#3A8899] flex flex-col items-center justify-center text-center group transition-all duration-200 shadow-xs hover:shadow-md"
            >
              <div className="w-full h-16 flex items-center justify-center mb-2 p-1">
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
              <h3 className="text-xs font-bold text-[#0F172A] group-hover:text-[#3A8899] transition-colors font-display line-clamp-1">
                {brand.name}
              </h3>
              <span className="text-[10px] text-[#64748B] font-sans font-medium line-clamp-1 mt-0.5">
                {brand.origin || 'Certified Supply'}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
