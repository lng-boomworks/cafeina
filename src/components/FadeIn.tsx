import { useEffect, useRef, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  /**
   * When set, the wrapper's *direct children* are revealed in sequence with
   * this many seconds between each (on top of `delay`). Omit for the original
   * single-block behaviour. Reveal happens once.
   */
  stagger?: number;
}

const INITIAL_TRANSFORMS: Record<string, string> = {
  up: "translateY(24px)",
  down: "translateY(-24px)",
  left: "translateX(24px)",
  right: "translateX(-24px)",
  none: "none",
};

export function FadeIn({ children, delay = 0, direction = "up", className = "", stagger }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Stagger mode animates each direct child; default mode animates the wrapper.
    const targets: HTMLElement[] =
      stagger != null ? (Array.from(el.children) as HTMLElement[]) : [el];
    if (targets.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      for (const t of targets) {
        t.style.opacity = "1";
        t.style.transform = "none";
      }
      return;
    }

    const initial = INITIAL_TRANSFORMS[direction];
    targets.forEach((t, i) => {
      const d = delay + i * (stagger ?? 0);
      t.style.opacity = "0";
      t.style.transform = initial;
      t.style.transition = `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${d}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${d}s`;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          for (const t of targets) {
            t.style.opacity = "1";
            t.style.transform = "none";
          }
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-30px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
