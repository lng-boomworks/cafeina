import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "./Button";
import { withBase } from "../utils/url";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const navLinks = [
  {
    name: "Menu",
    path: "/menu",
    dropdown: [
      { name: "Cocktails", path: "/menu/cocktails" },
      { name: "Spirits", path: "/menu/spirits" },
      { name: "Wine & Beer", path: "/menu/wine-beer" },
      { name: "Beverages", path: "/menu/beverages" },
      { name: "Cakes & Snacks", path: "/menu/cakes-snacks" },
    ],
  },
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

  useEffect(() => {
    const path = window.location.pathname;
    setLocation(BASE && path.startsWith(BASE) ? path.slice(BASE.length) || "/" : path);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

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

  const isActive = (linkPath: string, hasDropdown?: boolean) => {
    if (linkPath === "/") return location === "/";
    if (hasDropdown) return location.startsWith(linkPath);
    return location === linkPath;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-cream/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        <a href={withBase("/")} className="flex items-center gap-3 group" aria-label="Cafeina — home">
          <picture>
            <source srcSet={withBase("/images/brand/cafeina-logo-brown.webp")} type="image/webp" />
            <img
              src={withBase("/images/brand/cafeina-logo-brown.png")}
              alt="Cafeina"
              width={579}
              height={195}
              className="h-10 w-auto md:h-11"
            />
          </picture>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-5">
            {navLinks.map((link) => {
              if (link.dropdown) {
                const isOpen = openDropdown === link.name;
                return (
                  <li key={link.path} className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(isOpen ? null : link.name)}
                      onMouseEnter={() => setOpenDropdown(link.name)}
                      className={`flex items-center gap-1 text-[15px] font-medium transition-colors hover:text-teal-deep ${
                        isActive(link.path, true) ? "text-teal-deep" : "text-text-muted"
                      }`}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      {link.name}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    <div
                      onMouseLeave={() => setOpenDropdown(null)}
                      className={`absolute top-full left-0 mt-3 min-w-[220px] bg-cream border border-border rounded-xl shadow-lg overflow-hidden transition-all duration-200 ${
                        isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
                      }`}
                    >
                      <a
                        href={withBase(link.path)}
                        className="block px-5 py-3 text-[14px] font-medium text-teal-deep hover:bg-teal-pale transition-colors border-b border-border/40"
                      >
                        View all menus
                      </a>
                      {link.dropdown.map((sub) => (
                        <a
                          key={sub.path}
                          href={withBase(sub.path)}
                          className={`block px-5 py-3 text-[14px] transition-colors hover:bg-teal-pale ${
                            location === sub.path ? "text-teal-deep bg-teal-pale/50" : "text-text-muted"
                          }`}
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  </li>
                );
              }
              return (
                <li key={link.path}>
                  <a
                    href={withBase(link.path)}
                    className={`text-[15px] font-medium transition-colors hover:text-teal-deep ${
                      isActive(link.path) ? "text-teal-deep" : "text-text-muted"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <a href="tel:+34711051358" className="flex items-center gap-1.5 text-[15px] font-medium text-teal-deep hover:opacity-80 transition-colors">
                <Phone className="w-3.5 h-3.5" />
                +34 711 05 13 58
              </a>
              <span className="text-[12px] text-text-muted">Open every day · till late</span>
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
          isMobileMenuOpen ? "max-h-[80vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 flex flex-col gap-4">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => {
              if (link.dropdown) {
                const expanded = mobileMenuExpanded === link.name;
                return (
                  <li key={link.path}>
                    <button
                      onClick={() => setMobileMenuExpanded(expanded ? null : link.name)}
                      className={`flex items-center justify-between w-full text-lg font-medium ${
                        isActive(link.path, true) ? "text-teal-deep" : "text-text-muted"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                    </button>
                    <div
                      className={`pl-4 mt-2 flex flex-col gap-2 overflow-hidden transition-all ${
                        expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <a
                        href={withBase(link.path)}
                        className="py-1 text-[15px] text-teal-deep font-medium"
                      >
                        View all menus →
                      </a>
                      {link.dropdown.map((sub) => (
                        <a
                          key={sub.path}
                          href={withBase(sub.path)}
                          className={`py-1 text-[15px] ${
                            location === sub.path ? "text-teal-deep" : "text-text-muted"
                          }`}
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  </li>
                );
              }
              return (
                <li key={link.path}>
                  <a
                    href={withBase(link.path)}
                    className={`block text-lg font-medium transition-colors ${
                      isActive(link.path) ? "text-teal-deep" : "text-text-muted"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="pt-4 border-t border-border flex flex-col gap-3">
            <a
              href="tel:+34711051358"
              className="flex items-center justify-center gap-2 w-full px-7 py-3.5 rounded-lg text-[15px] font-medium border-[1.5px] border-teal-mid text-teal-deep hover:bg-teal-pale transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              +34 711 05 13 58
            </a>
            <span className="text-center text-[13px] text-text-muted -mt-1">Open every day · till late</span>
            <Button href="/contact" className="w-full">
              Book a table
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
