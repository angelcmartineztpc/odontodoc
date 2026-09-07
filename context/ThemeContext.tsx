"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryActive: string;
  primaryLight: string;
  primarySubtle: string;
  primaryBorder: string;
  primaryText: string;
  accent: string;
  ring: string;
  headerBg: string;
  headerBar: string;
  headerBorder: string;
  bannerFrom: string;
  bannerTo: string;
  appBg: string;
  cardBg: string;
  surfaceBorder: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  isPink: boolean;
  colors: ThemeColors;
  swatches: string[];
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "pink-sakura",
    name: "Rosa Sakura / Pastel",
    description: "Delicado, clínico y suave (Predeterminado & Prioridad)",
    isPink: true,
    colors: {
      primary: "#e11d48",
      primaryHover: "#be123c",
      primaryActive: "#9f1239",
      primaryLight: "#ffe4e6",
      primarySubtle: "#fff1f2",
      primaryBorder: "#fecdd3",
      primaryText: "#9f1239",
      accent: "#fb7185",
      ring: "rgba(225, 29, 72, 0.35)",
      headerBg: "#881337",
      headerBar: "#be123c",
      headerBorder: "#9f1239",
      bannerFrom: "#e11d48",
      bannerTo: "#9f1239",
      appBg: "#fff5f7",
      cardBg: "#ffffff",
      surfaceBorder: "#fce7f3",
    },
    swatches: ["#e11d48", "#fb7185", "#ffe4e6"],
  },
  {
    id: "pink-fuchsia",
    name: "Fucsia & Magenta Pop",
    description: "Rosa vibrante, juvenil y de alto impacto",
    isPink: true,
    colors: {
      primary: "#db2777",
      primaryHover: "#be185d",
      primaryActive: "#9d174d",
      primaryLight: "#fce7f3",
      primarySubtle: "#fdf2f8",
      primaryBorder: "#fbcfe8",
      primaryText: "#831843",
      accent: "#f472b6",
      ring: "rgba(219, 39, 119, 0.35)",
      headerBg: "#701a75",
      headerBar: "#a21caf",
      headerBorder: "#86198f",
      bannerFrom: "#db2777",
      bannerTo: "#831843",
      appBg: "#fdf4f8",
      cardBg: "#ffffff",
      surfaceBorder: "#fbcfe8",
    },
    swatches: ["#db2777", "#f472b6", "#fce7f3"],
  },
  {
    id: "pink-rosegold",
    name: "Oro Rosado & Champán",
    description: "Elegancia cálida rosé gold estilo boutique",
    isPink: true,
    colors: {
      primary: "#d9536d",
      primaryHover: "#b73b54",
      primaryActive: "#942a40",
      primaryLight: "#fae8eb",
      primarySubtle: "#fdf4f5",
      primaryBorder: "#f3cbd2",
      primaryText: "#7a1f33",
      accent: "#ea8c9e",
      ring: "rgba(217, 83, 109, 0.35)",
      headerBg: "#571b26",
      headerBar: "#8c2e42",
      headerBorder: "#6f2030",
      bannerFrom: "#d9536d",
      bannerTo: "#7a1f33",
      appBg: "#fcf6f7",
      cardBg: "#ffffff",
      surfaceBorder: "#f3cbd2",
    },
    swatches: ["#d9536d", "#ea8c9e", "#fae8eb"],
  },
  {
    id: "lavender-mauve",
    name: "Lavanda & Malva Floral",
    description: "Tonos pastel florales entre lila y rosa",
    isPink: true,
    colors: {
      primary: "#9333ea",
      primaryHover: "#7e22ce",
      primaryActive: "#6b21a8",
      primaryLight: "#f3e8ff",
      primarySubtle: "#faf5ff",
      primaryBorder: "#e9d5ff",
      primaryText: "#581c87",
      accent: "#c084fc",
      ring: "rgba(147, 51, 234, 0.35)",
      headerBg: "#4c1d95",
      headerBar: "#6d28d9",
      headerBorder: "#5b21b6",
      bannerFrom: "#9333ea",
      bannerTo: "#581c87",
      appBg: "#fcfaff",
      cardBg: "#ffffff",
      surfaceBorder: "#e9d5ff",
    },
    swatches: ["#9333ea", "#c084fc", "#f3e8ff"],
  },
  {
    id: "peach-rose",
    name: "Durazno Rosé & Coral",
    description: "Cálida armonía entre melocotón y rosado suave",
    isPink: true,
    colors: {
      primary: "#f43f5e",
      primaryHover: "#e11d48",
      primaryActive: "#be123c",
      primaryLight: "#ffedd5",
      primarySubtle: "#fff7ed",
      primaryBorder: "#fed7aa",
      primaryText: "#9a3412",
      accent: "#fb923c",
      ring: "rgba(244, 63, 94, 0.35)",
      headerBg: "#7c2d12",
      headerBar: "#c2410c",
      headerBorder: "#9a3412",
      bannerFrom: "#f43f5e",
      bannerTo: "#ea580c",
      appBg: "#fffbf8",
      cardBg: "#ffffff",
      surfaceBorder: "#ffedd5",
    },
    swatches: ["#f43f5e", "#fb923c", "#ffedd5"],
  },
  {
    id: "ujat-green",
    name: "Verde UJAT Clásico",
    description: "Paleta institucional de la universidad",
    isPink: false,
    colors: {
      primary: "#1C8443",
      primaryHover: "#156533",
      primaryActive: "#104c26",
      primaryLight: "#dcfce7",
      primarySubtle: "#f0fdf4",
      primaryBorder: "#bbf7d0",
      primaryText: "#14532d",
      accent: "#8DC642",
      ring: "rgba(28, 132, 67, 0.35)",
      headerBg: "#0f172a",
      headerBar: "#1C8443",
      headerBorder: "#156533",
      bannerFrom: "#1C8443",
      bannerTo: "#13592E",
      appBg: "#f8fafc",
      cardBg: "#ffffff",
      surfaceBorder: "#e2e8f0",
    },
    swatches: ["#1C8443", "#8DC642", "#dcfce7"],
  },
  {
    id: "clinical-blue",
    name: "Azul Clínico Dental",
    description: "Paleta médica odontológica fresca",
    isPink: false,
    colors: {
      primary: "#0284c7",
      primaryHover: "#0369a1",
      primaryActive: "#075985",
      primaryLight: "#e0f2fe",
      primarySubtle: "#f0f9ff",
      primaryBorder: "#bae6fd",
      primaryText: "#0c4a6e",
      accent: "#38bdf8",
      ring: "rgba(2, 132, 199, 0.35)",
      headerBg: "#0f172a",
      headerBar: "#0284c7",
      headerBorder: "#0369a1",
      bannerFrom: "#0284c7",
      bannerTo: "#075985",
      appBg: "#f0f9ff",
      cardBg: "#ffffff",
      surfaceBorder: "#bae6fd",
    },
    swatches: ["#0284c7", "#38bdf8", "#e0f2fe"],
  },
  {
    id: "velvet-dark",
    name: "Modo Oscuro Rosé",
    description: "Fondo oscuro sofisticado con brillo rosa neón",
    isPink: true,
    colors: {
      primary: "#fb7185",
      primaryHover: "#f43f5e",
      primaryActive: "#e11d48",
      primaryLight: "#3a1523",
      primarySubtle: "#261019",
      primaryBorder: "#4c1d2e",
      primaryText: "#fecdd3",
      accent: "#fda4af",
      ring: "rgba(251, 113, 133, 0.4)",
      headerBg: "#120910",
      headerBar: "#2d111e",
      headerBorder: "#4c1d2e",
      bannerFrom: "#881337",
      bannerTo: "#4c0519",
      appBg: "#130911",
      cardBg: "#1f101a",
      surfaceBorder: "#3d1a29",
    },
    swatches: ["#fb7185", "#2d111e", "#130911"],
  },
];

// Quick Pink Swatches for the color picker
export const PINK_QUICK_SWATCHES = [
  { name: "Rosa Pastel", hex: "#f472b6" },
  { name: "Rosa Chicle", hex: "#ec4899" },
  { name: "Rosa Sakura", hex: "#e11d48" },
  { name: "Fucsia Neón", hex: "#d946ef" },
  { name: "Frambuesa", hex: "#be123c" },
  { name: "Algodón de Azúcar", hex: "#fda4af" },
  { name: "Cuarzo Rosa", hex: "#fb7185" },
  { name: "Malva Profundo", hex: "#9d174d" },
];

// Helper to compute a full palette from an arbitrary hex color
export function generateThemeFromHex(hex: string): ThemeColors {
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c.split("").map((x) => x + x).join("");
  }
  const r = parseInt(c.substring(0, 2), 16) || 225;
  const g = parseInt(c.substring(2, 4), 16) || 29;
  const b = parseInt(c.substring(4, 6), 16) || 72;

  const shade = (factor: number) => {
    const nr = Math.max(0, Math.min(255, Math.round(r * factor)));
    const ng = Math.max(0, Math.min(255, Math.round(g * factor)));
    const nb = Math.max(0, Math.min(255, Math.round(b * factor)));
    return `#${nr.toString(16).padStart(2, "0")}${ng.toString(16).padStart(2, "0")}${nb.toString(16).padStart(2, "0")}`;
  };

  const tint = (factor: number) => {
    const nr = Math.max(0, Math.min(255, Math.round(r + (255 - r) * factor)));
    const ng = Math.max(0, Math.min(255, Math.round(g + (255 - g) * factor)));
    const nb = Math.max(0, Math.min(255, Math.round(b + (255 - b) * factor)));
    return `#${nr.toString(16).padStart(2, "0")}${ng.toString(16).padStart(2, "0")}${nb.toString(16).padStart(2, "0")}`;
  };

  const primary = `#${c}`;
  const primaryHover = shade(0.85);
  const primaryActive = shade(0.7);
  const primaryLight = tint(0.88);
  const primarySubtle = tint(0.96);
  const primaryBorder = tint(0.75);
  const primaryText = shade(0.55);
  const accent = tint(0.4);
  const ring = `rgba(${r}, ${g}, ${b}, 0.35)`;
  const headerBg = shade(0.45);
  const headerBar = shade(0.75);
  const headerBorder = shade(0.6);
  const bannerFrom = primary;
  const bannerTo = shade(0.6);
  const appBg = tint(0.97);
  const cardBg = "#ffffff";
  const surfaceBorder = tint(0.85);

  return {
    primary,
    primaryHover,
    primaryActive,
    primaryLight,
    primarySubtle,
    primaryBorder,
    primaryText,
    accent,
    ring,
    headerBg,
    headerBar,
    headerBorder,
    bannerFrom,
    bannerTo,
    appBg,
    cardBg,
    surfaceBorder,
  };
}

interface ThemeContextType {
  activeThemeId: string;
  customHex: string;
  currentColors: ThemeColors;
  isThemeModalOpen: boolean;
  setThemePreset: (id: string) => void;
  setCustomColor: (hex: string) => void;
  resetToDefaultPink: () => void;
  openThemeModal: () => void;
  closeThemeModal: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "odontodoc_theme_settings_v2";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Deterministic initial state for 100% SSR / client hydration parity
  const [activeThemeId, setActiveThemeId] = useState<string>("pink-sakura");
  const [customHex, setCustomHex] = useState<string>("#e11d48");
  const [isThemeLoaded, setIsThemeLoaded] = useState<boolean>(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);

  // Load saved preferences strictly after client mount to prevent hydration mismatch
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.activeThemeId) setActiveThemeId(parsed.activeThemeId);
        if (parsed.customHex) setCustomHex(parsed.customHex);
      }
    } catch {
      // Storage unavailable, ignore
    } finally {
      setIsThemeLoaded(true);
    }
  }, []);

  // Compute active colors
  const currentColors = useMemo<ThemeColors>(() => {
    if (activeThemeId === "custom") {
      return generateThemeFromHex(customHex);
    }
    const found = THEME_PRESETS.find((t) => t.id === activeThemeId);
    return found ? found.colors : THEME_PRESETS[0].colors;
  }, [activeThemeId, customHex]);

  // Inject CSS variables into document.documentElement (:root)
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    root.style.setProperty("--theme-primary", currentColors.primary);
    root.style.setProperty("--theme-primary-hover", currentColors.primaryHover);
    root.style.setProperty("--theme-primary-active", currentColors.primaryActive);
    root.style.setProperty("--theme-primary-light", currentColors.primaryLight);
    root.style.setProperty("--theme-primary-subtle", currentColors.primarySubtle);
    root.style.setProperty("--theme-primary-border", currentColors.primaryBorder);
    root.style.setProperty("--theme-primary-text", currentColors.primaryText);
    root.style.setProperty("--theme-accent", currentColors.accent);
    root.style.setProperty("--theme-ring", currentColors.ring);
    root.style.setProperty("--theme-header-bg", currentColors.headerBg);
    root.style.setProperty("--theme-header-bar", currentColors.headerBar);
    root.style.setProperty("--theme-header-border", currentColors.headerBorder);
    root.style.setProperty("--theme-banner-from", currentColors.bannerFrom);
    root.style.setProperty("--theme-banner-to", currentColors.bannerTo);
    root.style.setProperty("--theme-app-bg", currentColors.appBg);
    root.style.setProperty("--theme-card-bg", currentColors.cardBg);
    root.style.setProperty("--theme-surface-border", currentColors.surfaceBorder);

    // Toggle dark mode class on root for consistent WCAG dark styling
    if (activeThemeId === "velvet-dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [currentColors, activeThemeId]);

  // Persist when state changes, strictly after initial load has completed
  useEffect(() => {
    if (!isThemeLoaded) return;
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ activeThemeId, customHex })
      );
    } catch {
      // Storage unavailable, ignore
    }
  }, [activeThemeId, customHex, isThemeLoaded]);

  const setThemePreset = (id: string) => {
    setActiveThemeId(id);
  };

  const setCustomColor = (hex: string) => {
    setCustomHex(hex);
    setActiveThemeId("custom");
  };

  const resetToDefaultPink = () => {
    setActiveThemeId("pink-sakura");
    setCustomHex("#e11d48");
  };

  return (
    <ThemeContext.Provider
      value={{
        activeThemeId,
        customHex,
        currentColors,
        isThemeModalOpen,
        setThemePreset,
        setCustomColor,
        resetToDefaultPink,
        openThemeModal: () => setIsThemeModalOpen(true),
        closeThemeModal: () => setIsThemeModalOpen(false),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
