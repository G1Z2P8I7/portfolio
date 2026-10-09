"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "carbon" | "concrete" | "rust" | "emerald" | "blood";

export interface ThemeConfig {
  id: ThemeMode;
  number: string;
  name: string;
  accent: string;
  bg: string;
  surface: string;
  border: string;
}

export const THEMES: Record<ThemeMode, ThemeConfig> = {
  carbon: {
    id: "carbon",
    number: "01",
    name: "Carbon // Midnight",
    accent: "#8B5CF6", // Electric Violet
    bg: "#0c0c0c",
    surface: "#141414",
    border: "rgba(232, 236, 239, 0.12)",
  },
  concrete: {
    id: "concrete",
    number: "02",
    name: "Concrete // Brutalist",
    accent: "#E2E8F0", // Monolithic Platinum
    bg: "#121214",
    surface: "#1a1a1e",
    border: "rgba(226, 232, 240, 0.15)",
  },
  rust: {
    id: "rust",
    number: "03",
    name: "Rust // Terracotta",
    accent: "#F97316", // Warm Ochre
    bg: "#0f0b09",
    surface: "#1c1410",
    border: "rgba(249, 115, 22, 0.18)",
  },
  emerald: {
    id: "emerald",
    number: "04",
    name: "Emerald // Cybernetic",
    accent: "#10B981", // Cyan Emerald
    bg: "#07110e",
    surface: "#0e1e19",
    border: "rgba(16, 185, 129, 0.18)",
  },
  blood: {
    id: "blood",
    number: "05",
    name: "Crimson // High-Contrast",
    accent: "#EF4444", // Vivid Scarlet
    bg: "#110708",
    surface: "#200d0f",
    border: "rgba(239, 68, 68, 0.2)",
  },
};

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  cycleTheme: () => void;
  config: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function updateFavicon(accentColor: string, number: string) {
  if (typeof document === "undefined") return;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="8" fill="#0C0C0C"/>
    <rect x="2" y="2" width="28" height="28" rx="6" fill="none" stroke="${accentColor}" stroke-width="1.5" stroke-opacity="0.6"/>
    <circle cx="16" cy="16" r="5" fill="${accentColor}"/>
    <text x="16" y="27" fill="${accentColor}" font-family="monospace" font-size="7" font-weight="bold" text-anchor="middle">${number}</text>
  </svg>`;

  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.type = "image/svg+xml";
  link.href = url;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("carbon");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme-mode") as ThemeMode | null;
    if (saved && THEMES[saved]) {
      setThemeState(saved);
      document.documentElement.setAttribute("data-theme", saved);
      updateFavicon(THEMES[saved].accent, THEMES[saved].number);
    } else {
      document.documentElement.setAttribute("data-theme", "carbon");
      updateFavicon(THEMES.carbon.accent, THEMES.carbon.number);
    }
  }, []);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    localStorage.setItem("portfolio-theme-mode", mode);
    document.documentElement.setAttribute("data-theme", mode);
    updateFavicon(THEMES[mode].accent, THEMES[mode].number);
  };

  const cycleTheme = () => {
    const modes: ThemeMode[] = ["carbon", "concrete", "rust", "emerald", "blood"];
    const currentIndex = modes.indexOf(theme);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setTheme(nextMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, config: THEMES[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
