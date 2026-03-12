import { Injectable, Logger } from "@nestjs/common";
import {
  ReconcileMedicationRequestDto,
  ReconcileMedicationResponseDto,
} from "./dto/reconcile-medication.dto";
import { Prompts } from "@/common/constants/prompts.constant";
import { GeminiService } from "@/utils/gemini.service";
import { CacheService } from "@/utils/cache.service";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ReconcileService {
  constructor(
    private readonly geminiService: GeminiService,
    private readonly prompts: Prompts,
    private readonly cacheService: CacheService,
  ) {}

  async reconcileMedication(
    dto: ReconcileMedicationRequestDto,
  ): Promise<ReconcileMedicationResponseDto> {
    Logger.log("Validating Data Quality...");
    const cacheKey = this.cacheService.generateCacheKey("reconcile", dto);

    const existingCache =
      await this.cacheService.get<ReconcileMedicationResponseDto>(cacheKey);

    if (existingCache) {
      Logger.log(`Found in cache ${cacheKey}...`);

      return existingCache;
    }

    Logger.log("Not found in cache, generating...");
    const prompt = this.prompts.reconcileMedicationPrompt(dto);

    const res = await this.geminiService.generateContent(prompt);

    const structuredRes = plainToInstance(ReconcileMedicationResponseDto, res);

    await this.cacheService.set(cacheKey, structuredRes);

    return structuredRes;
  }
}
