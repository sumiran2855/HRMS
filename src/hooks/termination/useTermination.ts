import { useCallback, useMemo, useState } from "react"
import {
  getAllowedTerminationActions,
  TERMINATION_DATA,
  TERMINATION_PAGE_SIZE_OPTIONS,
} from "@/constants/termination"
import {
  TerminationAction,
  TerminationRequest,
  TerminationStats,
  UseTerminationReturn,
} from "@/types/termination.types"

export function useTermination(): UseTerminationReturn {
  const [requests, setRequests] = useState<TerminationRequest[]>(TERMINATION_DATA)
  const [activeRole, setActiveRole] = useState<"manager" | "hr" | "admin">("hr")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedType, setSelectedType] = useState("all")
  const [rowsPerPage, setRowsPerPage] = useState<number>(TERMINATION_PAGE_SIZE_OPTIONS[0])
  const [currentPage, setCurrentPage] = useState(1)

  const [addOpen, setAddOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<TerminationRequest | null>(null)
  const [actionOpen, setActionOpen] = useState(false)
  const [actionType, setActionType] = useState<TerminationAction | null>(null)

  const setSearchQueryWithReset = useCallback((value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }, [])

  const setSelectedStatusWithReset = useCallback((value: string) => {
    setSelectedStatus(value)
    setCurrentPage(1)
  }, [])

  const setSelectedDepartmentWithReset = useCallback((value: string) => {
    setSelectedDepartment(value)
    setCurrentPage(1)
  }, [])

  const setSelectedTypeWithReset = useCallback((value: string) => {
    setSelectedType(value)
    setCurrentPage(1)
  }, [])

  const setRowsPerPageWithReset = useCallback((value: number) => {
    setRowsPerPage(value)
    setCurrentPage(1)
  }, [])

  const filteredRequests = useMemo(() => {
    const q = searchQuery.toLowerCase()

    return requests.filter((item) => {
      const matchesSearch =
        item.employeeName.toLowerCase().includes(q) ||
        item.employeeId.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)

      const matchesStatus = selectedStatus === "all" || item.status === selectedStatus
      const matchesDepartment = selectedDepartment === "All Departments" || item.department === selectedDepartment
      const matchesType = selectedType === "all" || item.terminationType === selectedType

      return matchesSearch && matchesStatus && matchesDepartment && matchesType
    })
  }, [requests, searchQuery, selectedStatus, selectedDepartment, selectedType])

  const stats: TerminationStats = useMemo(
    () => ({
      total: requests.length,
      pending: requests.filter((item) => item.status === "pending").length,
      approved: requests.filter((item) => item.status === "approved").length,
      completed: requests.filter((item) => item.status === "completed").length,
    }),
    [requests]
  )

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredRequests.length / rowsPerPage)),
    [filteredRequests.length, rowsPerPage]
  )

  const safeCurrentPage = useMemo(
    () => Math.min(currentPage, Math.max(1, totalPages)),
    [currentPage, totalPages]
  )

  const paginatedRequests = useMemo(() => {
    const start = (safeCurrentPage - 1) * rowsPerPage
    return filteredRequests.slice(start, start + rowsPerPage)
  }, [filteredRequests, safeCurrentPage, rowsPerPage])

  const goToPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return
      setCurrentPage(page)
    },
    [totalPages]
  )

  const clearFilters = useCallback(() => {
    setSearchQuery("")
    setSelectedStatus("all")
    setSelectedDepartment("All Departments")
    setSelectedType("all")
    setCurrentPage(1)
  }, [])

  const handleView = useCallback((request: TerminationRequest) => {
    setSelectedRequest(request)
    setViewOpen(true)
  }, [])

  const handleEdit = useCallback((request: TerminationRequest) => {
    setSelectedRequest(request)
    setAddOpen(true)
  }, [])

  const handleCloseView = useCallback(() => {
    setViewOpen(false)
    setSelectedRequest(null)
  }, [])

  const openActionModal = useCallback((request: TerminationRequest, action: TerminationAction) => {
    setSelectedRequest(request)
    setActionType(action)
    setActionOpen(true)
  }, [])

  const closeActionModal = useCallback(() => {
    setActionOpen(false)
    setActionType(null)
    setSelectedRequest(null)
  }, [])

  const confirmAction = useCallback(
    (remark: string) => {
      if (!selectedRequest || !actionType) return

      const allowed = getAllowedTerminationActions(selectedRequest.status, activeRole)
      if (!(allowed as readonly TerminationAction[]).includes(actionType)) {
        closeActionModal()
        return
      }

      const nextStatus = actionType === "approve" ? "approved" : actionType === "reject" ? "rejected" : "completed"

      setRequests((prev) =>
        prev.map((item) =>
          item.id === selectedRequest.id
            ? {
                ...item,
                status: nextStatus,
                finalSettlementStatus: actionType === "complete" ? "processed" : item.finalSettlementStatus,
                history: [
                  {
                    id: `hst-${Date.now()}`,
                    action: actionType,
                    actorRole: activeRole,
                    actorName: activeRole === "admin" ? "System Admin" : activeRole === "hr" ? "HR Admin" : item.managerName,
                    remark: remark.trim() || undefined,
                    date: new Date().toISOString().slice(0, 10),
                  },
                  ...item.history,
                ],
              }
            : item
        )
      )

      closeActionModal()
    },
    [selectedRequest, actionType, activeRole, closeActionModal]
  )

  const handleSaveRequest = useCallback(
    (payload: {
      employeeId: string
      employeeName: string
      department: string
      designation: string
      managerName: string
      terminationType: "Performance" | "Disciplinary" | "Redundancy" | "Contract End"
      reason: string
      effectiveDate: string
      initiatedDate: string
      finalSettlementStatus: "pending" | "processed"
    }) => {
      if (selectedRequest) {
        setRequests((prev) =>
          prev.map((item) =>
            item.id === selectedRequest.id
              ? {
                  ...item,
                  ...payload,
                  avatar: payload.employeeName
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase(),
                }
              : item
          )
        )
      } else {
        const newRequest: TerminationRequest = {
          id: `TRM-${Math.floor(1000 + Math.random() * 9000)}`,
          ...payload,
          avatar: payload.employeeName
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase(),
          status: "pending",
          history: [
            {
              id: `hst-${Date.now()}`,
              action: "submitted",
              actorRole: "manager",
              actorName: payload.managerName,
              date: payload.initiatedDate,
            },
          ],
        }

        setRequests((prev) => [newRequest, ...prev])
      }

      setAddOpen(false)
      setSelectedRequest(null)
    },
    [selectedRequest]
  )

  return {
    requests,
    filteredRequests,
    paginatedRequests,
    stats,
    searchQuery,
    setSearchQuery: setSearchQueryWithReset,
    selectedStatus,
    setSelectedStatus: setSelectedStatusWithReset,
    selectedDepartment,
    setSelectedDepartment: setSelectedDepartmentWithReset,
    selectedType,
    setSelectedType: setSelectedTypeWithReset,
    rowsPerPage,
    setRowsPerPage: setRowsPerPageWithReset,
    currentPage: safeCurrentPage,
    totalPages,
    goToPage,
    clearFilters,
    addOpen,
    setAddOpen,
    viewOpen,
    actionOpen,
    selectedRequest,
    actionType,
    handleView,
    handleEdit,
    handleCloseView,
    openActionModal,
    closeActionModal,
    confirmAction,
    handleSaveRequest,
  }
}
