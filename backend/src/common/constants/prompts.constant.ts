import { ReconcileMedicationRequestDto } from "@/modules/reconcile/dto/reconcile-medication.dto";
import { ValidateDataQualityRequestDto } from "@/modules/validate/dto/validate-data-quality.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class Prompts {
  reconcileMedicationPrompt(dto: ReconcileMedicationRequestDto) {
    return `
You are a clinical data reconciliation assistant.

Your task is to analyze conflicting medication records from multiple healthcare data sources and determine the most likely accurate medication record.

Use the following principles when making decisions:
1. Prefer more recent records over older records.
2. Prefer sources with higher reliability.
3. Consider the patient's clinical context (age, conditions, lab results).
4. Consider medical safety and typical prescribing patterns.
5. If pharmacy fills conflict with clinical prescriptions, determine if the pharmacy record may reflect an older prescription.

You must reconcile the records and determine the most likely current medication and dosage.

Return ONLY valid JSON. Do not include markdown, explanations, or text outside the JSON.

The JSON response MUST follow this schema exactly:

{
  "reconciled_medication": string,
  "confidence_score": number,
  "reasoning": string,
  "recommended_actions": string[],
  "clinical_safety_check": "PASSED" | "REVIEW"
}

Rules:
- confidence_score must be between 0 and 1
- reasoning should explain why one record was chosen over others
- recommended_actions should describe what healthcare systems should do to correct inconsistencies
- clinical_safety_check should be "PASSED" if the medication appears safe given the patient context, otherwise "REVIEW"

Here is the patient medication conflict data to analyze:

${JSON.stringify(dto)}
`;
  }

  validateDataQualityPrompt(dto: ValidateDataQualityRequestDto) {
    return `
    You are a healthcare data quality auditor.

Your task is to evaluate the quality of a patient medical record and produce a data quality score from 0–100 with a detailed breakdown.

Evaluate the record across the following four dimensions:

1. Completeness
- Are required fields present?
- Are lists such as allergies, medications, and conditions populated?

2. Accuracy
- Do values appear valid or suspicious?
- Detect impossible or invalid entries.

3. Timeliness
- How recent is the data?
- Records older than 6 months should reduce the score.

4. Clinical Plausibility
- Do vital signs and values make physiological sense?
- Identify clinically impossible or dangerous values.

Scoring Rules:
- Each dimension should be scored from 0–100.
- The overall_score should represent the approximate average of the four dimensions.
- Identify specific issues found in the data.

Severity Levels:
- low → minor concern
- medium → potentially important issue
- high → clinically dangerous or clearly invalid data

Return ONLY valid JSON.
Do not include explanations, markdown, or text outside the JSON.

The JSON response MUST match this schema exactly:

{
  "overall_score": number,
  "breakdown": {
    "completeness": number,
    "accuracy": number,
    "timeliness": number,
    "clinical_plausibility": number
  },
  "issues_detected": [
    {
      "field": string,
      "issue": string,
      "severity": "low" | "medium" | "high"
    }
  ]
}

Here is the patient record to evaluate: 

${JSON.stringify(dto)}
    `;
  }
}
