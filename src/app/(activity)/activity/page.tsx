"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useActivity } from "@/hooks/activity/useActivity"
import {
  ActivityStatsCards,
  ActivityFilters,
  ActivityTable,
  ActivityPagination,
  ActivityModal,
  ViewActivityModal,
} from "@/components/dashboard/activity"

export default function ActivityPage() {
  const a = useActivity()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Activity Management</h1>
          <p className="text-slate-500 text-sm mt-1">Track and manage development activities across all projects</p>
        </div>
        <Button
          onClick={a.handleAdd}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Activity
        </Button>
      </div>

      <ActivityStatsCards stats={a.stats} />

      <ActivityFilters
        searchTitle={a.searchTitle}
        setSearchTitle={a.setSearchTitle}
        searchId={a.searchId}
        setSearchId={a.setSearchId}
        selectedType={a.selectedType}
        setSelectedType={a.setSelectedType}
        selectedCategory={a.selectedCategory}
        setSelectedCategory={a.setSelectedCategory}
        selectedStatus={a.selectedStatus}
        setSelectedStatus={a.setSelectedStatus}
        selectedPriority={a.selectedPriority}
        setSelectedPriority={a.setSelectedPriority}
      />

      <ActivityTable
        paginatedActivities={a.paginatedActivities}
        filteredCount={a.filteredActivities.length}
        formatDate={a.formatDate}
        getStatusColor={a.getStatusColor}
        getPriorityColor={a.getPriorityColor}
        onView={a.handleView}
        onEdit={a.handleEdit}
        clearFilters={a.clearFilters}
      />

      <ActivityPagination
        totalPages={a.totalPages}
        currentPage={a.currentPage}
        rowsPerPage={a.rowsPerPage}
        setRowsPerPage={a.setRowsPerPage}
        goToPage={a.goToPage}
        filteredCount={a.filteredActivities.length}
      />

      <ActivityModal isOpen={a.modalOpen} onClose={a.handleCloseModal} activity={a.selectedActivity} />
      <ViewActivityModal isOpen={a.viewModalOpen} onClose={a.handleCloseViewModal} activity={a.selectedActivity} />
    </div>
  )
}
