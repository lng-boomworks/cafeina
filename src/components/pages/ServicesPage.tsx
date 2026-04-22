import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { Coffee, Sparkles, GlassWater, CheckCircle2, CalendarDays } from "lucide-react";

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-1" />
      <span className="text-text-body">{children}</span>
    </li>
  );
}

const menus = [
  {
    id: "coffee-tea-cakes",
    icon: Coffee,
    title: "Coffee, tea & cakes",
    desc: "Our everyday offer. Proper coffee, loose-leaf teas, and rotating homemade bakes from the counter.",
    bullets: [
      "House espresso, flat whites, lattes and cappuccinos",
      "Loose-leaf teas — English breakfast, Earl Grey, herbals",
      "Homemade cakes rotated through the week — classics like lemon drizzle (€3.50) plus seasonal specials",
      "Savouries — scones, sausage rolls, sandwiches",
    ],
  },
  {
    id: "afternoon-tea",
    icon: Sparkles,
    title: "Afternoon tea",
    desc: "The full British spread, the way it should be. Best booked ahead.",
    bullets: [
      "Finger sandwiches, warm scones with clotted cream and jam, a selection of homemade cakes",
      "A pot of loose-leaf tea per person",
      "Sparkling upgrade — add a glass of cava to make it a Sparkling Afternoon Tea",
      "Best reserved in advance — call us or use the contact form",
    ],
  },
  {
    id: "cocktails-events",
    icon: GlassWater,
    title: "Cocktails & events",
    desc: "Evenings at Cafeina — craft cocktails, a rotating cocktail of the week, and regular events.",
    bullets: [
      "Craft cocktail menu — passion fruit martini (€8), negroni, signature serves",
      "Spirits, wine and beer selection",
      "Wine tasting nights — guided exploration of Spanish wines",
      "Fiestas La Marina Style, Bottomless Prosecco, Murder Mystery nights",
    ],
  },
];

interface ServicesPageProps {
  heroHeading?: string;
  heroSubheading?: string;
}

export function ServicesPage({
  heroHeading = "Freshly made, with the best ingredients.",
  heroSubheading = "Morning coffee through afternoon tea into evening cocktails — our day-long offer, made with local produce and love.",
}: ServicesPageProps) {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="flex flex-col bg-white">
          <section className="bg-cream py-20 md:py-32">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <FadeIn>
                <h1 className="mb-6">{heroHeading}</h1>
                <p className="text-xl text-text-muted">{heroSubheading}</p>
              </FadeIn>
            </div>
          </section>

          <section className="py-20 md:py-32">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
              {menus.map((menu) => (
                <FadeIn key={menu.id} delay={0.1} className="scroll-mt-32" id={menu.id}>
                  <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
                    <div className="md:w-1/3 shrink-0">
                      <div className="w-16 h-16 bg-teal-pale rounded-2xl flex items-center justify-center mb-6 border border-teal-light">
                        <menu.icon className="w-8 h-8 text-teal-deep" strokeWidth={1.5} />
                      </div>
                      <h2 className="text-3xl mb-4">{menu.title}</h2>
                      <p className="text-text-muted text-lg">{menu.desc}</p>
                    </div>
                    <div className="md:w-2/3 bg-ivory rounded-2xl p-8 md:p-10 border border-border/50">
                      <ul className="space-y-5">
                        {menu.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex gap-4">
                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                              <div className="w-2 h-2 rounded-full bg-sage" />
                            </div>
                            <span className="text-lg text-text-body">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>

          <section className="py-20 bg-teal-pale">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="mb-12">
                <h2 className="text-center mb-4">Regular events</h2>
                <p className="text-center text-text-muted mb-12">Dates announced on our social channels — or ask in-house when you visit.</p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
                    <CalendarDays className="w-6 h-6 text-teal-deep mb-4" strokeWidth={1.5} />
                    <h3 className="text-xl text-teal-deep mb-4">What's on</h3>
                    <ul className="space-y-4">
                      <CheckItem>Wine tasting nights — guided Spanish wines</CheckItem>
                      <CheckItem>Fiestas La Marina Style — music, dancing, tapas</CheckItem>
                      <CheckItem>Bottomless Prosecco afternoons</CheckItem>
                      <CheckItem>Murder Mystery evenings</CheckItem>
                    </ul>
                  </div>
                  <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
                    <h3 className="text-xl text-teal-deep mb-4">Good to know</h3>
                    <ul className="space-y-4 text-text-muted">
                      <li className="flex gap-3"><span className="text-sage font-bold shrink-0 mt-0.5">·</span><span>Open every day from 9am until late</span></li>
                      <li className="flex gap-3"><span className="text-sage font-bold shrink-0 mt-0.5">·</span><span>Table service throughout</span></li>
                      <li className="flex gap-3"><span className="text-sage font-bold shrink-0 mt-0.5">·</span><span>Reservations recommended for afternoon tea and events</span></li>
                      <li className="flex gap-3"><span className="text-sage font-bold shrink-0 mt-0.5">·</span><span>Dietary requests welcome — just ask</span></li>
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          <section className="py-24 text-center px-4 bg-teal-deep text-white">
            <FadeIn className="max-w-3xl mx-auto">
              <h2 className="text-white mb-6">Hungry yet?</h2>
              <p className="text-lg text-white/70 mb-10">Pop in or reserve a table — we'll keep a seat warm.</p>
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
