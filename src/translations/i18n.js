/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import common_en from './en/common.json';
import common_de from './dk/common.json';
import common_vn from './vi/common.json';
import common_uk from './ua/common.json';
import common_es from './es/common.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        title: 'English',
        common: common_en,
      },
      de: {
        title: 'Denmark',
        common: common_de,
      },
      vi: {
        title: 'Tiếng Việt',
        common: common_vn,
      },
      uk: {
        title: 'Ukraine',
        common: common_uk,
      },
      es: {
        title: 'Spain',
        common: common_es,
      },
    },
    lng: localStorage.getItem('i18nextLng') || 'en',
    fallbackLng: 'en',
    debug: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
