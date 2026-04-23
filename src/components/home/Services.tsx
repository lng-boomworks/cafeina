import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { withBase } from "../../utils/url";

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
  {
    title: "Fresh Cakes",
    body: "Baked in-house daily — classics like lemon drizzle, Victoria sponge and carrot cake, alongside rotating seasonal bakes at the counter.",
  },
  {
    title: "Savouries",
    body: "Savour the flavours of our handcrafted savouries, where tradition meets gourmet excellence — sausage rolls and more, made with locally-sourced ingredients.",
  },
  {
    title: "Take-away",
    body: "Elevate your on-the-go experience with our premium take-away service — a seamless blend of convenience and delight.",
  },
];

export function Services({
  heading = "Explore our offerings",
  eyebrow = "Fresh cakes & snacks daily",
  body = "From the first coffee of the morning to a proper afternoon tea and a craft cocktail after sundown — a full day's offer in one cozy spot.",
  offerings = defaultOfferings,
}: ServicesProps) {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-3xl mx-auto mb-16 text-center">
          <span className="text-teal-mid font-medium uppercase tracking-wide text-sm mb-4 block">{eyebrow}</span>
          <h2 className="mb-6 font-serif italic">{heading}</h2>
          <p className="text-lg text-text-muted">{body}</p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {offerings.map((offer, i) => (
            <FadeIn key={offer.title} delay={i * 0.1}>
              <article className="group h-full bg-cream/40 rounded-[24px] border border-border overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden bg-teal-pale">
                  {offer.image ? (
                    <img
                      src={withBase(offer.image)}
                      alt={offer.image_alt ?? offer.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted/60 text-sm">
                      {offer.title}
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <h3 className="text-2xl mb-3 font-serif">{offer.title}</h3>
                  <p className="text-text-muted leading-relaxed">{offer.body}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-14">
          <Button variant="ghost" href="/menu">Explore the full menu</Button>
        </FadeIn>
      </div>
    </section>
  );
}
