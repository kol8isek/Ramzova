'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  addDays,
  formatMonthYear,
  getBlockedNights,
  isoDate,
  monthGrid,
  rangeOverlapsBlocked,
  startOfDay,
  startOfMonth,
  type RoomId,
} from '@/lib/dates';

export type RangeState = { arrival: Date | null; departure: Date | null };

interface Props {
  roomId: RoomId;
  range: RangeState;
  onChange: (range: RangeState) => void;
}

export function BookingCalendar({ roomId, range, onChange }: Props) {
  const locale = useLocale();
  const t = useTranslations('booking.calendar');
  const today = useMemo(() => startOfDay(new Date()), []);
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()));

  const blocked = useMemo(() => getBlockedNights(roomId), [roomId]);

  const weekdayLabels = useMemo(() => {
    const monday = new Date(2024, 0, 1); // Mon Jan 1 2024
    return Array.from({ length: 7 }, (_, i) => {
      const d = addDays(monday, i);
      return d.toLocaleDateString(locale, { weekday: 'short' });
    });
  }, [locale]);

  const handleDayClick = (d: Date) => {
    if (d < today) return;
    if (blocked.has(isoDate(d))) return;

    if (!range.arrival || (range.arrival && range.departure)) {
      onChange({ arrival: d, departure: null });
      return;
    }
    // arrival set, departure not
    if (d <= range.arrival) {
      onChange({ arrival: d, departure: null });
      return;
    }
    // check range doesn't include blocked night
    if (rangeOverlapsBlocked(range.arrival, d, blocked)) {
      onChange({ arrival: d, departure: null });
      return;
    }
    onChange({ arrival: range.arrival, departure: d });
  };

  const renderMonth = (monthDate: Date) => {
    const grid = monthGrid(monthDate);
    return (
      <div className="flex-1 min-w-0">
        <div className="text-center mb-4 font-serif text-xl text-cream capitalize">
          {formatMonthYear(monthDate, locale)}
        </div>
        <div className="grid grid-cols-7 gap-px text-[10px] uppercase tracking-widest text-cream/40 mb-2">
          {weekdayLabels.map((wd, i) => (
            <div key={i} className="text-center py-1">
              {wd}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px">
          {grid.map((d, i) => {
            const inMonth = d.getMonth() === monthDate.getMonth();
            const past = d < today;
            const isBlocked = blocked.has(isoDate(d));
            const isArrival = range.arrival && isoDate(d) === isoDate(range.arrival);
            const isDeparture = range.departure && isoDate(d) === isoDate(range.departure);
            const inRange =
              range.arrival && range.departure && d > range.arrival && d < range.departure;
            const disabled = past || isBlocked || !inMonth;

            const base =
              'aspect-square flex items-center justify-center text-sm transition-colors select-none';
            let cls = base;
            if (!inMonth) cls += ' text-cream/20';
            else if (past) cls += ' text-cream/25 line-through';
            else if (isBlocked) cls += ' text-cream/30 line-through bg-stone-900/40';
            else if (isArrival || isDeparture) cls += ' bg-gold text-stone-950 font-medium';
            else if (inRange) cls += ' bg-gold/30 text-cream';
            else cls += ' text-cream hover:bg-stone-800 cursor-pointer';

            return (
              <button
                key={i}
                type="button"
                disabled={disabled}
                onClick={() => handleDayClick(d)}
                className={cls}
                aria-label={d.toLocaleDateString(locale)}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const nextMonth = addDays(startOfMonth(addDays(cursor, 35)), 0);

  return (
    <div className="bg-stone-900/60 border border-stone-800 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => setCursor(startOfMonth(addDays(cursor, -1)))}
          className="w-10 h-10 flex items-center justify-center border border-stone-700 text-cream hover:border-gold hover:text-gold transition-colors"
          aria-label={t('prev')}
        >
          <ChevronLeft size={16} />
        </button>
        <p className="text-xs uppercase tracking-ultra text-cream/60">{t('selectDates')}</p>
        <button
          type="button"
          onClick={() => setCursor(startOfMonth(addDays(cursor, 32)))}
          className="w-10 h-10 flex items-center justify-center border border-stone-700 text-cream hover:border-gold hover:text-gold transition-colors"
          aria-label={t('next')}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {renderMonth(cursor)}
        <div className="hidden md:block">{renderMonth(nextMonth)}</div>
      </div>

      <div className="mt-6 pt-6 border-t border-stone-800 flex flex-wrap gap-x-6 gap-y-2 text-xs text-cream/60">
        <span className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-gold" />
          {t('legendSelected')}
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-gold/30" />
          {t('legendRange')}
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-stone-900 border border-stone-700" />
          {t('legendBlocked')}
        </span>
      </div>
    </div>
  );
}
