"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Download, UserPlus } from "lucide-react"
import { useHR } from "@/hooks/hr/useHR"
import { HR_TABS } from "@/constants/hr"
import { AddEmployeeModal } from "@/components/dashboard/employees/AddEmployeeModal"
import {
  HRStatsCards,
  HRFilters,
  HREmployeesTable,
  HRDepartments,
  HRAttendance,
  HRPayroll,
  ViewEmployeeModal,
  EditEmployeeModal,
  DeleteEmployeeModal,
} from "@/components/dashboard/hr"

export default function HRPage() {
  const {
    searchTerm, setSearchTerm,
    selectedDepartment, setSelectedDepartment,
    selectedStatus, setSelectedStatus,
    activeTab, setActiveTab,
    entriesPerPage, setEntriesPerPage,
    paginatedData,
    hrStats, departments,
    formatCurrency, getStatusColor, getPerformanceColor,
    // Modal state
    isAddOpen, setIsAddOpen,
    selectedEmployee,
    isViewOpen, isEditOpen, isDeleteOpen,
    handleView, handleEdit, handleDelete,
    handleCloseView, handleCloseEdit, handleCloseDelete,
    handleConfirmDelete, handleUpdateEmployee,
  } = useHR()

  return (
    <div className="space-y-6">
      {/* Header */}
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
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
            onClick={() => setIsAddOpen(true)}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      <HRStatsCards stats={hrStats} formatCurrency={formatCurrency} />

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
          <HRFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
          <HREmployeesTable
            paginatedData={paginatedData}
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
            formatCurrency={formatCurrency}
            getStatusColor={getStatusColor}
            getPerformanceColor={getPerformanceColor}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {activeTab === "departments" && (
        <div className="space-y-6">
          <HRDepartments departments={departments} formatCurrency={formatCurrency} />
        </div>
      )}

      {activeTab === "attendance" && (
        <div className="space-y-6">
          <HRAttendance />
        </div>
      )}

      {activeTab === "payroll" && (
        <div className="space-y-6">
          <HRPayroll />
        </div>
      )}

      {/* Modals */}
      <AddEmployeeModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />

      <ViewEmployeeModal
        isOpen={isViewOpen}
        onClose={handleCloseView}
        employee={selectedEmployee}
        formatCurrency={formatCurrency}
        getStatusColor={getStatusColor}
        getPerformanceColor={getPerformanceColor}
      />

      <EditEmployeeModal
        isOpen={isEditOpen}
        onClose={handleCloseEdit}
        employee={selectedEmployee}
        onSave={handleUpdateEmployee}
      />

      <DeleteEmployeeModal
        isOpen={isDeleteOpen}
        onClose={handleCloseDelete}
        employee={selectedEmployee}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
