"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { usePromotion } from "@/hooks/promotion/usePromotion"
import {
  PromotionActionModal,
  PromotionFilters,
  PromotionModal,
  PromotionPagination,
  PromotionStatsCards,
  PromotionTable,
  ViewPromotionModal,
} from "@/components/dashboard/promotion"

export default function PromotionPage() {
  const p = usePromotion()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Promotion Management</h1>
          <p className="text-slate-500 text-sm mt-1">
            Track promotion requests, approval decisions, and role-based workflow.
          </p>
        </div>
        <Button
          onClick={() => p.setAddOpen(true)}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Request
        </Button>
      </div>

      <PromotionStatsCards stats={p.stats} />

      <PromotionFilters
        searchQuery={p.searchQuery}
        setSearchQuery={p.setSearchQuery}
        selectedDepartment={p.selectedDepartment}
        setSelectedDepartment={p.setSelectedDepartment}
        selectedStatus={p.selectedStatus}
        setSelectedStatus={p.setSelectedStatus}
      />

      <PromotionTable
        requests={p.paginatedRequests}
        filteredCount={p.filteredRequests.length}
        clearFilters={p.clearFilters}
        onView={p.handleView}
        activeRole={p.activeRole}
        onAction={p.openActionModal}
      />

      <PromotionPagination
        totalPages={p.totalPages}
        currentPage={p.currentPage}
        rowsPerPage={p.rowsPerPage}
        setRowsPerPage={p.setRowsPerPage}
        goToPage={p.goToPage}
        filteredCount={p.filteredRequests.length}
      />

      <PromotionModal
        isOpen={p.addOpen}
        onClose={() => p.setAddOpen(false)}
        onSubmit={p.handleAddRequest}
      />

      <ViewPromotionModal
        isOpen={p.viewOpen}
        onClose={p.handleCloseView}
        request={p.selectedRequest}
        onAddComment={p.addComment}
      />

      <PromotionActionModal
        isOpen={p.actionOpen}
        actionType={p.actionType}
        request={p.actionRequest}
        onClose={p.closeActionModal}
        onConfirm={p.confirmAction}
      />
    </div>
  )
}