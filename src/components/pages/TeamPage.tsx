import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";

const team = [
  {
    name: "Millie",
    role: "Co-owner",
    bio: "Millie trained under Maria, the original creator of Cafeina in 2009, and brings a deep understanding of what makes this place feel like home.",
    photoAlt: "{{TEAM_MEMBER_1_PHOTO_ALT}}",
  },
  {
    name: "Callum",
    role: "Co-owner",
    bio: "Callum runs the pass and the cocktail programme in the evenings, and makes sure every table gets the same care whether you're in for a coffee or an afternoon tea.",
    photoAlt: "{{TEAM_MEMBER_2_PHOTO_ALT}}",
  },
  {
    name: "Nancy",
    role: "Front of house",
    bio: "Nancy keeps the room running and will remember your name by the second visit.",
    photoAlt: "{{TEAM_MEMBER_3_PHOTO_ALT}}",
  },
];

interface TeamPageProps {
  heroHeading?: string;
  heroSubheading?: string;
}

export function TeamPage({
  heroHeading = "The people behind the pass.",
  heroSubheading = "Family-run, small team, big heart.",
}: TeamPageProps) {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="flex flex-col bg-white">
          <section className="bg-cream py-20 md:py-32">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <FadeIn>
                <span className="text-sage font-medium uppercase tracking-wide text-sm mb-4 block">Our team</span>
                <h1 className="mb-6">{heroHeading}</h1>
                <p className="text-xl text-text-muted">{heroSubheading}</p>
              </FadeIn>
            </div>
          </section>

          <section className="py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="max-w-2xl mx-auto text-center mb-16">
                <p className="text-lg text-text-muted leading-relaxed">
                  Cafeina has been part of La Marina since 2009, when Maria opened the doors. Today it's run by Millie and Callum, with Nancy holding it all together — the same values, the same warm welcome, with a few thoughtful improvements.
                </p>
              </FadeIn>

              <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
                {team.map((member, i) => (
                  <FadeIn key={member.name} delay={i * 0.1}>
                    <div className="text-center">
                      <div className="aspect-square rounded-[24px] overflow-hidden bg-teal-pale border border-border/50 mb-6 flex items-center justify-center">
                        <span className="text-text-muted text-sm">{member.photoAlt}</span>
                      </div>
                      <h3 className="text-2xl mb-1">{member.name}</h3>
                      <p className="text-teal-mid font-medium mb-4">{member.role}</p>
                      <p className="text-text-muted leading-relaxed">{member.bio}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24 bg-teal-deep text-center px-4">
            <FadeIn className="max-w-3xl mx-auto">
              <h2 className="text-white mb-6">Come say hola.</h2>
              <p className="text-teal-light text-lg mb-10">A table for two, a coffee at the bar, or the whole afternoon tea — we'd love to see you.</p>
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
