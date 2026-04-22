"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { Project, UseProjectReturn } from "@/types/project.types"
import { PROJECT_DATA, PROJECT_STATUS_COLORS, PROJECT_PRIORITY_COLORS } from "@/constants/project"

export function useProject(): UseProjectReturn {
  const [searchName, setSearchName] = useState("")
  const [searchId, setSearchId] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedPriority, setSelectedPriority] = useState("All Priority")
  const [selectedClient, setSelectedClient] = useState("All Clients")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(6)

  // Modal state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [projectModalOpen, setProjectModalOpen] = useState(false)

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchName, searchId, selectedStatus, selectedPriority, selectedClient])

  const filteredProjects = useMemo(() => {
    return PROJECT_DATA.filter((project) => {
      const matchesName = project.name.toLowerCase().includes(searchName.toLowerCase())
      const matchesId = project.id.toLowerCase().includes(searchId.toLowerCase())
      const matchesStatus = selectedStatus === "All Status" || project.status === selectedStatus
      const matchesPriority = selectedPriority === "All Priority" || project.priority === selectedPriority
      const matchesClient = selectedClient === "All Clients" || project.client === selectedClient
      return matchesName && matchesId && matchesStatus && matchesPriority && matchesClient
    })
  }, [searchName, searchId, selectedStatus, selectedPriority, selectedClient])

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredProjects.length / rowsPerPage)),
    [filteredProjects.length, rowsPerPage]
  )

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredProjects.slice(start, start + rowsPerPage)
  }, [filteredProjects, currentPage, rowsPerPage])

  const stats = useMemo(() => ({
    totalProjects: PROJECT_DATA.length,
    inProgressCount: PROJECT_DATA.filter((p) => p.status === "in-progress").length,
    completedCount: PROJECT_DATA.filter((p) => p.status === "completed").length,
    totalTeamMembers: PROJECT_DATA.reduce((sum, p) => sum + p.employees, 0),
  }), [])

  const formatCurrency = useCallback((amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount), [])

  const formatDate = useCallback((dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }), [])

  const getStatusColor = useCallback((status: string) =>
    PROJECT_STATUS_COLORS[status] ?? { bg: "bg-gray-100", color: "text-gray-800", border: "border-gray-200" }, [])

  const getPriorityColor = useCallback((priority: string) =>
    PROJECT_PRIORITY_COLORS[priority] ?? "bg-gray-500", [])

  const getProgressColor = useCallback((progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 50) return "bg-blue-500"
    if (progress >= 25) return "bg-yellow-500"
    return "bg-red-500"
  }, [])

  const clearFilters = useCallback(() => {
    setSearchName("")
    setSearchId("")
    setSelectedStatus("All Status")
    setSelectedPriority("All Priority")
    setSelectedClient("All Clients")
  }, [])

  const goToPage = useCallback((page: number) => {
    setCurrentPage(() => {
      const max = Math.max(1, Math.ceil(filteredProjects.length / rowsPerPage))
      return Math.min(Math.max(1, page), max)
    })
  }, [filteredProjects.length, rowsPerPage])

  const handleView = useCallback((project: Project) => { setSelectedProject(project); setViewModalOpen(true) }, [])
  const handleEdit = useCallback((project: Project) => { setSelectedProject(project); setEditModalOpen(true) }, [])
  const handleDelete = useCallback((project: Project) => { setSelectedProject(project); setDeleteModalOpen(true) }, [])
  const handleCloseView = useCallback(() => { setViewModalOpen(false); setSelectedProject(null) }, [])
  const handleCloseEdit = useCallback(() => { setEditModalOpen(false); setSelectedProject(null) }, [])
  const handleCloseDelete = useCallback(() => { setDeleteModalOpen(false); setSelectedProject(null) }, [])

  return {
    searchName, setSearchName,
    searchId, setSearchId,
    selectedStatus, setSelectedStatus,
    selectedPriority, setSelectedPriority,
    selectedClient, setSelectedClient,
    filteredProjects,
    paginatedProjects,
    currentPage,
    totalPages,
    rowsPerPage,
    setRowsPerPage,
    goToPage,
    stats,
    formatCurrency, formatDate,
    getStatusColor, getPriorityColor, getProgressColor,
    clearFilters,
    selectedProject,
    viewModalOpen, editModalOpen, deleteModalOpen, projectModalOpen,
    setProjectModalOpen,
    handleView, handleEdit, handleDelete,
    handleCloseView, handleCloseEdit, handleCloseDelete,
  }
}
