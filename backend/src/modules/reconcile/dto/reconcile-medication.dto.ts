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
  recentLabs!: object;
}

enum SourceReliabilityEnum {
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
  lastUpdated!: Date;

  @IsEnum(SourceReliabilityEnum)
  sourceReliability!: SourceReliabilityEnum;
}

export class ReconcileMedicationRequestDto {
  @IsObject()
  patientContext!: PatientContextDto;

  @IsArray()
  sources!: SourceDto[];
}

enum ClinicalSafetyCheckEnum {
  PASSED = "PASSED",
  FAILED = "FAILED",
}

export class ReconcileMedicationResponseDto {
  @Expose()
  reconciledMedication!: string;

  @Expose()
  confidenceScore!: number;

  @Expose()
  reasoning!: string;

  @Expose()
  recommededActions!: string[];

  @Expose()
  clinicalSafetyCheck!: ClinicalSafetyCheckEnum;
}
