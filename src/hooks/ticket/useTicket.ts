import { useCallback, useMemo, useState } from "react"
import {
  getAllowedTicketActions,
  TICKET_DATA,
  TICKET_PAGE_SIZE_OPTIONS,
} from "@/constants/ticket"
import {
  TicketAction,
  TicketComment,
  TicketItem,
  TicketStats,
  UseTicketReturn,
} from "@/types/ticket.types"

export function useTicket(): UseTicketReturn {
  const [tickets, setTickets] = useState<TicketItem[]>(TICKET_DATA)
  const [activeRole, setActiveRole] = useState<"employee" | "manager" | "it" | "hr">("hr")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [rowsPerPage, setRowsPerPage] = useState<number>(TICKET_PAGE_SIZE_OPTIONS[0])
  const [currentPage, setCurrentPage] = useState(1)

  const [addOpen, setAddOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<TicketItem | null>(null)
  const [actionOpen, setActionOpen] = useState(false)
  const [actionType, setActionType] = useState<TicketAction | null>(null)

  const setSearchQueryWithReset = useCallback((value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }, [])

  const setSelectedStatusWithReset = useCallback((value: string) => {
    setSelectedStatus(value)
    setCurrentPage(1)
  }, [])

  const setSelectedPriorityWithReset = useCallback((value: string) => {
    setSelectedPriority(value)
    setCurrentPage(1)
  }, [])

  const setSelectedCategoryWithReset = useCallback((value: string) => {
    setSelectedCategory(value)
    setCurrentPage(1)
  }, [])

  const setRowsPerPageWithReset = useCallback((value: number) => {
    setRowsPerPage(value)
    setCurrentPage(1)
  }, [])

  const filteredTickets = useMemo(() => {
    const q = searchQuery.toLowerCase()

    return tickets.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.requesterName.toLowerCase().includes(q)

      const matchesStatus = selectedStatus === "all" || item.status === selectedStatus
      const matchesPriority = selectedPriority === "all" || item.priority === selectedPriority
      const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory
    })
  }, [tickets, searchQuery, selectedStatus, selectedPriority, selectedCategory])

  const stats: TicketStats = useMemo(
    () => ({
      total: tickets.length,
      open: tickets.filter((item) => item.status === "open" || item.status === "in_progress").length,
      resolved: tickets.filter((item) => item.status === "resolved" || item.status === "closed").length,
      overdue: tickets.filter((item) => item.status !== "closed" && item.status !== "resolved" && new Date(item.dueDate) < new Date()).length,
    }),
    [tickets]
  )

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredTickets.length / rowsPerPage)),
    [filteredTickets.length, rowsPerPage]
  )

  const safeCurrentPage = useMemo(
    () => Math.min(currentPage, Math.max(1, totalPages)),
    [currentPage, totalPages]
  )

  const paginatedTickets = useMemo(() => {
    const start = (safeCurrentPage - 1) * rowsPerPage
    return filteredTickets.slice(start, start + rowsPerPage)
  }, [filteredTickets, safeCurrentPage, rowsPerPage])

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
    setSelectedPriority("all")
    setSelectedCategory("All Categories")
    setCurrentPage(1)
  }, [])

  const handleView = useCallback((ticket: TicketItem) => {
    setSelectedTicket(ticket)
    setViewOpen(true)
  }, [])

  const handleEdit = useCallback((ticket: TicketItem) => {
    setSelectedTicket(ticket)
    setAddOpen(true)
  }, [])

  const handleCloseView = useCallback(() => {
    setViewOpen(false)
    setSelectedTicket(null)
  }, [])

  const openActionModal = useCallback((ticket: TicketItem, action: TicketAction) => {
    setSelectedTicket(ticket)
    setActionType(action)
    setActionOpen(true)
  }, [])

  const closeActionModal = useCallback(() => {
    setActionOpen(false)
    setActionType(null)
    setSelectedTicket(null)
  }, [])

  const confirmAction = useCallback(
    (remark: string) => {
      if (!selectedTicket || !actionType) return

      const allowed = getAllowedTicketActions(selectedTicket.status, activeRole)
      if (!(allowed as readonly TicketAction[]).includes(actionType)) {
        closeActionModal()
        return
      }

      const nextStatus =
        actionType === "start"
          ? "in_progress"
          : actionType === "resolve"
            ? "resolved"
            : actionType === "close"
              ? "closed"
              : "open"

      const comment: TicketComment = {
        id: `com-${Date.now()}`,
        author: activeRole === "hr" ? "HR Admin" : activeRole === "it" ? "IT Admin" : "Manager",
        role: activeRole,
        message: remark.trim() || `Ticket moved to ${nextStatus.replace("_", " ")}.`,
        createdAt: new Date().toISOString().slice(0, 10),
      }

      setTickets((prev) =>
        prev.map((item) =>
          item.id === selectedTicket.id
            ? {
                ...item,
                status: nextStatus,
                comments: [comment, ...item.comments],
              }
            : item
        )
      )

      closeActionModal()
    },
    [selectedTicket, actionType, activeRole, closeActionModal]
  )

  const handleSaveTicket = useCallback(
    (payload: {
      title: string
      description: string
      category: string
      requesterName: string
      requesterId: string
      department: string
      assignedTo: string
      dueDate: string
      priority: "low" | "medium" | "high" | "critical"
    }) => {
      if (selectedTicket) {
        setTickets((prev) =>
          prev.map((item) =>
            item.id === selectedTicket.id
              ? {
                  ...item,
                  ...payload,
                }
              : item
          )
        )
      } else {
        const newTicket: TicketItem = {
          id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
          ...payload,
          status: "open",
          createdAt: new Date().toISOString().slice(0, 10),
          comments: [],
        }

        setTickets((prev) => [newTicket, ...prev])
      }

      setAddOpen(false)
      setSelectedTicket(null)
    },
    [selectedTicket]
  )

  return {
    tickets,
    filteredTickets,
    paginatedTickets,
    stats,
    searchQuery,
    setSearchQuery: setSearchQueryWithReset,
    selectedStatus,
    setSelectedStatus: setSelectedStatusWithReset,
    selectedPriority,
    setSelectedPriority: setSelectedPriorityWithReset,
    selectedCategory,
    setSelectedCategory: setSelectedCategoryWithReset,
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
    selectedTicket,
    actionType,
    handleView,
    handleEdit,
    handleCloseView,
    openActionModal,
    closeActionModal,
    confirmAction,
    handleSaveTicket,
  }
}
