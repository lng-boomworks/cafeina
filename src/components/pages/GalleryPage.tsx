import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { LandscapeBanner } from "../LandscapeBanner";
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

export function GalleryPage({
  heroLabel = "inside the café",
  heroHeading = "A peek through the door.",
  heroSubheading = "The café, the coffee, the cakes — and the slow afternoons in between.",
  heroLandscapeImage,
  heroLandscapeImageAlt,
  images = [],
  ctaHeading = "Come and see for yourself.",
  ctaText = "The photos are lovely, but the café is better. Book a table and pop in.",
}: GalleryPageProps) {
  const sorted = [...images].sort((a, b) => (a.order ?? 100) - (b.order ?? 100));
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="bg-cream pt-20 md:pt-28 pb-10 md:pb-14">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <FadeIn>
              <span className="text-sage font-medium uppercase tracking-wide text-sm mb-4 block">{heroLabel}</span>
              <h1 className="mb-6 font-serif italic">{heroHeading}</h1>
              <p className="text-xl text-text-muted">{heroSubheading}</p>
            </FadeIn>
          </div>
        </section>

        {heroLandscapeImage && (
          <section className="bg-cream pb-10 md:pb-14 px-4 sm:px-6 lg:px-8">
            <LandscapeBanner
              image={heroLandscapeImage}
              imageAlt={heroLandscapeImageAlt ?? "Gallery of Cafeina"}
              aspect="wide"
              priority
              parallax
            />
          </section>
        )}

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {sorted.map((img, i) => {
                // Vary heights for a richer masonry feel on desktop
                const spanClass = i % 7 === 0 ? "row-span-2 aspect-square md:aspect-[3/4]" : "aspect-square";
                return (
                  <FadeIn key={img.src} delay={(i % 3) * 0.06}>
                    <figure className={`relative rounded-2xl overflow-hidden border border-border/50 bg-teal-pale group ${spanClass}`}>
                      <img
                        src={withBase(img.src)}
                        alt={img.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      {img.caption && (
                        <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white text-sm translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 bg-teal-deep text-center px-4">
          <FadeIn className="max-w-3xl mx-auto">
            <h2 className="text-white mb-6 font-serif italic">{ctaHeading}</h2>
            <p className="text-teal-light text-lg mb-10">{ctaText}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="white" href="/contact">Find us</Button>
              <Button variant="outline-white" href="/menu">See the menu</Button>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
