import { Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/Button"
import {
  TICKET_CATEGORY_OPTIONS,
  TICKET_PRIORITY_OPTIONS,
  TICKET_STATUS_OPTIONS,
} from "@/constants/ticket"

interface TicketFiltersProps {
  searchQuery: string
  setSearchQuery: (value: string) => void
  selectedStatus: string
  setSelectedStatus: (value: string) => void
  selectedPriority: string
  setSelectedPriority: (value: string) => void
  selectedCategory: string
  setSelectedCategory: (value: string) => void
}

const inputClass =
  "w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 text-sm"

const selectClass =
  "w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 appearance-none bg-white text-sm cursor-pointer"

export function TicketFilters({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  selectedPriority,
  setSelectedPriority,
  selectedCategory,
  setSelectedCategory,
}: TicketFiltersProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by title, requester, ticket ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={inputClass}
          />
        </div>

        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className={selectClass}>
          {TICKET_CATEGORY_OPTIONS.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className={selectClass}>
          {TICKET_STATUS_OPTIONS.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <select value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)} className={selectClass}>
            {TICKET_PRIORITY_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
          <Button className="h-10 px-3 bg-indigo-600 hover:bg-indigo-700 text-white" aria-label="Filter tickets">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
