"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { PayrollEmployee, UsePayrollReturn } from "@/types/payroll.types"
import { PAYROLL_DATA } from "@/constants/payroll"

export function usePayroll(): UsePayrollReturn {
  const [searchName, setSearchName] = useState("")
  const [searchId, setSearchId] = useState("")
  const [selectedDesignation, setSelectedDesignation] = useState("All Designations")
  const [selectedStatus, setSelectedStatus] = useState("All Status")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Reset to page 1 whenever filters change
  useEffect(() => { setCurrentPage(1) }, [searchName, searchId, selectedDesignation, selectedStatus])

  // Modal state
  const [selectedEmployee, setSelectedEmployee] = useState<PayrollEmployee | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [payrollModalOpen, setPayrollModalOpen] = useState(false)

  const filteredEmployees = useMemo(() => {
    return PAYROLL_DATA.filter((emp) => {
      const matchesName = emp.name.toLowerCase().includes(searchName.toLowerCase())
      const matchesId = emp.id.toLowerCase().includes(searchId.toLowerCase())
      const matchesDesignation = selectedDesignation === "All Designations" || emp.designation === selectedDesignation
      const matchesStatus = selectedStatus === "All Status" || emp.status === selectedStatus
      return matchesName && matchesId && matchesDesignation && matchesStatus
    })
  }, [searchName, searchId, selectedDesignation, selectedStatus])

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredEmployees.length / rowsPerPage)),
    [filteredEmployees.length, rowsPerPage]
  )

  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredEmployees.slice(start, start + rowsPerPage)
  }, [filteredEmployees, currentPage, rowsPerPage])

  const stats = useMemo(() => ({
    totalEmployees: PAYROLL_DATA.length,
    totalPayroll: PAYROLL_DATA.reduce((sum, emp) => sum + emp.salary, 0),
    paidCount: PAYROLL_DATA.filter((emp) => emp.status === "paid").length,
    pendingCount: PAYROLL_DATA.filter((emp) => emp.status === "pending").length,
  }), [])

  const formatCurrency = useCallback((amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount), [])

  const formatDate = useCallback((dateString: string | null) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }, [])

  const goToPage = useCallback((page: number) => {
    setCurrentPage((prev) => Math.min(Math.max(1, page), Math.max(1, Math.ceil(filteredEmployees.length / rowsPerPage))))
  }, [filteredEmployees.length, rowsPerPage])

  const clearFilters = useCallback(() => {
    setSearchName("")
    setSearchId("")
    setSelectedDesignation("All Designations")
    setSelectedStatus("All Status")
  }, [])

  const handleView = useCallback((employee: PayrollEmployee) => { setSelectedEmployee(employee); setViewModalOpen(true) }, [])
  const handleEdit = useCallback((employee: PayrollEmployee) => { setSelectedEmployee(employee); setEditModalOpen(true) }, [])
  const handleDelete = useCallback((employee: PayrollEmployee) => { setSelectedEmployee(employee); setDeleteModalOpen(true) }, [])
  const handleCloseView = useCallback(() => { setViewModalOpen(false); setSelectedEmployee(null) }, [])
  const handleCloseEdit = useCallback(() => { setEditModalOpen(false); setSelectedEmployee(null) }, [])
  const handleCloseDelete = useCallback(() => { setDeleteModalOpen(false); setSelectedEmployee(null) }, [])

  return {
    searchName, setSearchName,
    searchId, setSearchId,
    selectedDesignation, setSelectedDesignation,
    selectedStatus, setSelectedStatus,
    filteredEmployees,
    paginatedEmployees,
    currentPage,
    totalPages,
    rowsPerPage,
    setRowsPerPage,
    goToPage,
    stats,
    formatCurrency, formatDate, clearFilters,
    selectedEmployee,
    viewModalOpen, editModalOpen, deleteModalOpen, payrollModalOpen,
    setPayrollModalOpen,
    handleView, handleEdit, handleDelete,
    handleCloseView, handleCloseEdit, handleCloseDelete,
  }
}
