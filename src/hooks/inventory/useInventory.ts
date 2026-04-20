"use client"

import { useState, useMemo } from "react"
import { INVENTORY_DATA } from "@/constants/inventory"
import type { InventoryItem, UseInventoryReturn } from "@/types/inventory.types"

export function useInventory(): UseInventoryReturn {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)

  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const filteredData = useMemo(() => {
    return INVENTORY_DATA.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === "All Categories" || item.category === selectedCategory
      const matchesStatus =
        selectedStatus === "All Status" || item.status === selectedStatus
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [searchTerm, selectedCategory, selectedStatus])

  const totalPages = Math.ceil(filteredData.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage)

  const inventoryStats = useMemo(() => ({
    totalItems: INVENTORY_DATA.length,
    totalValue: INVENTORY_DATA.reduce((sum, item) => sum + item.totalValue, 0),
    lowStockCount: INVENTORY_DATA.filter((i) => i.status === "low-stock").length,
    outOfStockCount: INVENTORY_DATA.filter((i) => i.status === "out-of-stock").length,
    totalQuantity: INVENTORY_DATA.reduce((sum, item) => sum + item.quantity, 0),
  }), [])

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)

  const handleView = (item: InventoryItem) => {
    setSelectedItem(item)
    setIsViewOpen(true)
  }

  const handleEdit = (item: InventoryItem) => {
    setSelectedItem(item)
    setIsEditOpen(true)
  }

  const handleDelete = (item: InventoryItem) => {
    setSelectedItem(item)
    setIsDeleteOpen(true)
  }

  const handleUpdate = (updatedItem: InventoryItem) => {
    console.log("Updated item:", updatedItem)
    setIsEditOpen(false)
    setSelectedItem(null)
  }

  const handleConfirmDelete = () => {
    console.log("Deleted item:", selectedItem?.id)
    setIsDeleteOpen(false)
    setSelectedItem(null)
  }

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    currentPage,
    setCurrentPage,
    entriesPerPage,
    setEntriesPerPage,
    filteredData,
    paginatedData,
    totalPages,
    startIndex,
    inventoryStats,
    formatCurrency,
    selectedItem,
    setSelectedItem,
    isViewOpen,
    setIsViewOpen,
    isEditOpen,
    setIsEditOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    handleView,
    handleEdit,
    handleDelete,
    handleUpdate,
    handleConfirmDelete,
  }
}
