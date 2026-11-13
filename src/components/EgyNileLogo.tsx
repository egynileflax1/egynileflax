"use client";

import React from "react";

interface EgyNileLogoProps {
  className?: string;
}

export default function EgyNileLogo({
  className = "w-10 h-10",
}: EgyNileLogoProps) {
  return (
    <img
      src="/Logo.webp"
      alt="Egy Nile Flax Logo"
      className={`${className} object-contain`}
    />
  );
}
