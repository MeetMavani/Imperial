"use client";

import React, { useRef, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { Check, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CONFIGURATIONS } from "../data/content";

interface FormState {
  name: string;
  phone: string;
  config: string;
  message: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const Enquiry: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    config: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle"); // idle | submitting | success | error
  const [error, setError] = useState<string>("");

  const onChange = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const validate = (): string => {
    if (!form.name.trim()) return "Please enter your full name.";
    if (!/^[0-9+\-\s()]{7,}$/.test(form.phone.trim()))
      return "Please enter a valid phone number.";
    if (!form.config) return "Please choose a configuration.";
    return "";
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      setStatus("error");
      return;
    }
    setError("");
    setStatus("submitting");
    // UI only — simulate submission delay
    const timer = setTimeout(() => {
      setStatus("success");
      setForm({ name: "", phone: "", config: "", message: "" });
    }, 900);
    return () => clearTimeout(timer);
  };

  return (
    <section
      id="contact"
      ref={ref}
      data-testid="enquiry-section"
      className="relative bg-cream py-24 md:py-32 grain overflow-hidden"
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(#1A1A1A 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <span
            data-reveal
            className="text-xs uppercase tracking-widestx text-teal font-medium"
          >
            Enquire Now
          </span>
          <h2
            data-reveal
            data-testid="enquiry-heading"
            className="font-serif text-charcoal text-4xl md:text-5xl lg:text-6xl tracking-tight mt-4 leading-[1.05]"
          >
            Begin Your Journey{" "}
            <span className="italic text-gold-dark">Home</span>
          </h2>
          <p
            data-reveal
            className="text-muteink text-base md:text-lg leading-relaxed mt-5"
          >
            Our team will reach out within 24 hours with curated configurations,
            availability, pricing and a personal tour.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          data-reveal
          data-testid="enquiry-form"
          className="mt-14 max-w-[560px] mx-auto bg-white border border-charcoal/10 p-7 md:p-10 shadow-subtle"
          noValidate
        >
          <div className="space-y-5">
            <div>
              <label
                htmlFor="enq-name"
                className="text-[11px] uppercase tracking-widestx text-muteink"
              >
                Full Name
              </label>
              <input
                id="enq-name"
                type="text"
                value={form.name}
                onChange={(e) => onChange("name", e.target.value)}
                data-testid="enquiry-name-input"
                placeholder="e.g. Aarav Mehta"
                className="mt-2 w-full bg-transparent border-b border-charcoal/20 focus:border-teal py-2.5 text-charcoal placeholder:text-muteink/50 outline-none transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="enq-phone"
                className="text-[11px] uppercase tracking-widestx text-muteink"
              >
                Phone Number
              </label>
              <input
                id="enq-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => onChange("phone", e.target.value)}
                data-testid="enquiry-phone-input"
                placeholder="+91 98XXX XXXXX"
                className="mt-2 w-full bg-transparent border-b border-charcoal/20 focus:border-teal py-2.5 text-charcoal placeholder:text-muteink/50 outline-none transition-colors"
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
                    data-testid="enquiry-config-trigger"
                    className="w-full bg-transparent border-0 border-b border-charcoal/20 rounded-none focus:ring-0 focus:border-teal px-0 py-2.5 text-charcoal"
                  >
                    <SelectValue placeholder="Select a configuration" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONFIGURATIONS.map((c) => (
                      <SelectItem
                        key={c.value}
                        value={c.value}
                        data-testid={`enquiry-config-option-${c.value}`}
                      >
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label
                htmlFor="enq-msg"
                className="text-[11px] uppercase tracking-widestx text-muteink"
              >
                Message <span className="normal-case text-muteink/60">(optional)</span>
              </label>
              <textarea
                id="enq-msg"
                rows={3}
                value={form.message}
                onChange={(e) => onChange("message", e.target.value)}
                data-testid="enquiry-message-input"
                placeholder="Tell us anything else we should know…"
                className="mt-2 w-full bg-transparent border-b border-charcoal/20 focus:border-teal py-2.5 text-charcoal placeholder:text-muteink/50 outline-none resize-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            data-testid="enquiry-submit-button"
            className="mt-8 w-full inline-flex items-center justify-center px-6 py-4 rounded-full bg-teal text-white text-sm uppercase tracking-widestx font-medium hover:bg-teal-dark transition-all duration-300 hover:shadow-lift disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Sending…" : "Send Enquiry"}
          </button>

          {status === "success" && (
            <div
              data-testid="enquiry-success"
              className="mt-5 flex items-start gap-3 p-4 border border-teal/30 bg-teal/5 text-charcoal"
            >
              <Check size={18} className="text-teal mt-0.5 flex-shrink-0" />
              <p className="text-sm">
                Thank you! We&apos;ll be in touch shortly.
              </p>
            </div>
          )}
          {status === "error" && error && (
            <div
              data-testid="enquiry-error"
              className="mt-5 flex items-start gap-3 p-4 border border-ember/30 bg-ember/5 text-charcoal"
            >
              <AlertCircle
                size={18}
                className="text-ember mt-0.5 flex-shrink-0"
              />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Enquiry;
