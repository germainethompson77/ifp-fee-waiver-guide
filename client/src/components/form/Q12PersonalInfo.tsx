/**
 * Q12PersonalInfo — Personal Information (Q13 on the form)
 * Design: Structured Confidence
 */

import { FormData, Alert, QCard, QHeader, QBody, FieldInput, NavBtns } from "./shared";

interface Props {
  formData: FormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateField: (field: keyof FormData, value: any) => void;
  goTo: (n: number) => void;
}

export default function Q12PersonalInfo({ formData, updateField, goTo }: Props) {
  return (
    <div>
      <QCard>
        <QHeader qNum="Question 13" title="Personal Information" desc="Final identifying information for the form." />
        <QBody>
          <Alert type="yellow">
            <strong>⚠️ Privacy:</strong> Enter only the LAST 4 digits of your SSN — never the full number.
          </Alert>

          <FieldInput label="Full Name" value={formData.p_name} onChange={(v) => updateField("p_name", v)} placeholder="Your full legal name" />
          <FieldInput label="City & State of Legal Residence" value={formData.p_city} onChange={(v) => updateField("p_city", v)} placeholder="Example: Atlanta, Georgia" />
          <FieldInput label="Daytime Phone Number" type="tel" value={formData.p_phone} onChange={(v) => updateField("p_phone", v)} placeholder="Example: 404-555-1234" />
          <FieldInput label="Age" type="number" value={formData.p_age} onChange={(v) => updateField("p_age", v)} placeholder="Example: 34" inputMode="numeric" />
          <FieldInput label="Years of Schooling Completed" type="number" value={formData.p_school} onChange={(v) => updateField("p_school", v)} placeholder="Example: 12" inputMode="numeric" />
          <FieldInput label="Last 4 Digits of SSN ONLY" value={formData.p_ssn} onChange={(v) => updateField("p_ssn", v)} placeholder="Example: 0000" maxLength={4} inputMode="numeric" />
          <FieldInput label="District Court" value={formData.p_district} onChange={(v) => updateField("p_district", v)} placeholder="Example: Northern District of Georgia" />
          <FieldInput label="Case Name (Plaintiff v. Defendant)" value={formData.p_case} onChange={(v) => updateField("p_case", v)} placeholder="Example: John Doe v. ABC Company" />
        </QBody>
      </QCard>
      <NavBtns onBack={() => goTo(11)} onNext={() => goTo(13)} nextLabel="View My Summary →" nextVariant="finish" />
    </div>
  );
}
