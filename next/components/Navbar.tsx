"use client";

import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ASSETS, NAV_LINKS } from "../data/content";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 72,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      data-testid="navbar-root"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-subtle py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          data-testid="navbar-logo"
          className="flex items-center gap-3 group"
        >
          {/* Using normal HTML img to match exact visual layout and behavior */}
          <img
            src={ASSETS.logo}
            alt="Aarambh Imperial"
            className="h-10 w-10 md:h-12 md:w-12 transition-transform duration-500 group-hover:rotate-3"
          />
          <div className="flex flex-col leading-none">
            <span
              className={`font-serif text-xl md:text-2xl tracking-tight ${
                scrolled ? "text-charcoal" : "text-white"
              }`}
            >
              Aarambh Imperial
            </span>
            <span
              className={`text-[10px] uppercase tracking-widestx mt-0.5 ${
                scrolled ? "text-muteink" : "text-white/80"
              }`}
            >
              by Aarambh Group
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-testid={`navbar-link-${link.label.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm tracking-wide transition-colors duration-300 hover:text-teal ${
                scrolled ? "text-charcoal" : "text-white/90"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            data-testid="navbar-enquire-btn"
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-teal text-white text-sm font-medium tracking-wide hover:bg-teal-dark transition-all duration-300 hover:shadow-lift"
          >
            Enquire Now
          </a>
          <button
            data-testid="navbar-mobile-toggle"
            onClick={() => setOpen((v) => !v)}
            className={`lg:hidden p-2 rounded-md ${
              scrolled ? "text-charcoal" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          open ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="bg-cream/98 backdrop-blur-md border-t border-charcoal/10 px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-testid={`mobile-link-${link.label.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-charcoal text-base tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            data-testid="mobile-enquire-btn"
            className="inline-flex items-center justify-center w-full px-6 py-3 rounded-full bg-teal text-white text-sm font-medium"
          >
            Enquire Now
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
