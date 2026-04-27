import { TICKET_PAGE_SIZE_OPTIONS } from "@/constants/ticket"

interface TicketPaginationProps {
  totalPages: number
  currentPage: number
  rowsPerPage: number
  setRowsPerPage: (value: number) => void
  goToPage: (page: number) => void
  filteredCount: number
}

export function TicketPagination({
  totalPages,
  currentPage,
  rowsPerPage,
  setRowsPerPage,
  goToPage,
  filteredCount,
}: TicketPaginationProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <p className="text-sm text-slate-600">Showing {filteredCount} tickets</p>

      <div className="flex items-center gap-2">
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm"
        >
          {TICKET_PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>{size} / page</option>
          ))}
        </select>

        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>

        <span className="text-sm text-slate-600">{currentPage} / {totalPages}</span>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  )
}
