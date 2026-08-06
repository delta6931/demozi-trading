import React, { useState } from 'react';
import { Truck, ShieldCheck, Clock, FileText, ArrowRight, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ShippingEstimator = () => {
  const { t } = useLanguage();
  const [destination, setDestination] = useState('Erbil');
  const [category, setCategory] = useState('Cosmetics');

  const destinationsData = {
    Erbil: {
      transit: '2 - 4 Business Days',
      border: 'Habur / Ibrahim Khalil Border Crossing',
      docs: ['Pro-Forma Invoice', 'Certificate of Origin', 'MoH Quality Approval', 'HS Code Customs Declaration'],
      shippingType: 'Express Land Freight (Trailer / LTL)'
    },
    Baghdad: {
      transit: '4 - 6 Business Days',
      border: 'Habur Transit & Central Iraq Corridor',
      docs: ['Pro-Forma Invoice', 'Certificate of Origin', 'COSQC Inspection Certificate', 'HS Code Declaration'],
      shippingType: 'Direct Freight Trucking (FCL/LTL)'
    },
    Sulaymaniyah: {
      transit: '3 - 5 Business Days',
      border: 'Habur / Perwizkhan Transit Corridor',
      docs: ['Pro-Forma Invoice', 'Certificate of Origin', 'Customs Duty Declaration', 'HS Code Cert'],
      shippingType: 'Express Land Logistics'
    },
    Basra: {
      transit: '6 - 8 Business Days',
      border: 'Southern Iraq Freight Route',
      docs: ['Pro-Forma Invoice', 'Certificate of Origin', 'Port Customs Clearance', 'B2B Bill of Lading'],
      shippingType: 'Heavy Equipment & Cargo Trucking'
    },
    Istanbul: {
      transit: 'Same Day Dispatch',
      border: 'Domestic Istanbul Warehouse Delivery',
      docs: ['Tax Invoice (Fatura)', 'Dispatch Note (İrsaliye)', 'HS Code Sheet'],
      shippingType: 'Local Courier & Freight Dispatch'
    }
  };

  const selected = destinationsData[destination] || destinationsData['Erbil'];

  const handleWhatsAppFreightQuote = () => {
    const msg = `Hello DEMOZİ Logistics & Trade Desk,\n\nI would like to request a shipping & customs quotation:\n• Destination: ${destination}\n• Sector/Category: ${category}\n• Transit Route: ${selected.border}\n• Estimated Lead Time: ${selected.transit}\n\nPlease contact me with freight charges & pro-forma details.`;
    window.open(`https://wa.me/905396619004?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="border-2 border-[#1E3A8A] bg-white p-4 font-sans text-xs space-y-3 shadow-sm">
      <div className="flex items-center gap-2 border-b-2 border-[#1E3A8A] pb-2">
        <Truck className="w-5 h-5 text-[#1E3A8A] shrink-0" />
        <div>
          <h3 className="font-extrabold text-[#0F172A] text-xs font-mono uppercase">
            TURKEY - IRAQ TRADE & SHIPPING ESTIMATOR
          </h3>
          <span className="text-[10px] text-[#64748B]">Calculate Transit Times & Customs Requirements</span>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
        <div>
          <label className="block text-[10px] font-bold text-[#0F172A] uppercase mb-1">Select Destination:</label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-[#CBD5E1] p-1.5 text-xs text-[#0F172A] outline-none font-bold"
          >
            <option value="Erbil">Erbil, Iraq (KRI)</option>
            <option value="Baghdad">Baghdad, Iraq</option>
            <option value="Sulaymaniyah">Sulaymaniyah, Iraq</option>
            <option value="Basra">Basra, Iraq</option>
            <option value="Istanbul">Istanbul, Turkey (HQ)</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-[#0F172A] uppercase mb-1">Product Sector:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-[#CBD5E1] p-1.5 text-xs text-[#0F172A] outline-none font-bold"
          >
            <option value="Cosmetics">Cosmetics & Personal Care</option>
            <option value="Industrial Machinery">Machinery & Spare Parts</option>
            <option value="Chemical Raw Materials">Chemicals & Raw Materials</option>
          </select>
        </div>
      </div>

      {/* Output Results Box */}
      <div className="p-3 bg-[#F1F5F9] border border-[#CBD5E1] space-y-2 font-mono text-[11px]">
        <div className="flex items-center justify-between border-b border-[#CBD5E1] pb-1.5">
          <span className="text-[#64748B] font-bold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#1E3A8A]" /> Transit Time:
          </span>
          <strong className="text-[#1E3A8A] font-extrabold">{selected.transit}</strong>
        </div>

        <div className="flex items-center justify-between border-b border-[#CBD5E1] pb-1.5">
          <span className="text-[#64748B] font-bold flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-[#1E3A8A]" /> Customs Route:
          </span>
          <strong className="text-[#0F172A]">{selected.border}</strong>
        </div>

        <div>
          <span className="text-[#64748B] font-bold flex items-center gap-1 mb-1">
            <FileText className="w-3.5 h-3.5 text-[#1E3A8A]" /> Customs Docs Checklist:
          </span>
          <div className="flex flex-wrap gap-1">
            {selected.docs.map((doc, idx) => (
              <span key={idx} className="px-1.5 py-0.5 bg-white border border-[#CBD5E1] text-[10px] text-[#0F172A] font-semibold">
                ✓ {doc}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <button
        onClick={handleWhatsAppFreightQuote}
        className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-emerald-900 shadow-xs"
      >
        <MessageSquare className="w-4 h-4 text-white" />
        <span>Request Freight Quotation on WhatsApp</span>
      </button>
    </div>
  );
};
