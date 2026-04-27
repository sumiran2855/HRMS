import { RotateCcw, Search } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { MEETING_STATUS_OPTIONS, MEETING_TYPE_OPTIONS } from "@/constants/meeting"
import { MeetingStatus, MeetingType } from "@/types/meeting.types"

interface MeetingFiltersProps {
  searchQuery: string
  setSearchQuery: (value: string) => void
  selectedStatus: "All" | MeetingStatus
  setSelectedStatus: (value: "All" | MeetingStatus) => void
  selectedType: "All" | MeetingType
  setSelectedType: (value: "All" | MeetingType) => void
  clearFilters: () => void
}

const selectClass =
  "w-full h-12 rounded-xl border-2 border-slate-200 bg-white px-4 text-sm text-slate-800 shadow-sm outline-none transition-all hover:border-slate-300 focus-visible:border-sky-500 focus-visible:ring-4 focus-visible:ring-sky-500/10"

export function MeetingFilters({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  selectedType,
  setSelectedType,
  clearFilters,
}: MeetingFiltersProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="relative lg:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, host, client, project or meeting ID"
            className="w-full h-12 rounded-xl border-2 border-slate-200 bg-white pl-9 pr-4 text-sm text-slate-900 shadow-sm outline-none transition-all hover:border-slate-300 focus-visible:border-sky-500 focus-visible:ring-4 focus-visible:ring-sky-500/10"
          />
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as "All" | MeetingStatus)}
          className={selectClass}
        >
          {MEETING_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status === "All" ? "All Status" : status}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as "All" | MeetingType)}
            className={selectClass}
          >
            {MEETING_TYPE_OPTIONS.map((type) => (
              <option key={type} value={type}>
                {type === "All" ? "All Types" : type}
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            className="h-12 px-3 border-slate-200 cursor-pointer"
            onClick={clearFilters}
            title="Reset filters"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
