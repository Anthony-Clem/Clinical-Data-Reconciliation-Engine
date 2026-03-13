import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ReconcileService } from "./reconcile.service";
import { ApiKeyGuard } from "@/common/guards/api-key.guard";
import {
  ReconcileMedicationRequestDto,
  ReconcileMedicationResponseDto,
} from "./dto/reconcile-medication.dto";

// protecting the route with the api key guard
@UseGuards(ApiKeyGuard)
@Controller("reconcile")
export class ReconcileController {
  constructor(private readonly reconcileService: ReconcileService) {}

  @Post("medication")
  async reconcileMedication(
    // extracting the body and validating it against the dto
    @Body() dto: ReconcileMedicationRequestDto,
  ): Promise<ReconcileMedicationResponseDto> {
    // calling and passing the dto/body to the service
    return this.reconcileService.reconcileMedication(dto);
  }
}
