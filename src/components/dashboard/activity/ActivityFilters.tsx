import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/Button"
import {
  ACTIVITY_TYPES,
  ACTIVITY_CATEGORIES,
  ACTIVITY_STATUSES,
  ACTIVITY_PRIORITIES,
  ACTIVITY_STATUS_LABELS,
} from "@/constants/activity"

interface ActivityFiltersProps {
  searchTitle: string
  setSearchTitle: (value: string) => void
  searchId: string
  setSearchId: (value: string) => void
  selectedType: string
  setSelectedType: (value: string) => void
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  selectedStatus: string
  setSelectedStatus: (value: string) => void
  selectedPriority: string
  setSelectedPriority: (value: string) => void
}

const inputClass =
  "w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 text-sm"

const selectClass =
  "w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 appearance-none bg-white text-sm cursor-pointer"

export function ActivityFilters({
  searchTitle,
  setSearchTitle,
  searchId,
  setSearchId,
  selectedType,
  setSelectedType,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  selectedPriority,
  setSelectedPriority,
}: ActivityFiltersProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search title..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Activity ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className={inputClass}
          />
        </div>

        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className={selectClass}>
          {ACTIVITY_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className={selectClass}>
          {ACTIVITY_CATEGORIES.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className={selectClass}>
          {ACTIVITY_STATUSES.map((status) => (
            <option key={status} value={status}>
              {ACTIVITY_STATUS_LABELS[status] ?? status}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <select value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)} className={selectClass}>
            {ACTIVITY_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority === "All Priority" ? priority : priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </select>
          <Button className="h-10 px-3 bg-indigo-600 hover:bg-indigo-700 text-white" aria-label="Search activities">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
