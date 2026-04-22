"use client"

import { Button } from "@/components/ui/Button"
import { Download, Plus } from "lucide-react"
import { useManufacturing } from "@/hooks/manufacturing/useManufacturing"
import { MANUFACTURING_TABS } from "@/constants/manufacturing"
import {
  ManufacturingStatsCards,
  ManufacturingFilters,
  ProductionOrdersTable,
  ProductionLines,
  QualityControl,
  ManufacturingAnalytics,
  ViewOrderModal,
  EditOrderModal,
  DeleteOrderModal,
  AddOrderModal,
} from "@/components/dashboard/manufacturing"

export default function ManufacturingPage() {
  const mfg = useManufacturing()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manufacturing Management</h1>
          <p className="text-slate-500 mt-1">Manage production orders and quality control</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={() => mfg.setIsAddOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
            <Plus className="w-4 h-4 mr-2" />
            New Production Order
          </Button>
        </div>
      </div>

      <ManufacturingStatsCards stats={mfg.manufacturingStats} />

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          {MANUFACTURING_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => mfg.setActiveTab(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                mfg.activeTab === tab.key
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
      {mfg.activeTab === "production" && (
        <div className="space-y-6">
          <ManufacturingFilters
            searchTerm={mfg.searchTerm}
            setSearchTerm={mfg.setSearchTerm}
            selectedStatus={mfg.selectedStatus}
            setSelectedStatus={mfg.setSelectedStatus}
            selectedPriority={mfg.selectedPriority}
            setSelectedPriority={mfg.setSelectedPriority}
          />
          <ProductionOrdersTable
            paginatedData={mfg.paginatedData}
            entriesPerPage={mfg.entriesPerPage}
            setEntriesPerPage={mfg.setEntriesPerPage}
            getStatusColor={mfg.getStatusColor}
            getPriorityColor={mfg.getPriorityColor}
            onView={mfg.handleView}
            onEdit={mfg.handleEdit}
            onDelete={mfg.handleDelete}
          />
        </div>
      )}

      {mfg.activeTab === "lines" && (
        <ProductionLines
          productionLines={mfg.productionLines}
          getLineStatusColor={mfg.getLineStatusColor}
        />
      )}

      {mfg.activeTab === "quality" && <QualityControl />}

      {mfg.activeTab === "analytics" && <ManufacturingAnalytics />}

      {/* Modals */}
      <ViewOrderModal
        isOpen={mfg.isViewOpen}
        onClose={mfg.handleCloseView}
        order={mfg.selectedOrder}
        getStatusColor={mfg.getStatusColor}
        getPriorityColor={mfg.getPriorityColor}
      />
      <EditOrderModal
        isOpen={mfg.isEditOpen}
        onClose={mfg.handleCloseEdit}
        order={mfg.selectedOrder}
        onSave={mfg.handleUpdateOrder}
      />
      <DeleteOrderModal
        isOpen={mfg.isDeleteOpen}
        onClose={mfg.handleCloseDelete}
        order={mfg.selectedOrder}
        onConfirm={mfg.handleConfirmDelete}
      />
      <AddOrderModal
        isOpen={mfg.isAddOpen}
        onClose={() => mfg.setIsAddOpen(false)}
      />
    </div>
  )
}
