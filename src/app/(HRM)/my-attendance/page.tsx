"use client"

import { Loader2, CalendarDays } from "lucide-react"
import { useMyAttendance } from "@/hooks/attendance/useMyAttendance"
import { MonthSelector } from "@/components/dashboard/my-attendance/MonthSelector"
import { MyAttendanceStatsCards } from "@/components/dashboard/my-attendance/MyAttendanceStatsCards"
import { MyAttendanceFilters } from "@/components/dashboard/my-attendance/MyAttendanceFilters"
import { RecentAttendance } from "@/components/dashboard/my-attendance/RecentAttendance"
import { MonthlySummary } from "@/components/dashboard/my-attendance/MonthlySummary"
import { DetailedRecords } from "@/components/dashboard/my-attendance/DetailedRecords"
import { ReportsTab } from "@/components/dashboard/my-attendance/ReportsTab"

export default function MyAttendancePage() {
  const {
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    filteredAttendance,
    loading,
    error,
    computed,
    monthYear,
    goToPreviousMonth,
    goToNextMonth,
  } = useMyAttendance()

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
            <h1 className="text-2xl font-bold text-slate-900">My Attendance</h1>
          </div>
          <p className="text-slate-500 text-sm ml-12">Track your monthly attendance patterns and work hours</p>
        </div>
        <MonthSelector
          monthYear={monthYear}
          onPreviousMonth={goToPreviousMonth}
          onNextMonth={goToNextMonth}
        />
      </div>

      {/* Stats */}
      <MyAttendanceStatsCards computed={computed} />

      {/* Filters & Tabs */}
      <MyAttendanceFilters
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <RecentAttendance records={filteredAttendance} />
            <MonthlySummary stats={computed.stats} />
          </div>
        )}

        {activeTab === "detailed" && (
          <DetailedRecords
            records={filteredAttendance}
            searchTerm={searchTerm}
            selectedStatus={selectedStatus}
          />
        )}

        {activeTab === "reports" && <ReportsTab />}
      </div>
    </div>
  )
}
