"use client";

import React, { useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import { CONTACT } from "../data/content";

interface ConnectivityItem {
  name: string;
  distanceKm: number;
}

interface ConnectivityCategory {
  category: string;
  color: string;
  items: ConnectivityItem[];
}

const CONNECTIVITY: ConnectivityCategory[] = [
  {
    category: "Transport",
    color: "#0dafbe",
    items: [
      { name: "Mulund Railway Station", distanceKm: 1.2 },
      { name: "LBS Marg", distanceKm: 0.4 },
      { name: "Eastern Express Highway", distanceKm: 1.6 },
      { name: "Proposed Metro Station", distanceKm: 0.9 },
      { name: "BEST Bus Depot", distanceKm: 0.7 },
      { name: "Panch Rasta Junction", distanceKm: 1.1 },
    ],
  },
  {
    category: "Education",
    color: "#fbc707",
    items: [
      { name: "NES International School", distanceKm: 1.8 },
      { name: "Billabong High International School", distanceKm: 2.1 },
      { name: "St. Mary's Convent High School", distanceKm: 1.4 },
      { name: "V.G. Vaze College", distanceKm: 2.3 },
    ],
  },
  {
    category: "Health",
    color: "#f2521b",
    items: [
      { name: "Fortis Hospital, Mulund", distanceKm: 1.1 },
      { name: "Jupiter Hospital, Thane", distanceKm: 3.8 },
      { name: "Apex Hospitals", distanceKm: 2.4 },
    ],
  },
  {
    category: "Shopping",
    color: "#0dafbe",
    items: [
      { name: "D-Mart", distanceKm: 0.9 },
      { name: "R Mall", distanceKm: 2.0 },
      { name: "Banks & ATMs", distanceKm: 0.3 },
      { name: "Local Markets", distanceKm: 0.6 },
    ],
  },
];

const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=Imperial+By+Aarambh+Group,+V.+P.+Road,+%26,+Kasturba+Rd,+Mulund+West,+Mumbai,+Maharashtra+400080&t=&z=15&ie=UTF8&iwloc=&output=embed";

const Location: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section
      id="location"
      ref={ref}
      data-testid="location-section"
      className="bg-white py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto">
          <span
            data-reveal
            className="text-xs uppercase tracking-widestx text-teal font-medium"
          >
            Location & Connectivity
          </span>
          <h2
            data-reveal
            data-testid="location-heading"
            className="font-serif text-charcoal text-4xl md:text-5xl lg:text-6xl tracking-tight mt-4 leading-[1.05]"
          >
            Perfectly <span className="italic text-teal">Connected</span>
          </h2>
          <p
            data-reveal
            className="text-muteink text-base md:text-lg leading-relaxed mt-5 flex items-center justify-center gap-2"
          >
            <MapPin size={16} className="text-ember" />
            {CONTACT.address}
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Map */}
          <div data-reveal className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px] overflow-hidden shadow-subtle border border-black/5 rounded-xl card-hover w-full">
            <iframe
              title="Aarambh Imperial Location"
              data-testid="location-map"
              src={MAP_EMBED_URL}
              className="absolute inset-0 w-full h-full border-0"
              style={{ filter: "grayscale(0.2) contrast(0.95)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Tabbed Info */}
          <div data-reveal className="flex flex-col gap-6 w-full">
            <div className="flex flex-wrap gap-2">
              {CONNECTIVITY.map((cat, i) => (
                <button
                  key={cat.category}
                  onClick={() => setActiveTab(i)}
                  className="px-4 py-2 text-[11px] tracking-[0.12em] uppercase rounded-full transition-all duration-300 font-semibold"
                  style={{
                    background: activeTab === i ? cat.color : "transparent",
                    color: activeTab === i ? (cat.color === "#fbc707" ? "#1a1a1a" : "#ffffff") : "#555555",
                    border: `1px solid ${activeTab === i ? cat.color : "rgba(26,26,26,0.12)"}`,
                  }}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-black/5 bg-[#fdfaf5] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-3 h-3 rounded-full" style={{ background: CONNECTIVITY[activeTab].color }} />
                <h3 className="text-xl text-[#1a1a1a] font-serif font-medium">
                  {CONNECTIVITY[activeTab].category}
                </h3>
              </div>
              <ul className="flex flex-col gap-3">
                {CONNECTIVITY[activeTab].items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center gap-3 p-3.5 rounded-lg bg-white border border-black/5 text-sm text-[#555555] card-hover"
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: CONNECTIVITY[activeTab].color }} />
                    <span className="flex-1 text-[#1a1a1a] font-medium">{item.name}</span>
                    <span className="ml-auto text-xs text-[#888888] font-semibold shrink-0">
                      {item.distanceKm.toFixed(1)} km
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
