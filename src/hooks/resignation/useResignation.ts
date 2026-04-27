import { useCallback, useEffect, useMemo, useState } from "react"
import {
  RESIGNATION_DATA,
  getAllowedActions,
  RESIGNATION_PAGE_SIZE_OPTIONS,
} from "@/constants/resignation"
import {
  ResignationRequest,
  ResignationStats,
  UseResignationReturn,
  WorkflowAction,
} from "@/types/resignation.types"

export function useResignation(): UseResignationReturn {
  const [requests, setRequests] = useState<ResignationRequest[]>(RESIGNATION_DATA)
  const [activeRole, setActiveRole] = useState<"employee" | "manager" | "hr">("hr")
  const [currentEmployeeId, setCurrentEmployeeId] = useState("EMP-2401")
  const [currentManagerName, setCurrentManagerName] = useState("Nisha Verma")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [rowsPerPage, setRowsPerPage] = useState<number>(RESIGNATION_PAGE_SIZE_OPTIONS[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [addOpen, setAddOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<ResignationRequest | null>(null)
  const [actionOpen, setActionOpen] = useState(false)
  const [actionType, setActionType] = useState<WorkflowAction | null>(null)
  const [actionRequest, setActionRequest] = useState<ResignationRequest | null>(null)

  const roleScopedRequests = useMemo(() => {
    if (activeRole === "employee") {
      return requests.filter((item) => item.employeeId === currentEmployeeId)
    }

    if (activeRole === "manager") {
      return requests.filter((item) => item.reportingManager === currentManagerName)
    }

    return requests
  }, [requests, activeRole, currentEmployeeId, currentManagerName])

  const stats: ResignationStats = useMemo(
    () => ({
      total: roleScopedRequests.length,
      pending: roleScopedRequests.filter((item) => item.status === "pending").length,
      approved: roleScopedRequests.filter((item) => item.status === "approved").length,
      rejected: roleScopedRequests.filter((item) => item.status === "rejected").length,
    }),
    [roleScopedRequests]
  )

  const filteredRequests = useMemo(() => {
    const query = searchQuery.toLowerCase()

    return roleScopedRequests.filter((item) => {
      const matchesSearch =
        item.employeeName.toLowerCase().includes(query) ||
        item.employeeId.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query)

      const matchesDepartment =
        selectedDepartment === "All Departments" || item.department === selectedDepartment

      const matchesStatus = selectedStatus === "all" || item.status === selectedStatus

      return matchesSearch && matchesDepartment && matchesStatus
    })
  }, [roleScopedRequests, searchQuery, selectedDepartment, selectedStatus])

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredRequests.length / rowsPerPage)),
    [filteredRequests.length, rowsPerPage]
  )

  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredRequests.slice(start, start + rowsPerPage)
  }, [filteredRequests, currentPage, rowsPerPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedDepartment, selectedStatus, rowsPerPage])

  const goToPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return
      setCurrentPage(page)
    },
    [totalPages]
  )

  const handleView = useCallback((request: ResignationRequest) => {
    setSelectedRequest(request)
    setViewOpen(true)
  }, [])

  const handleCloseView = useCallback(() => {
    setViewOpen(false)
    setSelectedRequest(null)
  }, [])

  const openActionModal = useCallback((request: ResignationRequest, action: WorkflowAction) => {
    setActionRequest(request)
    setActionType(action)
    setActionOpen(true)
  }, [])

  const closeActionModal = useCallback(() => {
    setActionOpen(false)
    setActionType(null)
    setActionRequest(null)
  }, [])

  const confirmAction = useCallback((remark: string) => {
    if (!actionRequest || !actionType) return

    const allowedActions = getAllowedActions(actionRequest.status, activeRole)
    if (!(allowedActions as readonly WorkflowAction[]).includes(actionType)) {
      closeActionModal()
      return
    }

    const nextStatus =
      actionType === "approve"
        ? "approved"
        : actionType === "reject"
          ? "rejected"
          : "withdrawn"

    const actorName =
      activeRole === "employee"
        ? actionRequest.employeeName
        : activeRole === "manager"
          ? currentManagerName
          : "HR Admin"

    setRequests((prev) =>
      prev.map((item) =>
        item.id === actionRequest.id
          ? {
              ...item,
              status: nextStatus,
              workflowHistory: [
                {
                  id: `wf-${Date.now()}`,
                  action: actionType,
                  actorRole: activeRole,
                  actorName,
                  remark: remark.trim() || undefined,
                  date: new Date().toISOString().slice(0, 10),
                },
                ...item.workflowHistory,
              ],
            }
          : item
      )
    )

    closeActionModal()
  }, [actionRequest, actionType, activeRole, currentManagerName, closeActionModal])

  const handleAddRequest = useCallback(
    (payload: {
      employeeId: string
      employeeName: string
      department: string
      designation: string
      reportingManager: string
      appliedDate: string
      lastWorkingDate: string
      noticePeriodDays: number
      reason: string
    }) => {
      const newRequest: ResignationRequest = {
        id: `RES-${Date.now().toString().slice(-4)}`,
        employeeId: payload.employeeId,
        employeeName: payload.employeeName,
        avatar: payload.employeeName
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
        department: payload.department,
        designation: payload.designation,
        reportingManager: payload.reportingManager,
        appliedDate: payload.appliedDate,
        lastWorkingDate: payload.lastWorkingDate,
        noticePeriodDays: payload.noticePeriodDays,
        handoverProgress: 0,
        reason: payload.reason,
        status: "pending",
        exitInterviewScheduled: false,
        workflowHistory: [
          {
            id: `wf-${Date.now()}`,
            action: "submitted",
            actorRole: "employee",
            actorName: payload.employeeName,
            remark: "Request submitted",
            date: payload.appliedDate,
          },
        ],
      }

      setRequests((prev) => [newRequest, ...prev])
      setAddOpen(false)
    },
    []
  )

  const clearFilters = useCallback(() => {
    setSearchQuery("")
    setSelectedDepartment("All Departments")
    setSelectedStatus("all")
  }, [])

  return {
    requests,
    filteredRequests,
    paginatedRequests,
    stats,
    activeRole,
    setActiveRole,
    currentEmployeeId,
    setCurrentEmployeeId,
    currentManagerName,
    setCurrentManagerName,
    searchQuery,
    setSearchQuery,
    selectedDepartment,
    setSelectedDepartment,
    selectedStatus,
    setSelectedStatus,
    rowsPerPage,
    setRowsPerPage,
    currentPage,
    totalPages,
    goToPage,
    addOpen,
    setAddOpen,
    selectedRequest,
    viewOpen,
    setViewOpen,
    actionOpen,
    actionType,
    actionRequest,
    openActionModal,
    closeActionModal,
    confirmAction,
    handleView,
    handleCloseView,
    handleAddRequest,
    clearFilters,
  }
}
