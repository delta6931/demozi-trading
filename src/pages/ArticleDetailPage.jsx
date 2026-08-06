import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { productsData } from '../data/productsData';
import { useQuote } from '../context/QuoteContext';
import { ArrowLeft, FileText, CheckCircle2, MessageSquare, ShieldCheck, Tag } from 'lucide-react';

export const ArticleDetailPage = () => {
  const { t } = useLanguage();
  const { addToQuote, quoteItems } = useQuote();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const articleId = queryParams.get('id') || 'art1';

  const articles = {
    art1: {
      title: t('art1_title'),
      category: 'Cosmetics Export & Regulatory Compliance',
      date: '2026-08-05',
      author: 'DEMOZİ Trade Regulatory Desk',
      hsCodes: ['HS 3304.99.00 (Skincare & Beauty)', 'HS 3305.10.00 (Hair Care Preparations)'],
      content: `
        <h3>1. Regulatory Compliance & Ministry Approval</h3>
        <p>Exporting cosmetics and personal care products from Turkey to Iraq requires strict adherence to both Turkish Export Registry regulations and Iraqi Ministry of Health (MoH) quality standards. All shipments exiting via the Habur / Ibrahim Khalil border crossing must be accompanied by certified Certificate of Free Sale (Serbest Satış Sertifikası) issued by the Turkish Ministry of Health.</p>

        <h3>2. Customs Documentation Checklist</h3>
        <ul>
          <li><strong>Pro-Forma & Commercial Invoice:</strong> Must list complete HS Customs Codes, unit quantities, FOB/CIF valuation in USD, and manufacturer tax numbers.</li>
          <li><strong>Certificate of Origin (EUR.1 / Form A):</strong> Issued by Istanbul Chamber of Commerce (İTO) proving 100% Turkish manufacturing or EU origin.</li>
          <li><strong>Bilingual Arabic/English Product Labeling:</strong> Ingredients list, batch number, production date, expiration date, and distributor credentials in Iraq.</li>
        </ul>

        <h3>3. Transit Logistics & Border Crossing</h3>
        <p>Road freight from Istanbul warehouses to Erbil or Baghdad typically takes 2 to 4 business days. DEMOZİ handles full customs transit documentation, customs bond guarantee, and direct warehouse unloading at our Erbil regional logistics hub.</p>
      `
    },
    art2: {
      title: t('art2_title'),
      category: 'Industrial Machinery & Spare Parts Sourcing',
      date: '2026-08-04',
      author: 'DEMOZİ Industrial Engineering Team',
      hsCodes: ['HS 8413.70.80 (Pumps)', 'HS 8422.30.00 (Packaging Line Machinery)'],
      content: `
        <h3>1. Preventing Unplanned Production Line Downtime</h3>
        <p>For industrial manufacturing plants in Erbil, Baghdad, and Sulaymaniyah, unpredicted failure of key CIJ inkjet printers, hydraulic pumps, or filling nozzles can halt entire production lines. Establishing a localized safety stock inventory of critical consumable filters and spare parts is essential for operational continuity.</p>

        <h3>2. Sourcing OEM-Certified Compatible Components</h3>
        <p>DEMOZİ maintains localized stock for major continuous inkjet (CIJ) brands including Linx, Needham, Hitachi, and Citronix. Sourcing certified compatible MEK inks, make-up solvents, and PTFE main filter kits ensures maximum printhead longevity without incurring high OEM lead times.</p>
      `
    },
    art3: {
      title: t('art3_title'),
      category: 'Turkey - Iraq Cross-Border Logistics Management',
      date: '2026-08-03',
      author: 'DEMOZİ Logistics Operations',
      hsCodes: ['HS 8479.89.97 (Industrial Equipment Parts)'],
      content: `
        <h3>1. Habur / Ibrahim Khalil Border Clearance Protocol</h3>
        <p>The Habur / Ibrahim Khalil border represents the primary trade gateway between Turkey and the Kurdistan Region of Iraq (KRI). Commercial cargo must undergo mandatory customs inspection, weight verification, and COSQC (Central Organization for Standardization and Quality Control) documentation checks.</p>

        <h3>2. Consolidated Container & LTL Freight Options</h3>
        <p>DEMOZİ provides both Full Truckload (FTL) and Less Than Truckload (LTL) consolidation for B2B buyers. Partial shipments of industrial spare parts or cosmetic inventory are consolidated at our Istanbul logistics depot for express daily dispatch.</p>
      `
    },
    art4: {
      title: t('art4_title'),
      category: 'Cosmetic Packaging & Bottle Filling Line Standards',
      date: '2026-08-02',
      author: 'DEMOZİ Packaging Engineering',
      hsCodes: ['HS 8422.30.00 (Bottling & Capping Machinery)'],
      content: `
        <h3>1. Sanitation Protocols in Liquid Filling Lines</h3>
        <p>Maintaining sterile conditions during high-speed cosmetic liquid and cream filling requires automated Clean-In-Place (CIP) circulation and food-grade stainless steel (SUS304/SUS316) fluid contact surfaces.</p>

        <h3>2. Servicing Nozzles & Piston Seal Maintenance</h3>
        <p>Replacing worn silicone piston seals, O-rings, and nozzle cams every 500 operating hours prevents volumetric inaccuracy and product leaks. DEMOZİ stocks direct replacement stainless steel cams, knurled knobs, and solenoid valves for liquid packaging facilities.</p>
      `
    }
  };

  const article = articles[articleId] || articles['art1'];
  const relatedProducts = productsData.slice(0, 4);

  const handleWhatsAppConsultation = () => {
    const msg = `Hello DEMOZİ Technical Trade Desk,\n\nI read your guide "${article.title}" and would like to consult with an engineer regarding product sourcing & customs clearance for Iraq/Turkey.`;
    window.open(`https://wa.me/905396619004?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-white border border-[#CBD5E1] p-4 shadow-sm my-4 font-sans text-xs max-w-[1024px] mx-auto space-y-4">
      
      {/* Back Button */}
      <button
        onClick={() => navigate('/solutions')}
        className="flex items-center gap-1.5 text-[#1E3A8A] font-bold font-mono text-xs hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>« Back to All Technical Guides & Solutions</span>
      </button>

      {/* Article Header Box */}
      <div className="border-2 border-[#1E3A8A] bg-[#F1F5F9] p-4 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px]">
          <span className="px-2 py-0.5 bg-[#1E3A8A] text-white font-bold uppercase">{article.category}</span>
          <span className="text-[#64748B]">Published: {article.date} | By: {article.author}</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] uppercase font-display leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
          <strong className="text-[#0F172A]">Relevant HS Customs Codes:</strong>
          {article.hsCodes.map((hs, idx) => (
            <code key={idx} className="bg-white border border-[#CBD5E1] px-1.5 py-0.5 text-[#1E3A8A] font-bold">
              {hs}
            </code>
          ))}
        </div>
      </div>

      {/* Article Body Content */}
      <div className="border border-[#CBD5E1] bg-white p-6 space-y-4 text-xs text-[#334155] leading-relaxed">
        <div
          className="prose max-w-none font-sans"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* WhatsApp Consultation Box */}
        <div className="p-4 bg-[#EFF6FF] border-2 border-[#1E3A8A] space-y-2 text-center font-mono">
          <h4 className="font-extrabold text-[#0F172A] text-xs uppercase">
            NEED DIRECT ASSISTANCE WITH CUSTOMS OR SOURCING?
          </h4>
          <p className="text-[11px] text-[#475569]">
            Our trade engineers in Istanbul and Erbil are ready to prepare a customized pro-forma quotation & logistics schedule.
          </p>
          <button
            onClick={handleWhatsAppConsultation}
            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 mx-auto border border-emerald-900 shadow-xs"
          >
            <MessageSquare className="w-4 h-4 text-white" />
            <span>Consult Trade Engineer on WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Related Equipment Section */}
      <div className="border border-[#CBD5E1] bg-white p-3 space-y-3">
        <h3 className="font-bold text-[#0F172A] text-xs font-mono uppercase border-b border-[#CBD5E1] pb-1">
          RELATED PRODUCTS & EQUIPMENT FOR THIS SECTOR
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {relatedProducts.map((p) => (
            <div key={p.id} className="p-2 border border-[#CBD5E1] bg-[#F8FAFC] flex flex-col justify-between font-mono text-[10px]">
              <div>
                <div className="h-20 bg-white border border-[#E2E8F0] mb-1 p-1 flex items-center justify-center">
                  <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                </div>
                <strong className="text-[#1E3A8A] uppercase block truncate">[{p.brand || 'DEMOZI'}] {p.name}</strong>
              </div>
              <button
                onClick={() => addToQuote(p)}
                className="mt-2 w-full py-1 bg-[#1E3A8A] text-white font-bold uppercase text-[9px]"
              >
                + Add to Inquiry
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
