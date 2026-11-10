"use client";

import React, { useId } from "react";

interface EgyNileLogoProps {
  className?: string;
}

export default function EgyNileLogo({
  className = "w-10 h-10",
}: EgyNileLogoProps) {
  const uid = useId().replace(/:/g, "");
  const nileBgId = `nileBg-${uid}`;
  const flaxGoldId = `flaxGold-${uid}`;
  const linenCreamId = `linenCream-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      role="img"
      aria-label="EgyNile Flax Official Emblem"
    >
      <defs>
        <linearGradient
          id={nileBgId}
          x1="0"
          y1="0"
          x2="120"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1F3B2C" />
          <stop offset="55%" stopColor="#14231A" />
          <stop offset="100%" stopColor="#0C1710" />
        </linearGradient>
        <linearGradient
          id={flaxGoldId}
          x1="20"
          y1="12"
          x2="100"
          y2="108"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="45%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient
          id={linenCreamId}
          x1="30"
          y1="20"
          x2="90"
          y2="95"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FAF7F2" />
          <stop offset="100%" stopColor="#E7E0D3" />
        </linearGradient>
      </defs>

      {/* Outer Rounded Crest */}
      <rect x="4" y="4" width="112" height="112" rx="28" fill={`url(#${nileBgId})`} />
      <rect
        x="4"
        y="4"
        width="112"
        height="112"
        rx="28"
        stroke={`url(#${flaxGoldId})`}
        strokeWidth="3.2"
        strokeOpacity="0.8"
      />
      <rect
        x="10"
        y="10"
        width="100"
        height="100"
        rx="22"
        stroke="#FBBF24"
        strokeWidth="1"
        strokeOpacity="0.24"
      />

      {/* Egyptian Sun Disc Halo at Crown */}
      <circle cx="60" cy="30" r="11" fill="#FBBF24" fillOpacity="0.14" />
      <circle cx="60" cy="30" r="4.5" fill={`url(#${flaxGoldId})`} />

      {/* Central Tall Flax Stem (Long-Staple Fiber) */}
      <path
        d="M60 86V33"
        stroke={`url(#${flaxGoldId})`}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Left & Right Arching Flax Fiber Strands */}
      <path
        d="M60 86C52 72 44 55 41 37"
        stroke={`url(#${flaxGoldId})`}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M60 86C68 72 76 55 79 37"
        stroke={`url(#${flaxGoldId})`}
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* Symmetrical Botanical Flax Leaves / Bolls along Central Stem */}
      <path
        d="M60 66C52 63 48 56 50 49C56 51 60 57 60 66Z"
        fill={`url(#${flaxGoldId})`}
      />
      <path
        d="M60 66C68 63 72 56 70 49C64 51 60 57 60 66Z"
        fill={`url(#${flaxGoldId})`}
      />

      <path
        d="M60 50C53 47 50 41 52 35C57 37 60 42 60 50Z"
        fill={`url(#${linenCreamId})`}
      />
      <path
        d="M60 50C67 47 70 41 68 35C63 37 60 42 60 50Z"
        fill={`url(#${linenCreamId})`}
      />

      {/* Left & Right Flax Seed Capsules (Bolls) */}
      <path
        d="M41 37C35 35 32 29 35 23C41 25 43 31 41 37Z"
        fill={`url(#${flaxGoldId})`}
      />
      <path
        d="M79 37C85 35 88 29 85 23C79 25 77 31 79 37Z"
        fill={`url(#${flaxGoldId})`}
      />

      {/* Outer Fine Hackled Fiber Arcs */}
      <path
        d="M46 78C34 68 28 54 29 41"
        stroke="#34D399"
        strokeWidth="2"
        strokeOpacity="0.65"
        strokeLinecap="round"
      />
      <path
        d="M74 78C86 68 92 54 91 41"
        stroke="#34D399"
        strokeWidth="2"
        strokeOpacity="0.65"
        strokeLinecap="round"
      />

      {/* Twin Nile Delta Waves at Base */}
      <path
        d="M24 89C36 83 48 83 60 89C72 95 84 95 96 89"
        stroke={`url(#${flaxGoldId})`}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M30 98C40 93 50 93 60 98C70 103 80 103 90 98"
        stroke="#FAF7F2"
        strokeWidth="2.2"
        strokeOpacity="0.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

