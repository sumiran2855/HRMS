"use client"

import { useState, useMemo, useCallback } from "react"
import { SalesOrder, UseSalesReturn } from "@/types/sales.types"
import {
  SALES_ORDERS_DATA,
  CUSTOMERS_DATA,
  STATUS_COLOR_MAP,
  PAYMENT_STATUS_COLOR_MAP,
} from "@/constants/sales"

export function useSales(): UseSalesReturn {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("All Payment")
  const [activeTab, setActiveTab] = useState("orders")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)

  // Modal state
  const [selectedOrder, setSelectedOrder] = useState<SalesOrder | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)

  const filteredData = useMemo(() => {
    return SALES_ORDERS_DATA.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        selectedStatus === "All Status" || order.status === selectedStatus
      const matchesPaymentStatus =
        selectedPaymentStatus === "All Payment" ||
        order.paymentStatus === selectedPaymentStatus

      return matchesSearch && matchesStatus && matchesPaymentStatus
    })
  }, [searchTerm, selectedStatus, selectedPaymentStatus])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * entriesPerPage
    return filteredData.slice(startIndex, startIndex + entriesPerPage)
  }, [filteredData, currentPage, entriesPerPage])

  const salesStats = useMemo(() => {
    const totalRevenue = SALES_ORDERS_DATA
      .filter((o) => o.paymentStatus === "paid")
      .reduce((sum, o) => sum + o.totalAmount, 0)
    const pendingOrders = SALES_ORDERS_DATA.filter(
      (o) => o.status === "pending" || o.status === "processing"
    ).length
    const deliveredOrders = SALES_ORDERS_DATA.filter(
      (o) => o.status === "delivered"
    ).length

    return {
      totalRevenue,
      totalOrders: SALES_ORDERS_DATA.length,
      deliveredOrders,
      pendingOrders,
      totalCustomers: CUSTOMERS_DATA.length,
    }
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    return STATUS_COLOR_MAP[status] || "bg-gray-100 text-gray-700"
  }

  const getPaymentStatusColor = (status: string) => {
    return PAYMENT_STATUS_COLOR_MAP[status] || "bg-gray-100 text-gray-700"
  }

  // Modal handlers
  const handleView = useCallback((order: SalesOrder) => {
    setSelectedOrder(order)
    setIsViewOpen(true)
  }, [])

  const handleEdit = useCallback((order: SalesOrder) => {
    setSelectedOrder(order)
    setIsEditOpen(true)
  }, [])

  const handleDelete = useCallback((order: SalesOrder) => {
    setSelectedOrder(order)
    setIsDeleteOpen(true)
  }, [])

  const handleCloseView = useCallback(() => {
    setIsViewOpen(false)
    setSelectedOrder(null)
  }, [])

  const handleCloseEdit = useCallback(() => {
    setIsEditOpen(false)
    setSelectedOrder(null)
  }, [])

  const handleCloseDelete = useCallback(() => {
    setIsDeleteOpen(false)
    setSelectedOrder(null)
  }, [])

  const handleConfirmDelete = useCallback(() => {
    setIsDeleteOpen(false)
    setSelectedOrder(null)
  }, [])

  const handleUpdateOrder = useCallback((updated: SalesOrder) => {
    setIsEditOpen(false)
    setSelectedOrder(null)
  }, [])

  return {
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    selectedPaymentStatus,
    setSelectedPaymentStatus,
    activeTab,
    setActiveTab,
    entriesPerPage,
    setEntriesPerPage,
    paginatedData,
    salesStats,
    customers: CUSTOMERS_DATA,
    formatCurrency,
    getStatusColor,
    getPaymentStatusColor,
    // Modal state
    selectedOrder,
    isViewOpen,
    isEditOpen,
    isDeleteOpen,
    isAddOpen,
    setIsAddOpen,
    handleView,
    handleEdit,
    handleDelete,
    handleCloseView,
    handleCloseEdit,
    handleCloseDelete,
    handleConfirmDelete,
    handleUpdateOrder,
  }
}
