/**
 * i18n configuration using react-i18next.
 * Supports Arabic (RTL) and English (LTR).
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './locales/ar';
import en from './locales/en';
import type { SupportedLocale } from '@/api/types';

const resources = {
  ar: { translation: ar },
  en: { translation: en },
} as const;

const savedLocale = (localStorage.getItem('language') ?? 'ar') as SupportedLocale;

void i18n.use(initReactI18next).init({
  resources,
  lng: savedLocale,
  fallbackLng: 'ar',
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;

export function setLocale(locale: SupportedLocale): void {
  void i18n.changeLanguage(locale);
  localStorage.setItem('language', locale);
  const isRtl = locale !== 'en';
  document.documentElement.lang = locale;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.body.dir = isRtl ? 'rtl' : 'ltr';
}

export function getCurrentLocale(): SupportedLocale {
  return (i18n.language ?? 'ar') as SupportedLocale;
}

export function isRtl(): boolean {
  return getCurrentLocale() !== 'en';
}
