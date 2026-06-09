import { FadeIn } from "../FadeIn";
import { Button } from "../Button";

interface Offering {
  title: string;
  body: string;
  image?: string;
  image_alt?: string;
}

interface ServicesProps {
  heading?: string;
  eyebrow?: string;
  body?: string;
  offerings?: Offering[];
}

const defaultOfferings: Offering[] = [
  { title: "Fresh Cakes", body: "Baked in-house daily — lemon drizzle, Victoria sponge, carrot cake, and rotating seasonal bakes at the counter." },
  { title: "Savouries", body: "Handcrafted sausage rolls, toasties and more, where tradition meets gourmet — made with locally-sourced ingredients." },
  { title: "Craft Cocktails", body: "From a properly stirred Negroni to a new signature each week — the bar comes alive after sundown." },
];

export function Services({
  heading = "A full day in one cozy spot",
  eyebrow = "Morning coffee to evening cocktails",
  body = "From the first flat white of the day to a proper afternoon tea and a craft cocktail after dark — table service throughout.",
  offerings = defaultOfferings,
}: ServicesProps) {
  return (
    <section className="py-20 md:py-28 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Sticky-ish intro */}
          <FadeIn className="lg:col-span-4">
            <span className="inline-flex items-center gap-3 mb-5 text-sage">
              <span className="w-10 rule-brass" />
              <span className="eyebrow">{eyebrow}</span>
            </span>
            <h2 className="font-serif italic text-balance mb-6">{heading}</h2>
            <p className="text-lg text-text-muted leading-relaxed mb-8">{body}</p>
            <Button variant="ghost" href="/menu">Explore the full menu</Button>
          </FadeIn>

          {/* Editorial list */}
          <FadeIn stagger={0.12} className="lg:col-span-8 lg:pt-2">
            {offerings.map((offer, i) => (
              <article
                key={offer.title}
                className="group grid grid-cols-[auto_1fr] gap-6 md:gap-10 py-8 border-t border-border first:border-t-0 lg:first:border-t transition-transform duration-300 hover:translate-x-1"
              >
                <span className="font-serif italic text-brass/70 text-3xl md:text-4xl leading-none tabular-nums pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-teal-deep mb-2 group-hover:text-teal-mid transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed max-w-xl">{offer.body}</p>
                </div>
              </article>
            ))}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
