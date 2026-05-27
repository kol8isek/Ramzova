import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const contact = useTranslations('contact');

  return (
    <footer className="bg-stone-900 border-t border-stone-800 text-cream/70">
      <div className="container-x py-16 md:py-20 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="font-serif text-2xl text-cream mb-3">Ramzová</div>
          <p className="text-xs uppercase tracking-ultra text-gold/80 mb-6">{t('tagline')}</p>
          <p className="text-sm leading-relaxed max-w-md">{contact('address')}</p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-ultra text-cream mb-5">{t('contactHeading')}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href={`tel:${contact('phone').replace(/\s/g, '')}`} className="hover:text-gold transition-colors">{contact('phone')}</a></li>
            <li><a href={`mailto:${contact('email')}`} className="hover:text-gold transition-colors">{contact('email')}</a></li>
            <li className="text-cream/50">{contact('hours')}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-ultra text-cream mb-5">{t('infoHeading')}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-gold transition-colors">{t('links.privacy')}</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">{t('links.terms')}</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">{t('links.press')}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-cream/50">
          <p>© {new Date().getFullYear()} {t('brandName')}. {t('rights')}</p>
          <p className="tracking-widest uppercase">{t('madeWith')}</p>
        </div>
      </div>
    </footer>
  );
}
