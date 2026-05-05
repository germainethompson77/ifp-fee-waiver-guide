/**
 * Home.tsx — Form 239 IFP Fee Waiver Application Guide
 *
 * Design Philosophy: Structured Confidence (Legal Workspace)
 * - Navy (#0f2744) / Gold (#f59e0b) / White palette
 * - DM Serif Display for headings, DM Sans for body
 * - Real-time qualification feedback (green/amber/red)
 * - Persistent localStorage auto-save via useFormSave hook
 * - Mobile-first single-column layout, max-width 520px
 */

import { useFormSave } from "@/hooks/useFormSave";
import { useCallback } from "react";
import WelcomeScreen from "@/components/form/WelcomeScreen";
import Q1Income from "@/components/form/Q1Income";
import Q2Employment from "@/components/form/Q2Employment";
import Q3Spouse from "@/components/form/Q3Spouse";
import Q4Bank from "@/components/form/Q4Bank";
import Q5Assets from "@/components/form/Q5Assets";
import Q6MoneyOwed from "@/components/form/Q6MoneyOwed";
import Q7Dependents from "@/components/form/Q7Dependents";
import Q8Expenses from "@/components/form/Q8Expenses";
import Q9Changes from "@/components/form/Q9Changes";
import Q10Attorney from "@/components/form/Q10Attorney";
import Q11AdditionalInfo from "@/components/form/Q11AdditionalInfo";
import Q12PersonalInfo from "@/components/form/Q12PersonalInfo";
import SummaryScreen from "@/components/form/SummaryScreen";
import AppHeader from "@/components/form/AppHeader";
import ProgressBar from "@/components/form/ProgressBar";
import SaveIndicator from "@/components/form/SaveIndicator";

export default function Home() {
  const { formData, updateField, updateFields, clearAll, saveStatus, hasProgress, wasRestoredFromStorage } = useFormSave();

  const goTo = useCallback((screen: number) => {
    updateField("currentScreen", screen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [updateField]);

  const { currentScreen } = formData;

  return (
    <div className="min-h-screen" style={{ background: "#f0f4ff", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <AppHeader />
      <ProgressBar currentScreen={currentScreen} />
      <SaveIndicator saveStatus={saveStatus} lastSaved={formData.lastSaved} hasProgress={hasProgress} />

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "20px 16px 60px" }}>
        {currentScreen === 0 && (
          <WelcomeScreen
            formData={formData}
            updateField={updateField}
            goTo={goTo}
            hasProgress={wasRestoredFromStorage}
          />
        )}
        {currentScreen === 1 && (
          <Q1Income formData={formData} updateField={updateField} updateFields={updateFields} goTo={goTo} />
        )}
        {currentScreen === 2 && (
          <Q2Employment formData={formData} updateField={updateField} goTo={goTo} />
        )}
        {currentScreen === 3 && (
          <Q3Spouse formData={formData} updateField={updateField} goTo={goTo} />
        )}
        {currentScreen === 4 && (
          <Q4Bank formData={formData} updateField={updateField} goTo={goTo} />
        )}
        {currentScreen === 5 && (
          <Q5Assets formData={formData} updateField={updateField} goTo={goTo} />
        )}
        {currentScreen === 6 && (
          <Q6MoneyOwed formData={formData} updateField={updateField} goTo={goTo} />
        )}
        {currentScreen === 7 && (
          <Q7Dependents formData={formData} updateField={updateField} goTo={goTo} />
        )}
        {currentScreen === 8 && (
          <Q8Expenses formData={formData} updateField={updateField} goTo={goTo} />
        )}
        {currentScreen === 9 && (
          <Q9Changes formData={formData} updateField={updateField} goTo={goTo} />
        )}
        {currentScreen === 10 && (
          <Q10Attorney formData={formData} updateField={updateField} goTo={goTo} />
        )}
        {currentScreen === 11 && (
          <Q11AdditionalInfo formData={formData} updateField={updateField} goTo={goTo} />
        )}
        {currentScreen === 12 && (
          <Q12PersonalInfo formData={formData} updateField={updateField} goTo={goTo} />
        )}
        {currentScreen === 13 && (
          <SummaryScreen formData={formData} goTo={goTo} clearAll={clearAll} />
        )}
      </div>
    </div>
  );
}
