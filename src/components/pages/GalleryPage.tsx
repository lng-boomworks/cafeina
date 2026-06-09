import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { PageHero } from "../PageHero";
import { ClosingCTA } from "../ClosingCTA";
import { FadeIn } from "../FadeIn";
import { withBase } from "../../utils/url";

export interface GalleryImageData {
  src: string;
  alt: string;
  caption?: string;
  category?: string;
  order?: number;
}

interface GalleryPageProps {
  heroLabel?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroLandscapeImage?: string;
  heroLandscapeImageAlt?: string;
  images?: GalleryImageData[];
  ctaHeading?: string;
  ctaText?: string;
}

// Curated aspect rhythm so the masonry feels art-directed, not mechanical.
const ASPECTS = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/2]"];

export function GalleryPage({
  heroLabel = "inside the café",
  heroHeading = "A peek through the door.",
  heroSubheading = "The café, the coffee, the cakes - and the slow afternoons in between.",
  heroLandscapeImage,
  heroLandscapeImageAlt,
  images = [],
  ctaHeading = "Come and see for yourself.",
  ctaText = "The photos are lovely, but the café is better. Book a table and pop in.",
}: GalleryPageProps) {
  const sorted = [...images].sort((a, b) => (a.order ?? 100) - (b.order ?? 100));
  return (
    <>
      <Navbar transparentOverHero />
      <main>
        <PageHero
          label={heroLabel}
          heading={heroHeading}
          subheading={heroSubheading}
          image={heroLandscapeImage ?? "/images/hero/gallery-banner"}
          imageAlt={heroLandscapeImageAlt ?? "A warm Cafeina flatlay - drinks, photos and candlelight"}
        />

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn stagger={0.05} className="columns-2 md:columns-3 gap-4 md:gap-5 [column-fill:balance]">
              {sorted.map((img, i) => (
                <figure
                  key={img.src}
                  className={`relative mb-4 md:mb-5 break-inside-avoid rounded-2xl overflow-hidden border border-border/50 bg-teal-pale group ${ASPECTS[i % ASPECTS.length]}`}
                >
                  <img
                    src={withBase(img.src)}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  {img.caption && (
                    <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-espresso/85 to-transparent text-white text-sm translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </FadeIn>
          </div>
        </section>

        <ClosingCTA
          heading={ctaHeading}
          text={ctaText}
          eyebrow="inside the café"
          primary={{ label: "Find us", href: "/contact" }}
          secondary={{ label: "See the menu", href: "/menu" }}
        />
      </main>
      <Footer />
    </>
  );
}
