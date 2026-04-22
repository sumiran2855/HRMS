"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { Client, UseClientReturn } from "@/types/client.types"
import { CLIENT_DATA } from "@/constants/client"

export function useClient(): UseClientReturn {
  const [searchName, setSearchName] = useState("")
  const [searchContact, setSearchContact] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedContractType, setSelectedContractType] = useState("All Types")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Modal state
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [clientModalOpen, setClientModalOpen] = useState(false)
  const [viewClientModalOpen, setViewClientModalOpen] = useState(false)
  const [editClientModalOpen, setEditClientModalOpen] = useState(false)
  const [deleteClientModalOpen, setDeleteClientModalOpen] = useState(false)

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchName, searchContact, selectedIndustry, selectedStatus, selectedContractType])

  const filteredClients = useMemo(() => {
    return CLIENT_DATA.filter((client) => {
      const matchesName = client.companyName.toLowerCase().includes(searchName.toLowerCase())
      const matchesContact = client.contactPerson.toLowerCase().includes(searchContact.toLowerCase())
      const matchesIndustry = selectedIndustry === "All Industries" || client.industry === selectedIndustry
      const matchesStatus = selectedStatus === "All Status" || client.status === selectedStatus
      const matchesContractType = selectedContractType === "All Types" || client.contractType === selectedContractType
      return matchesName && matchesContact && matchesIndustry && matchesStatus && matchesContractType
    })
  }, [searchName, searchContact, selectedIndustry, selectedStatus, selectedContractType])

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredClients.length / rowsPerPage)),
    [filteredClients.length, rowsPerPage]
  )

  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredClients.slice(start, start + rowsPerPage)
  }, [filteredClients, currentPage, rowsPerPage])

  const stats = useMemo(() => ({
    totalClients: CLIENT_DATA.length,
    activeProjects: CLIENT_DATA.filter((c) => c.status === "active").reduce((sum, c) => sum + c.projects, 0),
    totalRevenue: CLIENT_DATA.reduce((sum, c) => sum + c.contractValue, 0),
    activeCount: CLIENT_DATA.filter((c) => c.status === "active").length,
  }), [])

  const formatCurrency = useCallback((amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 }).format(amount), [])

  const formatDate = useCallback((dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }), [])

  const clearFilters = useCallback(() => {
    setSearchName("")
    setSearchContact("")
    setSelectedIndustry("All Industries")
    setSelectedStatus("All Status")
    setSelectedContractType("All Types")
  }, [])

  const goToPage = useCallback((page: number) => {
    setCurrentPage(() => {
      const max = Math.max(1, Math.ceil(filteredClients.length / rowsPerPage))
      return Math.min(Math.max(1, page), max)
    })
  }, [filteredClients.length, rowsPerPage])

  const handleView = useCallback((client: Client) => { setSelectedClient(client); setViewClientModalOpen(true) }, [])
  const handleEdit = useCallback((client: Client) => { setSelectedClient(client); setEditClientModalOpen(true) }, [])
  const handleDelete = useCallback((client: Client) => { setSelectedClient(client); setDeleteClientModalOpen(true) }, [])
  const handleCloseView = useCallback(() => { setViewClientModalOpen(false); setSelectedClient(null) }, [])
  const handleCloseEdit = useCallback(() => { setEditClientModalOpen(false); setSelectedClient(null) }, [])
  const handleCloseDelete = useCallback(() => { setDeleteClientModalOpen(false); setSelectedClient(null) }, [])

  return {
    searchName, setSearchName,
    searchContact, setSearchContact,
    selectedIndustry, setSelectedIndustry,
    selectedStatus, setSelectedStatus,
    selectedContractType, setSelectedContractType,
    filteredClients,
    paginatedClients,
    currentPage,
    totalPages,
    rowsPerPage,
    setRowsPerPage,
    goToPage,
    stats,
    formatCurrency, formatDate, clearFilters,
    selectedClient,
    clientModalOpen, viewClientModalOpen, editClientModalOpen, deleteClientModalOpen,
    setClientModalOpen,
    handleView, handleEdit, handleDelete,
    handleCloseView, handleCloseEdit, handleCloseDelete,
  }
}
