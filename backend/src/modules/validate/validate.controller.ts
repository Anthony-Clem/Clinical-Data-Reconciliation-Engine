import { ApiKeyGuard } from "../../common/guards/api-key.guard";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import {
  ValidateDataQualityRequestDto,
  ValidateDataQualityResponseDto,
} from "./dto/validate-data-quality.dto";
import { ValidateService } from "./validate.service";

// protecting the route with the api key guard
@UseGuards(ApiKeyGuard)
@Controller("validate")
export class ValidateController {
  constructor(private readonly validateService: ValidateService) {}

  @Post("data-quality")
  async validateDataQuality(
    // extracting the body and validating it against the dto
    @Body() dto: ValidateDataQualityRequestDto,
  ): Promise<ValidateDataQualityResponseDto> {
    // calling and passing the dto/body to the service
    return this.validateService.validateDataQuality(dto);
  }
}
