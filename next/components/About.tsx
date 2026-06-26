"use client";

import React, { useRef } from "react";
import { useReveal } from "../hooks/useReveal";
import { ASSETS } from "../data/content";

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

        {/* Mission strip */}
        <div
          data-reveal
          data-testid="mission-strip"
          className="mt-20 bg-gradient-to-br from-white via-cream to-white border border-gold/30 px-8 py-10 md:px-12 md:py-12 grid md:grid-cols-2 gap-10 shadow-subtle"
        >
          <div>
            <span className="text-xs uppercase tracking-widestx text-ember font-medium">
              Our Mission
            </span>
            <p className="text-muteink text-base md:text-lg leading-relaxed mt-4">
              Our mission is to consistently deliver exceptional quality that
              exceeds all of our Clients expectations on every project we
              undertake. Value projects as highly as our Clients and are
              prepared to go the extra mile to deliver them.
            </p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widestx text-teal font-medium">
              Our Vision
            </span>
            <div className="text-muteink text-base md:text-lg leading-relaxed mt-4 flex flex-col gap-4">
              <p>
                Our Vision is to Deliver projects to the highest standards of
                health & safety.
              </p>
              <p>
                Continually differentiates ourselves from our competitors
                through superior management skills, professionalism, integrity
                and excellence. Anticipate and respond innovatively to Client
                requirements.
              </p>
              <p>
                Provide proactive team members focused on delivery of goals.
                Provide continuously improving sustainability commitments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
