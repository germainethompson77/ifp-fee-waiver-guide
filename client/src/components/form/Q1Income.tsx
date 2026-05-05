/**
 * Q1Income — Monthly Income Sources
 * Design: Structured Confidence
 */

import { FormData, THRESHOLDS, fmt, num, Alert, QCard, QHeader, QBody, IncomeRow, TotalRow, StatusChip, SectionLabel, Divider, FieldInput, NavBtns } from "./shared";

interface Props {
  formData: FormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateField: (field: keyof FormData, value: any) => void;
  updateFields: (updates: Partial<FormData>) => void;
  goTo: (n: number) => void;
}

export default function Q1Income({ formData, updateField, goTo }: Props) {
  const total = num(formData.inc_employment) + num(formData.inc_self) + num(formData.inc_disability) +
    num(formData.inc_unemployment) + num(formData.inc_assistance) + num(formData.inc_retirement) + num(formData.inc_other);
  const limit = THRESHOLDS[formData.householdSize] || 1956;

  let statusEl = null;
  if (total === 0) {
    statusEl = <StatusChip type="info">⚠️ Enter your income above</StatusChip>;
  } else if (total <= limit) {
    statusEl = <StatusChip type="good">✅ Best Qualified — Under {fmt(limit)} limit</StatusChip>;
  } else if (total <= limit * 1.3) {
    statusEl = <StatusChip type="warn">⚠️ Close to limit — May qualify but risky</StatusChip>;
  } else {
    statusEl = <StatusChip type="bad">❌ Over limit — High risk of denial</StatusChip>;
  }

  return (
    <div>
      <QCard>
        <QHeader qNum="Question 1" title="Monthly Income Sources" desc="Enter your average monthly income from each source over the past 12 months. Use gross (before-tax) amounts." />
        <QBody>
          <Alert type="yellow">
            <strong>💡 Tip:</strong> If you received weekly or annual income, convert it to monthly. Enter $0 if a source doesn't apply.
          </Alert>

          <SectionLabel>Income Sources — You</SectionLabel>

          <IncomeRow label="Employment" sub="Example: Uber, warehouse, retail" value={formData.inc_employment} onChange={(v) => updateField("inc_employment", v)} />
          <IncomeRow label="Self-Employment" value={formData.inc_self} onChange={(v) => updateField("inc_self", v)} />
          <IncomeRow label="Disability (SSI/SSDI)" sub="Best range: $0–$800" value={formData.inc_disability} onChange={(v) => updateField("inc_disability", v)} />
          <IncomeRow label="Unemployment" sub="Best range: $0–$365" value={formData.inc_unemployment} onChange={(v) => updateField("inc_unemployment", v)} />
          <IncomeRow label="Public Assistance (EBT/SNAP)" sub="Best range: $0–$250" value={formData.inc_assistance} onChange={(v) => updateField("inc_assistance", v)} />
          <IncomeRow label="Retirement / Social Security" value={formData.inc_retirement} onChange={(v) => updateField("inc_retirement", v)} />
          <IncomeRow label="Other Income" sub="Specify if applicable" value={formData.inc_other} onChange={(v) => updateField("inc_other", v)} />

          <TotalRow label="Total Monthly Income" amount={total} statusEl={statusEl} />

          <Divider />
          <SectionLabel>Expected Income — Next Month</SectionLabel>

          <FieldInput
            label="Expected Income Next Month"
            type="number"
            value={formData.inc_next}
            onChange={(v) => updateField("inc_next", v)}
            placeholder="0"
            prefix="$"
            hint="💡 $0 expected next month strongly supports approval"
            inputMode="numeric"
          />
        </QBody>
      </QCard>
      <NavBtns onBack={() => goTo(0)} onNext={() => goTo(2)} />
    </div>
  );
}
