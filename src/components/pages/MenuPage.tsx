import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { PageHero } from "../PageHero";
import { ClosingCTA } from "../ClosingCTA";
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
  heroHeading = "Our menu",
  heroSubheading = "From morning coffee to evening cocktails — every drink and every plate, made with care.",
  heroLandscapeImage,
  heroLandscapeImageAlt,
  categories,
  items,
  note,
  ctaHeading = "Hungry? Thirsty? Both?",
  ctaText = "Come and say hola. Open Mon–Sat from 9am, Sun from 5pm — till late.",
}: MenuPageProps) {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label={heroLabel}
          heading={heroHeading}
          subheading={heroSubheading}
          image={heroLandscapeImage ?? "/images/hero/menu-banner"}
          imageAlt={heroLandscapeImageAlt ?? "Cocktails and drinks on the bar at Cafeina"}
        />

        <MenuExplorer categories={categories} items={items} note={note} />

        <ClosingCTA heading={ctaHeading} text={ctaText} eyebrow="freshly made · till late" />
      </main>
      <Footer />
    </>
  );
}
