"use client"

import { Button } from "@/components/ui/Button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface AttendancePaginationProps {
  currentPage: number
  totalPages: number
  totalEntries: number
  entriesPerPage: number
  startIndex: number
  endIndex: number
  onPageChange: (page: number) => void
}

export function AttendancePagination({
  currentPage,
  totalPages,
  totalEntries,
  entriesPerPage,
  startIndex,
  endIndex,
  onPageChange
}: AttendancePaginationProps) {
  const getVisiblePages = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const start = Math.max(1, currentPage - 2)
      const end = Math.min(totalPages, start + maxVisiblePages - 1)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }
    
    return pages
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="text-sm text-slate-600">
        Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)} of {totalEntries} entries
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        
        <div className="flex gap-1">
          {getVisiblePages().map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "primary" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className={`cursor-pointer ${
                currentPage === page 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "hover:bg-slate-100"
              }`}
            >
              {page}
            </Button>
          ))}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="cursor-pointer"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
