import {
  ClinicalSafetyCheckEnum,
  ReconcileMedicationRequestDto,
  ReconcileMedicationResponseDto,
} from "@/modules/reconcile/dto/reconcile-medication.dto";
import { SourceReliabilityEnum } from "@/modules/reconcile/dto/reconcile-medication.dto";

export const mockReconcileRequestDto: ReconcileMedicationRequestDto = {
  patient_context: {
    age: 67,
    conditions: ["Type 2 Diabetes", "Hypertension"],
    recen_labs: {
      eGFR: 45,
      cholesterol: 180,
    },
  },
  sources: [
    {
      system: "Hospital EHR",
      medication: "Metformin 1000mg twice daily",
      last_updated: new Date("2024-10-15"),
      source_reliability: SourceReliabilityEnum.HIGH,
    },
    {
      system: "Primary Care",
      medication: "Metformin 500mg twice daily",
      last_updated: new Date("2025-01-20"),
      source_reliability: SourceReliabilityEnum.HIGH,
    },
    {
      system: "Pharmacy",
      medication: "Metformin 1000mg daily",
      last_updated: new Date("2025-01-25"),
      source_reliability: SourceReliabilityEnum.MEDIUM,
    },
  ],
};

export const mockReconcileResponseDto: ReconcileMedicationResponseDto = {
  reconciled_medication: "Metformin 500mg twice daily",
  confidence_score: 0.88,
  reasoning:
    "Primary care record is most recent clinical encounter. Dose reduction appropriate given declining kidney function (eGFR 45). Pharmacy fill may reflect old prescription.",
  recommeded_actions: [
    "Update Hospital EHR to 500mg twice daily",
    "Verify with pharmacist that correct dose is being filled",
  ],
  clinical_safety_check: ClinicalSafetyCheckEnum.PASSED,
};
