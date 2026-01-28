"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ReadingProgress() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Context for GSAP cleanup
    const ctx = gsap.context(() => {
      const updateProgress = () => {
        const article = document.querySelector("article");
        if (!article || !progressBarRef.current) return;

        const scrollTop = window.scrollY;
        const articleTop = article.offsetTop;
        const articleHeight = article.scrollHeight;
        const viewportHeight = window.innerHeight;

        const articleBottom = articleTop + articleHeight;
        // Calculate scrollable distance within the article
        const scrollableHeight = articleBottom - viewportHeight;

        // Calculate percentage (0 to 1)
        const progress = Math.min(Math.max(scrollTop / scrollableHeight, 0), 1);

        // AWWWARDS-level smoothness: Use GSAP to animate the scaleX
        // scaleX is much more performant than animating 'width' as it avoids layout reflows
        gsap.to(progressBarRef.current, {
          scaleX: progress,
          duration: 0.4, // Slight lag for that "organic" fluid feel
          ease: "power2.out",
          overwrite: "auto",
        });

        // Optional: Animate the glow opacity based on progress
        if (glowRef.current) {
          gsap.to(glowRef.current, {
            opacity: progress > 0.01 && progress < 0.99 ? 1 : 0,
            duration: 0.3,
          });
        }
      };

      // Add scroll listener with passive option for performance
      window.addEventListener("scroll", updateProgress, { passive: true });
      updateProgress();

      return () => window.removeEventListener("scroll", updateProgress);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none bg-white/5 backdrop-blur-sm"
      aria-hidden="true"
    >
      {/* The Actual Progress Bar */}
      <div
        ref={progressBarRef}
        className="absolute top-0 left-0 w-full h-full bg-yellow-600 origin-left scale-x-0"
        style={{ willChange: "transform" }}
      >
        {/* Aesthetic Glow Tip */}
        <div
          ref={glowRef}
          className="absolute right-0 top-0 h-full w-20 bg-gradient-to-r from-transparent to-white/40 blur-[4px] opacity-0"
        />
      </div>

      {/* Top Border Highlight for extra crispness */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />
    </div>
  );
}
