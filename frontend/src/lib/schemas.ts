import { z } from "zod";

export const SourceReliabilityEnum = z.enum(["high", "medium", "low"]);

export const SourceSchema = z.object({
  system: z.string().min(1),
  medication: z.string().min(1),
  last_updated: z.string().min(1),
  source_reliability: SourceReliabilityEnum,
});

export const ReconcileMedicationSchema = z.object({
  age: z.number({ error: "Age is required" }).positive("Age must be positive"),
  conditions: z.string().min(1, "At least one condition is required"),
  recentLabs: z.string().min(1, "Recent labs are required"),
  sources: z.array(SourceSchema),
});

export const GenderEnum = z.enum(["M", "F"]);

export const DemographicsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: GenderEnum,
});

export const VitalSignsSchema = z.object({
  blood_pressure: z.string().min(1, "Blood pressure is required"),
  heart_rate: z.string().min(1, "Heart rate is required"),
});

export const ValidateDataQualitySchema = z.object({
  demographics: DemographicsSchema,
  medications: z.string().min(1, "At least one medication is required"),
  allergies: z.string(),
  conditions: z.string().min(1, "At least one condition is required"),
  vital_signs: VitalSignsSchema,
  last_updated: z.string().min(1, "Last updated is required"),
});
