import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { PageHero } from "../PageHero";
import { ClosingCTA } from "../ClosingCTA";
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
  heroSubheading = "Family-run in La Marina since 2009 — and now doubling in size.",
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
      <main>
        <PageHero label={heroLabel} heading={heroHeading} subheading={heroSubheading} image={heroImage} imageAlt={heroImageAlt} />

        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <FadeIn className="lg:col-span-5">
                {storyImage ? (
                  <div className="aspect-square md:aspect-[4/5] rounded-[24px] overflow-hidden border border-border/50 shadow-[0_30px_70px_-40px_rgba(23,14,7,0.45)]">
                    <img src={withBase(storyImage)} alt={storyImageAlt ?? "Our team"} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ) : (
                  <div className="aspect-square md:aspect-[4/5] rounded-[24px] bg-teal-pale border border-border/50" />
                )}
              </FadeIn>
              <FadeIn delay={0.15} className="lg:col-span-7">
                <span className="inline-flex items-center gap-3 mb-5 text-sage">
                  <span className="w-10 rule-brass" />
                  <span className="eyebrow">{storyHeading}</span>
                </span>
                <h2 className="font-serif italic mb-8">Fifteen years of slow cups</h2>
                <div className="space-y-6 text-[17px] text-text-body leading-[1.8]">
                  {storyParagraphs.map((para, i) => (
                    <p key={i}>{para.trim()}</p>
                  ))}
                </div>
                <p className="font-serif italic text-teal-mid text-2xl mt-8">— Millie &amp; Callum</p>
              </FadeIn>
            </div>
          </div>
        </section>

        {spaceImage && (
          <section className="py-12 md:py-16 bg-white">
            <div className="px-4 sm:px-6 lg:px-8">
              <LandscapeBanner image={spaceImage} imageAlt={spaceImageAlt ?? spaceHeading ?? "Cafeina interior"} aspect="banner" parallax />
              {(spaceHeading || spaceBody) && (
                <FadeIn className="max-w-3xl mx-auto text-center mt-10 md:mt-12">
                  {spaceHeading && <h2 className="mb-4 font-serif italic">{spaceHeading}</h2>}
                  {spaceBody && <p className="text-lg text-text-muted leading-relaxed">{spaceBody}</p>}
                </FadeIn>
              )}
            </div>
          </section>
        )}

        {values.length > 0 && (
          <section className="py-20 md:py-28 bg-ivory">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-14">
                <span className="inline-flex items-center gap-3 mb-5 text-sage justify-center">
                  <span className="w-10 rule-brass" />
                  <span className="eyebrow">what we stand for</span>
                  <span className="w-10 rule-brass" />
                </span>
                <h2 className="font-serif italic">The values behind every visit</h2>
              </FadeIn>
              <FadeIn stagger={0.08} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, i) => {
                  const Icon = valueIcons[i % valueIcons.length];
                  return (
                    <div key={value.title} className="bg-white p-8 rounded-[20px] border border-border h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(23,14,7,0.4)]">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-pale mb-5">
                        <Icon className="w-6 h-6 text-teal-mid" strokeWidth={1.5} />
                      </span>
                      <h3 className="text-xl mb-3 font-serif">{value.title}</h3>
                      <p className="text-text-muted leading-relaxed">{value.body}</p>
                    </div>
                  );
                })}
              </FadeIn>
              <FadeIn className="text-center mt-12">
                <Button variant="ghost" href="/team">Meet the team</Button>
              </FadeIn>
            </div>
          </section>
        )}

        <ClosingCTA heading={ctaHeading} text={ctaText} eyebrow="a family tradition" />
      </main>
      <Footer />
    </>
  );
}
