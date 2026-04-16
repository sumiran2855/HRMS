"use client"

import { Fingerprint, Download, Filter, Loader2 } from "lucide-react"
import BiometricAttendanceModal from "@/components/dashboard/biometric-attendance/BiometricAttendanceModal"
import AdvancedFilterModal from "@/components/dashboard/biometric-attendance/AdvancedFilterModal"
import { BiometricStatsCards } from "@/components/dashboard/biometric-attendance/BiometricStatsCards"
import { BiometricFilters } from "@/components/dashboard/biometric-attendance/BiometricFilters"
import { BiometricTable } from "@/components/dashboard/biometric-attendance/BiometricTable"
import { BiometricPagination } from "@/components/dashboard/biometric-attendance/BiometricPagination"
import { useBiometricAttendance } from "@/hooks/attendance/useBiometricAttendance"

export default function BiometricAttendancePage() {
  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    entriesPerPage,
    setEntriesPerPage,
    selectedDate,
    setSelectedDate,
    selectedStatus,
    setSelectedStatus,
    isModalOpen,
    modalMode,
    selectedAttendance,
    isAdvancedFilterOpen,
    setIsAdvancedFilterOpen,
    loading,
    error,
    paginatedData,
    stats,
    pagination,
    handleAction,
    handleDelete,
    handleSaveAttendance,
    handleDeleteAttendance,
    closeModal,
    handleApplyAdvancedFilters,
    handleResetAdvancedFilters,
  } = useBiometricAttendance()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-8 flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="text-slate-600 font-medium">Loading biometric attendance data...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-red-50 border border-red-200/60 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="space-y-6 p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg shadow-primary/20">
                <Fingerprint className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Biometric Attendance
              </h1>
            </div>
            <p className="text-muted-foreground ml-11">Monitor and manage employee biometric attendance with real-time tracking</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 text-foreground rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 font-medium">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button
              onClick={() => setIsAdvancedFilterOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all duration-200 font-medium"
            >
              <Filter className="h-4 w-4" />
              Advanced Filter
            </button>
          </div>
        </div>

        <BiometricStatsCards stats={stats} />

        <BiometricFilters
          searchTerm={searchTerm}
          onSearchChange={(val) => { setSearchTerm(val); setCurrentPage(1) }}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          selectedStatus={selectedStatus}
          onStatusChange={(val) => { setSelectedStatus(val); setCurrentPage(1) }}
          entriesPerPage={entriesPerPage}
          onEntriesChange={(val) => { setEntriesPerPage(val); setCurrentPage(1) }}
        />

        <BiometricTable
          data={paginatedData}
          searchTerm={searchTerm}
          selectedStatus={selectedStatus}
          onAction={handleAction}
          onDelete={handleDelete}
        />

        <BiometricPagination
          pagination={pagination}
          onPageChange={setCurrentPage}
        />

        <BiometricAttendanceModal
          isOpen={isModalOpen}
          onClose={closeModal}
          mode={modalMode}
          attendance={selectedAttendance}
          onSave={handleSaveAttendance}
          onDelete={handleDeleteAttendance}
        />

        <AdvancedFilterModal
          isOpen={isAdvancedFilterOpen}
          onClose={() => setIsAdvancedFilterOpen(false)}
          onApply={handleApplyAdvancedFilters}
          onReset={handleResetAdvancedFilters}
        />
      </div>
    </div>
  )
}
