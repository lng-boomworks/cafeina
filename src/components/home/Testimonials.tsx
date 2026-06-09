import { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Autoplay, EffectFade, Pagination, Keyboard, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { FadeIn } from "../FadeIn";
import { withBase } from "../../utils/url";
import { Quote } from "lucide-react";

export interface TestimonialData {
  quote: string;
  author: string;
  role?: string;
  image?: string;
  image_alt?: string;
  order?: number;
}

interface TestimonialsProps {
  items: TestimonialData[];
  heading?: string;
  eyebrow?: string;
}

export function Testimonials({
  items,
  heading = "Kind words from our guests",
  eyebrow = "what people say",
}: TestimonialsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || items.length === 0) return;
    const swiperInstance = new Swiper(el, {
      modules: [Autoplay, EffectFade, Pagination, Keyboard, A11y],
      loop: items.length > 1,
      effect: "fade",
      fadeEffect: { crossFade: true },
      speed: 700,
      autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
      pagination: { el: el.querySelector<HTMLElement>(".swiper-pagination") ?? undefined, clickable: true },
      keyboard: { enabled: true },
      a11y: { enabled: true, prevSlideMessage: "Previous testimonial", nextSlideMessage: "Next testimonial" },
    });
    return () => swiperInstance.destroy(true, true);
  }, [items.length]);

  return (
    <section className="relative bg-espresso text-white py-20 md:py-28 overflow-hidden grain">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reputation pull-quote */}
        <FadeIn className="text-center mb-14 md:mb-16">
          <span className="inline-flex items-center gap-3 mb-6 text-brass-soft">
            <span className="w-10 rule-brass" />
            <span className="eyebrow">{eyebrow}</span>
            <span className="w-10 rule-brass" />
          </span>
          <p className="font-serif italic text-white text-balance mx-auto max-w-3xl [font-size:clamp(30px,4.4vw,58px)] [line-height:1.05]">
            &ldquo;The best little bar on the La&nbsp;Marina urbanisation.&rdquo;
          </p>
          <p className="mt-5 text-white/55 text-sm uppercase tracking-[0.2em]">- the locals</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            ref={containerRef}
            className="swiper relative bg-espresso-soft/80 rounded-[24px] border border-white/10 overflow-hidden backdrop-blur-sm"
            style={{
              ["--swiper-pagination-color" as string]: "var(--color-brass)",
              ["--swiper-pagination-bullet-inactive-color" as string]: "#ffffff",
            }}
          >
            <div className="swiper-wrapper">
              {items.map((t, i) => (
                <div key={`${t.author}-${i}`} className="swiper-slide">
                  <div className="grid md:grid-cols-5 gap-0">
                    {t.image && (
                      <div className="md:col-span-2 aspect-[4/3] md:aspect-auto bg-espresso overflow-hidden">
                        <img src={withBase(t.image)} alt={t.image_alt ?? ""} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    )}
                    <div className={`${t.image ? "md:col-span-3" : "md:col-span-5"} p-8 md:p-12 pb-16 flex flex-col justify-center`}>
                      <Quote className="w-8 h-8 text-brass mb-4" strokeWidth={1.5} />
                      <blockquote className="font-serif italic text-[20px] md:text-[23px] leading-[1.5] text-white mb-6 text-balance">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                      <div>
                        <p className="font-semibold text-white">{t.author}</p>
                        {t.role && <p className="text-sm text-white/55">{t.role}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {items.length > 1 && <div className="swiper-pagination !bottom-4" />}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
