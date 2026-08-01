import React from 'react';
import { useQuote } from '../../context/QuoteContext';
import { useLanguage } from '../../context/LanguageContext';
import { X, CheckCircle2, ShieldCheck, Plus, Check, Tag } from 'lucide-react';

export const ProductModal = ({ product, onClose }) => {
  const { t } = useLanguage();
  const { addToQuote, quoteItems } = useQuote();
  if (!product) return null;

  const isInQuote = quoteItems.some((item) => item.id === product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn font-sans">
      <div className="relative w-full max-w-xl bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
          
          {/* Image */}
          <div className="sm:col-span-5 flex items-center justify-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3 min-h-[180px]">
            <img
              src={product.image || 'assets/placeholder.jpg'}
              alt={product.name}
              className="max-h-44 max-w-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop';
              }}
            />
          </div>

          {/* Info */}
          <div className="sm:col-span-7 space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-[#F1F5F9] font-mono font-bold text-[#3A8899] text-[10px] uppercase">
                  {product.brand || 'DEMOZI'}
                </span>
                <span className="text-[11px] text-[#3A8899] font-mono flex items-center gap-1">
                  <Tag className="w-3 h-3" /> {product.category || 'Product Supply'}
                </span>
              </div>
              <h2 className="text-base font-bold text-[#0F172A] font-display leading-snug">{product.name}</h2>
              <p className="text-[10px] text-[#64748B] font-mono mt-0.5">ID: #{product.id}</p>
            </div>

            {/* Description */}
            <div className="p-3 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#475569] space-y-1.5 max-h-36 overflow-y-auto">
              <h4 className="font-bold text-[#0F172A] text-[11px] uppercase font-mono tracking-wider">{t('quick_specs')}:</h4>
              {product.description ? (
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                  className="prose prose-xs leading-relaxed text-[11px] text-[#475569]"
                />
              ) : (
                <p className="text-[11px]">Sourced directly from authorized pipelines.</p>
              )}
            </div>

            {/* Badges Translated */}
            <div className="flex items-center gap-3 text-[11px] text-[#64748B]">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {t('ready_to_dispatch')}
              </span>
              <span className="flex items-center gap-1 text-[#3A8899] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> {t('guarantee_1')}
              </span>
            </div>

            {/* Action Buttons Translated */}
            <div className="pt-2">
              <button
                onClick={() => {
                  addToQuote(product);
                  onClose();
                }}
                className={`w-full py-2.5 rounded font-extrabold text-xs flex items-center justify-center gap-2 transition-all ${
                  isInQuote ? 'bg-emerald-600 text-white' : 'bg-[#3A8899] hover:bg-[#2B6F7E] text-white'
                }`}
              >
                {isInQuote ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{isInQuote ? t('added_to_rfq') : t('add_to_rfq')}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
