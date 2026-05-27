import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

export function Dining() {
  const t = useTranslations('dining');
  const items = t.raw('items') as Array<{ name: string; type: string; distance: string }>;

  return (
    <section id="dining" className="relative py-24 md:py-36 bg-stone-950">
      <div className="container-x grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="reveal order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1400&q=80"
              alt="Restaurace v okolí"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="reveal order-1 lg:order-2">
          <div className="flex items-center gap-4 mb-6">
            <span className="hairline" />
            <p className="kicker">{t('kicker')}</p>
          </div>
          <h2 className="heading-section text-cream mb-8">{t('title')}</h2>
          <p className="lede mb-6">{t('body')}</p>
          <p className="text-sm text-gold/90 mb-12 italic">{t('note')}</p>

          <ul className="divide-y divide-stone-800 border-y border-stone-800">
            {items.map((item) => (
              <li key={item.name} className="py-5 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                <div>
                  <p className="font-serif text-xl md:text-2xl text-cream">{item.name}</p>
                  <p className="text-xs uppercase tracking-widest text-cream/55 mt-1">{item.type}</p>
                </div>
                <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold/90 shrink-0">
                  <MapPin size={12} />
                  {item.distance}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
