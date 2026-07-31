import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { productsData } from '../data/productsData';
import { ProductCard } from '../components/catalog/ProductCard';
import { ProductModal } from '../components/catalog/ProductModal';
import { useQuote } from '../context/QuoteContext';
import { Search, Filter, Boxes, RefreshCw, ChevronLeft, ChevronRight, LayoutGrid, List, Plus, Check, Eye } from 'lucide-react';

export const ProductsPage = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToQuote, quoteItems } = useQuote();

  const searchQuery = searchParams.get('search') || '';
  const brandQuery = searchParams.get('brand') || 'all';
  const categoryQuery = searchParams.get('category') || 'all';

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [selectedBrand, setSelectedBrand] = useState(brandQuery);
  const [selectedCategory, setSelectedCategory] = useState(categoryQuery);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const ITEMS_PER_PAGE = viewMode === 'table' ? 30 : 24;

  useEffect(() => {
    setLocalSearch(searchQuery);
    setSelectedBrand(brandQuery);
    setSelectedCategory(categoryQuery);
    setCurrentPage(1);
  }, [searchQuery, brandQuery, categoryQuery]);

  const filteredProducts = useMemo(() => {
    return productsData.filter((prod) => {
      if (localSearch.trim()) {
        const queryLower = localSearch.toLowerCase();
        const nameMatch = prod.name?.toLowerCase().includes(queryLower);
        const brandMatch = prod.brand?.toLowerCase().includes(queryLower);
        const descMatch = prod.description?.toLowerCase().includes(queryLower);
        const idMatch = prod.id?.toLowerCase().includes(queryLower);
        if (!nameMatch && !brandMatch && !descMatch && !idMatch) return false;
      }

      if (selectedBrand !== 'all') {
        const brandLower = selectedBrand.toLowerCase();
        const prodBrandLower = (prod.brand || '').toLowerCase();
        if (!prodBrandLower.includes(brandLower) && !brandLower.includes(prodBrandLower)) {
          return false;
        }
      }

      if (selectedCategory !== 'all') {
        if ((prod.category || '').toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [localSearch, selectedBrand, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage, ITEMS_PER_PAGE]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateUrlParams(localSearch, selectedBrand, selectedCategory);
  };

  const updateUrlParams = (search, brand, cat) => {
    const params = {};
    if (search.trim()) params.search = search.trim();
    if (brand !== 'all') params.brand = brand;
    if (cat !== 'all') params.category = cat;
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setLocalSearch('');
    setSelectedBrand('all');
    setSelectedCategory('all');
    setSearchParams({});
  };

  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title with Logo */}
        <div className="max-w-3xl mb-8 space-y-2">
          <div className="flex items-center gap-2.5">
            <img src="/assets/logo_transparent.png" alt="" className="h-7 w-auto" />
            <span className="px-2.5 py-1 rounded bg-white border border-[#E2E8F0] text-[#3A8899] text-xs font-bold font-sans uppercase tracking-wider shadow-xs">
              {t('catalog_badge')}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight font-display">
            {t('catalog_title')}
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] font-sans">
            {t('catalog_subtitle')}
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sharp mb-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-3" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder={t('search_placeholder')}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#3A8899] rounded-lg pl-10 pr-4 py-2 text-xs sm:text-sm text-[#0F172A] outline-none font-sans"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-[#3A8899] hover:bg-[#2B6F7E] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-sans shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>{t('search_catalog_btn')}</span>
            </button>

            {(localSearch || selectedBrand !== 'all' || selectedCategory !== 'all') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-3.5 py-2 rounded-lg bg-[#F1F5F9] text-[#475569] hover:text-[#0F172A] border border-[#CBD5E1] text-xs font-semibold flex items-center justify-center gap-1 font-sans"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t('reset_filters')}</span>
              </button>
            )}
          </form>

          {/* Quick Brand Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E2E8F0] text-xs font-sans">
            <span className="text-[#64748B] font-bold flex items-center gap-1 font-sans">
              <Filter className="w-3.5 h-3.5 text-[#3A8899]" /> {t('manufacturer_filter')}
            </span>
            {['all', 'sick', 'ifm', 'parker-meggitt', 'siemens', 'abb', 'phoenix-contact'].map((b) => (
              <button
                key={b}
                onClick={() => {
                  setSelectedBrand(b);
                  updateUrlParams(localSearch, b, selectedCategory);
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase transition-colors ${
                  selectedBrand.toLowerCase().includes(b)
                    ? 'bg-[#3A8899] text-white'
                    : 'bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] border border-[#CBD5E1]'
                }`}
              >
                {b === 'all' ? t('all_brands') : b.replace('-r-nleri', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Counter Info & View Toggle Bar */}
        <div className="flex items-center justify-between text-xs text-[#64748B] mb-4 px-1 font-sans">
          <div>
            {t('showing_items')} <strong className="text-[#0F172A] font-mono">{filteredProducts.length}</strong> {t('items_count')}
            {filteredProducts.length > 0 && ` (Page ${currentPage} of ${totalPages})`}
          </div>

          <div className="flex items-center gap-1 bg-white border border-[#E2E8F0] p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-[#3A8899] text-white' : 'text-[#64748B] hover:text-[#0F172A]'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-[#3A8899] text-white' : 'text-[#64748B] hover:text-[#0F172A]'}`}
              title="Technical Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Catalog Output */}
        {paginatedProducts.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {paginatedProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onQuickView={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-x-auto shadow-sharp mb-10">
              <table className="w-full text-left text-xs text-[#475569] font-sans">
                <thead className="bg-[#F8FAFC] text-[#0F172A] font-mono text-[11px] uppercase border-b border-[#E2E8F0]">
                  <tr>
                    <th className="py-3 px-4">{t('table_thumb')}</th>
                    <th className="py-3 px-4">{t('table_brand')}</th>
                    <th className="py-3 px-4">{t('table_description')}</th>
                    <th className="py-3 px-4">{t('table_category')}</th>
                    <th className="py-3 px-4">{t('table_status')}</th>
                    <th className="py-3 px-4 text-right">{t('table_action')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {paginatedProducts.map((prod) => {
                    const isInQuote = quoteItems.some((item) => item.id === prod.id);
                    return (
                      <tr key={prod.id} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="py-2.5 px-4">
                          <div className="w-10 h-10 rounded bg-[#F8FAFC] p-1 border border-[#E2E8F0] flex items-center justify-center">
                            <img
                              src={prod.image || 'assets/placeholder.jpg'}
                              alt=""
                              className="max-h-full max-w-full object-contain"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'assets/placeholder.jpg';
                              }}
                            />
                          </div>
                        </td>
                        <td className="py-2.5 px-4 font-mono font-bold text-[#3A8899] uppercase">
                          {prod.brand || 'DEMOZI'}
                        </td>
                        <td className="py-2.5 px-4 font-bold text-[#0F172A] max-w-md">
                          <div className="line-clamp-1">{prod.name}</div>
                          <span className="text-[10px] text-[#64748B] font-mono">ID: #{prod.id}</span>
                        </td>
                        <td className="py-2.5 px-4 font-mono text-[#3A8899] text-[11px]">
                          {prod.category || 'Product Supply'}
                        </td>
                        <td className="py-2.5 px-4">
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                            {t('ready_to_dispatch')}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedProduct(prod)}
                              className="p-1.5 rounded bg-[#F1F5F9] text-[#475569] hover:text-[#0F172A] border border-[#CBD5E1]"
                              title="Specs"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => addToQuote(prod)}
                              className={`px-2.5 py-1 rounded text-[10px] font-extrabold flex items-center gap-1 ${
                                isInQuote ? 'bg-emerald-600 text-white' : 'bg-[#3A8899] text-white hover:bg-[#2B6F7E]'
                              }`}
                            >
                              {isInQuote ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                              <span>{isInQuote ? t('item_added') : t('add_rfq')}</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="text-center py-16 bg-white border border-[#E2E8F0] rounded-xl p-8 space-y-3 font-sans">
            <Boxes className="w-12 h-12 text-[#94A3B8] mx-auto opacity-40" />
            <h3 className="text-base font-bold text-[#0F172A]">{t('no_products_found')}</h3>
            <p className="text-xs text-[#64748B]">{t('no_products_desc')}</p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded bg-[#3A8899] text-white font-bold text-xs mt-2"
            >
              {t('reset_filters')}
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4 font-sans">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="p-2 rounded bg-white border border-[#E2E8F0] text-[#64748B] disabled:opacity-30 hover:text-[#0F172A]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono font-bold text-[#64748B] px-4">
              Page <strong className="text-[#0F172A]">{currentPage}</strong> / {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="p-2 rounded bg-white border border-[#E2E8F0] text-[#64748B] disabled:opacity-30 hover:text-[#0F172A]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};
