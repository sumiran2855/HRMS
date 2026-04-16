"use client"

import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Search, ChevronLeft, ChevronRight, Loader2, CalendarDays } from "lucide-react"
import { AttendanceLegend } from "@/components/dashboard/attendance/AttendanceLegend"
import { AdminAttendanceTable } from "@/components/dashboard/attendance/AdminAttendanceTable"
import { AttendancePagination } from "@/components/dashboard/attendance/AttendancePagination"
import { AttendanceStatsCards } from "@/components/dashboard/attendance/AttendanceStatsCards"
import { useAdminAttendance } from "@/hooks/attendance/useAdminAttendance"
import { ENTRIES_PER_PAGE_OPTIONS } from "@/constants/attendance"

export default function AdminAttendancePage() {
  const {
    loading,
    error,
    searchTerm,
    monthYear,
    daysInMonth,
    stats,
    pagination,
    paginatedData,
    entriesPerPage,
    navigateMonth,
    setCurrentPage,
    handleSearchChange,
    handleEntriesPerPageChange,
  } = useAdminAttendance()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          </div>
          <span className="text-sm font-medium">Loading attendance data...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-red-50 border border-red-200/60 rounded-2xl p-6 text-center max-w-sm">
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/25">
              <CalendarDays className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Attendance</h1>
          </div>
          <p className="text-slate-500 text-sm ml-12">Manage and track employee attendance records</p>
        </div>
        <div className="flex items-center gap-1 bg-white border border-slate-200/60 rounded-xl p-1 shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth("prev")}
            className="cursor-pointer rounded-lg hover:bg-slate-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="font-semibold text-slate-700 min-w-[150px] text-center text-sm">
            {monthYear}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth("next")}
            className="cursor-pointer rounded-lg hover:bg-slate-100"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <AttendanceStatsCards stats={stats} />

      {/* Legend */}
      <AttendanceLegend />

      {/* Table Card */}
      <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-500">Show</label>
            <select
              value={entriesPerPage}
              onChange={(e) => handleEntriesPerPageChange(Number(e.target.value))}
              className="h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              {ENTRIES_PER_PAGE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} entries
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search employee..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 w-full sm:w-64 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <AdminAttendanceTable data={paginatedData} daysInMonth={daysInMonth} />
      </div>

      {/* Pagination */}
      <AttendancePagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalEntries={pagination.totalEntries}
        entriesPerPage={pagination.entriesPerPage}
        startIndex={pagination.startIndex}
        endIndex={pagination.endIndex}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
