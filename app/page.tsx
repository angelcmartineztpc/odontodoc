"use client";

import React from "react";
import { ClinicalRecordProvider, useClinicalRecord } from "@/context/ClinicalRecordContext";
import { Header } from "@/components/layout/Header";
import { TabNavigation } from "@/components/layout/TabNavigation";
import { IdentificationForm } from "@/components/forms/IdentificationForm";
import { ClinicalHistoryForm } from "@/components/forms/ClinicalHistoryForm";
import { IntraoralMatrixForm } from "@/components/forms/IntraoralMatrixForm";
import { DiagnosisPlanForm } from "@/components/forms/DiagnosisPlanForm";
import { TreatmentLogForm } from "@/components/forms/TreatmentLogForm";
import { PrintContainer } from "@/components/print/PrintContainer";
import { ThemeModal } from "@/components/theme/ThemeModal";
import { OnboardingSplashModal } from "@/components/guide/OnboardingSplashModal";

function MainContent() {
  const { activeTab } = useClinicalRecord();

  // Automatically scroll to the top of the viewport whenever active tab changes
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [activeTab]);

  return (
    <main className="min-h-screen bg-[var(--theme-app-bg)] text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <div className="animate-fade-in">
        {activeTab === "identification" && <IdentificationForm />}
        {activeTab === "history" && <ClinicalHistoryForm />}
        {activeTab === "photos" && <IntraoralMatrixForm />}
        {activeTab === "diagnosis" && <DiagnosisPlanForm />}
        {activeTab === "log" && <TreatmentLogForm />}
        {activeTab === "print" && <PrintContainer />}
      </div>

      <TabNavigation />
      <ThemeModal />
      <OnboardingSplashModal />
    </main>
  );
}

export default function Home() {
  return (
    <ClinicalRecordProvider>
      <MainContent />
    </ClinicalRecordProvider>
  );
}
