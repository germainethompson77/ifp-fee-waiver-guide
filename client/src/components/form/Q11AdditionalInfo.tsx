/**
 * Q11AdditionalInfo — Additional Information (Q12 on the form)
 * Design: Structured Confidence
 */

import { FormData, Alert, QCard, QHeader, QBody, FieldTextarea, NavBtns } from "./shared";

interface Props {
  formData: FormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateField: (field: keyof FormData, value: any) => void;
  goTo: (n: number) => void;
}

export default function Q11AdditionalInfo({ formData, updateField, goTo }: Props) {
  return (
    <div>
      <QCard>
        <QHeader qNum="Question 12" title="Additional Information" desc="Provide any other information that explains why you cannot pay the costs of these proceedings." />
        <QBody>
          <Alert type="green">
            <strong>✅ Best Qualified:</strong> Be clear and honest. Mention low income, minimal assets, dependents, and your specific hardship.
          </Alert>

          <FieldTextarea
            label="Your Explanation"
            value={formData.q12_info}
            onChange={(v) => updateField("q12_info", v)}
            placeholder="Example: I am currently unable to work due to my vehicle being inoperable. My only asset is a 2008 Chevrolet Malibu valued at approximately $1,500 which requires costly repairs I cannot afford. My total savings is $11.13. I receive EBT food assistance. I am unable to pay the court filing fee without being deprived of basic necessities including food and shelter."
            minHeight={150}
          />
        </QBody>
      </QCard>
      <NavBtns onBack={() => goTo(10)} onNext={() => goTo(12)} />
    </div>
  );
}
