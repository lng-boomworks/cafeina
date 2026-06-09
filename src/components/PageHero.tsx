import type { ReactNode } from "react";
import { FadeIn } from "./FadeIn";
import { withBase } from "./../utils/url";
import { useParallax } from "./useParallax";

interface PageHeroProps {
  label?: string;
  heading: string;
  subheading?: string;
  /** Full-bleed background image (extension-less; WebP+JPG pattern). */
  image?: string;
  imageAlt?: string;
  /** Text alignment of the overlay. Defaults to left, matching the homepage hero. */
  align?: "left" | "center";
  /** Extra content under the subheading (e.g. a CTA). */
  children?: ReactNode;
}

/**
 * Interior-page hero in the same language as the homepage hero:
 * full-bleed parallax image, warm espresso gradient, brass eyebrow + big
 * serif-italic heading set over the photo. Falls back to a clean espresso
 * band if no image is supplied.
 */
export function PageHero({ label, heading, subheading, image, imageAlt, align = "left", children }: PageHeroProps) {
  const parallaxRef = useParallax<HTMLDivElement>({ intensity: 70 });

  const base = image?.replace(/\.(webp|jpe?g|png)$/i, "");
  const webp = base ? `${base}.webp` : undefined;
  const jpg = base ? `${base}.jpg` : undefined;

  const centered = align === "center";

  return (
    <section className="relative overflow-hidden bg-espresso">
      {image && (
        <div ref={parallaxRef} className="absolute inset-0" aria-hidden="true">
          <picture>
            <source srcSet={withBase(webp!)} type="image/webp" />
            <img
              src={withBase(jpg!)}
              alt=""
              className="absolute inset-0 w-full h-full object-cover scale-110"
              loading="eager"
              fetchPriority="high"
              style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0)", willChange: "transform" }}
            />
          </picture>
          {/* Warm espresso wash — keeps the headline legible, lets the photo breathe */}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-espresso/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/50 via-transparent to-espresso/25 hidden md:block" />
        </div>
      )}

      {imageAlt && <span className="sr-only">{imageAlt}</span>}

      <div className="relative min-h-[72vh] md:min-h-[78vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-32 w-full">
          <FadeIn className={`max-w-4xl text-white ${centered ? "mx-auto text-center" : ""}`}>
            {label && (
              <span className={`inline-flex items-center gap-3 mb-6 text-white/80 ${centered ? "justify-center" : ""}`}>
                <span className="w-10 rule-brass" />
                <span className="eyebrow">{label}</span>
                {centered && <span className="w-10 rule-brass" />}
              </span>
            )}
            <h1 className="font-serif italic text-balance text-white mb-5 [font-size:clamp(46px,7vw,92px)] [line-height:0.98] [letter-spacing:-1.5px]">
              {heading}
            </h1>
            {subheading && (
              <p className={`font-serif italic text-balance text-white/85 [font-size:clamp(19px,2.4vw,28px)] ${centered ? "mx-auto" : ""} max-w-2xl`}>
                {subheading}
              </p>
            )}
            {children && <div className="mt-9">{children}</div>}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
