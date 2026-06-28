"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowUpRight, MapPin } from "lucide-react";
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
        { scale: 1.055 },
        { scale: 1, duration: 1.8, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-hero-anim]",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.1,
        }
      );
    }, wrapRef);

    return () => ctx.revert();
  }, [loaded]);

  const scrollTo = (selector: string) => {
    const element = document.querySelector(selector);
    if (!element) return;

    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - 72,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="hero"
      ref={wrapRef}
      data-testid="hero-section"
      className="relative min-h-screen overflow-hidden bg-cream text-charcoal py-4 md:py-5 lg:py-6"
    >
      <h1 className="sr-only">Aarambh Imperial premium residences</h1>

      <div data-hero-media className="
        absolute
        top-3
        bottom-3
        left-1/2
        w-[96vw]
        sm:w-[94vw]
        lg:w-[92vw]
        2xl:w-[90vw]
        max-w-[1700px]
        max-w-[1680px]
        -translate-x-1/2
        overflow-hidden
        rounded-[22px]
        sm:rounded-[26px]
        lg:rounded-[32px]
        shadow-[0_30px_80px_rgba(0,0,0,0.18)]
        will-change-transform
      ">
        {/* Desktop Image */}
        <Image
          src={ASSETS.heroRender}
          alt="Aarambh Imperial exterior render"
          fill
          preload
          sizes="(min-width: 768px) 100vw, 0px"
          className="hidden md:block object-cover object-center"
        />
        {/* Mobile Image */}
        <Image
          src={ASSETS.heroRenderMobile}
          alt="Aarambh Imperial exterior render"
          fill
          loading="eager"
          unoptimized
          sizes="(max-width: 767px) 100vw, 0px"
          className="block md:hidden object-cover object-center"
        />

        {/* Mobile Overlay */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(251,248,242,0.16) 0%, rgba(251,248,242,0) 36%, rgba(251,248,242,0.78) 66%, #fbf8f2 100%)",
          }}
        />

        {/* Desktop Overlays */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#fbf8f2]/72 via-[#fbf8f2]/18 to-transparent md:block" />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-[#fbf8f2]/20 via-transparent to-transparent md:block" />
        {/* <div className="absolute inset-x-0 top-0 hidden h-36 bg-gradient-to-b from-[#fbf8f2]/20 to-transparent md:block" /> */}
      
        {/* Premium Border */}
          <div
            className="
              absolute
              inset-0
              rounded-[inherit]
              border
              border-white/35
              pointer-events-none
              z-20
            "
          />
      </div>
      
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100svh-24px)]
          w-full
          max-w-[1600px]
          flex-col
          px-6
          md:px-10
          lg:px-14
          pt-24
          md:pt-28
          pb-10
        ">

        <div
          className="
            flex
            flex-1
            items-end
            pb-8
            md:items-center
            md:pb-0
          "
          >
          <div className="w-full max-w-[500px] xl:max-w-[620px] md:w-[42vw]">
            <div
              data-hero-anim
              className="flex items-center gap-2.5 text-[10px] sm:text-xs uppercase tracking-widestx text-gold-dark font-medium opacity-0 md:justify-start justify-center"
            >
              <span className="w-5 h-px bg-gold-dark/40" />
              Not just a residence.
            </div>

            <h2
              data-hero-anim
              className="mt-3.5 font-serif text-[2.6rem] leading-[1.08] tracking-tight text-charcoal opacity-0 sm:text-[3.8rem] md:text-[4rem] lg:text-[4.6rem] md:text-left text-center"
              style={{ fontWeight: 400 }}
            >
              A LANDMARK<br />
              <span className="text-teal">OF EXCEPTION.</span>
            </h2>

            <div
              data-hero-anim
              className="my-5 flex items-center justify-center md:justify-start gap-4 opacity-0"
            >
              <div className="h-px w-10 bg-charcoal/15" />
              <span className="text-xs text-gold-dark">◊</span>
              <div className="h-px w-10 bg-charcoal/15" />
            </div>

            <p
              data-hero-anim
              className="mx-auto mt-1 max-w-[330px] text-center text-sm leading-relaxed text-muteink opacity-0 md:mx-0 md:max-w-md md:text-left sm:text-base"
            >
              Aarambh Imperial is crafted for those who desire more from life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
