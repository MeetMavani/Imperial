"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowUpRight, ChevronDown, MapPin } from "lucide-react";
import { ASSETS } from "../data/content";

const HERO_DETAILS = [
  { value: "Mulund West", label: "Mumbai" },
  { value: "2 & 3 BHK", label: "Premium residences" },
  { value: "18,000 sq.ft.", label: "Lifestyle amenities" },
];

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLElement>(null);
  const introFinished = useRef(false);
  const [videoDone, setVideoDone] = useState(false);

  const finishIntro = () => {
    if (introFinished.current) return;
    introFinished.current = true;

    const videoEl = wrapRef.current?.querySelector("[data-hero-video]");
    if (!videoEl) {
      setVideoDone(true);
      return;
    }

    gsap.to(videoEl, {
      opacity: 0,
      scale: 1.02,
      duration: 1.1,
      ease: "power3.inOut",
      onComplete: () => setVideoDone(true),
    });
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onError = () => finishIntro();
    v.addEventListener("error", onError);

    const timer = window.setTimeout(() => {
      if (!introFinished.current) finishIntro();
    }, 11000);

    return () => {
      v.removeEventListener("error", onError);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!videoDone) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-media]",
        { scale: 1.08 },
        { scale: 1, duration: 1.6, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-hero-anim]",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.05,
        }
      );
    }, wrapRef);

    return () => ctx.revert();
  }, [videoDone]);

  useEffect(() => {
    if (!videoDone) return;

    const media = wrapRef.current?.querySelector("[data-hero-media]") as HTMLElement | null;
    if (!media) return;

    const onScroll = () => {
      media.style.transform = `translate3d(0, ${window.scrollY * 0.08}px, 0)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [videoDone]);

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (!el) return;
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
      className="relative h-screen min-h-[680px] w-full overflow-hidden bg-cream text-charcoal"
    >
      <div data-hero-media className="absolute inset-0 will-change-transform">
        <Image
          src={ASSETS.heroRender}
          alt="Aarambh Imperial exterior render"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-[58%_50%]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/42 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-cream/92 via-cream/10 to-cream/10" />
      <div className="absolute left-0 top-0 h-full w-px bg-charcoal/10 md:left-10" />
      <div className="absolute right-0 top-0 hidden h-full w-px bg-charcoal/10 md:right-10 md:block" />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-10 pt-32 md:px-10 md:pb-12">
        <div className="mx-auto grid w-full max-w-7xl items-end gap-10 lg:grid-cols-[0.82fr_1fr]">
          <div className="max-w-3xl">
            <div
              data-hero-anim
              className="flex items-center gap-3 opacity-0"
              data-testid="hero-location-label"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-teal/30 bg-cream/70 text-teal backdrop-blur-sm">
                <MapPin size={15} />
              </span>
              <span className="text-xs font-semibold uppercase tracking-widestx text-teal">
                V.P. Road & Kasturba Road, Mulund West
              </span>
            </div>

            <h1
              data-hero-anim
              data-testid="hero-title"
              className="mt-7 max-w-4xl font-serif text-[4.4rem] leading-[0.86] tracking-tight opacity-0 sm:text-[6.2rem] lg:text-[8.4rem]"
              style={{ fontWeight: 500 }}
            >
              Aarambh
              <span className="block italic text-gold-dark">Imperial</span>
            </h1>

            <p
              data-hero-anim
              data-testid="hero-subtitle"
              className="mt-7 max-w-xl text-base leading-relaxed text-muteink opacity-0 md:text-lg"
            >
              Premium residences crafted for calm, connected city living in the
              heart of Mulund West.
            </p>

            <div
              data-hero-anim
              className="mt-9 flex flex-col gap-3 opacity-0 sm:flex-row"
            >
              <a
                href="#residences"
                data-testid="hero-explore-cta"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#residences");
                }}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-charcoal px-7 py-3.5 text-sm font-semibold uppercase tracking-widestx text-cream transition-all duration-300 hover:bg-teal"
              >
                Explore Residences
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="#contact"
                data-testid="hero-brochure-cta"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#contact");
                }}
                className="inline-flex items-center justify-center rounded-full border border-charcoal/20 bg-cream/60 px-7 py-3.5 text-sm font-semibold uppercase tracking-widestx text-charcoal backdrop-blur-sm transition-all duration-300 hover:border-teal hover:text-teal"
              >
                Download Brochure
              </a>
            </div>
          </div>

          <div
            data-hero-anim
            className="grid gap-4 border-y border-charcoal/15 py-5 opacity-0 sm:grid-cols-3 lg:mb-4"
          >
            {HERO_DETAILS.map((detail) => (
              <div key={detail.label}>
                <div className="font-serif text-2xl leading-none tracking-tight text-charcoal md:text-3xl">
                  {detail.value}
                </div>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-widestx text-muteink">
                  {detail.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => scrollTo("#about")}
          data-testid="hero-scroll-indicator"
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-charcoal/70 opacity-0 transition-colors hover:text-charcoal md:flex"
          data-hero-anim
          aria-label="Scroll down"
        >
          <span className="text-[10px] uppercase tracking-widestx">Scroll</span>
          <ChevronDown size={18} className="animate-floaty" />
        </button>
      </div>

      {!videoDone && (
        <div
          data-hero-video
          className="absolute inset-0 z-40 overflow-hidden bg-charcoal text-white"
        >
          <video
            ref={videoRef}
            data-testid="hero-loader-video"
            className="absolute inset-0 h-full w-full object-cover"
            src={ASSETS.heroVideo}
            poster={ASSETS.heroRender}
            autoPlay
            muted
            playsInline
            onEnded={finishIntro}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-charcoal/20" />
          <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-10 md:px-10 md:pb-12">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widestx text-gold">
                  Aarambh Imperial
                </span>
                <p className="mt-3 max-w-xl font-serif text-4xl leading-none tracking-tight md:text-6xl">
                  The reveal begins with the journey home.
                </p>
              </div>
              <button
                type="button"
                onClick={finishIntro}
                className="inline-flex w-fit items-center justify-center rounded-full border border-white/35 px-5 py-2.5 text-xs font-semibold uppercase tracking-widestx text-white transition-colors hover:border-white hover:bg-white hover:text-charcoal"
              >
                Skip Intro
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 z-10 h-1 w-full bg-white/10">
            <div className="h-full w-full origin-left animate-[heroProgress_11s_linear_forwards] bg-gradient-to-r from-teal via-gold to-ember" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
