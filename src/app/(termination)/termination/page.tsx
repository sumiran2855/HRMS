"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useTermination } from "@/hooks/termination/useTermination"
import {
  TerminationActionModal,
  TerminationFilters,
  TerminationModal,
  TerminationPagination,
  TerminationStatsCards,
  TerminationTable,
  ViewTerminationModal,
} from "@/components/dashboard/termination"

export default function TerminationPage() {
  const t = useTermination()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Termination Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage termination requests, approvals, and settlement workflow.</p>
        </div>
        <Button
          onClick={() => t.setAddOpen(true)}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Request
        </Button>
      </div>

      <TerminationStatsCards stats={t.stats} />

      <TerminationFilters
        searchQuery={t.searchQuery}
        setSearchQuery={t.setSearchQuery}
        selectedStatus={t.selectedStatus}
        setSelectedStatus={t.setSelectedStatus}
        selectedDepartment={t.selectedDepartment}
        setSelectedDepartment={t.setSelectedDepartment}
        selectedType={t.selectedType}
        setSelectedType={t.setSelectedType}
      />

      <TerminationTable
        requests={t.paginatedRequests}
        filteredCount={t.filteredRequests.length}
        clearFilters={t.clearFilters}
        onView={t.handleView}
        onEdit={t.handleEdit}
        activeRole="hr"
        onAction={t.openActionModal}
      />

      <TerminationPagination
        totalPages={t.totalPages}
        currentPage={t.currentPage}
        rowsPerPage={t.rowsPerPage}
        setRowsPerPage={t.setRowsPerPage}
        goToPage={t.goToPage}
        filteredCount={t.filteredRequests.length}
      />

      <TerminationModal
        key={t.selectedRequest?.id ?? (t.addOpen ? "new-termination-open" : "new-termination-closed")}
        isOpen={t.addOpen}
        onClose={() => t.setAddOpen(false)}
        request={t.selectedRequest}
        onSubmit={t.handleSaveRequest}
      />

      <ViewTerminationModal
        isOpen={t.viewOpen}
        onClose={t.handleCloseView}
        request={t.selectedRequest}
      />

      <TerminationActionModal
        isOpen={t.actionOpen}
        actionType={t.actionType}
        request={t.selectedRequest}
        onClose={t.closeActionModal}
        onConfirm={t.confirmAction}
      />
    </div>
  )
}
