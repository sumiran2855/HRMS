"use client"

import { useState, useMemo } from "react"
import { TRANSACTIONS_DATA, ACCOUNTS_DATA } from "@/constants/finance"
import type { UseFinanceReturn } from "@/types/finance.types"

export function useFinance(): UseFinanceReturn {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [activeTab, setActiveTab] = useState("transactions")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)

  const filteredData = useMemo(() => {
    return TRANSACTIONS_DATA.filter((transaction) => {
      const matchesSearch =
        transaction.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.vendor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType =
        selectedType === "All Types" || transaction.type === selectedType
      const matchesStatus =
        selectedStatus === "All Status" || transaction.status === selectedStatus
      return matchesSearch && matchesType && matchesStatus
    })
  }, [searchTerm, selectedType, selectedStatus])

  const totalPages = Math.ceil(filteredData.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage)

  const financeStats = useMemo(() => {
    const totalRevenue = TRANSACTIONS_DATA
      .filter((t) => t.type === "invoice" && t.status === "paid")
      .reduce((sum, t) => sum + t.amount, 0)
    const totalExpenses = TRANSACTIONS_DATA
      .filter((t) => t.type === "expense" && t.status === "paid")
      .reduce((sum, t) => sum + t.amount, 0)
    const pendingInvoices = TRANSACTIONS_DATA
      .filter((t) => t.type === "invoice" && t.status === "pending")
      .reduce((sum, t) => sum + t.amount, 0)
    const pendingInvoiceCount = TRANSACTIONS_DATA.filter(
      (t) => t.type === "invoice" && t.status === "pending"
    ).length
    const totalBalance = ACCOUNTS_DATA.reduce((sum, a) => sum + a.balance, 0)

    return { totalRevenue, totalExpenses, pendingInvoices, pendingInvoiceCount, totalBalance }
  }, [])

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)

  return {
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    selectedStatus,
    setSelectedStatus,
    activeTab,
    setActiveTab,
    currentPage,
    setCurrentPage,
    entriesPerPage,
    setEntriesPerPage,
    filteredData,
    paginatedData,
    totalPages,
    startIndex,
    financeStats,
    accounts: ACCOUNTS_DATA,
    formatCurrency,
  }
}
