"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { BedDouble, Bath, Maximize2, Compass, Lock, Check, AlertCircle } from "lucide-react";
import { FLOOR_TABS, FloorTabSingle, FloorTabGallery, CONFIGURATIONS } from "../data/content";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// ─── Config ───────────────────────────────────────────────────────────────────

const SHEET_URL = process.env.NEXT_PUBLIC_SHEET_URL || "";

// ─── Full-Screen Gate Modal ───────────────────────────────────────────────────

interface GateModalProps {
  onUnlocked: () => void;
}

interface GateFormState {
  name: string;
  email: string;
  phone: string;
  config: string;
  message: string;
}

const GateModal: React.FC<GateModalProps> = ({ onUnlocked }) => {
  const [form, setForm] = useState<GateFormState>({
    name: "",
    email: "",
    phone: "",
    config: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const onChange = (key: keyof GateFormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  // Animate in
  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (backdropRef.current) {
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
    }
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 32, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out", delay: 0.1 }
      );
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const validate = (): string => {
    if (!form.name.trim()) return "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return "Please enter a valid email address.";
    if (!/^[0-9+\-\s()]{7,}$/.test(form.phone.trim())) return "Please enter a valid phone number.";
    if (!form.config) return "Please choose a configuration.";
    return "";
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); setStatus("error"); return; }

    setError("");
    setStatus("submitting");

    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          config: form.config,
          message: form.message.trim(),
          source: "Floor Plan Gate",
        }),
      });
      setStatus("success");

      // Animate out, then unlock
      setTimeout(() => {
        if (!backdropRef.current || !cardRef.current) { onUnlocked(); return; }
        gsap.to(cardRef.current, { opacity: 0, y: -20, scale: 0.97, duration: 0.35, ease: "power2.in" });
        gsap.to(backdropRef.current, {
          opacity: 0,
          duration: 0.45,
          delay: 0.2,
          ease: "power2.in",
          onComplete: () => {
            document.body.style.overflow = "";
            onUnlocked();
          },
        });
      }, 900);
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    // Backdrop — no pointer-events escape, no close on click outside
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center px-5"
      style={{
        backdropFilter: "blur(20px) saturate(0.6)",
        backgroundColor: "rgba(253,250,245,0.75)",
      }}
    >
      <div
        ref={cardRef}
        className="w-full max-w-md bg-white border border-charcoal/10 shadow-lift rounded-2xl overflow-hidden"
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-teal via-gold to-ember" />

        <div className="px-8 py-10">
          {status === "success" ? (
            // Success state
            <div className="flex flex-col items-center gap-4 text-center py-4">
              <div className="w-14 h-14 rounded-full bg-teal/10 flex items-center justify-center">
                <Check size={26} className="text-teal" />
              </div>
              <div>
                <p className="text-lg font-medium text-charcoal" style={{ fontFamily: "var(--font-serif)" }}>
                  You&apos;re all set
                </p>
                <p className="text-sm text-muteink mt-1.5">
                  Unlocking floor plans…
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal/8 mb-4">
                  <Lock size={20} className="text-teal" />
                </div>
                <h2
                  className="text-2xl md:text-3xl font-serif text-charcoal tracking-tight leading-tight"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  View Floor Plans
                </h2>
                <p className="text-sm text-muteink mt-2.5 leading-relaxed">
                  Share your details to access all floor plans and podium parking layouts.
                  Our team will follow up with pricing and availability.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <div>
                  <label htmlFor="gate-name" className="text-[11px] uppercase tracking-widestx text-muteink">
                    Full Name
                  </label>
                  <input
                    id="gate-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    placeholder="e.g. Aarav Mehta"
                    className="mt-2 w-full bg-transparent border-b border-charcoal/20 focus:border-teal py-2.5 text-charcoal placeholder:text-muteink/40 outline-none transition-colors text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="gate-email" className="text-[11px] uppercase tracking-widestx text-muteink">
                    Email Address
                  </label>
                  <input
                    id="gate-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    placeholder="e.g. aarav@example.com"
                    className="mt-2 w-full bg-transparent border-b border-charcoal/20 focus:border-teal py-2.5 text-charcoal placeholder:text-muteink/40 outline-none transition-colors text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="gate-phone" className="text-[11px] uppercase tracking-widestx text-muteink">
                    Phone Number
                  </label>
                  <input
                    id="gate-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => onChange("phone", e.target.value)}
                    placeholder="+91 98XXX XXXXX"
                    className="mt-2 w-full bg-transparent border-b border-charcoal/20 focus:border-teal py-2.5 text-charcoal placeholder:text-muteink/40 outline-none transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-widestx text-muteink">
                    Configuration Interested In
                  </label>
                  <div className="mt-2">
                    <Select
                      value={form.config}
                      onValueChange={(v) => onChange("config", v)}
                    >
                      <SelectTrigger
                        className="w-full bg-transparent border-0 border-b border-charcoal/20 rounded-none focus:ring-0 focus:border-teal px-0 py-2.5 text-charcoal text-sm"
                      >
                        <SelectValue placeholder="Select a configuration" />
                      </SelectTrigger>
                      <SelectContent>
                        {CONFIGURATIONS.map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label htmlFor="gate-msg" className="text-[11px] uppercase tracking-widestx text-muteink">
                    Message <span className="normal-case text-muteink/60">(optional)</span>
                  </label>
                  <textarea
                    id="gate-msg"
                    rows={3}
                    value={form.message}
                    onChange={(e) => onChange("message", e.target.value)}
                    placeholder="Tell us anything else we should know…"
                    className="mt-2 w-full bg-transparent border-b border-charcoal/20 focus:border-teal py-2.5 text-charcoal placeholder:text-muteink/40 outline-none resize-none transition-colors text-sm"
                  />
                </div>

                {status === "error" && error && (
                  <div className="flex items-start gap-3 p-4 border border-ember/30 bg-ember/5 text-charcoal">
                    <AlertCircle size={18} className="text-ember mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-2 w-full inline-flex items-center justify-center px-6 py-4 rounded-full bg-teal text-white text-sm uppercase tracking-widestx font-medium hover:bg-teal-dark transition-all duration-300 hover:shadow-lift disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Sending…" : "Unlock All Floor Plans"}
                </button>

                <p className="text-center text-[11px] text-muteink/50 pt-1">
                  By submitting, you agree to be contacted by our team.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Locked Image Placeholder ─────────────────────────────────────────────────
// Shows a blurred image + lock CTA. Clicking opens the full-screen gate.

interface LockedImageProps {
  src: string;
  alt: string;
  onRequestUnlock: () => void;
  sizes?: string;
  className?: string;
}

const LockedImage: React.FC<LockedImageProps> = ({ src, alt, onRequestUnlock, sizes, className }) => (
  <button
    onClick={onRequestUnlock}
    className={`relative w-full h-full block group cursor-pointer ${className ?? ""}`}
    aria-label="Click to unlock floor plan"
  >
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover object-center blur-md scale-105 transition-all duration-500"
      sizes={sizes}
      priority
    />
    {/* Subtle darkening on hover */}
    <div className="absolute inset-0 bg-white/40 group-hover:bg-white/30 transition-colors duration-300" />
    {/* CTA */}
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
      <div className="w-11 h-11 rounded-full bg-white border border-charcoal/10 shadow-subtle flex items-center justify-center group-hover:shadow-lift transition-shadow duration-300">
        <Lock size={16} className="text-teal" />
      </div>
      <span className="text-[11px] uppercase tracking-widestx text-charcoal font-medium">
        View Floor Plan
      </span>
    </div>
  </button>
);

// ─── Single View ──────────────────────────────────────────────────────────────

interface SingleViewProps {
  unit: FloorTabSingle;
  contentRef: React.RefObject<HTMLDivElement | null>;
  isUnlocked: boolean;
  onRequestUnlock: () => void;
}

const SingleView: React.FC<SingleViewProps> = ({ unit, contentRef, isUnlocked, onRequestUnlock }) => (
  <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-black/5 bg-white shadow-sm card-hover">
      {isUnlocked ? (
        <Image
          src={unit.image}
          alt={unit.title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      ) : (
        <LockedImage
          src={unit.image}
          alt={unit.title}
          onRequestUnlock={onRequestUnlock}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      )}
    </div>

    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-widestx text-teal font-medium">{unit.label}</span>
      <h3
        className="font-serif text-charcoal text-3xl md:text-4xl lg:text-5xl tracking-tight mt-3 leading-tight"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {unit.title}
      </h3>
      <p className="text-muteink text-base md:text-lg mt-5 leading-relaxed">{unit.description}</p>
      <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-charcoal/10 pt-7">
        {unit.meta.map((m) => (
          <div key={m.label} className="flex flex-col">
            <span className="text-[11px] uppercase tracking-widestx text-muteink">{m.label}</span>
            <span className="text-charcoal font-medium mt-1.5 text-base">{m.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3 text-xs text-muteink">
        {[
          { icon: <BedDouble size={13} />, label: "Spacious Bedrooms" },
          { icon: <Bath size={13} />, label: "Premium Fittings" },
          { icon: <Maximize2 size={13} />, label: "Open Layout" },
          { icon: <Compass size={13} />, label: "Cross Ventilation" },
        ].map((tag) => (
          <span key={tag.label} className="inline-flex items-center gap-2 px-3 py-1.5 border border-charcoal/10 rounded-full">
            {tag.icon} {tag.label}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// ─── Gallery View ─────────────────────────────────────────────────────────────

interface GalleryViewProps {
  unit: FloorTabGallery;
  contentRef: React.RefObject<HTMLDivElement | null>;
  isUnlocked: boolean;
  onRequestUnlock: () => void;
}

const GalleryView: React.FC<GalleryViewProps> = ({ unit, contentRef, isUnlocked, onRequestUnlock }) => (
  <div ref={contentRef}>
    <div className="max-w-3xl mb-10">
      <span className="text-xs uppercase tracking-widestx text-teal font-medium">{unit.label}</span>
      <h3
        className="font-serif text-charcoal text-3xl md:text-4xl lg:text-5xl tracking-tight mt-3 leading-tight"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {unit.title}
      </h3>
      <p className="text-muteink text-base md:text-lg mt-5 leading-relaxed">{unit.description}</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
      {unit.images.map((img, i) => (
        <div key={i} className="flex flex-col gap-3 group rounded-lg" data-testid={`podium-image-${i}`}>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-black/5 bg-white shadow-sm card-hover">
            {isUnlocked ? (
              <Image
                src={img.url}
                alt={img.label}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            ) : (
              <LockedImage
                src={img.url}
                alt={img.label}
                onRequestUnlock={onRequestUnlock}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            )}
          </div>
          <div className="text-center mt-1 text-xs uppercase tracking-widestx text-muteink">
            {img.label}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const FloorPlansGated: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(FLOOR_TABS[0].id);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const activeTab = FLOOR_TABS.find((t) => t.id === activeId) || FLOOR_TABS[0];

  // Restore session unlock
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("fp_unlocked") === "1") {
      setIsUnlocked(true);
    }
  }, []);

  // Content fade on tab change
  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
  }, [activeId]);

  // Sliding indicator
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

  useEffect(() => { updateIndicator(); }, [updateIndicator]);
  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  const handleUnlocked = () => {
    setIsUnlocked(true);
    setShowGate(false);
    if (typeof window !== "undefined") sessionStorage.setItem("fp_unlocked", "1");
  };

  return (
    <>
      {/* Full-screen gate — rendered at root level so it covers everything */}
      {showGate && <GateModal onUnlocked={handleUnlocked} />}

      <section id="floor-plans" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Heading */}
          <div className="mb-12">
            <span className="text-xs uppercase tracking-widestx text-teal font-medium">Residences</span>
            <h2
              className="text-charcoal font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mt-4 leading-[1.05]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Find Your <span className="italic text-teal">Perfect</span> Home
            </h2>
            <p className="text-muteink text-base md:text-lg leading-relaxed mt-5 max-w-3xl">
              Thoughtfully designed configurations for every lifestyle —
              considered layouts, generous proportions and uncompromised craftsmanship.
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
                style={{ color: activeId === t.id ? "#0dafbe" : "#555555" }}
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
              <SingleView
                unit={activeTab}
                contentRef={contentRef}
                isUnlocked={isUnlocked}
                onRequestUnlock={() => setShowGate(true)}
              />
            ) : (
              <GalleryView
                unit={activeTab}
                contentRef={contentRef}
                isUnlocked={isUnlocked}
                onRequestUnlock={() => setShowGate(true)}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default FloorPlansGated;