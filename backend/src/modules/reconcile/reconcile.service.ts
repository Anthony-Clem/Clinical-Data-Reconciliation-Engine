import { Injectable, Logger } from "@nestjs/common";
import {
  ReconcileMedicationRequestDto,
  ReconcileMedicationResponseDto,
} from "./dto/reconcile-medication.dto";
import { Prompts } from "../../common/constants/prompts.constant";
import { GeminiService } from "../../utils/gemini.service";
import { CacheService } from "../../utils/cache.service";
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

    // generating the cache key
    const cacheKey = this.cacheService.generateCacheKey("reconcile", dto);

    // checking if the cache key already exists
    const existingCache =
      await this.cacheService.get<ReconcileMedicationResponseDto>(cacheKey);

    // if the cache exists return it, no need to reach the ai service
    if (existingCache) {
      Logger.log(`Found in cache ${cacheKey}...`);

      return existingCache;
    }

    // continuing through if the caches does not exist
    Logger.log("Not found in cache, generating...");

    // interting the dto into the prompt and generating it
    const prompt = this.prompts.reconcileMedicationPrompt(dto);

    // passing the prompt to gemini and returning the res
    const res = await this.geminiService.generateContent(prompt);

    // ensuring the res is structured at my response dto
    const structuredRes = plainToInstance(ReconcileMedicationResponseDto, res);

    // caching the generated key along with the res
    await this.cacheService.set(cacheKey, structuredRes);

    // returning the res to the controller
    return structuredRes;
  }
}
