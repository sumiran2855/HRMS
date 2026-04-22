"use client"

import { Button } from "@/components/ui/Button"
import { Download, Plus } from "lucide-react"
import { useProcurement } from "@/hooks/procurement/useProcurement"
import { PROCUREMENT_TABS } from "@/constants/procurement"
import {
  ProcurementStatsCards,
  ProcurementFilters,
  ProcurementOrdersTable,
  ProcurementVendors,
  ProcurementAnalytics,
  ViewOrderModal,
  EditOrderModal,
  DeleteOrderModal,
  AddOrderModal,
} from "@/components/dashboard/procurement"

export default function ProcurementPage() {
  const {
    searchTerm, setSearchTerm,
    selectedStatus, setSelectedStatus,
    selectedPriority, setSelectedPriority,
    activeTab, setActiveTab,
    entriesPerPage, setEntriesPerPage,
    paginatedData,
    procurementStats, vendors,
    formatCurrency, getStatusColor, getPriorityColor,
    // Modal state
    selectedOrder,
    isViewOpen, isEditOpen, isDeleteOpen, isAddOpen, setIsAddOpen,
    handleView, handleEdit, handleDelete,
    handleCloseView, handleCloseEdit, handleCloseDelete,
    handleConfirmDelete, handleUpdateOrder,
  } = useProcurement()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Procurement Management</h1>
          <p className="text-slate-500 mt-1">Manage purchase orders and vendor relationships</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={() => setIsAddOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
            <Plus className="w-4 h-4 mr-2" />
            New Purchase Order
          </Button>
        </div>
      </div>

      <ProcurementStatsCards stats={procurementStats} formatCurrency={formatCurrency} />

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          {PROCUREMENT_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          <ProcurementFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
          />
          <ProcurementOrdersTable
            paginatedData={paginatedData}
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
            formatCurrency={formatCurrency}
            getStatusColor={getStatusColor}
            getPriorityColor={getPriorityColor}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {activeTab === "vendors" && (
        <div className="space-y-6">
          <ProcurementVendors vendors={vendors} formatCurrency={formatCurrency} />
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6">
          <ProcurementAnalytics />
        </div>
      )}

      {/* Modals */}
      <ViewOrderModal
        isOpen={isViewOpen}
        onClose={handleCloseView}
        order={selectedOrder}
        formatCurrency={formatCurrency}
        getStatusColor={getStatusColor}
        getPriorityColor={getPriorityColor}
      />

      <EditOrderModal
        isOpen={isEditOpen}
        onClose={handleCloseEdit}
        order={selectedOrder}
        onSave={handleUpdateOrder}
      />

      <DeleteOrderModal
        isOpen={isDeleteOpen}
        onClose={handleCloseDelete}
        order={selectedOrder}
        onConfirm={handleConfirmDelete}
        formatCurrency={formatCurrency}
      />

      <AddOrderModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />
    </div>
  )
}
