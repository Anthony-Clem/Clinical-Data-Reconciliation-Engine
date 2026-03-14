import { Prompts } from "../../common/constants/prompts.constant";
import { UtilsModule } from "../../utils/utlis.module";
import { Module } from "@nestjs/common";
import { ReconcileController } from "./reconcile.controller";
import { ReconcileService } from "./reconcile.service";

@Module({
  imports: [UtilsModule],
  controllers: [ReconcileController],
  providers: [ReconcileService, Prompts],
})
export class ReconcileModule {}
