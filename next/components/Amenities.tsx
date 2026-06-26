"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useReveal } from "../hooks/useReveal";
import { AMENITY_CATEGORIES } from "../data/content";

const Amenities: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const [activeId, setActiveId] = useState<string>(AMENITY_CATEGORIES[0].id);
  const gridRef = useRef<HTMLDivElement>(null);

  // Animate grid swap
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-amenity-card]");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.05 }
    );
  }, [activeId]);

  const total = AMENITY_CATEGORIES.reduce(
    (acc, c) => acc + c.items.length,
    0
  );
  const active =
    AMENITY_CATEGORIES.find((c) => c.id === activeId) || AMENITY_CATEGORIES[0];

  return (
    <section
      id="amenities"
      ref={ref}
      data-testid="amenities-section"
      className="bg-cream py-24 md:py-32 grain"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto">
          <span
            data-reveal
            className="text-xs uppercase tracking-widestx text-teal font-medium"
          >
            Amenities
          </span>
          <h2
            data-reveal
            data-testid="amenities-heading"
            className="font-serif text-charcoal text-4xl md:text-5xl lg:text-6xl tracking-tight mt-4 leading-[1.05]"
          >
            {total}+ Lifestyle <span className="italic text-gold-dark">Amenities</span>
          </h2>
          <p
            data-reveal
            className="text-muteink text-base md:text-lg leading-relaxed mt-5"
          >
            18,000 sq ft dedicated to your wellbeing — across five thoughtfully
            curated worlds within Aarambh Imperial.
          </p>
        </div>

        {/* Category pills */}
        <div
          data-reveal
          className="mt-12 flex flex-wrap items-center justify-center gap-2 md:gap-3"
        >
          {AMENITY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              data-testid={`amenity-cat-${cat.id}`}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm tracking-wide transition-all duration-300 border ${
                activeId === cat.id
                  ? "bg-charcoal text-cream border-charcoal"
                  : "bg-white text-charcoal border-charcoal/15 hover:border-charcoal/40"
              }`}
            >
              {cat.label}
              <span
                className={`ml-2 text-[10px] ${
                  activeId === cat.id ? "text-cream/70" : "text-muteink"
                }`}
              >
                {cat.items.length}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-7"
        >
          {active.items.map((item, i) => (
            <div
              key={item.name}
              data-amenity-card
              data-testid={`amenity-card-${active.id}-${i}`}
              className="group bg-white shadow-subtle hover:shadow-lift transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative overflow-hidden h-52 md:h-56">
                <Image
                  src={item.url}
                  alt={item.name}
                  fill
                  loading="eager"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
              <div className="p-6">
                <h4 className="font-serif text-charcoal text-xl md:text-2xl tracking-tight">
                  {item.name}
                </h4>
                <p className="text-muteink text-sm leading-relaxed mt-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
