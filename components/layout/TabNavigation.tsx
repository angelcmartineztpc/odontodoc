"use client";

import React from "react";
import { useClinicalRecord } from "@/context/ClinicalRecordContext";
import { ActiveTab } from "@/lib/types";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";

interface TabItem {
  id: ActiveTab;
  label: string;
  IconComponent: React.ElementType;
}

const TABS: TabItem[] = [
  { id: "identification", label: "Ficha", IconComponent: AssignmentIndOutlinedIcon },
  { id: "history", label: "Historial", IconComponent: MedicalServicesOutlinedIcon },
  { id: "photos", label: "Fotos", IconComponent: PhotoCameraOutlinedIcon },
  { id: "diagnosis", label: "Plan", IconComponent: FactCheckOutlinedIcon },
  { id: "log", label: "Bitácora", IconComponent: HistoryEduOutlinedIcon },
  { id: "print", label: "Formatos", IconComponent: PrintOutlinedIcon },
];

export function TabNavigation() {
  const { activeTab, setActiveTab } = useClinicalRecord();

  return (
    <nav
      className="no-print fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pt-1 pb-[max(0.5rem,env(safe-area-inset-bottom,0.5rem))] transition-colors"
      role="tablist"
      aria-label="Navegación clínica Material 3"
    >
      <div className="max-w-xl mx-auto flex items-center justify-between px-2 sm:px-4 h-16 sm:h-[70px]">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.IconComponent;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex flex-col items-center justify-center min-h-[48px] py-1 transition-all select-none group focus:outline-none touch-manipulation cursor-pointer"
            >
              {/* Material Design 3 Active Indicator Pill */}
              <div
                className={`w-13 sm:w-16 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--theme-primary-light)] text-[var(--theme-primary)] scale-105 shadow-sm"
                    : "bg-transparent text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 group-hover:bg-[var(--theme-primary-subtle)] dark:group-hover:bg-slate-800/60"
                }`}
              >
                <Icon sx={{ fontSize: 22 }} />
              </div>

              {/* Material Design 3 Label */}
              <span
                className={`text-[11px] leading-tight tracking-tight mt-1 transition-colors ${
                  isActive
                    ? "font-bold text-[var(--theme-primary-text)] dark:text-[var(--theme-accent)]"
                    : "font-medium text-slate-600 dark:text-slate-400"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
