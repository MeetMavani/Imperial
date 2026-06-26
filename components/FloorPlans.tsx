"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { BedDouble, Bath, Maximize2, Compass, Lock, Check, AlertCircle, X } from "lucide-react";
import { FLOOR_TABS, FloorTabSingle, FloorTabGallery } from "../data/content";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UnlockForm {
  name: string;
  phone: string;
}

type UnlockStatus = "idle" | "submitting" | "success" | "error";

// ─── Config ───────────────────────────────────────────────────────────────────

// Paste your Google Apps Script Web App URL here
const SHEET_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

// ─── Unlock Form (inline, inside the image overlay) ───────────────────────────

interface UnlockFormProps {
  onSuccess: () => void;
  onDismiss: () => void;
}

const UnlockFormPanel: React.FC<UnlockFormProps> = ({ onSuccess, onDismiss }) => {
  const [form, setForm] = useState<UnlockForm>({ name: "", phone: "" });
  const [status, setStatus] = useState<UnlockStatus>("idle");
  const [error, setError] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  // Animate in on mount
  useEffect(() => {
    if (!panelRef.current) return;
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
    );
  }, []);

  const validate = (): string => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/^[0-9+\-\s()]{7,}$/.test(form.phone.trim()))
      return "Please enter a valid phone number.";
    return "";
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); setStatus("error"); return; }

    setError("");
    setStatus("submitting");

    try {
      // Send to Google Sheets
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors", // required for Apps Script
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          source: "Floor Plan Unlock",
          timestamp: new Date().toISOString(),
        }),
      });

      setStatus("success");

      // Short pause so user sees the success tick, then reveal
      setTimeout(() => {
        onSuccess();
      }, 800);
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div
        ref={panelRef}
        className="flex flex-col items-center gap-3 text-center px-6"
      >
        <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
          <Check size={20} className="text-teal" />
        </div>
        <p className="text-sm font-medium text-charcoal">Unlocking floor plan…</p>
      </div>
    );
  }

  return (
    <div ref={panelRef} className="w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Lock size={13} className="text-teal" />
            <span className="text-[11px] uppercase tracking-widestx text-teal font-medium">
              Unlock Floor Plan
            </span>
          </div>
          <p className="text-xs text-muteink leading-relaxed">
            Share your details and we&apos;ll also reach out with pricing & availability.
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="ml-4 mt-0.5 text-muteink hover:text-charcoal transition-colors flex-shrink-0"
          aria-label="Dismiss"
        >
          <X size={15} />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} noValidate className="space-y-3">
        <div>
          <label htmlFor="unlock-name" className="text-[11px] uppercase tracking-widestx text-muteink">
            Name
          </label>
          <input
            id="unlock-name"
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Aarav Mehta"
            className="mt-1.5 w-full bg-transparent border-b border-charcoal/20 focus:border-teal py-2 text-sm text-charcoal placeholder:text-muteink/40 outline-none transition-colors"
          />
        </div>
        <div>
          <label htmlFor="unlock-phone" className="text-[11px] uppercase tracking-widestx text-muteink">
            Phone
          </label>
          <input
            id="unlock-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder="+91 98XXX XXXXX"
            className="mt-1.5 w-full bg-transparent border-b border-charcoal/20 focus:border-teal py-2 text-sm text-charcoal placeholder:text-muteink/40 outline-none transition-colors"
          />
        </div>

        {status === "error" && error && (
          <div className="flex items-center gap-2 text-ember text-xs pt-1">
            <AlertCircle size={12} />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-2 w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-teal text-white text-[11px] uppercase tracking-widestx font-medium hover:bg-teal-dark transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Sending…" : "View Floor Plan"}
        </button>
      </form>
    </div>
  );
};

// ─── Locked Image Overlay ─────────────────────────────────────────────────────

interface LockedOverlayProps {
  onUnlocked: () => void;
  isGallery?: boolean;
}

const LockedOverlay: React.FC<LockedOverlayProps> = ({ onUnlocked, isGallery = false }) => {
  const [showForm, setShowForm] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleUnlock = () => {
    // GSAP fade out the overlay, then call onUnlocked
    if (!overlayRef.current) { onUnlocked(); return; }
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: onUnlocked,
    });
  };

  return (
    <div
      ref={overlayRef}
      className={`absolute inset-0 z-10 flex items-center justify-center rounded-lg ${isGallery ? "rounded-lg" : ""
        }`}
      style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(253,250,245,0.6)" }}
    >
      {!showForm ? (
        // CTA state
        <div className="flex flex-col items-center gap-4 text-center px-6">
          <div className="w-12 h-12 rounded-full bg-white border border-charcoal/10 shadow-subtle flex items-center justify-center">
            <Lock size={18} className="text-teal" />
          </div>
          <div>
            <p className="text-sm font-medium text-charcoal">Floor plan available</p>
            <p className="text-xs text-muteink mt-1">
              Share your details to view the full layout
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal text-white text-[11px] uppercase tracking-widestx font-medium hover:bg-teal-dark transition-all duration-300 shadow-lift"
          >
            <Lock size={11} /> Unlock Plan
          </button>
          <button
            onClick={() => { }} // does nothing — user can just scroll away
            className="text-[11px] text-muteink/60 hover:text-muteink transition-colors underline underline-offset-2"
          >
            Maybe later
          </button>
        </div>
      ) : (
        // Form state
        <div className="w-full max-w-xs bg-white border border-charcoal/10 shadow-lift rounded-lg p-6 mx-4">
          <UnlockFormPanel
            onSuccess={handleUnlock}
            onDismiss={() => setShowForm(false)}
          />
        </div>
      )}
    </div>
  );
};

// ─── Single View ──────────────────────────────────────────────────────────────

interface SingleViewProps {
  unit: FloorTabSingle;
  contentRef: React.RefObject<HTMLDivElement | null>;
  isUnlocked: boolean;
  onUnlocked: () => void;
}

const SingleView: React.FC<SingleViewProps> = ({ unit, contentRef, isUnlocked, onUnlocked }) => (
  <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
    {/* Image with optional lock overlay */}
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-black/5 bg-white shadow-sm card-hover">
      <Image
        src={unit.image}
        alt={unit.title}
        fill
        className={`object-cover object-center transition-all duration-700 ${isUnlocked ? "blur-0" : "blur-md scale-105"
          }`}
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />
      {!isUnlocked && (
        <LockedOverlay onUnlocked={onUnlocked} />
      )}
    </div>

    {/* Info — always visible */}
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-widestx text-teal font-medium">
        {unit.label}
      </span>
      <h3
        className="font-serif text-charcoal text-3xl md:text-4xl lg:text-5xl tracking-tight mt-3 leading-tight"
        style={{ fontFamily: "var(--font-serif)" }}
      >
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

// ─── Gallery View ─────────────────────────────────────────────────────────────

interface GalleryViewProps {
  unit: FloorTabGallery;
  contentRef: React.RefObject<HTMLDivElement | null>;
  isUnlocked: boolean;
  onUnlocked: () => void;
}

const GalleryView: React.FC<GalleryViewProps> = ({ unit, contentRef, isUnlocked, onUnlocked }) => (
  <div ref={contentRef}>
    <div className="max-w-3xl mb-10">
      <span className="text-xs uppercase tracking-widestx text-teal font-medium">
        {unit.label}
      </span>
      <h3
        className="font-serif text-charcoal text-3xl md:text-4xl lg:text-5xl tracking-tight mt-3 leading-tight"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {unit.title}
      </h3>
      <p className="text-muteink text-base md:text-lg mt-5 leading-relaxed">
        {unit.description}
      </p>
    </div>

    {/* Gallery grid with one shared overlay */}
    <div className="relative">
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
                className={`object-cover object-center transition-all duration-700 group-hover:scale-105 ${isUnlocked ? "blur-0" : "blur-md scale-105"
                  }`}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            </div>
            <div className="text-center mt-1 text-xs uppercase tracking-widestx text-muteink">
              {img.label}
            </div>
          </div>
        ))}
      </div>

      {/* Single overlay spans the whole gallery grid */}
      {!isUnlocked && (
        <div
          className="absolute inset-0 -mx-2 -my-2 flex items-center justify-center rounded-lg"
          style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(253,250,245,0.55)" }}
        >
          <LockedOverlay onUnlocked={onUnlocked} isGallery />
        </div>
      )}
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const FloorPlans: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(FLOOR_TABS[0].id);
  // One unlock state shared across all tabs — fill once, see all
  const [isUnlocked, setIsUnlocked] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const activeTab = FLOOR_TABS.find((t) => t.id === activeId) || FLOOR_TABS[0];

  // Content fade on tab change
  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [activeId]);

  // Sliding tab indicator
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

  // Persist unlock for this session
  const handleUnlocked = () => {
    setIsUnlocked(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("fp_unlocked", "1");
    }
  };

  // Restore unlock state on mount (page refresh within same session)
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("fp_unlocked") === "1") {
        setIsUnlocked(true);
      }
    }
  }, []);

  return (
    <section id="floor-plans" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Heading */}
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widestx text-teal font-medium">
            Residences
          </span>
          <h2
            className="text-charcoal font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mt-4 leading-[1.05]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Find Your <span className="italic text-teal">Perfect</span> Home
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
              onUnlocked={handleUnlocked}
            />
          ) : (
            <GalleryView
              unit={activeTab}
              contentRef={contentRef}
              isUnlocked={isUnlocked}
              onUnlocked={handleUnlocked}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default FloorPlans;