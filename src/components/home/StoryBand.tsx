import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { withBase } from "../../utils/url";

interface StoryBandProps {
  eyebrow?: string;
  heading?: string;
  body?: string;
  subbody?: string;
  image?: string; // extension-less; derives .webp + .jpg
  imageAlt?: string;
}

export function StoryBand({
  eyebrow = "Welcome to Cafeina",
  heading = "Come as you are",
  body = "Feel at home with our exceptional table service, unique drinks and warm atmosphere. Every cup of coffee and slice of cake comes with a side of heart and history.",
  subbody = "Fifteen years of slow cups and good company, in one cozy corner of La Marina.",
  image = "/images/hero/cafe-interior",
  imageAlt = "Inside Cafeina - natural light, counter and seating",
}: StoryBandProps) {
  const base = image.replace(/\.(webp|jpe?g|png)$/i, "");
  return (
    <section className="bg-cream py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image - leads on the left, breaks slightly out */}
          <FadeIn direction="right" className="lg:col-span-7">
            <div className="relative">
              <div className="aspect-[5/4] md:aspect-[16/11] rounded-[28px] overflow-hidden border border-border shadow-[0_40px_90px_-40px_rgba(23,14,7,0.55)]">
                <picture>
                  <source srcSet={withBase(`${base}.webp`)} type="image/webp" />
                  <img
                    src={withBase(`${base}.jpg`)}
                    alt={imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </picture>
              </div>
              {/* Brass corner accent */}
              <div className="absolute -bottom-4 -left-4 hidden md:block w-24 h-24 border-l-2 border-b-2 border-brass/60 rounded-bl-[28px]" aria-hidden="true" />
            </div>
          </FadeIn>

          {/* Text */}
          <FadeIn delay={0.12} className="lg:col-span-5">
            <span className="inline-flex items-center gap-3 mb-5 text-sage">
              <span className="w-10 rule-brass" />
              <span className="eyebrow">{eyebrow}</span>
            </span>
            <h2 className="font-serif italic text-balance mb-6">{heading}</h2>
            <p className="text-[17px] text-text-body leading-[1.8] mb-5">{body}</p>
            <p className="text-[17px] text-text-muted leading-[1.8] mb-8 italic">{subbody}</p>

            {/* Growth note */}
            <div className="flex items-center gap-4 mb-9 py-4 border-y border-border">
              <span className="font-serif italic text-teal-mid text-3xl leading-none">2×</span>
              <p className="text-[15px] text-text-muted leading-snug">
                <span className="text-teal-deep font-medium">Doubling in size.</span> Same heart, more space -
                we're taking over the unit next door.
              </p>
            </div>

            <Button variant="ghost" href="/about">Our story</Button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
