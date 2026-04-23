import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { HomeHero } from "./HomeHero";
import { Services } from "./Services";
import { FeaturedProduct } from "./FeaturedProduct";
import { FinalCTA } from "./FinalCTA";
import { LandscapeBanner } from "../LandscapeBanner";
import { Testimonials, type TestimonialData } from "./Testimonials";

interface Offering {
  title: string;
  body: string;
  image?: string;
  image_alt?: string;
}

interface FeaturedProductData {
  label?: string;
  heading: string;
  subheading?: string;
  body: string;
  image?: string;
  image_alt?: string;
  cta_text?: string;
  cta_url?: string;
}

interface HomePageProps {
  heroLabel?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroCtaText?: string;
  heroCtaUrl?: string;
  heroButtonText?: string;
  heroButtonUrl?: string;
  loyaltyText?: string;
  loyaltyCtaText?: string;
  loyaltyCtaUrl?: string;

  interiorImage?: string;
  interiorImageAlt?: string;
  interiorHeading?: string;
  interiorSubheading?: string;

  welcomeHeading?: string;
  welcomeSubheading?: string;
  welcomeBody?: string;
  offerings?: Offering[];

  testimonials?: TestimonialData[];

  featuredProduct?: FeaturedProductData;

  ctaHeading?: string;
  ctaText?: string;
  finalCtaImage?: string;
  finalCtaImageAlt?: string;
}

export function HomePage(props: HomePageProps) {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <HomeHero
          label={props.heroLabel}
          heading={props.heroHeading}
          subheading={props.heroSubheading}
          image={props.heroImage}
          imageAlt={props.heroImageAlt}
          ctaText={props.heroCtaText}
          ctaUrl={props.heroCtaUrl}
          buttonText={props.heroButtonText}
          buttonUrl={props.heroButtonUrl}
          loyaltyText={props.loyaltyText}
          loyaltyCtaText={props.loyaltyCtaText}
          loyaltyCtaUrl={props.loyaltyCtaUrl}
        />
        {props.interiorImage && (
          <section className="bg-cream pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
            <LandscapeBanner
              image={props.interiorImage}
              imageAlt={props.interiorImageAlt ?? "Inside Cafeina"}
              aspect="banner"
              parallax
              overlay={props.interiorHeading ? "dark" : "none"}
              label={props.interiorHeading ? "our space" : undefined}
              heading={props.interiorHeading}
              subheading={props.interiorSubheading}
            />
          </section>
        )}
        <Services
          heading={props.welcomeHeading}
          eyebrow={props.welcomeSubheading}
          body={props.welcomeBody}
          offerings={props.offerings}
        />
        {props.testimonials && props.testimonials.length > 0 && (
          <Testimonials items={props.testimonials} />
        )}
        {props.featuredProduct && (
          <FeaturedProduct
            label={props.featuredProduct.label}
            heading={props.featuredProduct.heading}
            subheading={props.featuredProduct.subheading}
            body={props.featuredProduct.body}
            image={props.featuredProduct.image}
            imageAlt={props.featuredProduct.image_alt}
            ctaText={props.featuredProduct.cta_text}
            ctaUrl={props.featuredProduct.cta_url}
          />
        )}
        <FinalCTA
          heading={props.ctaHeading}
          text={props.ctaText}
          bgImage={props.finalCtaImage}
          bgImageAlt={props.finalCtaImageAlt}
        />
      </main>
      <Footer />
    </>
  );
}
