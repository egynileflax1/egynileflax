"use client";

import React, { useEffect, useState } from "react";
import EgyNileLogo from "@/components/EgyNileLogo";

declare global {
  interface Window {
    __egyNileLoaderDone?: boolean;
  }
}

export const LOADER_DONE_EVENT = "egynile:loader-done";

interface PageLoaderProps {
  persistent?: boolean;
}

export default function PageLoader({ persistent = false }: PageLoaderProps) {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (persistent) return;

    const notifyDone = () => {
      if (window.__egyNileLoaderDone) return;
      window.__egyNileLoaderDone = true;
      window.dispatchEvent(new CustomEvent(LOADER_DONE_EVENT));
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setHidden(true);
      notifyDone();
      return;
    }

    let minTimer: number | undefined;
    let maxTimer: number | undefined;
    let removeTimer: number | undefined;
    let minElapsed = false;
    let pageLoaded = document.readyState === "complete";

    const startFadeOut = () => {
      setFading(true);
      notifyDone();
      removeTimer = window.setTimeout(() => {
        setHidden(true);
      }, 420);
    };

    const tryClose = () => {
      if (minElapsed && pageLoaded) {
        startFadeOut();
      }
    };

    const onLoad = () => {
      pageLoaded = true;
      tryClose();
    };

    minTimer = window.setTimeout(() => {
      minElapsed = true;
      tryClose();
    }, 450);

    maxTimer = window.setTimeout(() => {
      startFadeOut();
    }, 1200);

    if (!pageLoaded) {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(maxTimer);
      window.clearTimeout(removeTimer);
      window.removeEventListener("load", onLoad);
    };
  }, [persistent]);

  if (hidden) return null;

  return (
    <div
      aria-busy="true"
      aria-label="Loading Egy Nile Flax"
      className={`fixed inset-0 z-[100] bg-[#FAF8F5] flex flex-col items-center justify-center gap-5 transition-all duration-400 ease-out ${
        fading ? "opacity-0 scale-[1.03] pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32">
        {/* Soft golden ambient glow */}
        <div className="absolute inset-3 rounded-full bg-[#EDC271]/25 blur-xl animate-pulse" />

        {/* Outer spinning dual-tone ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#EDC271]/35 border-t-[#3F166B] border-r-[#EDC271] animate-spin [animation-duration:1.3s]" />

        {/* Inner subtle counter ring */}
        <div className="absolute inset-2.5 rounded-full border border-[#3F166B]/15" />

        {/* Factory logo with gentle pulse */}
        <EgyNileLogo className="relative w-16 h-16 sm:w-20 sm:h-20 drop-shadow-xs animate-pulse [animation-duration:1.8s]" />
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#3F166B]">
          Egy Nile Flax
        </span>
        <div className="w-24 h-0.5 rounded-full bg-stone-200 overflow-hidden">
          <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-[#3F166B] via-[#EDC271] to-[#3F166B] animate-loader-bar" />
        </div>
      </div>
    </div>
  );
}
