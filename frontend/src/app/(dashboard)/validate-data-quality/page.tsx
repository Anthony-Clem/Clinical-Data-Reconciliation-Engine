import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ValidateDataQualityForm from "./components/validate-data-quality-form";

const ValidateDataQualityPage = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Validate Data Quality</CardTitle>
        <CardDescription>
          Checks clinical records for completeness, accuracy, timeliness, and
          clinical plausibility, identifying potential data issues and producing
          an overall data quality score with a detailed breakdown and
          recommended corrections.
        </CardDescription>
      </CardHeader>
      <ValidateDataQualityForm />
    </Card>
  );
};

export default ValidateDataQualityPage;
