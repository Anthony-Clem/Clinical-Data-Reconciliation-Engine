import { Expose, Type } from "class-transformer";
import { IsArray, IsDate, IsObject } from "class-validator";

export class ValidateDataQualityRequestDto {
  @IsObject()
  demographics!: object;

  @IsArray()
  medications!: string[];

  @IsArray()
  allergies!: string[];

  @IsArray()
  conditions!: string[];

  @IsObject()
  vital_signs!: object;

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
