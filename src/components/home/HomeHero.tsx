import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { TrustPill } from "../TrustPill";
import { withBase } from "../../utils/url";
import { useParallax } from "../useParallax";

interface HomeHeroProps {
  label?: string;
  heading?: string;
  subheading?: string;
  image?: string;
  imageAlt?: string;
  ctaText?: string;
  ctaUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
}

const TRUST = ["Since 2009", "Family-run", "Homemade cakes", "Table service", "Craft cocktails"];

export function HomeHero({
  label = "La Marina · since 2009",
  heading = "Relaxing Vintage Café",
  subheading = "Coffee, Tea, Cakes & Craft Cocktails",
  image = "/images/hero/home-hero",
  imageAlt = "A warm cup of coffee at Cafeina",
  ctaText = "Reserve a table",
  ctaUrl = "/contact",
  buttonText = "See the menu",
  buttonUrl = "/menu",
}: HomeHeroProps) {
  const base = image.replace(/\.(webp|jpe?g|png)$/i, "");
  const webp = `${base}.webp`;
  const jpg = `${base}.jpg`;

  const parallaxRef = useParallax<HTMLDivElement>({ intensity: 80 });

  return (
    <section className="relative overflow-hidden bg-espresso">
      <div ref={parallaxRef} className="absolute inset-0" aria-hidden="true">
        <picture>
          <source srcSet={withBase(webp)} type="image/webp" />
          <img
            src={withBase(jpg)}
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-110"
            loading="eager"
            fetchPriority="high"
            style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0)", willChange: "transform" }}
          />
        </picture>
        {/* Warm espresso gradient — anchors the headline, lets the top breathe */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/55 to-espresso/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/45 via-transparent to-espresso/25 hidden md:block" />
      </div>

      <span className="sr-only">{imageAlt}</span>

      <div className="relative min-h-[86vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-32 w-full">
          <FadeIn className="max-w-4xl text-white">
            <span className="inline-flex items-center gap-3 mb-7 text-white/80">
              <span className="w-10 rule-brass" />
              <span className="eyebrow">{label}</span>
            </span>
            <h1 className="font-serif italic text-balance text-white mb-5 [font-size:clamp(54px,8vw,108px)] [line-height:0.98] [letter-spacing:-2px]">
              {heading}
            </h1>
            <p className="font-serif italic text-balance text-white/85 mb-10 [font-size:clamp(20px,2.6vw,30px)]">
              {subheading}
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <Button variant="white" href={ctaUrl}>{ctaText}</Button>
              <Button variant="outline-white" href={buttonUrl}>{buttonText}</Button>
            </div>
            <p className="text-sm text-white/65 italic">Mon–Sat from 9am · Sun from 5pm · till late</p>
          </FadeIn>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-[110px] left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/55" aria-hidden="true">
          <span className="eyebrow text-[10px]">scroll</span>
          <span className="block w-px h-10 bg-gradient-to-b from-brass to-transparent" />
        </div>
      </div>

      {/* Trust strip — static at rest, gentle drift on hover */}
      <div className="relative bg-cream border-t border-border">
        <div className="hover-marquee max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 overflow-hidden">
          <div className="hover-marquee-track flex items-center justify-center gap-2 flex-wrap md:flex-nowrap md:w-max">
            {[...TRUST, ...TRUST].map((t, i) => (
              <TrustPill key={`${t}-${i}`} text={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
