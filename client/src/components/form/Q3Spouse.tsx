/**
 * Q3Spouse — Spouse's Employment History
 * Design: Structured Confidence
 */

import { FormData, Alert, QCard, QHeader, QBody, FieldInput, RadioToggle, NavBtns } from "./shared";

interface Props {
  formData: FormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateField: (field: keyof FormData, value: any) => void;
  goTo: (n: number) => void;
}

export default function Q3Spouse({ formData, updateField, goTo }: Props) {
  return (
    <div>
      <QCard>
        <QHeader qNum="Question 3" title="Spouse's Employment History" desc="If not married or spouse has no work history, enter N/A." />
        <QBody>
          <Alert type="green">
            <strong>✅ Best Qualified:</strong> Unmarried OR spouse unemployed / low income.
          </Alert>

          <RadioToggle
            label="Marital Status"
            value={formData.married}
            onChange={(v) => updateField("married", v as "yes" | "no")}
            options={[
              { value: "no", label: "Not Married", colorClass: "green" },
              { value: "yes", label: "Married", colorClass: "default" },
            ]}
          />

          {formData.married === "yes" && (
            <div>
              <FieldInput label="Spouse Employer Name" value={formData.sp_emp} onChange={(v) => updateField("sp_emp", v)} placeholder="Example: Retail Store, Atlanta GA" />
              <FieldInput label="Dates of Employment" value={formData.sp_dates} onChange={(v) => updateField("sp_dates", v)} placeholder="Example: Jan 2024 – Present" />
              <FieldInput label="Gross Monthly Pay" type="number" value={formData.sp_pay} onChange={(v) => updateField("sp_pay", v)} placeholder="0" prefix="$" hint="Best range: $0 – $1,000/month" inputMode="numeric" />
            </div>
          )}
        </QBody>
      </QCard>
      <NavBtns onBack={() => goTo(2)} onNext={() => goTo(4)} />
    </div>
  );
}
