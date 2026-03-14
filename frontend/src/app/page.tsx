import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">
            Clinical Data
            <br />
            Reconciliation Engine
          </h1>

          <p className="text-muted-foreground text-lg">
            Compare medication data from multiple sources and validate clinical
            data quality with AI-assisted reconciliation.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/reconcile-medication"
            className={buttonVariants({
              size: "lg",
              className: "w-full sm:w-auto",
            })}
          >
            Reconcile Medication
          </Link>

          <Link
            href="/validate-data-quality"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "w-full sm:w-auto",
            })}
          >
            Validate Data Quality
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
