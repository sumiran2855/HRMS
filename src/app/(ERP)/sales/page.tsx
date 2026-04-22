"use client"

import { Button } from "@/components/ui/Button"
import { Download, Plus } from "lucide-react"
import { useSales } from "@/hooks/sales/useSales"
import { SALES_TABS } from "@/constants/sales"
import {
  SalesStatsCards,
  SalesFilters,
  SalesOrdersTable,
  SalesCustomers,
  SalesAnalytics,
  ViewOrderModal,
  EditOrderModal,
  DeleteOrderModal,
  AddOrderModal,
} from "@/components/dashboard/sales"

export default function SalesPage() {
  const {
    searchTerm, setSearchTerm,
    selectedStatus, setSelectedStatus,
    selectedPaymentStatus, setSelectedPaymentStatus,
    activeTab, setActiveTab,
    entriesPerPage, setEntriesPerPage,
    paginatedData,
    salesStats, customers,
    formatCurrency, getStatusColor, getPaymentStatusColor,
    // Modal state
    selectedOrder,
    isViewOpen, isEditOpen, isDeleteOpen, isAddOpen, setIsAddOpen,
    handleView, handleEdit, handleDelete,
    handleCloseView, handleCloseEdit, handleCloseDelete,
    handleConfirmDelete, handleUpdateOrder,
  } = useSales()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sales & Distribution</h1>
          <p className="text-slate-500 mt-1">Manage sales orders and customer relationships</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={() => setIsAddOpen(true)} className="bg-orange-600 hover:bg-orange-700 text-white cursor-pointer">
            <Plus className="w-4 h-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      <SalesStatsCards stats={salesStats} formatCurrency={formatCurrency} />

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          {SALES_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? "border-orange-500 text-orange-600"
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
          <SalesFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedPaymentStatus={selectedPaymentStatus}
            setSelectedPaymentStatus={setSelectedPaymentStatus}
          />
          <SalesOrdersTable
            paginatedData={paginatedData}
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
            formatCurrency={formatCurrency}
            getStatusColor={getStatusColor}
            getPaymentStatusColor={getPaymentStatusColor}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {activeTab === "customers" && (
        <div className="space-y-6">
          <SalesCustomers customers={customers} formatCurrency={formatCurrency} />
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6">
          <SalesAnalytics />
        </div>
      )}

      {/* Modals */}
      <ViewOrderModal
        isOpen={isViewOpen}
        onClose={handleCloseView}
        order={selectedOrder}
        formatCurrency={formatCurrency}
        getStatusColor={getStatusColor}
        getPaymentStatusColor={getPaymentStatusColor}
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
