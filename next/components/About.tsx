"use client";

import React, { useRef } from "react";
import { useReveal } from "../hooks/useReveal";
import { ASSETS, STATS } from "../data/content";

const About: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

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
          <div data-reveal className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t border-l border-teal/40 hidden md:block" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b border-r border-gold/50 hidden md:block" />
            <div className="relative bg-white overflow-hidden shadow-subtle">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.aboutSketch}
                alt="Architectural sketch of Aarambh Imperial"
                className="w-full h-auto object-cover"
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
              We deliver world-class engineering and construction services. As
              pioneers in the Indian infrastructure industry, the Aarambh Group
              has continued a legacy of innovation — achieving new milestones
              with every endeavour. Our portfolio includes landmark projects
              that have defined the country&apos;s progress and shaped how India
              lives.
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

        {/* Stats row */}
        <div className="grid sm:grid-cols-3 gap-5 md:gap-7 mt-20">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              data-reveal-delay={i * 0.08}
              data-testid={`stat-card-${i}`}
              className="bg-white border border-charcoal/8 p-8 shadow-subtle hover:shadow-lift transition-all duration-500 hover:-translate-y-1 group"
            >
              <div
                className={`h-10 w-10 mb-5 flex items-center justify-center border ${
                  s.accent === "teal"
                    ? "border-teal text-teal"
                    : s.accent === "gold"
                    ? "border-gold-dark text-gold-dark"
                    : "border-ember text-ember"
                }`}
              >
                <span className="text-xs font-medium">0{i + 1}</span>
              </div>
              <div className="font-serif text-4xl md:text-5xl text-charcoal tracking-tight">
                {s.value}
              </div>
              <div className="text-muteink text-sm uppercase tracking-widestx mt-2">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission strip */}
        <div
          data-reveal
          data-testid="mission-strip"
          className="mt-16 bg-gradient-to-br from-white via-cream to-white border border-gold/30 px-8 py-10 md:px-12 md:py-12 grid md:grid-cols-2 gap-10 shadow-subtle"
        >
          <div>
            <span className="text-xs uppercase tracking-widestx text-ember font-medium">
              Our Mission
            </span>
            <p className="font-serif text-2xl md:text-3xl text-charcoal mt-3 leading-snug">
              To craft homes that stand as a testament to design, durability and
              the values of the families they shelter.
            </p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widestx text-teal font-medium">
              Our Vision
            </span>
            <p className="font-serif text-2xl md:text-3xl text-charcoal mt-3 leading-snug">
              To redefine premium living in Mumbai — one landmark address at a
              time, built with integrity, intention and an enduring eye.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
