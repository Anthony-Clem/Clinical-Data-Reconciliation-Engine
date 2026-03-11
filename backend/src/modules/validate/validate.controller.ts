import { Controller, UseGuards } from "@nestjs/common";
import { ValidateService } from "./validate.service";
import { ApiKeyGuard } from "@/common/guards/api-key.guard";

@UseGuards(ApiKeyGuard)
@Controller("validate")
export class ValidateController {
  constructor(private readonly validateService: ValidateService) {}
}
