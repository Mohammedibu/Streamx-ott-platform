import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslation from './locales/en/translation.json';
import taTranslation from './locales/ta/translation.json';
import hiTranslation from './locales/hi/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  ta: {
    translation: taTranslation
  },
  hi: {
    translation: hiTranslation
  }
};

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    detection: {
      // order and from where user language should be detected
      order: ['localStorage', 'navigator'],
      
      // keys or params to lookup language from
      lookupLocalStorage: 'userLanguage',
      
      // cache user language on
      caches: ['localStorage'],
    }
  });

export default i18n;