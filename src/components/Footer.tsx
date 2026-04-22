import { withBase } from "../utils/url";

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Brand */}
          <div>
            <a href={withBase("/")} className="flex items-center gap-3 mb-6">
              <span className="font-serif text-[26px] font-medium text-white tracking-tight">Cafeina</span>
            </a>
            <p className="text-[15px] leading-relaxed mb-6 max-w-sm">
              Relaxing vintage café in La Marina — coffee, afternoon tea & cocktails, family-run since 2009.
            </p>
            <div className="flex flex-col gap-2 text-[14px]">
              <a href="tel:+34635477903" className="hover:text-white transition-colors">+34 635 477 903</a>
              <a href="mailto:hola@cafeinalamarina.com" className="hover:text-white transition-colors">hola@cafeinalamarina.com</a>
              <span>Calle Luis de Gongora, Sector VI–VII Local 43–44</span>
              <span>03177 San Fulgencio (Alicante), Spain</span>
              <span className="pt-2 text-white/50">Open every day · 9am – late</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-medium mb-6">Navigation</h4>
            <ul className="flex flex-col gap-3 text-[15px]">
              <li><a href={withBase("/")} className="hover:text-white transition-colors">Home</a></li>
              <li><a href={withBase("/services")} className="hover:text-white transition-colors">Menu</a></li>
              <li><a href={withBase("/about")} className="hover:text-white transition-colors">About</a></li>
              <li><a href={withBase("/team")} className="hover:text-white transition-colors">Team</a></li>
              <li><a href={withBase("/gallery")} className="hover:text-white transition-colors">Gallery</a></li>
              <li><a href={withBase("/blog")} className="hover:text-white transition-colors">Journal</a></li>
              <li><a href={withBase("/contact")} className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Visit */}
          <div>
            <h4 className="text-white font-medium mb-6">Visit us</h4>
            <ul className="flex flex-col gap-3 text-[15px]">
              <li><a href={withBase("/contact")} className="hover:text-white transition-colors">Book a table</a></li>
              <li><a href={withBase("/services")} className="hover:text-white transition-colors">See the menu</a></li>
              <li><a href={withBase("/about")} className="hover:text-white transition-colors">Our story</a></li>
              <li className="pt-2">
                <a
                  href={withBase("/contact")}
                  className="inline-block px-4 py-2 border border-white/20 rounded hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
                >
                  Book a Table
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm">&copy; {new Date().getFullYear()} Cafeina. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Since 2009", "Family-run", "Homemade cakes", "Table service"].map((badge) => (
              <div key={badge} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80">
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
