"use client";

import React, { useEffect, useState } from "react";
import { useTheme, THEMES, ThemeMode } from "@/lib/theme";
import { sound } from "@/lib/audio";
import { Volume2, VolumeX, Terminal, Sparkles, Layers } from "lucide-react";

export default function Header() {
  const { theme, setTheme, cycleTheme } = useTheme();
  const [isMuted, setIsMuted] = useState(false);
  const [timeString, setTimeString] = useState("");
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    setIsMuted(sound.getMuted());

    // Update Live IST Clock
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTimeString(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAudioToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const navItems = [
    { label: "01 ARCHIVE", href: "#archive" },
    { label: "02 LAB", href: "#lab" },
    { label: "03 ARSENAL", href: "#arsenal" },
    { label: "04 DOSSIER", href: "#dossier" },
    { label: "05 CONTACT", href: "#contact" },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50 select-none">
      <div className="h-16 px-4 sm:px-6 rounded-full bg-theme-surface/85 backdrop-blur-2xl border border-theme-border shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-between gap-4">
        {/* Left: Brand Identity & Telemetry */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            onClick={() => sound.playClick(900)}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-full bg-theme-hover border border-theme-border flex items-center justify-center text-theme-accent group-hover:scale-105 transition-transform">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold tracking-tight text-theme-text uppercase group-hover:text-theme-accent transition-colors">
                Sumit Gupta
              </span>
              <span className="font-mono text-[9px] tracking-widest text-theme-muted uppercase hidden sm:inline">
                SYS.ML // 0x7F
              </span>
            </div>
          </a>

          {/* Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-theme-card border border-theme-border-subtle">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] text-theme-muted uppercase tracking-wider">
              Available for Q3 '25 Roles
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-theme-card/60 border border-theme-border-subtle">
          {navItems.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => {
                sound.playClick(750 + idx * 60);
                setActiveSection(item.href);
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-3.5 py-1.5 rounded-full font-mono text-[11px] tracking-wider uppercase text-theme-muted hover:text-theme-text hover:bg-theme-hover transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Sound Toggle, Live Clock & 5-Mode Theme Selector */}
        <div className="flex items-center gap-3">
          {/* Live IST Clock */}
          <div className="hidden xl:flex flex-col text-right font-mono text-[10px]">
            <span className="text-theme-text font-medium">{timeString || "03:00 PM IST"}</span>
            <span className="text-theme-muted text-[8px] tracking-wider uppercase">
              NEW DELHI • UTC+05:30
            </span>
          </div>

          {/* Sound FX Button */}
          <button
            onClick={handleAudioToggle}
            onMouseEnter={() => sound.playHover()}
            title={isMuted ? "Unmute Synthetic Audio" : "Mute Synthetic Audio"}
            className="w-8 h-8 rounded-full bg-theme-card border border-theme-border hover:border-theme-accent text-theme-muted hover:text-theme-text flex items-center justify-center transition-colors"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-theme-accent" />}
          </button>

          {/* 5-Mode Theme Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-theme-card border border-theme-border">
            {(Object.keys(THEMES) as ThemeMode[]).map((modeKey, i) => {
              const item = THEMES[modeKey];
              const isActive = theme === modeKey;
              return (
                <button
                  key={modeKey}
                  onClick={() => {
                    setTheme(modeKey);
                    sound.playThemeChord(i);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  title={item.name}
                  className={`w-6 h-6 rounded-full font-mono text-[10px] font-bold flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-theme-accent text-theme-bg shadow-[0_0_12px_var(--accent-glow)] scale-105"
                      : "text-theme-muted hover:text-theme-text hover:bg-theme-hover"
                  }`}
                >
                  {item.number}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
