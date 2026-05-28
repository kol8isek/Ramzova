'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Mail, Users } from 'lucide-react';
import { BookingCalendar, type RangeState } from './BookingCalendar';
import { daysBetween, formatHumanDate, isoDate, ROOM_IDS, type RoomId } from '@/lib/dates';

const RESERVATION_EMAIL = 'rezervace@ubytovani-ramzova.cz';

interface RoomMeta {
  id: RoomId;
  name: string;
  capacity: string;
}

export function Booking() {
  const t = useTranslations('booking');
  const locale = useLocale();

  const rooms: RoomMeta[] = (t.raw('rooms') as Array<{ id: RoomId; name: string; capacity: string }>).map((r) => r);

  const [room, setRoom] = useState<RoomId>(rooms[0].id);
  const [range, setRange] = useState<RangeState>({ arrival: null, departure: null });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(2);
  const [note, setNote] = useState('');

  const nights = useMemo(() => {
    if (range.arrival && range.departure) return daysBetween(range.arrival, range.departure);
    return 0;
  }, [range]);

  const canSubmit = !!(range.arrival && range.departure && name.trim() && email.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !range.arrival || !range.departure) return;
    const selectedRoom = rooms.find((r) => r.id === room)!;
    const subject = t('email.subject', { room: selectedRoom.name });
    const body = t('email.body', {
      name,
      email,
      phone: phone || '—',
      room: selectedRoom.name,
      arrival: formatHumanDate(range.arrival, locale),
      departure: formatHumanDate(range.departure, locale),
      nights,
      guests,
      note: note.trim() || '—',
    });
    const url = `mailto:${RESERVATION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  return (
    <section id="booking" className="relative py-24 md:py-36 bg-stone-900">
      <div className="container-x">
        <div className="max-w-3xl mb-16 md:mb-20 reveal">
          <div className="flex items-center gap-4 mb-6">
            <span className="hairline" />
            <p className="kicker">{t('kicker')}</p>
          </div>
          <h2 className="heading-section text-cream mb-6">{t('title')}</h2>
          <p className="lede">{t('body')}</p>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left column: room selector + form fields */}
          <div className="lg:col-span-5 space-y-8 reveal">
            <div>
              <p className="text-xs uppercase tracking-ultra text-cream/60 mb-4">
                {t('chooseRoom')}
              </p>
              <div className="space-y-3">
                {rooms.map((r) => {
                  const active = r.id === room;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        setRoom(r.id);
                        setRange({ arrival: null, departure: null });
                      }}
                      className={`w-full text-left p-5 border transition-all ${
                        active
                          ? 'border-gold bg-stone-950'
                          : 'border-stone-800 bg-stone-950/40 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span
                          className={`font-serif text-lg ${active ? 'text-gold' : 'text-cream'}`}
                        >
                          {r.name}
                        </span>
                        <span className="text-xs uppercase tracking-widest text-cream/50">
                          {r.capacity}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-ultra text-cream/60 mb-4">
                {t('yourDetails')}
              </p>
              <div className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder={t('fields.name')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-sm text-cream placeholder-cream/40 focus:border-gold focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  required
                  placeholder={t('fields.email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-sm text-cream placeholder-cream/40 focus:border-gold focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder={t('fields.phone')}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-sm text-cream placeholder-cream/40 focus:border-gold focus:outline-none transition-colors"
                />
                <div className="flex items-center gap-3 bg-stone-950 border border-stone-800 px-4 py-3">
                  <Users size={16} className="text-gold" />
                  <label className="text-sm text-cream/70 flex-1">{t('fields.guests')}</label>
                  <input
                    type="number"
                    min={1}
                    max={8}
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                    className="w-16 bg-transparent text-right text-cream focus:outline-none"
                  />
                </div>
                <textarea
                  rows={3}
                  placeholder={t('fields.note')}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-sm text-cream placeholder-cream/40 focus:border-gold focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right column: calendar + summary */}
          <div className="lg:col-span-7 space-y-6 reveal">
            <BookingCalendar roomId={room} range={range} onChange={setRange} />

            <div className="bg-stone-950 border border-stone-800 p-6 md:p-8">
              <div className="grid grid-cols-3 gap-4 md:gap-6 mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-ultra text-cream/50 mb-1">
                    {t('summary.arrival')}
                  </p>
                  <p className="text-sm md:text-base text-cream font-serif">
                    {range.arrival ? formatHumanDate(range.arrival, locale) : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-ultra text-cream/50 mb-1">
                    {t('summary.departure')}
                  </p>
                  <p className="text-sm md:text-base text-cream font-serif">
                    {range.departure ? formatHumanDate(range.departure, locale) : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-ultra text-cream/50 mb-1">
                    {t('summary.nights')}
                  </p>
                  <p className="text-sm md:text-base text-gold font-serif">{nights || '—'}</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full btn-primary justify-center disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-gold/40"
              >
                <Mail size={14} />
                {t('submit')}
              </button>
              <p className="text-[11px] text-cream/45 mt-3 text-center">{t('submitNote')}</p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
