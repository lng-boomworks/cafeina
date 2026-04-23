import { FadeIn } from "./FadeIn";
import { withBase } from "../utils/url";
import { useParallax } from "./useParallax";

type Overlay = "none" | "subtle" | "dark";
type Aspect = "banner" | "wide" | "classic";

interface LandscapeBannerProps {
  image: string;               // path WITHOUT .webp — we'll derive both webp + jpg
  imageAlt: string;
  label?: string;              // small uppercase eyebrow
  heading?: string;
  subheading?: string;
  overlay?: Overlay;
  aspect?: Aspect;
  textPosition?: "center" | "left" | "right";
  theme?: "light" | "dark";    // text colour palette when text is present
  className?: string;
  priority?: boolean;          // eager load (use for above-the-fold banners)
  parallax?: boolean;          // gentle vertical parallax on scroll
}

const aspectClass: Record<Aspect, string> = {
  banner: "aspect-[21/9]",
  wide: "aspect-[16/9]",
  classic: "aspect-[3/2]",
};

function overlayClass(overlay: Overlay): string {
  if (overlay === "dark") return "bg-gradient-to-t from-black/70 via-black/50 to-black/30";
  if (overlay === "subtle") return "bg-gradient-to-t from-black/40 to-transparent";
  return "";
}

export function LandscapeBanner({
  image,
  imageAlt,
  label,
  heading,
  subheading,
  overlay = "none",
  aspect = "wide",
  textPosition = "center",
  theme = "light",
  className = "",
  priority = false,
  parallax = false,
}: LandscapeBannerProps) {
  // Derive webp + jpg from a single base path. Accepts either an extension or no extension.
  const base = image.replace(/\.(webp|jpe?g|png)$/i, "");
  const webp = `${base}.webp`;
  const jpg = `${base}.jpg`;

  const hasText = Boolean(label || heading || subheading);
  const positionClass = textPosition === "left" ? "items-start text-left" : textPosition === "right" ? "items-end text-right" : "items-center text-center";
  const textColor = theme === "light" ? "text-white" : "text-teal-deep";
  const subColor = theme === "light" ? "text-white/85" : "text-text-muted";

  const parallaxRef = useParallax<HTMLDivElement>({ intensity: 60 });
  const imgStyle = parallax
    ? { transform: "translate3d(0, var(--parallax-y, 0px), 0)", willChange: "transform" as const }
    : undefined;

  return (
    <section className={`relative overflow-hidden ${className}`}>
      <FadeIn>
        <div
          ref={parallax ? parallaxRef : undefined}
          className={`relative ${aspectClass[aspect]} w-full max-w-[1600px] mx-auto md:rounded-[28px] overflow-hidden`}
        >
          <picture>
            <source srcSet={withBase(webp)} type="image/webp" />
            <img
              src={withBase(jpg)}
              alt={imageAlt}
              className={`absolute inset-0 w-full h-full object-cover ${parallax ? "scale-110" : ""}`}
              loading={priority ? "eager" : "lazy"}
              width={2400}
              height={1350}
              style={imgStyle}
            />
          </picture>
          {overlay !== "none" && (
            <div className={`absolute inset-0 ${overlayClass(overlay)}`} aria-hidden="true" />
          )}
          {hasText && (
            <div className={`absolute inset-0 flex ${positionClass} justify-center p-6 md:p-12`}>
              <div className={`max-w-3xl ${textColor}`}>
                {label && (
                  <span className={`inline-block uppercase tracking-[0.15em] text-xs md:text-sm mb-3 ${theme === "light" ? "text-white/80" : "text-sage"}`}>
                    {label}
                  </span>
                )}
                {heading && (
                  <h2 className={`font-serif italic text-balance ${theme === "light" ? "text-white" : ""} ${subheading ? "mb-3" : ""}`}>
                    {heading}
                  </h2>
                )}
                {subheading && (
                  <p className={`text-lg md:text-xl ${subColor} text-balance`}>
                    {subheading}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </FadeIn>
    </section>
  );
}
