import { ApiKeyGuard } from "@/common/guards/api-key.guard";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ValidateDataQualityRequestDto } from "./dto/validate-data-quality.dto";
import { ValidateService } from "./validate.service";

@UseGuards(ApiKeyGuard)
@Controller("validate")
export class ValidateController {
  constructor(private readonly validateService: ValidateService) {}

  @Post("data-quality")
  async validateDataQuality(@Body() dto: ValidateDataQualityRequestDto) {
    return this.validateService.validateDataQuality(dto);
  }
}
