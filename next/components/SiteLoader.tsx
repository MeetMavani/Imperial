"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ASSETS } from "../data/content";

interface SiteLoaderProps {
  enabled?: boolean;
  onFinish: () => void;
}

const SiteLoader: React.FC<SiteLoaderProps> = ({ enabled = true, onFinish }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const finished = useRef(false);
  const previousOverflowRef = useRef<string | null>(null);
  const [done, setDone] = useState(false);

  const restoreScrollLock = useCallback(() => {
    if (previousOverflowRef.current === null) return;

    document.body.style.overflow = previousOverflowRef.current;
    previousOverflowRef.current = null;
  }, []);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;

    const wrapper = wrapRef.current;
    if (!wrapper) {
      restoreScrollLock();
      setDone(true);
      onFinish();
      return;
    }

    wrapper.style.pointerEvents = "none";
    gsap.to(wrapper, {
      autoAlpha: 0,
      scale: 1.015,
      duration: 0.85,
      ease: "power3.inOut",
      onComplete: () => {
        restoreScrollLock();
        setDone(true);
        onFinish();
      },
    });
  }, [onFinish, restoreScrollLock]);

  useEffect(() => {
    if (!enabled) {
      onFinish();
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    if (previousOverflowRef.current === null) {
      previousOverflowRef.current = document.body.style.overflow;
    }
    document.body.style.overflow = "hidden";

    const video = videoRef.current;
    const onError = () => finish();
    video?.addEventListener("error", onError);
    void video?.play().catch(() => finish());

    const safetyTimer = window.setTimeout(finish, 8000);

    return () => {
      video?.removeEventListener("error", onError);
      window.clearTimeout(safetyTimer);
      restoreScrollLock();
    };
  }, [enabled, finish, onFinish, restoreScrollLock]);

  const updateProgress = () => {
    const video = videoRef.current;
    const progress = progressRef.current;
    if (!video || !progress || !Number.isFinite(video.duration)) return;

    const ratio = Math.min(video.currentTime / video.duration, 1);
    progress.style.transform = `scaleX(${ratio})`;
  };

  if (!enabled || done) return null;

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-charcoal text-white"
      data-testid="site-loader"
      role="status"
      aria-label="Loading Aarambh Imperial"
    >
      <video
        ref={videoRef}
        data-testid="site-loader-video"
        className="absolute inset-0 h-full w-full object-cover"
        src={ASSETS.heroVideo}
        poster={ASSETS.aboutSketch}
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={updateProgress}
        onEnded={finish}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/30 to-charcoal/10" />

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <div className="text-[10px] font-semibold uppercase tracking-widestx text-white/60">
          Aarambh Imperial
        </div>
        <button
          type="button"
          onClick={finish}
          data-testid="site-loader-skip"
          className="border-b border-white/35 pb-1 text-[10px] font-semibold uppercase tracking-widestx text-white transition-colors hover:border-gold hover:text-gold"
        >
          Skip intro
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-8 md:px-10 md:pb-10">
        <div className="flex items-end justify-between gap-6 border-b border-white/15 pb-5">
          <p className="max-w-xl font-serif text-3xl leading-[1.1] tracking-tight text-white/95 md:text-5xl">
            From the first line<br />
            to a <span className="italic text-gold font-medium">lasting landmark</span>.
          </p>
          <span className="hidden text-[10px] font-semibold uppercase tracking-widestx text-white/60 sm:block">
            Mulund West, Mumbai
          </span>
        </div>
        <div className="mt-4 h-px w-full overflow-hidden bg-white/10">
          <div
            ref={progressRef}
            className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-teal via-gold to-ember will-change-transform"
          />
        </div>
      </div>
    </div>
  );
};

export default SiteLoader;
