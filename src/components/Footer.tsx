import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { withBase } from "../utils/url";

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

interface FooterProps {
  socialFacebook?: string;
  socialInstagram?: string;
}

export function Footer({
  socialFacebook = "https://www.facebook.com/cafeinavintage",
  socialInstagram = "https://www.instagram.com/cafeinalamarina/",
}: FooterProps = {}) {
  return (
    <footer className="relative bg-espresso text-white/65 overflow-hidden grain">
      {/* Oversized brand statement band */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <span className="eyebrow text-brass">La Marina · since 2009</span>
          <p className="mt-5 font-serif italic text-white/90 leading-[1.1] text-balance [font-size:clamp(34px,5.5vw,68px)]">
            The best little bar on
            <br className="hidden sm:block" /> the urbanisation.
          </p>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/55">
            Coffee, tea, homemade cakes &amp; craft cocktails — with table service and a warm welcome.
            Same heart, more space: we're doubling in size.
          </p>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-10">
          {/* Address */}
          <div>
            <a href={withBase("/")} className="inline-flex items-center gap-3 mb-6" aria-label="Cafeina — home">
              <picture>
                <source srcSet={withBase("/images/brand/cafeina-logo-white.webp")} type="image/webp" />
                <img src={withBase("/images/brand/cafeina-logo-white.png")} alt="Cafeina" width={579} height={195} className="h-11 w-auto" />
              </picture>
            </a>
            <h4 className="eyebrow text-white/80 mb-4 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-brass" /> Our Address
            </h4>
            <address className="not-italic text-[15px] leading-relaxed">
              Calle Luis de Gongora<br />
              Sector VI–VII, Local 43–44<br />
              03177 San Fulgencio<br />
              (Alicante), Spain
            </address>
          </div>

          {/* Opening Hours + Nav */}
          <div>
            <h4 className="eyebrow text-white/80 mb-4 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-brass" /> Opening Hours
            </h4>
            <p className="text-[15px] leading-relaxed mb-8">
              <span className="text-white/45">Mon – Sat</span>&nbsp;&nbsp;·&nbsp;&nbsp;9am till late<br />
              <span className="text-white/45">Sunday</span>&nbsp;&nbsp;·&nbsp;&nbsp;5pm till late
            </p>
            <h4 className="eyebrow text-white/80 mb-4">Explore</h4>
            <ul className="grid grid-cols-2 gap-2 text-[14px]">
              <li><a href={withBase("/menu")} className="hover:text-brass-soft transition-colors">Menu</a></li>
              <li><a href={withBase("/about")} className="hover:text-brass-soft transition-colors">Our story</a></li>
              <li><a href={withBase("/events")} className="hover:text-brass-soft transition-colors">Events</a></li>
              <li><a href={withBase("/team")} className="hover:text-brass-soft transition-colors">Team</a></li>
              <li><a href={withBase("/gallery")} className="hover:text-brass-soft transition-colors">Gallery</a></li>
              <li><a href={withBase("/contact")} className="hover:text-brass-soft transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="eyebrow text-white/80 mb-4 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-brass" /> Contact
            </h4>
            <div className="flex flex-col gap-3 text-[15px] mb-8">
              <a href="tel:+34711051358" className="flex items-center gap-2 hover:text-brass-soft transition-colors">
                <Phone className="w-4 h-4 shrink-0 text-white/35" />
                +34 711 05 13 58
              </a>
              <a href="mailto:hola@cafeinalamarina.com" className="flex items-center gap-2 hover:text-brass-soft transition-colors break-all">
                <Mail className="w-4 h-4 shrink-0 text-white/35" />
                hola@cafeinalamarina.com
              </a>
            </div>
            <h4 className="eyebrow text-white/80 mb-4">Follow us</h4>
            <div className="flex items-center gap-3">
              <a href={socialFacebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brass hover:text-espresso hover:border-brass transition-colors">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href={socialInstagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brass hover:text-espresso hover:border-brass transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-white/45">&copy; {new Date().getFullYear()} Cafeina La Marina. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Since 2009", "Family-run", "Fresh cakes daily", "Table service"].map((badge) => (
              <div key={badge} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/70">
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
