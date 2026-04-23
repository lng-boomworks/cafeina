import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { MenuItem } from "../MenuItem";
import { withBase } from "../../utils/url";

export interface MenuItemData {
  name: string;
  description?: string;
  price?: string;
  image?: string;
  image_alt?: string;
  subcategory?: string;
  order?: number;
  featured?: boolean;
}

interface MenuCollectionPageProps {
  categoryTitle: string;          // e.g. "Cocktails"
  heroLabel?: string;              // defaults to "freshly made with the best ingredients"
  heroHeading?: string;            // defaults to "our [categoryTitle]"
  heroSubheading?: string;
  heroImage?: string;
  heroImageAlt?: string;
  intro?: string;
  items: MenuItemData[];
  siblingCategories?: { title: string; slug: string }[];
}

export function MenuCollectionPage({
  categoryTitle,
  heroLabel = "freshly made with the best ingredients",
  heroHeading,
  heroSubheading,
  heroImage,
  heroImageAlt,
  intro,
  items,
  siblingCategories = [],
}: MenuCollectionPageProps) {
  // Group by subcategory (preserving input order). Items without subcategory go under categoryTitle.
  const groups = new Map<string, MenuItemData[]>();
  const sorted = [...items].sort((a, b) => (a.order ?? 100) - (b.order ?? 100));
  for (const item of sorted) {
    const key = item.subcategory ?? categoryTitle;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }

  const heading = heroHeading ?? `our ${categoryTitle.toLowerCase()}`;

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="bg-cream py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-12 gap-10 items-center">
              <FadeIn className="md:col-span-7">
                <span className="text-sage font-medium uppercase tracking-wide text-sm mb-3 block">{heroLabel}</span>
                <h1 className="mb-5 font-serif italic text-balance">{heading}</h1>
                {heroSubheading && (
                  <p className="text-xl text-text-muted mb-6">{heroSubheading}</p>
                )}
                {intro && <p className="text-text-body leading-relaxed">{intro}</p>}
              </FadeIn>
              {heroImage && (
                <FadeIn delay={0.15} className="md:col-span-5">
                  <div className="aspect-[4/5] rounded-[28px] overflow-hidden border border-border shadow-[0_20px_60px_-20px_rgba(68,42,24,0.3)]">
                    <img
                      src={withBase(heroImage)}
                      alt={heroImageAlt ?? categoryTitle}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {items.length === 0 ? (
              <FadeIn className="text-center py-16">
                <p className="text-lg text-text-muted">
                  Our {categoryTitle.toLowerCase()} menu is being updated — pop in and ask us what's on today.
                </p>
              </FadeIn>
            ) : (
              Array.from(groups.entries()).map(([group, groupItems], gi) => (
                <FadeIn key={group} delay={gi * 0.05} className="mb-14">
                  {groups.size > 1 && (
                    <div className="mb-4">
                      <h2 className="text-2xl md:text-3xl font-serif text-teal-deep italic mb-1">{group}</h2>
                      <div className="w-12 h-[2px] bg-teal-mid" />
                    </div>
                  )}
                  <div>
                    {groupItems.map((item, i) => (
                      <MenuItem
                        key={`${group}-${i}-${item.name}`}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                        image_alt={item.image_alt}
                        featured={item.featured}
                      />
                    ))}
                  </div>
                </FadeIn>
              ))
            )}
          </div>
        </section>

        {siblingCategories.length > 0 && (
          <section className="py-16 bg-ivory">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <h3 className="text-center text-2xl font-serif text-teal-deep italic mb-8">Explore more</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {siblingCategories.map((sib) => (
                    <a
                      key={sib.slug}
                      href={withBase(`/menu/${sib.slug}`)}
                      className="px-5 py-2.5 rounded-full bg-white border border-border text-[14px] font-medium text-teal-deep hover:bg-teal-pale hover:border-teal-mid transition-colors"
                    >
                      {sib.title}
                    </a>
                  ))}
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        <section className="py-24 bg-teal-deep text-center px-4">
          <FadeIn className="max-w-3xl mx-auto">
            <h2 className="text-white mb-6 font-serif italic">Come and say hola.</h2>
            <p className="text-teal-light text-lg mb-10">Open Mon–Sat from 9am, Sun from 5pm — table service till late.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="white" href="/contact">Book a table</Button>
              <Button variant="outline-white" href="tel:+34711051358">Call +34 711 05 13 58</Button>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
