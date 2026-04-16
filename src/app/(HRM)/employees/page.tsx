"use client"

import { Users, Plus } from "lucide-react"
import { AddEmployeeModal } from "@/components/dashboard/employees/AddEmployeeModal"
import { EmployeeStatsCards } from "@/components/dashboard/employees/EmployeeStatsCards"
import { EmployeeSearchBar } from "@/components/dashboard/employees/EmployeeSearchBar"
import { EmployeeCard } from "@/components/dashboard/employees/EmployeeCard"
import { EmployeeListState } from "@/components/dashboard/employees/EmployeeListState"
import { useEmployeesPage } from "@/hooks/employee/useEmployeesPage"
import { DEFAULT_DESIGNATION } from "@/constants/employees"

export default function EmployeesPage() {
  const {
    filteredEmployees,
    filters,
    stats,
    loading,
    error,
    isModalOpen,
    setSearchName,
    setSearchId,
    setSelectedDesignation,
    setIsModalOpen,
    fetchEmployees,
  } = useEmployeesPage()

  const hasActiveFilters =
    !!filters.searchName || !!filters.searchId || filters.selectedDesignation !== DEFAULT_DESIGNATION

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="space-y-8 p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/25">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Employee Management
              </h1>
            </div>
            <p className="text-slate-500 ml-11">Manage and view all company employees</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all duration-200 font-medium"
          >
            <Plus className="h-5 w-5" />
            Add Employee
          </button>
        </div>

        <EmployeeStatsCards stats={stats} />

        <EmployeeSearchBar
          filters={filters}
          onSearchNameChange={setSearchName}
          onSearchIdChange={setSearchId}
          onDesignationChange={setSelectedDesignation}
        />

        {loading ? (
          <EmployeeListState type="loading" />
        ) : error ? (
          <EmployeeListState type="error" message={error} />
        ) : filteredEmployees.length === 0 ? (
          <EmployeeListState type="empty" hasActiveFilters={hasActiveFilters} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredEmployees.map((employee) => (
              <EmployeeCard key={employee._id} employee={employee} />
            ))}
          </div>
        )}

        <AddEmployeeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchEmployees}
        />
      </div>
    </div>
  )
}
