import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReconcileMedicationForm from "./components/reconcile-medication-form";

const ReconcileMedicationPage = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Reconcile Medication</CardTitle>
        <CardDescription>
          Compares medication records from multiple clinical sources, considers
          patient context (conditions, labs, recency, and reliability), and
          determines the most accurate and clinically appropriate medication
          regimen.
        </CardDescription>
      </CardHeader>
      <ReconcileMedicationForm />
    </Card>
  );
};
export default ReconcileMedicationPage;
