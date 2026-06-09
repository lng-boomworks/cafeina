import { FadeIn } from "./FadeIn";
import { Button } from "./Button";

interface CTALink {
  label: string;
  href: string;
}

interface ClosingCTAProps {
  eyebrow?: string;
  heading?: string;
  text?: string;
  primary?: CTALink;
  secondary?: CTALink;
}

/**
 * Shared espresso/brass closing CTA used at the foot of interior pages.
 * Replaces the old per-page teal-deep blocks for a consistent finish.
 */
export function ClosingCTA({
  eyebrow = "Table service · till late",
  heading = "Pop in and say hola.",
  text = "Open Mon–Sat from 9am and Sun from 5pm — till late. Table service, homemade cakes, and a warm welcome.",
  primary = { label: "Reserve a table", href: "/contact" },
  secondary = { label: "Call +34 711 05 13 58", href: "tel:+34711051358" },
}: ClosingCTAProps) {
  return (
    <section className="relative bg-espresso text-white py-24 md:py-32 overflow-hidden grain">
      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <FadeIn>
          <span className="inline-flex items-center gap-3 mb-6 text-brass-soft justify-center">
            <span className="w-10 rule-brass" />
            <span className="eyebrow">{eyebrow}</span>
            <span className="w-10 rule-brass" />
          </span>
          <h2 className="text-white mb-6 font-serif italic text-balance [font-size:clamp(38px,5vw,64px)] [line-height:1.02]">
            {heading}
          </h2>
          <p className="text-white/75 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">{text}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="white" href={primary.href}>{primary.label}</Button>
            <Button variant="outline-white" href={secondary.href}>{secondary.label}</Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
