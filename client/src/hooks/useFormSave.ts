/**
 * useFormSave — Persistent localStorage auto-save hook
 *
 * Design: Structured Confidence (Legal Workspace)
 *
 * Architecture:
 * - formData state: loaded from localStorage on mount, updated by user actions
 * - lastSaved: stored separately in a ref + localStorage, NOT in React state
 * - Auto-save: fires only when updateField/updateFields is called
 * - No useEffect dependency on formData (avoids infinite loops)
 */

import { useCallback, useRef, useState } from "react";

const STORAGE_KEY = "ifp_form_239_progress";
const DEBOUNCE_MS = 600;

export interface FormData {
  householdSize: number;
  inc_employment: string;
  inc_self: string;
  inc_disability: string;
  inc_unemployment: string;
  inc_assistance: string;
  inc_retirement: string;
  inc_other: string;
  inc_next: string;
  emp1_name: string;
  emp1_addr: string;
  emp1_dates: string;
  emp1_pay: string;
  emp1_reason: string;
  emp2_name: string;
  emp2_dates: string;
  emp2_pay: string;
  married: "yes" | "no";
  sp_emp: string;
  sp_dates: string;
  sp_pay: string;
  cash_hand: string;
  bank1_name: string;
  bank1_type: string;
  bank1_bal: string;
  bank2_name: string;
  bank2_bal: string;
  asset_home: string;
  asset_realestate: string;
  veh1_make: string;
  veh1_model: string;
  veh1_val: string;
  veh2_make: string;
  veh2_val: string;
  asset_other: string;
  owed_who: string;
  owed_amt: string;
  dep1_name: string;
  dep1_rel: string;
  dep1_age: string;
  dep2_name: string;
  dep2_rel: string;
  dep2_age: string;
  exp_rent: string;
  tax_included: "yes" | "no";
  ins_included: "yes" | "no";
  exp_util: string;
  exp_food: string;
  exp_clothing: string;
  exp_transport: string;
  exp_medical: string;
  exp_insurance: string;
  exp_installment: string;
  exp_other: string;
  changes: "yes" | "no";
  q9_explain: string;
  atty: "yes" | "no";
  atty_name: string;
  atty_amt: string;
  other_fee: "yes" | "no";
  otherfee_name: string;
  otherfee_amt: string;
  q12_info: string;
  p_name: string;
  p_city: string;
  p_phone: string;
  p_age: string;
  p_school: string;
  p_ssn: string;
  p_district: string;
  p_case: string;
  currentScreen: number;
  lastSaved: string | null;
}

export const defaultFormData: FormData = {
  householdSize: 1,
  inc_employment: "", inc_self: "", inc_disability: "", inc_unemployment: "",
  inc_assistance: "", inc_retirement: "", inc_other: "", inc_next: "",
  emp1_name: "", emp1_addr: "", emp1_dates: "", emp1_pay: "", emp1_reason: "",
  emp2_name: "", emp2_dates: "", emp2_pay: "",
  married: "no", sp_emp: "", sp_dates: "", sp_pay: "",
  cash_hand: "", bank1_name: "", bank1_type: "", bank1_bal: "", bank2_name: "", bank2_bal: "",
  asset_home: "", asset_realestate: "", veh1_make: "", veh1_model: "", veh1_val: "",
  veh2_make: "", veh2_val: "", asset_other: "",
  owed_who: "", owed_amt: "",
  dep1_name: "", dep1_rel: "", dep1_age: "",
  dep2_name: "", dep2_rel: "", dep2_age: "",
  exp_rent: "", tax_included: "yes", ins_included: "no",
  exp_util: "", exp_food: "", exp_clothing: "", exp_transport: "",
  exp_medical: "", exp_insurance: "", exp_installment: "", exp_other: "",
  changes: "yes", q9_explain: "",
  atty: "no", atty_name: "", atty_amt: "",
  other_fee: "no", otherfee_name: "", otherfee_amt: "",
  q12_info: "",
  p_name: "", p_city: "", p_phone: "", p_age: "", p_school: "", p_ssn: "",
  p_district: "", p_case: "",
  currentScreen: 0,
  lastSaved: null,
};

interface StoredData extends FormData {
  lastSaved: string | null;
}

function loadFromStorage(): FormData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultFormData };
    const parsed: StoredData = JSON.parse(raw);
    return { ...defaultFormData, ...parsed };
  } catch {
    return { ...defaultFormData };
  }
}

function checkHasSavedProgress(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return parsed.currentScreen > 0 || Object.entries(parsed).some(([k, v]) => {
      if (k === 'currentScreen' || k === 'lastSaved' || k === 'householdSize') return false;
      return typeof v === 'string' && (v as string).trim() !== '';
    });
  } catch { return false; }
}

export function useFormSave() {
  const [formData, setFormData] = useState<FormData>(() => loadFromStorage());
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [lastSavedDisplay, setLastSavedDisplay] = useState<string | null>(
    () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw).lastSaved || null;
      } catch { return null; }
    }
  );
  const [wasRestoredFromStorage] = useState<boolean>(() => checkHasSavedProgress());
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Keep a ref to the latest formData for the debounce callback
  const latestDataRef = useRef<FormData>(formData);

  const scheduleSave = useCallback(() => {
    setSaveStatus("saving");
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      const timestamp = new Date().toISOString();
      const dataToSave: StoredData = { ...latestDataRef.current, lastSaved: timestamp };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      } catch { /* quota exceeded */ }
      setLastSavedDisplay(timestamp);
      setSaveStatus("saved");
    }, DEBOUNCE_MS);
  }, []);

  const updateField = useCallback((
    field: keyof FormData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
  ) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      latestDataRef.current = next;
      return next;
    });
    scheduleSave();
  }, [scheduleSave]);

  const updateFields = useCallback((updates: Partial<FormData>) => {
    setFormData((prev) => {
      const next = { ...prev, ...updates };
      latestDataRef.current = next;
      return next;
    });
    scheduleSave();
  }, [scheduleSave]);

  const clearAll = useCallback(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    localStorage.removeItem(STORAGE_KEY);
    const fresh = { ...defaultFormData };
    latestDataRef.current = fresh;
    setFormData(fresh);
    setLastSavedDisplay(null);
    setSaveStatus("saved");
  }, []);

  const hasProgress = formData.currentScreen > 0 ||
    Object.entries(formData).some(([key, value]) => {
      if (key === "currentScreen" || key === "lastSaved" || key === "householdSize") return false;
      if (typeof value === "string") return value.trim() !== "";
      return false;
    });

  // Expose lastSaved from the display state (not from formData to avoid loops)
  const formDataWithLastSaved: FormData = {
    ...formData,
    lastSaved: lastSavedDisplay,
  };

  return {
    formData: formDataWithLastSaved,
    updateField,
    updateFields,
    clearAll,
    saveStatus,
    hasProgress,
    wasRestoredFromStorage,
  };
}
