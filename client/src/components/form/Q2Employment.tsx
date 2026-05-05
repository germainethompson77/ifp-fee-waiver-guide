/**
 * Q2Employment — Employment History
 * Design: Structured Confidence
 */

import { FormData, Alert, QCard, QHeader, QBody, FieldInput, SectionLabel, Divider, NavBtns } from "./shared";

interface Props {
  formData: FormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateField: (field: keyof FormData, value: any) => void;
  goTo: (n: number) => void;
}

export default function Q2Employment({ formData, updateField, goTo }: Props) {
  return (
    <div>
      <QCard>
        <QHeader qNum="Question 2" title="Your Employment History" desc="List your jobs from the past 2 years, most recent first." />
        <QBody>
          <Alert type="green">
            <strong>✅ Best Qualified:</strong> Recent job loss, gaps in employment, or inability to work (car broken down, illness) all strengthen your application.
          </Alert>

          <SectionLabel>Most Recent Job</SectionLabel>
          <FieldInput label="Employer Name" value={formData.emp1_name} onChange={(v) => updateField("emp1_name", v)} placeholder="Example: ABC Warehouse" />
          <FieldInput label="Employer Address / City" value={formData.emp1_addr} onChange={(v) => updateField("emp1_addr", v)} placeholder="Example: Atlanta, GA" />
          <FieldInput label="Dates of Employment" value={formData.emp1_dates} onChange={(v) => updateField("emp1_dates", v)} placeholder="Example: Jan 2023 – Mar 2025" />
          <FieldInput label="Gross Monthly Pay" type="number" value={formData.emp1_pay} onChange={(v) => updateField("emp1_pay", v)} placeholder="0" prefix="$" inputMode="numeric" />
          <FieldInput label="Reason for Leaving" value={formData.emp1_reason} onChange={(v) => updateField("emp1_reason", v)} placeholder="Example: Laid off / Vehicle broke down" />

          <Divider />
          <SectionLabel>Previous Job (if any)</SectionLabel>
          <FieldInput label="Employer Name" value={formData.emp2_name} onChange={(v) => updateField("emp2_name", v)} placeholder="Example: Fast Food Inc. (or N/A)" />
          <FieldInput label="Dates of Employment" value={formData.emp2_dates} onChange={(v) => updateField("emp2_dates", v)} placeholder="Example: Jun 2022 – Dec 2022 (or N/A)" />
          <FieldInput label="Gross Monthly Pay" type="number" value={formData.emp2_pay} onChange={(v) => updateField("emp2_pay", v)} placeholder="0" prefix="$" inputMode="numeric" />
        </QBody>
      </QCard>
      <NavBtns onBack={() => goTo(1)} onNext={() => goTo(3)} />
    </div>
  );
}
