import React from 'react';
import { useQuote } from '../../context/QuoteContext';
import { useLanguage } from '../../context/LanguageContext';
import { Eye, Plus, Check, Tag } from 'lucide-react';

export const ProductCard = ({ product, onQuickView }) => {
  const { t } = useLanguage();
  const { addToQuote, quoteItems } = useQuote();
  const isInQuote = quoteItems.some((item) => item.id === product.id);

  return (
    <div className="bg-white border-2 border-[#0F172A] p-4 flex flex-col justify-between group transition-colors duration-150 font-sans hover:bg-[#F8FAFC]">
      <div>
        {/* Product Image Box */}
        <div className="relative w-full h-40 bg-[#F1F5F9] border border-[#0F172A] p-3 mb-3 flex items-center justify-center">
          <img
            src={product.image || 'assets/placeholder.jpg'}
            alt={product.name}
            className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop';
            }}
          />

          {/* Brand Tag */}
          <span className="absolute top-0 left-0 px-2 py-0.5 bg-[#0F172A] text-white text-[9px] font-mono font-bold uppercase border-r border-b border-[#0F172A]">
            {product.brand || 'DEMOZI'}
          </span>

          {/* Stock Badge */}
          <span className="absolute top-0 right-0 px-2 py-0.5 bg-emerald-700 text-white text-[9px] font-mono font-bold uppercase border-l border-b border-[#0F172A]">
            {t('ready_to_dispatch')}
          </span>
        </div>

        {/* Category & Title */}
        <div className="text-[10px] font-extrabold text-[#3A8899] uppercase tracking-wider mb-1 flex items-center gap-1 font-mono">
          <Tag className="w-3 h-3" />
          <span>{product.category || 'Product Supply'}</span>
        </div>

        <h3 className="text-xs font-bold text-[#0F172A] line-clamp-2 leading-snug mb-2 font-display uppercase">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-[11px] text-[#475569] line-clamp-2 mb-3 font-sans font-semibold">
            {product.description.replace(/<[^>]*>?/gm, '')}
          </p>
        )}
      </div>

      {/* Industrial Actions */}
      <div className="pt-3 border-t-2 border-[#E2E8F0] flex items-center gap-2 font-sans">
        <button
          onClick={() => onQuickView(product)}
          className="flex-1 py-2 bg-white hover:bg-[#E2E8F0] text-[#0F172A] text-[11px] font-bold flex items-center justify-center gap-1 border border-[#0F172A] uppercase tracking-wider font-mono"
        >
          <Eye className="w-3.5 h-3.5 text-[#3A8899]" />
          <span>{t('quick_specs')}</span>
        </button>

        <button
          onClick={() => addToQuote(product)}
          className={`flex-1 py-2 text-[11px] font-extrabold flex items-center justify-center gap-1 uppercase tracking-wider font-mono border ${
            isInQuote
              ? 'bg-emerald-700 text-white border-emerald-800'
              : 'bg-[#3A8899] hover:bg-[#2B6F7E] text-white border-[#2B6F7E]'
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
