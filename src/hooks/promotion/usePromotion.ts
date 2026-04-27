import { useCallback, useEffect, useMemo, useState } from "react"
import {
  getAllowedPromotionActions,
  PROMOTION_DATA,
  PROMOTION_PAGE_SIZE_OPTIONS,
} from "@/constants/promotion"
import {
  PromotionAction,
  PromotionComment,
  PromotionRequest,
  PromotionStats,
  UsePromotionReturn,
} from "@/types/promotion.types"

export function usePromotion(): UsePromotionReturn {
  const [requests, setRequests] = useState<PromotionRequest[]>(PROMOTION_DATA)
  const [activeRole, setActiveRole] = useState<"employee" | "manager" | "hr" | "higher_authority">("hr")
  const [currentEmployeeId, setCurrentEmployeeId] = useState("EMP-2401")
  const [currentManagerName, setCurrentManagerName] = useState("Nisha Verma")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [rowsPerPage, setRowsPerPage] = useState<number>(PROMOTION_PAGE_SIZE_OPTIONS[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [addOpen, setAddOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<PromotionRequest | null>(null)
  const [actionOpen, setActionOpen] = useState(false)
  const [actionType, setActionType] = useState<PromotionAction | null>(null)
  const [actionRequest, setActionRequest] = useState<PromotionRequest | null>(null)

  const roleScopedRequests = useMemo(() => {
    if (activeRole === "employee") {
      return requests.filter((item) => item.employee.id === currentEmployeeId)
    }

    if (activeRole === "manager") {
      return requests.filter((item) => item.currentRole.reportingManager === currentManagerName)
    }

    return requests
  }, [requests, activeRole, currentEmployeeId, currentManagerName])

  const stats: PromotionStats = useMemo(
    () => ({
      total: roleScopedRequests.length,
      pending: roleScopedRequests.filter((item) => item.status === "pending_approval").length,
      approved: roleScopedRequests.filter((item) => item.status === "approved").length,
      rejected: roleScopedRequests.filter((item) => item.status === "rejected").length,
    }),
    [roleScopedRequests]
  )

  const filteredRequests = useMemo(() => {
    const query = searchQuery.toLowerCase()

    return roleScopedRequests.filter((item) => {
      const matchesSearch =
        item.employee.name.toLowerCase().includes(query) ||
        item.employee.id.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query)

      const matchesDepartment =
        selectedDepartment === "All Departments" || item.employee.department === selectedDepartment

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

  const handleView = useCallback((request: PromotionRequest) => {
    setSelectedRequest(request)
    setViewOpen(true)
  }, [])

  const handleCloseView = useCallback(() => {
    setViewOpen(false)
    setSelectedRequest(null)
  }, [])

  const openActionModal = useCallback((request: PromotionRequest, action: PromotionAction) => {
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

    const allowedActions = getAllowedPromotionActions(actionRequest, activeRole)
    if (!(allowedActions as readonly PromotionAction[]).includes(actionType)) {
      closeActionModal()
      return
    }

    const actorName =
      activeRole === "employee"
        ? actionRequest.employee.name
        : activeRole === "manager"
          ? currentManagerName
          : activeRole === "hr"
            ? "HR Admin"
            : "Executive Authority"

    setRequests((prev) =>
      prev.map((item) =>
        item.id === actionRequest.id
          ? {
              ...item,
              status: deriveNextStatus(item, actionType, activeRole),
              approvalWorkflow: deriveNextWorkflow(item, actionType, activeRole, actorName, remark),
              auditTrail: [
                {
                  id: `aud-${Date.now()}`,
                  action: `${activeRole} ${actionType}`,
                  actorRole: activeRole,
                  actorName,
                  remark: remark.trim() || undefined,
                  date: new Date().toISOString().slice(0, 10),
                },
                ...item.auditTrail,
              ],
              notifications: [
                {
                  id: `not-${Date.now()}`,
                  target: "employee",
                  message: `Promotion request ${item.id} was ${actionType} by ${actorName}.`,
                  sentAt: new Date().toISOString().slice(0, 10),
                },
                {
                  id: `not-${Date.now()}-hr`,
                  target: "hr",
                  message: `Promotion request ${item.id} moved to status ${deriveNextStatus(item, actionType, activeRole)}.`,
                  sentAt: new Date().toISOString().slice(0, 10),
                },
                ...item.notifications,
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
      joiningDate: string
      department: string
      currentDesignation: string
      currentResponsibilities: string[]
      proposedDesignation: string
      proposedDepartment: string
      reportingManager: string
      proposedReportingManager: string
      requestedDate: string
      effectiveDate: string
      currentSalary: number
      proposedSalary: number
      oldBonus: number
      newBonus: number
      allowanceChanges: Array<{ label: string; oldValue: number; newValue: number }>
      benefitChanges: Array<{ label: string; oldValue: string; newValue: string }>
      performanceRating: number
      kpis: string[]
      achievements: string[]
      appraisalHistory: string
      justification: string
      promotionType: "vertical" | "lateral" | "temporary"
      probationMonths: number
      requiresHigherAuthority: boolean
      attachmentNames: string[]
    }) => {
      const newRequest: PromotionRequest = {
        id: `PRO-${Date.now().toString().slice(-4)}`,
        status: "draft",
        employee: {
          id: payload.employeeId,
          name: payload.employeeName,
          avatar: payload.employeeName
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase(),
          department: payload.department,
          joiningDate: payload.joiningDate,
        },
        currentRole: {
          designation: payload.currentDesignation,
          responsibilities: payload.currentResponsibilities,
          salary: payload.currentSalary,
          reportingManager: payload.reportingManager,
        },
        proposedPromotion: {
          designation: payload.proposedDesignation,
          department: payload.proposedDepartment,
          reportingManager: payload.proposedReportingManager,
          effectiveDate: payload.effectiveDate,
          promotionType: payload.promotionType,
        },
        salaryRevision: {
          oldSalary: payload.currentSalary,
          newSalary: payload.proposedSalary,
          oldBonus: payload.oldBonus,
          newBonus: payload.newBonus,
          allowanceChanges: payload.allowanceChanges,
          benefitChanges: payload.benefitChanges,
        },
        reasonForPromotion: payload.justification,
        performanceSummary: {
          rating: payload.performanceRating,
          kpis: payload.kpis,
          achievements: payload.achievements,
          appraisalHistory: payload.appraisalHistory,
        },
        approvalWorkflow: {
          manager: { status: "pending" },
          hr: { status: "pending" },
          higherAuthority: payload.requiresHigherAuthority ? { status: "pending" } : { status: "not_required" },
        },
        requiresHigherAuthority: payload.requiresHigherAuthority,
        timeline: {
          promotionStartDate: payload.effectiveDate,
          probationMonths: payload.probationMonths,
        },
        attachments: payload.attachmentNames.map((name, index) => ({
          id: `att-${Date.now()}-${index}`,
          name,
          fileType: name.split(".").pop() ?? "file",
          uploadedBy: payload.employeeName,
          uploadedAt: payload.requestedDate,
        })),
        auditTrail: [
          {
            id: `aud-${Date.now()}`,
            action: "Draft created",
            actorRole: "employee",
            actorName: payload.employeeName,
            remark: "Promotion request draft created",
            date: payload.requestedDate,
          },
        ],
        notifications: [],
        comments: [],
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

  const addComment = useCallback((requestId: string, text: string) => {
    if (!text.trim()) return

    const authorName =
      activeRole === "employee"
        ? "Employee"
        : activeRole === "manager"
          ? currentManagerName
          : activeRole === "hr"
            ? "HR Admin"
            : "Executive Authority"

    const comment: PromotionComment = {
      id: `com-${Date.now()}`,
      authorRole: activeRole,
      authorName,
      text: text.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
    }

    setRequests((prev) =>
      prev.map((item) =>
        item.id === requestId
          ? {
              ...item,
              comments: [comment, ...item.comments],
              auditTrail: [
                {
                  id: `aud-${Date.now()}-comment`,
                  action: "Comment added",
                  actorRole: activeRole,
                  actorName,
                  date: new Date().toISOString().slice(0, 10),
                },
                ...item.auditTrail,
              ],
            }
          : item
      )
    )
  }, [activeRole, currentManagerName])

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
    addComment,
    handleView,
    handleCloseView,
    handleAddRequest,
    clearFilters,
  }
}

function deriveNextStatus(request: PromotionRequest, action: PromotionAction, role: "employee" | "manager" | "hr" | "higher_authority") {
  if (action === "reject") return "rejected"
  if (action === "submit") return "pending_approval"

  if (role === "manager") {
    return request.requiresHigherAuthority ? "pending_approval" : "pending_approval"
  }

  if (role === "hr") {
    if (request.requiresHigherAuthority) return "pending_approval"
    return "approved"
  }

  if (role === "higher_authority") {
    return "approved"
  }

  return request.status
}

function deriveNextWorkflow(
  request: PromotionRequest,
  action: PromotionAction,
  role: "employee" | "manager" | "hr" | "higher_authority",
  actorName: string,
  remark: string
) {
  const date = new Date().toISOString().slice(0, 10)
  const next = { ...request.approvalWorkflow }

  if (action === "submit") {
    next.manager = { status: "pending" }
    next.hr = { status: "pending" }
    next.higherAuthority = request.requiresHigherAuthority ? { status: "pending" } : { status: "not_required" }
    return next
  }

  if (action === "reject") {
    if (role === "manager") next.manager = { status: "rejected", approverName: actorName, actedAt: date, remark: remark.trim() || undefined }
    if (role === "hr") next.hr = { status: "rejected", approverName: actorName, actedAt: date, remark: remark.trim() || undefined }
    if (role === "higher_authority") next.higherAuthority = { status: "rejected", approverName: actorName, actedAt: date, remark: remark.trim() || undefined }
    return next
  }

  if (action === "approve") {
    if (role === "manager") {
      next.manager = { status: "approved", approverName: actorName, actedAt: date, remark: remark.trim() || undefined }
    }
    if (role === "hr") {
      next.hr = { status: "approved", approverName: actorName, actedAt: date, remark: remark.trim() || undefined }
    }
    if (role === "higher_authority") {
      next.higherAuthority = { status: "approved", approverName: actorName, actedAt: date, remark: remark.trim() || undefined }
    }
  }

  return next
}
