import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { productsData } from '../../data/productsData';
import { ProductCard } from '../catalog/ProductCard';
import { ProductModal } from '../catalog/ProductModal';
import { Boxes, ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedProducts = () => {
  const { t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const featuredList = productsData.slice(0, 8);

  return (
    <section className="py-16 bg-white border-b border-[#E2E8F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[#3A8899] text-xs font-extrabold uppercase tracking-wider mb-1 font-sans">
              <Sparkles className="w-4 h-4" /> {t('featured_badge')}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight font-display">
              {t('featured_title')}
            </h2>
            <p className="text-sm text-[#475569] mt-1 font-sans">
              {t('featured_subtitle')}
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#3A8899] hover:bg-[#2B6F7E] text-white font-extrabold text-xs transition-all shadow-sm shrink-0 font-sans"
          >
            <Boxes className="w-4 h-4" />
            <span>{t('browse_full_catalog')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(prod) => setSelectedProduct(prod)}
            />
          ))}
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
