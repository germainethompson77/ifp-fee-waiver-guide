/**
 * Q10Attorney — Attorney & Other Fees (Q10 & Q11)
 * Design: Structured Confidence
 */

import { FormData, Alert, QCard, QHeader, QBody, RadioToggle, FieldInput, Divider, NavBtns } from "./shared";

interface Props {
  formData: FormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateField: (field: keyof FormData, value: any) => void;
  goTo: (n: number) => void;
}

export default function Q10Attorney({ formData, updateField, goTo }: Props) {
  return (
    <div>
      <QCard>
        <QHeader qNum="Questions 10 & 11" title="Attorney & Other Fees" desc="Have you paid or will you pay anyone for help with this case?" />
        <QBody>
          <Alert type="green">
            <strong>✅ Best Answer:</strong> No to both questions.
          </Alert>

          <RadioToggle
            label="Q10: Have you paid or will you pay an attorney?"
            value={formData.atty}
            onChange={(v) => updateField("atty", v as "yes" | "no")}
            options={[
              { value: "no", label: "✓ No", colorClass: "green" },
              { value: "yes", label: "✗ Yes", colorClass: "default" },
            ]}
          />

          {formData.atty === "yes" && (
            <div>
              <FieldInput label="Attorney Name & Address" value={formData.atty_name} onChange={(v) => updateField("atty_name", v)} placeholder="Attorney name and address" />
              <FieldInput label="Amount Paid / Will Pay" type="number" value={formData.atty_amt} onChange={(v) => updateField("atty_amt", v)} placeholder="0" prefix="$" inputMode="numeric" />
            </div>
          )}

          <Divider />

          <RadioToggle
            label="Q11: Have you paid or will you pay anyone else (paralegal, typist, etc.)?"
            value={formData.other_fee}
            onChange={(v) => updateField("other_fee", v as "yes" | "no")}
            options={[
              { value: "no", label: "✓ No", colorClass: "green" },
              { value: "yes", label: "✗ Yes", colorClass: "default" },
            ]}
          />

          {formData.other_fee === "yes" && (
            <div>
              <FieldInput label="Person's Name & Address" value={formData.otherfee_name} onChange={(v) => updateField("otherfee_name", v)} placeholder="Name and address" />
              <FieldInput label="Amount Paid / Will Pay" type="number" value={formData.otherfee_amt} onChange={(v) => updateField("otherfee_amt", v)} placeholder="0" prefix="$" inputMode="numeric" />
            </div>
          )}
        </QBody>
      </QCard>
      <NavBtns onBack={() => goTo(9)} onNext={() => goTo(11)} />
    </div>
  );
}
