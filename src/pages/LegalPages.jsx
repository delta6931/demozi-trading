import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const LegalPages = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-2xl bg-white border border-[#E2E8F0] p-8 sm:p-12 shadow-b2b space-y-8">
          <div className="border-b border-[#E2E8F0] pb-6">
            <span className="px-3 py-1 rounded bg-[#3A8899] text-white text-xs font-bold uppercase">
              Kurumsal & Yasal Uyum
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-3 font-display">
              Resmi Şirket Unvanı & Ticari Koşullar
            </h1>
            <p className="text-xs text-[#3A8899] font-mono mt-1 font-bold">
              {t('company_name')}
            </p>
          </div>

          <div className="space-y-6 text-sm text-[#475569] leading-relaxed">
            <section className="space-y-2">
              <h3 className="text-lg font-bold text-[#0F172A] font-display">1. Resmi Şirket Unvanı ve Faaliyet Alanı</h3>
              <p>
                Sitemizde yer alan tüm ticari işlemler ve ürün tedarik faaliyetleri <strong>DEMOZİ KOZMETİK VE MAKİNA DIŞ TİCARET LİMİTED ŞİRKETİ</strong> resmi unvanı altında yürütülmektedir. Şirketimiz İstanbul (Türkiye) genel merkez ve Kerkük (Irak) bölge temsilciliği üzerinden kozmetik, makine donanımı ve dış ticaret hizmetleri sunmaktadır.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-bold text-[#0F172A] font-display">2. Ürün Orijinalliği ve Garanti</h3>
              <p>
                DEMOZİ KOZMETİK VE MAKİNA DIŞ TİCARET LİMİTED ŞİRKETİ tarafından tedarik edilen tüm kozmetik, makine parçaları ve sanayi ürünleri orijinal olup uluslararası standartlara uygundur.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-bold text-[#0F172A] font-display">3. Proforma Fiyat Teklifi ve Fatura İşlemleri</h3>
              <p>
                Temsilcilerimiz tarafından hazırlanan resmi proforma teklifler USD, EUR veya TRY para birimlerinde tanzim edilir. Şirketimiz bünyesinde faturalandırma resmi mevzuatlara uygun olarak gerçekleştirilmektedir.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-bold text-[#0F172A] font-display">4. Bölgesel Lojistik ve İade Şartları</h3>
              <p>
                Türkiye ve Irak gümrük süreçleri, kapıdan kapıya lojistik sevkiyatlar şirketimiz kontrolünde yürütülür. Orijinal ambalajı açılmamış ürünler teslimattan itibaren 14 gün içinde iade prosedürüne tabidir.
              </p>
            </section>
          </div>

        </div>

      </div>
    </div>
  );
};
