import { useCallback, useMemo, useState } from "react"
import {
  MEETING_DATA,
  MEETING_PAGE_SIZE_OPTIONS,
  toDateTimeValue,
} from "@/constants/meeting"
import {
  Meeting,
  MeetingFormPayload,
  MeetingStats,
  UseMeetingReturn,
} from "@/types/meeting.types"

export function useMeeting(): UseMeetingReturn {
  const [meetings, setMeetings] = useState<Meeting[]>(MEETING_DATA)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<"All" | Meeting["status"]>("All")
  const [selectedType, setSelectedType] = useState<"All" | Meeting["meetingType"]>("All")
  const [rowsPerPage, setRowsPerPage] = useState<number>(MEETING_PAGE_SIZE_OPTIONS[0])
  const [currentPage, setCurrentPage] = useState(1)

  const [addEditOpen, setAddEditOpen] = useState(false)
  const [formModalKey, setFormModalKey] = useState(0)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)

  const setSearchQueryWithReset = useCallback((value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }, [])

  const setSelectedStatusWithReset = useCallback((value: "All" | Meeting["status"]) => {
    setSelectedStatus(value)
    setCurrentPage(1)
  }, [])

  const setSelectedTypeWithReset = useCallback((value: "All" | Meeting["meetingType"]) => {
    setSelectedType(value)
    setCurrentPage(1)
  }, [])

  const setRowsPerPageWithReset = useCallback((value: number) => {
    setRowsPerPage(value)
    setCurrentPage(1)
  }, [])

  const filteredMeetings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()

    return meetings
      .filter((meeting) => {
        const matchesSearch =
          !q ||
          meeting.id.toLowerCase().includes(q) ||
          meeting.title.toLowerCase().includes(q) ||
          meeting.host.toLowerCase().includes(q) ||
          meeting.clientName.toLowerCase().includes(q) ||
          meeting.projectName.toLowerCase().includes(q)

        const matchesStatus = selectedStatus === "All" || meeting.status === selectedStatus
        const matchesType = selectedType === "All" || meeting.meetingType === selectedType

        return matchesSearch && matchesStatus && matchesType
      })
      .sort((a, b) => toDateTimeValue(a.date, a.startTime) - toDateTimeValue(b.date, b.startTime))
  }, [meetings, searchQuery, selectedStatus, selectedType])

  const stats: MeetingStats = useMemo(
    () => ({
      total: meetings.length,
      upcoming: meetings.filter((item) => item.status === "Scheduled" || item.status === "Ongoing").length,
      completed: meetings.filter((item) => item.status === "Completed").length,
      cancelled: meetings.filter((item) => item.status === "Cancelled").length,
    }),
    [meetings]
  )

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredMeetings.length / rowsPerPage)),
    [filteredMeetings.length, rowsPerPage]
  )

  const safeCurrentPage = useMemo(
    () => Math.min(currentPage, Math.max(1, totalPages)),
    [currentPage, totalPages]
  )

  const paginatedMeetings = useMemo(() => {
    const start = (safeCurrentPage - 1) * rowsPerPage
    return filteredMeetings.slice(start, start + rowsPerPage)
  }, [filteredMeetings, safeCurrentPage, rowsPerPage])

  const goToPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return
      setCurrentPage(page)
    },
    [totalPages]
  )

  const clearFilters = useCallback(() => {
    setSearchQuery("")
    setSelectedStatus("All")
    setSelectedType("All")
    setCurrentPage(1)
  }, [])

  const handleAdd = useCallback(() => {
    setSelectedMeeting(null)
    setFormModalKey((prev) => prev + 1)
    setAddEditOpen(true)
  }, [])

  const handleEdit = useCallback((meeting: Meeting) => {
    setSelectedMeeting(meeting)
    setFormModalKey((prev) => prev + 1)
    setAddEditOpen(true)
  }, [])

  const handleView = useCallback((meeting: Meeting) => {
    setSelectedMeeting(meeting)
    setViewOpen(true)
  }, [])

  const handleCloseAddEdit = useCallback(() => {
    setAddEditOpen(false)
    setSelectedMeeting(null)
  }, [])

  const handleCloseView = useCallback(() => {
    setViewOpen(false)
    setSelectedMeeting(null)
  }, [])

  const handleSubmitMeeting = useCallback(
    (payload: MeetingFormPayload) => {
      if (selectedMeeting) {
        setMeetings((prev) =>
          prev.map((item) =>
            item.id === selectedMeeting.id
              ? {
                  ...item,
                  ...payload,
                  meetingLink: payload.meetingLink || undefined,
                  expectedOutcome: payload.expectedOutcome || undefined,
                  notes: payload.notes || undefined,
                }
              : item
          )
        )
      } else {
        const newMeeting: Meeting = {
          id: `MTG-${Math.floor(1000 + Math.random() * 9000)}`,
          ...payload,
          meetingLink: payload.meetingLink || undefined,
          expectedOutcome: payload.expectedOutcome || undefined,
          notes: payload.notes || undefined,
        }

        setMeetings((prev) => [newMeeting, ...prev])
      }

      handleCloseAddEdit()
    },
    [selectedMeeting, handleCloseAddEdit]
  )

  return {
    meetings,
    filteredMeetings,
    paginatedMeetings,
    stats,
    searchQuery,
    setSearchQuery: setSearchQueryWithReset,
    selectedStatus,
    setSelectedStatus: setSelectedStatusWithReset,
    selectedType,
    setSelectedType: setSelectedTypeWithReset,
    currentPage: safeCurrentPage,
    totalPages,
    rowsPerPage,
    setRowsPerPage: setRowsPerPageWithReset,
    goToPage,
    clearFilters,
    addEditOpen,
    formModalKey,
    viewOpen,
    selectedMeeting,
    handleAdd,
    handleEdit,
    handleView,
    handleCloseAddEdit,
    handleCloseView,
    handleSubmitMeeting,
  }
}
