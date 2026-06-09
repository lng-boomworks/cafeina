import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { withBase } from "../../utils/url";
import { useParallax } from "../useParallax";

interface FinalCTAProps {
  heading?: string;
  text?: string;
  bgImage?: string; // accepts path with or without extension - derives .webp + .jpg
  bgImageAlt?: string;
  parallax?: boolean;
}

export function FinalCTA({
  heading = "Pop in and say hola.",
  text = "We're open Mon-Sat from 9am and Sun from 5pm - till late. Table service, homemade cakes, and a warm welcome.",
  bgImage,
  bgImageAlt = "",
  parallax = true,
}: FinalCTAProps) {
  const base = bgImage?.replace(/\.(webp|jpe?g|png)$/i, "");
  const webp = base ? `${base}.webp` : null;
  const jpg = base ? `${base}.jpg` : null;

  const sectionRef = useParallax<HTMLElement>({ intensity: 80 });
  const parallaxEnabled = parallax && !!bgImage;
  const imgStyle = parallaxEnabled
    ? { transform: "translate3d(0, var(--parallax-y, 0px), 0)", willChange: "transform" as const }
    : undefined;

  return (
    <section
      ref={parallaxEnabled ? sectionRef : undefined}
      className="relative bg-espresso text-white py-28 md:py-36 overflow-hidden grain"
    >
      {webp && jpg && (
        <>
          <picture>
            <source srcSet={withBase(webp)} type="image/webp" />
            <img
              src={withBase(jpg)}
              alt={bgImageAlt}
              className={`absolute inset-0 w-full h-full object-cover ${parallaxEnabled ? "scale-110" : ""}`}
              loading="lazy"
              style={imgStyle}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/85 to-espresso/70" aria-hidden="true" />
        </>
      )}
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <FadeIn>
          <span className="inline-flex items-center gap-3 mb-6 text-brass-soft justify-center">
            <span className="w-10 rule-brass" />
            <span className="eyebrow">Table service · till late</span>
            <span className="w-10 rule-brass" />
          </span>
          <h2 className="text-white mb-6 font-serif italic text-balance [font-size:clamp(40px,5.5vw,72px)] [line-height:1.0]">
            {heading}
          </h2>
          <p className="text-white/75 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">{text}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="white" href="/contact">Reserve a table</Button>
            <Button variant="outline-white" href="tel:+34711051358">Call +34 711 05 13 58</Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
