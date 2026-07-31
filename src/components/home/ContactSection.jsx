import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useQuote } from '../../context/QuoteContext';
import { MapPin, Mail, Phone, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection = () => {
  const { t } = useLanguage();
  const { quoteItems, clearQuote } = useQuote();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      if (quoteItems.length > 0) clearQuote();
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 bg-[#F8FAFC] border-b border-[#CBD5E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2.5">
              <img src="/assets/logo_transparent.png" alt="" className="h-6 w-auto" />
              <span className="px-2.5 py-1 rounded bg-[#E2E8F0] border border-[#CBD5E1] text-[#0F172A] text-xs font-extrabold font-sans uppercase tracking-wider shadow-xs">
                {t('contact_desk_badge')}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight font-display">
              {t('contact_title')}
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-sans font-medium">
              {t('contact_subtitle')}
            </p>

            {/* Offices - Darker Slate Cards */}
            <div className="space-y-3 pt-2 font-sans">
              <div className="p-3.5 rounded-xl bg-[#F1F5F9] border-2 border-[#CBD5E1] flex items-start gap-3 text-xs shadow-xs">
                <MapPin className="w-4 h-4 text-[#3A8899] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F172A] block">{t('hq_title')}</strong>
                  <span className="text-[#475569]">{t('hq_addr')}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F1F5F9] border-2 border-[#CBD5E1] flex items-start gap-3 text-xs shadow-xs">
                <MapPin className="w-4 h-4 text-[#3A8899] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0F172A] block">{t('branch_title')}</strong>
                  <span className="text-[#475569]">{t('branch_addr')}</span>
                </div>
              </div>
            </div>

            {/* Contacts */}
            <div className="pt-1 space-y-1.5 text-xs text-[#475569] font-sans font-medium">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#3A8899]" />
                <a href="mailto:info@demozi.com" className="hover:text-[#0F172A]">info@demozi.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#3A8899]" />
                <span className="font-mono">+90 539 661 9004 | +964 770 933 2185</span>
              </div>
            </div>
          </div>

          {/* Right Form Column - Dark Slate Contrast Container */}
          <div className="lg:col-span-7 bg-[#0F172A] border border-[#334155] rounded-2xl p-6 sm:p-8 shadow-2xl text-white">
            <h3 className="text-lg font-bold text-white mb-4 font-display flex items-center justify-between">
              <span>{t('contact_title')}</span>
              {quoteItems.length > 0 && (
                <span className="text-xs text-[#52B5C9] font-mono font-normal">
                  ({quoteItems.length} {t('items_count')})
                </span>
              )}
            </h3>

            {submitted ? (
              <div className="p-6 text-center space-y-2 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-200 font-sans">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
                <h4 className="font-bold text-base">{t('rfq_sent_success')}</h4>
                <p className="text-xs text-emerald-300">{t('rfq_sent_desc')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#CBD5E1] mb-1">{t('your_name_company')}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ahmet Yilmaz"
                      className="w-full bg-[#1E293B] border border-[#334155] rounded-lg px-3 py-2 text-white outline-none focus:border-[#52B5C9]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#CBD5E1] mb-1">{t('your_email')}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full bg-[#1E293B] border border-[#334155] rounded-lg px-3 py-2 text-white outline-none focus:border-[#52B5C9]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#CBD5E1] mb-1">{t('your_phone')}</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+90... / +964..."
                    className="w-full bg-[#1E293B] border border-[#334155] rounded-lg px-3 py-2 text-white outline-none focus:border-[#52B5C9] font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#CBD5E1] mb-1">{t('part_numbers_message')}</label>
                  <textarea
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      quoteItems.length > 0
                        ? `Selected items:\n${quoteItems.map((i) => `- ${i.name} (Qty: ${i.quantity})`).join('\n')}`
                        : 'List required products or inquiry...'
                    }
                    className="w-full bg-[#1E293B] border border-[#334155] rounded-lg px-3 py-2 text-white outline-none focus:border-[#52B5C9] text-xs font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#3A8899] hover:bg-[#2B6F7E] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md font-sans"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('submit_inquiry')}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
