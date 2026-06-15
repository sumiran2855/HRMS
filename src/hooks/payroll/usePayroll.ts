"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { PayrollEmployee, UsePayrollReturn } from "@/types/payroll.types"
import { useEmployee } from "@/hooks/employee/useEmployee"
import { Employee } from "@/types/employee.types"

function mapToPayrollEmployee(e: Employee): PayrollEmployee {
  const salary =
    (e.bankDetails?.salary as number | undefined) ??
    e.salary ??
    0
  const accountNumber = e.bankDetails?.accountNumber
  return {
    _id: e._id,
    id: e.employeeId || e._id,
    name: `${e.firstName} ${e.lastName}`,
    designation: e.employeeDesignation || "",
    email: e.email,
    joiningDate: e.joiningDate || e.hireDate || "",
    salary,
    status: e.isActive !== false ? "paid" : "pending",
    paymentDate: e.joiningDate || null,
    phone: e.contactInfo?.phone || e.contactNumber || e.phone || undefined,
    bankAccount: accountNumber ? `****${accountNumber.slice(-4)}` : undefined,
    bankName: e.bankDetails?.bankName || undefined,
    address: e.contactInfo?.address || e.address || undefined,
  }
}

export function usePayroll(): UsePayrollReturn {
  const [searchName, setSearchName] = useState("")
  const [searchId, setSearchId] = useState("")
  const [selectedDesignation, setSelectedDesignation] = useState("All Designations")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [allEmployees, setAllEmployees] = useState<PayrollEmployee[]>([])
  const { getEmployees, getEmployeeById } = useEmployee()

  useEffect(() => {
    getEmployees().then((res) => {
      if (res.success && res.data) {
        setAllEmployees(res.data.map(mapToPayrollEmployee))
      }
    }).catch(() => {})
  }, [getEmployees])

  useEffect(() => { setCurrentPage(1) }, [searchName, searchId, selectedDesignation, selectedStatus])

  // Modal state
  const [selectedEmployee, setSelectedEmployee] = useState<PayrollEmployee | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [payrollModalOpen, setPayrollModalOpen] = useState(false)

  const filteredEmployees = useMemo(() => {
    return allEmployees.filter((emp) => {
      const matchesName = emp.name.toLowerCase().includes(searchName.toLowerCase())
      const matchesId = emp.id.toLowerCase().includes(searchId.toLowerCase())
      const matchesDesignation = selectedDesignation === "All Designations" || emp.designation === selectedDesignation
      const matchesStatus = selectedStatus === "All Status" || emp.status === selectedStatus
      return matchesName && matchesId && matchesDesignation && matchesStatus
    })
  }, [allEmployees, searchName, searchId, selectedDesignation, selectedStatus])

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredEmployees.length / rowsPerPage)),
    [filteredEmployees.length, rowsPerPage]
  )

  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredEmployees.slice(start, start + rowsPerPage)
  }, [filteredEmployees, currentPage, rowsPerPage])

  const stats = useMemo(() => ({
    totalEmployees: allEmployees.length,
    totalPayroll: allEmployees.reduce((sum, emp) => sum + emp.salary, 0),
    paidCount: allEmployees.filter((emp) => emp.status === "paid").length,
    pendingCount: allEmployees.filter((emp) => emp.status === "pending").length,
  }), [allEmployees])

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

  const handleView = useCallback(async (employee: PayrollEmployee) => {
    setSelectedEmployee(employee)
    setViewModalOpen(true)
    // Fetch full details to get phone & bank account
    if (employee._id) {
      try {
        const res = await getEmployeeById(employee._id)
        if (res.success && res.data) {
          const full = res.data
          const accountNumber = full.bankDetails?.accountNumber
          setSelectedEmployee((prev) =>
            prev ? {
              ...prev,
              phone: full.contactInfo?.phone || full.contactNumber || full.phone || prev.phone,
              bankAccount: accountNumber ? `****${accountNumber.slice(-4)}` : prev.bankAccount,
              bankName: full.bankDetails?.bankName || prev.bankName,
              address: full.contactInfo?.address || full.address || prev.address,
            } : prev
          )
        }
      } catch { /* keep existing data */ }
    }
  }, [getEmployeeById])
  const handleEdit = useCallback(async (employee: PayrollEmployee) => {
    // Fetch full details first so modal initializes with correct phone/bank data
    if (employee._id) {
      try {
        const res = await getEmployeeById(employee._id)
        if (res.success && res.data) {
          const full = res.data
          const accountNumber = full.bankDetails?.accountNumber
          const enriched: PayrollEmployee = {
            ...employee,
            phone: full.contactInfo?.phone || full.contactNumber || full.phone || employee.phone,
            bankAccount: accountNumber ? `****${accountNumber.slice(-4)}` : employee.bankAccount,
            bankName: full.bankDetails?.bankName || employee.bankName,
            address: full.contactInfo?.address || full.address || employee.address,
          }
          setSelectedEmployee(enriched)
          setEditModalOpen(true)
          return
        }
      } catch { /* fall through */ }
    }
    setSelectedEmployee(employee)
    setEditModalOpen(true)
  }, [getEmployeeById])
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
    totalCount: allEmployees.length,
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

