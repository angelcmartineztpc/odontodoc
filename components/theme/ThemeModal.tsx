"use client";

import React, { useState } from "react";
import {
  useTheme,
  THEME_PRESETS,
  PINK_QUICK_SWATCHES,
} from "@/context/ThemeContext";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import ColorizeOutlinedIcon from "@mui/icons-material/ColorizeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export function ThemeModal() {
  const {
    activeThemeId,
    customHex,
    isThemeModalOpen,
    closeThemeModal,
    setThemePreset,
    setCustomColor,
    resetToDefaultPink,
  } = useTheme();

  const [hexInput, setHexInput] = useState(customHex);

  if (!isThemeModalOpen) return null;

  const handleCustomHexChange = (val: string) => {
    setHexInput(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      setCustomColor(val);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in no-print"
      onClick={closeThemeModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="theme-modal-title"
    >
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-rose-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[92vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with M3 Surface Styling */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-inner border border-rose-200/60 dark:border-rose-900/40">
              <PaletteOutlinedIcon sx={{ fontSize: 24 }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="theme-modal-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Personalizar Colores & Estilo
                </h2>
                <span className="hidden xs:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900/50 uppercase">
                  <FavoriteBorderOutlinedIcon sx={{ fontSize: 12 }} />
                  Prioridad Rosa
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Elige tu combinación favorita. Se guarda automáticamente en tu navegador.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeThemeModal}
            className="w-9 h-9 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-200 dark:hover:bg-slate-800 active:scale-95 flex items-center justify-center transition-all focus:outline-none"
            aria-label="Cerrar modal"
          >
            <CloseOutlinedIcon sx={{ fontSize: 20 }} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-100">
          {/* Quick Swatches Banner */}
          <div className="p-3.5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AutoAwesomeOutlinedIcon sx={{ fontSize: 18 }} className="text-rose-600 dark:text-rose-400" />
              <div>
                <p className="text-xs font-bold text-rose-900 dark:text-rose-200">
                  Estética Predeterminada: Rosa Sakura 🌸
                </p>
                <p className="text-[11px] text-rose-700 dark:text-rose-300">
                  Diseñado para reducir fatiga visual y armonizar la experiencia clínica.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={resetToDefaultPink}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 shrink-0"
            >
              <RestartAltOutlinedIcon sx={{ fontSize: 15 }} />
              <span>Restablecer a Rosa</span>
            </button>
          </div>

          {/* Preset Palettes Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Paletas Seleccionadas
              </h3>
              <span className="text-[11px] text-slate-400">
                {THEME_PRESETS.length} temas disponibles
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {THEME_PRESETS.map((preset) => {
                const isActive = activeThemeId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setThemePreset(preset.id)}
                    className={`relative text-left p-3 rounded-2xl border transition-all flex items-start justify-between gap-3 group focus:outline-none ${
                      isActive
                        ? "border-rose-500 bg-rose-50/60 dark:bg-rose-950/30 shadow-md ring-2 ring-rose-500/30 scale-[1.01]"
                        : "border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 hover:bg-rose-50/20"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {preset.name}
                        </span>
                        {preset.id === "pink-sakura" && (
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-rose-600 text-white shrink-0">
                            Prioridad
                          </span>
                        )}
                        {preset.isPink && preset.id !== "pink-sakura" && (
                          <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 shrink-0">
                            Rosa
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {preset.description}
                      </p>
                    </div>

                    {/* Color Swatches Trio */}
                    <div className="flex items-center gap-1 shrink-0 pt-0.5">
                      {preset.swatches.map((swatch, idx) => (
                        <span
                          key={idx}
                          className="w-4 h-4 rounded-full shadow-inner border border-black/10"
                          style={{ backgroundColor: swatch }}
                        />
                      ))}

                      {/* Active Checkmark Pill */}
                      {isActive && (
                        <div className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center ml-1 shadow-sm">
                          <CheckOutlinedIcon sx={{ fontSize: 13 }} />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Color Picker & Swatches */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ColorizeOutlinedIcon sx={{ fontSize: 18 }} className="text-rose-600 dark:text-rose-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  Crea tu Propio Color (Selector Libre)
                </h3>
              </div>
              {activeThemeId === "custom" && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white">
                  Personalizado Activo
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Usa el selector o haz clic en cualquiera de los tonos rositas rápidos para crear tu propia paleta armónica:
            </p>

            {/* Quick Rosita Swatches */}
            <div className="flex flex-wrap gap-2 pt-1">
              {PINK_QUICK_SWATCHES.map((swatch) => (
                <button
                  key={swatch.hex}
                  type="button"
                  onClick={() => {
                    handleCustomHexChange(swatch.hex);
                  }}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-sm flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 active:scale-95 transition-all"
                  title={`Aplicar ${swatch.name} (${swatch.hex})`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-inner border border-black/10 shrink-0"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span>{swatch.name}</span>
                </button>
              ))}
            </div>

            {/* Color Input Controls */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 shadow-sm">
                <input
                  type="color"
                  value={customHex}
                  onChange={(e) => handleCustomHexChange(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                  aria-label="Selector interactivo de color"
                />
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => handleCustomHexChange(e.target.value)}
                  placeholder="#e11d48"
                  maxLength={7}
                  className="w-20 text-xs font-mono font-bold bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400">
                El motor calculará automáticamente los tonos de tarjeta, botón y brillo correspondientes.
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            OdontoDoc · Sistema Clínico UJAT
          </span>

          <button
            type="button"
            onClick={closeThemeModal}
            className="min-h-[42px] px-6 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-xs shadow transition-all flex items-center gap-1.5"
          >
            <CheckOutlinedIcon sx={{ fontSize: 16 }} />
            <span>Listo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
