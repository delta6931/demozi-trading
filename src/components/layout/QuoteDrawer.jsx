import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useQuote } from '../../context/QuoteContext';
import { X, Trash2, Send, CheckCircle2, ShoppingBag, Plus, Minus, FileText } from 'lucide-react';

export const QuoteDrawer = () => {
  const { t } = useLanguage();
  const { quoteItems, removeFromQuote, updateQuantity, clearQuote, isDrawerOpen, setIsDrawerOpen } = useQuote();
  const [submitted, setSubmitted] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '', note: '' });

  if (!isDrawerOpen) return null;

  const handleSendRFQ = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      clearQuote();
      setIsDrawerOpen(false);
    }, 4000);
  };

  const generateWhatsAppMessage = () => {
    const list = quoteItems.map((i, idx) => `${idx + 1}. [${i.brand || 'PRODUCT'}] ${i.name} (Qty: ${i.quantity})`).join('\n');
    const msg = `Hello Demozi Sales Team,\n\nI would like to request an RFQ quote for the following products:\n\n${list}\n\nContact: ${userInfo.name || 'Client'}\nPhone: ${userInfo.phone || 'N/A'}`;
    window.open(`https://wa.me/905396619004?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 font-sans animate-fadeIn">
      <div className="w-full max-w-md bg-white border-l-4 border-[#0F172A] h-full flex flex-col justify-between p-6 shadow-2xl overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#0F172A] pb-4">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/logo_dark.png"
              alt="Demozi Logo"
              className="h-6 w-auto object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'assets/logo.png';
              }}
            />
            <h3 className="font-bold text-[#0F172A] text-base font-display uppercase tracking-tight">{t('rfq_basket_title')}</h3>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 bg-[#0F172A] text-white hover:bg-[#1E293B]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="my-auto p-6 text-center space-y-3 bg-[#0F172A] border-2 border-emerald-500 text-white font-sans">
            <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400" />
            <h4 className="font-extrabold text-lg uppercase font-mono">{t('rfq_sent_success')}</h4>
            <p className="text-xs text-emerald-300">{t('rfq_sent_desc')}</p>
          </div>
        ) : quoteItems.length === 0 ? (
          <div className="my-auto text-center space-y-3 py-12">
            <ShoppingBag className="w-12 h-12 text-[#94A3B8] mx-auto opacity-40" />
            <h4 className="font-bold text-[#0F172A] text-base uppercase font-mono">{t('rfq_basket_empty')}</h4>
            <p className="text-xs text-[#64748B]">{t('rfq_basket_empty_desc')}</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {quoteItems.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-[#F8FAFC] border-2 border-[#0F172A] flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#3A8899] uppercase font-mono">{item.brand || 'PRODUCT'}</span>
                  <h4 className="font-bold text-[#0F172A] truncate uppercase font-display">{item.name}</h4>
                  <p className="text-[10px] text-[#64748B] font-mono">ID: #{item.id}</p>
                </div>

                <div className="flex items-center gap-1 bg-white border border-[#0F172A] p-0.5 font-mono">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 hover:bg-[#E2E8F0] text-[#0F172A]"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-bold text-[#0F172A] px-1.5">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 hover:bg-[#E2E8F0] text-[#0F172A]"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromQuote(item.id)}
                  className="text-[#64748B] hover:text-red-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {/* Industrial Form */}
            <form onSubmit={handleSendRFQ} className="pt-4 border-t-2 border-[#0F172A] space-y-3 text-xs font-sans">
              <div>
                <label className="block text-[#0F172A] font-extrabold uppercase font-mono mb-1">{t('your_name_company')}</label>
                <input
                  type="text"
                  required
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  placeholder="Ahmet Yılmaz / Firma Unvanı"
                  className="w-full bg-[#F8FAFC] border-2 border-[#0F172A] px-3 py-2 text-[#0F172A] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[#0F172A] font-extrabold uppercase font-mono mb-1">{t('your_email')}</label>
                <input
                  type="email"
                  required
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full bg-[#F8FAFC] border-2 border-[#0F172A] px-3 py-2 text-[#0F172A] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[#0F172A] font-extrabold uppercase font-mono mb-1">{t('your_phone')}</label>
                <input
                  type="text"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  placeholder="+90... / +964..."
                  className="w-full bg-[#F8FAFC] border-2 border-[#0F172A] px-3 py-2 text-[#0F172A] outline-none font-mono"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2 font-mono">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#3A8899] hover:bg-[#2B6F7E] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-[#2B6F7E] transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('submit_email_rfq')}</span>
                </button>

                <button
                  type="button"
                  onClick={generateWhatsAppMessage}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-emerald-900 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t('send_whatsapp')}</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
