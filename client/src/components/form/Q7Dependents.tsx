/**
 * Q7Dependents — Dependents
 * Design: Structured Confidence
 */

import { FormData, Alert, QCard, QHeader, QBody, FieldInput, Divider, NavBtns } from "./shared";

interface Props {
  formData: FormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateField: (field: keyof FormData, value: any) => void;
  goTo: (n: number) => void;
}

export default function Q7Dependents({ formData, updateField, goTo }: Props) {
  return (
    <div>
      <QCard>
        <QHeader qNum="Question 7" title="Dependents" desc="List all persons who rely on you for financial support. Use initials only for anyone under 18." />
        <QBody>
          <Alert type="green">
            <strong>✅ Best Qualified:</strong> Having dependents strengthens your application. More dependents = higher FPL threshold.
          </Alert>
          <Alert type="yellow">
            <strong>⚠️ Privacy:</strong> Use initials ONLY for anyone under 18. Never write a minor's full name on court documents.
          </Alert>

          <FieldInput label="Dependent 1 — Initials / Name" value={formData.dep1_name} onChange={(v) => updateField("dep1_name", v)} placeholder="Example: J.D. (or N/A)" />
          <FieldInput label="Relationship" value={formData.dep1_rel} onChange={(v) => updateField("dep1_rel", v)} placeholder="Example: Son / Daughter / Parent" />
          <FieldInput label="Age" type="number" value={formData.dep1_age} onChange={(v) => updateField("dep1_age", v)} placeholder="Example: 7" inputMode="numeric" />

          <Divider />

          <FieldInput label="Dependent 2 — Initials / Name (if any)" value={formData.dep2_name} onChange={(v) => updateField("dep2_name", v)} placeholder="N/A" />
          <FieldInput label="Relationship" value={formData.dep2_rel} onChange={(v) => updateField("dep2_rel", v)} placeholder="" />
          <FieldInput label="Age" type="number" value={formData.dep2_age} onChange={(v) => updateField("dep2_age", v)} placeholder="" inputMode="numeric" />
        </QBody>
      </QCard>
      <NavBtns onBack={() => goTo(6)} onNext={() => goTo(8)} />
    </div>
  );
}
