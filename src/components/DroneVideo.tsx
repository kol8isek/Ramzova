'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Play, Pause } from 'lucide-react';

export function DroneVideo() {
  const t = useTranslations('video');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 md:py-36 bg-stone-950">
      <div className="container-x mb-12 md:mb-16">
        <div className="max-w-2xl reveal">
          <div className="flex items-center gap-4 mb-6">
            <span className="hairline" />
            <p className="kicker">{t('kicker')}</p>
          </div>
          <h2 className="heading-section text-cream mb-6">{t('title')}</h2>
          <p className="lede">{t('body')}</p>
        </div>
      </div>

      <div className="container-x reveal">
        <div className="relative aspect-video overflow-hidden bg-stone-900 group">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80"
          >
            <source
              src="https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/30 to-transparent pointer-events-none" />
          <button
            onClick={toggle}
            aria-label={playing ? 'Pauza' : 'Přehrát'}
            className="absolute bottom-6 right-6 w-14 h-14 flex items-center justify-center bg-stone-950/60 backdrop-blur-sm border border-cream/30 text-cream hover:bg-gold hover:text-stone-950 hover:border-gold transition-all"
          >
            {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>
        </div>
      </div>
    </section>
  );
}
