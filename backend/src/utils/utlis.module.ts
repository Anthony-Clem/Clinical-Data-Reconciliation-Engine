import { Module } from "@nestjs/common";
import { CacheService } from "./cache.service";
import { GeminiService } from "./gemini.service";

@Module({
  providers: [CacheService, GeminiService],
  exports: [CacheService, GeminiService],
})
export class UtilsModule {}
