import { MONTHLY_SUMMARY_ROWS } from "@/constants/attendance";
import { formatOvertime } from "@/utils/formatters";
import type { MyAttendanceStats } from "@/types/attendance.types";

interface MonthlySummaryProps {
  stats: MyAttendanceStats;
}

export function MonthlySummary({ stats }: MonthlySummaryProps) {
  return (
    <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            Monthly Summary
          </h3>
        </div>
      </div>
      <div className="p-5">
        <div className="flex flex-col gap-3">
          {MONTHLY_SUMMARY_ROWS.map((row) => {
            const Icon = row.icon;
            const value = row.isOvertime
              ? formatOvertime(stats[row.key] as number)
              : String(stats[row.key as keyof MyAttendanceStats]);

            return (
              <div
                key={row.key}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl ${row.bg} transition-all hover:shadow-sm`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/60 flex items-center justify-center shadow-sm">
                    <Icon className={`w-[18px] h-[18px] ${row.color}`} />
                  </div>
                  <span className={`text-sm font-semibold ${row.color}`}>
                    {row.label}
                  </span>
                </div>
                <span className={`text-lg font-bold ${row.color}`}>{value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
