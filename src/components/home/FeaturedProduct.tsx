import { Button } from "../Button";
import { withBase } from "../../utils/url";

interface FeaturedProductProps {
  label?: string;
  heading?: string;
  subheading?: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export function FeaturedProduct({
  label,
  heading,
  subheading,
  body,
  image,
  imageAlt,
  ctaText,
  ctaUrl,
}: FeaturedProductProps) {
  if (!heading) return null;

  return (
    // Pinned feel: when motion is on, global.css makes this section tall and the
    // inner block sticky while the image scrubs (data-pin-* wired in Base.astro).
    // Without JS / reduced-motion it's a normal static section.
    <section data-pin-scrub className="relative bg-espresso text-white grain">
      <div data-pin-sticky className="flex items-center overflow-hidden py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] md:aspect-[5/6] rounded-[28px] overflow-hidden border border-white/10 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.8)]">
                {image ? (
                  <img
                    data-pin-image
                    src={withBase(image)}
                    alt={imageAlt ?? heading}
                    className="w-full h-full object-cover will-change-transform"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-espresso-soft" />
                )}
              </div>
              <div className="absolute -top-4 -right-4 hidden md:block w-24 h-24 border-t-2 border-r-2 border-brass/50 rounded-tr-[28px]" aria-hidden="true" />
            </div>

            <div data-pin-text>
              {label && (
                <span className="inline-flex items-center gap-3 mb-5">
                  <span className="w-10 rule-brass" />
                  <span className="eyebrow text-brass-soft">{label}</span>
                </span>
              )}
              <h2 className="font-serif italic text-white text-balance mb-4 [font-size:clamp(40px,5vw,68px)] [line-height:1.0]">
                {heading}
              </h2>
              {subheading && <p className="text-xl text-white/75 mb-6 italic font-serif">{subheading}</p>}
              {body && <p className="text-[17px] text-white/70 leading-[1.85] mb-9 max-w-xl">{body}</p>}
              {ctaText && ctaUrl && (
                <Button variant="white" href={ctaUrl}>{ctaText}</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
