"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface MetaRow {
  label: string;
  value: string;
}

interface SingleUnit {
  kind: "single";
  image: string;
  imageAlt: string;
  header: string;
  description: string;
  meta: MetaRow[];
}

interface GalleryItem {
  image: string;
  imageAlt: string;
  header: string;
}

interface GalleryUnit {
  kind: "gallery";
  items: GalleryItem[];
}

type UnitData = SingleUnit | GalleryUnit;

interface Tab {
  id: string;
  label: string;
  data: UnitData;
}

const PLACEHOLDER = "/building.jpeg";

const TABS: Tab[] = [
  {
    id: "2bhk",
    label: "2 BHK",
    data: {
      kind: "single",
      image: PLACEHOLDER,
      imageAlt: "2 BHK floor plan",
      header: "2 BHK Apartment",
      description:
        "Thoughtfully designed for young families and professionals — comfort without compromise, with smart layout optimisation and natural light throughout.",
      meta: [
        { label: "Carpet area", value: "701 sq. ft." },
        { label: "Alternate size", value: "740 sq. ft." },
        { label: "Bedrooms", value: "2" },
        { label: "Bathrooms", value: "2" },
      ],
    },
  },
  {
    id: "3bhk",
    label: "3 BHK",
    data: {
      kind: "single",
      image: PLACEHOLDER,
      imageAlt: "3 BHK floor plan",
      header: "3 BHK Apartment",
      description:
        "Expansive homes for those who refuse to settle — generous living space, premium finishes, and private balconies overlooking the landscaped podium.",
      meta: [
        { label: "Compact 3 BHK", value: "892 sq. ft." },
        { label: "Standard 3 BHK", value: "993 sq. ft." },
        { label: "Large 3 BHK", value: "1,189 sq. ft." },
        { label: "Bedrooms", value: "3" },
      ],
    },
  },
  {
    id: "floor",
    label: "Floor Plan",
    data: {
      kind: "single",
      image: PLACEHOLDER,
      imageAlt: "Typical floor plan",
      header: "Typical Floor Plan",
      description:
        "Each floor features a balanced mix of 2 and 3 BHK units with fire-safe corridors, dedicated utility areas, and three high-speed elevators including a stretcher lift.",
      meta: [
        { label: "Total floors", value: "G + 21" },
        { label: "High-speed lifts", value: "3" },
        { label: "Stretcher lift", value: "Dedicated" },
        { label: "Parking", value: "Multi-level podium" },
      ],
    },
  },
  {
    id: "parking",
    label: "Podium Parking",
    data: {
      kind: "gallery",
      items: [
        { image: PLACEHOLDER, imageAlt: "Parking level B1", header: "Level B1 — Basement" },
        { image: PLACEHOLDER, imageAlt: "Parking level B2", header: "Level B2 — Lower Basement" },
        { image: PLACEHOLDER, imageAlt: "Parking level G", header: "Level G — Ground" },
        { image: PLACEHOLDER, imageAlt: "Parking level P1", header: "Level P1 — Podium" },
        { image: PLACEHOLDER, imageAlt: "Parking level P2", header: "Level P2 — Podium Top" },
      ],
    },
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-px bg-[#0dafbe]" />
      <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-[#0dafbe]">
        {children}
      </span>
    </div>
  );
}

function SingleView({
  data,
  contentRef,
}: {
  data: SingleUnit;
  contentRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-black/5 bg-white shadow-sm card-hover">
        <Image
          src={data.image}
          alt={data.imageAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className="flex flex-col gap-5">
        <h3
          className="text-2xl sm:text-3xl font-medium text-[#1a1a1a]"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {data.header}
        </h3>
        <p className="text-[#555555] text-[15px] leading-relaxed">{data.description}</p>

        <div className="mt-2 flex flex-col rounded-lg border border-black/5 bg-white shadow-sm overflow-hidden">
          {data.meta.map((row) => (
            <div
              key={row.label}
              className="flex justify-between items-center py-3.5 px-4 border-b border-black/5 last:border-b-0"
            >
              <span className="text-xs tracking-wide text-[#555555]">{row.label}</span>
              <span
                className="text-sm font-medium text-[#1a1a1a]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GalleryView({
  data,
  contentRef,
}: {
  data: GalleryUnit;
  contentRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={contentRef}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {data.items.map((item) => (
          <div key={item.header} className="flex flex-col gap-3 group card-hover rounded-lg">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-black/5 bg-white shadow-sm">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#1a1a1a] leading-snug">{item.header}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FloorPlans() {
  const [activeId, setActiveId] = useState<string>(TABS[0].id);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const activeTab = TABS.find((t) => t.id === activeId)!;

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
        <div className="mb-12 reveal">
          <SectionLabel>Configurations</SectionLabel>
          <h2
            className="text-[#1a1a1a]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400,
            }}
          >
            Floor plans &amp;
            <span style={{ fontStyle: "italic", color: "#0dafbe" }}> parking</span>
          </h2>
        </div>

        <div
          ref={tabsRef}
          className="relative flex gap-0 mb-12 overflow-x-auto reveal border-b border-black/8"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              data-id={tab.id}
              onClick={() => setActiveId(tab.id)}
              className="relative z-10 px-5 sm:px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-medium whitespace-nowrap transition-colors duration-300"
              style={{
                color: activeId === tab.id ? "#0dafbe" : "#555555",
              }}
            >
              {tab.label}
            </button>
          ))}
          <span
            ref={indicatorRef}
            className="absolute bottom-0 left-0 h-[2px] rounded-full bg-[#0dafbe]"
            style={{ width: 0 }}
          />
        </div>

        <div className="reveal">
          {activeTab.data.kind === "single" ? (
            <SingleView data={activeTab.data} contentRef={contentRef} />
          ) : (
            <GalleryView data={activeTab.data} contentRef={contentRef} />
          )}
        </div>
      </div>
    </section>
  );
}
