"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { BedDouble, Bath, Maximize2, Compass } from "lucide-react";
import { FLOOR_TABS, FloorTabSingle, FloorTabGallery } from "../data/content";

interface SingleViewProps {
  unit: FloorTabSingle;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const SingleView: React.FC<SingleViewProps> = ({ unit, contentRef }) => (
  <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-black/5 bg-white shadow-sm card-hover">
      <Image
        src={unit.image}
        alt={unit.title}
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />
    </div>
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-widestx text-teal font-medium">
        {unit.label}
      </span>
      <h3 className="font-serif text-charcoal text-3xl md:text-4xl lg:text-5xl tracking-tight mt-3 leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
        {unit.title}
      </h3>
      <p className="text-muteink text-base md:text-lg mt-5 leading-relaxed">
        {unit.description}
      </p>
      <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-charcoal/10 pt-7">
        {unit.meta.map((m) => (
          <div key={m.label} className="flex flex-col">
            <span className="text-[11px] uppercase tracking-widestx text-muteink">
              {m.label}
            </span>
            <span className="text-charcoal font-medium mt-1.5 text-base">
              {m.value}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3 text-xs text-muteink">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-charcoal/10 rounded-full">
          <BedDouble size={13} /> Spacious Bedrooms
        </span>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-charcoal/10 rounded-full">
          <Bath size={13} /> Premium Fittings
        </span>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-charcoal/10 rounded-full">
          <Maximize2 size={13} /> Open Layout
        </span>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-charcoal/10 rounded-full">
          <Compass size={13} /> Cross Ventilation
        </span>
      </div>
    </div>
  </div>
);

interface GalleryViewProps {
  unit: FloorTabGallery;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const GalleryView: React.FC<GalleryViewProps> = ({ unit, contentRef }) => (
  <div ref={contentRef}>
    <div className="max-w-3xl mb-10">
      <span className="text-xs uppercase tracking-widestx text-teal font-medium">
        {unit.label}
      </span>
      <h3 className="font-serif text-charcoal text-3xl md:text-4xl lg:text-5xl tracking-tight mt-3 leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
        {unit.title}
      </h3>
      <p className="text-muteink text-base md:text-lg mt-5 leading-relaxed">
        {unit.description}
      </p>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
      {unit.images.map((img, i) => (
        <div
          key={i}
          className="flex flex-col gap-3 group rounded-lg"
          data-testid={`podium-image-${i}`}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-black/5 bg-white shadow-sm card-hover">
            <Image
              src={img.url}
              alt={img.label}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          </div>
          <div className="text-center mt-1 text-xs uppercase tracking-widestx text-muteink">
            {img.label}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FloorPlans: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(FLOOR_TABS[0].id);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const activeTab = FLOOR_TABS.find((t) => t.id === activeId) || FLOOR_TABS[0];

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [activeId]);

  const updateIndicator = useCallback(() => {
    if (!tabsRef.current || !indicatorRef.current) return;
    const activeBtn = tabsRef.current.querySelector<HTMLButtonElement>(`[data-id="${activeId}"]`);
    if (!activeBtn) return;
    gsap.to(indicatorRef.current, {
      x: activeBtn.offsetLeft,
      width: activeBtn.offsetWidth,
      duration: 0.35,
      ease: "power2.inOut",
    });
  }, [activeId]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  return (
    <section id="floor-plans" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widestx text-teal font-medium">
            Residences
          </span>
          <h2
            className="text-charcoal font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mt-4 leading-[1.05]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Find Your <span className="italic text-teal">Perfect</span>{" "}
            Home
          </h2>
          <p className="text-muteink text-base md:text-lg leading-relaxed mt-5 max-w-3xl">
            Thoughtfully designed configurations for every lifestyle —
            considered layouts, generous proportions and uncompromised
            craftsmanship.
          </p>
        </div>

        {/* Tabs */}
        <div
          ref={tabsRef}
          className="relative flex gap-0 mb-12 overflow-x-auto border-b border-black/8 no-scrollbar"
          role="tablist"
        >
          {FLOOR_TABS.map((t) => (
            <button
              key={t.id}
              data-id={t.id}
              onClick={() => setActiveId(t.id)}
              data-testid={`tab-${t.id}-trigger`}
              role="tab"
              aria-selected={activeId === t.id}
              className="relative z-10 px-5 sm:px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-medium whitespace-nowrap transition-colors duration-300"
              style={{
                color: activeId === t.id ? "#0dafbe" : "#555555",
              }}
            >
              {t.label}
            </button>
          ))}
          <span
            ref={indicatorRef}
            className="absolute bottom-0 left-0 h-[2px] rounded-full bg-[#0dafbe]"
            style={{ width: 0 }}
          />
        </div>

        {/* Content */}
        <div className="mt-14 md:mt-20">
          {activeTab.kind === "single" ? (
            <SingleView unit={activeTab} contentRef={contentRef} />
          ) : (
            <GalleryView unit={activeTab} contentRef={contentRef} />
          )}
        </div>
      </div>
    </section>
  );
};

export default FloorPlans;
