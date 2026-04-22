"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Download, Plus } from "lucide-react"
import { useFinance } from "@/hooks/finance/useFinance"
import { FINANCE_TABS } from "@/constants/finance"
import {
  FinanceStatsCards,
  FinanceFilters,
  FinanceTransactions,
  FinanceAccounts,
  FinanceReports,
  TransactionFormModal,
  TransactionViewModal,
} from "@/components/dashboard/finance"
import { ConfirmModal } from "@/components/ui/ConfirmModal"
import type { Transaction } from "@/types/finance.types"

export default function FinancePage() {
  const {
    searchTerm, setSearchTerm,
    selectedType, setSelectedType,
    selectedStatus, setSelectedStatus,
    activeTab, setActiveTab,
    entriesPerPage, setEntriesPerPage,
    paginatedData,
    financeStats, accounts,
    formatCurrency,
  } = useFinance()

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [viewTransaction, setViewTransaction] = useState<Transaction | null>(null)
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null)
  const [deleteTransaction, setDeleteTransaction] = useState<Transaction | null>(null)

  // Handlers
  const handleCreate = (data: Omit<Transaction, "id">) => {
    console.log("Create transaction:", data)
    setIsCreateOpen(false)
  }

  const handleEdit = (data: Omit<Transaction, "id">) => {
    console.log("Update transaction:", editTransaction?.id, data)
    setEditTransaction(null)
  }

  const handleDelete = () => {
    console.log("Delete transaction:", deleteTransaction?.id)
    setDeleteTransaction(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Finance & Accounting</h1>
          <p className="text-slate-500 mt-1">Manage financial transactions and accounts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Transaction
          </Button>
        </div>
      </div>

      <FinanceStatsCards stats={financeStats} formatCurrency={formatCurrency} />

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          {FINANCE_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "transactions" && (
        <div className="space-y-6">
          <FinanceFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
          <FinanceTransactions
            paginatedData={paginatedData}
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
            formatCurrency={formatCurrency}
            onView={(t) => setViewTransaction(t)}
            onEdit={(t) => setEditTransaction(t)}
            onDelete={(t) => setDeleteTransaction(t)}
          />
        </div>
      )}

      {activeTab === "accounts" && (
        <div className="space-y-6">
          <FinanceAccounts accounts={accounts} formatCurrency={formatCurrency} />
        </div>
      )}

      {activeTab === "reports" && (
        <div className="space-y-6">
          <FinanceReports />
        </div>
      )}

      {/* Create Transaction Modal */}
      <TransactionFormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreate}
      />

      {/* View Transaction Modal */}
      <TransactionViewModal
        isOpen={!!viewTransaction}
        onClose={() => setViewTransaction(null)}
        transaction={viewTransaction}
        formatCurrency={formatCurrency}
      />

      {/* Edit Transaction Modal */}
      <TransactionFormModal
        isOpen={!!editTransaction}
        onClose={() => setEditTransaction(null)}
        onSubmit={handleEdit}
        transaction={editTransaction}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTransaction}
        onClose={() => setDeleteTransaction(null)}
        onConfirm={handleDelete}
        title="Delete Transaction"
        message={`Are you sure you want to delete transaction "${deleteTransaction?.number}"? This action cannot be undone.`}
        type="delete"
        confirmText="Delete"
      />
    </div>
  )
}
