"use client";
import Lenis from "lenis";
import { FC, ReactNode, useEffect } from "react";

type LenisScrollProviderProps = {
  children: ReactNode;
};

// a smooth scroll provider using lenis

const LenisScrollProvider: FC<LenisScrollProviderProps> = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.5,
      smoothWheel: true,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId); // Cleanup animation frame
      lenis.destroy(); // Cleanup Lenis instance
    };
  }, []);

  return <>{children}</>;
};

export default LenisScrollProvider;