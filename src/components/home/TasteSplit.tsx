import { FadeIn } from "../FadeIn";
import { withBase } from "../../utils/url";
import { ArrowUpRight } from "lucide-react";

interface Panel {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  href: string;
  tone: "day" | "night";
}

const PANELS: Panel[] = [
  {
    eyebrow: "By day",
    title: "Coffee, tea & cakes",
    body: "Slow mornings, proper afternoon tea and cakes baked in-house — brought to your table.",
    image: "/images/menu/beverages/coffee-art.jpg",
    imageAlt: "Latte art at Cafeina",
    href: "/menu",
    tone: "day",
  },
  {
    eyebrow: "By night",
    title: "Craft cocktails & spirits",
    body: "The best little bar on the urbanisation — signatures, classics, and a shelf worth exploring.",
    image: "/images/menu/spirits/gin-and-tonic.jpg",
    imageAlt: "A craft gin and tonic at Cafeina",
    href: "/menu/cocktails",
    tone: "night",
  },
];

export function TasteSplit() {
  return (
    <section className="grid md:grid-cols-2">
      {PANELS.map((p, i) => (
        <FadeIn key={p.tone} delay={i * 0.1} direction={i === 0 ? "right" : "left"}>
          <a
            href={withBase(p.href)}
            className="group relative block h-[64vh] md:h-[78vh] overflow-hidden"
          >
            <img
              src={withBase(p.image)}
              alt={p.imageAlt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />
            <div
              className={`absolute inset-0 ${
                p.tone === "night"
                  ? "bg-gradient-to-t from-espresso via-espresso/65 to-espresso/30"
                  : "bg-gradient-to-t from-espresso/85 via-espresso/35 to-espresso/5"
              }`}
              aria-hidden="true"
            />
            <div className="relative h-full flex flex-col justify-end p-8 md:p-12 text-white">
              <span className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 rule-brass" />
                <span className="eyebrow text-brass-soft">{p.eyebrow}</span>
              </span>
              <h2 className="font-serif italic text-white text-balance mb-3 [font-size:clamp(30px,3.4vw,48px)] [line-height:1.05]">
                {p.title}
              </h2>
              <p className="text-white/80 max-w-md leading-relaxed mb-6">{p.body}</p>
              <span className="inline-flex items-center gap-2 text-[15px] font-medium text-white">
                <span className="border-b border-brass/70 pb-0.5 group-hover:border-brass transition-colors">
                  Explore the menu
                </span>
                <ArrowUpRight className="w-4 h-4 text-brass transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </a>
        </FadeIn>
      ))}
    </section>
  );
}
