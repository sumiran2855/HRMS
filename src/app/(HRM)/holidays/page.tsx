"use client"

import { Plus, Gift } from "lucide-react"
import HolidayModal from "@/components/dashboard/holidays/HolidayModal"
import { HolidayStatsCards } from "@/components/dashboard/holidays/HolidayStatsCards"
import { HolidayFilters } from "@/components/dashboard/holidays/HolidayFilters"
import { HolidayTable } from "@/components/dashboard/holidays/HolidayTable"
import { HolidaySidebar } from "@/components/dashboard/holidays/HolidaySidebar"
import { useHolidays } from "@/hooks/holiday/useHolidays"

export default function HolidaysPage() {
  const {
    searchTerm,
    setSearchTerm,
    selectedYear,
    setSelectedYear,
    showAddModal,
    setShowAddModal,
    editingHoliday,
    filteredHolidays,
    stats,
    upcomingHolidays,
    handleAddHoliday,
    handleEditHoliday,
    handleDeleteHoliday,
    openEditModal,
    closeModal,
  } = useHolidays()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="space-y-6 p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg shadow-primary/20">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Holiday Management
              </h1>
            </div>
            <p className="text-muted-foreground ml-11">Organize and track company holidays, public holidays, and time-off schedules</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all duration-200 font-medium"
          >
            <Plus className="h-5 w-5" />
            Add Holiday
          </button>
        </div>

        <HolidayStatsCards stats={stats} />

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3 space-y-6">
            <HolidayFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
            />

            <HolidayTable
              holidays={filteredHolidays}
              searchTerm={searchTerm}
              onEdit={openEditModal}
              onDelete={handleDeleteHoliday}
            />
          </div>

          <HolidaySidebar
            upcomingHolidays={upcomingHolidays}
            stats={stats}
          />
        </div>

        <HolidayModal
          isOpen={showAddModal || !!editingHoliday}
          onClose={closeModal}
          onSave={editingHoliday ? handleEditHoliday : handleAddHoliday}
          editingHoliday={editingHoliday}
        />
      </div>
    </div>
  )
}

