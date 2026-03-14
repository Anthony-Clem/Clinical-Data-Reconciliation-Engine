export type ReconcileMedicationFormattedPayload = {
  patient_context: {
    age: number;
    conditions: string[];
    recent_labs: Record<string, number>;
  };
  sources: {
    system: string;
    medication: string;
    last_updated: string;
    source_reliability: "high" | "medium" | "low";
  }[];
};

export enum ClinicalSafetyCheckEnum {
  PASSED = "PASSED",
  REVIEW = "REVIEW",
}

export type ReconcileMedicationResponse = {
  reconciled_medication: string;
  confidence_score: number;
  reasoning: string;
  recommended_actions: string[];
  clinical_safety_check: ClinicalSafetyCheckEnum;
};

export type Severity = "low" | "medium" | "high";

export type IssueDetected = {
  field: string;
  issue: string;
  severity: Severity;
};

export type Breakdown = {
  completeness: number;
  accuracy: number;
  timeliness: number;
  clinical_plausibility: number;
};

export type ValidateDataQualityResponse = {
  overall_score: number;
  breakdown: Breakdown;
  issues_detected: IssueDetected[];
};

export type Gender = "M" | "F";

export type Demographics = {
  name: string;
  dob: string;
  gender: Gender;
};

export type VitalSigns = {
  blood_pressure: string;
  heart_rate: string;
};

export type ValidateDataQualityFormattedResponse = {
  demographics: Demographics;
  medications: string[];
  allergies: string[];
  conditions: string[];
  vital_signs: VitalSigns;
  last_updated: string;
};
