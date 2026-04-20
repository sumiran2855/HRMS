"use client"

import { Button } from "@/components/ui/Button"
import { Download, Plus, Package } from "lucide-react"
import { useInventory } from "@/hooks/inventory/useInventory"
import {
  InventoryStatsCards,
  InventoryFilters,
  InventoryTable,
  ViewInventoryModal,
  EditInventoryModal,
  DeleteInventoryModal,
} from "@/components/dashboard/inventory"

export default function InventoryPage() {
  const {
    searchTerm, setSearchTerm,
    selectedCategory, setSelectedCategory,
    selectedStatus, setSelectedStatus,
    currentPage, setCurrentPage,
    entriesPerPage, setEntriesPerPage,
    filteredData, paginatedData,
    totalPages, startIndex,
    inventoryStats, formatCurrency,
    selectedItem,
    isViewOpen, setIsViewOpen,
    isEditOpen, setIsEditOpen,
    isDeleteOpen, setIsDeleteOpen,
    handleView, handleEdit, handleDelete,
    handleUpdate, handleConfirmDelete,
  } = useInventory()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Inventory Management</h1>
            <p className="text-sm text-slate-500">Track and manage your inventory across warehouses</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-md shadow-indigo-200">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      <InventoryStatsCards stats={inventoryStats} formatCurrency={formatCurrency} />

      <InventoryFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      <InventoryTable
        paginatedData={paginatedData}
        filteredData={filteredData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        entriesPerPage={entriesPerPage}
        setEntriesPerPage={setEntriesPerPage}
        formatCurrency={formatCurrency}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modals */}
      <ViewInventoryModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        item={selectedItem}
        formatCurrency={formatCurrency}
      />
      <EditInventoryModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        item={selectedItem}
        onUpdate={handleUpdate}
      />
      <DeleteInventoryModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        item={selectedItem}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
