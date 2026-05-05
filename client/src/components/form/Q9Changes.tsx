/**
 * Q9Changes — Expected Major Changes
 * Design: Structured Confidence
 */

import { FormData, Alert, QCard, QHeader, QBody, RadioToggle, FieldTextarea, NavBtns } from "./shared";

interface Props {
  formData: FormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateField: (field: keyof FormData, value: any) => void;
  goTo: (n: number) => void;
}

export default function Q9Changes({ formData, updateField, goTo }: Props) {
  return (
    <div>
      <QCard>
        <QHeader qNum="Question 9" title="Expected Major Changes" desc="Do you expect any major changes to your income, expenses, or assets in the next 12 months?" />
        <QBody>
          <Alert type="green">
            <strong>✅ Best Answer:</strong> Select YES and provide a clear, honest explanation. This is your chance to explain your hardship.
          </Alert>

          <RadioToggle
            label="Do you expect major changes?"
            value={formData.changes}
            onChange={(v) => updateField("changes", v as "yes" | "no")}
            options={[
              { value: "yes", label: "✓ Yes", colorClass: "green" },
              { value: "no", label: "✗ No", colorClass: "default" },
            ]}
          />

          {formData.changes === "yes" && (
            <FieldTextarea
              label="Explanation (attach separate sheet)"
              value={formData.q9_explain}
              onChange={(v) => updateField("q9_explain", v)}
              placeholder="Example: I am unable to work because my vehicle requires costly repairs I cannot afford. My 2008 Chevrolet Malibu needs a valve cover gasket repair. Until repaired, I cannot drive for Uber and will have $0 income next month."
              hint="💡 Be specific — mention the car issue, layoff, medical problem, etc."
              minHeight={130}
            />
          )}
        </QBody>
      </QCard>
      <NavBtns onBack={() => goTo(8)} onNext={() => goTo(10)} />
    </div>
  );
}
