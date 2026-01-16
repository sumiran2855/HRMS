import { Button } from "@/components/ui/Button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  showItemCount?: boolean
  showPageNumbers?: boolean
  maxPageButtons?: number
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  showItemCount = true,
  showPageNumbers = true,
  maxPageButtons = 5,
  className = ""
}: PaginationProps) {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    if (totalPages <= maxPageButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const halfWindow = Math.floor(maxPageButtons / 2)
    let start = Math.max(1, currentPage - halfWindow)
    let end = Math.min(totalPages, start + maxPageButtons - 1)

    if (end - start + 1 < maxPageButtons) {
      start = Math.max(1, end - maxPageButtons + 1)
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const pageNumbers = getPageNumbers()
  const showFirstLast = totalPages > maxPageButtons

  if (totalPages <= 1) return null

  return (
    <div className={`flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30 ${className}`}>
      {showItemCount && (
        <div className="hidden sm:block">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">{startIndex + 1}</span>
            {" "}-{" "}
            <span className="font-medium text-foreground">{endIndex}</span>
            {" "}of{" "}
            <span className="font-medium text-foreground">{totalItems}</span>
          </p>
        </div>
      )}

      <div className={`flex items-center gap-2 ${!showItemCount ? 'mx-auto' : 'ml-auto'}`}>
        {showFirstLast && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="h-9 w-9 p-0 hidden md:inline-flex"
            title="First page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-9 w-9 p-0"
          title="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {showPageNumbers ? (
          <>
            {pageNumbers[0] > 1 && (
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 text-sm text-muted-foreground">
                ...
              </span>
            )}

            <div className="hidden sm:flex items-center gap-1">
              {pageNumbers.map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className={`h-9 min-w-9 px-3 ${currentPage === page
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : ""
                    }`}
                >
                  {page}
                </Button>
              ))}
            </div>

            {pageNumbers[pageNumbers.length - 1] < totalPages && (
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 text-sm text-muted-foreground">
                ...
              </span>
            )}

            <span className="inline-flex sm:hidden text-sm text-muted-foreground px-2">
              Page {currentPage} of {totalPages}
            </span>
          </>
        ) : (
          <span className="text-sm text-muted-foreground px-2">
            {currentPage} / {totalPages}
          </span>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-9 w-9 p-0"
          title="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {showFirstLast && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="h-9 w-9 p-0 hidden md:inline-flex"
            title="Last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}