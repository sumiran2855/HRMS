import { Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/Button"
import {
  TERMINATION_DEPARTMENTS,
  TERMINATION_STATUS_OPTIONS,
  TERMINATION_TYPE_OPTIONS,
} from "@/constants/termination"

interface TerminationFiltersProps {
  searchQuery: string
  setSearchQuery: (value: string) => void
  selectedStatus: string
  setSelectedStatus: (value: string) => void
  selectedDepartment: string
  setSelectedDepartment: (value: string) => void
  selectedType: string
  setSelectedType: (value: string) => void
}

const inputClass =
  "w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 text-sm"

const selectClass =
  "w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 appearance-none bg-white text-sm cursor-pointer"

export function TerminationFilters({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  selectedDepartment,
  setSelectedDepartment,
  selectedType,
  setSelectedType,
}: TerminationFiltersProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by employee, ID, request ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={inputClass}
          />
        </div>

        <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className={selectClass}>
          {TERMINATION_DEPARTMENTS.map((department) => (
            <option key={department} value={department}>{department}</option>
          ))}
        </select>

        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className={selectClass}>
          <option value="all">All Types</option>
          {TERMINATION_TYPE_OPTIONS.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className={selectClass}>
            {TERMINATION_STATUS_OPTIONS.map((status) => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
          <Button className="h-10 px-3 bg-indigo-600 hover:bg-indigo-700 text-white" aria-label="Filter terminations">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
