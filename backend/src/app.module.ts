import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { ReconcileModule } from "./modules/reconcile/reconcile.module";
import { ValidateModule } from "./modules/validate/validate.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // max 20 requests every minute (prevent abuse)
    ThrottlerModule.forRoot([{ ttl: 6000, limit: 20 }]),
    // allow caching globally, save items in cache for 10 min, max 100 items in cache
    CacheModule.register({
      isGlobal: true,
      ttl: 600000,
      max: 100,
    }),
    ReconcileModule,
    ValidateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
