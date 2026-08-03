import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Search, ArrowRight, ShieldCheck, Truck, FileText, ArrowUpRight } from 'lucide-react';

export const Hero = () => {
  const { t, isRtl } = useLanguage();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const searchChips = [
    { key: 'cat_cosmetics', query: 'Cosmetics' },
    { key: 'cat_machinery', query: 'Machinery Equipment' },
    { key: 'cat_industrial_parts', query: 'Industrial Parts' },
    { key: 'cat_logistics', query: 'Customs Logistics' }
  ];

  return (
    <section className="pt-28 pb-16 bg-[#F8FAFC] border-b border-[#CBD5E1] relative overflow-hidden">
      {/* Background Decorative Subtle Gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#3A8899]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#52B5C9]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Main Hero Header Content */}
        <div className="space-y-6">
          
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-tight font-display max-w-4xl mx-auto">
            {t('hero_title_main')}{' '}
            <span className="text-[#3A8899] block sm:inline">{t('hero_title_sub')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed font-sans font-medium">
            {t('hero_subtitle')}
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-sans">
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3.5 rounded-xl bg-[#3A8899] hover:bg-[#2B6F7E] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
            >
              <span>{t('hero_btn_primary')}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3.5 rounded-xl bg-[#F1F5F9] hover:bg-[#E2E8F0] border-2 border-[#CBD5E1] text-[#0F172A] font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs"
            >
              <span>{t('hero_btn_secondary')}</span>
              <ArrowUpRight className="w-4 h-4 text-[#3A8899]" />
            </button>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="pt-4 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2 bg-[#F1F5F9] border-2 border-[#CBD5E1] p-2 rounded-2xl shadow-sharp focus-within:border-[#3A8899] transition-colors">
              <div className="relative flex-1 flex items-center">
                <Search className={`w-5 h-5 text-[#3A8899] absolute ${isRtl ? 'right-4' : 'left-4'}`} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('search_placeholder')}
                  className={`w-full bg-transparent text-[#0F172A] text-xs sm:text-sm py-3 outline-none placeholder-[#64748B] font-sans ${
                    isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'
                  }`}
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 transition-all shadow-sm font-sans"
              >
                <span>{t('search_catalog_btn')}</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Suggestions Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] text-[#64748B] font-sans">
              <span className="font-bold text-[#0F172A]">{t('popular_searches')}</span>
              {searchChips.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setQuery(t(item.key));
                    navigate(`/products?search=${encodeURIComponent(item.query)}`);
                  }}
                  className="px-3 py-1 rounded-lg bg-[#E2E8F0] hover:bg-[#CBD5E1] border border-[#CBD5E1] text-[#0F172A] font-bold transition-colors shadow-xs"
                >
                  {t(item.key)}
                </button>
              ))}
            </div>
          </form>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-[#CBD5E1] max-w-3xl mx-auto text-xs text-[#475569] font-sans font-semibold">
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#F1F5F9] border border-[#CBD5E1]">
              <ShieldCheck className="w-4 h-4 text-[#3A8899] shrink-0" />
              <span>{t('guarantee_1')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#F1F5F9] border border-[#CBD5E1]">
              <Truck className="w-4 h-4 text-[#3A8899] shrink-0" />
              <span>{t('guarantee_2')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#F1F5F9] border border-[#CBD5E1]">
              <FileText className="w-4 h-4 text-[#3A8899] shrink-0" />
              <span>{t('guarantee_3')}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
