import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "./Button";
import { withBase } from "../utils/url";
import { getCategoryNavLinks } from "../utils/menu";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

// Menu dropdown derived from menu.json categories (bundled at build).
const navLinks = [
  { name: "Menu", path: "/menu", dropdown: getCategoryNavLinks("en") },
  { name: "About", path: "/about" },
  { name: "Team", path: "/team" },
  { name: "Events", path: "/events" },
  { name: "Gallery", path: "/gallery" },
  { name: "Journal", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [location, setLocation] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Home page lets the bar sit transparent over the dark hero until scroll.
  const isHome = location === "/";
  const overHero = isHome && !isScrolled;

  useEffect(() => {
    const path = window.location.pathname;
    setLocation(BASE && path.startsWith(BASE) ? path.slice(BASE.length) || "/" : path);
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isActive = (linkPath: string, hasDropdown?: boolean) => {
    if (linkPath === "/") return location === "/";
    if (hasDropdown) return location.startsWith(linkPath);
    return location === linkPath;
  };

  const linkColor = overHero ? "text-white/85 hover:text-white" : "text-text-muted hover:text-teal-deep";
  const logoBrown = !overHero;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        overHero
          ? "bg-transparent"
          : "bg-cream/90 backdrop-blur-md shadow-[0_1px_0_0_var(--color-border)] border-b border-border"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        <a href={withBase("/")} className="flex items-center gap-3 group" aria-label="Cafeina — home">
          <picture>
            <source
              srcSet={withBase(logoBrown ? "/images/brand/cafeina-logo-brown.webp" : "/images/brand/cafeina-logo-white.webp")}
              type="image/webp"
            />
            <img
              src={withBase(logoBrown ? "/images/brand/cafeina-logo-brown.png" : "/images/brand/cafeina-logo-white.png")}
              alt="Cafeina"
              width={579}
              height={195}
              className="h-10 w-auto md:h-11 transition-opacity duration-300"
            />
          </picture>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => {
              if (link.dropdown) {
                const isOpen = openDropdown === link.name;
                const active = isActive(link.path, true);
                return (
                  <li key={link.path} className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(isOpen ? null : link.name)}
                      onMouseEnter={() => setOpenDropdown(link.name)}
                      className={`group/nav relative flex items-center gap-1 text-[15px] font-medium transition-colors ${linkColor} ${
                        active ? (overHero ? "text-white" : "text-teal-deep") : ""
                      }`}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      {link.name}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      <span
                        className={`absolute -bottom-1.5 left-0 h-[2px] bg-brass transition-all duration-300 ${
                          active ? "w-full" : "w-0 group-hover/nav:w-full"
                        }`}
                      />
                    </button>
                    <div
                      onMouseLeave={() => setOpenDropdown(null)}
                      className={`absolute top-full left-0 mt-3 min-w-[230px] bg-cream border border-border rounded-2xl shadow-xl overflow-hidden transition-all duration-200 ${
                        isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
                      }`}
                    >
                      <a
                        href={withBase(link.path)}
                        className="block px-5 py-3 text-[13px] font-medium uppercase tracking-wider text-sage hover:bg-teal-pale transition-colors border-b border-border/50"
                      >
                        View all menus
                      </a>
                      {link.dropdown.map((sub) => (
                        <a
                          key={sub.path}
                          href={withBase(sub.path)}
                          className="block px-5 py-2.5 text-[14px] text-text-muted hover:bg-teal-pale hover:text-teal-deep transition-colors"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  </li>
                );
              }
              const active = isActive(link.path);
              return (
                <li key={link.path}>
                  <a
                    href={withBase(link.path)}
                    className={`group/nav relative text-[15px] font-medium transition-colors ${linkColor} ${
                      active ? (overHero ? "text-white" : "text-teal-deep") : ""
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-[2px] bg-brass transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover/nav:w-full"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-5">
            <a
              href="tel:+34711051358"
              className={`flex items-center gap-1.5 text-[14px] font-medium transition-colors ${
                overHero ? "text-white/85 hover:text-white" : "text-teal-deep hover:opacity-80"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              +34 711 05 13 58
            </a>
            <Button variant={overHero ? "white" : "primary"} href="/contact">
              Reserve a table
            </Button>
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden p-2 transition-colors ${overHero ? "text-white" : "text-teal-deep"}`}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Full-screen mobile overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] bg-espresso text-white transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex items-center justify-between h-[72px] px-4 sm:px-6 border-b border-white/10">
          <picture>
            <source srcSet={withBase("/images/brand/cafeina-logo-white.webp")} type="image/webp" />
            <img src={withBase("/images/brand/cafeina-logo-white.png")} alt="Cafeina" width={579} height={195} className="h-10 w-auto" />
          </picture>
          <button className="p-2 text-white" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="h-[calc(100%-72px)] overflow-y-auto px-6 py-8 flex flex-col">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              if (link.dropdown) {
                const expanded = mobileMenuExpanded === link.name;
                return (
                  <li key={link.path} className="border-b border-white/10">
                    <button
                      onClick={() => setMobileMenuExpanded(expanded ? null : link.name)}
                      className="flex items-center justify-between w-full py-4 text-3xl font-serif italic text-white"
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-5 h-5 text-brass transition-transform ${expanded ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`overflow-hidden transition-all ${expanded ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="flex flex-col gap-1 pl-1">
                        <a href={withBase(link.path)} className="py-1.5 text-[15px] text-brass-soft">View all menus →</a>
                        {link.dropdown.map((sub) => (
                          <a key={sub.path} href={withBase(sub.path)} className="py-1.5 text-[15px] text-white/70 hover:text-white">
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }
              return (
                <li key={link.path} className="border-b border-white/10">
                  <a href={withBase(link.path)} className="block py-4 text-3xl font-serif italic text-white hover:text-brass-soft transition-colors">
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto pt-8 flex flex-col gap-4">
            <p className="text-sm text-white/50 uppercase tracking-wider">Mon–Sat 9am · Sun 5pm · till late</p>
            <a href="tel:+34711051358" className="flex items-center gap-2 text-lg text-white">
              <Phone className="w-4 h-4 text-brass" /> +34 711 05 13 58
            </a>
            <Button variant="white" href="/contact" className="w-full">Reserve a table</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
