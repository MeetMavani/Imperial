"use client";

import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { ASSETS, NAV_LINKS, CONTACT } from "../data/content";

const Footer: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el)
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 72,
        behavior: "smooth",
      });
  };

  return (
    <footer
      data-testid="footer-section"
      className="bg-charcoal text-cream/85"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-10">
        {/* Top: Logo */}
        <div className="flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSETS.logo}
            alt="Aarambh Imperial"
            className="h-16 w-16 md:h-20 md:w-20"
          />
          <h3 className="font-serif text-3xl md:text-4xl text-white tracking-tight mt-5">
            Aarambh Imperial
          </h3>
          <p className="text-cream/60 text-sm uppercase tracking-widestx mt-2">
            Premium Residences. Timeless Living.
          </p>
        </div>

        <div className="my-12 h-px bg-white/10" />

        {/* Columns */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-10">
          <div>
            <h4 className="text-white text-sm uppercase tracking-widestx">
              About
            </h4>
            <p className="text-cream/70 text-sm md:text-[15px] leading-relaxed mt-4 max-w-sm">
              Aarambh Imperial is a landmark residential address in Mulund West
              by the Aarambh Group — combining engineering pedigree with
              considered design for a generation of refined Mumbai living.
            </p>
            <p className="text-cream/50 text-xs uppercase tracking-widestx mt-5">
              {CONTACT.rera}
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm uppercase tracking-widestx">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => handleNavClick(e, l.href)}
                    data-testid={`footer-link-${l.label.toLowerCase()}`}
                    className="text-cream/70 hover:text-teal transition-colors text-sm md:text-[15px]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm uppercase tracking-widestx">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm md:text-[15px] text-cream/70">
              <li className="flex items-start gap-3">
                <Phone size={15} className="mt-1 text-teal flex-shrink-0" />
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="hover:text-white transition-colors"
                  data-testid="footer-phone"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="mt-1 text-gold flex-shrink-0" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-white transition-colors"
                  data-testid="footer-email"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-1 text-ember flex-shrink-0" />
                <span data-testid="footer-address">{CONTACT.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-10 h-px bg-white/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs uppercase tracking-widestx text-cream/50">
          <p data-testid="footer-copyright">
            © 2026 Aarambh Imperial. All rights reserved.
          </p>
          <p>
            Developed by{" "}
            <a
              href="#"
              className="text-teal hover:text-white transition-colors"
            >
              Nirmaan
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
