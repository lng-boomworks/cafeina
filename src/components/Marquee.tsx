import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop. Larger = slower. */
  duration?: number;
  className?: string;
}

/**
 * Seamless horizontal marquee. Renders the track twice so the CSS animation
 * (translateX -50%) loops without a seam. Decorative — marked aria-hidden.
 * Animation is disabled under prefers-reduced-motion (see global.css).
 */
export function Marquee({ children, duration = 32, className = "" }: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className="marquee-track" style={{ ["--marquee-duration" as string]: `${duration}s` }}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
    </div>
  );
}
