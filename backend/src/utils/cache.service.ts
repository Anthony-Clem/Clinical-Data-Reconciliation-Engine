import {
  ReconcileMedicationRequestDto,
  ReconcileMedicationResponseDto,
} from "@/modules/reconcile/dto/reconcile-medication.dto";
import {
  ValidateDataQualityRequestDto,
  ValidateDataQualityResponseDto,
} from "@/modules/validate/dto/validate-data-quality.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { type Cache } from "cache-manager";
import { createHash } from "crypto";
import stringify from "fast-json-stable-stringify";

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  generateCacheKey(
    prefix: "reconcile" | "validate",
    request: ReconcileMedicationRequestDto | ValidateDataQualityRequestDto,
  ): string {
    const json = stringify(request);
    const hash = createHash("sha256").update(json).digest("hex");
    return `${prefix}:${hash}`;
  }

  async set(
    key: string,
    value: ReconcileMedicationResponseDto | ValidateDataQualityResponseDto,
  ): Promise<void> {
    await this.cache.set(key, value);
  }

  async get<T>(key: string): Promise<T | undefined> {
    return this.cache.get<T>(key);
  }
}
