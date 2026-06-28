"use client";

import React, { useRef, useCallback } from "react";
import Image from "next/image";
import { useReveal } from "../hooks/useReveal";
import { ASSETS } from "../data/content";

const About: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  // ── 3D tilt + glare on left sketch card ──
  const sketchRef = useRef<HTMLDivElement>(null);
  const sketchGlareRef = useRef<HTMLDivElement>(null);
  const sketchRafRef = useRef<number>(0);

  const handleSketchMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const el = sketchRef.current;
    const glare = sketchGlareRef.current;
    if (!el) return;
    
    cancelAnimationFrame(sketchRafRef.current);
    sketchRafRef.current = requestAnimationFrame(() => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const mouseX = e.clientX - left;
      const mouseY = e.clientY - top;
      
      const x = mouseX / width - 0.5;  // -0.5 to 0.5
      const y = mouseY / height - 0.5;
      
      const rotY = x * 4;    // max ±2°
      const rotX = -y * 4;   // max ±2°
      
      el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.005, 1.005, 1.005)`;
      
      if (glare) {
        glare.style.opacity = '1';
        glare.style.background = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 60%)`;
      }
    });
  }, []);

  const handleSketchLeave = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const el = sketchRef.current;
    const glare = sketchGlareRef.current;
    if (!el) return;
    
    cancelAnimationFrame(sketchRafRef.current);
    el.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    
    if (glare) {
      glare.style.transition = 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
      glare.style.opacity = '0';
    }
    
    const tid = setTimeout(() => {
      if (el) el.style.transition = '';
      if (glare) glare.style.transition = '';
    }, 650);
    return () => clearTimeout(tid);
  }, []);

  const handleSketchEnter = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const el = sketchRef.current;
    const glare = sketchGlareRef.current;
    if (el) el.style.transition = '';
    if (glare) glare.style.transition = '';
  }, []);

  // ── 3D tilt + glare on mission/vision card ──
  const tiltRef = useRef<HTMLDivElement>(null);
  const tiltGlareRef = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number>(0);

  const handleTiltMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const el = tiltRef.current;
    const glare = tiltGlareRef.current;
    if (!el) return;
    
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const mouseX = e.clientX - left;
      const mouseY = e.clientY - top;
      
      const x = mouseX / width  - 0.5;
      const y = mouseY / height - 0.5;
      
      const rotY =  x * 3;    // max ±1.5°
      const rotX = -y * 2;    // max ±1.0°
      
      el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.002, 1.002, 1.002)`;
      
      if (glare) {
        glare.style.opacity = '1';
        glare.style.background = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 70%)`;
      }
    });
  }, []);

  const handleTiltLeave = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const el = tiltRef.current;
    const glare = tiltGlareRef.current;
    if (!el) return;
    
    cancelAnimationFrame(rafRef.current);
    el.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    el.style.transform  = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    
    if (glare) {
      glare.style.transition = 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
      glare.style.opacity = '0';
    }
    
    const tid = setTimeout(() => {
      if (el) el.style.transition = '';
      if (glare) glare.style.transition = '';
    }, 650);
    return () => clearTimeout(tid);
  }, []);

  const handleTiltEnter = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const el = tiltRef.current;
    const glare = tiltGlareRef.current;
    if (el) el.style.transition = '';
    if (glare) glare.style.transition = '';
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      data-testid="about-section"
      className="relative bg-cream py-24 md:py-32 grain"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left: Decorative sketch */}
          <div data-reveal className="relative" style={{ perspective: '1000px' }}>
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t border-l border-teal/40 hidden md:block" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b border-r border-gold/50 hidden md:block" />
            <div 
              ref={sketchRef}
              className="relative bg-white overflow-hidden shadow-subtle rounded-2xl will-change-transform cursor-pointer"
              onMouseMove={handleSketchMove}
              onMouseLeave={handleSketchLeave}
              onMouseEnter={handleSketchEnter}
            >
              {/* Glare Layer */}
              <div 
                ref={sketchGlareRef}
                className="absolute inset-0 pointer-events-none opacity-0 z-30 transition-opacity duration-300"
                style={{ mixBlendMode: 'overlay' }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.aboutSketch}
                alt="Architectural sketch of Aarambh Imperial"
                className="w-full h-auto object-cover relative z-10"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
          </div>

          {/* Right: Text */}
          <div>
            <span
              data-reveal
              className="text-xs uppercase tracking-widestx text-teal font-medium"
            >
              About the Builder
            </span>
            <h2
              data-reveal
              data-testid="about-heading"
              className="font-serif text-charcoal text-4xl md:text-5xl lg:text-6xl tracking-tight mt-4 leading-[1.05]"
            >
              Built on <span className="italic text-gold-dark">Legacy</span>.
              <br />
              Crafted for tomorrow.
            </h2>

            <p
              data-reveal
              className="text-muteink text-base md:text-lg leading-relaxed mt-7 max-w-xl"
            >
              At Aarambh Realty, we believe a home is more than just a structure, it is the foundation of life's most meaningful moments. Aarambh Imperial is built on that belief, delivering residences crafted with uncompromising quality and attention to detail. <br />
              Located in the heart of Mumbai, our homes are designed for those who value comfort, connectivity, and a lifestyle worth living. Every step of your journey with us, from inquiry to possession, is built on transparency, trust, and a commitment to getting it right.
              Aarambh Imperial, Where Trust Meets Excellence.
            </p>

            {/* Decorative rule */}
            <div data-reveal className="mt-10 flex items-center gap-3">
              <span className="block h-px w-12 bg-charcoal/30" />
              <span className="text-xs uppercase tracking-widestx text-muteink">
                A Legacy of Trust
              </span>
            </div>
          </div>
        </div>

        {/* Mission & Vision — branded background images with overlaid content */}
        <div className="mt-20 lg:mt-28" data-reveal style={{ perspective: '1200px' }}>
          {/* Tilt card wrapper */}
          <div
            ref={tiltRef}
            className="relative overflow-hidden rounded-2xl lg:rounded-3xl will-change-transform cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
            onMouseEnter={handleTiltEnter}
          >
            {/* Glare Layer */}
            <div 
              ref={tiltGlareRef}
              className="absolute inset-0 pointer-events-none opacity-0 z-30 transition-opacity duration-300"
              style={{ mixBlendMode: 'overlay' }}
            />

            {/* ── Background images ── */}
            {/* Mobile background (shown on < md) */}
            <div className="relative w-full md:hidden" style={{ paddingBottom: '210%' }}>
              <Image
                src="/assets/mission-vision/mission-vision-mobile.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover object-center"
                priority
                aria-hidden
              />
            </div>

            {/* Desktop background (shown on ≥ md) */}
            <div className="relative w-full hidden md:block" style={{ paddingBottom: '56.25%' }}>
              <Image
                src="/assets/mission-vision/mission-vision-desktop.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                className="object-cover object-center border"
                priority
                aria-hidden
              />
            </div>

            {/* ── Content overlay ── */}
            <div className="absolute inset-0 flex flex-col justify-center
              px-7 py-10
              md:px-16 md:py-14
              lg:px-24
            ">

              {/* ── Header: centered on desktop, left on mobile ── */}
              <div className="text-charcoal md:text-center pr-[28%] md:pr-0">
                <span className="text-[10px] font-semibold uppercase tracking-widestx text-teal">
                  Our Mission &amp; Vision
                </span>
                <h3 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.04] tracking-tight">
                  Built with purpose,
                  <span className="block italic text-gold-dark">
                    delivered with care.
                  </span>
                </h3>
                <p className="mt-5 text-[14px] sm:text-[15px] leading-relaxed text-muteink
                  md:mx-auto md:max-w-xl lg:max-w-2xl">
                  Every line of planning, safety, and execution is measured
                  against one promise: lasting value for the people who trust
                  us to build.
                </p>
              </div>

              {/* ── Items: stacked on mobile, side-by-side on desktop ── */}
              <div className="mt-8 border-t border-charcoal/15
                md:grid md:grid-cols-2 md:gap-0
              ">

                {/* 01 — Mission */}
                <div className="flex gap-5 pt-7 pb-7 border-b border-charcoal/10
                  md:pb-0 md:border-b-0 md:border-r md:pr-10 lg:pr-14
                ">
                  <span
                    className="font-serif text-4xl sm:text-5xl leading-none shrink-0 w-12 sm:w-[3.5rem]"
                    style={{ color: '#d9a800', opacity: 0.75 }}
                  >
                    01
                  </span>
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widestx text-gold-dark">
                      Mission
                    </span>
                    <h4 className="mt-1.5 font-serif text-xl sm:text-2xl leading-tight text-charcoal">
                      Quality beyond expectation
                    </h4>
                    <p className="mt-2.5 text-[13px] sm:text-sm leading-relaxed text-muteink">
                      To consistently deliver exceptional quality on every
                      project, treating each undertaking with the same
                      importance as the people who entrust it to us.
                    </p>
                  </div>
                </div>

                {/* 02 — Vision */}
                <div className="flex gap-5 pt-7
                  md:pl-10 lg:pl-14
                ">
                  <span
                    className="font-serif text-4xl sm:text-5xl leading-none shrink-0 w-12 sm:w-[3.5rem]"
                    style={{ color: '#0dafbe', opacity: 0.8 }}
                  >
                    02
                  </span>
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widestx text-teal">
                      Vision
                    </span>
                    <h4 className="mt-1.5 font-serif text-xl sm:text-2xl leading-tight text-charcoal">
                      Safer, smarter, more sustainable
                    </h4>
                    <p className="mt-2.5 text-[13px] sm:text-sm leading-relaxed text-muteink">
                      To deliver to the highest standards of health and
                      safety, while growing through management excellence,
                      integrity, and thoughtful innovation.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
