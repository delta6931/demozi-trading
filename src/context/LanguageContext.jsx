import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

const detectDefaultLanguage = () => {
  // 1. Check saved user preference in localStorage
  try {
    const saved = localStorage.getItem('demozi_lang');
    if (saved && translations[saved]) {
      return saved;
    }
  } catch (e) {}

  // 2. Check browser languages (tr, tr-TR, tr-CY)
  try {
    const browserLangs = navigator.languages || [navigator.language || ''];
    const isTurkishBrowser = browserLangs.some(
      (l) => l && l.toLowerCase().startsWith('tr')
    );
    if (isTurkishBrowser) {
      return 'tr';
    }
  } catch (e) {}

  // 3. Check timezone (Europe/Istanbul or Turkey timezones)
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.toLowerCase().includes('istanbul') || tz.toLowerCase().includes('turkey')) {
      return 'tr';
    }
  } catch (e) {}

  return 'en';
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => detectDefaultLanguage());

  const setLang = (newLang) => {
    if (translations[newLang]) {
      setLangState(newLang);
      try {
        localStorage.setItem('demozi_lang', newLang);
      } catch (e) {}
    }
  };

  useEffect(() => {
    const isRtl = lang === 'ar';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const t = (key) => {
    return translations[lang]?.[key] || translations['tr']?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRtl: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
