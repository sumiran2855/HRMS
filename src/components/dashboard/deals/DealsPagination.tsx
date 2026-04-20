import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DEALS_DATA } from "@/constants/deals"

interface DealsPaginationProps {
  totalPages: number
  safePage: number
  startIndex: number
  endIndex: number
  filteredCount: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export function DealsPagination({
  totalPages,
  safePage,
  startIndex,
  endIndex,
  filteredCount,
  setCurrentPage,
}: DealsPaginationProps) {
  if (totalPages <= 1) return null

  return (
    <Card className="border border-slate-200 shadow-sm rounded-xl">
      <CardContent className="p-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Info */}
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-700">{startIndex + 1}</span>
            {" "}–{" "}
            <span className="font-medium text-slate-700">
              {Math.min(endIndex, filteredCount)}
            </span>
            {" "}of{" "}
            <span className="font-medium text-slate-700">{filteredCount}</span>
            {" "}entries
            {filteredCount !== DEALS_DATA.length && (
              <span className="text-slate-400"> (filtered from {DEALS_DATA.length} total)</span>
            )}
          </p>

          {/* Pages */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={safePage === 1}
              className="h-8 px-2.5 text-xs gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 text-xs cursor-pointer ${
                    safePage === page
                      ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                      : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
                  }`}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={safePage === totalPages}
              className="h-8 px-2.5 text-xs gap-1 cursor-pointer"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
