import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { withBase } from "../../utils/url";
import { useParallax } from "../useParallax";
import { Clock } from "lucide-react";

interface BlogPageProps {
  heroLabel?: string;
  heroHeading?: string;
  heroSubheading?: string;
  introHeading?: string;
  introBody?: string;
  introImage?: string;
  introImageAlt?: string;
  ctaHeading?: string;
  ctaText?: string;
}

export function BlogPage({
  heroLabel = "coming soon",
  heroHeading = "Stories from the café.",
  heroSubheading = "Recipes, favourite regulars, things we're up to. Our journal is just getting started.",
  introHeading = "Stay in the loop.",
  introBody = "We're working on the first few posts. In the meantime — pop in, have a coffee, and we'll tell you in person.",
  introImage,
  introImageAlt = "",
  ctaHeading = "Let's stay in touch.",
  ctaText = "Follow us on Instagram, or drop by in person. We open Mon–Sat at 9am, Sun at 5pm.",
}: BlogPageProps) {
  const introBase = introImage?.replace(/\.(webp|jpe?g|png)$/i, "");
  const introWebp = introBase ? `${introBase}.webp` : null;
  const introJpg = introBase ? `${introBase}.jpg` : null;
  const panelRef = useParallax<HTMLDivElement>({ intensity: 40 });
  const introImgStyle = introImage
    ? { transform: "translate3d(0, var(--parallax-y, 0px), 0)", willChange: "transform" as const }
    : undefined;
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="bg-cream py-20 md:py-28">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <FadeIn>
              <span className="text-sage font-medium uppercase tracking-wide text-sm mb-4 block">{heroLabel}</span>
              <h1 className="mb-6 font-serif italic">{heroHeading}</h1>
              <p className="text-xl text-text-muted">{heroSubheading}</p>
            </FadeIn>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div
                ref={introImage ? panelRef : undefined}
                className="relative overflow-hidden rounded-[24px] border border-border"
              >
                {introWebp && introJpg && (
                  <>
                    <picture>
                      <source srcSet={withBase(introWebp)} type="image/webp" />
                      <img
                        src={withBase(introJpg)}
                        alt={introImageAlt}
                        className="absolute inset-0 w-full h-full object-cover scale-110"
                        loading="lazy"
                        style={introImgStyle}
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/85 via-teal-deep/70 to-teal-deep/55" aria-hidden="true" />
                  </>
                )}
                <div className={`relative p-10 md:p-14 text-center ${introImage ? "text-white" : "bg-cream/40"}`}>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${introImage ? "bg-white/15 backdrop-blur-sm" : "bg-teal-pale"}`}>
                    <Clock className={`w-7 h-7 ${introImage ? "text-white" : "text-teal-deep"}`} strokeWidth={1.5} />
                  </div>
                  <h2 className={`mb-4 font-serif italic ${introImage ? "text-white" : ""}`}>{introHeading}</h2>
                  <p className={`text-lg leading-relaxed max-w-prose mx-auto ${introImage ? "text-white/90" : "text-text-muted"}`}>{introBody}</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="py-24 bg-teal-deep text-center px-4">
          <FadeIn className="max-w-3xl mx-auto">
            <h2 className="text-white mb-6 font-serif italic">{ctaHeading}</h2>
            <p className="text-teal-light text-lg mb-10">{ctaText}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="white" href="/contact">Say hola</Button>
              <Button variant="outline-white" href="/menu">See the menu</Button>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
