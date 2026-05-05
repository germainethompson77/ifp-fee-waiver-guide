/**
 * SummaryScreen — Full application summary review
 * Design: Structured Confidence
 */

import { FormData, THRESHOLDS, num, fmt, Alert, C } from "./shared";

interface Props {
  formData: FormData;
  goTo: (n: number) => void;
  clearAll: () => void;
}

function SummarySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: C.white, borderRadius: 14, overflow: "hidden", marginBottom: 14, boxShadow: "0 2px 12px rgba(15,39,68,0.07)" }}>
      <div style={{ background: C.navy, padding: "9px 16px", color: C.white, fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
}

function SummaryRow({ label, value, valueClass }: { label: string; value: string; valueClass?: "good" | "bad" | "warn" | "" }) {
  const valueColor = valueClass === "good" ? C.green : valueClass === "bad" ? C.red : valueClass === "warn" ? "#d97706" : C.navy;
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "9px 16px", borderBottom: "1px solid #f1f5f9", gap: 10 }}>
      <span style={{ fontSize: 12, color: C.gray, flex: 1 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: valueColor, textAlign: "right", maxWidth: "55%", wordBreak: "break-word" }}>{value}</span>
    </div>
  );
}

export default function SummaryScreen({ formData, goTo, clearAll }: Props) {
  const income = (["inc_employment", "inc_self", "inc_disability", "inc_unemployment", "inc_assistance", "inc_retirement", "inc_other"] as const)
    .reduce((s, id) => s + num(formData[id]), 0);
  const bank = num(formData.cash_hand) + num(formData.bank1_bal) + num(formData.bank2_bal);
  const exp = (["exp_rent", "exp_util", "exp_food", "exp_clothing", "exp_transport", "exp_medical", "exp_insurance", "exp_installment", "exp_other"] as const)
    .reduce((s, id) => s + num(formData[id]), 0);
  const limit = THRESHOLDS[formData.householdSize] || 1956;

  const incClass: "good" | "warn" | "bad" = income <= limit ? "good" : income <= limit * 1.3 ? "warn" : "bad";
  const bankClass: "good" | "warn" | "bad" = bank <= 200 ? "good" : bank <= 1000 ? "warn" : "bad";
  const expRatio = income > 0 ? exp / income : 0;
  const expClass: "good" | "warn" | "bad" = expRatio >= 0.8 ? "good" : expRatio >= 0.5 ? "warn" : "bad";

  const overallType = incClass === "good" ? "green" : incClass === "warn" ? "yellow" : "red";
  const overallText = incClass === "good"
    ? "✅ Best Qualified"
    : incClass === "warn"
    ? "⚠️ Borderline — Review Carefully"
    : "❌ High Risk of Denial";

  const handleRestart = () => {
    if (window.confirm("Start over? All entered data will be cleared.")) {
      clearAll();
      goTo(0);
    }
  };

  return (
    <div>
      {/* Overall status */}
      <Alert type={overallType}>
        <strong>Overall Status: {overallText}</strong><br />
        Your total income of {fmt(income)} is {incClass === "good" ? "under" : "over"} the {fmt(limit)}/month limit for a {formData.householdSize}-person household.
      </Alert>

      <SummarySection title="Personal Information">
        <SummaryRow label="Name" value={formData.p_name || "—"} />
        <SummaryRow label="City / State" value={formData.p_city || "—"} />
        <SummaryRow label="Phone" value={formData.p_phone || "—"} />
        <SummaryRow label="Age" value={formData.p_age || "—"} />
        <SummaryRow label="Years of Schooling" value={formData.p_school || "—"} />
        <SummaryRow label="Last 4 SSN" value={formData.p_ssn || "—"} />
        <SummaryRow label="District" value={formData.p_district || "—"} />
        <SummaryRow label="Case" value={formData.p_case || "—"} />
      </SummarySection>

      <SummarySection title="Q1 — Monthly Income">
        <SummaryRow label="Employment" value={fmt(num(formData.inc_employment))} />
        <SummaryRow label="Self-Employment" value={fmt(num(formData.inc_self))} />
        <SummaryRow label="Disability" value={fmt(num(formData.inc_disability))} />
        <SummaryRow label="Unemployment" value={fmt(num(formData.inc_unemployment))} />
        <SummaryRow label="Public Assistance" value={fmt(num(formData.inc_assistance))} />
        <SummaryRow label="Retirement / SS" value={fmt(num(formData.inc_retirement))} />
        <SummaryRow label="Other" value={fmt(num(formData.inc_other))} />
        <SummaryRow label="TOTAL" value={fmt(income)} valueClass={incClass} />
        <SummaryRow label="Expected Next Month" value={fmt(num(formData.inc_next))} valueClass={num(formData.inc_next) === 0 ? "good" : "warn"} />
        <SummaryRow label="150% FPL Limit" value={`${fmt(limit)}/mo`} />
      </SummarySection>

      <SummarySection title="Q2 — Employment History">
        <SummaryRow label="Most Recent Employer" value={formData.emp1_name || "—"} />
        <SummaryRow label="Dates" value={formData.emp1_dates || "—"} />
        <SummaryRow label="Gross Pay" value={fmt(num(formData.emp1_pay))} />
        <SummaryRow label="Reason for Leaving" value={formData.emp1_reason || "—"} />
        <SummaryRow label="Previous Employer" value={formData.emp2_name || "N/A"} />
      </SummarySection>

      <SummarySection title="Q4 — Cash & Bank Accounts">
        <SummaryRow label="Cash on Hand" value={fmt(num(formData.cash_hand))} />
        <SummaryRow label={formData.bank1_name || "Bank 1"} value={fmt(num(formData.bank1_bal))} />
        <SummaryRow label={formData.bank2_name || "Bank 2"} value={fmt(num(formData.bank2_bal))} />
        <SummaryRow label="Total Liquid" value={fmt(bank)} valueClass={bankClass} />
      </SummarySection>

      <SummarySection title="Q5 — Assets">
        <SummaryRow label="Home Value" value={fmt(num(formData.asset_home))} valueClass={num(formData.asset_home) === 0 ? "good" : "warn"} />
        <SummaryRow label="Vehicle #1" value={`${formData.veh1_make || "—"} — ${fmt(num(formData.veh1_val))}`} />
        <SummaryRow label="Vehicle #2" value={formData.veh2_make || "N/A"} valueClass={num(formData.veh2_val) > 0 ? "warn" : ""} />
        <SummaryRow label="Other Assets" value={fmt(num(formData.asset_other))} />
      </SummarySection>

      <SummarySection title="Q8 — Monthly Expenses">
        <SummaryRow label="Rent / Mortgage" value={fmt(num(formData.exp_rent))} />
        <SummaryRow label="Utilities" value={fmt(num(formData.exp_util))} />
        <SummaryRow label="Food" value={fmt(num(formData.exp_food))} />
        <SummaryRow label="Clothing" value={fmt(num(formData.exp_clothing))} />
        <SummaryRow label="Transportation" value={fmt(num(formData.exp_transport))} />
        <SummaryRow label="Medical / Dental" value={fmt(num(formData.exp_medical))} />
        <SummaryRow label="Other" value={fmt(num(formData.exp_other))} />
        <SummaryRow label="TOTAL" value={fmt(exp)} valueClass={expClass} />
      </SummarySection>

      <SummarySection title="Q9 — Major Changes">
        <SummaryRow label="Explanation" value={formData.q9_explain || "Not provided"} />
      </SummarySection>

      <SummarySection title="Q12 — Additional Information">
        <SummaryRow label="Statement" value={formData.q12_info || "Not provided"} />
      </SummarySection>

      {/* Disclaimer */}
      <div style={{ background: "#fef3c7", borderLeft: `4px solid ${C.gold}`, borderRadius: "0 10px 10px 0", padding: "13px 16px", fontSize: 12, lineHeight: 1.65, marginBottom: 20, color: "#78350f" }}>
        <strong>⚠️ Disclaimer:</strong> This summary is a reference tool only. All information on the actual court form must be 100% truthful and accurate. Providing false information may result in dismissal of your case and legal penalties.
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          onClick={() => window.print()}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: 12,
            border: "none",
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            cursor: "pointer",
            background: `linear-gradient(135deg, ${C.sky}, ${C.navyLight})`,
            color: C.white,
            boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
          }}
        >
          🖨️ Print / Save as PDF
        </button>
        <button
          onClick={() => goTo(12)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 12,
            border: `2px solid ${C.border}`,
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            cursor: "pointer",
            background: C.white,
            color: C.navy,
          }}
        >
          ← Go Back & Edit
        </button>
        <button
          onClick={handleRestart}
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: 12,
            border: `2px solid ${C.border}`,
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            cursor: "pointer",
            background: "transparent",
            color: C.gray,
          }}
        >
          ↺ Start Over (Clear All Data)
        </button>
      </div>
    </div>
  );
}
