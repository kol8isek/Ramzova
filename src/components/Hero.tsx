'use client';

import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* Background drone video — placeholder. Replace src with your own drone footage. */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=2400&q=80"
      >
        <source
          src="https://videos.pexels.com/video-files/15687652/15687652-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/30 to-stone-950/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full container-x flex flex-col justify-end pb-24 md:pb-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6 animate-fade-in">
            <span className="hairline" />
            <p className="kicker">{t('kicker')}</p>
          </div>
          <h1 className="heading-display text-cream mb-8 animate-fade-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            {t('title')}
          </h1>
          <p
            className="lede mb-10 animate-fade-up"
            style={{ animationDelay: '0.5s', opacity: 0 }}
          >
            {t('subtitle')}
          </p>
          <div className="animate-fade-up" style={{ animationDelay: '0.8s', opacity: 0 }}>
            <a href="#stay" className="btn-primary">
              {t('cta')}
              <ChevronDown size={14} />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/70">
          <span className="text-[10px] uppercase tracking-ultra">{t('scroll')}</span>
          <ChevronDown size={16} className="animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
