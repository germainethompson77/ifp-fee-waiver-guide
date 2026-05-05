/**
 * Q8Expenses — Monthly Expenses
 * Design: Structured Confidence
 */

import { FormData, num, Alert, QCard, QHeader, QBody, IncomeRow, TotalRow, StatusChip, RadioToggle, NavBtns } from "./shared";

interface Props {
  formData: FormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateField: (field: keyof FormData, value: any) => void;
  goTo: (n: number) => void;
}

export default function Q8Expenses({ formData, updateField, goTo }: Props) {
  const expFields = ["exp_rent", "exp_util", "exp_food", "exp_clothing", "exp_transport", "exp_medical", "exp_insurance", "exp_installment", "exp_other"] as const;
  const total = expFields.reduce((s, id) => s + num(formData[id]), 0);
  const income = (["inc_employment", "inc_self", "inc_disability", "inc_unemployment", "inc_assistance", "inc_retirement", "inc_other"] as const)
    .reduce((s, id) => s + num(formData[id]), 0);

  let statusEl = null;
  if (income > 0) {
    const ratio = total / income;
    if (ratio >= 0.8) {
      statusEl = <StatusChip type="good">✅ Good — Expenses match income well</StatusChip>;
    } else if (ratio >= 0.5) {
      statusEl = <StatusChip type="warn">⚠️ Expenses low vs income — Explain in Q12</StatusChip>;
    } else {
      statusEl = <StatusChip type="bad">❌ Expenses much lower than income — Strong explanation needed</StatusChip>;
    }
  }

  return (
    <div>
      <QCard>
        <QHeader qNum="Question 8" title="Monthly Expenses" desc="Estimate all average monthly expenses. Your total should be close to your income." />
        <QBody>
          <Alert type="green">
            <strong>✅ Best Qualified:</strong> Total expenses close to or matching your income. This shows no money left over for court fees.
          </Alert>
          <Alert type="red">
            <strong>⚠️ Danger:</strong> If expenses are much less than income, the judge will question why you can't pay the fee.
          </Alert>

          <IncomeRow label="Rent / Mortgage" sub="Best: $700 – $950/mo" value={formData.exp_rent} onChange={(v) => updateField("exp_rent", v)} />

          <div style={{ padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
            <RadioToggle
              label="Real estate taxes included in rent?"
              value={formData.tax_included}
              onChange={(v) => updateField("tax_included", v as "yes" | "no")}
              options={[
                { value: "yes", label: "✓ Yes", colorClass: "green" },
                { value: "no", label: "✗ No", colorClass: "default" },
              ]}
            />
            <RadioToggle
              label="Property insurance included in rent?"
              value={formData.ins_included}
              onChange={(v) => updateField("ins_included", v as "yes" | "no")}
              options={[
                { value: "yes", label: "✓ Yes", colorClass: "default" },
                { value: "no", label: "✗ No", colorClass: "default" },
              ]}
            />
          </div>

          <IncomeRow label="Utilities" sub="$0 if included in rent" value={formData.exp_util} onChange={(v) => updateField("exp_util", v)} />
          <IncomeRow label="Food" sub="$0 if receiving EBT/SNAP" value={formData.exp_food} onChange={(v) => updateField("exp_food", v)} />
          <IncomeRow label="Clothing" sub="Best: $50 – $100/mo" value={formData.exp_clothing} onChange={(v) => updateField("exp_clothing", v)} />
          <IncomeRow label="Transportation" sub="Best: $0 – $75/mo" value={formData.exp_transport} onChange={(v) => updateField("exp_transport", v)} />
          <IncomeRow label="Medical / Dental" value={formData.exp_medical} onChange={(v) => updateField("exp_medical", v)} />
          <IncomeRow label="Insurance (not in mortgage)" value={formData.exp_insurance} onChange={(v) => updateField("exp_insurance", v)} />
          <IncomeRow label="Installment Payments" sub="Vehicle, credit cards, etc." value={formData.exp_installment} onChange={(v) => updateField("exp_installment", v)} />
          <IncomeRow label="Other Expenses" value={formData.exp_other} onChange={(v) => updateField("exp_other", v)} />

          <TotalRow label="Total Monthly Expenses" amount={total} statusEl={statusEl} />
        </QBody>
      </QCard>
      <NavBtns onBack={() => goTo(7)} onNext={() => goTo(9)} />
    </div>
  );
}
