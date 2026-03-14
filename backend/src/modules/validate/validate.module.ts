import { Prompts } from "../../common/constants/prompts.constant";
import { UtilsModule } from "../../utils/utlis.module";
import { Module } from "@nestjs/common";
import { ValidateController } from "./validate.controller";
import { ValidateService } from "./validate.service";

@Module({
  imports: [UtilsModule],
  controllers: [ValidateController],
  providers: [ValidateService, Prompts],
})
export class ValidateModule {}
