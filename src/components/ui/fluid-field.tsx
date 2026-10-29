"use client";

import type { CSSProperties } from "react";

export type FluidFieldBackgroundProps = {
  mode?: "dark" | "light";
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Ultra-lightweight GPU-composited Obsidian & Charcoal architectural background.
 * Replaces the heavy iframe + Three.js + SVG feTurbulence shader to guarantee
 * 60fps scrolling and zero main-thread / secondary WebGL context overhead.
 */
export function FluidFieldBackground({
  className = "",
  style,
}: FluidFieldBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative w-full h-full overflow-hidden bg-[#030306] ${className}`.trim()}
      style={{
        contain: "strict",
        ...style,
      }}
    >
      {/* Ambient Charcoal & Subtle Gold Studio Glow Layers (Zero-JS, Compositor-only) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 15%, rgba(36, 39, 48, 0.42) 0%, transparent 52%), radial-gradient(circle at 82% 45%, rgba(28, 30, 38, 0.38) 0%, transparent 55%), radial-gradient(circle at 50% 88%, rgba(212, 175, 55, 0.045) 0%, transparent 60%)",
        }}
      />

      {/* Architectural Hairline Diagonal Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 14px)",
        }}
      />
    </div>
  );
}

export default FluidFieldBackground;
