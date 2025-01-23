import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from '../locales/es.json';
import en from '../locales/en.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: 'en', // start language
  fallbackLng: 'es', // default laguage if lng is not working
  interpolation: { escapeValue: false },
});

export default i18n;
