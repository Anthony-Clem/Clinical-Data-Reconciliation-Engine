import { Expose, Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
} from "class-validator";

export enum GenderEnum {
  MALE = "M",
  FEMALE = "F",
}

export class DemographicsDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsDate()
  @Type(() => Date)
  dob!: Date;

  @IsEnum(GenderEnum)
  gender!: GenderEnum;
}

export class VitalSignsDto {
  @IsString()
  @IsNotEmpty()
  blood_pressure!: string;
  @IsString()
  @IsNotEmpty()
  heart_rate!: string;
}

export class ValidateDataQualityRequestDto {
  @IsObject()
  demographics!: DemographicsDto;

  @IsArray()
  medications!: string[];

  @IsArray()
  allergies!: string[];

  @IsArray()
  conditions!: string[];

  @IsObject()
  vital_signs!: VitalSignsDto;

  @IsDate()
  @Type(() => Date)
  last_updated!: Date;
}

export class BreakdownDto {
  @Expose()
  completeness!: number;

  @Expose()
  accuracy!: number;

  @Expose()
  timeliness!: number;

  @Expose()
  clinical_plausibility!: number;
}

enum SeverityEnum {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}

export class IssuesDetectedDto {
  @Expose()
  field!: string;

  @Expose()
  issue!: string;

  @Expose()
  severity!: SeverityEnum;
}

export class ValidateDataQualityResponseDto {
  @Expose()
  overall_score!: number;

  @Expose()
  breakdown!: BreakdownDto;

  @Expose()
  issues_detected!: IssuesDetectedDto[];
}
