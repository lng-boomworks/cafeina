import { useEffect, useRef } from "react";

interface UseParallaxOpts {
  /**
   * Maximum offset in pixels the element will translate as it passes
   * through the viewport. Default 60px.
   */
  intensity?: number;
}

/**
 * Attach gentle scroll-based parallax to an inner <img>/<picture>.
 * Sets a CSS custom property `--parallax-y` on the ref'd element which can
 * be consumed by the image layer, e.g. `transform: translate3d(0, var(--parallax-y), 0)`.
 * No-op when prefers-reduced-motion is set.
 */
export function useParallax<T extends HTMLElement>({ intensity = 60 }: UseParallaxOpts = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.setProperty("--parallax-y", "0px");
      return;
    }

    let rafId = 0;
    let inView = false;

    const update = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // progress: 0 when element centre is at bottom of viewport, 1 when at top
      const centre = rect.top + rect.height / 2;
      const progress = 1 - centre / vh; // ranges roughly -0.5 to 1.5
      // Clamp and map to offset: when element moves from below to above viewport, image
      // drifts slightly upward.
      const clamped = Math.max(-0.5, Math.min(1.5, progress));
      const offset = (0.5 - clamped) * intensity;
      el.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
    };

    const onScroll = () => {
      if (!inView || rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          inView = e.isIntersecting;
          if (inView) update();
        }
      },
      { threshold: 0, rootMargin: "100px 0px" }
    );
    observer.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [intensity]);

  return ref;
}
