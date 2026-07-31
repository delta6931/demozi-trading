import React from 'react';
import { ContactSection } from '../components/home/ContactSection';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Mail, Phone, Clock, ShieldCheck, Globe, FileText } from 'lucide-react';

export const ContactPage = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dedicated Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2E8F0] border border-[#CBD5E1] text-[#3A8899] text-xs font-extrabold uppercase tracking-wider shadow-xs font-sans">
            <Globe className="w-4 h-4" />
            <span>Corporate Sales & Customer Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight font-display">
            Contact & Sales Inquiry
          </h1>
          <p className="text-sm text-[#475569] font-medium max-w-xl mx-auto">
            Reach out to our sales engineering team in Istanbul headquarters or Kirkuk regional branch for product quotes, datasheets, and international trade supply.
          </p>
        </div>

        {/* 2 Regional Headquarters Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Turkey HQ */}
          <div className="rounded-2xl bg-[#0F172A] border border-[#334155] p-6 text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#334155] pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#52B5C9]" />
                <h3 className="font-bold text-white text-base font-display">{t('hq_title')}</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-[#3A8899] text-white text-[10px] font-extrabold uppercase font-sans">
                Headquarters
              </span>
            </div>

            <p className="text-xs text-[#CBD5E1] leading-relaxed font-sans">
              DEMOZİ KOZMETİK VE MAKİNA DIŞ TİCARET LİMİTED ŞİRKETİ<br />
              {t('hq_addr')}
            </p>

            <div className="pt-2 space-y-2 text-xs font-sans">
              <div className="flex items-center gap-2 text-[#CBD5E1]">
                <Phone className="w-4 h-4 text-[#52B5C9]" />
                <span className="font-mono font-bold text-white">+90 539 661 9004</span>
              </div>
              <div className="flex items-center gap-2 text-[#CBD5E1]">
                <Mail className="w-4 h-4 text-[#52B5C9]" />
                <a href="mailto:info@demozi.com" className="hover:text-white">info@demozi.com</a>
              </div>
              <div className="flex items-center gap-2 text-[#CBD5E1]">
                <Clock className="w-4 h-4 text-[#52B5C9]" />
                <span>Mon - Sat: 08:30 - 18:00 (TRT)</span>
              </div>
            </div>
          </div>

          {/* Iraq Regional Branch */}
          <div className="rounded-2xl bg-[#0F172A] border border-[#334155] p-6 text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#334155] pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#52B5C9]" />
                <h3 className="font-bold text-white text-base font-display">{t('branch_title')}</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-[#3A8899] text-white text-[10px] font-extrabold uppercase font-sans">
                Regional Branch
              </span>
            </div>

            <p className="text-xs text-[#CBD5E1] leading-relaxed font-sans">
              Baghdad Road, Kirkuk, Iraq 36001
            </p>

            <div className="pt-2 space-y-2 text-xs font-sans">
              <div className="flex items-center gap-2 text-[#CBD5E1]">
                <Phone className="w-4 h-4 text-[#52B5C9]" />
                <span className="font-mono font-bold text-white">+964 770 933 2185</span>
              </div>
              <div className="flex items-center gap-2 text-[#CBD5E1]">
                <Mail className="w-4 h-4 text-[#52B5C9]" />
                <a href="mailto:info@demozi.com" className="hover:text-white">info@demozi.com</a>
              </div>
              <div className="flex items-center gap-2 text-[#CBD5E1]">
                <Clock className="w-4 h-4 text-[#52B5C9]" />
                <span>Sat - Thu: 08:30 - 18:00 (AST)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Embedded Contact & RFQ Form Component */}
        <ContactSection />

      </div>
    </div>
  );
};
