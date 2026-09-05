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

function MainContent() {
  const { activeTab } = useClinicalRecord();

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
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
