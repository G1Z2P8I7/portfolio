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
    name: "Refreshing Summer",
    accent: "#FB8500", // Vivid Amber Orange
    bg: "#022030",
    surface: "#023047",
    border: "rgba(142, 202, 230, 0.22)",
  },
  concrete: {
    id: "concrete",
    number: "02",
    name: "Black and Gold Elegance",
    accent: "#FCA311", // Rich Gold
    bg: "#000000",
    surface: "#14213D",
    border: "rgba(252, 163, 17, 0.25)",
  },
  rust: {
    id: "rust",
    number: "03",
    name: "Cool Coastal",
    accent: "#EF233C", // Imperial Red
    bg: "#181926",
    surface: "#2B2D42",
    border: "rgba(239, 35, 60, 0.25)",
  },
  emerald: {
    id: "emerald",
    number: "04",
    name: "Ocean Breeze",
    accent: "#00B4D8", // Vivid Cyan
    bg: "#020336",
    surface: "#03045E",
    border: "rgba(0, 180, 216, 0.25)",
  },
  blood: {
    id: "blood",
    number: "05",
    name: "Earthly Green",
    accent: "#84A98C", // Sage Green
    bg: "#1C262B",
    surface: "#2F3E46",
    border: "rgba(132, 169, 140, 0.25)",
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
