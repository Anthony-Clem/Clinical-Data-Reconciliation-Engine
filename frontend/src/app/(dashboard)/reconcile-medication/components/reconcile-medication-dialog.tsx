import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReconcileMedicationResponse } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Cancel01Icon, Tick01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Dispatch, SetStateAction } from "react";

const ReconcileMedicationDialog = ({
  open,
  setOpen,
  result,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  result: ReconcileMedicationResponse | null;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Reconciliation Result</DialogTitle>
          <DialogDescription>
            Review the reconciled medication and recommended actions below.
          </DialogDescription>
        </DialogHeader>

        {result && (
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-700">Safety Check</span>
              <Badge
                variant={
                  result.clinical_safety_check === "PASSED"
                    ? "default"
                    : "destructive"
                }
              >
                {result.clinical_safety_check}
              </Badge>
            </div>

            <div className="space-y-1">
              <p className="font-medium text-slate-700">
                Reconciled Medication
              </p>
              <p className="text-slate-600">{result.reconciled_medication}</p>
            </div>

            <div className="space-y-1">
              <p className="font-medium text-slate-700">
                Confidence Score:
                <span
                  className={cn(
                    "ml-2 font-bold",
                    result.confidence_score * 100 > 80
                      ? "text-green-700"
                      : result.confidence_score * 100 > 50
                        ? "text-yellow-500"
                        : "text-red-500",
                  )}
                >
                  {(result.confidence_score * 100).toFixed(0)}%
                </span>
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-medium text-slate-700">Reasoning</p>
              <p className="text-slate-600 leading-relaxed">
                {result.reasoning}
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-medium text-slate-700">Recommended Actions</p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                {result.recommended_actions.map((action, i) => (
                  <li key={i}>{action}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <DialogFooter className="flex gap-2 sm:justify-start">
          <Button
            variant="outline"
            className="flex-1 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
            onClick={() => {
              // handle accept
              setOpen(false);
            }}
          >
            <HugeiconsIcon icon={Tick01Icon} size={16} />
            Accept
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={() => {
              // handle reject
              setOpen(false);
            }}
          >
            <HugeiconsIcon icon={Cancel01Icon} size={16} />
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReconcileMedicationDialog;
