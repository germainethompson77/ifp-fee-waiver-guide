/**
 * Q5Assets — Assets
 * Design: Structured Confidence
 */

import { FormData, Alert, QCard, QHeader, QBody, FieldInput, NavBtns } from "./shared";

interface Props {
  formData: FormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateField: (field: keyof FormData, value: any) => void;
  goTo: (n: number) => void;
}

export default function Q5Assets({ formData, updateField, goTo }: Props) {
  return (
    <div>
      <QCard>
        <QHeader qNum="Question 5" title="Assets" desc="List all assets you or your spouse own. Do NOT include clothing or household furnishings." />
        <QBody>
          <Alert type="green">
            <strong>✅ Best Qualified:</strong> Renting, one older vehicle under $3,000, no real estate, no stocks/bonds.
          </Alert>
          <Alert type="red">
            <strong>⚠️ Danger Zone:</strong> Multiple vehicles, real estate ownership, or total assets over $5,000.
          </Alert>

          <FieldInput label="Home Value (if owned)" type="number" value={formData.asset_home} onChange={(v) => updateField("asset_home", v)} placeholder="0" prefix="$" hint="✅ $0 — Renting is best qualified" inputMode="numeric" />
          <FieldInput label="Other Real Estate Value" type="number" value={formData.asset_realestate} onChange={(v) => updateField("asset_realestate", v)} placeholder="0" prefix="$" inputMode="numeric" />
          <FieldInput label="Vehicle #1 — Make & Year" value={formData.veh1_make} onChange={(v) => updateField("veh1_make", v)} placeholder="Example: 2008 Chevrolet Malibu" />
          <FieldInput label="Vehicle #1 — Model" value={formData.veh1_model} onChange={(v) => updateField("veh1_model", v)} placeholder="Example: Malibu" />
          <FieldInput label="Vehicle #1 — Estimated Value" type="number" value={formData.veh1_val} onChange={(v) => updateField("veh1_val", v)} placeholder="0" prefix="$" hint="Best range: $1,000 – $2,500" inputMode="numeric" />
          <FieldInput label="Vehicle #2 — Make & Year (if any)" value={formData.veh2_make} onChange={(v) => updateField("veh2_make", v)} placeholder="N/A" />
          <FieldInput label="Vehicle #2 — Estimated Value" type="number" value={formData.veh2_val} onChange={(v) => updateField("veh2_val", v)} placeholder="0" prefix="$" hint="⚠️ A second vehicle may hurt your case" inputMode="numeric" />
          <FieldInput label="Other Assets (stocks, jewelry, etc.)" type="number" value={formData.asset_other} onChange={(v) => updateField("asset_other", v)} placeholder="0" prefix="$" inputMode="numeric" />
        </QBody>
      </QCard>
      <NavBtns onBack={() => goTo(4)} onNext={() => goTo(6)} />
    </div>
  );
}
