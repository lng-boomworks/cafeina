import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { withBase } from "../../utils/url";
import { useParallax } from "../useParallax";

interface FinalCTAProps {
  heading?: string;
  text?: string;
  bgImage?: string;      // accepts path with or without extension — component derives .webp + .jpg
  bgImageAlt?: string;
  parallax?: boolean;
}

export function FinalCTA({
  heading = "Pop in and say hola.",
  text = "We're open Mon–Sat from 9am and Sun from 5pm — till late. Table service, homemade cakes, and a warm welcome.",
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
      className="relative bg-teal-deep text-white py-24 overflow-hidden"
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
          <div
            className="absolute inset-0 bg-gradient-to-t from-teal-deep/95 via-teal-deep/80 to-teal-deep/70"
            aria-hidden="true"
          />
        </>
      )}
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <FadeIn>
          <h2 className="text-white mb-6 font-serif italic">{heading}</h2>
          <p className="text-teal-light text-lg mb-10 max-w-2xl mx-auto">{text}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="white" href="/contact">Book a table</Button>
            <Button variant="outline-white" href="tel:+34711051358">Call +34 711 05 13 58</Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
