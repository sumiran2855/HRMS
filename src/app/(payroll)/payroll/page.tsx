"use client"

import { Button } from "@/components/ui/Button"
import { Plus } from "lucide-react"
import { usePayroll } from "@/hooks/payroll/usePayroll"
import {
  PayrollStatsCards,
  PayrollFilters,
  PayrollTable,
  PayrollPagination,
  ViewSalarySlipModal,
  EditEmployeeModal,
  DeleteConfirmModal,
  PayrollModal,
} from "@/components/dashboard/payroll"

export default function PayrollPage() {
  const p = usePayroll()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payroll Management</h1>
          <p className="text-slate-500 mt-1">Manage employee salaries and payment status</p>
        </div>
        <Button onClick={() => p.setPayrollModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
          <Plus className="w-4 h-4" />
          Payroll
        </Button>
      </div>

      <PayrollStatsCards stats={p.stats} formatCurrency={p.formatCurrency} />

      <PayrollFilters
        searchName={p.searchName}
        setSearchName={p.setSearchName}
        searchId={p.searchId}
        setSearchId={p.setSearchId}
        selectedDesignation={p.selectedDesignation}
        setSelectedDesignation={p.setSelectedDesignation}
        selectedStatus={p.selectedStatus}
        setSelectedStatus={p.setSelectedStatus}
      />

      <PayrollTable
        paginatedEmployees={p.paginatedEmployees}
        filteredCount={p.filteredEmployees.length}
        formatCurrency={p.formatCurrency}
        formatDate={p.formatDate}
        onView={p.handleView}
        onEdit={p.handleEdit}
        onDelete={p.handleDelete}
        clearFilters={p.clearFilters}
      />

      <PayrollPagination
        totalPages={p.totalPages}
        currentPage={p.currentPage}
        rowsPerPage={p.rowsPerPage}
        setRowsPerPage={p.setRowsPerPage}
        goToPage={p.goToPage}
        filteredCount={p.filteredEmployees.length}
      />

      {/* Modals */}
      {p.selectedEmployee && (
        <>
          <ViewSalarySlipModal
            isOpen={p.viewModalOpen}
            onClose={p.handleCloseView}
            employee={p.selectedEmployee}
          />
          <EditEmployeeModal
            isOpen={p.editModalOpen}
            onClose={p.handleCloseEdit}
            employee={p.selectedEmployee}
          />
          <DeleteConfirmModal
            isOpen={p.deleteModalOpen}
            onClose={p.handleCloseDelete}
            employee={p.selectedEmployee}
          />
        </>
      )}

      <PayrollModal
        isOpen={p.payrollModalOpen}
        onClose={() => p.setPayrollModalOpen(false)}
      />
    </div>
  )
}
