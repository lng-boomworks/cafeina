import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { withBase } from "../../utils/url";
import { ArrowRight } from "lucide-react";

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
  heroHeading = "events",
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
      <main className="pt-[72px]">
        <section className="bg-cream py-20 md:py-28 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-12 gap-10 items-center">
              <FadeIn className="md:col-span-7 text-center md:text-left">
                <span className="text-sage font-medium uppercase tracking-wide text-sm mb-3 block">{heroLabel}</span>
                <h1 className="mb-4 font-serif italic text-balance">{heroHeading}</h1>
                <p className="text-xl text-text-muted">{heroSubheading}</p>
              </FadeIn>
              {heroImage && (
                <FadeIn delay={0.15} className="md:col-span-5">
                  <div className="aspect-[4/5] rounded-[28px] overflow-hidden border border-border shadow-[0_20px_60px_-20px_rgba(68,42,24,0.3)]">
                    <img
                      src={withBase(heroImage)}
                      alt={heroImageAlt ?? "Events at Cafeina"}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </section>

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

        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">
            {sorted.map((ev, i) => {
              const paragraphs = ev.body.split(/\n\s*\n/).filter(Boolean);
              const imageOnLeft = i % 2 === 0;
              return (
                <div
                  key={ev.title}
                  className={`grid md:grid-cols-12 gap-10 lg:gap-16 items-center`}
                >
                  <FadeIn
                    delay={0}
                    direction={imageOnLeft ? "right" : "left"}
                    className={`md:col-span-6 ${imageOnLeft ? "" : "md:order-2"}`}
                  >
                    <div className="aspect-[4/3] rounded-[28px] overflow-hidden border border-border/50">
                      {ev.image ? (
                        <img
                          src={withBase(ev.image)}
                          alt={ev.image_alt ?? ev.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-teal-pale" />
                      )}
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.1} className="md:col-span-6">
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
          <section className="py-20 bg-ivory">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-12">
                <h2 className="mb-4 font-serif italic">Pictures from past events</h2>
                <p className="text-lg text-text-muted">A glimpse of the fun — come and make the next one even better.</p>
              </FadeIn>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pastEvents.map((img, i) => (
                  <FadeIn key={i} delay={(i % 4) * 0.05}>
                    <figure className="aspect-square rounded-2xl overflow-hidden border border-border/50 bg-teal-pale group">
                      <img
                        src={withBase(img.src)}
                        alt={img.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </figure>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-24 bg-teal-deep text-center px-4">
          <FadeIn className="max-w-3xl mx-auto">
            <h2 className="text-white mb-6 font-serif italic">{ctaHeading}</h2>
            <p className="text-teal-light text-lg mb-10">{ctaText}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="white" href="/contact">
                Book your spot <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline-white" href="tel:+34711051358">Call +34 711 05 13 58</Button>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
