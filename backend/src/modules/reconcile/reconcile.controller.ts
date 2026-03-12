import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ReconcileService } from "./reconcile.service";
import { ApiKeyGuard } from "@/common/guards/api-key.guard";
import { ReconcileMedicationRequestDto } from "./dto/reconcile-medication.dto";

@UseGuards(ApiKeyGuard)
@Controller("reconcile")
export class ReconcileController {
  constructor(private readonly reconcileService: ReconcileService) {}

  @Post("medication")
  async reconcileMedication(@Body() dto: ReconcileMedicationRequestDto) {
    return this.reconcileService.reconcileMedication(dto);
  }
}
