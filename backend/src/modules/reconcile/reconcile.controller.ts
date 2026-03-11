import { Controller, Post } from "@nestjs/common";
import { ReconcileService } from "./reconcile.service";

@Controller("reconcile")
export class ReconcileController {
  constructor(private readonly reconcileService: ReconcileService) {}

  @Post("medication")
  async reconcileMedication() {}
}
