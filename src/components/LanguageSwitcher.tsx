'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, routing } from '@/i18n/routing';
import { localeNames, localeShort, type Locale } from '@/i18n/routing';
import { Globe, Check } from 'lucide-react';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label={t('languageLabel')}
        className="flex items-center gap-2 text-xs uppercase tracking-widest text-cream/80 hover:text-gold transition-colors"
      >
        <Globe size={14} />
        <span>{localeShort[locale]}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 min-w-[180px] bg-stone-950 border border-stone-800 shadow-2xl">
          <ul className="py-2">
            {routing.locales.map((l) => (
              <li key={l}>
                <Link
                  href={pathname}
                  locale={l}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-5 py-3 text-sm transition-colors ${
                    l === locale
                      ? 'text-gold'
                      : 'text-cream/80 hover:text-gold hover:bg-stone-900'
                  }`}
                >
                  <span>{localeNames[l]}</span>
                  {l === locale && <Check size={14} />}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
