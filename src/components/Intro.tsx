import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function Intro() {
  const t = useTranslations('intro');

  return (
    <section id="stay" className="relative py-24 md:py-36 bg-stone-950">
      <div className="container-x grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-6 reveal">
          <div className="flex items-center gap-4 mb-6">
            <span className="hairline" />
            <p className="kicker">{t('kicker')}</p>
          </div>
          <h2 className="heading-section text-cream mb-8">{t('title')}</h2>
          <p className="lede mb-10">{t('body')}</p>
          <div className="grid grid-cols-3 gap-4 max-w-md border-t border-stone-800 pt-8">
            <div>
              <p className="font-serif text-3xl text-gold">1923</p>
              <p className="text-xs uppercase tracking-widest text-cream/60 mt-1">{t('stats.tradition')}</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-gold">48</p>
              <p className="text-xs uppercase tracking-widest text-cream/60 mt-1">{t('stats.rooms')}</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-gold">760m</p>
              <p className="text-xs uppercase tracking-widest text-cream/60 mt-1">{t('stats.elevation')}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative reveal">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80"
              alt={t('imageAlt')}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 hidden md:block w-40 h-52 overflow-hidden border-4 border-stone-950">
            <Image
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80"
              alt="Hory"
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
