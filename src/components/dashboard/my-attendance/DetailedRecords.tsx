import { Calendar } from "lucide-react";
import { getStatusConfig } from "@/constants/attendance";
import { formatTime, formatOvertime } from "@/utils/formatters";
import type { Attendance } from "@/types/attendance.types";

interface DetailedRecordsProps {
  records: Attendance[];
  searchTerm: string;
  selectedStatus: string;
}

const TABLE_HEADERS = [
  { label: "Date", align: "text-left" },
  { label: "Check In", align: "text-center" },
  { label: "Check Out", align: "text-center" },
  { label: "Status", align: "text-center" },
  { label: "Overtime", align: "text-center" },
  { label: "Notes", align: "text-left" },
] as const;

export function DetailedRecords({
  records,
  searchTerm,
  selectedStatus,
}: DetailedRecordsProps) {
  return (
    <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800/30">
              {TABLE_HEADERS.map((header) => (
                <th
                  key={header.label}
                  className={`px-5 py-4 ${header.align} text-xs font-semibold text-slate-700 uppercase tracking-wider border-b border-slate-200`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => {
              const config = getStatusConfig(record.status);
              const Icon = config.icon;

              return (
                <tr
                  key={record._id}
                  className={`group transition-colors ${
                    index % 2 === 0
                      ? "bg-white dark:bg-slate-900/20"
                      : "bg-slate-50/50 dark:bg-slate-800/10"
                  } hover:bg-blue-50/50 dark:hover:bg-blue-900/10`}
                >
                  <td className="px-5 py-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-slate-500" />
                      </div>
                      <span className="text-sm font-semibold text-slate-800">
                        {record.date}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-center border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-700">
                      {formatTime(record.checkInTime)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-700">
                      {formatTime(record.checkOutTime)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center border-b border-slate-100">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold ${config.bgColor} ${config.color}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {config.label}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center border-b border-slate-100">
                    <span
                      className={`text-sm font-semibold ${
                        record.overtime && record.overtime > 0
                          ? "text-blue-500"
                          : "text-slate-400"
                      }`}
                    >
                      {formatOvertime(record.overtime || 0)}
                    </span>
                  </td>
                  <td className="px-5 py-3 border-b border-slate-100">
                    <span className="text-sm text-slate-500">
                      {record.remarks || "-"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {records.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">
            No attendance records found
          </h3>
          <p className="text-sm text-slate-500">
            {searchTerm || selectedStatus !== "All Status"
              ? "Try adjusting your search or filter criteria"
              : "No attendance data available for the selected period"}
          </p>
        </div>
      )}
    </div>
  );
}
