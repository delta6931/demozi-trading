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
    <section className="pt-28 pb-14 bg-[#F1F5F9] border-b-4 border-[#0F172A] relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Brutalist B2B Header Badge */}
        <div className="inline-block mb-4">
          <span className="px-3 py-1 bg-[#0F172A] text-white text-xs font-mono font-bold tracking-wider uppercase border border-[#334155]">
            {t('hero_badge')}
          </span>
        </div>

        {/* Industrial B2B Main Headline */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-none uppercase font-display max-w-5xl mx-auto">
            {t('hero_title_main')}{' '}
            <span className="text-[#3A8899] block sm:inline">{t('hero_title_sub')}</span>
          </h1>

          <p className="text-xs sm:text-base text-[#334155] max-w-3xl mx-auto leading-relaxed font-sans font-bold pt-1">
            {t('hero_subtitle')}
          </p>

          {/* Solid Rectangular Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3.5 bg-[#3A8899] hover:bg-[#2B6F7E] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 border-2 border-[#2B6F7E] transition-colors shadow-xs"
            >
              <span>{t('hero_btn_primary')}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3.5 bg-[#FFFFFF] hover:bg-[#E2E8F0] text-[#0F172A] font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 border-2 border-[#0F172A] transition-colors shadow-xs"
            >
              <span>{t('hero_btn_secondary')}</span>
              <ArrowUpRight className="w-4 h-4 text-[#3A8899]" />
            </button>
          </div>

          {/* Rectangular Industrial Search Bar */}
          <form onSubmit={handleSearch} className="pt-6 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row bg-[#FFFFFF] border-2 border-[#0F172A] p-1.5 shadow-sharp">
              <div className="relative flex-1 flex items-center">
                <Search className={`w-5 h-5 text-[#3A8899] absolute ${isRtl ? 'right-4' : 'left-4'}`} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('search_placeholder')}
                  className={`w-full bg-transparent text-[#0F172A] text-xs sm:text-sm py-3 outline-none placeholder-[#64748B] font-mono font-semibold ${
                    isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'
                  }`}
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 transition-colors border border-[#0F172A] font-sans"
              >
                <span>{t('search_catalog_btn')}</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Industrial Keyword Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] font-sans">
              <span className="font-extrabold text-[#0F172A] uppercase font-mono">{t('popular_searches')}</span>
              {searchChips.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setQuery(t(item.key));
                    navigate(`/products?search=${encodeURIComponent(item.query)}`);
                  }}
                  className="px-2.5 py-1 bg-[#FFFFFF] hover:bg-[#E2E8F0] border border-[#0F172A] text-[#0F172A] font-bold transition-colors font-mono uppercase text-[10px]"
                >
                  {t(item.key)}
                </button>
              ))}
            </div>
          </form>

          {/* Brutalist Hard Grid Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t-2 border-[#CBD5E1] max-w-4xl mx-auto text-xs text-[#0F172A] font-mono font-bold uppercase">
            <div className="flex items-center justify-center gap-2 p-3 bg-white border-2 border-[#0F172A]">
              <ShieldCheck className="w-4 h-4 text-[#3A8899] shrink-0" />
              <span>{t('guarantee_1')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 bg-white border-2 border-[#0F172A]">
              <Truck className="w-4 h-4 text-[#3A8899] shrink-0" />
              <span>{t('guarantee_2')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 bg-white border-2 border-[#0F172A]">
              <FileText className="w-4 h-4 text-[#3A8899] shrink-0" />
              <span>{t('guarantee_3')}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
