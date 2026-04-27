import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { MEETING_PAGE_SIZE_OPTIONS } from "@/constants/meeting"

interface MeetingPaginationProps {
  totalPages: number
  currentPage: number
  rowsPerPage: number
  setRowsPerPage: (value: number) => void
  goToPage: (page: number) => void
  filteredCount: number
}

export function MeetingPagination({
  totalPages,
  currentPage,
  rowsPerPage,
  setRowsPerPage,
  goToPage,
  filteredCount,
}: MeetingPaginationProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-600">
        Showing <span className="font-semibold text-slate-900">{filteredCount}</span> meetings
      </p>

      <div className="flex items-center gap-3">
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus-visible:border-sky-500"
        >
          {MEETING_PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-2 cursor-pointer"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm text-slate-600 px-2">
            {currentPage} / {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            className="h-9 px-2 cursor-pointer"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
