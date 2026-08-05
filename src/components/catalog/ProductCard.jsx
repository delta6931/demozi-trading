import React from 'react';
import { useQuote } from '../../context/QuoteContext';
import { useLanguage } from '../../context/LanguageContext';
import { Eye, Plus, Check, Tag, MessageSquare } from 'lucide-react';

export const ProductCard = ({ product, onQuickView }) => {
  const { t } = useLanguage();
  const { addToQuote, quoteItems } = useQuote();
  const isInQuote = quoteItems.some((item) => item.id === product.id);

  // Compute HS Customs Code based on product category & description
  const getHsCode = (item) => {
    if (item.hsCode) return item.hsCode;
    const cat = (item.category || '').toLowerCase();
    const name = (item.name || '').toLowerCase();

    if (cat.includes('cosmetic') || name.includes('dermo') || name.includes('cream') || name.includes('lotion')) {
      return 'HS 3304.99.00';
    } else if (name.includes('ink') || name.includes('filter') || name.includes('mek')) {
      return 'HS 3215.11.00';
    } else if (name.includes('pump') || name.includes('valve') || name.includes('switch')) {
      return 'HS 8413.70.80';
    } else if (cat.includes('chemical')) {
      return 'HS 3402.13.00';
    }
    return 'HS 8479.89.97';
  };

  const hsCode = getHsCode(product);

  const handleWhatsAppInquiry = (e) => {
    e.stopPropagation();
    const msg = `Hello DEMOZİ Trade Team,\n\nI am inquiring about the following product:\n• Name: [${product.brand || 'DEMOZI'}] ${product.name}\n• Category: ${product.category || 'Industrial'}\n• Customs Code: ${hsCode}\n\nPlease provide Pro-Forma price quotation and shipping lead time to Turkey/Iraq.`;
    window.open(`https://wa.me/905396619004?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-white border-2 border-[#0F172A] p-3 flex flex-col justify-between group transition-colors duration-150 font-sans hover:bg-[#F8FAFC]">
      <div>
        {/* Product Image Box */}
        <div className="relative w-full h-36 bg-[#F1F5F9] border border-[#0F172A] p-2 mb-2 flex items-center justify-center">
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
          <span className="absolute top-0 left-0 px-1.5 py-0.5 bg-[#0F172A] text-white text-[9px] font-mono font-bold uppercase border-r border-b border-[#0F172A]">
            {product.brand || 'DEMOZI'}
          </span>

          {/* HS Customs Code Badge */}
          <span className="absolute top-0 right-0 px-1.5 py-0.5 bg-[#1E3A8A] text-white text-[9px] font-mono font-bold uppercase border-l border-b border-[#0F172A]">
            {hsCode}
          </span>
        </div>

        {/* Category & Title */}
        <div className="text-[10px] font-extrabold text-[#3A8899] uppercase tracking-wider mb-1 flex items-center justify-between font-mono">
          <span className="flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {product.category || 'Product Supply'}
          </span>
          <span className="text-[9px] text-[#64748B] font-bold">MOQ: Wholesale</span>
        </div>

        <h3 className="text-xs font-bold text-[#0F172A] line-clamp-2 leading-snug mb-2 font-display uppercase">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-[10px] text-[#475569] line-clamp-2 mb-2 font-sans font-semibold">
            {product.description.replace(/<[^>]*>?/gm, '')}
          </p>
        )}
      </div>

      {/* Industrial Actions */}
      <div className="pt-2 border-t-2 border-[#E2E8F0] space-y-1.5 font-sans">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 py-1.5 bg-white hover:bg-[#E2E8F0] text-[#0F172A] text-[10px] font-bold flex items-center justify-center gap-1 border border-[#0F172A] uppercase tracking-wider font-mono"
          >
            <Eye className="w-3 h-3 text-[#3A8899]" />
            <span>{t('quick_specs')}</span>
          </button>

          <button
            onClick={() => addToQuote(product)}
            className={`flex-1 py-1.5 text-[10px] font-extrabold flex items-center justify-center gap-1 uppercase tracking-wider font-mono border ${
              isInQuote
                ? 'bg-emerald-700 text-white border-emerald-800'
                : 'bg-[#1E3A8A] hover:bg-[#1E293B] text-white border-[#1E3A8A]'
            }`}
          >
            {isInQuote ? (
              <>
                <Check className="w-3 h-3" />
                <span>{t('item_added')}</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                <span>{t('add_rfq')}</span>
              </>
            )}
          </button>
        </div>

        {/* Instant WhatsApp Lead Button */}
        <button
          onClick={handleWhatsAppInquiry}
          className="w-full py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 border border-emerald-900 shadow-xs"
        >
          <MessageSquare className="w-3.5 h-3.5 text-white shrink-0" />
          <span>{t('whatsapp_rfq_btn')}</span>
        </button>
      </div>
    </div>
  );
};
