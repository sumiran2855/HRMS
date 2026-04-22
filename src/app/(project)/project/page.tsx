"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useProject } from "@/hooks/project/useProject"
import {
  ProjectStatsCards,
  ProjectFilters,
  ProjectCardsGrid,
  ProjectPagination,
  ViewProjectModal,
  EditProjectModal,
  DeleteProjectModal,
  ProjectModal,
} from "@/components/dashboard/project"

export default function ProjectPage() {
  const p = useProject()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and track all active projects</p>
        </div>
        <Button
          onClick={() => p.setProjectModalOpen(true)}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      {/* Stats */}
      <ProjectStatsCards stats={p.stats} />

      {/* Filters */}
      <ProjectFilters
        searchName={p.searchName}
        setSearchName={p.setSearchName}
        searchId={p.searchId}
        setSearchId={p.setSearchId}
        selectedStatus={p.selectedStatus}
        setSelectedStatus={p.setSelectedStatus}
        selectedPriority={p.selectedPriority}
        setSelectedPriority={p.setSelectedPriority}
        selectedClient={p.selectedClient}
        setSelectedClient={p.setSelectedClient}
      />

      {/* Card Grid */}
      <ProjectCardsGrid
        paginatedProjects={p.paginatedProjects}
        filteredCount={p.filteredProjects.length}
        formatCurrency={p.formatCurrency}
        formatDate={p.formatDate}
        getStatusColor={p.getStatusColor}
        getPriorityColor={p.getPriorityColor}
        getProgressColor={p.getProgressColor}
        onView={p.handleView}
        onEdit={p.handleEdit}
        onDelete={p.handleDelete}
        clearFilters={p.clearFilters}
      />

      {/* Pagination */}
      <ProjectPagination
        totalPages={p.totalPages}
        currentPage={p.currentPage}
        rowsPerPage={p.rowsPerPage}
        setRowsPerPage={p.setRowsPerPage}
        goToPage={p.goToPage}
        filteredCount={p.filteredProjects.length}
      />

      {/* Modals */}
      {p.selectedProject && (
        <>
          <ViewProjectModal
            isOpen={p.viewModalOpen}
            onClose={p.handleCloseView}
            project={p.selectedProject}
          />
          <EditProjectModal
            isOpen={p.editModalOpen}
            onClose={p.handleCloseEdit}
            project={p.selectedProject}
          />
          <DeleteProjectModal
            isOpen={p.deleteModalOpen}
            onClose={p.handleCloseDelete}
            project={p.selectedProject}
          />
        </>
      )}
      <ProjectModal
        isOpen={p.projectModalOpen}
        onClose={() => p.setProjectModalOpen(false)}
      />
    </div>
  )
}
