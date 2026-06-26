"use client";

import React, { useRef } from "react";
import { useReveal } from "../hooks/useReveal";
import { ASSETS } from "../data/content";
import { Eye, Target } from "lucide-react";

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

        <div className="mt-20 lg:mt-28">
          <div
            data-reveal
            className="relative overflow-hidden bg-white border border-black/5 shadow-subtle"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal via-gold to-ember" />

            <div className="relative z-10 p-7 md:p-10 lg:p-12">
              <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-start">
                <div>
                  <span className="text-xs uppercase tracking-widestx text-teal font-medium">
                    Our Mission & Vision
                  </span>
                  <h3 className="font-serif text-charcoal text-4xl md:text-5xl leading-[1.04] tracking-tight mt-4">
                    A promise shaped by
                    <span className="italic text-gold-dark"> quality</span>,
                    safety and trust.
                  </h3>
                  <p className="text-muteink text-base md:text-lg leading-relaxed mt-6">
                    We see every project as a responsibility: to build with
                    discipline, anticipate client needs, and keep improving the
                    way our teams deliver.
                  </p>

                  <div className="mt-8 grid grid-cols-3 border border-black/5 bg-cream">
                    {["Quality", "Safety", "Integrity"].map((item, index) => (
                      <div
                        key={item}
                        className={`px-3 py-4 text-center ${index > 0 ? "border-l border-black/5" : ""
                          }`}
                      >
                        <div
                          className="mx-auto mb-2 h-2 w-2 rounded-full"
                          style={{
                            background:
                              index === 0
                                ? "#fbc707"
                                : index === 1
                                  ? "#0dafbe"
                                  : "#f2521b",
                          }}
                        />
                        <span className="text-[10px] uppercase tracking-widestx text-charcoal font-semibold">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    {
                      eyebrow: "Mission",
                      title: "Quality beyond expectation",
                      copy:
                        "To consistently deliver exceptional quality that exceeds client expectations on every project, treating each undertaking with the same importance as the people who entrust it to us.",
                      icon: Target,
                      color: "gold",
                      number: "01",
                    },
                    {
                      eyebrow: "Vision",
                      title: "Safer, smarter, more sustainable",
                      copy:
                        "To deliver projects to the highest standards of health and safety while growing through superior management, professionalism, integrity, and innovation.",
                      icon: Eye,
                      color: "teal",
                      number: "02",
                    },
                  ].map((block) => {
                    const Icon = block.icon;
                    const accent =
                      block.color === "gold" ? "text-gold-dark" : "text-teal";
                    const bg =
                      block.color === "gold" ? "bg-gold/10" : "bg-teal/10";
                    const border =
                      block.color === "gold" ? "border-gold/40" : "border-teal/35";

                    return (
                      <div
                        key={block.eyebrow}
                        className={`relative overflow-hidden border ${border} bg-cream/60 p-6 md:p-7`}
                      >
                        <div className="absolute right-5 top-4 font-serif text-7xl leading-none text-charcoal/[0.04] select-none pointer-events-none">
                          {block.number}
                        </div>
                        <div className="relative z-10">
                          <div className={`h-11 w-11 rounded-lg ${bg} ${accent} flex items-center justify-center`}>
                            <Icon size={22} />
                          </div>
                          <span className={`mt-5 block text-[10px] uppercase tracking-widestx font-semibold ${accent}`}>
                            {block.eyebrow}
                          </span>
                          <h4 className="font-serif text-charcoal text-2xl md:text-3xl leading-tight tracking-tight mt-2">
                            {block.title}
                          </h4>
                          <p className="text-muteink text-sm md:text-base leading-relaxed mt-4">
                            {block.copy}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                data-reveal
                data-reveal-delay="0.12"
                className="mt-8 border-t border-black/10 pt-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <p className="max-w-2xl text-muteink text-sm md:text-base leading-relaxed">
                    From planning to possession, our approach stays anchored in
                    quality, health and safety, proactive delivery, and
                    continuously improving sustainability commitments.
                  </p>

                  <div className="flex flex-wrap gap-x-5 gap-y-3">
                    {[
                      { label: "Quality", color: "bg-gold" },
                      { label: "Safety", color: "bg-teal" },
                      { label: "Integrity", color: "bg-ember" },
                      { label: "Sustainability", color: "bg-teal" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${item.color}`} />
                        <span className="text-[10px] uppercase tracking-widestx text-charcoal font-semibold">
                          {item.label}
                        </span>
                      </div>
                    ))}
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
