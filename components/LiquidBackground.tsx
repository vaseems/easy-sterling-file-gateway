"use client";

import React from "react";

interface LiquidBackgroundProps {
  readonly color1?: string;
  readonly color2?: string;
  readonly color3?: string;
}

export function LiquidBackground({
  color1 = "#667eea",
  color2 = "#764ba2",
  color3 = "#06b6d4",
}: LiquidBackgroundProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Blob 1 */}
      <div
        className="blob"
        style={{
          width: 600,
          height: 600,
          background: color1,
          top: -100,
          left: -100,
          animationDelay: "0s",
        }}
      />
      {/* Blob 2 */}
      <div
        className="blob"
        style={{
          width: 500,
          height: 500,
          background: color2,
          top: "40%",
          right: -80,
          animationDelay: "3s",
        }}
      />
      {/* Blob 3 */}
      <div
        className="blob"
        style={{
          width: 400,
          height: 400,
          background: color3,
          bottom: -60,
          left: "30%",
          animationDelay: "6s",
        }}
      />
      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
