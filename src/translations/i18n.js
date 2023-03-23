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
import common_th from './th/common.json';
import common_hr from './hr/common.json';
import common_fr from './fr/common.json';
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        icon : '/assets/flag-icons/gb.svg',
        title: 'English',
        common: common_en,
      },
      de: {
        icon : '/assets/flag-icons/dk.svg',
        title: 'Dansk',
        common: common_de,
      },
      vi: {
        icon : '/assets/flag-icons/vn.svg',
        title: 'Tiếng Việt',
        common: common_vn,
      },
      uk: {
        icon : '/assets/flag-icons/ua.svg',
        title: 'Yкраїнська',
        common: common_uk,
      },
      es: {
        icon : '/assets/flag-icons/es.svg',
        title: 'Español',
        common: common_es,
      },
      th: {
        icon :'/assets/flag-icons/th.svg',
        title: 'ภาษาไทย',
        common: common_th,
      },
      hr: {
        icon : '/assets/flag-icons/hr.svg',
        title: 'Croatian',
        common: common_hr,
      },
      fr: {
        icon : '/assets/flag-icons/fr.svg',
        title: 'Français',
        common: common_fr,
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
