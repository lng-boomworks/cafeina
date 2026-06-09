import { FadeIn } from "../FadeIn";
import { Marquee } from "../Marquee";
import { Button } from "../Button";
import { withBase } from "../../utils/url";

const WORDS = [
  "Eclectic",
  "Vintage",
  "Table service",
  "Homemade cakes",
  "Craft cocktails",
  "La Marina",
  "Family-run",
  "Come as you are",
];

export function SenseOfPlace() {
  return (
    <section className="bg-white">
      {/* Serif word marquee band */}
      <div className="bg-espresso text-white/90 py-6 md:py-7 border-y border-white/10">
        <Marquee duration={36}>
          {WORDS.map((w) => (
            <span key={w} className="flex items-center">
              <span className="font-serif italic [font-size:clamp(22px,3vw,38px)] px-6 whitespace-nowrap">{w}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brass" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-3 mb-5 text-sage">
              <span className="w-10 rule-brass" />
              <span className="eyebrow">A sense of place</span>
            </span>
            <h2 className="font-serif italic text-balance max-w-xl">Light, warm wood &amp; vintage touches</h2>
          </div>
          <p className="text-text-muted max-w-sm leading-relaxed">
            A cozy nook built for long conversations and slow cups - and a lively bar when the sun goes down.
          </p>
        </div>

        {/* Asymmetric collage - fixed-height row reserves space (no CLS) */}
        <FadeIn stagger={0.1} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:h-[72vh]">
          <div className="md:col-span-7 md:h-full">
            <figure className="h-full overflow-hidden rounded-[24px] border border-border group">
              <img
                src={withBase("/images/gallery/cafe-moment.jpg")}
                alt="A quiet moment inside Cafeina"
                loading="lazy"
                className="w-full h-full object-cover aspect-[4/3] md:aspect-auto transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              />
            </figure>
          </div>
          <div className="md:col-span-5 md:h-full grid grid-rows-2 gap-4">
            <figure className="overflow-hidden rounded-[24px] border border-border group">
              <img
                src={withBase("/images/gallery/breakfast-plate.jpg")}
                alt="Brunch at Cafeina"
                loading="lazy"
                className="w-full h-full object-cover aspect-[3/2] md:aspect-auto transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              />
            </figure>
            <figure className="overflow-hidden rounded-[24px] border border-border group">
              <img
                src={withBase("/images/gallery/coffee-hands.jpg")}
                alt="Coffee served at the table"
                loading="lazy"
                className="w-full h-full object-cover aspect-[3/2] md:aspect-auto transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              />
            </figure>
          </div>
        </FadeIn>

        <FadeIn className="text-center mt-12">
          <Button variant="ghost" href="/gallery">See the gallery</Button>
        </FadeIn>
      </div>
    </section>
  );
}
