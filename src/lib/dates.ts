import bookingsData from '@/data/bookings.json';

export type RoomId = 'classic' | 'panorama' | 'residence';

export const ROOM_IDS: RoomId[] = ['classic', 'panorama', 'residence'];

const bookings = bookingsData as unknown as Record<RoomId, string[]>;

/** Returns YYYY-MM-DD */
export function isoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseISO(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

export function daysBetween(a: Date, b: Date): number {
  const ms = 1000 * 60 * 60 * 24;
  return Math.round((b.getTime() - a.getTime()) / ms);
}

export function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Returns a 6x7 grid (42 cells) of Date objects for the month-view of `month`. */
export function monthGrid(month: Date, weekStartsMonday = true): Date[] {
  const first = startOfMonth(month);
  const firstWeekday = first.getDay(); // 0=Sun
  const offset = weekStartsMonday ? (firstWeekday === 0 ? 6 : firstWeekday - 1) : firstWeekday;
  const gridStart = addDays(first, -offset);
  return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
}

/**
 * Returns the set of blocked nights for a room. A booking 2026-06-08/2026-06-12
 * means the guest occupies nights of June 8, 9, 10, 11 and leaves the morning
 * of June 12. So June 12 is considered free for a new arrival.
 */
export function getBlockedNights(roomId: RoomId): Set<string> {
  const set = new Set<string>();
  for (const range of bookings[roomId] ?? []) {
    if (range.startsWith('_')) continue;
    const [from, to] = range.split('/').map(parseISO);
    let cur = from;
    while (cur < to) {
      set.add(isoDate(cur));
      cur = addDays(cur, 1);
    }
  }
  return set;
}

/** True if a [arrival, departure) range contains any blocked night. */
export function rangeOverlapsBlocked(arrival: Date, departure: Date, blocked: Set<string>): boolean {
  let cur = arrival;
  while (cur < departure) {
    if (blocked.has(isoDate(cur))) return true;
    cur = addDays(cur, 1);
  }
  return false;
}

export function formatHumanDate(d: Date, locale: string): string {
  return d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatMonthYear(d: Date, locale: string): string {
  return d.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
}
