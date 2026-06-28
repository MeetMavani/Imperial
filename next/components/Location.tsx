"use client";

import React, { useRef } from "react";
import { useReveal } from "../hooks/useReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Train,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { LOCATION_CATEGORIES, CONTACT } from "../data/content";

const ICONS: Record<string, LucideIcon> = {
  Train,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
};

const colorClasses: Record<string, string> = {
  teal: "text-teal border-teal/30 bg-teal/5",
  gold: "text-gold-dark border-gold/40 bg-gold/5",
  ember: "text-ember border-ember/30 bg-ember/5",
};

const Location: React.FC = () => {
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
            Perfectly <span className="italic text-gold-dark">Connected</span>
          </h2>
          <p
            data-reveal
            className="text-muteink text-base md:text-lg leading-relaxed mt-5 flex items-center justify-center gap-2"
          >
            <MapPin size={16} className="text-ember" />
            {CONTACT.address}
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Map */}
          <div data-reveal className="relative">
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t border-l border-teal/40 hidden md:block" />
            <div className="bg-white shadow-subtle overflow-hidden">
              <iframe
                title="Aarambh Imperial Location"
                data-testid="location-map"
                src="https://maps.google.com/maps?q=Imperial+By+Aarambh+Group,+V.+P.+Road,+%26,+Kasturba+Rd,+Mulund+West,+Mumbai,+Maharashtra+400080&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="520"
                style={{ border: 0, filter: "grayscale(0.2) contrast(0.95)" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Accordion */}
          <div data-reveal>
            <Accordion
              type="single"
              collapsible
              defaultValue={LOCATION_CATEGORIES[0].id}
              className="space-y-3"
            >
              {LOCATION_CATEGORIES.map((cat) => {
                const Icon = ICONS[cat.icon] || MapPin;
                return (
                  <AccordionItem
                    key={cat.id}
                    value={cat.id}
                    className="border border-charcoal/10 bg-cream/40 px-5 md:px-6"
                    data-testid={`location-accordion-${cat.id}`}
                  >
                    <AccordionTrigger className="hover:no-underline py-5">
                      <div className="flex items-center gap-4">
                        <span
                          className={`h-10 w-10 inline-flex items-center justify-center rounded-full border ${
                            colorClasses[cat.color] || ""
                          }`}
                        >
                          <Icon size={18} />
                        </span>
                        <span className="font-serif text-xl md:text-2xl text-charcoal tracking-tight text-left">
                          {cat.label}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5">
                      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 pl-14">
                        {cat.items.map((item) => {
                          const distanceLabel =
                            item.distanceKm !== undefined
                              ? ` — ${item.distanceKm.toFixed(1)} km`
                              : "";

                          return (
                            <li
                              key={item.name}
                              className="text-muteink text-sm md:text-base flex items-start gap-2"
                            >
                              <span className="mt-2 h-1 w-1 rounded-full bg-charcoal/40 flex-shrink-0" />
                              <span>
                                {item.name}
                                {distanceLabel}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
