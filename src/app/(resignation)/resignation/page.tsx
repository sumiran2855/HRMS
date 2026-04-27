"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useResignation } from "@/hooks/resignation/useResignation"
import {
  ResignationStatsCards,
  ResignationFilters,
  ResignationTable,
  ResignationPagination,
  ResignationModal,
  ResignationActionModal,
  ViewResignationModal,
} from "@/components/dashboard/resignation"

export default function ResignationPage() {
  const r = useResignation()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Resignation Management</h1>
          <p className="text-slate-500 text-sm mt-1">
            Track employee resignation requests, handover progress, and exit workflow.
          </p>
        </div>
        <Button
          onClick={() => r.setAddOpen(true)}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Request
        </Button>
      </div>

      <ResignationStatsCards stats={r.stats} />

      <ResignationFilters
        searchQuery={r.searchQuery}
        setSearchQuery={r.setSearchQuery}
        selectedDepartment={r.selectedDepartment}
        setSelectedDepartment={r.setSelectedDepartment}
        selectedStatus={r.selectedStatus}
        setSelectedStatus={r.setSelectedStatus}
      />

      <ResignationTable
        requests={r.paginatedRequests}
        filteredCount={r.filteredRequests.length}
        clearFilters={r.clearFilters}
        onView={r.handleView}
        activeRole={r.activeRole}
        onAction={r.openActionModal}
      />

      <ResignationPagination
        totalPages={r.totalPages}
        currentPage={r.currentPage}
        rowsPerPage={r.rowsPerPage}
        setRowsPerPage={r.setRowsPerPage}
        goToPage={r.goToPage}
        filteredCount={r.filteredRequests.length}
      />

      <ResignationModal
        isOpen={r.addOpen}
        onClose={() => r.setAddOpen(false)}
        onSubmit={r.handleAddRequest}
      />

      <ViewResignationModal
        isOpen={r.viewOpen}
        onClose={r.handleCloseView}
        request={r.selectedRequest}
      />

      <ResignationActionModal
        isOpen={r.actionOpen}
        actionType={r.actionType}
        request={r.actionRequest}
        onClose={r.closeActionModal}
        onConfirm={r.confirmAction}
      />
    </div>
  )
}
