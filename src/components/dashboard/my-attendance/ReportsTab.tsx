import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

const REPORT_BUTTONS = [
  { label: "Monthly Report", variant: "outline" as const },
  { label: "Quarterly Report", variant: "outline" as const },
  { label: "Annual Report", variant: "primary" as const },
];

export function ReportsTab() {
  return (
    <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm p-16 text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
        <Download className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">
        My Attendance Reports
      </h3>
      <p className="text-sm text-slate-500 mb-6">
        Download your attendance reports for different time periods.
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        {REPORT_BUTTONS.map((btn) => (
          <Button
            key={btn.label}
            variant={btn.variant}
            className={`cursor-pointer rounded-xl ${
              btn.variant === "primary"
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25"
                : "hover:bg-slate-100"
            }`}
          >
            {btn.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
