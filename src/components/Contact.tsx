import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';

export function Contact() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="relative py-24 md:py-36 bg-stone-950 border-t border-stone-800">
      <div className="container-x grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5 reveal">
          <div className="flex items-center gap-4 mb-6">
            <span className="hairline" />
            <p className="kicker">{t('kicker')}</p>
          </div>
          <h2 className="heading-section text-cream mb-10">{t('title')}</h2>
          <a href="#booking" className="btn-primary">
            {t('cta')}
            <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="lg:col-span-7 reveal">
          <ul className="space-y-8">
            <li className="flex gap-5">
              <MapPin size={20} className="text-gold mt-1 shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-widest text-cream/50 mb-1">{t('labels.address')}</p>
                <p className="text-base md:text-lg text-cream">{t('address')}</p>
              </div>
            </li>
            <li className="flex gap-5">
              <Phone size={20} className="text-gold mt-1 shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-widest text-cream/50 mb-1">{t('labels.phone')}</p>
                <a href={`tel:${t('phone').replace(/\s/g, '')}`} className="text-base md:text-lg text-cream hover:text-gold transition-colors">
                  {t('phone')}
                </a>
              </div>
            </li>
            <li className="flex gap-5">
              <Mail size={20} className="text-gold mt-1 shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-widest text-cream/50 mb-1">{t('labels.email')}</p>
                <a href={`mailto:${t('email')}`} className="text-base md:text-lg text-cream hover:text-gold transition-colors">
                  {t('email')}
                </a>
              </div>
            </li>
            <li className="flex gap-5">
              <Clock size={20} className="text-gold mt-1 shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-widest text-cream/50 mb-1">{t('labels.reception')}</p>
                <p className="text-base md:text-lg text-cream">{t('hours')}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
