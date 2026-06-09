import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { HomeHero } from "./HomeHero";
import { StoryBand } from "./StoryBand";
import { Services } from "./Services";
import { TasteSplit } from "./TasteSplit";
import { FeaturedProduct } from "./FeaturedProduct";
import { SenseOfPlace } from "./SenseOfPlace";
import { FinalCTA } from "./FinalCTA";
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
      <Navbar transparentOverHero />
      <main>
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
        />

        <StoryBand
          eyebrow={props.welcomeSubheading}
          heading={props.interiorHeading ?? props.welcomeHeading}
          body={props.welcomeBody}
          subbody={props.interiorSubheading}
          image={props.interiorImage}
          imageAlt={props.interiorImageAlt}
        />

        <Services offerings={props.offerings} />

        <TasteSplit />

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

        <SenseOfPlace />

        {props.testimonials && props.testimonials.length > 0 && (
          <Testimonials items={props.testimonials} />
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
