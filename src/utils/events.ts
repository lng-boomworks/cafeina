import rawEvents from "../data/cafeina_events.json";
import type { Locale } from "./i18n";

/**
 * Single source of truth for the Events page is `src/data/cafeina_events.json`:
 *
 *   { page: { seo/hero/intro/cta copy }, events: [ … ], pastEvents: [ … ] }
 *
 * The team edits that one file. Optional fields (`date`, `date_iso`, `price`,
 * `image`, `cta_*`) render only when present. `date_iso` (YYYY-MM-DD) is the
 * machine date used to split events into Upcoming vs Past and to sort them; the
 * `date` string is what's displayed (auto-formatted from `date_iso` if blank).
 * Events with no `date_iso` (e.g. recurring "Monthly") count as Upcoming.
 */

export interface EventItem {
  id?: string;
  name: string;
  date?: string;
  date_iso?: string;
  price?: string;
  description: string;
  image?: string;
  image_alt?: string;
  cta_text?: string;
  cta_url?: string;
  order?: number;
  locale?: string;
}

export interface PastEventImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface EventsPageCopy {
  seo_title?: string;
  seo_description?: string;
  hero_label?: string;
  hero_heading?: string;
  hero_subheading?: string;
  hero_image?: string;
  hero_image_alt?: string;
  intro_heading?: string;
  intro_body?: string;
  cta_heading?: string;
  cta_text?: string;
}

interface RawEvents {
  page?: EventsPageCopy;
  events?: EventItem[];
  pastEvents?: PastEventImage[];
}

const data = rawEvents as RawEvents;

/** Today as YYYY-MM-DD (build/runtime). String compare works for ISO dates. */
function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/** A dated event is "past" once its date has gone; undated/recurring is never past. */
export function isPastEvent(e: EventItem, today = todayISO()): boolean {
  return e.date_iso ? e.date_iso < today : false;
}

/** Human-readable date for the chip: prefers `date`, else formats `date_iso`. */
export function eventDateLabel(e: EventItem): string | undefined {
  if (e.date) return e.date;
  if (!e.date_iso) return undefined;
  const d = new Date(`${e.date_iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return e.date_iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function getEventsPage(): EventsPageCopy {
  return data.page ?? {};
}

function byLocale(locale: Locale): EventItem[] {
  return (data.events ?? []).filter((e) => (e.locale ?? "en") === locale);
}

/**
 * Upcoming + recurring events. Dated events come first, soonest first; undated
 * (recurring) events follow, ordered by their `order` field.
 */
export function getUpcomingEvents(locale: Locale = "en"): EventItem[] {
  const today = todayISO();
  return byLocale(locale)
    .filter((e) => !isPastEvent(e, today))
    .sort((a, b) => {
      const ta = a.date_iso ? Date.parse(a.date_iso) : Infinity;
      const tb = b.date_iso ? Date.parse(b.date_iso) : Infinity;
      if (ta !== tb) return ta - tb;
      return (a.order ?? 100) - (b.order ?? 100);
    });
}

/** Events whose date has passed, most recent first. */
export function getPastEvents(locale: Locale = "en"): EventItem[] {
  const today = todayISO();
  return byLocale(locale)
    .filter((e) => isPastEvent(e, today))
    .sort((a, b) => Date.parse(b.date_iso!) - Date.parse(a.date_iso!));
}

/** Photos for the "past events" gallery strip (separate from event listings). */
export function getEventPhotos(): PastEventImage[] {
  return data.pastEvents ?? [];
}
