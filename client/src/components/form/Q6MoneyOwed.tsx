/**
 * Q6MoneyOwed — Money Owed to You
 * Design: Structured Confidence
 */

import { FormData, Alert, QCard, QHeader, QBody, FieldInput, NavBtns } from "./shared";

interface Props {
  formData: FormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateField: (field: keyof FormData, value: any) => void;
  goTo: (n: number) => void;
}

export default function Q6MoneyOwed({ formData, updateField, goTo }: Props) {
  return (
    <div>
      <QCard>
        <QHeader qNum="Question 6" title="Money Owed to You" desc="List any person, business, or organization that owes you money." />
        <QBody>
          <Alert type="green">
            <strong>✅ Best Qualified:</strong> N/A or $0. Large amounts owed to you suggest potential income.
          </Alert>

          <FieldInput label="Who Owes You Money? (if anyone)" value={formData.owed_who} onChange={(v) => updateField("owed_who", v)} placeholder="N/A — No one owes me money" />
          <FieldInput label="Amount Owed to You" type="number" value={formData.owed_amt} onChange={(v) => updateField("owed_amt", v)} placeholder="0" prefix="$" inputMode="numeric" />
        </QBody>
      </QCard>
      <NavBtns onBack={() => goTo(5)} onNext={() => goTo(7)} />
    </div>
  );
}
