import { Expose } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsPositive,
  IsString,
} from "class-validator";

export class PatientContextDto {
  @IsPositive()
  age!: number;

  @IsArray()
  conditions!: string[];

  @IsObject()
  recen_labs!: object;
}

export enum SourceReliabilityEnum {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}

export class SourceDto {
  @IsString()
  @IsNotEmpty()
  system!: string;

  @IsString()
  @IsNotEmpty()
  medication!: string;

  @IsDate()
  last_updated!: Date;

  @IsEnum(SourceReliabilityEnum)
  source_reliability!: SourceReliabilityEnum;
}

export class ReconcileMedicationRequestDto {
  @IsObject()
  patient_context!: PatientContextDto;

  @IsArray()
  sources!: SourceDto[];
}

export enum ClinicalSafetyCheckEnum {
  PASSED = "PASSED",
  REVIEW = "REVIEW",
}

export class ReconcileMedicationResponseDto {
  @Expose()
  reconciled_medication!: string;

  @Expose()
  confidence_score!: number;

  @Expose()
  reasoning!: string;

  @Expose()
  recommeded_actions!: string[];

  @Expose()
  clinical_safety_check!: ClinicalSafetyCheckEnum;
}
