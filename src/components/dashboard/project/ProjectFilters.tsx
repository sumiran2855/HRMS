import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { PROJECT_STATUSES, PROJECT_PRIORITIES, PROJECT_CLIENTS, PROJECT_STATUS_LABELS } from "@/constants/project"

interface ProjectFiltersProps {
  searchName: string
  setSearchName: (v: string) => void
  searchId: string
  setSearchId: (v: string) => void
  selectedStatus: string
  setSelectedStatus: (v: string) => void
  selectedPriority: string
  setSelectedPriority: (v: string) => void
  selectedClient: string
  setSelectedClient: (v: string) => void
}

const selectClass =
  "w-full px-3 py-2 pl-10 border border-slate-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 appearance-none bg-white text-sm cursor-pointer"

const inputClass =
  "w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 text-sm"

export function ProjectFilters({
  searchName, setSearchName,
  searchId, setSearchId,
  selectedStatus, setSelectedStatus,
  selectedPriority, setSelectedPriority,
  selectedClient, setSelectedClient,
}: ProjectFiltersProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by project name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className={selectClass}>
            {PROJECT_STATUSES.map((s) => (
              <option key={s} value={s}>{s === "All Status" ? "All Status" : PROJECT_STATUS_LABELS[s]}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
          <select value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)} className={selectClass}>
            {PROJECT_PRIORITIES.map((p) => (
              <option key={p} value={p}>{p === "All Priority" ? "All Priorities" : p.charAt(0).toUpperCase() + p.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
          <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} className={selectClass}>
            {PROJECT_CLIENTS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
          <Search className="w-4 h-4" />
          Search
        </Button>
      </div>
    </div>
  )
}
