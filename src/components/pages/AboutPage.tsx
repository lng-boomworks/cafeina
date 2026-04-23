import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { LandscapeBanner } from "../LandscapeBanner";
import { withBase } from "../../utils/url";
import { Leaf, Coffee, Utensils, Heart } from "lucide-react";

interface ValueItem {
  title: string;
  body: string;
  icon?: string;
}

interface AboutPageProps {
  heroLabel?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: string;
  heroImageAlt?: string;
  storyHeading?: string;
  storyBody?: string;
  storyImage?: string;
  storyImageAlt?: string;
  spaceHeading?: string;
  spaceBody?: string;
  spaceImage?: string;
  spaceImageAlt?: string;
  values?: ValueItem[];
  ctaHeading?: string;
  ctaText?: string;
}

const valueIcons = [Leaf, Heart, Coffee, Utensils];

export function AboutPage({
  heroLabel = "a family tradition",
  heroHeading = "serving with love",
  heroSubheading = "since 2009",
  heroImage,
  heroImageAlt,
  storyHeading = "our story",
  storyBody = "",
  storyImage,
  storyImageAlt,
  spaceHeading,
  spaceBody,
  spaceImage,
  spaceImageAlt,
  values = [],
  ctaHeading = "Come be part of the story.",
  ctaText = "A coffee, a cake, an afternoon tea. Whatever the visit, we're glad you're here.",
}: AboutPageProps) {
  const storyParagraphs = storyBody.split(/\n\s*\n/).filter(Boolean);
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="bg-cream py-20 md:py-28 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-12 gap-10 lg:gap-16 items-center">
              <FadeIn className="md:col-span-7 text-center md:text-left">
                <span className="text-sage font-medium uppercase tracking-wide text-sm mb-4 block">{heroLabel}</span>
                <h1 className="mb-2 font-serif italic">{heroHeading}</h1>
                <p className="text-2xl md:text-3xl text-teal-deep/70 font-serif italic">{heroSubheading}</p>
              </FadeIn>
              {heroImage && (
                <FadeIn delay={0.15} className="md:col-span-5">
                  <div className="aspect-[4/5] rounded-[28px] overflow-hidden border border-border shadow-[0_20px_60px_-20px_rgba(68,42,24,0.3)]">
                    <img
                      src={withBase(heroImage)}
                      alt={heroImageAlt ?? "Cafeina"}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <FadeIn className="lg:col-span-5">
                {storyImage ? (
                  <div className="aspect-square md:aspect-[4/5] rounded-[24px] overflow-hidden border border-border/50">
                    <img
                      src={withBase(storyImage)}
                      alt={storyImageAlt ?? "Our team"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="aspect-square md:aspect-[4/5] rounded-[24px] bg-teal-pale border border-border/50" />
                )}
              </FadeIn>
              <FadeIn delay={0.15} className="lg:col-span-7">
                <h2 className="mb-8 font-serif italic">{storyHeading}</h2>
                <div className="space-y-6 text-[17px] text-text-body leading-[1.8]">
                  {storyParagraphs.map((para, i) => (
                    <p key={i}>{para.trim()}</p>
                  ))}
                </div>
                <p className="font-serif italic text-teal-deep mt-8">— Millie & Callum</p>
              </FadeIn>
            </div>
          </div>
        </section>

        {spaceImage && (
          <section className="py-12 md:py-16 bg-white">
            <div className="px-4 sm:px-6 lg:px-8">
              <LandscapeBanner
                image={spaceImage}
                imageAlt={spaceImageAlt ?? spaceHeading ?? "Cafeina interior"}
                aspect="banner"
                parallax
              />
              {(spaceHeading || spaceBody) && (
                <FadeIn className="max-w-3xl mx-auto text-center mt-10 md:mt-12">
                  {spaceHeading && (
                    <h2 className="mb-4 font-serif italic">{spaceHeading}</h2>
                  )}
                  {spaceBody && (
                    <p className="text-lg text-text-muted leading-relaxed">{spaceBody}</p>
                  )}
                </FadeIn>
              )}
            </div>
          </section>
        )}

        {values.length > 0 && (
          <section className="py-20 md:py-24 bg-ivory">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-14">
                <h2 className="mb-4 font-serif italic">What we stand for</h2>
                <p className="text-lg text-text-muted">The values that guide every visit.</p>
              </FadeIn>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, i) => {
                  const Icon = valueIcons[i % valueIcons.length];
                  return (
                    <FadeIn key={value.title} delay={i * 0.08}>
                      <div className="bg-white p-8 rounded-2xl border border-border h-full hover:shadow-md transition-shadow">
                        <Icon className="w-7 h-7 text-teal-mid mb-5" strokeWidth={1.5} />
                        <h3 className="text-xl mb-3 font-serif">{value.title}</h3>
                        <p className="text-text-muted leading-relaxed">{value.body}</p>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
              <FadeIn className="text-center mt-12">
                <Button variant="ghost" href="/team">Meet the team</Button>
              </FadeIn>
            </div>
          </section>
        )}

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
