"use client"

import { useState, useMemo, useCallback } from "react"
import { PurchaseOrder, UseProcurementReturn } from "@/types/procurement.types"
import {
  PURCHASE_ORDERS_DATA,
  VENDORS_DATA,
  STATUS_COLOR_MAP,
  PRIORITY_COLOR_MAP,
} from "@/constants/procurement"

export function useProcurement(): UseProcurementReturn {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedPriority, setSelectedPriority] = useState("All Priorities")
  const [activeTab, setActiveTab] = useState("orders")
  const [currentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)

  // Modal state
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)

  const filteredData = useMemo(() => {
    return PURCHASE_ORDERS_DATA.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedStatus === "All Status" || order.status === selectedStatus
      const matchesPriority = selectedPriority === "All Priorities" || order.priority === selectedPriority
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [searchTerm, selectedStatus, selectedPriority])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * entriesPerPage
    return filteredData.slice(startIndex, startIndex + entriesPerPage)
  }, [filteredData, currentPage, entriesPerPage])

  const procurementStats = useMemo(() => {
    const totalValue = PURCHASE_ORDERS_DATA.reduce((sum, o) => sum + o.totalAmount, 0)
    return {
      totalOrders: PURCHASE_ORDERS_DATA.length,
      pendingOrders: PURCHASE_ORDERS_DATA.filter((o) => o.status === "pending").length,
      totalValue,
      activeVendors: VENDORS_DATA.length,
    }
  }, [])

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)

  const getStatusColor = (status: string) => STATUS_COLOR_MAP[status] || "bg-gray-100 text-gray-700"
  const getPriorityColor = (priority: string) => PRIORITY_COLOR_MAP[priority] || "bg-gray-100 text-gray-700"

  const handleView = useCallback((order: PurchaseOrder) => {
    setSelectedOrder(order)
    setIsViewOpen(true)
  }, [])

  const handleEdit = useCallback((order: PurchaseOrder) => {
    setSelectedOrder(order)
    setIsEditOpen(true)
  }, [])

  const handleDelete = useCallback((order: PurchaseOrder) => {
    setSelectedOrder(order)
    setIsDeleteOpen(true)
  }, [])

  const handleCloseView = useCallback(() => { setIsViewOpen(false); setSelectedOrder(null) }, [])
  const handleCloseEdit = useCallback(() => { setIsEditOpen(false); setSelectedOrder(null) }, [])
  const handleCloseDelete = useCallback(() => { setIsDeleteOpen(false); setSelectedOrder(null) }, [])
  const handleConfirmDelete = useCallback(() => { setIsDeleteOpen(false); setSelectedOrder(null) }, [])
  const handleUpdateOrder = useCallback((_updated: PurchaseOrder) => { setIsEditOpen(false); setSelectedOrder(null) }, [])

  return {
    searchTerm, setSearchTerm,
    selectedStatus, setSelectedStatus,
    selectedPriority, setSelectedPriority,
    activeTab, setActiveTab,
    entriesPerPage, setEntriesPerPage,
    paginatedData,
    procurementStats,
    vendors: VENDORS_DATA,
    formatCurrency,
    getStatusColor,
    getPriorityColor,
    selectedOrder,
    isViewOpen, isEditOpen, isDeleteOpen, isAddOpen, setIsAddOpen,
    handleView, handleEdit, handleDelete,
    handleCloseView, handleCloseEdit, handleCloseDelete,
    handleConfirmDelete, handleUpdateOrder,
  }
}
