import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { brandsData } from '../../data/brandsData';
import { ArrowRight } from 'lucide-react';

export const BrandBar = () => {
  const { t } = useLanguage();
  const featuredBrands = brandsData.filter(b => b.featured);

  return (
    <section className="py-12 bg-[#F1F5F9] border-b border-[#CBD5E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <img src="/assets/logo_transparent.png" alt="Demozi" className="h-8 w-auto" />
            <div>
              <div className="text-[#3A8899] text-xs font-extrabold uppercase tracking-wider font-display">
                {t('global_manufacturers')}
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight font-display">
                {t('direct_brands')}
              </h2>
            </div>
          </div>

          <Link
            to="/brands"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#3A8899] hover:underline transition-colors font-sans"
          >
            <span>{t('view_all_brands')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredBrands.map((brand) => (
            <Link
              key={brand.id}
              to={`/products?brand=${encodeURIComponent(brand.id)}`}
              className="p-4 rounded-xl bg-white border border-[#CBD5E1] hover:border-[#3A8899] flex flex-col items-center justify-center text-center group transition-all duration-200 shadow-sm"
            >
              <div className="w-12 h-12 mb-2 rounded bg-[#F8FAFC] p-2 flex items-center justify-center border border-[#E2E8F0] group-hover:scale-105 transition-transform">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <h3 className="text-xs font-bold text-[#0F172A] group-hover:text-[#3A8899] transition-colors font-sans">
                {brand.name}
              </h3>
              <span className="text-[10px] text-[#64748B] mt-0.5 line-clamp-1 font-sans">
                {brand.category}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
