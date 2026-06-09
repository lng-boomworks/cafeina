import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { PageHero } from "../PageHero";
import { ClosingCTA } from "../ClosingCTA";
import { withBase } from "../../utils/url";

export interface EventData {
  title: string;
  body: string;
  image?: string;
  image_alt?: string;
  cta_text?: string;
  cta_url?: string;
  order?: number;
}

export interface EventGalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface EventsPageProps {
  heroLabel?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: string;
  heroImageAlt?: string;
  introHeading?: string;
  introBody?: string;
  events?: EventData[];
  pastEvents?: EventGalleryImage[];
  ctaHeading?: string;
  ctaText?: string;
}

export function EventsPage({
  heroLabel = "join us at one of our",
  heroHeading = "Events",
  heroSubheading = "Wine tastings, fiestas, and evenings you won't want to miss.",
  heroImage,
  heroImageAlt,
  introHeading,
  introBody,
  events = [],
  pastEvents = [],
  ctaHeading = "Save your seat.",
  ctaText = "Reserve your spot for our next event — drop us a line or pop in and ask.",
}: EventsPageProps) {
  const sorted = [...events].sort((a, b) => (a.order ?? 100) - (b.order ?? 100));
  return (
    <>
      <Navbar />
      <main>
        <PageHero label={heroLabel} heading={heroHeading} subheading={heroSubheading} image={heroImage} imageAlt={heroImageAlt} />

        {(introHeading || introBody) && (
          <section className="py-14 bg-white">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <FadeIn>
                {introHeading && <h2 className="mb-4 font-serif italic">{introHeading}</h2>}
                {introBody && <p className="text-lg text-text-muted leading-relaxed">{introBody}</p>}
              </FadeIn>
            </div>
          </section>
        )}

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">
            {sorted.map((ev, i) => {
              const paragraphs = ev.body.split(/\n\s*\n/).filter(Boolean);
              const imageOnLeft = i % 2 === 0;
              return (
                <div key={ev.title} className="grid md:grid-cols-12 gap-10 lg:gap-16 items-center">
                  <FadeIn direction={imageOnLeft ? "right" : "left"} className={`md:col-span-6 ${imageOnLeft ? "" : "md:order-2"}`}>
                    <div className="aspect-[4/3] rounded-[28px] overflow-hidden border border-border/50 shadow-[0_30px_70px_-40px_rgba(23,14,7,0.45)] group">
                      {ev.image ? (
                        <img src={withBase(ev.image)} alt={ev.image_alt ?? ev.title} className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" loading="lazy" />
                      ) : (
                        <div className="w-full h-full bg-teal-pale" />
                      )}
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.1} className="md:col-span-6">
                    <span className="inline-flex items-center gap-3 mb-5 text-sage">
                      <span className="w-10 rule-brass" />
                      <span className="eyebrow">what's on</span>
                    </span>
                    <h2 className="mb-6 font-serif italic text-balance">{ev.title}</h2>
                    <div className="space-y-4 text-[17px] text-text-body leading-[1.8]">
                      {paragraphs.map((p, j) => (
                        <p key={j}>{p.trim()}</p>
                      ))}
                    </div>
                    {ev.cta_text && ev.cta_url && (
                      <div className="mt-8">
                        <Button href={ev.cta_url}>{ev.cta_text}</Button>
                      </div>
                    )}
                  </FadeIn>
                </div>
              );
            })}
          </div>
        </section>

        {pastEvents.length > 0 && (
          <section className="py-20 md:py-24 bg-ivory">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-12">
                <span className="inline-flex items-center gap-3 mb-5 text-sage justify-center">
                  <span className="w-10 rule-brass" />
                  <span className="eyebrow">good times</span>
                  <span className="w-10 rule-brass" />
                </span>
                <h2 className="mb-4 font-serif italic">Pictures from past events</h2>
                <p className="text-lg text-text-muted">A glimpse of the fun — come and make the next one even better.</p>
              </FadeIn>
              <FadeIn stagger={0.05} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pastEvents.map((img, i) => (
                  <figure key={i} className="aspect-square rounded-2xl overflow-hidden border border-border/50 bg-teal-pale group">
                    <img src={withBase(img.src)} alt={img.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </figure>
                ))}
              </FadeIn>
            </div>
          </section>
        )}

        <ClosingCTA
          heading={ctaHeading}
          text={ctaText}
          eyebrow="events at cafeina"
          primary={{ label: "Book your spot", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  );
}
