import React from 'react';
import { useQuote } from '../../context/QuoteContext';
import { useLanguage } from '../../context/LanguageContext';
import { Eye, Plus, Check, Tag } from 'lucide-react';

export const ProductCard = ({ product, onQuickView }) => {
  const { t } = useLanguage();
  const { addToQuote, quoteItems } = useQuote();
  const isInQuote = quoteItems.some((item) => item.id === product.id);

  return (
    <div className="rounded-xl bg-[#F1F5F9] border-2 border-[#CBD5E1] hover:border-[#3A8899] p-4 flex flex-col justify-between group transition-all duration-200 shadow-sm hover:shadow-md">
      <div>
        {/* Image Container */}
        <div className="relative w-full h-40 rounded-lg bg-white border border-[#CBD5E1] p-3 mb-3 flex items-center justify-center shadow-xs">
          <img
            src={product.image || 'assets/placeholder.jpg'}
            alt={product.name}
            className="max-h-full max-w-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop';
            }}
          />

          {/* Brand Badge */}
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0F172A] text-white text-[9px] font-bold uppercase font-sans">
            {product.brand || 'DEMOZI'}
          </span>

          {/* Stock Badge Translated */}
          <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-bold font-sans">
            {t('ready_to_dispatch')}
          </span>
        </div>

        {/* Category & Title */}
        <div className="text-[10px] font-extrabold text-[#3A8899] mb-1 flex items-center gap-1 font-sans">
          <Tag className="w-3 h-3" />
          <span>{product.category || 'Product Supply'}</span>
        </div>

        <h3 className="text-xs font-bold text-[#0F172A] group-hover:text-[#3A8899] transition-colors line-clamp-2 leading-snug mb-2 font-display">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-[11px] text-[#475569] line-clamp-2 mb-3 font-sans font-medium">
            {product.description.replace(/<[^>]*>?/gm, '')}
          </p>
        )}
      </div>

      {/* Actions Translated */}
      <div className="pt-3 border-t border-[#CBD5E1] flex items-center gap-2 font-sans">
        <button
          onClick={() => onQuickView(product)}
          className="flex-1 py-1.5 rounded bg-white hover:bg-[#E2E8F0] text-[#0F172A] text-[11px] font-bold flex items-center justify-center gap-1 transition-colors border border-[#CBD5E1] shadow-xs"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{t('quick_specs')}</span>
        </button>

        <button
          onClick={() => addToQuote(product)}
          className={`flex-1 py-1.5 rounded text-[11px] font-extrabold flex items-center justify-center gap-1 transition-all ${
            isInQuote
              ? 'bg-emerald-600 text-white'
              : 'bg-[#3A8899] hover:bg-[#2B6F7E] text-white shadow-xs'
          }`}
        >
          {isInQuote ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>{t('item_added')}</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>{t('add_rfq')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
