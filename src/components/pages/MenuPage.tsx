import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { LandscapeBanner } from "../LandscapeBanner";
import { MenuExplorer } from "../MenuExplorer";
import type { MenuCategory, MenuItemData } from "../../utils/menu";

interface MenuPageProps {
  heroLabel?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroLandscapeImage?: string;
  heroLandscapeImageAlt?: string;
  categories: MenuCategory[];
  items: MenuItemData[];
  note?: string;
  ctaHeading?: string;
  ctaText?: string;
}

export function MenuPage({
  heroLabel = "freshly made with the best ingredients",
  heroHeading = "our menu",
  heroSubheading = "From morning coffee to evening cocktails — every drink and every plate, made with care.",
  heroLandscapeImage,
  heroLandscapeImageAlt,
  categories,
  items,
  note,
  ctaHeading = "Hungry? Thirsty? Both?",
  ctaText = "Come and say hola. Open Mon–Sat 9am, Sun 5pm — till late.",
}: MenuPageProps) {
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

        <MenuExplorer categories={categories} items={items} note={note} />

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
