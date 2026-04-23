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
  loyaltyText?: string;
  loyaltyCtaText?: string;
  loyaltyCtaUrl?: string;
}

export function HomeHero({
  label = "La Marina · since 2009",
  heading = "Relaxing Vintage Café",
  subheading = "Coffee, Tea, Cakes & Craft Cocktails",
  image = "/images/hero/home-hero",
  imageAlt = "A warm cup of coffee at Cafeina",
  ctaText = "Book a table",
  ctaUrl = "/contact",
  buttonText = "See the menu",
  buttonUrl = "/menu",
  loyaltyText,
  loyaltyCtaText,
  loyaltyCtaUrl,
}: HomeHeroProps) {
  const base = image.replace(/\.(webp|jpe?g|png)$/i, "");
  const webp = `${base}.webp`;
  const jpg = `${base}.jpg`;

  const parallaxRef = useParallax<HTMLDivElement>({ intensity: 80 });

  return (
    <section className="relative overflow-hidden">
      <div
        ref={parallaxRef}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <picture>
          <source srcSet={withBase(webp)} type="image/webp" />
          <img
            src={withBase(jpg)}
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-110"
            loading="eager"
            fetchPriority="high"
            style={{
              transform: "translate3d(0, var(--parallax-y, 0px), 0)",
              willChange: "transform",
            }}
          />
        </picture>
        {/* Warm brown gradient — darker at bottom to anchor text, softer at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2b1a0f]/85 via-[#2b1a0f]/55 to-[#2b1a0f]/35" />
        {/* Side vignette for extra text legibility on very wide screens */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2b1a0f]/25 via-transparent to-[#2b1a0f]/25 hidden md:block" />
      </div>

      <span className="sr-only">{imageAlt}</span>

      <div className="relative min-h-[70vh] md:min-h-[78vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
          <FadeIn className="max-w-3xl text-white">
            <span className="inline-block text-white/75 font-medium uppercase tracking-[0.2em] text-xs md:text-sm mb-6">
              {label}
            </span>
            <h1 className="font-serif italic text-balance text-white mb-4 [font-size:clamp(54px,7vw,96px)] [line-height:1.0]">
              {heading}
            </h1>
            <p className="font-serif italic text-balance text-white/90 mb-10 [font-size:clamp(20px,2.5vw,28px)]">
              {subheading}
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <Button variant="white" href={ctaUrl}>
                {ctaText}
              </Button>
              <Button variant="outline-white" href={buttonUrl}>
                {buttonText}
              </Button>
            </div>
            <p className="text-sm text-white/70 italic mb-8">
              Mon–Sat from 9am · Sun from 5pm · till late
            </p>
            {loyaltyText && (
              <div className="inline-flex flex-wrap items-center gap-3 px-5 py-3 rounded-full bg-white/95 border border-white/40 backdrop-blur-sm shadow-lg">
                <span className="text-[15px] text-teal-deep font-medium">{loyaltyText}</span>
                {loyaltyCtaText && loyaltyCtaUrl && (
                  <a
                    href={withBase(loyaltyCtaUrl)}
                    className="text-[14px] font-semibold text-teal-mid hover:text-teal-deep underline underline-offset-4"
                  >
                    {loyaltyCtaText} →
                  </a>
                )}
              </div>
            )}
          </FadeIn>
        </div>
      </div>

      <div className="relative bg-cream border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-center gap-2">
          <TrustPill text="Since 2009" />
          <TrustPill text="Family-run" />
          <TrustPill text="Homemade cakes" />
          <TrustPill text="Table service" />
          <TrustPill text="Craft cocktails" />
        </div>
      </div>
    </section>
  );
}
