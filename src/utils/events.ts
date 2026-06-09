import rawEvents from "../data/cafeina_events.json";
import type { Locale } from "./i18n";

/**
 * Single source of truth for the Events page is `src/data/cafeina_events.json`:
 *
 *   { page: { seo/hero/intro/cta copy }, events: [ … ], pastEvents: [ … ] }
 *
 * The team edits that one file to update the site. Optional fields (`date`,
 * `price`, `image`, `cta_*`) are rendered only when present — see EventsPage.
 * The `events` content collection (content.config.ts) validates the array at
 * build sync.
 */

export interface EventItem {
  id?: string;
  name: string;
  date?: string;
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

/** Page-level copy (SEO, hero, intro, CTA). */
export function getEventsPage(): EventsPageCopy {
  return data.page ?? {};
}

/** Events for a locale, sorted by `order`. */
export function getEvents(locale: Locale = "en"): EventItem[] {
  return (data.events ?? [])
    .filter((e) => (e.locale ?? "en") === locale)
    .sort((a, b) => (a.order ?? 100) - (b.order ?? 100));
}

/** Photos for the "past events" gallery strip. */
export function getPastEvents(): PastEventImage[] {
  return data.pastEvents ?? [];
}
