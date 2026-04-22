import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { Heart, Leaf, Home, Sparkles } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Community first",
    desc: "We're here for the regulars, the newcomers, and the afternoon-tea occasions. Everyone gets the same welcome.",
  },
  {
    icon: Leaf,
    title: "Fresh & local",
    desc: "Cakes made in-house, produce sourced locally where we can. Simple ingredients, treated with care.",
  },
  {
    icon: Home,
    title: "A family tradition",
    desc: "Maria opened Cafeina in 2009. Millie trained under her and now runs the place with Callum — preserving the essence, with a few thoughtful tweaks.",
  },
  {
    icon: Sparkles,
    title: "Served with love",
    desc: "Table service, proper time taken over a coffee, no rush. That's what makes a café feel like home.",
  },
];

const owners = [
  {
    name: "Millie",
    role: "Co-owner",
    bio: "Millie trained under Maria, Cafeina's original creator in 2009. She brings a deep understanding of what makes this place feel like home.",
    photoAlt: "{{TEAM_MEMBER_1_PHOTO_ALT}}",
  },
  {
    name: "Callum",
    role: "Co-owner",
    bio: "Callum runs the evening cocktail programme and makes sure every table gets the same care — whether you're in for a coffee or the full afternoon tea.",
    photoAlt: "{{TEAM_MEMBER_2_PHOTO_ALT}}",
  },
];

interface AboutPageProps {
  heroHeading?: string;
  heroSubheading?: string;
}

export function AboutPage({
  heroHeading = "Serving with love since 2009.",
  heroSubheading = "A family tradition, honoured and continued by Millie & Callum.",
}: AboutPageProps) {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="flex flex-col bg-white">
          <section className="bg-cream py-20 md:py-32">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <FadeIn>
                <span className="text-sage font-medium uppercase tracking-wide text-sm mb-4 block">Our story</span>
                <h1 className="mb-6">{heroHeading}</h1>
                <p className="text-xl text-text-muted">{heroSubheading}</p>
              </FadeIn>
            </div>
          </section>

          <section className="py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-16 items-center">
                <FadeIn className="lg:col-span-5 relative">
                  <div className="aspect-square md:aspect-[4/5] rounded-[24px] overflow-hidden relative z-10 border border-border/50 bg-teal-pale flex items-center justify-center">
                    <span className="text-text-muted text-lg">{`{{ABOUT_HERO_IMAGE_ALT}}`}</span>
                  </div>
                </FadeIn>
                <FadeIn delay={0.2} className="lg:col-span-7">
                  <h2 className="mb-6">A family tradition</h2>
                  <div className="prose prose-lg text-text-body max-w-none">
                    <p>Cafeina opened in 2009, the work of our founder Maria. She built it into the cozy nook La Marina knows — homemade cakes, proper coffee, and time taken over every visit.</p>
                    <p>Millie worked under Maria for years and brings an invaluable understanding of what makes Cafeina itself. Today she runs the café with Callum, honouring Maria's original vision and adding a few thoughtful improvements of their own.</p>
                    <p>The same welcome. The same homemade bakes. The same "sit as long as you like". We're just making sure Maria would still be proud.</p>
                    <p className="font-serif italic text-teal-deep">— Millie & Callum</p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          <section className="py-20 md:py-28 bg-ivory">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <h2 className="mb-4">Meet Millie & Callum</h2>
                <p className="text-lg text-text-muted">The people behind the pass.</p>
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-4xl mx-auto">
                {owners.map((owner, i) => (
                  <FadeIn key={owner.name} delay={i * 0.2}>
                    <div className="text-center">
                      <div className="aspect-square rounded-[24px] overflow-hidden bg-teal-pale border border-border/50 mb-6 flex items-center justify-center">
                        <span className="text-text-muted">{owner.photoAlt}</span>
                      </div>
                      <span className="text-sage font-medium uppercase tracking-wide text-sm mb-2 block">{owner.role}</span>
                      <h3 className="text-2xl mb-4">{owner.name}</h3>
                      <p className="text-text-muted leading-relaxed">{owner.bio}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
              <FadeIn className="text-center mt-12">
                <Button variant="ghost" href="/team">Meet the full team</Button>
              </FadeIn>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <h2 className="mb-4">What we stand for</h2>
                <p className="text-lg text-text-muted">The values that guide every visit.</p>
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {values.map((value, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="bg-white p-8 md:p-10 rounded-2xl border border-border h-full hover:shadow-md transition-shadow">
                      <value.icon className="w-8 h-8 text-teal-mid mb-6" strokeWidth={1.5} />
                      <h3 className="text-2xl mb-4">{value.title}</h3>
                      <p className="text-text-muted leading-relaxed">{value.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24 bg-teal-deep text-center px-4">
            <FadeIn className="max-w-3xl mx-auto">
              <h2 className="text-white mb-6">Come be part of the story.</h2>
              <p className="text-teal-light text-lg mb-10">A coffee, a cake, an afternoon tea. Whatever the visit, we're glad you're here.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="white" href="/contact">Book a table</Button>
                <Button variant="outline-white" href="tel:+34635477903">Call +34 635 477 903</Button>
              </div>
            </FadeIn>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
