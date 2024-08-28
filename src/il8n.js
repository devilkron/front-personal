import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../public/locales/en/traslation.json';
import thTranslation from '../public/locales/th/traslation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      th: {
        translation: thTranslation
      }
    },
    lng: 'th', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
