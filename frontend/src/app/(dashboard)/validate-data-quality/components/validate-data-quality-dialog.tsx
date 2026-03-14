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
import { ValidateDataQualityResponse } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Cancel01Icon, Tick01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Dispatch, SetStateAction } from "react";

const severityVariant = (severity: "low" | "medium" | "high") => {
  if (severity === "high") return "destructive";
  if (severity === "medium") return "outline";
  return "secondary";
};

const severityColor = (severity: "low" | "medium" | "high") => {
  if (severity === "high") return "text-red-600";
  if (severity === "medium") return "text-yellow-600";
  return "text-slate-500";
};

const ValidateDataQualityDialog = ({
  open,
  setOpen,
  result,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  result: ValidateDataQualityResponse | null;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Data Quality Result</DialogTitle>
          <DialogDescription>
            Review the data quality score, breakdown, and detected issues below.
          </DialogDescription>
        </DialogHeader>

        {result && (
          <div className="max-h-[60vh] overflow-y-auto space-y-4 text-sm pr-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-700">Overall Score</span>
              <span
                className={cn(
                  "text-lg font-bold",
                  result.overall_score >= 80
                    ? "text-green-600"
                    : result.overall_score >= 50
                      ? "text-yellow-500"
                      : "text-red-500",
                )}
              >
                {result.overall_score}
              </span>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-slate-700">Breakdown</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(result.breakdown).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-md border px-3 py-2"
                  >
                    <span className="capitalize text-slate-600">
                      {key.replace(/_/g, " ")}
                    </span>
                    <span
                      className={cn(
                        "font-semibold",
                        value >= 80
                          ? "text-green-600"
                          : value >= 50
                            ? "text-yellow-500"
                            : "text-red-500",
                      )}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {result.issues_detected.length > 0 && (
              <div className="space-y-2">
                <p className="font-medium text-slate-700">Issues Detected</p>
                <ul className="space-y-2">
                  {result.issues_detected.map((issue, i) => (
                    <li
                      key={i}
                      className="flex items-start justify-between gap-3 rounded-md border px-3 py-2"
                    >
                      <div className="space-y-0.5">
                        <p className="font-medium text-slate-700 capitalize">
                          {issue.field.replace(/[_.]/g, " ")}
                        </p>
                        <p
                          className={cn(
                            "text-xs",
                            severityColor(issue.severity),
                          )}
                        >
                          {issue.issue}
                        </p>
                      </div>
                      <Badge
                        variant={severityVariant(issue.severity)}
                        className="shrink-0 capitalize"
                      >
                        {issue.severity}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <DialogFooter className="flex gap-2 sm:justify-start">
          <Button
            variant="outline"
            className="flex-1 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
            onClick={() => setOpen(false)}
          >
            <HugeiconsIcon icon={Tick01Icon} size={16} />
            Accept
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={() => setOpen(false)}
          >
            <HugeiconsIcon icon={Cancel01Icon} size={16} />
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ValidateDataQualityDialog;
