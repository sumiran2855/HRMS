import { getStatusConfig } from "@/constants/attendance";
import { formatTime, formatOvertime } from "@/utils/formatters";
import type { Attendance } from "@/types/attendance.types";

interface RecentAttendanceProps {
  records: Attendance[];
}

export function RecentAttendance({ records }: RecentAttendanceProps) {
  const recentRecords = records.slice(0, 7);

  return (
    <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            Recent Attendance (Last 7 Days)
          </h3>
        </div>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {recentRecords.map((record, index) => {
          const config = getStatusConfig(record.status);
          const Icon = config.icon;

          return (
            <div
              key={record._id}
              className={`flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-blue-50/50 ${
                index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
              } ${index < recentRecords.length - 1 ? "border-b border-slate-100" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl ${config.bgColor} flex items-center justify-center`}
                >
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 leading-tight">
                    {record.date}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {record.remarks || "No remarks"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[13px] font-semibold text-slate-800">
                  {formatTime(record.checkInTime)}
                </p>
                <p className="text-[11px] text-slate-400">
                  {formatTime(record.checkOutTime)}
                </p>
                {record.overtime && record.overtime > 0 && (
                  <p className="text-[11px] text-blue-500 font-semibold">
                    +{formatOvertime(record.overtime)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
