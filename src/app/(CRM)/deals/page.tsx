"use client"

import { Button } from "@/components/ui/Button"
import { Card, CardHeader } from "@/components/ui/Card"
import { Download, Plus } from "lucide-react"
import { useDeals } from "@/hooks/deals/useDeals"
import { DealsStatsCards, DealsFilters, DealsTable, DealsPagination } from "@/components/dashboard/deals"
import { AddDealModal } from "@/components/dashboard/crm/AddDealModal"
import { EditDealModal } from "@/components/dashboard/crm/EditDealModal"
import { ViewDealModal } from "@/components/dashboard/crm/ViewDealModal"
import { DeleteConfirmModal } from "@/components/dashboard/crm/DeleteConfirmModal"

export default function DealsPage() {
  const {
    searchTerm, setSearchTerm,
    currentPage, setCurrentPage,
    entriesPerPage, setEntriesPerPage,
    selectedStage, setSelectedStage,
    selectedSource, setSelectedSource,
    isAddDealModalOpen, setIsAddDealModalOpen,
    isEditDealModalOpen, setIsEditDealModalOpen,
    isViewDealModalOpen, setIsViewDealModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen,
    selectedDeal,
    filteredData, paginatedData,
    totalPages, safePage, startIndex, endIndex,
    stats, updateFilter,
    handleAction, handleUpdateDeal, handleDeleteDeal,
  } = useDeals()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Deals Management</h1>
          <p className="text-slate-500 mt-1">Track and manage your sales deals pipeline</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            onClick={() => setIsAddDealModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Deal
          </Button>
        </div>
      </div>

      <DealsStatsCards stats={stats} />

      <Card className="overflow-hidden border border-slate-200 shadow-sm rounded-xl">
        <CardHeader className="px-5 py-4 border-b border-slate-100">
          <DealsFilters
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
            selectedStage={selectedStage}
            selectedSource={selectedSource}
            searchTerm={searchTerm}
            setCurrentPage={setCurrentPage}
            updateFilter={updateFilter}
            setSelectedStage={setSelectedStage}
            setSelectedSource={setSelectedSource}
            setSearchTerm={setSearchTerm}
          />
        </CardHeader>
        <DealsTable paginatedData={paginatedData} handleAction={handleAction} />
      </Card>

      <DealsPagination
        totalPages={totalPages}
        safePage={safePage}
        startIndex={startIndex}
        endIndex={endIndex}
        filteredCount={filteredData.length}
        setCurrentPage={setCurrentPage}
      />

      <AddDealModal isOpen={isAddDealModalOpen} onClose={() => setIsAddDealModalOpen(false)} />
      <EditDealModal isOpen={isEditDealModalOpen} onClose={() => setIsEditDealModalOpen(false)} deal={selectedDeal as any} onUpdate={handleUpdateDeal} />
      <ViewDealModal isOpen={isViewDealModalOpen} onClose={() => setIsViewDealModalOpen(false)} deal={selectedDeal as any} />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteDeal}
        title="Delete Deal"
        message="Are you sure you want to delete this deal? This action cannot be undone."
        itemName={selectedDeal?.dealName || ''}
        itemType="deal"
      />
    </div>
  )
}
