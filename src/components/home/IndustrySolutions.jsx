import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { solutionsData } from '../../data/solutionsData';
import { ArrowRight, BookOpen, Clock, User } from 'lucide-react';

export const IndustrySolutions = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-[#F8FAFC] border-b border-[#CBD5E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[#3A8899] text-xs font-extrabold uppercase tracking-wider mb-1 font-sans">
              <BookOpen className="w-4 h-4" /> {t('sol_badge')}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mt-2 font-display">
              {t('sol_title')}
            </h2>
            <p className="text-sm text-[#475569] mt-1 font-sans font-medium">
              {t('sol_subtitle')}
            </p>
          </div>

          <Link
            to="/solutions"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#3A8899] hover:bg-[#2B6F7E] text-white font-extrabold text-xs transition-all shadow-sm shrink-0 font-sans"
          >
            <span>{t('view_all_articles')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutionsData.slice(0, 3).map((article) => (
            <div
              key={article.id}
              className="rounded-xl bg-white border-2 border-[#CBD5E1] p-6 flex flex-col justify-between group hover:border-[#3A8899] transition-all duration-200 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#64748B] mb-3 font-sans font-medium">
                  <span className="px-2.5 py-0.5 rounded bg-[#3A8899] text-white text-[10px] font-extrabold uppercase">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-[#3A8899]" /> {article.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0F172A] mb-2 group-hover:text-[#3A8899] transition-colors leading-snug font-display">
                  {article.title}
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed line-clamp-3 mb-6 font-sans font-medium">
                  {article.excerpt}
                </p>
              </div>

              <Link
                to={`/solutions#${article.id}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#3A8899] hover:underline font-sans"
              >
                <span>{t('read_guide')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
