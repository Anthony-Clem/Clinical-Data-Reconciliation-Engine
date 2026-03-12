import { Injectable, Logger } from "@nestjs/common";
import {
  ValidateDataQualityRequestDto,
  ValidateDataQualityResponseDto,
} from "./dto/validate-data-quality.dto";
import { Prompts } from "@/common/constants/prompts.constant";
import { GeminiService } from "@/utils/gemini.service";
import { CacheService } from "@/utils/cache.service";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ValidateService {
  constructor(
    private readonly prompts: Prompts,
    private readonly geminiService: GeminiService,
    private readonly cacheService: CacheService,
  ) {}

  async validateDataQuality(dto: ValidateDataQualityRequestDto) {
    Logger.log("Validating Data Quality...");
    const cacheKey = this.cacheService.generateCacheKey("validate", dto);

    const existingCache =
      await this.cacheService.get<ValidateDataQualityResponseDto>(cacheKey);

    if (existingCache) {
      Logger.log(`Found in cache ${cacheKey}...`);
      return existingCache;
    }

    Logger.log("Not found in cache, generating...");
    const prompt = this.prompts.validateDataQualityPrompt(dto);

    const res = await this.geminiService.generateContent(prompt);

    const structuredRes = plainToInstance(ValidateDataQualityResponseDto, res);

    await this.cacheService.set(cacheKey, structuredRes);

    return structuredRes;
  }
}
