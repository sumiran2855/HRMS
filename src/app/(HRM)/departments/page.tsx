"use client"

import { Plus, Building2 } from "lucide-react"
import DepartmentModal from "@/components/dashboard/departments/DepartmentModal"
import { DepartmentStatsCards } from "@/components/dashboard/departments/DepartmentStatsCards"
import { DepartmentFilters } from "@/components/dashboard/departments/DepartmentFilters"
import { DepartmentGrid } from "@/components/dashboard/departments/DepartmentGrid"
import { useDepartments } from "@/hooks/department/useDepartments"

export default function DepartmentsPage() {
  const {
    searchTerm,
    setSearchTerm,
    showAddModal,
    setShowAddModal,
    editingDepartment,
    filteredDepartments,
    stats,
    handleAddDepartment,
    handleEditDepartment,
    handleDeleteDepartment,
    openEditModal,
    closeModal,
  } = useDepartments()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="space-y-6 p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg shadow-primary/20">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Department Management
              </h1>
            </div>
            <p className="text-muted-foreground ml-11">Organize and manage company departments and their teams</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all duration-200 font-medium"
          >
            <Plus className="h-5 w-5" />
            Add Department
          </button>
        </div>

        <DepartmentStatsCards stats={stats} />

        <DepartmentFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <DepartmentGrid
          departments={filteredDepartments}
          searchTerm={searchTerm}
          onEdit={openEditModal}
          onDelete={handleDeleteDepartment}
        />

        <DepartmentModal
          isOpen={showAddModal || !!editingDepartment}
          onClose={closeModal}
          onSave={editingDepartment ? handleEditDepartment : handleAddDepartment}
          editingDepartment={editingDepartment}
        />
      </div>
    </div>
  )
}
