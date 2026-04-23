import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { LandscapeBanner } from "../LandscapeBanner";
import { withBase } from "../../utils/url";

export interface TeamMemberData {
  name: string;
  role?: string;
  bio: string;
  photo?: string;
  photo_alt?: string;
  order?: number;
  placeholder?: boolean;
}

interface TeamPageProps {
  heroLabel?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroLandscapeImage?: string;
  heroLandscapeImageAlt?: string;
  introHeading?: string;
  introBody?: string;
  members?: TeamMemberData[];
  ctaHeading?: string;
  ctaText?: string;
}

export function TeamPage({
  heroLabel = "the people behind the café",
  heroHeading = "Meet the family",
  heroSubheading = "Millie, Callum and the team who keep Cafeina running.",
  heroLandscapeImage,
  heroLandscapeImageAlt,
  introHeading,
  introBody,
  members = [],
  ctaHeading = "Come and meet us.",
  ctaText = "Open Mon–Sat from 9am, Sun from 5pm. Table service, homemade cakes, and a warm welcome.",
}: TeamPageProps) {
  const sorted = [...members].sort((a, b) => (a.order ?? 100) - (b.order ?? 100));
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
              imageAlt={heroLandscapeImageAlt ?? "The Cafeina team at work"}
              aspect="wide"
              priority
              parallax
            />
          </section>
        )}

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {(introHeading || introBody) && (
              <FadeIn className="max-w-2xl mx-auto text-center mb-16">
                {introHeading && <h2 className="mb-4 font-serif italic">{introHeading}</h2>}
                {introBody && <p className="text-lg text-text-muted leading-relaxed">{introBody}</p>}
              </FadeIn>
            )}

            <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
              {sorted.map((member, i) => (
                <FadeIn key={member.name} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="aspect-square rounded-[24px] overflow-hidden border border-border/50 mb-6 bg-teal-pale">
                      {member.photo && !member.placeholder ? (
                        <img
                          src={withBase(member.photo)}
                          alt={member.photo_alt ?? member.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : member.photo ? (
                        <img
                          src={withBase(member.photo)}
                          alt={member.photo_alt ?? member.name}
                          className="w-full h-full object-cover opacity-70"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-muted/60 text-sm">
                          {member.photo_alt ?? member.name}
                        </div>
                      )}
                    </div>
                    <h3 className="text-2xl mb-1 font-serif">{member.name}</h3>
                    {member.role && <p className="text-teal-mid font-medium mb-4">{member.role}</p>}
                    <p className="text-text-muted leading-relaxed">{member.bio}</p>
                  </div>
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
