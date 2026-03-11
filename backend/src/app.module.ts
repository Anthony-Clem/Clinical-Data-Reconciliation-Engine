import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ReconcileModule } from "./modules/reconcile/reconcile.module";
import { ValidateModule } from "./modules/validate/validate.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ReconcileModule,
    ValidateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
