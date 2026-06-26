import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register scroll trigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reveal all elements with [data-reveal] inside the given root
 * using a subtle fade-in-up on scroll.
 */
export function useReveal(rootRef: React.RefObject<HTMLElement | null> | React.RefObject<null>) {
  useEffect(() => {
    const root = (rootRef && "current" in rootRef ? rootRef.current : null) || document.body;
    
    const ctx = gsap.context(() => {
      const els = root.querySelectorAll("[data-reveal]");
      els.forEach((el) => {
        const delay = parseFloat(el.getAttribute("data-reveal-delay") || "0");
        gsap.fromTo(
          el,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}
