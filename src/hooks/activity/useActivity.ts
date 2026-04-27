"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { Activity, UseActivityReturn } from "@/types/activity.types"
import {
  ACTIVITY_DATA,
  ACTIVITY_STATUS_COLORS,
  ACTIVITY_PRIORITY_COLORS,
} from "@/constants/activity"

export function useActivity(): UseActivityReturn {
  const [searchTitle, setSearchTitle] = useState("")
  const [searchId, setSearchId] = useState("")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedPriority, setSelectedPriority] = useState("All Priority")

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [modalOpen, setModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTitle, searchId, selectedType, selectedCategory, selectedStatus, selectedPriority])

  const filteredActivities = useMemo(() => {
    return ACTIVITY_DATA.filter((activity) => {
      const matchesTitle = activity.title.toLowerCase().includes(searchTitle.toLowerCase())
      const matchesId = activity.id.toLowerCase().includes(searchId.toLowerCase())
      const matchesType = selectedType === "All Types" || activity.type === selectedType
      const matchesCategory = selectedCategory === "All Categories" || activity.category === selectedCategory
      const matchesStatus = selectedStatus === "All Status" || activity.status === selectedStatus
      const matchesPriority = selectedPriority === "All Priority" || activity.priority === selectedPriority
      return matchesTitle && matchesId && matchesType && matchesCategory && matchesStatus && matchesPriority
    })
  }, [searchTitle, searchId, selectedType, selectedCategory, selectedStatus, selectedPriority])

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredActivities.length / rowsPerPage)),
    [filteredActivities.length, rowsPerPage]
  )

  const paginatedActivities = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredActivities.slice(start, start + rowsPerPage)
  }, [filteredActivities, currentPage, rowsPerPage])

  const stats = useMemo(
    () => ({
      totalActivities: ACTIVITY_DATA.length,
      inProgressCount: ACTIVITY_DATA.filter((a) => a.status === "in-progress").length,
      completedCount: ACTIVITY_DATA.filter((a) => a.status === "completed").length,
      pendingCount: ACTIVITY_DATA.filter((a) => a.status === "pending").length,
    }),
    []
  )

  const formatDate = useCallback(
    (dateString: string) =>
      new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    []
  )

  const getStatusColor = useCallback(
    (status: string) => ACTIVITY_STATUS_COLORS[status] ?? "bg-gray-100 text-gray-700 border-gray-200",
    []
  )

  const getPriorityColor = useCallback(
    (priority: string) => ACTIVITY_PRIORITY_COLORS[priority] ?? "bg-gray-100 text-gray-700 border-gray-200",
    []
  )

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(() => {
        const max = Math.max(1, Math.ceil(filteredActivities.length / rowsPerPage))
        return Math.min(Math.max(1, page), max)
      })
    },
    [filteredActivities.length, rowsPerPage]
  )

  const clearFilters = useCallback(() => {
    setSearchTitle("")
    setSearchId("")
    setSelectedType("All Types")
    setSelectedCategory("All Categories")
    setSelectedStatus("All Status")
    setSelectedPriority("All Priority")
  }, [])

  const handleAdd = useCallback(() => {
    setSelectedActivity(null)
    setModalOpen(true)
  }, [])

  const handleEdit = useCallback((activity: Activity) => {
    setSelectedActivity(activity)
    setModalOpen(true)
  }, [])

  const handleView = useCallback((activity: Activity) => {
    setSelectedActivity(activity)
    setViewModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setModalOpen(false)
    setSelectedActivity(null)
  }, [])

  const handleCloseViewModal = useCallback(() => {
    setViewModalOpen(false)
    setSelectedActivity(null)
  }, [])

  return {
    searchTitle,
    setSearchTitle,
    searchId,
    setSearchId,
    selectedType,
    setSelectedType,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    selectedPriority,
    setSelectedPriority,
    filteredActivities,
    paginatedActivities,
    currentPage,
    totalPages,
    rowsPerPage,
    setRowsPerPage,
    goToPage,
    stats,
    formatDate,
    getStatusColor,
    getPriorityColor,
    clearFilters,
    selectedActivity,
    modalOpen,
    viewModalOpen,
    setModalOpen,
    setViewModalOpen,
    handleAdd,
    handleEdit,
    handleView,
    handleCloseModal,
    handleCloseViewModal,
  }
}
