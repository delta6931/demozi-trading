import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useQuote } from '../../context/QuoteContext';
import { productsData } from '../../data/productsData';
import { Search, ArrowRight, ShieldCheck, Truck, FileText, ChevronLeft, ChevronRight, Sparkles, Plus, Check, Eye } from 'lucide-react';
import { ProductModal } from '../catalog/ProductModal';

export const Hero = () => {
  const { t, isRtl } = useLanguage();
  const { addToQuote, quoteItems } = useQuote();
  const [query, setQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  // Selected featured products for hero slideshow
  const heroProducts = productsData.slice(0, 5);

  // Auto-play slideshow every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroProducts.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const currentProd = heroProducts[currentSlide];
  const isInQuote = quoteItems.some((item) => item.id === currentProd?.id);

  return (
    <section className="pt-28 pb-16 bg-[#F8FAFC] border-b border-[#CBD5E1] relative overflow-hidden">
      {/* Background Decorative Subtle Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#3A8899]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#52B5C9]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Hero Headlines & Search */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean Main Headline (No Pill Badge & No Underline Line) */}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight font-display">
              International Trade & <br />
              <span className="text-[#3A8899]">
                Machinery Equipment Supply
              </span> <br />
              Across Turkey & Iraq
            </h1>

            <p className="text-sm sm:text-base text-[#475569] max-w-xl leading-relaxed font-sans font-medium">
              Official registered trading enterprise connecting Istanbul headquarters and Kirkuk regional branch for premium cosmetics, industrial machinery hardware, and cross-border logistics.
            </p>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="pt-2">
              <div className="flex flex-col sm:flex-row gap-2 bg-[#F1F5F9] border-2 border-[#CBD5E1] p-2 rounded-xl shadow-sharp focus-within:border-[#3A8899] transition-colors">
                <div className="relative flex-1 flex items-center">
                  <Search className={`w-5 h-5 text-[#3A8899] absolute ${isRtl ? 'right-3' : 'left-3'}`} />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('search_placeholder')}
                    className={`w-full bg-transparent text-[#0F172A] text-xs sm:text-sm py-2.5 outline-none placeholder-[#64748B] font-sans ${
                      isRtl ? 'pr-10 pl-3' : 'pl-10 pr-3'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-[#3A8899] hover:bg-[#2B6F7E] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 transition-all shadow-sm font-sans"
                >
                  <span>{t('search_catalog_btn')}</span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Suggestions Chips */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px] text-[#64748B] font-sans">
                <span className="font-bold text-[#0F172A]">{t('popular_searches')}</span>
                {['Cosmetics', 'Machinery Equipment', 'Industrial Parts', 'Customs Logistics'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setQuery(item);
                      navigate(`/products?search=${encodeURIComponent(item)}`);
                    }}
                    className="px-2.5 py-1 rounded bg-[#E2E8F0] hover:bg-[#CBD5E1] border border-[#CBD5E1] text-[#0F172A] font-bold transition-colors shadow-xs"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </form>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#CBD5E1] text-xs text-[#475569] font-sans font-semibold">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#3A8899] shrink-0" />
                <span>100% Registered Entity</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#3A8899] shrink-0" />
                <span>Istanbul & Kirkuk Line</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#3A8899] shrink-0" />
                <span>Official Pro-Forma RFQ</span>
              </div>
            </div>

          </div>

          {/* Right Column: Product Slideshow Carousel */}
          <div className="lg:col-span-5">
            <div className="bg-[#0F172A] border border-[#334155] rounded-2xl p-5 shadow-2xl space-y-4 relative overflow-hidden text-white">
              
              {/* Slideshow Header */}
              <div className="flex items-center justify-between border-b border-[#334155] pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#52B5C9]" />
                  <span className="font-bold text-white text-xs uppercase tracking-wider font-display">
                    Featured Inventory Showcase
                  </span>
                </div>

                {/* Slideshow Indicators & Controls */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {heroProducts.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          currentSlide === idx ? 'w-5 bg-[#52B5C9]' : 'w-1.5 bg-[#334155]'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1 ml-2">
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev - 1 + heroProducts.length) % heroProducts.length)}
                      className="p-1 rounded bg-[#1E293B] hover:bg-[#334155] text-white transition-colors"
                      title="Previous Product"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % heroProducts.length)}
                      className="p-1 rounded bg-[#1E293B] hover:bg-[#334155] text-white transition-colors"
                      title="Next Product"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Product Slide Container */}
              {currentProd && (
                <div className="space-y-4 animate-fadeIn">
                  
                  {/* Image Display Card */}
                  <div className="relative w-full h-52 rounded-xl bg-white border border-[#334155] p-4 flex items-center justify-center shadow-inner group">
                    <img
                      src={currentProd.image || 'assets/placeholder.jpg'}
                      alt={currentProd.name}
                      className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop';
                      }}
                    />

                    {/* Brand Tag */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0F172A] text-white text-[10px] font-extrabold font-mono uppercase tracking-wider border border-[#334155]">
                      {currentProd.brand || 'DEMOZI'}
                    </span>

                    {/* Stock Status */}
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold font-sans">
                      Ready to Dispatch
                    </span>
                  </div>

                  {/* Product Details */}
                  <div>
                    <span className="text-[11px] font-bold text-[#52B5C9] uppercase font-sans">
                      {currentProd.category || 'Product Line'}
                    </span>
                    <h3 className="text-base font-bold text-white leading-snug line-clamp-1 font-display mt-0.5">
                      {currentProd.name}
                    </h3>
                    <p className="text-xs text-[#94A3B8] line-clamp-2 mt-1 font-sans">
                      {currentProd.description?.replace(/<[^>]*>?/gm, '') || 'High-performance commercial supply item.'}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 flex items-center gap-2 font-sans">
                    <button
                      onClick={() => setSelectedProduct(currentProd)}
                      className="flex-1 py-2.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#334155]"
                    >
                      <Eye className="w-4 h-4 text-[#52B5C9]" />
                      <span>View Specifications</span>
                    </button>

                    <button
                      onClick={() => addToQuote(currentProd)}
                      className={`flex-1 py-2.5 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                        isInQuote
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#3A8899] hover:bg-[#2B6F7E] text-white shadow-md'
                      }`}
                    >
                      {isInQuote ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to RFQ</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>+ Add to RFQ</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};
