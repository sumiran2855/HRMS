"use client"

import { Button } from "@/components/ui/Button"
import { Plus } from "lucide-react"
import { useClient } from "@/hooks/client/useClient"
import {
  ClientStatsCards,
  ClientFilters,
  ClientTable,
  ClientPagination,
  ClientModal,
  ViewClientModal,
  EditClientModal,
  DeleteClientModal,
} from "@/components/dashboard/client"

export default function ClientPage() {
  const c = useClient()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Client Management</h1>
          <p className="text-slate-500 mt-1">Manage your client relationships and contracts</p>
        </div>
        <Button onClick={() => c.setClientModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
          <Plus className="w-4 h-4" />
          Add Client
        </Button>
      </div>

      <ClientStatsCards stats={c.stats} formatCurrency={c.formatCurrency} />

      <ClientFilters
        searchName={c.searchName}
        setSearchName={c.setSearchName}
        searchContact={c.searchContact}
        setSearchContact={c.setSearchContact}
        selectedIndustry={c.selectedIndustry}
        setSelectedIndustry={c.setSelectedIndustry}
        selectedStatus={c.selectedStatus}
        setSelectedStatus={c.setSelectedStatus}
        selectedContractType={c.selectedContractType}
        setSelectedContractType={c.setSelectedContractType}
      />

      <ClientTable
        paginatedClients={c.paginatedClients}
        filteredCount={c.filteredClients.length}
        formatCurrency={c.formatCurrency}
        formatDate={c.formatDate}
        onView={c.handleView}
        onEdit={c.handleEdit}
        onDelete={c.handleDelete}
        clearFilters={c.clearFilters}
      />

      <ClientPagination
        totalPages={c.totalPages}
        currentPage={c.currentPage}
        rowsPerPage={c.rowsPerPage}
        setRowsPerPage={c.setRowsPerPage}
        goToPage={c.goToPage}
        filteredCount={c.filteredClients.length}
      />

      {/* Modals */}
      {c.selectedClient && (
        <>
          <ViewClientModal
            isOpen={c.viewClientModalOpen}
            onClose={c.handleCloseView}
            client={c.selectedClient}
          />
          <EditClientModal
            isOpen={c.editClientModalOpen}
            onClose={c.handleCloseEdit}
            client={c.selectedClient}
          />
          <DeleteClientModal
            isOpen={c.deleteClientModalOpen}
            onClose={c.handleCloseDelete}
            client={c.selectedClient}
          />
        </>
      )}

      <ClientModal
        isOpen={c.clientModalOpen}
        onClose={() => c.setClientModalOpen(false)}
      />
    </div>
  )
}
