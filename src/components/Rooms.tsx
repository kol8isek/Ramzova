import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const roomImages = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
];

export function Rooms() {
  const t = useTranslations('rooms');
  const items = t.raw('items') as Array<{ name: string; size: string; desc: string }>;

  return (
    <section id="rooms" className="relative py-24 md:py-36 bg-stone-900">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="lg:col-span-5 reveal">
            <div className="flex items-center gap-4 mb-6">
              <span className="hairline" />
              <p className="kicker">{t('kicker')}</p>
            </div>
            <h2 className="heading-section text-cream">{t('title')}</h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 reveal">
            <p className="lede">{t('body')}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((room, i) => (
            <article key={room.name} className="group reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <Image
                  src={roomImages[i]}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-serif text-2xl text-cream group-hover:text-gold transition-colors">
                  {room.name}
                </h3>
                <span className="text-xs uppercase tracking-widest text-gold">{room.size}</span>
              </div>
              <p className="text-sm text-cream/65 leading-relaxed">{room.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 reveal">
          <a href="#contact" className="btn-outline">
            {t('cta')}
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
