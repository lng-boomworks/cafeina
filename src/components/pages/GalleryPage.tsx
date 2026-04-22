import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";

const gallery = Array.from({ length: 9 }, (_, i) => ({
  alt: `{{GALLERY_IMAGE_${i + 1}_ALT}}`,
  label: `Photo ${i + 1}`,
}));

interface GalleryPageProps {
  heroHeading?: string;
  heroSubheading?: string;
}

export function GalleryPage({
  heroHeading = "A look inside Cafeina.",
  heroSubheading = "Our vintage interior, homemade plates, and quiet corners.",
}: GalleryPageProps) {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="flex flex-col bg-white">
          <section className="bg-cream py-20 md:py-32">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <FadeIn>
                <span className="text-sage font-medium uppercase tracking-wide text-sm mb-4 block">Gallery</span>
                <h1 className="mb-6">{heroHeading}</h1>
                <p className="text-xl text-text-muted">{heroSubheading}</p>
              </FadeIn>
            </div>
          </section>

          <section className="py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="max-w-2xl mx-auto text-center mb-12">
                <p className="text-lg text-text-muted leading-relaxed">
                  Branded photography coming soon — interior, plated cakes, afternoon tea service, and events. Replace the placeholders below with real images.
                </p>
              </FadeIn>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {gallery.map((item, i) => (
                  <FadeIn key={i} delay={(i % 3) * 0.05}>
                    <div className="aspect-square rounded-2xl overflow-hidden bg-teal-pale border border-border/50 flex items-center justify-center">
                      <span className="text-text-muted text-sm text-center px-4">{item.alt}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24 bg-teal-deep text-center px-4">
            <FadeIn className="max-w-3xl mx-auto">
              <h2 className="text-white mb-6">Best seen in person.</h2>
              <p className="text-teal-light text-lg mb-10">Stop by for a coffee and see the place for yourself.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="white" href="/contact">Find us</Button>
                <Button variant="outline-white" href="/services">See the menu</Button>
              </div>
            </FadeIn>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
