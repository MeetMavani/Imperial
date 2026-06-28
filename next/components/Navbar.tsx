"use client";

import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ASSETS, NAV_LINKS } from "../data/content";

const DOT_COLORS = ["#0dafbe", "#fbc707", "#f2521b"];

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
          ? "bg-cream/97 backdrop-blur-md shadow-subtle py-2"
          : "bg-cream/75 backdrop-blur-sm border-b border-charcoal/6 py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">

        {/* ── Logo ── */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          data-testid="navbar-logo"
          className="flex items-center group shrink-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSETS.logo}
            alt="Aarambh Imperial"
            className="h-[60px] sm:h-[72px] md:h-[80px] w-auto transition-transform duration-500 group-hover:scale-[1.03] object-contain"
          />
        </a>

        {/* ── Desktop nav ── */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link, i) => {
            const preDotColor = DOT_COLORS[i % DOT_COLORS.length];
            return (
              <React.Fragment key={link.href}>
                {/* Dot before item */}
                <span className="w-1.5 h-1.5 rounded-full shrink-0 mx-1.5" style={{ background: preDotColor }} aria-hidden />
                
                <a
                  href={link.href}
                  data-testid={`navbar-link-${link.label.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative text-[15px] font-semibold tracking-wide text-charcoal
                    transition-colors duration-300 hover:text-teal px-1.5 py-1
                    after:absolute after:bottom-[-2px] after:left-1.5 after:right-1.5
                    after:h-[2px] after:bg-teal after:scale-x-0 after:origin-left
                    after:transition-transform after:duration-300
                    hover:after:scale-x-100"
                >
                  {link.label}
                </a>

                {/* Final dot after last item */}
                {i === NAV_LINKS.length - 1 && (
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 mx-1.5" style={{ background: "#f2521b" }} aria-hidden />
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* ── Actions ── */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            data-testid="navbar-mobile-toggle"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 rounded-md text-charcoal"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          open ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="bg-cream/98 backdrop-blur-md border-t border-charcoal/10 px-6 py-4 flex flex-col gap-0">
          {NAV_LINKS.map((link, i) => {
            const preDotColor = DOT_COLORS[i % DOT_COLORS.length];
            return (
              <React.Fragment key={link.href}>
                <div className="flex items-center gap-3 py-3 border-b border-charcoal/6 pl-2">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: preDotColor }} />
                  <a
                    href={link.href}
                    data-testid={`mobile-link-${link.label.toLowerCase()}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-charcoal text-[17px] font-semibold tracking-wide hover:text-teal transition-colors"
                  >
                    {link.label}
                  </a>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
