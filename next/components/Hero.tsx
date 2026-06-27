"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowUpRight, MapPin } from "lucide-react";
import { ASSETS } from "../data/content";

const HERO_DETAILS = [
  { value: "2 & 3 BHK", label: "Residences" },
  { value: "G + 24", label: "Signature tower" },
  { value: "Mulund West", label: "Mumbai" },
];

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
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-cream text-charcoal"
    >
      <h1 className="sr-only">Aarambh Imperial premium residences</h1>

      <div data-hero-media className="absolute inset-0 will-change-transform">
        {/* Desktop Image */}
        <Image
          src={ASSETS.heroRender}
          alt="Aarambh Imperial exterior render"
          fill
          preload
          sizes="(min-width: 768px) 100vw, 0px"
          className="hidden md:block object-cover object-[55%_50%]"
        />
        {/* Mobile Image */}
        <Image
          src={ASSETS.heroRenderMobile}
          alt="Aarambh Imperial exterior render"
          fill
          loading="eager"
          unoptimized
          sizes="(max-width: 767px) 100vw, 0px"
          className="block md:hidden object-cover object-[62%_50%]"
        />
      </div>

      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(251,248,242,0.16) 0%, rgba(251,248,242,0) 36%, rgba(251,248,242,0.78) 66%, #fbf8f2 100%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#fbf8f2]/55 to-transparent md:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-[#fbf8f2]/62 via-[#fbf8f2]/20 to-transparent md:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-[#fbf8f2]/70 via-transparent to-transparent md:block" />
      <div className="absolute inset-x-0 top-0 hidden h-36 bg-gradient-to-b from-[#fbf8f2]/20 to-transparent md:block" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col px-6 pb-24 pt-28 md:px-10 md:pb-7 lg:px-14">
        <div
          data-hero-anim
          className="hidden items-center justify-between gap-5 border-b border-charcoal/15 pb-4 opacity-0 md:flex"
        >
          <div className="flex min-w-0 items-center gap-2.5 text-charcoal">
            <MapPin size={14} className="shrink-0" />
            <span className="truncate text-[10px] font-semibold uppercase tracking-widestx sm:text-xs">
              V.P. Road & Kasturba Road, Mulund West
            </span>
          </div>
          <span className="hidden text-[10px] font-semibold uppercase tracking-widestx text-charcoal/60 sm:block">
            Premium urban residences
          </span>
        </div>

        <div className="flex flex-1 items-end pb-5 md:items-center md:py-4">
          <div className="w-full max-w-[500px] md:w-[42vw]">
            <div
              data-hero-anim
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-charcoal/10 bg-cream/70 px-3.5 py-2 text-[9px] font-semibold uppercase tracking-widestx text-charcoal/70 opacity-0 backdrop-blur-md md:hidden"
            >
              <MapPin size={12} className="text-teal" />
              Mulund West, Mumbai
            </div>

            <div
              data-hero-anim
              className="relative mx-auto aspect-[3/2] w-[72vw] max-w-[280px] opacity-0 drop-shadow-[0_18px_25px_rgba(54,37,20,0.16)] md:mx-0 md:w-full md:max-w-[420px]"
            >
              <Image
                src={ASSETS.logo}
                alt="Aarambh Imperial - The Crest of Luxury"
                fill
                loading="eager"
                sizes="(max-width: 768px) 88vw, 420px"
                className="object-contain object-left"
              />
            </div>

            <p
              data-hero-anim
              className="mx-auto mt-1 max-w-[330px] text-center text-sm leading-relaxed text-charcoal/74 opacity-0 md:mx-0 md:mt-1 md:max-w-md md:text-left md:text-charcoal/72 sm:text-base"
            >
              Elevated living, grounded in the heart of Mulund. Thoughtful
              homes shaped around light, calm and connection.
            </p>

            <div
              data-hero-anim
              className="mt-4 text-center text-[9px] font-semibold uppercase tracking-widestx text-charcoal/55 opacity-0 md:hidden"
            >
              2 &amp; 3 BHK residences / G + 24 signature tower
            </div>

            <div
              data-hero-anim
              className="mt-5 grid grid-cols-1 items-center gap-3 opacity-0 min-[390px]:grid-cols-2 md:mt-6 md:flex md:flex-wrap"
            >
              <a
                href="#residences"
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo("#residences");
                }}
                className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-charcoal px-5 text-[9px] font-semibold uppercase tracking-widestx text-cream transition-colors duration-300 hover:bg-teal sm:text-xs md:px-6"
              >
                Explore residences
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo("#contact");
                }}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-charcoal/20 bg-cream/70 px-5 text-[9px] font-semibold uppercase tracking-widestx text-charcoal backdrop-blur-md transition-colors duration-300 hover:border-teal hover:text-teal sm:text-xs md:bg-cream/45 md:px-6"
              >
                Book a private preview
              </a>
            </div>
          </div>
        </div>

        <div
          data-hero-anim
          className="hidden grid-cols-3 border-t border-charcoal/15 pt-4 opacity-0 md:ml-auto md:grid md:w-[54%]"
        >
          {HERO_DETAILS.map((detail, index) => (
            <div
              key={detail.label}
              className={index === 0 ? "pr-3" : "border-l border-charcoal/15 px-3 md:px-6"}
            >
              <div className="font-serif text-base leading-tight text-charcoal sm:text-xl md:text-2xl">
                {detail.value}
              </div>
              <div className="mt-1.5 text-[8px] font-semibold uppercase tracking-widestx text-charcoal/55 sm:text-[10px]">
                {detail.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
