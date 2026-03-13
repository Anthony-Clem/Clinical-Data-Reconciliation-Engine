import { Module } from "@nestjs/common";
import { CacheService } from "./cache.service";
import { GeminiService } from "./gemini.service";

// this is nessesary for the cache service to work. caching will not work with this
// gemini was only added to clean up utlis
@Module({
  providers: [CacheService, GeminiService],
  exports: [CacheService, GeminiService],
})
export class UtilsModule {}
