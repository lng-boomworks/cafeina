import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { LandscapeBanner } from "../LandscapeBanner";
import { withBase } from "../../utils/url";
import { ArrowUpRight } from "lucide-react";

interface MenuCategoryCard {
  title: string;
  slug: string;
  description?: string;
  image?: string;
  image_alt?: string;
}

interface MenuLandingPageProps {
  heroLabel?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroLandscapeImage?: string;
  heroLandscapeImageAlt?: string;
  categories?: MenuCategoryCard[];
  ctaHeading?: string;
  ctaText?: string;
}

export function MenuLandingPage({
  heroLabel = "freshly made with the best ingredients",
  heroHeading = "our menus",
  heroSubheading = "From morning coffee to evening cocktails — every drink and every plate, made with care.",
  heroLandscapeImage,
  heroLandscapeImageAlt,
  categories = [],
  ctaHeading = "Hungry? Thirsty? Both?",
  ctaText = "Come and say hola. Open Mon–Sat 9am, Sun 5pm — till late.",
}: MenuLandingPageProps) {
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
              imageAlt={heroLandscapeImageAlt ?? "Cafeina menu"}
              aspect="wide"
              priority
              parallax
            />
          </section>
        )}

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {categories.map((cat, i) => (
                <FadeIn key={cat.slug} delay={i * 0.08}>
                  <a
                    href={withBase(`/menu/${cat.slug}`)}
                    className="group block h-full bg-cream/40 rounded-[24px] overflow-hidden border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-teal-pale relative">
                      {cat.image ? (
                        <img
                          src={withBase(cat.image)}
                          alt={cat.image_alt ?? cat.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-muted/60">{cat.title}</div>
                      )}
                    </div>
                    <div className="p-7 md:p-8">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-2xl font-serif text-teal-deep">{cat.title}</h3>
                        <ArrowUpRight className="w-5 h-5 text-teal-mid shrink-0 mt-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                      {cat.description && (
                        <p className="text-text-muted leading-relaxed">{cat.description}</p>
                      )}
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-teal-deep text-center px-4">
          <FadeIn className="max-w-3xl mx-auto">
            <h2 className="text-white mb-6 font-serif italic">{ctaHeading}</h2>
            <p className="text-teal-light text-lg mb-10">{ctaText}</p>
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
