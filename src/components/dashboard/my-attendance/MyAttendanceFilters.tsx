import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import {
  MY_ATTENDANCE_TABS,
  MY_ATTENDANCE_STATUS_OPTIONS,
} from "@/constants/attendance";
import type { MyAttendanceTab } from "@/types/attendance.types";

interface MyAttendanceFiltersProps {
  activeTab: MyAttendanceTab;
  onTabChange: (tab: MyAttendanceTab) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

export function MyAttendanceFilters({
  activeTab,
  onTabChange,
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
}: MyAttendanceFiltersProps) {
  return (
    <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-slate-100">
        {MY_ATTENDANCE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 py-4 px-5 flex items-center justify-center gap-2 border-b-2 text-sm font-semibold transition-colors cursor-pointer bg-transparent ${
                isActive
                  ? "text-blue-600 border-blue-500"
                  : "text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              <Icon className="w-[18px] h-[18px]" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-500">Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
          >
            {MY_ATTENDANCE_STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search by notes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-full sm:w-64 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
