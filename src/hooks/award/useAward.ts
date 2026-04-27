import { useCallback, useEffect, useMemo, useState } from "react"
import {
  AWARD_DATA,
  AWARD_PAGE_SIZE_OPTIONS,
  getAllowedAwardActions,
} from "@/constants/award"
import { AwardAction, AwardComment, AwardCreatePayload, AwardRequest, AwardStats, UseAwardReturn } from "@/types/award.types"

export function useAward(): UseAwardReturn {
  const [requests, setRequests] = useState<AwardRequest[]>(AWARD_DATA)
  const [activeRole, setActiveRole] = useState<"employee" | "manager" | "hr" | "finance">("hr")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [rowsPerPage, setRowsPerPage] = useState<number>(AWARD_PAGE_SIZE_OPTIONS[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editingRequest, setEditingRequest] = useState<AwardRequest | null>(null)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<AwardRequest | null>(null)
  const [actionOpen, setActionOpen] = useState(false)
  const [actionType, setActionType] = useState<AwardAction | null>(null)
  const [actionRequest, setActionRequest] = useState<AwardRequest | null>(null)

  const roleScopedRequests = useMemo(() => {
    if (activeRole === "manager") {
      return requests.filter((item) => item.workflow.manager.status === "pending" || item.nomination.nominatorRole === "manager")
    }

    if (activeRole === "finance") {
      return requests.filter((item) => item.reward.financeSettlementRequired || item.status === "pending_finance")
    }

    return requests
  }, [requests, activeRole])

  const stats: AwardStats = useMemo(() => ({
    total: roleScopedRequests.length,
    pending: roleScopedRequests.filter((item) => ["submitted", "under_review", "pending_manager", "pending_hr", "pending_finance"].includes(item.status)).length,
    approved: roleScopedRequests.filter((item) => item.status === "approved").length,
    published: roleScopedRequests.filter((item) => item.status === "published").length,
    budgetUsed: roleScopedRequests.filter((item) => ["approved", "published", "fulfilled"].includes(item.status)).reduce((sum, item) => sum + item.reward.rewardValue, 0),
  }), [roleScopedRequests])

  const filteredRequests = useMemo(() => {
    const query = searchQuery.toLowerCase()
    return roleScopedRequests.filter((item) => {
      const matchesSearch =
        item.employee.employeeName.toLowerCase().includes(query) ||
        item.employee.employeeCode.toLowerCase().includes(query) ||
        item.summary.awardTitle.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query)

      const matchesDepartment = selectedDepartment === "All Departments" || item.employee.department === selectedDepartment
      const matchesStatus = selectedStatus === "all" || item.status === selectedStatus
      const matchesType = selectedType === "all" || item.summary.awardType === selectedType

      return matchesSearch && matchesDepartment && matchesStatus && matchesType
    })
  }, [roleScopedRequests, searchQuery, selectedDepartment, selectedStatus, selectedType])

  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredRequests.length / rowsPerPage)), [filteredRequests.length, rowsPerPage])

  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredRequests.slice(start, start + rowsPerPage)
  }, [filteredRequests, currentPage, rowsPerPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedDepartment, selectedStatus, selectedType, rowsPerPage])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  useEffect(() => {
    if (selectedRequest) {
      const latest = requests.find((item) => item.id === selectedRequest.id) ?? null
      setSelectedRequest(latest)
    }

    if (editingRequest) {
      const latest = requests.find((item) => item.id === editingRequest.id) ?? null
      setEditingRequest(latest)
    }

    if (actionRequest) {
      const latest = requests.find((item) => item.id === actionRequest.id) ?? null
      setActionRequest(latest)
    }
  }, [requests, selectedRequest, editingRequest, actionRequest])

  const goToPage = useCallback((page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }, [totalPages])

  const handleView = useCallback((request: AwardRequest) => {
    setSelectedRequest(request)
    setViewOpen(true)
  }, [])

  const handleCloseView = useCallback(() => {
    setViewOpen(false)
    setSelectedRequest(null)
  }, [])

  const openEditModal = useCallback((request: AwardRequest) => {
    setViewOpen(false)
    setEditingRequest(request)
    setEditOpen(true)
  }, [])

  const closeEditModal = useCallback(() => {
    setEditOpen(false)
    setEditingRequest(null)
  }, [])

  const openActionModal = useCallback((request: AwardRequest, action: AwardAction) => {
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
    const allowed = getAllowedAwardActions(actionRequest, activeRole)
    if (!(allowed as readonly AwardAction[]).includes(actionType)) {
      closeActionModal()
      return
    }

    const actorName = activeRole === "manager" ? actionRequest.employee.manager : activeRole === "hr" ? "HR Admin" : activeRole === "finance" ? "Finance Team" : actionRequest.nomination.nominatorName
    const today = new Date().toISOString().slice(0, 10)

    setRequests((prev) =>
      prev.map((item) => {
        if (item.id !== actionRequest.id) return item

        const next = { ...item }

        if (actionType === "submit") {
          next.status = "pending_manager"
          next.workflow.manager = { status: "pending" }
          next.workflow.hr = { status: "pending" }
          next.workflow.finance = item.reward.financeSettlementRequired ? { status: "pending" } : { status: "not_required" }
        }

        if (actionType === "approve") {
          if (activeRole === "manager") {
            next.workflow.manager = { status: "approved", approverName: actorName, actedAt: today, remark: remark || undefined }
            next.status = item.reward.financeSettlementRequired ? "pending_hr" : "pending_hr"
          } else if (activeRole === "hr") {
            next.workflow.hr = { status: "approved", approverName: actorName, actedAt: today, remark: remark || undefined }
            next.status = item.reward.financeSettlementRequired ? "pending_finance" : "approved"
          } else if (activeRole === "finance") {
            next.workflow.finance = { status: "approved", approverName: actorName, actedAt: today, remark: remark || undefined }
            next.status = item.status === "published" ? "fulfilled" : "approved"
            next.reward.fulfillmentStatus = "completed"
          }
        }

        if (actionType === "reject") {
          next.status = "rejected"
          if (activeRole === "manager") next.workflow.manager = { status: "rejected", approverName: actorName, actedAt: today, remark: remark || undefined }
          if (activeRole === "hr") next.workflow.hr = { status: "rejected", approverName: actorName, actedAt: today, remark: remark || undefined }
          if (activeRole === "finance") next.workflow.finance = { status: "rejected", approverName: actorName, actedAt: today, remark: remark || undefined }
        }

        if (actionType === "return") {
          next.status = "returned"
        }

        if (actionType === "publish") {
          next.status = "published"
        }

        if (actionType === "fulfill") {
          next.status = "fulfilled"
          next.reward.fulfillmentStatus = "completed"
        }

        if (actionType === "cancel") {
          next.status = "cancelled"
        }

        next.auditTrail = [
          {
            id: `aud-${Date.now()}`,
            action: `${activeRole} ${actionType}`,
            actorRole: activeRole,
            actorName,
            date: today,
            remark: remark || undefined,
          },
          ...next.auditTrail,
        ]

        next.notifications = [
          {
            id: `not-${Date.now()}`,
            target: "employee",
            message: `Award request ${next.id} moved to ${next.status.replace(/_/g, " ")}.`,
            sentAt: today,
          },
          ...next.notifications,
        ]

        return next
      })
    )

    closeActionModal()
  }, [actionRequest, actionType, activeRole, closeActionModal])

  const handleAddRequest = useCallback((payload: AwardCreatePayload) => {
    const now = Date.now()
    const newRequest: AwardRequest = {
      id: `AWD-${String(now).slice(-4)}`,
      status: "draft",
      employee: {
        employeeId: String(now),
        employeeCode: payload.employeeCode,
        employeeName: payload.employeeName,
        avatar: payload.employeeName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase(),
        department: payload.department,
        designation: payload.designation,
        manager: payload.manager,
        location: payload.location,
        joiningDate: payload.joiningDate,
      },
      summary: {
        awardType: payload.awardType,
        category: payload.category,
        awardTitle: payload.awardTitle,
        citation: payload.citation,
        achievementDate: payload.achievementDate,
        awardPeriod: payload.awardPeriod,
        visibility: payload.visibility,
        publishDate: payload.publishDate,
      },
      nomination: {
        nominationSource: payload.nominationSource,
        nominatorName: payload.nominatorName,
        nominatorRole: payload.nominationSource === "manager" ? "manager" : payload.nominationSource === "hr" ? "hr" : "employee",
        businessJustification: payload.businessJustification,
        linkedValues: payload.linkedValues,
        competencies: payload.competencies,
      },
      reward: {
        rewardKind: payload.rewardKind,
        currency: payload.currency,
        rewardValue: payload.rewardValue,
        oldBonusEquivalent: 0,
        newBonusEquivalent: payload.rewardValue,
        taxable: payload.taxable,
        financeSettlementRequired: payload.financeSettlementRequired,
        fulfillmentStatus: "not_started",
        allowancesImpact: [],
        benefitsImpact: [],
      },
      performance: {
        rating: payload.rating,
        kpis: payload.kpis,
        achievements: payload.achievements,
        appraisalSummary: payload.appraisalSummary,
      },
      workflow: {
        manager: { status: "pending" },
        hr: { status: "pending" },
        finance: payload.financeSettlementRequired ? { status: "pending" } : { status: "not_required" },
      },
      attachments: payload.attachmentNames.map((name, index) => ({
        id: `att-${now}-${index}`,
        name,
        fileType: name.split(".").pop() ?? "file",
        uploadedBy: payload.nominatorName,
        uploadedAt: new Date().toISOString().slice(0, 10),
      })),
      comments: [],
      auditTrail: [
        { id: `aud-${now}`, action: "Draft created", actorRole: "employee", actorName: payload.nominatorName, date: new Date().toISOString().slice(0, 10) },
      ],
      notifications: [],
    }

    setRequests((prev) => [newRequest, ...prev])
    setSelectedRequest(newRequest)
    setViewOpen(true)
    setAddOpen(false)
  }, [])

  const handleUpdateRequest = useCallback((payload: AwardCreatePayload) => {
    if (!editingRequest) return

    setRequests((prev) =>
      prev.map((item) => {
        if (item.id !== editingRequest.id) return item

        return {
          ...item,
          employee: {
            ...item.employee,
            employeeCode: payload.employeeCode,
            employeeName: payload.employeeName,
            avatar: payload.employeeName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase(),
            department: payload.department,
            designation: payload.designation,
            manager: payload.manager,
            location: payload.location,
            joiningDate: payload.joiningDate,
          },
          summary: {
            ...item.summary,
            awardType: payload.awardType,
            category: payload.category,
            awardTitle: payload.awardTitle,
            citation: payload.citation,
            achievementDate: payload.achievementDate,
            awardPeriod: payload.awardPeriod,
            visibility: payload.visibility,
            publishDate: payload.publishDate,
          },
          nomination: {
            ...item.nomination,
            nominationSource: payload.nominationSource,
            nominatorName: payload.nominatorName,
            nominatorRole: payload.nominationSource === "manager" ? "manager" : payload.nominationSource === "hr" ? "hr" : "employee",
            businessJustification: payload.businessJustification,
            linkedValues: payload.linkedValues,
            competencies: payload.competencies,
          },
          reward: {
            ...item.reward,
            rewardKind: payload.rewardKind,
            currency: payload.currency,
            rewardValue: payload.rewardValue,
            newBonusEquivalent: payload.rewardValue,
            taxable: payload.taxable,
            financeSettlementRequired: payload.financeSettlementRequired,
          },
          performance: {
            ...item.performance,
            rating: payload.rating,
            kpis: payload.kpis,
            achievements: payload.achievements,
            appraisalSummary: payload.appraisalSummary,
          },
          attachments: payload.attachmentNames.map((name, index) => ({
            id: `att-${editingRequest.id}-${index}`,
            name,
            fileType: name.split(".").pop() ?? "file",
            uploadedBy: payload.nominatorName,
            uploadedAt: new Date().toISOString().slice(0, 10),
          })),
          auditTrail: [
            {
              id: `aud-${Date.now()}`,
              action: "Award nomination updated",
              actorRole: activeRole,
              actorName: payload.nominatorName,
              date: new Date().toISOString().slice(0, 10),
            },
            ...item.auditTrail,
          ],
        }
      })
    )

    setEditOpen(false)
    setViewOpen(true)
  }, [editingRequest, activeRole])

  const addComment = useCallback((requestId: string, text: string, internal: boolean) => {
    if (!text.trim()) return
    const authorName = activeRole === "manager" ? "Manager" : activeRole === "hr" ? "HR Admin" : activeRole === "finance" ? "Finance Team" : "Employee"
    const comment: AwardComment = {
      id: `com-${Date.now()}`,
      authorRole: activeRole,
      authorName,
      text: text.trim(),
      internal,
      createdAt: new Date().toISOString().slice(0, 10),
    }

    setRequests((prev) => prev.map((item) => item.id === requestId ? { ...item, comments: [comment, ...item.comments] } : item))
  }, [activeRole])

  const clearFilters = useCallback(() => {
    setSearchQuery("")
    setSelectedDepartment("All Departments")
    setSelectedStatus("all")
    setSelectedType("all")
  }, [])

  return {
    requests,
    filteredRequests,
    paginatedRequests,
    stats,
    activeRole,
    setActiveRole,
    searchQuery,
    setSearchQuery,
    selectedDepartment,
    setSelectedDepartment,
    selectedStatus,
    setSelectedStatus,
    selectedType,
    setSelectedType,
    rowsPerPage,
    setRowsPerPage,
    currentPage,
    totalPages,
    goToPage,
    addOpen,
    setAddOpen,
    editOpen,
    setEditOpen,
    editingRequest,
    viewOpen,
    setViewOpen,
    selectedRequest,
    actionOpen,
    actionType,
    actionRequest,
    openActionModal,
    closeActionModal,
    confirmAction,
    handleView,
    handleCloseView,
    openEditModal,
    closeEditModal,
    handleAddRequest,
    handleUpdateRequest,
    addComment,
    clearFilters,
  }
}
