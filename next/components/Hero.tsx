"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ASSETS } from "../data/content";

interface HeroProps {
  loaded?: boolean;
}

const Hero: React.FC<HeroProps> = ({ loaded = true }) => {
  const wrapRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!loaded) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-media]",
        { scale: 1.04 },
        { scale: 1, duration: 2, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-hero-anim]",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.2,
        }
      );
    }, wrapRef);

    return () => ctx.revert();
  }, [loaded]);

  return (
    <section
      id="hero"
      ref={wrapRef}
      data-testid="hero-section"
      className="relative bg-cream text-charcoal overflow-hidden"
    >
      <h1 className="sr-only">Aarambh Imperial premium residences</h1>

      {/* ─── DESKTOP (md+) ─────────────────────────────────────────────────────── */}
      {/* Natural image height — no top/bottom crop, rounded card with gaps */}
      <div className="hidden md:block relative w-full p-3 lg:p-4">

        {/* Rounded card — image clipped inside */}
        <div data-hero-media className="relative w-full will-change-transform overflow-hidden rounded-2xl lg:rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.14)]">
          <Image
            src={ASSETS.heroRender}
            alt="Aarambh Imperial exterior render"
            width={1920}
            height={1080}
            className="w-full h-screen object-cover block"
            priority
            sizes="100vw"
          />
          {/* Gradients overlaid on the img for text legibility */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-cream/70 via-cream/5 to-transparent" /> */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-cream/30 via-transparent to-transparent" /> */}
          {/* Subtle inner border */}
          <div className="absolute inset-0 rounded-[inherit] border border-white/30 pointer-events-none z-20" />
        </div>

        {/* Text — absolutely positioned over the image card */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-8 lg:px-12 xl:px-16">
          
          <div className="max-w-[480px] xl:max-w-[560px] flex flex-col gap-6 lg:gap-8">
            {/* Logo */}
            <div data-hero-anim className="opacity-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/hero-logo.webp"
                alt="Aarambh Imperial"
                className="h-24 lg:h-28 xl:h-32 w-auto object-contain block"
              />
            </div>

            {/* Content block (BHK, Location, Tagline) */}
            <div>
              {/* BHK & Location Details */}
              <div data-hero-anim className="space-y-1 opacity-0">
                <div className="font-serif text-lg lg:text-xl xl:text-2xl text-teal">
                  2 &amp; 3 BHK Premium Apartments
                </div>
                <div className="text-xs lg:text-sm xl:text-base text-gold-dark font-medium tracking-wide">
                  V.P. Road, Mulund West
                </div>
              </div>

              <div
                data-hero-anim
                className="my-5 flex items-center gap-4 opacity-0"
              >
                <div className="h-px w-10 bg-charcoal/20" />
                <span className="text-sm text-gold-dark">◊</span>
                <div className="h-px w-10 bg-charcoal/20" />
              </div>

              <p
                data-hero-anim
                className="text-sm lg:text-base leading-relaxed text-muteink opacity-0 max-w-[340px]"
              >
                Aarambh Imperial is crafted for those who desire more from life.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ─── MOBILE (< md) ──────────────────────────────────────────────────────── */}
      {/* Image fills the screen, text overlaid top & bottom */}
      <div className="md:hidden relative">

        {/* Full portrait image — natural dimensions, no crop */}
        <div data-hero-media className="relative w-full will-change-transform">
          <Image
            src={ASSETS.heroRenderMobile}
            alt="Aarambh Imperial exterior render"
            width={1080}
            height={1920}
            className="w-full h-auto block"
            priority
            sizes="100vw"
          />
        </div>

        {/* ── TOP overlay: logo left-aligned ── */}
        <div className="absolute top-0 inset-x-0 px-6 pt-20 sm:pt-24">

          {/* Logo replacement for header */}
          <div data-hero-anim className="mt-4 opacity-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/hero-logo.webp"
              alt="Aarambh Imperial"
              className="h-15 sm:h-12 w-auto object-contain block"
            />
          </div>
        </div>

        {/* ── BOTTOM overlay: tagline over blue water ── */}
        <div className="absolute bottom-0 inset-x-0 px-6 pb-6 sm:pb-10 text-center">
          
          {/* BHK & Location Details in a highly-readable glassmorphic card */}
          <div className="text-left mb-3">
            <div 
              data-hero-anim 
              className="inline-block bg-black/10 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 opacity-0"
            >
              <div className="font-serif text-[15px] sm:text-base text-white font-medium tracking-wide">
                2 &amp; 3 BHK Premium Apartments
              </div>
              <div className="text-xs sm:text-sm text-gold font-medium tracking-wider mt-0.5">
                V.P. Road, Mulund West
              </div>
            </div>
          </div>

          <div
            data-hero-anim
            className="flex items-center justify-center gap-3 mb-2 opacity-0"
          >
            <div className="h-px w-8 bg-white/100" />
            <span className="text-sm text-white/100">◊</span>
            <div className="h-px w-8 bg-white/100" />
          </div>
          <p
            data-hero-anim
            className="text-sm sm:text-base leading-relaxed text-white opacity-0 max-w-[280px] mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
          >
            Aarambh Imperial is crafted for those who desire more from life.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Hero;
