import { Search, X } from "lucide-react";
import { BIOMETRIC_STATUS_OPTIONS, ENTRIES_PER_PAGE_OPTIONS } from "@/constants/attendance";

interface BiometricFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedDate: string;
  onDateChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  entriesPerPage: number;
  onEntriesChange: (value: number) => void;
}

export function BiometricFilters({
  searchTerm,
  onSearchChange,
  selectedDate,
  onDateChange,
  selectedStatus,
  onStatusChange,
  entriesPerPage,
  onEntriesChange,
}: BiometricFiltersProps) {
  return (
    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-4 border border-slate-200/50 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by employee ID, name, or department..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-foreground placeholder:text-muted-foreground/60"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-foreground cursor-pointer"
          />
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-foreground cursor-pointer"
          >
            {BIOMETRIC_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={entriesPerPage}
            onChange={(e) => onEntriesChange(Number(e.target.value))}
            className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-foreground cursor-pointer"
          >
            {ENTRIES_PER_PAGE_OPTIONS.map((value) => (
              <option key={value} value={value}>
                {value} entries
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
