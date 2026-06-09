import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { LandscapeBanner } from "../LandscapeBanner";
import { withBase } from "../../utils/url";
import type { TeamMember } from "../../utils/team";

interface TeamPageProps {
  heroLabel?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroLandscapeImage?: string;
  heroLandscapeImageAlt?: string;
  introHeading?: string;
  introBody?: string;
  members?: TeamMember[];
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {(introHeading || introBody) && (
              <FadeIn className="max-w-2xl mx-auto text-center mb-14 md:mb-20">
                {introHeading && <h2 className="mb-4 font-serif italic">{introHeading}</h2>}
                {introBody && <p className="text-lg text-text-muted leading-relaxed">{introBody}</p>}
              </FadeIn>
            )}

            <div className="flex flex-wrap justify-center gap-8 md:gap-10">
              {sorted.map((member, i) => (
                <FadeIn
                  key={member.id ?? member.name}
                  delay={i * 0.1}
                  className="w-full sm:w-[340px] max-w-[380px]"
                >
                  <TeamCard member={member} />
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

function TeamCard({ member }: { member: TeamMember }) {
  const initial = member.name.trim().charAt(0).toUpperCase();
  return (
    <article className="group h-full flex flex-col bg-cream/40 rounded-[28px] border border-border overflow-hidden shadow-[0_18px_50px_-30px_rgba(68,42,24,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-28px_rgba(68,42,24,0.45)]">
      <div className="aspect-[4/5] overflow-hidden bg-teal-pale relative">
        {member.photo ? (
          <img
            src={withBase(member.photo)}
            alt={member.photo_alt ?? member.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center font-serif text-teal-deep/35 select-none"
            aria-hidden="true"
            style={{ fontSize: "clamp(72px, 18vw, 120px)" }}
          >
            {initial}
          </div>
        )}
      </div>
      <div className="p-7 md:p-8 flex flex-col flex-1">
        <h3 className="text-2xl font-serif text-teal-deep leading-tight">{member.name}</h3>
        {member.role && (
          <p className="text-[13px] uppercase tracking-wide text-teal-mid font-medium mt-1.5">{member.role}</p>
        )}
        {member.tagline && (
          <p className="font-serif italic text-text-muted mt-3 leading-snug">“{member.tagline}”</p>
        )}
        {member.bio && (
          <p className="text-[15px] text-text-muted leading-relaxed mt-4">{member.bio}</p>
        )}
      </div>
    </article>
  );
}
