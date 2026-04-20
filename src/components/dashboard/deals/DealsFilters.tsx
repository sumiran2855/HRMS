import { Input } from "@/components/ui/Input"
import { Search } from "lucide-react"
import { STAGE_CONFIG, SOURCE_OPTIONS, ENTRIES_OPTIONS } from "@/constants/deals"

interface DealsFiltersProps {
  entriesPerPage: number
  setEntriesPerPage: (val: number) => void
  selectedStage: string
  selectedSource: string
  searchTerm: string
  setCurrentPage: (page: number) => void
  updateFilter: (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
  setSelectedStage: (val: string) => void
  setSelectedSource: (val: string) => void
  setSearchTerm: (val: string) => void
}

const selectCls =
  "h-9 rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm text-slate-800 " +
  "shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 appearance-none cursor-pointer"

export function DealsFilters({
  entriesPerPage,
  setEntriesPerPage,
  selectedStage,
  selectedSource,
  searchTerm,
  setCurrentPage,
  updateFilter,
  setSelectedStage,
  setSelectedSource,
  setSearchTerm,
}: DealsFiltersProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      {/* Left: selects */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Entries */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Show</span>
          <select
            value={entriesPerPage}
            onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1) }}
            className={selectCls + " pr-6"}
          >
            {ENTRIES_OPTIONS.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* Stage */}
        <select value={selectedStage} onChange={updateFilter(setSelectedStage)} className={selectCls + " pr-6"}>
          <option>All Stages</option>
          {Object.keys(STAGE_CONFIG).map(s => (
            <option key={s} value={s}>{STAGE_CONFIG[s].label}</option>
          ))}
        </select>

        {/* Source */}
        <select value={selectedSource} onChange={updateFilter(setSelectedSource)} className={selectCls + " pr-6"}>
          {SOURCE_OPTIONS.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Right: search */}
      <div className="relative w-full lg:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
        <Input
          placeholder="Search deal, company, contact…"
          value={searchTerm}
          onChange={updateFilter(setSearchTerm)}
          className="pl-9 h-9 text-sm w-full rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
        />
      </div>
    </div>
  )
}
