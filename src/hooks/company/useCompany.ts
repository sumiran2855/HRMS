"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { Company, UseCompanyReturn } from "@/types/company.types"
import { COMPANY_DATA } from "@/constants/company"

export function useCompany(): UseCompanyReturn {
  const [searchName, setSearchName] = useState("")
  const [searchId, setSearchId] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries")
  const [selectedStatus, setSelectedStatus] = useState("All Status")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Modal state
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [companyModalOpen, setCompanyModalOpen] = useState(false)

  // Reset to page 1 whenever filters change
  useEffect(() => { setCurrentPage(1) }, [searchName, searchId, selectedIndustry, selectedStatus])

  const filteredCompanies = useMemo(() => {
    return COMPANY_DATA.filter((company) => {
      const matchesName = company.name.toLowerCase().includes(searchName.toLowerCase())
      const matchesId = company.id.toLowerCase().includes(searchId.toLowerCase())
      const matchesIndustry = selectedIndustry === "All Industries" || company.industry === selectedIndustry
      const matchesStatus = selectedStatus === "All Status" || company.status === selectedStatus
      return matchesName && matchesId && matchesIndustry && matchesStatus
    })
  }, [searchName, searchId, selectedIndustry, selectedStatus])

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredCompanies.length / rowsPerPage)),
    [filteredCompanies.length, rowsPerPage]
  )

  const paginatedCompanies = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredCompanies.slice(start, start + rowsPerPage)
  }, [filteredCompanies, currentPage, rowsPerPage])

  const stats = useMemo(() => ({
    totalCompanies: COMPANY_DATA.length,
    totalRevenue: COMPANY_DATA.reduce((sum, c) => sum + c.revenue, 0),
    activeCount: COMPANY_DATA.filter((c) => c.status === "active").length,
    totalEmployees: COMPANY_DATA.reduce((sum, c) => sum + c.employees, 0),
  }), [])

  const formatCurrency = useCallback((amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount), [])

  const formatDate = useCallback((dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }), [])

  const clearFilters = useCallback(() => {
    setSearchName("")
    setSearchId("")
    setSelectedIndustry("All Industries")
    setSelectedStatus("All Status")
  }, [])

  const goToPage = useCallback((page: number) => {
    setCurrentPage((prev) => {
      const max = Math.max(1, Math.ceil(filteredCompanies.length / rowsPerPage))
      return Math.min(Math.max(1, page), max)
    })
  }, [filteredCompanies.length, rowsPerPage])

  const handleView = useCallback((company: Company) => { setSelectedCompany(company); setViewModalOpen(true) }, [])
  const handleEdit = useCallback((company: Company) => { setSelectedCompany(company); setEditModalOpen(true) }, [])
  const handleDelete = useCallback((company: Company) => { setSelectedCompany(company); setDeleteModalOpen(true) }, [])
  const handleCloseView = useCallback(() => { setViewModalOpen(false); setSelectedCompany(null) }, [])
  const handleCloseEdit = useCallback(() => { setEditModalOpen(false); setSelectedCompany(null) }, [])
  const handleCloseDelete = useCallback(() => { setDeleteModalOpen(false); setSelectedCompany(null) }, [])

  return {
    searchName, setSearchName,
    searchId, setSearchId,
    selectedIndustry, setSelectedIndustry,
    selectedStatus, setSelectedStatus,
    filteredCompanies,
    paginatedCompanies,
    currentPage,
    totalPages,
    rowsPerPage,
    setRowsPerPage,
    goToPage,
    stats,
    formatCurrency, formatDate, clearFilters,
    selectedCompany,
    viewModalOpen, editModalOpen, deleteModalOpen, companyModalOpen,
    setCompanyModalOpen,
    handleView, handleEdit, handleDelete,
    handleCloseView, handleCloseEdit, handleCloseDelete,
  }
}
