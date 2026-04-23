import { useState } from "react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";

interface ContactPageProps {
  heroLabel?: string;
  heroHeading?: string;
  heroSubheading?: string;
  email?: string;
  phone?: string;
  phoneDisplay?: string;
  address?: string;
  hours?: string;
  mapEmbedUrl?: string;
  web3formsKey?: string;
}

const DEFAULT_WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

export function ContactPage({
  heroLabel = "come say hola",
  heroHeading = "Pop in, call, or drop us a line",
  heroSubheading = "Open Mon–Sat from 9am and Sun from 5pm — till late. Table service, homemade cakes, and a warm welcome.",
  email = "hola@cafeinalamarina.com",
  phone = "+34 711 05 13 58",
  phoneDisplay,
  address = "Calle Luis de Gongora Sector VI-VII Local 43-44, 03177 San Fulgencio (Alicante), Spain",
  hours = "Mon–Sat · 9am till late\nSunday · 5pm till late",
  mapEmbedUrl,
  web3formsKey = DEFAULT_WEB3FORMS_KEY,
}: ContactPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const phoneTel = phone.replace(/\s/g, "");
  const displayPhone = phoneDisplay ?? phone;

  // Split address into lines for nicer display
  const addressLines = address.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="bg-cream py-16 md:py-24 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <FadeIn>
              <span className="text-sage font-medium uppercase tracking-wide text-sm mb-4 block">{heroLabel}</span>
              <h1 className="mb-6 font-serif italic">{heroHeading}</h1>
              <p className="text-xl text-text-muted">{heroSubheading}</p>
            </FadeIn>
          </div>
        </section>

        <div className="bg-cream pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <FadeIn className="lg:col-span-4 space-y-5">
                <a href={`mailto:${email}`} className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-border hover:border-teal-mid hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-full bg-teal-pale flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-teal-deep" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-text-muted mb-1">Email us</div>
                    <div className="font-medium text-teal-deep group-hover:underline break-all">{email}</div>
                  </div>
                </a>
                <a href={`tel:${phoneTel}`} className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-border hover:border-teal-mid hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-full bg-teal-pale flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-teal-deep" />
                  </div>
                  <div>
                    <div className="text-sm text-text-muted mb-1">Call us</div>
                    <div className="font-medium text-teal-deep group-hover:underline">{displayPhone}</div>
                  </div>
                </a>
                <div className="flex items-center gap-4 p-6 bg-teal-deep text-white rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-teal-light/80 mb-1">Open hours</div>
                    <div className="font-medium leading-relaxed">
                      {hours.split("\n").map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-ivory rounded-2xl border border-border">
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin className="w-5 h-5 text-teal-deep shrink-0 mt-0.5" />
                    <h4 className="font-medium text-teal-deep">Find us</h4>
                  </div>
                  <address className="text-sm text-text-muted leading-relaxed not-italic">
                    {addressLines.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </address>
                  {mapEmbedUrl ? (
                    <div className="mt-4 aspect-[4/3] rounded-xl overflow-hidden border border-border/50">
                      <iframe
                        title="Map to Cafeina La Marina"
                        src={mapEmbedUrl}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full border-0"
                      />
                    </div>
                  ) : (
                    <div className="mt-4 aspect-[4/3] rounded-xl bg-teal-pale border border-border/50 flex items-center justify-center">
                      <span className="text-text-muted text-sm text-center px-4">Map coming soon</span>
                    </div>
                  )}
                </div>
              </FadeIn>

              <FadeIn delay={0.15} className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[24px] border border-border shadow-sm">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-sage mx-auto mb-6" />
                    <h2 className="text-2xl mb-4 font-serif italic">Gracias — we'll be in touch soon.</h2>
                    <p className="text-text-muted text-lg mb-8">We aim to respond within one working day.</p>
                    <Button href="/" variant="ghost">Back to home</Button>
                  </div>
                ) : (
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
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-body mb-2" htmlFor="firstName">First name <span className="text-red-500">*</span></label>
                        <input name="firstName" id="firstName" required className="w-full px-4 py-3 rounded-lg border border-border focus:ring-teal-mid focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-cream/50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-body mb-2" htmlFor="lastName">Last name <span className="text-red-500">*</span></label>
                        <input name="lastName" id="lastName" required className="w-full px-4 py-3 rounded-lg border border-border focus:ring-teal-mid focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-cream/50" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-body mb-2" htmlFor="email">Email <span className="text-red-500">*</span></label>
                        <input name="email" id="email" type="email" required className="w-full px-4 py-3 rounded-lg border border-border focus:ring-teal-mid focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-cream/50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-body mb-2" htmlFor="phone">Phone</label>
                        <input name="phone" id="phone" type="tel" className="w-full px-4 py-3 rounded-lg border border-border focus:ring-teal-mid focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-cream/50" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-body mb-2" htmlFor="enquiryType">What's this about?</label>
                      <select name="enquiryType" id="enquiryType" className="w-full px-4 py-3 rounded-lg border border-border focus:ring-teal-mid focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-cream/50">
                        <option>Book a table</option>
                        <option>Wine tasting reservation</option>
                        <option>Private event or function</option>
                        <option>Loyalty club / 25% off</option>
                        <option>General enquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-body mb-2" htmlFor="message">Message <span className="text-red-500">*</span></label>
                      <textarea name="message" id="message" rows={4} required minLength={10} className="w-full px-4 py-3 rounded-lg border border-border focus:ring-teal-mid focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-cream/50 resize-none" placeholder="Let us know the date, number of guests, and anything we should know about dietary needs." />
                    </div>

                    <div className="pt-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" name="consent" required className="w-5 h-5 mt-1 text-teal-deep bg-cream border-border focus:ring-teal-mid rounded" />
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

                    <div className="pt-6">
                      <Button type="submit" className="w-full sm:w-auto px-10" disabled={submitting}>
                        {submitting ? "Sending..." : "Send message"}
                      </Button>
                    </div>
                  </form>
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
