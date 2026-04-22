import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { TrustPill } from "../TrustPill";

interface HomeHeroProps {
  heading?: string;
  subheading?: string;
  label?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export function HomeHero({
  heading = "Coffee, afternoon tea & cocktails in a cozy La Marina nook.",
  subheading = "Family-run by Millie & Callum. Homemade cakes, proper British afternoon tea, and craft cocktails — all served with love.",
  label = "La Marina · since 2009",
  ctaText = "Book a table",
  ctaUrl = "/contact",
}: HomeHeroProps) {
  return (
    <section className="bg-cream pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="max-w-2xl">
            <span className="inline-block text-sage font-medium uppercase tracking-wide text-sm mb-5">{label}</span>
            <h1 className="mb-6 text-balance">{heading}</h1>
            <p className="text-xl text-text-muted mb-8 text-balance">{subheading}</p>
            <div className="flex flex-wrap gap-4 mb-2">
              <Button href={ctaUrl}>{ctaText}</Button>
              <Button variant="ghost" href="/services">See the menu</Button>
            </div>
            <p className="text-sm text-text-muted italic mb-10">Open every day · 9am – late</p>
            <div className="flex flex-wrap gap-2">
              <TrustPill text="Since 2009" />
              <TrustPill text="Family-run" />
              <TrustPill text="Homemade cakes" />
              <TrustPill text="Table service" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
