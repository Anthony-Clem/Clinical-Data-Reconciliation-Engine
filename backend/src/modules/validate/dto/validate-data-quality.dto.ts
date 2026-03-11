import { Expose } from "class-transformer";
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
  vitalSigns!: object;

  @IsDate()
  lastUpdated!: Date;
}

export class BreakdownDto {
  @Expose()
  completeness!: number;

  @Expose()
  accuracy!: number;

  @Expose()
  timeliness!: number;

  @Expose()
  clinicalPlausibility!: number;
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
  overallScore!: number;

  @Expose()
  breakdown!: BreakdownDto;

  @Expose()
  issuesDetected!: IssuesDetectedDto[];
}
