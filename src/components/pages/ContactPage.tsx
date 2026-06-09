import { useState, useEffect, type ReactNode } from "react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { PageHero } from "../PageHero";
import { Mail, Phone, MapPin, Clock, CheckCircle2, Navigation, ArrowUpRight, type LucideIcon } from "lucide-react";

interface ContactPageProps {
  heroLabel?: string;
  heroHeading?: string;
  heroSubheading?: string;
  email?: string;
  phone?: string;
  phoneDisplay?: string;
  address?: string;
  hours?: string;
  /** Free-text place/address used to build the directions deep link. */
  mapsQuery?: string;
  web3formsKey?: string;
}

const DEFAULT_WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

/** A single contact detail line; a link when `href` is supplied. */
function InfoRow({
  icon: Icon,
  label,
  href,
  children,
}: {
  icon: LucideIcon;
  label: string;
  href?: string;
  children: ReactNode;
}) {
  const inner = (
    <>
      <span className="w-10 h-10 rounded-full bg-teal-pale flex items-center justify-center shrink-0 group-hover:bg-brass/20 transition-colors">
        <Icon className="w-[18px] h-[18px] text-teal-deep" />
      </span>
      <span className="min-w-0">
        <span className="eyebrow text-sage block mb-0.5">{label}</span>
        <span className="block text-teal-deep font-medium leading-snug break-words">{children}</span>
      </span>
    </>
  );
  return href ? (
    <a href={href} className="group flex items-center gap-4 px-5 py-4 hover:bg-ivory transition-colors">
      {inner}
    </a>
  ) : (
    <div className="group flex items-center gap-4 px-5 py-4">{inner}</div>
  );
}

export function ContactPage({
  heroLabel = "come say hola",
  heroHeading = "Pop in, call, or drop us a line",
  heroSubheading = "Open Mon-Sat from 9am and Sun from 5pm - till late. Table service, homemade cakes, and a warm welcome.",
  email = "hola@cafeinalamarina.com",
  phone = "+34 711 05 13 58",
  phoneDisplay,
  address = "Calle Luis de Gongora Sector VI-VII Local 43-44, 03177 San Fulgencio (Alicante), Spain",
  hours = "Mon-Sat · 9am till late\nSunday · 5pm till late",
  mapsQuery,
  web3formsKey = DEFAULT_WEB3FORMS_KEY,
}: ContactPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const phoneTel = phone.replace(/\s/g, "");
  const displayPhone = phoneDisplay ?? phone;
  const addressLines = address.split(",").map((s) => s.trim()).filter(Boolean);

  // Directions deep link: Google universal link by default (Android app / desktop web),
  // switched to Apple Maps on iPhone/iPad/Mac so it opens the device's native maps app.
  const query = mapsQuery ?? `Caféina La Marina, ${address}`;
  const [directionsHref, setDirectionsHref] = useState(
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`,
  );
  useEffect(() => {
    const ua = navigator.userAgent || "";
    const isApple =
      /iPhone|iPad|iPod/.test(ua) ||
      navigator.platform === "MacIntel" ||
      /Macintosh/.test(ua);
    if (isApple) {
      setDirectionsHref(`https://maps.apple.com/?daddr=${encodeURIComponent(query)}`);
    }
  }, [query]);

  return (
    <>
      <Navbar transparentOverHero />
      <main>
        <PageHero label={heroLabel} heading={heroHeading} subheading={heroSubheading} image="/images/hero/cta-barista" imageAlt="A warm welcome at the Cafeina bar" />

        <div className="bg-cream pt-20 md:pt-28 pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Visit / details */}
              <FadeIn className="lg:col-span-5 space-y-7">
                <div>
                  <span className="inline-flex items-center gap-3 mb-4 text-sage">
                    <span className="w-10 rule-brass" />
                    <span className="eyebrow">visit cafeina</span>
                  </span>
                  <h2 className="font-serif italic leading-[1.05] mb-3 [font-size:clamp(30px,4vw,46px)]">
                    Find us in La Marina
                  </h2>
                  <p className="text-text-muted leading-relaxed">
                    A warm corner of San Fulgencio - table service, homemade cakes and craft cocktails, from your morning coffee right through till late.
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-white overflow-hidden divide-y divide-border shadow-sm">
                  <InfoRow icon={Mail} label="Email us" href={`mailto:${email}`}>
                    {email}
                  </InfoRow>
                  <InfoRow icon={Phone} label="Call us" href={`tel:${phoneTel}`}>
                    {displayPhone}
                  </InfoRow>
                  <InfoRow icon={Clock} label="Open hours">
                    {hours.split("\n").map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </InfoRow>
                  <InfoRow icon={MapPin} label="Find us">
                    {addressLines.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </InfoRow>
                </div>

                {/* Directions - opens the visitor's native maps app */}
                <div>
                  <a
                    href={directionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 p-5 bg-espresso text-cream rounded-2xl grain overflow-hidden shadow-[0_20px_50px_-30px_rgba(23,14,7,0.9)] hover:shadow-[0_28px_60px_-26px_rgba(23,14,7,0.95)] transition-all"
                  >
                    <span className="relative w-12 h-12 rounded-full bg-brass/20 flex items-center justify-center shrink-0">
                      <Navigation className="w-5 h-5 text-brass" />
                    </span>
                    <span className="relative flex-1">
                      <span className="eyebrow text-brass-soft block mb-1">how to find us</span>
                      <span className="font-serif italic text-xl text-white block leading-tight">Get directions</span>
                    </span>
                    <ArrowUpRight className="relative w-5 h-5 text-brass-soft transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <p className="text-xs text-text-muted mt-2.5 px-1">
                    Opens in Apple Maps, Google Maps or your default maps app.
                  </p>
                </div>
              </FadeIn>

              {/* Form */}
              <FadeIn delay={0.15} className="lg:col-span-7 bg-white p-7 md:p-10 lg:p-12 rounded-[24px] border border-border shadow-sm">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-sage mx-auto mb-6" />
                    <h2 className="text-2xl mb-4 font-serif italic">Gracias - we'll be in touch soon.</h2>
                    <p className="text-text-muted text-lg mb-8">We aim to respond within one working day.</p>
                    <Button href="/" variant="ghost">Back to home</Button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <span className="inline-flex items-center gap-3 mb-3 text-sage">
                        <span className="w-10 rule-brass" />
                        <span className="eyebrow">drop us a line</span>
                      </span>
                      <h2 className="font-serif italic leading-[1.05] [font-size:clamp(26px,3.4vw,38px)]">
                        Reserve a table or ask us anything
                      </h2>
                    </div>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setSubmitting(true);
                        setError("");
                        const form = e.currentTarget;
                        const data = new FormData(form);
                        data.append("access_key", web3formsKey);
                        data.append("subject", `Cafeina enquiry from ${data.get("firstName")} ${data.get("lastName")}`);
                        data.append("from_name", "Cafeina Contact Form");
                        try {
                          const res = await fetch("https://api.web3forms.com/submit", {
                            method: "POST",
                            body: data,
                          });
                          const result = await res.json();
                          if (result.success) {
                            setSubmitted(true);
                          } else {
                            setError(`Something went wrong. Please try again or email us directly at ${email}.`);
                          }
                        } catch {
                          setError(`Something went wrong. Please try again or email us directly at ${email}.`);
                        } finally {
                          setSubmitting(false);
                        }
                      }}
                      className="space-y-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-text-body mb-2" htmlFor="firstName">First name <span className="text-red-500">*</span></label>
                          <input name="firstName" id="firstName" required className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-brass focus:border-transparent focus:outline-none transition-all bg-ivory/60" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-body mb-2" htmlFor="lastName">Last name <span className="text-red-500">*</span></label>
                          <input name="lastName" id="lastName" required className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-brass focus:border-transparent focus:outline-none transition-all bg-ivory/60" />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-text-body mb-2" htmlFor="email">Email <span className="text-red-500">*</span></label>
                          <input name="email" id="email" type="email" required className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-brass focus:border-transparent focus:outline-none transition-all bg-ivory/60" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-body mb-2" htmlFor="phone">Phone</label>
                          <input name="phone" id="phone" type="tel" className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-brass focus:border-transparent focus:outline-none transition-all bg-ivory/60" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-body mb-2" htmlFor="enquiryType">What's this about?</label>
                        <select name="enquiryType" id="enquiryType" className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-brass focus:border-transparent focus:outline-none transition-all bg-ivory/60">
                          <option>Book a table</option>
                          <option>Wine tasting reservation</option>
                          <option>Private event or function</option>
                          <option>General enquiry</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-body mb-2" htmlFor="message">Message <span className="text-red-500">*</span></label>
                        <textarea name="message" id="message" rows={4} required minLength={10} className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-brass focus:border-transparent focus:outline-none transition-all bg-ivory/60 resize-none" placeholder="Let us know the date, number of guests, and anything we should know about dietary needs." />
                      </div>

                      <div className="pt-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" name="consent" required className="w-5 h-5 mt-1 text-teal-deep bg-cream border-border focus:ring-brass rounded" />
                          <span className="text-sm text-text-muted leading-relaxed">
                            I consent to my details being stored to respond to this enquiry. <span className="text-red-500">*</span>
                          </span>
                        </label>
                      </div>

                      {error && (
                        <div className="p-4 bg-red-50 rounded-xl border border-red-200 text-red-800 text-sm">
                          {error}
                        </div>
                      )}

                      <div className="pt-4">
                        <Button type="submit" className="w-full sm:w-auto px-10" disabled={submitting}>
                          {submitting ? "Sending..." : "Send message"}
                        </Button>
                      </div>
                    </form>
                  </>
                )}
              </FadeIn>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
