"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { ASSETS } from "../data/content";

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLElement>(null);
  const [videoDone, setVideoDone] = useState(false);

  // When video ends -> fade it out, then reveal hero content
  const handleEnded = () => {
    if (!wrapRef.current) {
      setVideoDone(true);
      return;
    }
    const videoEl = wrapRef.current.querySelector("[data-hero-video]");
    if (videoEl) {
      gsap.to(videoEl, {
        opacity: 0,
        duration: 1.6,
        ease: "power2.inOut",
        onComplete: () => setVideoDone(true),
      });
    } else {
      setVideoDone(true);
    }
  };

  // Reveal hero content with stagger after video done
  useEffect(() => {
    if (!videoDone) return;
    const els = wrapRef.current?.querySelectorAll("[data-hero-anim]") || [];
    gsap.fromTo(
      els,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      }
    );
  }, [videoDone]);

  // Fallback: if video fails to load or takes too long, reveal hero after timeout
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onError = () => handleEnded();
    v.addEventListener("error", onError);
    // safety timeout
    const t = setTimeout(() => {
      if (!videoDone) handleEnded();
    }, 14000);
    return () => {
      v.removeEventListener("error", onError);
      clearTimeout(t);
    };
  }, [videoDone]);

  // Subtle parallax on background image
  useEffect(() => {
    if (!videoDone) return;
    const img = wrapRef.current?.querySelector("[data-hero-bg]") as HTMLElement | null;
    if (!img) return;
    const onScroll = () => {
      const y = window.scrollY;
      img.style.transform = `scale(1.06) translateY(${y * 0.15}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [videoDone]);

  const scrollToAbout = () => {
    const el = document.querySelector("#about");
    if (el)
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 72,
        behavior: "smooth",
      });
  };

  return (
    <section
      id="hero"
      ref={wrapRef}
      data-testid="hero-section"
      className="relative w-full h-screen min-h-[640px] overflow-hidden bg-charcoal"
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-hero-bg
        src={ASSETS.heroRender}
        alt="Aarambh Imperial building render"
        className="absolute inset-0 w-full h-full object-cover scale-105"
        style={{ willChange: "transform" }}
      />

      {/* Overlay gradient — darker for text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* Construction video — fades to reveal hero */}
      <video
        ref={videoRef}
        data-hero-video
        data-testid="hero-loader-video"
        className="absolute inset-0 w-full h-full object-cover z-20"
        src={ASSETS.heroVideo}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
      />

      {/* Hero content */}
      <div className="relative z-30 h-full flex flex-col justify-end pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-10">
          <span
            data-hero-anim
            className="inline-block text-gold uppercase tracking-widestx text-xs md:text-sm font-semibold opacity-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            data-testid="hero-location-label"
          >
            Mulund West, Mumbai
          </span>

          <h1
            data-hero-anim
            data-testid="hero-title"
            className="font-serif text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5.75rem] leading-[0.95] tracking-tight mt-5 opacity-0 drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]"
            style={{ fontWeight: 500 }}
          >
            Aarambh <span className="italic text-gold font-light">Imperial</span>
          </h1>

          <p
            data-hero-anim
            data-testid="hero-subtitle"
            className="text-white text-lg md:text-2xl mt-6 font-light tracking-wide opacity-0 max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
          >
            Premium Residences. Timeless Living.
          </p>

          <div
            data-hero-anim
            className="mt-10 flex flex-col sm:flex-row gap-4 opacity-0"
          >
            <a
              href="#residences"
              data-testid="hero-explore-cta"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector("#residences");
                if (el)
                  window.scrollTo({
                    top: el.getBoundingClientRect().top + window.scrollY - 72,
                    behavior: "smooth",
                  });
              }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-teal text-white text-sm uppercase tracking-widestx font-medium hover:bg-teal-dark transition-all duration-300 hover:shadow-lift"
            >
              Explore Residences
            </a>
            <a
              href="#contact"
              data-testid="hero-brochure-cta"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector("#contact");
                if (el)
                  window.scrollTo({
                    top: el.getBoundingClientRect().top + window.scrollY - 72,
                    behavior: "smooth",
                  });
              }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/70 text-white text-sm uppercase tracking-widestx font-medium hover:bg-white hover:text-charcoal transition-all duration-300"
            >
              Download Brochure
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToAbout}
          data-testid="hero-scroll-indicator"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors opacity-0"
          data-hero-anim
          aria-label="Scroll down"
        >
          <span className="text-[10px] uppercase tracking-widestx">Scroll</span>
          <ChevronDown size={18} className="animate-floaty" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
