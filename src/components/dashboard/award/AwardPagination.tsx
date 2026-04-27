import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { AWARD_DATA, AWARD_PAGE_SIZE_OPTIONS } from "@/constants/award"

interface AwardPaginationProps {
  totalPages: number
  currentPage: number
  rowsPerPage: number
  setRowsPerPage: (value: number) => void
  goToPage: (page: number) => void
  filteredCount: number
}

export function AwardPagination({
  totalPages,
  currentPage,
  rowsPerPage,
  setRowsPerPage,
  goToPage,
  filteredCount,
}: AwardPaginationProps) {
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = Math.min(currentPage * rowsPerPage, filteredCount)

  return (
    <Card className="overflow-hidden rounded-[28px] border border-fuchsia-100 bg-gradient-to-r from-white via-rose-50 to-violet-50 shadow-[0_20px_60px_-45px_rgba(217,70,239,0.45)]">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-500">
              Showing <span className="font-medium text-slate-700">{filteredCount === 0 ? 0 : startIndex + 1}</span>
              {" "}– <span className="font-medium text-slate-700">{endIndex}</span>
              {" "}of <span className="font-medium text-slate-700">{filteredCount}</span> entries
              {filteredCount !== AWARD_DATA.length && (
                <span className="text-slate-400"> (filtered from {AWARD_DATA.length} total)</span>
              )}
            </p>
            <div className="flex items-center gap-1.5 rounded-full border border-white/80 bg-white/80 px-3 py-1.5 shadow-sm">
              <span className="text-xs text-slate-500">Rows:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="rounded-md border border-fuchsia-100 bg-white px-2 py-1 text-xs text-slate-700 focus:outline-none focus-visible:border-fuchsia-400 focus-visible:ring-2 focus-visible:ring-fuchsia-400/10 cursor-pointer"
              >
                {AWARD_PAGE_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-9 rounded-full border-fuchsia-100 bg-white px-3 text-xs gap-1 text-slate-700 shadow-sm cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <Button
                    key={page}
                    size="sm"
                    onClick={() => goToPage(page)}
                    className={`h-9 w-9 rounded-full text-xs cursor-pointer ${
                      currentPage === page
                        ? "border-fuchsia-500 bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white shadow-lg shadow-fuchsia-200/40"
                        : "border border-fuchsia-100 bg-white text-slate-700 hover:bg-fuchsia-50"
                    }`}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-9 rounded-full border-fuchsia-100 bg-white px-3 text-xs gap-1 text-slate-700 shadow-sm cursor-pointer"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
