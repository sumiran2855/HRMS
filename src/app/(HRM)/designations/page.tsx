"use client"

import { Plus, Briefcase } from "lucide-react"
import DesignationModal from "@/components/dashboard/designations/DesignationModal"
import { DesignationStatsCards } from "@/components/dashboard/designations/DesignationStatsCards"
import { DesignationFilters } from "@/components/dashboard/designations/DesignationFilters"
import { DesignationGrid } from "@/components/dashboard/designations/DesignationGrid"
import { useDesignations } from "@/hooks/designation/useDesignations"

export default function DesignationsPage() {
  const {
    searchTerm,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    selectedLevel,
    setSelectedLevel,
    showAddModal,
    setShowAddModal,
    editingDesignation,
    filteredDesignations,
    stats,
    handleAddDesignation,
    handleEditDesignation,
    handleDeleteDesignation,
    openEditModal,
    closeModal,
  } = useDesignations()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="space-y-6 p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg shadow-primary/20">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Designation Management
              </h1>
            </div>
            <p className="text-muted-foreground ml-11">Organize and manage job titles and roles across departments</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all duration-200 font-medium"
          >
            <Plus className="h-5 w-5" />
            Add Designation
          </button>
        </div>

        <DesignationStatsCards stats={stats} />

        <DesignationFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
        />

        <DesignationGrid
          designations={filteredDesignations}
          searchTerm={searchTerm}
          selectedDepartment={selectedDepartment}
          selectedLevel={selectedLevel}
          onEdit={openEditModal}
          onDelete={handleDeleteDesignation}
        />

        <DesignationModal
          isOpen={showAddModal || !!editingDesignation}
          onClose={closeModal}
          onSave={editingDesignation ? handleEditDesignation : handleAddDesignation}
          editingDesignation={editingDesignation}
        />
      </div>
    </div>
  )
}
