import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FileText, ArrowRight, ShieldCheck, MessageSquare } from 'lucide-react';

export const SolutionsPage = () => {
  const { t } = useLanguage();

  const articlesList = [
    { id: 'art1', title: t('art1_title'), desc: t('art1_desc'), category: 'Cosmetics Export', date: '2026-08-05' },
    { id: 'art2', title: t('art2_title'), desc: t('art2_desc'), category: 'Industrial Machinery', date: '2026-08-04' },
    { id: 'art3', title: t('art3_title'), desc: t('art3_desc'), category: 'Turkey - Iraq Logistics', date: '2026-08-03' },
    { id: 'art4', title: t('art4_title'), desc: t('art4_desc'), category: 'Packaging Equipment', date: '2026-08-02' }
  ];

  return (
    <div className="bg-white border border-[#CBD5E1] p-4 shadow-sm my-4 font-sans text-xs max-w-[1024px] mx-auto space-y-4">
      
      {/* Header Banner */}
      <div className="border-2 border-[#1E3A8A] bg-[#F1F5F9] p-4 text-center space-y-2">
        <span className="px-2 py-0.5 bg-[#1E3A8A] text-white text-[10px] font-mono font-bold uppercase">
          {t('solutions_badge')}
        </span>
        <h1 className="text-2xl font-extrabold text-[#0F172A] uppercase font-display">
          {t('solutions_title')}
        </h1>
        <p className="text-xs text-[#334155] max-w-2xl mx-auto leading-relaxed">
          {t('solutions_subtitle')}
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {articlesList.map((article) => (
          <div
            key={article.id}
            className="bg-white border-2 border-[#0F172A] p-4 flex flex-col justify-between group hover:bg-[#F8FAFC] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-[10px] text-[#64748B] mb-2 border-b border-[#E2E8F0] pb-1">
                <span className="font-bold text-[#1E3A8A] uppercase">[{article.category}]</span>
                <span>{article.date}</span>
              </div>

              <h3 className="text-sm font-extrabold text-[#0F172A] mb-2 font-display uppercase group-hover:text-[#1E3A8A] transition-colors">
                {article.title}
              </h3>

              <p className="text-[11px] text-[#475569] leading-relaxed mb-4">
                {article.desc}
              </p>
            </div>

            <Link
              to={`/article-detail?id=${article.id}`}
              className="w-full py-2 bg-[#1E3A8A] hover:bg-[#1E293B] text-white text-xs font-bold font-mono uppercase flex items-center justify-center gap-1.5 border border-[#1E3A8A]"
            >
              <span>{t('read_guide')} »</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>

      {/* Consultation Box */}
      <div className="p-4 bg-[#F1F5F9] border-2 border-[#1E3A8A] flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
        <div>
          <h4 className="font-extrabold text-[#0F172A] text-xs uppercase">{t('need_custom_solution')}</h4>
          <p className="text-[11px] text-[#475569]">{t('contact_team_desc')}</p>
        </div>
        <Link
          to="/contact"
          className="px-5 py-2.5 bg-[#1E3A8A] hover:bg-[#1E293B] text-white font-bold text-xs uppercase shrink-0"
        >
          {t('talk_to_engineer')}
        </Link>
      </div>

    </div>
  );
};
