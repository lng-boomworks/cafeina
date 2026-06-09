import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, SlidersHorizontal, Info } from "lucide-react";
import { MenuItem } from "./MenuItem";
import { FadeIn } from "./FadeIn";
import {
  groupBySubcategory,
  presentAllergens,
  allergenLabel,
  type MenuCategory,
  type MenuItemData,
} from "../utils/menu";
import { withBase } from "../utils/url";

interface MenuExplorerProps {
  categories: MenuCategory[];
  items: MenuItemData[];
  /** Top-of-menu pricing note (e.g. "All prices include IVA…"). */
  note?: string;
}

// Navbar (72px) + sticky category bar (~58px). Sections clear this when jumped to.
const NAV_OFFSET = 132;

// Stylised printed-menu artwork, used as a faint per-category background watermark.
// Keyed by category slug; extension-less (WebP+JPG). Categories with no entry
// (e.g. cocktails) simply render on the warm paper with no watermark.
const MENU_ART: Record<string, string> = {
  "cold-drinks-beers-wine": "/images/menu/cold-drinks-beers-wine-menu",
  "food-treats": "/images/menu/food-treats-menu",
  "liqueurs-shots": "/images/menu/liqueurs-shots-menu",
  spirits: "/images/menu/spirits-menu",
  "hot-drinks": "/images/menu/hot-drinks-menu",
};

export function MenuExplorer({ categories, items, note }: MenuExplorerProps) {
  const [query, setQuery] = useState("");
  const [exclude, setExclude] = useState<string[]>([]); // allergen codes to avoid
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [active, setActive] = useState<string>(categories[0]?.slug ?? "");

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const programmaticScroll = useRef(false);
  const scrollResetTimer = useRef<ReturnType<typeof setTimeout>>();

  const allergenOptions = useMemo(() => presentAllergens(items), [items]);
  const q = query.trim().toLowerCase();
  const isFiltering = q !== "" || exclude.length > 0 || featuredOnly;
  const hasFeatured = items.some((i) => i.featured);

  const perCategory = useMemo(() => {
    const matches = (it: MenuItemData) => {
      if (featuredOnly && !it.featured) return false;
      // Allergen filter is EXCLUDE: hide anything containing an avoided allergen.
      if (exclude.length && (it.allergens ?? []).some((a) => exclude.includes(a))) return false;
      if (q) {
        const hay = `${it.name} ${it.variant ?? ""} ${it.description ?? ""} ${it.subcategory ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    };
    return categories.map((category) => ({
      category,
      items: items.filter((i) => i.category === category.slug && matches(i)),
    }));
  }, [categories, items, q, exclude, featuredOnly]);

  const total = perCategory.reduce((n, g) => n + g.items.length, 0);
  const visibleSlugs = perCategory.filter((g) => g.items.length > 0).map((g) => g.category.slug);
  const visibleKey = visibleSlugs.join(",");

  // Scrollspy: highlight the section occupying the top band of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (programmaticScroll.current) return;
        const onscreen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const slug = onscreen[0]?.target.getAttribute("data-slug");
        if (slug) setActive(slug);
      },
      { rootMargin: `-${NAV_OFFSET + 8}px 0px -62% 0px`, threshold: 0 }
    );
    for (const slug of visibleSlugs) {
      const el = sectionRefs.current[slug];
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [visibleKey]);

  // Keep the active pill in view within the horizontally scrolling bar.
  useEffect(() => {
    pillRefs.current[active]?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [active]);

  const scrollToCategory = (slug: string) => {
    const el = sectionRefs.current[slug];
    if (!el) return;
    setActive(slug);
    programmaticScroll.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    if (history.replaceState) history.replaceState(null, "", `#${slug}`);
    clearTimeout(scrollResetTimer.current);
    scrollResetTimer.current = setTimeout(() => {
      programmaticScroll.current = false;
    }, 800);
  };

  // Honour an incoming anchor (e.g. /menu#spirits from a redirect or nav link).
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    if (hash && sectionRefs.current[hash]) {
      setTimeout(() => scrollToCategory(hash), 60);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleExclude = (code: string) =>
    setExclude((cur) => (cur.includes(code) ? cur.filter((c) => c !== code) : [...cur, code]));

  const clearAll = () => {
    setQuery("");
    setExclude([]);
    setFeaturedOnly(false);
  };

  return (
    <div>
      {/* Controls — search + allergen filters (scrolls away above the sticky bar) */}
      <section className="bg-white pt-4 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="bg-ivory border border-border rounded-[28px] p-5 sm:p-6 shadow-[0_18px_50px_-30px_rgba(68,42,24,0.35)]">
            <label className="relative block">
              <span className="sr-only">Search the menu</span>
              <Search className="w-5 h-5 text-teal-mid absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dishes, drinks, ingredients…"
                className="w-full rounded-full border border-border bg-white pl-12 pr-11 py-3 text-[15px] text-text-body placeholder:text-text-muted/70 focus:outline-none focus:border-teal-mid focus:ring-2 focus:ring-teal-mid/20 transition"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-text-muted hover:bg-teal-pale hover:text-teal-deep transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </label>

            {(allergenOptions.length > 0 || hasFeatured) && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-wide text-text-muted font-medium mr-1">
                  <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                  Hide
                </span>
                {hasFeatured && (
                  <FilterChip active={featuredOnly} onClick={() => setFeaturedOnly((v) => !v)}>
                    Featured only
                  </FilterChip>
                )}
                {allergenOptions.map((code) => (
                  <FilterChip key={code} active={exclude.includes(code)} onClick={() => toggleExclude(code)}>
                    No {allergenLabel(code)}
                  </FilterChip>
                ))}
                {isFiltering && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="ml-auto inline-flex items-center gap-1 text-[13px] font-medium text-teal-mid hover:text-teal-deep transition"
                  >
                    <X className="w-3.5 h-3.5" /> Clear
                  </button>
                )}
              </div>
            )}

            {(note || allergenOptions.length > 0) && (
              <p className="flex items-start gap-2 text-[12.5px] text-text-muted/90 leading-relaxed mt-4 pt-4 border-t border-border/60">
                <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-teal-mid" aria-hidden="true" />
                <span>
                  {note ? `${note} ` : ""}
                  {allergenOptions.length > 0 &&
                    "Allergen codes show what a dish contains — please tell us about any allergy before ordering."}
                </span>
              </p>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Sticky category bar with scrollspy */}
      <div className="sticky top-[72px] z-40 bg-cream/95 backdrop-blur-md border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Menu categories" className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            {perCategory.map(({ category, items: catItems }) => {
              const empty = catItems.length === 0;
              const isActive = active === category.slug && !empty;
              return (
                <button
                  key={category.slug}
                  ref={(el) => (pillRefs.current[category.slug] = el)}
                  type="button"
                  disabled={empty}
                  onClick={() => scrollToCategory(category.slug)}
                  aria-current={isActive ? "true" : undefined}
                  className={`shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[14px] font-medium transition-colors ${
                    isActive
                      ? "bg-espresso text-cream"
                      : empty
                        ? "bg-white/40 text-text-muted/40 border border-border/50 cursor-not-allowed"
                        : "bg-white text-text-muted border border-border hover:border-teal-mid hover:text-teal-deep"
                  }`}
                >
                  {category.title}
                  <span className={`text-[11px] tabular-nums ${isActive ? "text-cream/70" : "text-text-muted/60"}`}>
                    {catItems.length}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sections — warm paper with a faint per-category menu-art watermark */}
      <div className="bg-ivory grain">
        {total === 0 ? (
          <section className="py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-lg text-text-muted mb-4">
                Nothing matches that search. Try a different term or clear the filters.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 text-teal-mid font-medium hover:text-teal-deep transition"
              >
                <X className="w-4 h-4" /> Clear filters
              </button>
            </div>
          </section>
        ) : (
          perCategory.map(({ category, items: catItems }, ci) => {
            if (catItems.length === 0) return null;
            const groups = groupBySubcategory(catItems, category.title);
            const artBase = MENU_ART[category.slug];
            const side = ci % 2 === 0 ? "right" : "left";
            return (
              <section
                key={category.slug}
                id={category.slug}
                data-slug={category.slug}
                ref={(el) => (sectionRefs.current[category.slug] = el)}
                style={{ scrollMarginTop: `${NAV_OFFSET}px` }}
                className="relative overflow-hidden py-14 md:py-20"
              >
                {artBase && <MenuWatermark base={artBase} side={side} />}
                <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                  <FadeIn className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-serif italic text-teal-deep">{category.title}</h2>
                    {category.description && (
                      <p className="text-text-muted leading-relaxed mt-3 max-w-2xl">{category.description}</p>
                    )}
                    <div className="w-12 h-[2px] bg-teal-mid mt-5" />
                  </FadeIn>

                  {Array.from(groups.entries()).map(([group, groupItems], gi) => (
                    <FadeIn key={group} delay={gi * 0.03} className="mb-10 last:mb-0">
                      {groups.size > 1 && (
                        <h3 className="text-xl md:text-2xl font-serif text-teal-deep/90 italic mb-2">{group}</h3>
                      )}
                      <div>
                        {groupItems.map((item) => (
                          <MenuItem
                            key={item.id ?? `${group}-${item.name}-${item.variant ?? ""}`}
                            name={item.name}
                            variant={item.variant}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                            image_alt={item.image_alt}
                            featured={item.featured}
                            allergens={item.allergens}
                          />
                        ))}
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>
    </div>
  );
}

/**
 * Faint, blurred, multiply-blended menu artwork anchored to one side of a
 * category section and masked toward the reading column, so the illustrations
 * read as ambient parchment texture without disturbing the live menu text.
 */
function MenuWatermark({ base, side }: { base: string; side: "left" | "right" }) {
  const isRight = side === "right";
  const fade = `linear-gradient(to ${isRight ? "left" : "right"}, rgba(0,0,0,0.95), rgba(0,0,0,0.6) 35%, transparent 80%)`;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      <picture>
        <source srcSet={withBase(`${base}.webp`)} type="image/webp" />
        <img
          src={withBase(`${base}.jpg`)}
          alt=""
          className={`absolute top-1/2 -translate-y-1/2 h-[130%] w-auto max-w-none opacity-[0.08] blur-[1.2px] [mix-blend-mode:multiply] ${
            isRight ? "right-0 translate-x-[18%]" : "left-0 -translate-x-[18%]"
          }`}
          style={{ WebkitMaskImage: fade, maskImage: fade }}
        />
      </picture>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium border transition-colors ${
        active
          ? "bg-espresso text-cream border-espresso"
          : "bg-white text-text-muted border-border hover:border-teal-mid hover:text-teal-deep"
      }`}
    >
      {children}
    </button>
  );
}
