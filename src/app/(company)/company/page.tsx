"use client"

import { Button } from "@/components/ui/Button"
import { Plus } from "lucide-react"
import { useCompany } from "@/hooks/company/useCompany"
import {
  CompanyStatsCards,
  CompanyFilters,
  CompanyTable,
  CompanyPagination,
  ViewCompanyModal,
  EditCompanyModal,
  DeleteCompanyModal,
  CompanyModal,
} from "@/components/dashboard/company"

export default function CompanyPage() {
  const c = useCompany()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Company Management</h1>
          <p className="text-slate-500 mt-1">Manage company information and business relationships</p>
        </div>
        <Button onClick={() => c.setCompanyModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
          <Plus className="w-4 h-4" />
          Add Company
        </Button>
      </div>

      <CompanyStatsCards stats={c.stats} formatCurrency={c.formatCurrency} />

      <CompanyFilters
        searchName={c.searchName}
        setSearchName={c.setSearchName}
        searchId={c.searchId}
        setSearchId={c.setSearchId}
        selectedIndustry={c.selectedIndustry}
        setSelectedIndustry={c.setSelectedIndustry}
        selectedStatus={c.selectedStatus}
        setSelectedStatus={c.setSelectedStatus}
      />

      <CompanyTable
        paginatedCompanies={c.paginatedCompanies}
        filteredCount={c.filteredCompanies.length}
        formatCurrency={c.formatCurrency}
        onView={c.handleView}
        onEdit={c.handleEdit}
        onDelete={c.handleDelete}
        clearFilters={c.clearFilters}
      />

      <CompanyPagination
        totalPages={c.totalPages}
        currentPage={c.currentPage}
        rowsPerPage={c.rowsPerPage}
        setRowsPerPage={c.setRowsPerPage}
        goToPage={c.goToPage}
        filteredCount={c.filteredCompanies.length}
      />

      {/* Modals */}
      {c.selectedCompany && (
        <>
          <ViewCompanyModal
            isOpen={c.viewModalOpen}
            onClose={c.handleCloseView}
            company={c.selectedCompany}
          />
          <EditCompanyModal
            isOpen={c.editModalOpen}
            onClose={c.handleCloseEdit}
            company={c.selectedCompany}
          />
          <DeleteCompanyModal
            isOpen={c.deleteModalOpen}
            onClose={c.handleCloseDelete}
            company={c.selectedCompany}
          />
        </>
      )}

      <CompanyModal
        isOpen={c.companyModalOpen}
        onClose={() => c.setCompanyModalOpen(false)}
      />
    </div>
  )
}
