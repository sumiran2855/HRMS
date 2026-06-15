"use client"

import { Button } from "@/components/ui/Button"
import { Download, UserPlus } from "lucide-react"
import { useHR } from "@/hooks/hr/useHR"
import { HR_TABS } from "@/constants/hr"
import { AddEmployeeModal } from "@/components/dashboard/employees/AddEmployeeModal"
import { EmployeeStatsCards } from "@/components/dashboard/employees/EmployeeStatsCards"
import { EmployeeSearchBar } from "@/components/dashboard/employees/EmployeeSearchBar"
import { EmployeeCard } from "@/components/dashboard/employees/EmployeeCard"
import { EmployeeListState } from "@/components/dashboard/employees/EmployeeListState"
import { useEmployeesPage } from "@/hooks/employee/useEmployeesPage"
import { DEFAULT_DESIGNATION } from "@/constants/employees"
import { DepartmentStatsCards } from "@/components/dashboard/departments/DepartmentStatsCards"
import { DepartmentFilters } from "@/components/dashboard/departments/DepartmentFilters"
import { DepartmentGrid } from "@/components/dashboard/departments/DepartmentGrid"
import DepartmentModal from "@/components/dashboard/departments/DepartmentModal"
import { useDepartments } from "@/hooks/department/useDepartments"
import {
  HRStatsCards,
  HRAttendance,
  HRPayroll,
} from "@/components/dashboard/hr"

export default function HRPage() {
  const {
    activeTab, setActiveTab,
    hrStats, formatCurrency,
  } = useHR()

  const {
    employees,
    filteredEmployees,
    filters,
    stats: employeeStats,
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
    !!filters.searchName ||
    !!filters.searchId ||
    filters.selectedDesignation !== DEFAULT_DESIGNATION

  const {
    searchTerm: deptSearch,
    setSearchTerm: setDeptSearch,
    showAddModal: deptShowAdd,
    setShowAddModal: setDeptShowAdd,
    editingDepartment,
    filteredDepartments,
    stats: deptStats,
    handleAddDepartment,
    handleEditDepartment,
    handleDeleteDepartment,
    openEditModal,
    closeModal: closeDeptModal,
  } = useDepartments()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Human Resources</h1>
          <p className="text-slate-500 mt-1">Manage employees and HR operations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          {activeTab === "employees" && (
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          )}
        </div>
      </div>

      <HRStatsCards
        stats={{
          ...hrStats,
          totalEmployees: employeeStats.total,
          activeEmployees: employeeStats.active,
          activePercentage:
            employeeStats.total > 0
              ? Math.round((employeeStats.active / employeeStats.total) * 100)
              : 0,
          departmentCount: deptStats.totalDepartments,
        }}
        formatCurrency={formatCurrency}
      />

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          {HR_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "employees" && (
        <div className="space-y-6">
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
        </div>
      )}

      {activeTab === "departments" && (
        <div className="space-y-6">
          <DepartmentFilters
            searchTerm={deptSearch}
            onSearchChange={setDeptSearch}
          />
          <DepartmentGrid
            departments={filteredDepartments}
            searchTerm={deptSearch}
            onEdit={openEditModal}
            onDelete={handleDeleteDepartment}
          />
          <DepartmentModal
            isOpen={deptShowAdd || !!editingDepartment}
            onClose={closeDeptModal}
            onSave={editingDepartment ? handleEditDepartment : handleAddDepartment}
            editingDepartment={editingDepartment}
          />
        </div>
      )}

      {activeTab === "attendance" && (
        <div className="space-y-6">
          <HRAttendance />
        </div>
      )}

      {activeTab === "payroll" && (
        <div className="space-y-6">
          <HRPayroll employees={employees} />
        </div>
      )}

      {/* Add Employee Modal */}
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          fetchEmployees()
        }}
      />
    </div>
  )
}

