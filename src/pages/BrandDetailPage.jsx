import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { brandsData } from '../data/brandsData';
import { productsData } from '../data/productsData';
import { useQuote } from '../context/QuoteContext';
import { ArrowLeft, ShieldCheck, Tag, Plus, Check, MessageSquare, ExternalLink, Globe } from 'lucide-react';

export const BrandDetailPage = () => {
  const { t } = useLanguage();
  const { addToQuote, quoteItems } = useQuote();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const brandId = queryParams.get('id') || 'b1';

  const brand = brandsData.find(b => b.id === brandId) || brandsData[0];
  const brandProducts = productsData.filter(p => (p.brand || '').toLowerCase().includes(brand.name.toLowerCase()) || (p.name || '').toLowerCase().includes(brand.name.toLowerCase()));

  const displayProducts = brandProducts.length > 0 ? brandProducts : productsData.slice(0, 8);

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

  const handleWhatsAppBrandQuote = (product) => {
    const hsCode = getHsCode(product);
    const msg = `Hello DEMOZİ Sales Desk,\n\nI am requesting a factory-direct pro-forma quote for [${brand.name}] products:\n• Item: ${product.name}\n• Customs HS Code: ${hsCode}\n• Destination: Turkey / Iraq\n\nPlease send wholesale pricing & delivery schedule.`;
    window.open(`https://wa.me/905396619004?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-white border border-[#CBD5E1] p-4 shadow-sm my-4 font-sans text-xs max-w-[1024px] mx-auto space-y-4">
      
      {/* Top Back Navigation */}
      <button
        onClick={() => navigate('/brands')}
        className="flex items-center gap-1.5 text-[#1E3A8A] font-bold font-mono text-xs hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>« Back to All Manufacturer Brands</span>
      </button>

      {/* Brand Header Banner */}
      <div className="border-2 border-[#1E3A8A] bg-[#F1F5F9] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-2 flex-1">
          <span className="px-2 py-0.5 bg-[#1E3A8A] text-white text-[10px] font-mono font-bold uppercase">
            CERTIFIED MANUFACTURER PARTNER
          </span>
          <h1 className="text-2xl font-extrabold text-[#0F172A] uppercase font-display">
            {brand.name} Wholesale Supply Directory
          </h1>
          <p className="text-xs text-[#334155] leading-relaxed">
            {brand.description || `Official supplier of certified ${brand.name} industrial equipment, spare parts, and packaging supplies across Turkey and Iraq.`}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-[#0F172A]">
            <div><strong>Origin:</strong> {brand.origin || 'Turkey / EU'}</div>
            <div><strong>Specialty:</strong> {brand.category || 'Industrial Equipment'}</div>
            <div><strong>Supply Corridor:</strong> Istanbul & Erbil Stock</div>
          </div>
        </div>

        <div className="w-36 h-28 bg-white border border-[#CBD5E1] p-3 flex items-center justify-center shrink-0">
          <img
            src={brand.logo}
            alt={brand.name}
            className="max-h-full max-w-full object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'assets/logo_dark.png';
            }}
          />
        </div>
      </div>

      {/* Brand Products Catalog Grid */}
      <div className="border border-[#CBD5E1] bg-white">
        <div className="bg-[#F1F5F9] border-b border-[#CBD5E1] px-3 py-2 flex items-center justify-between">
          <h3 className="font-bold text-[#0F172A] text-xs font-mono uppercase">
            {brand.name} PRODUCTS & EQUIPMENT ({displayProducts.length} ITEMS)
          </h3>
          <span className="text-[10px] text-emerald-700 font-bold font-mono">
            ✓ Direct Factory Pricing & Verified Customs Compliance
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y divide-[#CBD5E1]">
          {displayProducts.map((product) => {
            const isInQuote = quoteItems.some(i => i.id === product.id);
            const hsCode = getHsCode(product);
            return (
              <div key={product.id} className="p-3 bg-white hover:bg-[#F8FAFC] flex flex-col justify-between">
                <div>
                  <div className="w-full h-28 bg-[#F1F5F9] border border-[#E2E8F0] mb-2 p-2 flex items-center justify-center relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop';
                      }}
                    />
                    <span className="absolute top-0 right-0 px-1 py-0.5 bg-[#1E3A8A] text-white text-[8px] font-mono font-bold">
                      {hsCode}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-[#1E3A8A] font-bold uppercase block">
                    [{product.brand || brand.name}]
                  </span>
                  <h4 className="font-bold text-[#0F172A] text-xs uppercase line-clamp-2 mb-1">
                    {product.name}
                  </h4>
                  <div className="text-[10px] text-[#64748B] font-mono mb-2 space-y-0.5">
                    <div><strong>MOQ:</strong> Wholesale Batch</div>
                    <div><strong>Customs:</strong> {hsCode}</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => addToQuote(product)}
                    className={`w-full py-1 text-[10px] font-bold uppercase font-mono border ${
                      isInQuote
                        ? 'bg-emerald-700 text-white border-emerald-800'
                        : 'bg-[#1E3A8A] hover:bg-[#1E293B] text-white border-[#1E3A8A]'
                    }`}
                  >
                    {isInQuote ? 'In Inquiry Basket' : '+ Add to Inquiry'}
                  </button>

                  <button
                    onClick={() => handleWhatsAppBrandQuote(product)}
                    className="w-full py-1 bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-bold font-mono uppercase flex items-center justify-center gap-1 border border-emerald-900"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp Quote</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
