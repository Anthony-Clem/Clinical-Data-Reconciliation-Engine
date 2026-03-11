import { Controller, Post, UseGuards } from "@nestjs/common";
import { ReconcileService } from "./reconcile.service";
import { ApiKeyGuard } from "@/common/guards/api-key.guard";

@UseGuards(ApiKeyGuard)
@Controller("reconcile")
export class ReconcileController {
  constructor(private readonly reconcileService: ReconcileService) {}

  @Post("medication")
  async reconcileMedication() {}
}
