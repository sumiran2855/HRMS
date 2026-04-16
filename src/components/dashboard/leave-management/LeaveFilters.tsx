"use client"

import { Search } from "lucide-react"
import { STATUS_FILTER_OPTIONS } from "@/constants/leave-management"

interface LeaveFiltersProps {
  search: string
  setSearch: (s: string) => void
  statusFilter: string
  setStatusFilter: (s: string) => void
}

export default function LeaveFilters({ search, setSearch, statusFilter, setStatusFilter }: LeaveFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-slate-200/50 dark:border-slate-800">
      <div className="flex-1 min-w-[200px] relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 rounded-xl border-[1.5px] border-slate-200 dark:border-slate-700 pl-9 pr-3 text-sm text-foreground bg-slate-50/50 dark:bg-slate-800/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {STATUS_FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setStatusFilter(opt.value)}
            className={`px-3.5 h-10 rounded-xl text-sm font-semibold border-[1.5px] transition-all duration-200
              ${statusFilter === opt.value
                ? "border-primary bg-primary/10 text-primary dark:bg-primary/20"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-muted-foreground hover:border-primary/50 hover:text-primary/80"
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
