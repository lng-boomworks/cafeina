import { useEffect, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { withBase } from "../utils/url";

export interface MenuPage {
  slug: string;
  title: string;
  /** Extension-less image base (WebP+JPG). */
  image: string;
}

interface MenuGalleryProps {
  pages: MenuPage[];
  index: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

/**
 * Full-screen lightbox showing the stylised printed menu pages.
 * Keyboard (←/→/Esc), swipe on touch, and category chips to jump pages.
 */
export function MenuGallery({ pages, index, open, onClose, onIndexChange }: MenuGalleryProps) {
  const count = pages.length;
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (delta: number) => {
      if (count === 0) return;
      onIndexChange((index + delta + count) % count);
    },
    [index, count, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, go, onClose]);

  if (!open || count === 0) return null;
  const page = pages[Math.min(index, count - 1)];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="The full Cafeina menu"
      className="fixed inset-0 z-[80] bg-espresso/95 backdrop-blur-sm flex flex-col"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between gap-4 px-4 sm:px-6 h-[64px] shrink-0 text-cream"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-w-0">
          <span className="eyebrow text-brass-soft block leading-none mb-1">the cafeina menu</span>
          <span className="font-serif italic text-lg sm:text-xl text-white truncate block leading-tight">
            {page.title}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-sm text-cream/60 tabular-nums">
            {index + 1} / {count}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Page image + arrows */}
      <div
        className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-16 pb-2"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchStartX.current = null;
        }}
      >
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous page"
          className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-white/10 text-cream hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <picture className="contents">
          <source srcSet={withBase(`${page.image}.webp`)} type="image/webp" />
          <img
            key={page.slug}
            src={withBase(`${page.image}.jpg`)}
            alt={`Cafeina ${page.title} menu`}
            className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
          />
        </picture>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next page"
          className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-white/10 text-cream hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Category chips */}
      <div className="shrink-0 px-3 pb-4 pt-1" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-4xl mx-auto sm:justify-center">
          {pages.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => onIndexChange(i)}
              aria-current={i === index ? "true" : undefined}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium border transition-colors ${
                i === index
                  ? "bg-brass text-espresso border-brass"
                  : "bg-white/5 text-cream/70 border-white/15 hover:border-brass/60 hover:text-cream"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
