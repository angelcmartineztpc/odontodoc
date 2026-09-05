"use client";

import React from "react";
import { useClinicalRecord } from "@/context/ClinicalRecordContext";
import { CameraCaptureInput } from "./CameraCaptureInput";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

export function ClinicalHistoryForm() {
  const {
    document: doc,
    updateMedicalHistory,
    updateVitalSigns,
    updatePhoto,
    setActiveTab,
  } = useClinicalRecord();
  const { medicalHistory, photos } = doc;

  const weightNum = parseFloat(String(medicalHistory.vitalSigns.weight || "0"));
  const heightNum = parseFloat(String(medicalHistory.vitalSigns.height || "0"));
  const imcVal = weightNum > 0 && heightNum > 0 ? (weightNum / (heightNum * heightNum)).toFixed(1) : null;
  const imcCategory = imcVal
    ? parseFloat(imcVal) < 18.5
      ? "Bajo peso"
      : parseFloat(imcVal) < 25
      ? "Normal"
      : parseFloat(imcVal) < 30
      ? "Sobrepeso"
      : "Obesidad"
    : null;

  return (
    <div className="space-y-6 pb-24 max-w-3xl mx-auto px-4 pt-4">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-4 rounded-2xl shadow-sm border border-blue-600/30">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <MedicalServicesOutlinedIcon sx={{ fontSize: 22 }} />
          <span>Módulo B: Resumen Clínico General y Fotografía Extraoral</span>
        </h2>
        <p className="text-xs text-blue-100 mt-1">
          Antecedentes patológicos, somatometría, signos vitales y fotografía frontal. Alimenta la Hoja 1 oficial UJAT.
        </p>
      </div>

      {/* Extraoral Photo Section */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <PhotoCameraOutlinedIcon sx={{ fontSize: 19 }} />
          <span>Fotografía Extraoral (Frente / Sonrisa)</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Captura el rostro completo del paciente de frente o sonriendo para valoración estética y perfil estomatológico.
        </p>

        <div className="max-w-xs mx-auto">
          <CameraCaptureInput
            label="Fotografía Facial Extraoral"
            description="Enfoque de frente a la altura de los ojos"
            value={photos.extraoralFrontal}
            onChange={(dataUrl) => updatePhoto("extraoralFrontal", dataUrl)}
            aspectRatioLabel="3:4 / 4:3 Facial"
          />
        </div>
      </section>

      {/* Vital Signs Section */}
      {/* Vital Signs Section */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <MonitorHeartOutlinedIcon sx={{ fontSize: 20 }} className="text-blue-600" />
          <span>Evaluación Fisiológica y Somatometría</span>
        </h3>

        <div className="space-y-3">
          {/* Tier 1: Hemodinámico */}
          <div className="tier-card rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900 dark:text-blue-200 uppercase tracking-wide">
                1. Constantes Hemodinámicas
              </span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                Monitor Cardiorrespiratorio
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  Presión Arterial
                </label>
                <input
                  type="text"
                  value={medicalHistory.vitalSigns.bloodPressure}
                  onChange={(e) => updateVitalSigns({ bloodPressure: e.target.value })}
                  placeholder="120/80 mmHg"
                  className="w-full min-h-[42px] px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  Frec. Cardíaca
                </label>
                <input
                  type="text"
                  value={medicalHistory.vitalSigns.heartRate}
                  onChange={(e) => updateVitalSigns({ heartRate: e.target.value })}
                  placeholder="72 bpm"
                  className="w-full min-h-[42px] px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  Frec. Respiratoria
                </label>
                <input
                  type="text"
                  value={medicalHistory.vitalSigns.respiratoryRate}
                  onChange={(e) => updateVitalSigns({ respiratoryRate: e.target.value })}
                  placeholder="18 rpm"
                  className="w-full min-h-[42px] px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  Temperatura
                </label>
                <input
                  type="text"
                  value={medicalHistory.vitalSigns.temperature}
                  onChange={(e) => updateVitalSigns({ temperature: e.target.value })}
                  placeholder="36.5 °C"
                  className="w-full min-h-[42px] px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Tier 2: Antropometría */}
          <div className="tier-card rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wide">
                2. Somatometría y Estado Nutricional
              </span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                Parámetros Físicos
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-end">
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  Peso Corporal (kg)
                </label>
                <input
                  type="text"
                  value={medicalHistory.vitalSigns.weight || ""}
                  onChange={(e) => updateVitalSigns({ weight: e.target.value })}
                  placeholder="Ej. 74"
                  className="w-full min-h-[42px] px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  Talla / Estatura (m)
                </label>
                <input
                  type="text"
                  value={medicalHistory.vitalSigns.height || ""}
                  onChange={(e) => updateVitalSigns({ height: e.target.value })}
                  placeholder="Ej. 1.62"
                  className="w-full min-h-[42px] px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between min-h-[42px]">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Índice Masa Corporal:
                </span>
                <span className="text-xs font-bold font-mono text-emerald-700 dark:text-emerald-400">
                  {imcVal ? `${imcVal} (${imcCategory})` : "Pendiente"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anamnesis / Background Section */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <HistoryEduOutlinedIcon sx={{ fontSize: 19 }} />
          <span>Antecedentes Médicos y Exploración</span>
        </h3>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Antecedentes Heredo-Familiares
            </label>
            <textarea
              rows={2}
              value={medicalHistory.hereditaryConditions}
              onChange={(e) => updateMedicalHistory({ hereditaryConditions: e.target.value })}
              placeholder="Diabetes, hipertensión, cardiopatías, neoplasias en familiares directos..."
              className="w-full min-h-[56px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Antecedentes Personales Patológicos
            </label>
            <textarea
              rows={2}
              value={medicalHistory.pathologicalBackground}
              onChange={(e) => updateMedicalHistory({ pathologicalBackground: e.target.value })}
              placeholder="Alergias a fármacos/anestésicos, cirugías, hospitalizaciones, hemorragias..."
              className="w-full min-h-[56px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Antecedentes Personales No Patológicos
            </label>
            <textarea
              rows={2}
              value={medicalHistory.nonPathologicalBackground}
              onChange={(e) => updateMedicalHistory({ nonPathologicalBackground: e.target.value })}
              placeholder="Higiene bucal, frecuencia de cepillado, hábitos (tabaquismo, alcoholismo, bruxismo)..."
              className="w-full min-h-[56px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Examen Estomatológico Regional
            </label>
            <textarea
              rows={3}
              value={medicalHistory.stomatologicalExam}
              onChange={(e) => updateMedicalHistory({ stomatologicalExam: e.target.value })}
              placeholder="Exploración de labios, carrillos, paladar duro/blando, lengua, piso de boca, encías, ATM y cadenas ganglionares..."
              className="w-full min-h-[64px] px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>
        </div>
      </section>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={() => setActiveTab("identification")}
          className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-300 transition-colors flex items-center gap-2"
        >
          <ArrowBackOutlinedIcon sx={{ fontSize: 18 }} />
          <span>Ficha de Identificación</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("photos")}
          className="min-h-[44px] px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow flex items-center gap-2 transition-all active:scale-95"
        >
          <span>Continuar a Fotos Intraorales</span>
          <ArrowForwardOutlinedIcon sx={{ fontSize: 18 }} />
        </button>
      </div>
    </div>
  );
}
