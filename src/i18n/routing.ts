import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['cs', 'en', 'pl', 'de'],
  defaultLocale: 'cs',
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];

export const localeNames: Record<Locale, string> = {
  cs: 'Čeština',
  en: 'English',
  pl: 'Polski',
  de: 'Deutsch',
};

export const localeShort: Record<Locale, string> = {
  cs: 'CS',
  en: 'EN',
  pl: 'PL',
  de: 'DE',
};

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
