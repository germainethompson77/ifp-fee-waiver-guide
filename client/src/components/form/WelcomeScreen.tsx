/**
 * WelcomeScreen — Welcome / intro screen with household size selector
 * Design: Structured Confidence
 */

import { FormData, THRESHOLDS } from "./shared";
import { Alert, QCard, QHeader, QBody, NavBtns, C } from "./shared";

interface Props {
  formData: FormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateField: (field: keyof FormData, value: any) => void;
  goTo: (n: number) => void;
  hasProgress: boolean;
}

export default function WelcomeScreen({ formData, updateField, goTo, hasProgress }: Props) {
  const limit = THRESHOLDS[formData.householdSize] || 1956;

  return (
    <div>
      <QCard>
        <QHeader qNum="Welcome" title="Let's Get You Started" desc="This guide walks you through all 13 questions on Local Form 239, with real-time feedback on your answers." />
        <QBody>
          <Alert type="yellow">
            <strong>⚠️ Important:</strong> This is a reference tool only. All information you submit on the real form must be truthful and accurate. False statements may result in dismissal and penalties.
          </Alert>

          <div style={{ background: "#f0f4ff", borderLeft: `4px solid ${C.sky}`, borderRadius: "0 10px 10px 0", padding: "13px 16px", marginBottom: 16, fontSize: 12, lineHeight: 1.7 }}>
            <strong style={{ color: C.navy, display: "block", marginBottom: 5 }}>📋 2025 Best-Qualified Income Limits (Georgia)</strong>
            <div>1 person: <strong>under $1,956/mo</strong></div>
            <div>2 people: <strong>under $2,643/mo</strong></div>
            <div>3 people: <strong>under $3,331/mo</strong></div>
            <div>4 people: <strong>under $4,018/mo</strong></div>
            <div style={{ marginTop: 6, fontStyle: "italic", color: C.gray }}>Based on 150% Federal Poverty Level</div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: C.gray, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Household Size (including yourself)
            </label>
            <select
              value={formData.householdSize}
              onChange={(e) => updateField("householdSize", parseInt(e.target.value))}
              style={{
                width: "100%",
                padding: "11px 13px",
                border: `2px solid ${C.border}`,
                borderRadius: 10,
                fontSize: 15,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                color: C.navy,
                background: "#f8faff",
                outline: "none",
                WebkitAppearance: "none",
              }}
            >
              <option value={1}>1 Person (just me)</option>
              <option value={2}>2 People</option>
              <option value={3}>3 People</option>
              <option value={4}>4 People</option>
              <option value={5}>5 People</option>
            </select>
          </div>

          <Alert type="green">
            <strong>✅ Your limit:</strong> Under <strong>${limit.toLocaleString()}/month</strong> total income
          </Alert>

          {hasProgress && (
            <Alert type="blue">
              <strong>💾 Progress Restored:</strong> Your previously saved answers have been loaded. You can continue where you left off.
            </Alert>
          )}
        </QBody>
      </QCard>

      <NavBtns
        hideBack
        onNext={() => goTo(1)}
        nextLabel={hasProgress ? "Continue Application →" : "Start Application →"}
      />
    </div>
  );
}
