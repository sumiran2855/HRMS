"use client"

import { Button } from "@/components/ui/Button"
import { Card, CardHeader } from "@/components/ui/Card"
import { Download, Plus } from "lucide-react"
import { useLeads } from "@/hooks/leads/useLeads"
import { LeadsStatsCards, LeadsFilters, LeadsTable, LeadsPagination } from "@/components/dashboard/leads"
import { AddLeadModal } from "@/components/dashboard/crm/AddLeadModal"
import { EditLeadModal } from "@/components/dashboard/crm/EditLeadModal"
import { ViewLeadModal } from "@/components/dashboard/crm/ViewLeadModal"
import { DeleteConfirmModal } from "@/components/dashboard/crm/DeleteConfirmModal"

export default function LeadsPage() {
  const {
    searchTerm, setSearchTerm,
    currentPage, setCurrentPage,
    entriesPerPage, setEntriesPerPage,
    selectedStatus, setSelectedStatus,
    selectedSource, setSelectedSource,
    isAddLeadModalOpen, setIsAddLeadModalOpen,
    isEditLeadModalOpen, setIsEditLeadModalOpen,
    isViewLeadModalOpen, setIsViewLeadModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen,
    selectedLead,
    filteredData, paginatedData,
    totalPages, safePage, startIndex, endIndex,
    stats, updateFilter,
    handleAction, handleUpdateLead, handleDeleteLead,
  } = useLeads()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads Management</h1>
          <p className="text-slate-500 mt-1">Track and manage your sales leads</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            onClick={() => setIsAddLeadModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      <LeadsStatsCards stats={stats} />

      <Card className="overflow-hidden border border-slate-200 shadow-sm rounded-xl">
        <CardHeader className="px-5 py-4 border-b border-slate-100">
          <LeadsFilters
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
            selectedStatus={selectedStatus}
            selectedSource={selectedSource}
            searchTerm={searchTerm}
            setCurrentPage={setCurrentPage}
            updateFilter={updateFilter}
            setSelectedStatus={setSelectedStatus}
            setSelectedSource={setSelectedSource}
            setSearchTerm={setSearchTerm}
          />
        </CardHeader>
        <LeadsTable paginatedData={paginatedData} handleAction={handleAction} />
      </Card>

      <LeadsPagination
        totalPages={totalPages}
        safePage={safePage}
        startIndex={startIndex}
        endIndex={endIndex}
        filteredCount={filteredData.length}
        setCurrentPage={setCurrentPage}
      />

      <AddLeadModal isOpen={isAddLeadModalOpen} onClose={() => setIsAddLeadModalOpen(false)} />
      <EditLeadModal isOpen={isEditLeadModalOpen} onClose={() => setIsEditLeadModalOpen(false)} lead={selectedLead as any} onUpdate={handleUpdateLead} />
      <ViewLeadModal isOpen={isViewLeadModalOpen} onClose={() => setIsViewLeadModalOpen(false)} lead={selectedLead as any} />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteLead}
        title="Delete Lead"
        message="Are you sure you want to delete this lead? This action cannot be undone."
        itemName={selectedLead?.name || ''}
        itemType="lead"
      />
    </div>
  )
}
