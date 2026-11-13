"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FlaxScrollPlantProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function FlaxScrollPlant({ containerRef }: FlaxScrollPlantProps) {
  const plantRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const triggerEl = containerRef.current;
    const plantEl = plantRef.current;
    if (!triggerEl || !plantEl) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const stemPaths = gsap.utils.toArray<SVGPathElement>(".flax-stem");
      stemPaths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      gsap.set(".flax-leaf", {
        scale: 0.2,
        opacity: 0,
        transformOrigin: "0% 100%",
      });

      gsap.set(".flax-leaf-left", {
        scale: 0.2,
        opacity: 0,
        transformOrigin: "100% 100%",
      });

      gsap.set(".flax-bloom", {
        scale: 0.15,
        opacity: 0,
        rotation: -18,
        transformOrigin: "50% 50%",
      });

      gsap.set(".flax-boll", {
        scale: 0.2,
        opacity: 0,
        transformOrigin: "50% 100%",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      // Continuous organic sway, drift, and subtle scale across the full page scroll
      tl.fromTo(
        plantEl,
        { y: 24, rotation: -4, scale: 0.94 },
        { y: -36, rotation: 4, scale: 1.04, ease: "none", duration: 1 },
        0
      );

      // Draw main stem and side branches
      tl.to(
        stemPaths,
        {
          strokeDashoffset: 0,
          stagger: 0.08,
          duration: 0.55,
          ease: "power1.inOut",
        },
        0
      );

      // Unfurl narrow flax leaves sequentially along the scroll
      tl.to(
        ".flax-leaf, .flax-leaf-left",
        {
          scale: 1,
          opacity: 1,
          stagger: 0.035,
          duration: 0.25,
          ease: "back.out(1.4)",
        },
        0.12
      );

      // Open flax blossoms & seed bolls as you reach middle/lower sections
      tl.to(
        ".flax-bloom",
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          stagger: 0.08,
          duration: 0.3,
          ease: "back.out(1.6)",
        },
        0.35
      );

      tl.to(
        ".flax-boll",
        {
          scale: 1,
          opacity: 1,
          stagger: 0.08,
          duration: 0.25,
          ease: "back.out(1.5)",
        },
        0.48
      );
    }, plantRef);

    return () => ctx.revert();
  }, [containerRef]);

  return (
    <div
      ref={plantRef}
      aria-hidden="true"
      className="pointer-events-none fixed right-1 sm:right-3 lg:right-6 xl:right-10 top-1/2 -translate-y-1/2 z-20 hidden sm:block w-36 md:w-44 lg:w-56 xl:w-64 opacity-[0.16] lg:opacity-[0.2] mix-blend-multiply select-none"
    >
      <svg
        viewBox="0 0 240 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        {/* Main slender flax stem */}
        <path
          className="flax-stem"
          d="M124 505 C120 430, 128 360, 118 290 C108 220, 115 155, 124 72"
          stroke="#6E5A3E"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Upper left branch */}
        <path
          className="flax-stem"
          d="M116 210 C96 175, 76 150, 62 115"
          stroke="#6E5A3E"
          strokeWidth="1.9"
          strokeLinecap="round"
        />

        {/* Upper right branch */}
        <path
          className="flax-stem"
          d="M116 178 C142 152, 164 132, 180 102"
          stroke="#6E5A3E"
          strokeWidth="1.9"
          strokeLinecap="round"
        />

        {/* Alternating narrow flax leaves */}
        <path
          className="flax-leaf-left"
          d="M121 440 C98 430, 82 414, 74 398 C92 406, 108 420, 121 440 Z"
          fill="#8C7352"
        />
        <path
          className="flax-leaf"
          d="M123 402 C148 392, 166 376, 174 360 C156 368, 138 384, 123 402 Z"
          fill="#8C7352"
        />
        <path
          className="flax-leaf-left"
          d="M121 356 C96 344, 78 326, 70 308 C88 318, 106 336, 121 356 Z"
          fill="#8C7352"
        />
        <path
          className="flax-leaf"
          d="M120 318 C146 306, 166 290, 176 272 C158 282, 138 298, 120 318 Z"
          fill="#8C7352"
        />
        <path
          className="flax-leaf-left"
          d="M115 268 C90 256, 74 238, 66 220 C84 230, 102 248, 115 268 Z"
          fill="#8C7352"
        />
        <path
          className="flax-leaf"
          d="M115 232 C140 220, 158 202, 168 184 C150 194, 132 212, 115 232 Z"
          fill="#8C7352"
        />
        <path
          className="flax-leaf-left"
          d="M92 168 C74 156, 62 142, 56 128 C72 136, 84 150, 92 168 Z"
          fill="#8C7352"
        />
        <path
          className="flax-leaf"
          d="M148 144 C166 136, 180 124, 190 112 C174 118, 160 130, 148 144 Z"
          fill="#8C7352"
        />

        {/* Top primary flax blossom (5 petals) */}
        <g className="flax-bloom" transform="translate(124, 62)">
          <ellipse cx="0" cy="-18" rx="10" ry="16" fill="#3F166B" fillOpacity="0.85" />
          <ellipse cx="17" cy="-6" rx="10" ry="16" transform="rotate(72 17 -6)" fill="#3F166B" fillOpacity="0.85" />
          <ellipse cx="11" cy="14" rx="10" ry="16" transform="rotate(144 11 14)" fill="#3F166B" fillOpacity="0.85" />
          <ellipse cx="-11" cy="14" rx="10" ry="16" transform="rotate(-144 -11 14)" fill="#3F166B" fillOpacity="0.85" />
          <ellipse cx="-17" cy="-6" rx="10" ry="16" transform="rotate(-72 -17 -6)" fill="#3F166B" fillOpacity="0.85" />
          <circle cx="0" cy="0" r="6.5" fill="#EDC271" />
        </g>

        {/* Left branch flax blossom */}
        <g className="flax-bloom" transform="translate(60, 108) scale(0.78)">
          <ellipse cx="0" cy="-18" rx="10" ry="16" fill="#3F166B" fillOpacity="0.8" />
          <ellipse cx="17" cy="-6" rx="10" ry="16" transform="rotate(72 17 -6)" fill="#3F166B" fillOpacity="0.8" />
          <ellipse cx="11" cy="14" rx="10" ry="16" transform="rotate(144 11 14)" fill="#3F166B" fillOpacity="0.8" />
          <ellipse cx="-11" cy="14" rx="10" ry="16" transform="rotate(-144 -11 14)" fill="#3F166B" fillOpacity="0.8" />
          <ellipse cx="-17" cy="-6" rx="10" ry="16" transform="rotate(-72 -17 -6)" fill="#3F166B" fillOpacity="0.8" />
          <circle cx="0" cy="0" r="6.5" fill="#EDC271" />
        </g>

        {/* Right branch flax seed boll (capsule) */}
        <g className="flax-boll" transform="translate(182, 98)">
          <path
            d="M0 0 C-10 -4, -12 -18, 0 -24 C12 -18, 10 -4, 0 0 Z"
            fill="#EDC271"
            stroke="#6E5A3E"
            strokeWidth="1.6"
          />
          <path d="M0 -24 L0 0" stroke="#6E5A3E" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}

