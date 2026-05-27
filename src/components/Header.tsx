'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

const navItems = ['stay', 'rooms', 'dining', 'contact'] as const;

export function Header() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'bg-stone-950/95 backdrop-blur-md border-b border-stone-800'
          : 'bg-transparent'
      }`}
    >
      <div className="container-x flex items-center justify-between py-5 md:py-6">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="font-serif text-xl md:text-2xl tracking-wide text-cream group-hover:text-gold transition-colors">
            Ramzová
          </span>
          <span className="hidden md:inline text-[10px] uppercase tracking-ultra text-gold/80">
            Est. 1923
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-xs uppercase tracking-widest text-cream/80 hover:text-gold transition-colors"
            >
              {t(item)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          <LanguageSwitcher />
          <a href="#contact" className="btn-primary hidden md:inline-flex">
            {t('book')}
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-cream"
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-stone-800 bg-stone-950/98 backdrop-blur-md">
          <div className="container-x flex flex-col py-6 gap-5">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-widest text-cream/85 hover:text-gold transition-colors"
              >
                {t(item)}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary self-start mt-2"
            >
              {t('book')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
