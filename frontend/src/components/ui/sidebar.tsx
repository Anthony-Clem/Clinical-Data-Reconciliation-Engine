import { Database, Pill } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 border-r bg-slate-50 flex flex-col h-full">
      <div className="px-5 py-5 border-b">
        <p className="text-xs uppercase tracking-wide text-slate-500 font-medium">
          Clinical System
        </p>

        <h1 className="text-sm font-semibold text-slate-900 mt-1 leading-snug">
          Data Reconciliation Engine
        </h1>
      </div>

      <nav className="flex flex-col px-3 py-4 gap-1">
        <p className="text-xs uppercase text-slate-400 font-semibold px-3 mb-2">
          Tools
        </p>

        <Link
          href="/reconcile-medication"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-200/60 transition"
        >
          <HugeiconsIcon icon={Pill} size={18} />
          Reconcile Medication
        </Link>

        <Link
          href="/validate-data-quality"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-200/60 transition"
        >
          <HugeiconsIcon icon={Database} size={18} />
          Validate Data Quality
        </Link>
      </nav>
      <div className="mt-auto px-5 py-4 border-t text-xs text-slate-400">
        v0.1 • Internal Tool
      </div>
    </aside>
  );
};

export default Sidebar;
