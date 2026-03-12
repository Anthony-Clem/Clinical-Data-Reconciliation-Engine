import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { ReconcileModule } from "./modules/reconcile/reconcile.module";
import { ValidateModule } from "./modules/validate/validate.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 6000, limit: 20 }]),
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
