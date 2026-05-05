/**
 * Q4Bank — Cash & Bank Accounts
 * Design: Structured Confidence
 */

import { FormData, num, fmt, Alert, QCard, QHeader, QBody, FieldInput, TotalRow, StatusChip, NavBtns } from "./shared";

interface Props {
  formData: FormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateField: (field: keyof FormData, value: any) => void;
  goTo: (n: number) => void;
}

export default function Q4Bank({ formData, updateField, goTo }: Props) {
  const total = num(formData.cash_hand) + num(formData.bank1_bal) + num(formData.bank2_bal);

  let statusEl = null;
  if (total <= 200) {
    statusEl = <StatusChip type="good">✅ Best Qualified — Under $200</StatusChip>;
  } else if (total <= 1000) {
    statusEl = <StatusChip type="warn">⚠️ Acceptable but notable — Explain if needed</StatusChip>;
  } else {
    statusEl = <StatusChip type="bad">❌ Over $1,000 — High risk of denial</StatusChip>;
  }

  return (
    <div>
      <QCard>
        <QHeader qNum="Question 4" title="Cash & Bank Accounts" desc="List ALL cash on hand and money in any bank or financial institution." />
        <QBody>
          <Alert type="green">
            <strong>✅ Best Qualified:</strong> Total under $200 across all accounts.
          </Alert>
          <Alert type="red">
            <strong>⚠️ Danger Zone:</strong> Over $1,000 in any single account.
          </Alert>

          <FieldInput label="Cash on Hand" type="number" value={formData.cash_hand} onChange={(v) => updateField("cash_hand", v)} placeholder="0" prefix="$" hint="Best: $0 – $50" inputMode="numeric" />
          <FieldInput label="Bank / Institution #1 Name" value={formData.bank1_name} onChange={(v) => updateField("bank1_name", v)} placeholder="Example: Wells Fargo" />
          <FieldInput label="Account Type" value={formData.bank1_type} onChange={(v) => updateField("bank1_type", v)} placeholder="Example: Checking" />
          <FieldInput label="Balance" type="number" value={formData.bank1_bal} onChange={(v) => updateField("bank1_bal", v)} placeholder="0" prefix="$" inputMode="numeric" />
          <FieldInput label="Bank / Institution #2 Name (if any)" value={formData.bank2_name} onChange={(v) => updateField("bank2_name", v)} placeholder="Example: Navy Federal CU (or N/A)" />
          <FieldInput label="Balance" type="number" value={formData.bank2_bal} onChange={(v) => updateField("bank2_bal", v)} placeholder="0" prefix="$" inputMode="numeric" />

          <TotalRow label="Total Liquid Assets" amount={total} statusEl={statusEl} />
        </QBody>
      </QCard>
      <NavBtns onBack={() => goTo(3)} onNext={() => goTo(5)} />
    </div>
  );
}
