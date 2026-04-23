import { FadeIn } from "../FadeIn";
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
    <section className="bg-cream py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square rounded-full bg-teal-deep" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeIn direction="right">
            <div className="aspect-[4/5] md:aspect-[5/6] rounded-[28px] overflow-hidden border border-border shadow-[0_30px_80px_-30px_rgba(68,42,24,0.5)]">
              {image ? (
                <img
                  src={withBase(image)}
                  alt={imageAlt ?? heading}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-teal-pale" />
              )}
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            {label && (
              <span className="inline-block text-sage font-medium uppercase tracking-[0.15em] text-xs mb-5">
                {label}
              </span>
            )}
            <h2 className="mb-4 font-serif italic text-balance">{heading}</h2>
            {subheading && (
              <p className="text-xl text-teal-deep/80 mb-6 italic">{subheading}</p>
            )}
            {body && (
              <p className="text-[17px] text-text-body leading-[1.8] mb-8">{body}</p>
            )}
            {ctaText && ctaUrl && (
              <Button href={ctaUrl}>{ctaText}</Button>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
