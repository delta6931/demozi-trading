import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { productsData } from '../data/productsData';
import { useQuote } from '../context/QuoteContext';
import { ChevronRight, Award, MessageSquare } from 'lucide-react';
import { ShippingEstimator } from '../components/home/ShippingEstimator';

export const HomePage = () => {
  const { t } = useLanguage();
  const { addToQuote, quoteItems } = useQuote();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { name: 'Cosmetics & Personal Care', id: 'Cosmetics' },
    { name: 'Machinery Equipment & Parts', id: 'Industrial Equipment' },
    { name: 'Chemicals & Raw Materials', id: 'Chemicals' },
    { name: 'Cross-Border Supply Chain', id: 'Logistics' },
    { name: 'Direct Factory Brands', id: 'Brands' }
  ];

  const filteredProducts = activeCategory === 'All'
    ? productsData.slice(0, 8)
    : productsData.filter(p => p.category === activeCategory).slice(0, 8);

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

  const handleDirectWhatsApp = (product) => {
    const hsCode = getHsCode(product);
    const msg = `Hello DEMOZİ Trade Team,\n\nI am inquiring about the following product:\n• Name: [${product.brand || 'DEMOZI'}] ${product.name}\n• Customs Code: ${hsCode}\n• Destination: Turkey / Iraq\n\nPlease provide Pro-Forma price quotation.`;
    window.open(`https://wa.me/905396619004?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-white border border-[#CBD5E1] p-4 shadow-sm my-4 font-sans text-xs">
      
      {/* 2-Column 2010 B2B Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* ================= LEFT SIDEBAR (2010 B2B Style) ================= */}
        <div className="space-y-4">
          
          {/* Box 1: Product Categories */}
          <div className="border border-[#1E3A8A] bg-white">
            <div className="bg-[#1E3A8A] text-white px-3 py-2 font-bold uppercase text-xs flex items-center justify-between font-mono">
              <span>PRODUCT CATEGORIES</span>
            </div>
            <ul className="divide-y divide-[#E2E8F0] font-sans">
              <li
                onClick={() => setActiveCategory('All')}
                className={`px-3 py-2 cursor-pointer flex items-center justify-between hover:bg-[#F1F5F9] font-bold ${
                  activeCategory === 'All' ? 'bg-[#EFF6FF] text-[#1E3A8A]' : 'text-[#334155]'
                }`}
              >
                <span>▸ View All Categories</span>
                <ChevronRight className="w-3 h-3 text-[#1E3A8A]" />
              </li>
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-2 cursor-pointer flex items-center justify-between hover:bg-[#F1F5F9] font-semibold ${
                    activeCategory === cat.id ? 'bg-[#EFF6FF] text-[#1E3A8A] font-bold' : 'text-[#334155]'
                  }`}
                >
                  <span>▸ {cat.name}</span>
                  <ChevronRight className="w-3 h-3 text-[#94A3B8]" />
                </li>
              ))}
            </ul>
          </div>

          {/* Box 2: Interactive Shipping & Customs Estimator Widget */}
          <ShippingEstimator />

          {/* Box 3: Quick RFQ Inquiry Box */}
          <div className="border border-[#CBD5E1] bg-[#F8FAFC] p-3 space-y-2">
            <div className="border-b border-[#CBD5E1] pb-1">
              <h4 className="font-bold text-[#0F172A] uppercase font-mono text-xs">QUICK PRICE INQUIRY</h4>
              <p className="text-[10px] text-[#64748B]">Request Pro-Forma Invoice Direct from Istanbul HQ</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); navigate('/contact'); }} className="space-y-2 text-[11px]">
              <input
                type="text"
                required
                placeholder="Product Name / Model / HS Code"
                className="w-full px-2 py-1 bg-white border border-[#CBD5E1] text-[#0F172A] outline-none font-mono"
              />
              <input
                type="email"
                required
                placeholder="Business Email"
                className="w-full px-2 py-1 bg-white border border-[#CBD5E1] text-[#0F172A] outline-none font-mono"
              />
              <button
                type="submit"
                className="w-full py-1.5 bg-[#1E3A8A] hover:bg-[#1E293B] text-white font-bold uppercase text-[11px] font-sans"
              >
                Submit Inquiry RFQ
              </button>
            </form>
          </div>

          {/* Box 4: Certified B2B Supplier Card */}
          <div className="border border-[#CBD5E1] bg-white p-3 space-y-2">
            <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-1.5">
              <Award className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <h5 className="font-bold text-[#0F172A] text-xs font-mono">VERIFIED B2B SUPPLIER</h5>
                <span className="text-[10px] text-emerald-700 font-bold">ISO & Trade Registry Certified</span>
              </div>
            </div>
            <p className="text-[11px] text-[#475569] leading-tight">
              Registered Trading Enterprise in Turkey (Istanbul HQ) & Regional Branch (Erbil, Iraq).
            </p>
            <div className="text-[10px] font-mono text-[#0F172A] pt-1 space-y-0.5">
              <div><strong>Reg Name:</strong> DEMOZİ KOZMETİK VE MAKİNA DIŞ TİCARET LTD. ŞTİ.</div>
              <div><strong>Coverage:</strong> Turkey, Iraq & Middle East</div>
            </div>
          </div>

        </div>

        {/* ================= RIGHT MAIN CONTENT (2010 B2B Style) ================= */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* 1. 2010 B2B Hero Promotional Banner Box */}
          <div className="border-2 border-[#1E3A8A] bg-[#F1F5F9] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              <span className="px-2 py-0.5 bg-[#1E3A8A] text-white text-[10px] font-mono font-bold uppercase">
                OFFICIAL B2B WHOLESALE PORTAL
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] uppercase leading-tight font-display">
                Industrial Machinery Equipment & Cosmetics Export Portal
              </h1>
              <p className="text-xs text-[#334155] leading-relaxed">
                Direct factory sourcing, customs clearance, and wholesale supply chain solutions connecting manufacturers in Turkey with buyers in Iraq and international markets.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => navigate('/products')}
                  className="px-4 py-2 bg-[#1E3A8A] hover:bg-[#1E293B] text-white font-bold text-xs uppercase"
                >
                  Browse Product Catalog
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-4 py-2 bg-white border border-[#1E3A8A] hover:bg-[#E2E8F0] text-[#1E3A8A] font-bold text-xs uppercase"
                >
                  Contact Sales Desk
                </button>
              </div>
            </div>

            <div className="w-full md:w-56 h-36 bg-white border border-[#CBD5E1] p-2 flex items-center justify-center shrink-0">
              <img
                src="/assets/header_logo.png"
                alt="DEMOZI Supply"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* 2. Featured B2B Product Directory Table/Grid */}
          <div className="border border-[#CBD5E1] bg-white">
            <div className="bg-[#F1F5F9] border-b border-[#CBD5E1] px-3 py-2 flex items-center justify-between">
              <h3 className="font-bold text-[#0F172A] text-xs font-mono uppercase">
                FEATURED PRODUCT CATALOG ({filteredProducts.length} ITEMS)
              </h3>
              <Link to="/products" className="text-[11px] text-[#1E3A8A] hover:underline font-bold font-mono">
                View Full Catalog »
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y divide-[#CBD5E1]">
              {filteredProducts.map((product) => {
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
                        [{product.brand || 'DEMOZI'}]
                      </span>
                      <h4 className="font-bold text-[#0F172A] text-xs uppercase line-clamp-2 mb-1">
                        {product.name}
                      </h4>
                      <div className="text-[10px] text-[#64748B] font-mono mb-2 space-y-0.5">
                        <div><strong>MOQ:</strong> Wholesale Standard</div>
                        <div><strong>Supply:</strong> Istanbul & Erbil Stock</div>
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
                        onClick={() => handleDirectWhatsApp(product)}
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

          {/* 3. 2010 B2B Specifications & Company Profile Text Box */}
          <div className="border border-[#CBD5E1] bg-white p-4 space-y-3">
            <h3 className="font-bold text-[#0F172A] text-xs font-mono uppercase border-b border-[#CBD5E1] pb-1">
              ABOUT DEMOZİ KOZMETİK VE MAKİNA DIŞ TİCARET LİMİTED ŞİRKETİ
            </h3>
            <p className="text-xs text-[#334155] leading-relaxed">
              DEMOZİ is a registered Turkish external trading enterprise specializing in high-grade cosmetics, personal care products, industrial machinery equipment, spare parts, and cross-border trade execution. Operating directly between our headquarters in Istanbul, Turkey, and our regional branch office in Erbil, Iraq, we ensure seamless supply chain logistics, customs documentation, and direct factory pricing for B2B buyers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[11px] font-mono">
              <div className="p-2 bg-[#F8FAFC] border border-[#CBD5E1]">
                <strong className="block text-[#1E3A8A]">Direct Sourcing:</strong>
                <span>Certified OEM/ODM factory partnerships</span>
              </div>
              <div className="p-2 bg-[#F8FAFC] border border-[#CBD5E1]">
                <strong className="block text-[#1E3A8A]">Customs Clearance:</strong>
                <span>Full export docs for Turkey & Iraq transit</span>
              </div>
              <div className="p-2 bg-[#F8FAFC] border border-[#CBD5E1]">
                <strong className="block text-[#1E3A8A]">B2B Pro-Forma RFQ:</strong>
                <span>Rapid quotation & WhatsApp support</span>
              </div>
            </div>
          </div>

          {/* 4. Recent Trade Transactions Ticker Table with HS Customs Codes */}
          <div className="border border-[#CBD5E1] bg-white">
            <div className="bg-[#F1F5F9] border-b border-[#CBD5E1] px-3 py-1.5 font-bold text-[#0F172A] text-xs font-mono uppercase">
              RECENT B2B INQUIRIES & TRADE TRANSACTIONS
            </div>
            <table className="b2b-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>HS Customs Code</th>
                  <th>Product Category / Description</th>
                  <th>Destination</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2026-08-06</td>
                  <td><code className="bg-[#E2E8F0] px-1 py-0.5 font-mono text-[10px]">HS 3304.99.00</code></td>
                  <td>Cosmetics Personal Care Wholesale Lot</td>
                  <td>Erbil, Iraq</td>
                  <td><span className="text-emerald-700 font-bold">RFQ Processed</span></td>
                </tr>
                <tr>
                  <td>2026-08-05</td>
                  <td><code className="bg-[#E2E8F0] px-1 py-0.5 font-mono text-[10px]">HS 8413.70.80</code></td>
                  <td>Industrial Hydraulic Pump & Spare Parts</td>
                  <td>Baghdad, Iraq</td>
                  <td><span className="text-emerald-700 font-bold">Shipped</span></td>
                </tr>
                <tr>
                  <td>2026-08-04</td>
                  <td><code className="bg-[#E2E8F0] px-1 py-0.5 font-mono text-[10px]">HS 8422.30.00</code></td>
                  <td>Cosmetic Packaging & Bottle Filling Line</td>
                  <td>Istanbul, Turkey</td>
                  <td><span className="text-blue-700 font-bold">Quotation Ready</span></td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>
  );
};
