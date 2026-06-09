import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { PageHero } from "../PageHero";
import { ClosingCTA } from "../ClosingCTA";
import { withBase } from "../../utils/url";
import { CalendarDays, Tag } from "lucide-react";
import { eventDateLabel, type EventItem, type PastEventImage } from "../../utils/events";

interface EventsPageProps {
  heroLabel?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: string;
  heroImageAlt?: string;
  introHeading?: string;
  introBody?: string;
  upcoming?: EventItem[];
  past?: EventItem[];
  photos?: PastEventImage[];
  ctaHeading?: string;
  ctaText?: string;
}

function EventMeta({ dateLabel, price, center = false }: { dateLabel?: string; price?: string; center?: boolean }) {
  if (!dateLabel && !price) return null;
  return (
    <div className={`flex flex-wrap items-center gap-2.5 mb-6 ${center ? "justify-center" : ""}`}>
      {dateLabel && (
        <span className="inline-flex items-center gap-2 rounded-full bg-teal-pale border border-border px-3.5 py-1.5 text-[13px] font-medium text-teal-deep">
          <CalendarDays className="w-4 h-4 text-teal-mid" />
          {dateLabel}
        </span>
      )}
      {price && (
        <span className="inline-flex items-center gap-2 rounded-full bg-espresso px-3.5 py-1.5 text-[13px] font-medium text-cream">
          <Tag className="w-3.5 h-3.5 text-brass" />
          {price}
        </span>
      )}
    </div>
  );
}

function UpcomingEvent({ ev, index }: { ev: EventItem; index: number }) {
  const paragraphs = ev.description.split(/\n\s*\n/).filter(Boolean);
  const hasImage = Boolean(ev.image);
  const imageOnLeft = index % 2 === 0;
  const dateLabel = eventDateLabel(ev);

  if (!hasImage) {
    return (
      <FadeIn className="max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-3 mb-5 text-sage justify-center">
          <span className="w-10 rule-brass" />
          <span className="eyebrow">what's on</span>
          <span className="w-10 rule-brass" />
        </span>
        <h2 className="mb-5 font-serif italic text-balance">{ev.name}</h2>
        <EventMeta dateLabel={dateLabel} price={ev.price} center />
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
    );
  }

  return (
    <div className="grid md:grid-cols-12 gap-10 lg:gap-16 items-center">
      <FadeIn direction={imageOnLeft ? "right" : "left"} className={`md:col-span-6 ${imageOnLeft ? "" : "md:order-2"}`}>
        <div className="aspect-[4/3] rounded-[28px] overflow-hidden border border-border/50 shadow-[0_30px_70px_-40px_rgba(23,14,7,0.45)] group">
          <img src={withBase(ev.image!)} alt={ev.image_alt ?? ev.name} className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" loading="lazy" />
        </div>
      </FadeIn>
      <FadeIn delay={0.1} className="md:col-span-6">
        <span className="inline-flex items-center gap-3 mb-5 text-sage">
          <span className="w-10 rule-brass" />
          <span className="eyebrow">what's on</span>
        </span>
        <h2 className="mb-5 font-serif italic text-balance">{ev.name}</h2>
        <EventMeta dateLabel={dateLabel} price={ev.price} />
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
}

function PastEventCard({ ev }: { ev: EventItem }) {
  const dateLabel = eventDateLabel(ev);
  return (
    <article className="group flex flex-col h-full overflow-hidden rounded-2xl border border-border bg-white/70 opacity-90 hover:opacity-100 transition-opacity">
      {ev.image && (
        <div className="aspect-[16/10] overflow-hidden bg-teal-pale">
          <img src={withBase(ev.image)} alt={ev.image_alt ?? ev.name} loading="lazy" className="w-full h-full object-cover saturate-[0.9] transition-transform duration-500 group-hover:scale-[1.04]" />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        {dateLabel && (
          <span className="inline-flex items-center gap-1.5 text-[12px] text-text-muted mb-2">
            <CalendarDays className="w-3.5 h-3.5 text-teal-mid" /> {dateLabel}
          </span>
        )}
        <h3 className="font-serif italic text-teal-deep mb-2">{ev.name}</h3>
        <p className="text-[14px] text-text-muted leading-relaxed line-clamp-2">{ev.description}</p>
      </div>
    </article>
  );
}

export function EventsPage({
  heroLabel = "join us at one of our",
  heroHeading = "Events",
  heroSubheading = "Wine tastings, fiestas, and evenings you won't want to miss.",
  heroImage,
  heroImageAlt,
  introHeading,
  introBody,
  upcoming = [],
  past = [],
  photos = [],
  ctaHeading = "Save your seat.",
  ctaText = "Reserve your spot for our next event - drop us a line or pop in and ask.",
}: EventsPageProps) {
  const hasUpcoming = upcoming.length > 0;
  const hasPast = past.length > 0;
  return (
    <>
      <Navbar transparentOverHero />
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

        {hasUpcoming ? (
          <section className="py-16 md:py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">
              {upcoming.map((ev, i) => (
                <UpcomingEvent key={ev.id ?? ev.name} ev={ev} index={i} />
              ))}
            </div>
          </section>
        ) : (
          <section className="py-16 md:py-24 bg-white">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <FadeIn>
                <h2 className="mb-4 font-serif italic">Nothing on the calendar right now.</h2>
                <p className="text-lg text-text-muted">We're planning the next one - pop in or follow us for the announcement.</p>
              </FadeIn>
            </div>
          </section>
        )}

        {hasPast && (
          <section className="py-20 md:py-24 bg-ivory">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-12">
                <span className="inline-flex items-center gap-3 mb-5 text-sage justify-center">
                  <span className="w-10 rule-brass" />
                  <span className="eyebrow">looking back</span>
                  <span className="w-10 rule-brass" />
                </span>
                <h2 className="mb-4 font-serif italic">Previously at Cafeina</h2>
                <p className="text-lg text-text-muted">Events that have already happened - here's a taste of what you can expect.</p>
              </FadeIn>
              <FadeIn stagger={0.06} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {past.map((ev) => (
                  <PastEventCard key={ev.id ?? ev.name} ev={ev} />
                ))}
              </FadeIn>
            </div>
          </section>
        )}

        {photos.length > 0 && (
          <section className={`py-20 md:py-24 ${hasPast ? "bg-white" : "bg-ivory"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-12">
                <span className="inline-flex items-center gap-3 mb-5 text-sage justify-center">
                  <span className="w-10 rule-brass" />
                  <span className="eyebrow">good times</span>
                  <span className="w-10 rule-brass" />
                </span>
                <h2 className="mb-4 font-serif italic">Pictures from past events</h2>
                <p className="text-lg text-text-muted">A glimpse of the fun - come and make the next one even better.</p>
              </FadeIn>
              <FadeIn stagger={0.05} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((img, i) => (
                  <figure key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-border/50 bg-teal-pale group">
                    <img src={withBase(img.src)} alt={img.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {img.caption && (
                      <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-espresso/85 to-transparent text-white text-xs translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        {img.caption}
                      </figcaption>
                    )}
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
