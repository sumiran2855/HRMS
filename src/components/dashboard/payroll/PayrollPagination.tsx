import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PayrollPaginationProps {
  totalPages: number
  currentPage: number
  rowsPerPage: number
  setRowsPerPage: (n: number) => void
  goToPage: (page: number) => void
  filteredCount: number
  totalCount: number
}

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50]

function getPageRange(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | "...")[] = []
  if (current <= 4) {
    pages.push(1, 2, 3, 4, 5, "...", total)
  } else if (current >= total - 3) {
    pages.push(1, "...", total - 4, total - 3, total - 2, total - 1, total)
  } else {
    pages.push(1, "...", current - 1, current, current + 1, "...", total)
  }
  return pages
}

export function PayrollPagination({
  totalPages,
  currentPage,
  rowsPerPage,
  setRowsPerPage,
  goToPage,
  filteredCount,
  totalCount,
}: PayrollPaginationProps) {
  if (filteredCount === 0) return null

  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = Math.min(currentPage * rowsPerPage, filteredCount)

  return (
    <Card className="border border-slate-200 shadow-sm rounded-xl">
      <CardContent className="p-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Left: result info + rows-per-page */}
          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-700">{filteredCount === 0 ? 0 : startIndex + 1}</span>
              {" "}–{" "}
              <span className="font-medium text-slate-700">{endIndex}</span>
              {" "}of{" "}
              <span className="font-medium text-slate-700">{filteredCount}</span>
              {" "}entries
              {filteredCount !== totalCount && (
                <span className="text-slate-400"> (filtered from {totalCount} total)</span>
              )}
            </p>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500">Rows:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-700 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/10 cursor-pointer"
              >
                {PAGE_SIZE_OPTIONS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Right: page buttons */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 px-2.5 text-xs gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </Button>

            <div className="flex items-center gap-1">
              {getPageRange(currentPage, totalPages).map((page, idx) =>
                page === "..." ? (
                  <span key={`ellipsis-${idx}`} className="h-8 w-8 flex items-center justify-center text-xs text-slate-400">…</span>
                ) : (
                  <Button
                    key={page}
                    size="sm"
                    onClick={() => goToPage(page)}
                    className={`h-8 w-8 text-xs cursor-pointer ${
                      currentPage === page
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600"
                        : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 px-2.5 text-xs gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
