import rawMenu from "../data/cafeina_menu.json";
import type { Locale } from "./i18n";

/**
 * Single source of truth for the menu is `src/data/cafeina_menu.json`, authored
 * in a natural nested shape:
 *
 *   { currency, note, allergen_legend: { CODE: "Label" },
 *     menus: { "Category": { "Subcategory": [ { item, variant, price_eur, allergens } ] } } }
 *
 * This module flattens that into the flat `categories` / `items` arrays the UI
 * (and the Astro content collections) consume. Edit the JSON and everything —
 * sections, sticky nav, routes, search, allergen filters — updates. `allergens`
 * are "contains" codes (what the dish HAS), so filtering EXCLUDES them.
 */

interface RawItem {
  item: string;
  variant?: string | null;
  price_eur?: number | null;
  allergens?: string[];
}

interface RawMenu {
  currency?: string;
  note?: string;
  allergen_legend?: Record<string, string>;
  menus: Record<string, Record<string, RawItem[]>>;
}

export interface MenuCategory {
  slug: string;
  title: string;
  description?: string;
  image?: string;
  image_alt?: string;
  order?: number;
}

export interface MenuItemData {
  id?: string;
  category: string;
  subcategory?: string;
  name: string;
  variant?: string;
  description?: string;
  price?: string;
  image?: string;
  image_alt?: string;
  order?: number;
  locale?: string;
  featured?: boolean;
  /** Allergen codes the item CONTAINS (keys of the allergen legend). */
  allergens?: string[];
}

const raw = rawMenu as unknown as RawMenu;
const LEGEND: Record<string, string> = raw.allergen_legend ?? {};
const CURRENCY_SYMBOL = raw.currency === "EUR" ? "€" : (raw.currency ?? "");

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatPrice(value?: number | null): string | undefined {
  if (value == null) return undefined;
  return `${CURRENCY_SYMBOL}${value.toFixed(2)}`;
}

/** Flatten the authored nested menu into sorted categories + items. */
export function flattenMenu(source: RawMenu = raw): {
  categories: MenuCategory[];
  items: MenuItemData[];
} {
  const categories: MenuCategory[] = [];
  const items: MenuItemData[] = [];
  let n = 0;

  Object.keys(source.menus).forEach((categoryName, ci) => {
    const slug = slugify(categoryName);
    categories.push({ slug, title: categoryName, order: ci + 1 });

    const subcategories = source.menus[categoryName];
    for (const subName of Object.keys(subcategories)) {
      for (const it of subcategories[subName]) {
        n += 1;
        items.push({
          id: `${slug}-${String(n).padStart(3, "0")}`,
          category: slug,
          subcategory: subName,
          name: it.item,
          variant: it.variant ?? undefined,
          price: formatPrice(it.price_eur),
          allergens: it.allergens && it.allergens.length ? it.allergens : undefined,
          order: n,
          locale: "en",
        });
      }
    }
  });

  return { categories, items };
}

const byOrder = (a: { order?: number }, b: { order?: number }) =>
  (a.order ?? 100) - (b.order ?? 100);

export function sortCategories(categories: MenuCategory[]): MenuCategory[] {
  return [...categories].sort(byOrder);
}

export function sortItems(items: MenuItemData[]): MenuItemData[] {
  return [...items].sort(byOrder);
}

/**
 * Group items by `subcategory`, preserving the (pre-sorted) input order.
 * Items without a subcategory fall under `fallbackKey`.
 */
export function groupBySubcategory(
  items: MenuItemData[],
  fallbackKey: string
): Map<string, MenuItemData[]> {
  const groups = new Map<string, MenuItemData[]>();
  for (const item of items) {
    const key = item.subcategory ?? fallbackKey;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }
  return groups;
}

/* ---------- Allergens ---------- */

export function getAllergenLegend(): Record<string, string> {
  return LEGEND;
}

export function allergenLabel(code: string): string {
  return LEGEND[code] ?? code;
}

export function getMenuNote(): string | undefined {
  return raw.note;
}

/** Allergen codes actually present across the given items, in legend order. */
export function presentAllergens(items: MenuItemData[]): string[] {
  const seen = new Set<string>();
  for (const item of items) for (const code of item.allergens ?? []) seen.add(code);
  const known = Object.keys(LEGEND).filter((c) => seen.has(c));
  const extra = [...seen].filter((c) => !(c in LEGEND)).sort();
  return [...known, ...extra];
}

/* ---------- Public accessors ---------- */

/**
 * Read the menu, filtered to one locale and sorted. Safe in client components
 * (e.g. the Navbar) — the JSON is bundled at build time.
 */
export function getMenuData(locale: Locale = "en"): {
  categories: MenuCategory[];
  items: MenuItemData[];
} {
  const { categories, items } = flattenMenu();
  return {
    categories: sortCategories(categories),
    items: sortItems(items.filter((i) => (i.locale ?? "en") === locale)),
  };
}

/** Nav dropdown links for the Menu menu, deep-linking to anchors on /menu. */
export function getCategoryNavLinks(
  locale: Locale = "en"
): { name: string; path: string }[] {
  return getMenuData(locale).categories.map((c) => ({
    name: c.title,
    path: `/menu#${c.slug}`,
  }));
}
