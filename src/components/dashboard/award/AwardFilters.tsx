import { Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { AWARD_DEPARTMENTS, AWARD_STATUS_OPTIONS, AWARD_TYPE_OPTIONS } from "@/constants/award"

interface AwardFiltersProps {
  searchQuery: string
  setSearchQuery: (value: string) => void
  selectedDepartment: string
  setSelectedDepartment: (value: string) => void
  selectedStatus: string
  setSelectedStatus: (value: string) => void
  selectedType: string
  setSelectedType: (value: string) => void
}

const inputClass =
  "w-full rounded-2xl border border-white/70 bg-white/85 pl-10 pr-3 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-fuchsia-200 focus-visible:ring-2 focus-visible:ring-fuchsia-400/40"

const selectClass =
  "w-full appearance-none rounded-2xl border border-white/70 bg-white/85 px-3 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-fuchsia-200 focus-visible:ring-2 focus-visible:ring-fuchsia-400/40 cursor-pointer"

export function AwardFilters({
  searchQuery,
  setSearchQuery,
  selectedDepartment,
  setSelectedDepartment,
  selectedStatus,
  setSelectedStatus,
  selectedType,
  setSelectedType,
}: AwardFiltersProps) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-fuchsia-100 bg-gradient-to-r from-rose-50 via-white to-violet-50 p-5 shadow-[0_20px_60px_-45px_rgba(217,70,239,0.45)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-700">Discover recognitions</p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900">Search nominations with a more expressive filter panel</h2>
        </div>
        <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-white/80 shadow-sm md:flex">
          <Filter className="h-5 w-5 text-fuchsia-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        <div className="relative xl:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-fuchsia-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by employee, award title, request ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={inputClass}
          />
        </div>

        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className={selectClass}>
          <option value="all">All Award Types</option>
          {AWARD_TYPE_OPTIONS.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className={selectClass}>
          {AWARD_DEPARTMENTS.map((department) => (
            <option key={department} value={department}>{department}</option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className={selectClass}>
            {AWARD_STATUS_OPTIONS.map((status) => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
          <Button className="h-[50px] rounded-2xl bg-slate-950 px-4 text-white shadow-lg shadow-fuchsia-200/30 hover:bg-slate-900" aria-label="Filter awards">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
