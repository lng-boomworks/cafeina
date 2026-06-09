import rawTeam from "../data/cafeina_team.json";
import type { Locale } from "./i18n";

/**
 * Single source of truth for the Team page is `src/data/cafeina_team.json`:
 *
 *   { page: { seo_title, hero_*, intro_*, cta_* }, members: [ { … } ] }
 *
 * This module exposes typed accessors for both halves. The `teamMembers`
 * content collection (content.config.ts) loads + validates the same `members`
 * array at build sync. Edit the JSON and the whole page updates — copy and team.
 */

export interface TeamMember {
  id?: string;
  name: string;
  role?: string;
  tagline?: string;
  bio: string;
  photo?: string;
  photo_alt?: string;
  order?: number;
  locale?: string;
  placeholder?: boolean;
}

export interface TeamPageCopy {
  seo_title?: string;
  seo_description?: string;
  hero_label?: string;
  hero_heading?: string;
  hero_subheading?: string;
  hero_landscape_image?: string;
  hero_landscape_image_alt?: string;
  intro_heading?: string;
  intro_body?: string;
  cta_heading?: string;
  cta_text?: string;
}

interface RawTeam {
  page?: TeamPageCopy;
  members?: TeamMember[];
}

const data = rawTeam as RawTeam;

const byOrder = (a: TeamMember, b: TeamMember) => (a.order ?? 100) - (b.order ?? 100);

/** Page-level copy (SEO, hero, intro, CTA). */
export function getTeamPage(): TeamPageCopy {
  return data.page ?? {};
}

/**
 * Team members for a locale, sorted by `order`. Placeholder members (incomplete
 * entries kept in the JSON for later) are excluded unless explicitly requested.
 */
export function getTeamMembers(
  locale: Locale = "en",
  { includePlaceholders = false }: { includePlaceholders?: boolean } = {}
): TeamMember[] {
  return (data.members ?? [])
    .filter((m) => (m.locale ?? "en") === locale)
    .filter((m) => includePlaceholders || !m.placeholder)
    .sort(byOrder);
}
