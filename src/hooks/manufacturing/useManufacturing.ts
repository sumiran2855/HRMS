"use client"

import { useState, useMemo, useCallback } from "react"
import { ProductionOrder, UseManufacturingReturn } from "@/types/manufacturing.types"
import {
  PRODUCTION_ORDERS_DATA,
  PRODUCTION_LINES_DATA,
  STATUS_COLOR_MAP,
  PRIORITY_COLOR_MAP,
  LINE_STATUS_COLOR_MAP,
} from "@/constants/manufacturing"

export function useManufacturing(): UseManufacturingReturn {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedPriority, setSelectedPriority] = useState("All Priorities")
  const [activeTab, setActiveTab] = useState("production")
  const [currentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)

  // Modal state
  const [selectedOrder, setSelectedOrder] = useState<ProductionOrder | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)

  const filteredData = useMemo(() => {
    return PRODUCTION_ORDERS_DATA.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedStatus === "All Status" || order.status === selectedStatus
      const matchesPriority = selectedPriority === "All Priorities" || order.priority === selectedPriority
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [searchTerm, selectedStatus, selectedPriority])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * entriesPerPage
    return filteredData.slice(startIndex, startIndex + entriesPerPage)
  }, [filteredData, currentPage, entriesPerPage])

  const manufacturingStats = useMemo(() => {
    const completed = PRODUCTION_ORDERS_DATA.filter((o) => o.status === "completed")
    const avgQualityScore =
      completed.length > 0
        ? completed.reduce((sum, o) => sum + o.qualityScore, 0) / completed.length
        : 0

    return {
      totalOrders: PRODUCTION_ORDERS_DATA.length,
      inProgressOrders: PRODUCTION_ORDERS_DATA.filter((o) => o.status === "in-progress").length,
      completedOrders: completed.length,
      totalOutput: PRODUCTION_LINES_DATA.reduce((sum, l) => sum + l.outputToday, 0),
      avgQualityScore: Math.round(avgQualityScore * 10) / 10,
    }
  }, [])

  const getStatusColor = (status: string) => STATUS_COLOR_MAP[status] || "bg-gray-100 text-gray-700"
  const getPriorityColor = (priority: string) => PRIORITY_COLOR_MAP[priority] || "bg-gray-100 text-gray-700"
  const getLineStatusColor = (status: string) => LINE_STATUS_COLOR_MAP[status] || "bg-gray-100 text-gray-700"

  const handleView = useCallback((order: ProductionOrder) => { setSelectedOrder(order); setIsViewOpen(true) }, [])
  const handleEdit = useCallback((order: ProductionOrder) => { setSelectedOrder(order); setIsEditOpen(true) }, [])
  const handleDelete = useCallback((order: ProductionOrder) => { setSelectedOrder(order); setIsDeleteOpen(true) }, [])
  const handleCloseView = useCallback(() => { setIsViewOpen(false); setSelectedOrder(null) }, [])
  const handleCloseEdit = useCallback(() => { setIsEditOpen(false); setSelectedOrder(null) }, [])
  const handleCloseDelete = useCallback(() => { setIsDeleteOpen(false); setSelectedOrder(null) }, [])
  const handleConfirmDelete = useCallback(() => { setIsDeleteOpen(false); setSelectedOrder(null) }, [])
  const handleUpdateOrder = useCallback((_updated: ProductionOrder) => { setIsEditOpen(false); setSelectedOrder(null) }, [])

  return {
    searchTerm, setSearchTerm,
    selectedStatus, setSelectedStatus,
    selectedPriority, setSelectedPriority,
    activeTab, setActiveTab,
    entriesPerPage, setEntriesPerPage,
    paginatedData,
    manufacturingStats,
    productionLines: PRODUCTION_LINES_DATA,
    getStatusColor, getPriorityColor, getLineStatusColor,
    selectedOrder,
    isViewOpen, isEditOpen, isDeleteOpen, isAddOpen, setIsAddOpen,
    handleView, handleEdit, handleDelete,
    handleCloseView, handleCloseEdit, handleCloseDelete,
    handleConfirmDelete, handleUpdateOrder,
  }
}
