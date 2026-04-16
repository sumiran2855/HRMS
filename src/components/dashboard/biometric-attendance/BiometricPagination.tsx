import { ChevronLeft, ChevronRight } from "lucide-react";
import { BiometricPaginationInfo } from "@/types/attendance.types";

interface BiometricPaginationProps {
  pagination: BiometricPaginationInfo;
  onPageChange: (page: number) => void;
}

export function BiometricPagination({ pagination, onPageChange }: BiometricPaginationProps) {
  const { currentPage, totalPages, startIndex, endIndex, filteredCount, totalCount } = pagination;

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisible - 1);
      for (let i = start; i <= end; i++) pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="text-sm text-slate-600">
        Showing {startIndex + 1} to {Math.min(endIndex, filteredCount)} of {filteredCount} entries
        {filteredCount !== totalCount && (
          <span> (filtered from {totalCount} total entries)</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-700 text-foreground rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        <div className="flex items-center gap-1">
          {getVisiblePages().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 rounded-lg transition-colors ${
                currentPage === page
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="inline-flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-700 text-foreground rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
