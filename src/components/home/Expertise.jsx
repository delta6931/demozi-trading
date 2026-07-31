import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Cpu, Sparkles, Globe, CheckCircle2, ArrowRight } from 'lucide-react';

export const Expertise = () => {
  const { t } = useLanguage();

  const expertiseCards = [
    {
      id: 'machinery',
      icon: Cpu,
      title: t('exp_1_title'),
      desc: t('exp_1_desc'),
      features: ['Endüstriyel Üretim Ekipmanları', 'Yedek Parça Tedariği', 'Tesis Donanımları'],
      brandTag: 'MAKİNA & EKİPMAN',
      link: '/products?category=Industrial Equipment'
    },
    {
      id: 'cosmetics',
      icon: Sparkles,
      title: t('exp_2_title'),
      desc: t('exp_2_desc'),
      features: ['Kişisel Bakım Ürünleri', 'Güzellik & Estetik Donanımları', 'Uluslararası Marka Tedariği'],
      brandTag: 'KOZMETİK & BAKIM',
      link: '/products?category=Cosmetics'
    },
    {
      id: 'trade',
      icon: Globe,
      title: t('exp_3_title'),
      desc: t('exp_3_desc'),
      features: ['Türkiye & Irak Lojistik Hattı', 'Hızlı Gümrükleme & Dağıtım', 'Proforma Fatura Tedariği'],
      brandTag: 'DIŞ TİCARET & LOJİSTİK',
      link: '/solutions'
    }
  ];

  return (
    <section className="py-16 bg-[#F8FAFC] border-b border-[#CBD5E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-2">
          <span className="px-2.5 py-1 rounded bg-[#E2E8F0] border border-[#CBD5E1] text-[#0F172A] text-xs font-extrabold font-sans uppercase tracking-wider shadow-xs">
            {t('exp_header_badge')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight font-display">
            {t('exp_title')}
          </h2>
          <p className="text-sm text-[#475569] font-sans font-medium">
            {t('exp_subtitle')}
          </p>
        </div>

        {/* 3 Main Focus Cards with Darker Slate Contrast Surfaces */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {expertiseCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="rounded-xl bg-[#F1F5F9] border-2 border-[#CBD5E1] p-6 flex flex-col justify-between hover:border-[#3A8899] transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded bg-[#0F172A] text-[#52B5C9] flex items-center justify-center border border-[#334155]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#0F172A] text-white font-sans">
                      {card.brandTag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0F172A] mb-2 font-display">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#475569] leading-relaxed mb-4 font-sans font-medium">
                    {card.desc}
                  </p>

                  <ul className="space-y-2 mb-6 font-sans">
                    {card.features.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-[#1E293B] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3A8899] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={card.link}
                  className="w-full py-2.5 rounded-lg bg-[#3A8899] hover:bg-[#2B6F7E] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-sm font-sans"
                >
                  <span>{t('browse_category')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
