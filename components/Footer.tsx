"use client";

import React from "react";
import { sound } from "@/lib/audio";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    sound.playClick(1000);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full pt-16 pb-12 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden select-none">
      {/* Top Telemetry Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-theme-border-subtle pb-8 font-mono text-xs text-theme-muted">
        <div className="flex flex-col gap-1">
          <span className="text-theme-text font-bold uppercase tracking-widest">
            COORDINATES // TELEMETRY
          </span>
          <span>23.3441° N, 85.3096° E • UTC+05:30 [IST]</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-theme-text font-semibold">ALL NODES HEALTHY</span>
          <span className="text-theme-dim">//</span>
          <span>UPTIME: 99.98%</span>
        </div>

        <button
          onClick={scrollToTop}
          onMouseEnter={() => sound.playHover()}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-theme-surface hover:bg-theme-hover border border-theme-border text-theme-text uppercase tracking-wider transition-colors"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Middle Copyright Row */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-theme-muted">
        <p>© 2025–2026 SUMIT GUPTA. ALL SYSTEMS OPERATIONAL.</p>
        <div className="flex items-center gap-4">
          <span className="text-theme-dim">DISTRIBUTED ARCHITECTURE</span>
          <span>•</span>
          <span className="text-theme-accent">MACHINE LEARNING SYSTEMS</span>
        </div>
      </div>

      {/* Massive Oversized Monogram Watermark Running Across Bottom Edge */}
      <div className="w-full overflow-hidden pointer-events-none mt-16 -mb-6 opacity-10">
        <div className="font-display text-[15vw] font-black uppercase whitespace-nowrap tracking-tighter leading-none stroke-text">
          SUMIT GUPTA • ML &amp; SYSTEMS ARCHITECTURE
        </div>
      </div>
    </footer>
  );
}
