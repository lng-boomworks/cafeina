import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "./Button";
import { withBase } from "../utils/url";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function Navbar() {
  const [location, setLocation] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    setLocation(BASE && path.startsWith(BASE) ? path.slice(BASE.length) || "/" : path);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Team", path: "/team" },
    { name: "Gallery", path: "/gallery" },
    { name: "Journal", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-cream/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        <a href={withBase("/")} className="flex items-center gap-3 group">
          <span className="font-serif text-[26px] font-medium text-teal-deep tracking-tight">Cafeina</span>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-5">
            {navLinks.map((link) => (
              <li key={link.path}>
                <a
                  href={withBase(link.path)}
                  className={`text-[15px] font-medium transition-colors hover:text-teal-deep ${
                    location === link.path ? "text-teal-deep" : "text-text-muted"
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <a href="tel:+34635477903" className="flex items-center gap-1.5 text-[15px] font-medium text-teal-deep hover:opacity-80 transition-colors">
                <Phone className="w-3.5 h-3.5" />
                +34 635 477 903
              </a>
              <span className="text-[12px] text-text-muted">Open every day 9am – late</span>
            </div>
            <Button href="/contact">
              Book a table
            </Button>
          </div>
        </nav>
        <button
          className="lg:hidden p-2 text-teal-deep"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      <div
        className={`lg:hidden absolute top-[72px] left-0 right-0 bg-cream/98 backdrop-blur-xl border-b border-border transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 flex flex-col gap-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <a
                  href={withBase(link.path)}
                  className={`block text-lg font-medium transition-colors ${
                    location === link.path ? "text-teal-deep" : "text-text-muted"
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="pt-4 border-t border-border flex flex-col gap-3">
            <a
              href="tel:+34635477903"
              className="flex items-center justify-center gap-2 w-full px-7 py-3.5 rounded-lg text-[15px] font-medium border-[1.5px] border-teal-mid text-teal-deep hover:bg-teal-pale transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              +34 635 477 903
            </a>
            <span className="text-center text-[13px] text-text-muted -mt-1">Open every day 9am – late</span>
            <Button href="/contact" className="w-full">
              Book a table
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
