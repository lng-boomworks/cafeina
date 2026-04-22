import { FadeIn } from "../FadeIn";
import { withBase } from "../../utils/url";
import { Coffee, Cookie, GlassWater, Sparkles, ArrowRight } from "lucide-react";

const offers = [
  {
    icon: Coffee,
    title: "Coffee & tea",
    desc: "Proper coffee, loose-leaf teas, and a full beverage list — from a quick espresso to a slow afternoon in.",
    link: "/services",
  },
  {
    icon: Cookie,
    title: "Homemade cakes",
    desc: "Baked in-house and rotated through the week. Classics like lemon drizzle alongside seasonal specials.",
    link: "/services",
  },
  {
    icon: Sparkles,
    title: "Afternoon tea",
    desc: "The full spread — scones, clotted cream, finger sandwiches, and a sparkling cava upgrade if you fancy it.",
    link: "/services",
    featured: true,
  },
  {
    icon: GlassWater,
    title: "Craft cocktails",
    desc: "Freshly made with the best ingredients. Negronis, passion fruit martinis, and a rotating cocktail of the week.",
    link: "/services",
  },
];

export function Services() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-mid font-medium uppercase tracking-wide text-sm mb-4 block">What we serve</span>
          <h2 className="mb-6">Morning coffee to evening cocktails.</h2>
          <p className="text-lg text-text-muted">
            A full day's offer in one cozy spot — from the first coffee of the morning to a proper afternoon tea and a craft cocktail after sundown.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <a href={withBase(offer.link)} className="block h-full group">
                <div className={`h-full p-8 rounded-2xl border transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg ${
                  offer.featured
                    ? "bg-teal-deep border-teal-deep text-white shadow-md"
                    : "bg-white border-border hover:border-teal-mid"
                }`}>
                  <offer.icon className={`w-8 h-8 mb-6 ${offer.featured ? "text-teal-light" : "text-teal-deep"}`} strokeWidth={1.5} />
                  <h3 className={`text-xl mb-3 ${offer.featured ? "text-white" : ""}`}>{offer.title}</h3>
                  <p className={`mb-6 leading-relaxed ${offer.featured ? "text-teal-light" : "text-text-muted"}`}>{offer.desc}</p>
                  <span className={`inline-flex items-center text-sm font-medium group-hover:underline underline-offset-4 ${offer.featured ? "text-white" : "text-teal-mid"}`}>
                    See the menu <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
