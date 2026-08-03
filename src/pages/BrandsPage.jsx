import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { brandsData } from '../data/brandsData';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const BrandsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2E8F0] border border-[#CBD5E1] text-[#3A8899] text-xs font-extrabold uppercase tracking-wider shadow-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>{t('global_manufacturers')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight font-display">
            {t('direct_brands')}
          </h1>
          <p className="text-sm text-[#475569] font-medium max-w-xl mx-auto">
            DEMOZİ KOZMETİK VE MAKİNA DIŞ TİCARET LİMİTED ŞİRKETİ provides direct supply, original manufacturer warranties, and technical support across Turkey and Iraq.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {brandsData.map((brand) => (
            <div
              key={brand.id}
              className="rounded-2xl bg-[#F1F5F9] border-2 border-[#CBD5E1] hover:border-[#3A8899] p-8 flex flex-col justify-between group shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div>
                <div className="w-16 h-16 rounded-xl bg-white p-3 mb-6 flex items-center justify-center border border-[#CBD5E1] group-hover:scale-105 transition-transform shadow-xs">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'assets/logo_dark.png';
                    }}
                  />
                </div>

                <span className="text-[11px] font-extrabold text-[#3A8899] uppercase tracking-wider block mb-1">
                  {brand.category}
                </span>

                <h3 className="text-xl font-bold text-[#0F172A] mb-2 group-hover:text-[#3A8899] transition-colors font-display">
                  {brand.name}
                </h3>

                <p className="text-xs text-[#475569] leading-relaxed font-medium mb-6">
                  {brand.description}
                </p>
              </div>

              <Link
                to={`/products?brand=${encodeURIComponent(brand.id)}`}
                className="w-full py-3 rounded-xl bg-[#3A8899] hover:bg-[#2B6F7E] text-white text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-sm font-sans"
              >
                <span>View {brand.name} Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
