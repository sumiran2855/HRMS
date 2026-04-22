"use client"

import { useState, useMemo, useCallback } from "react"
import { Employee, UseHRReturn } from "@/types/hr.types"
import { EMPLOYEES_DATA, DEPARTMENTS_DATA, STATUS_COLOR_MAP } from "@/constants/hr"

export function useHR(): UseHRReturn {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [activeTab, setActiveTab] = useState("employees")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)

  const filteredData = useMemo(() => {
    return EMPLOYEES_DATA.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesDepartment =
        selectedDepartment === "All Departments" || employee.department === selectedDepartment
      const matchesStatus =
        selectedStatus === "All Status" || employee.status === selectedStatus

      return matchesSearch && matchesDepartment && matchesStatus
    })
  }, [searchTerm, selectedDepartment, selectedStatus])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * entriesPerPage
    return filteredData.slice(startIndex, startIndex + entriesPerPage)
  }, [filteredData, currentPage, entriesPerPage])

  const hrStats = useMemo(() => {
    const totalEmployees = EMPLOYEES_DATA.length
    const activeEmployees = EMPLOYEES_DATA.filter((e) => e.status === "active").length
    const avgSalary = Math.round(
      EMPLOYEES_DATA.reduce((sum, e) => sum + e.salary, 0) / EMPLOYEES_DATA.length
    )
    return {
      totalEmployees,
      activeEmployees,
      avgSalary,
      newHiresThisMonth: 2,
      departmentCount: DEPARTMENTS_DATA.length,
      activePercentage: Math.round((activeEmployees / totalEmployees) * 100),
    }
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    return STATUS_COLOR_MAP[status] || "bg-gray-100 text-gray-700"
  }

  const getPerformanceColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600"
    if (rating >= 4.0) return "text-blue-600"
    if (rating >= 3.5) return "text-yellow-600"
    return "text-red-600"
  }

  // Modal state
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const handleView = useCallback((employee: Employee) => {
    setSelectedEmployee(employee)
    setIsViewOpen(true)
  }, [])

  const handleEdit = useCallback((employee: Employee) => {
    setSelectedEmployee(employee)
    setIsEditOpen(true)
  }, [])

  const handleDelete = useCallback((employee: Employee) => {
    setSelectedEmployee(employee)
    setIsDeleteOpen(true)
  }, [])

  const handleCloseView = useCallback(() => {
    setIsViewOpen(false)
    setSelectedEmployee(null)
  }, [])

  const handleCloseEdit = useCallback(() => {
    setIsEditOpen(false)
    setSelectedEmployee(null)
  }, [])

  const handleCloseDelete = useCallback(() => {
    setIsDeleteOpen(false)
    setSelectedEmployee(null)
  }, [])

  const handleConfirmDelete = useCallback(() => {
    // In production, call API to delete
    setIsDeleteOpen(false)
    setSelectedEmployee(null)
  }, [])

  const handleUpdateEmployee = useCallback((updated: Employee) => {
    // In production, call API to update
    setIsEditOpen(false)
    setSelectedEmployee(null)
  }, [])

  return {
    searchTerm,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    selectedStatus,
    setSelectedStatus,
    activeTab,
    setActiveTab,
    entriesPerPage,
    setEntriesPerPage,
    paginatedData,
    hrStats,
    departments: DEPARTMENTS_DATA,
    formatCurrency,
    getStatusColor,
    getPerformanceColor,
    // Modal state
    isAddOpen,
    setIsAddOpen,
    selectedEmployee,
    isViewOpen,
    isEditOpen,
    isDeleteOpen,
    handleView,
    handleEdit,
    handleDelete,
    handleCloseView,
    handleCloseEdit,
    handleCloseDelete,
    handleConfirmDelete,
    handleUpdateEmployee,
  }
}
