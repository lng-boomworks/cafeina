import type { ReactNode } from "react";
import { FadeIn } from "./FadeIn";
import { withBase } from "./../utils/url";

interface PageHeroProps {
  label?: string;
  heading: string;
  subheading?: string;
  /** Optional portrait image → renders the split (text + image) variant. */
  image?: string;
  imageAlt?: string;
  /** Extra content under the subheading (e.g. a CTA). */
  children?: ReactNode;
}

/**
 * Consistent interior-page hero: brass eyebrow + big serif-italic heading.
 * Centered by default; pass `image` for the asymmetric split variant.
 */
export function PageHero({ label, heading, subheading, image, imageAlt, children }: PageHeroProps) {
  if (image) {
    return (
      <section className="bg-cream pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-10 lg:gap-16 items-center">
            <FadeIn className="md:col-span-7">
              {label && (
                <span className="inline-flex items-center gap-3 mb-5 text-sage">
                  <span className="w-10 rule-brass" />
                  <span className="eyebrow">{label}</span>
                </span>
              )}
              <h1 className="font-serif italic text-balance mb-4 [font-size:clamp(44px,6.5vw,84px)] [line-height:1.0]">
                {heading}
              </h1>
              {subheading && <p className="text-xl text-text-muted max-w-xl">{subheading}</p>}
              {children && <div className="mt-8">{children}</div>}
            </FadeIn>
            <FadeIn delay={0.15} className="md:col-span-5">
              <div className="aspect-[4/5] rounded-[28px] overflow-hidden border border-border shadow-[0_40px_90px_-40px_rgba(23,14,7,0.5)]">
                <img src={withBase(image)} alt={imageAlt ?? heading} className="w-full h-full object-cover" loading="eager" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cream pt-28 md:pt-36 pb-14 md:pb-20">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <FadeIn>
          {label && (
            <span className="inline-flex items-center gap-3 mb-5 text-sage justify-center">
              <span className="w-10 rule-brass" />
              <span className="eyebrow">{label}</span>
              <span className="w-10 rule-brass" />
            </span>
          )}
          <h1 className="font-serif italic text-balance mb-5 [font-size:clamp(44px,6.5vw,84px)] [line-height:1.0]">
            {heading}
          </h1>
          {subheading && <p className="text-xl text-text-muted">{subheading}</p>}
          {children && <div className="mt-8">{children}</div>}
        </FadeIn>
      </div>
    </section>
  );
}
