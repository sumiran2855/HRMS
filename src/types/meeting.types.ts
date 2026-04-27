export type MeetingStatus = "Scheduled" | "Ongoing" | "Completed" | "Cancelled"
export type MeetingType = "In-Person" | "Virtual" | "Hybrid"
export type MeetingPriority = "Low" | "Medium" | "High"

export interface Meeting {
  id: string
  title: string
  agenda: string
  date: string
  startTime: string
  endTime: string
  location: string
  host: string
  clientName: string
  projectName: string
  attendees: string[]
  status: MeetingStatus
  meetingType: MeetingType
  priority: MeetingPriority
  meetingLink?: string
  expectedOutcome?: string
  notes?: string
}

export interface MeetingFormPayload {
  title: string
  agenda: string
  date: string
  startTime: string
  endTime: string
  location: string
  host: string
  clientName: string
  projectName: string
  attendees: string[]
  status: MeetingStatus
  meetingType: MeetingType
  priority: MeetingPriority
  meetingLink?: string
  expectedOutcome?: string
  notes?: string
}

export interface MeetingStats {
  total: number
  upcoming: number
  completed: number
  cancelled: number
}

export interface UseMeetingReturn {
  meetings: Meeting[]
  filteredMeetings: Meeting[]
  paginatedMeetings: Meeting[]
  stats: MeetingStats
  searchQuery: string
  setSearchQuery: (value: string) => void
  selectedStatus: "All" | MeetingStatus
  setSelectedStatus: (value: "All" | MeetingStatus) => void
  selectedType: "All" | MeetingType
  setSelectedType: (value: "All" | MeetingType) => void
  currentPage: number
  totalPages: number
  rowsPerPage: number
  setRowsPerPage: (value: number) => void
  goToPage: (page: number) => void
  clearFilters: () => void
  addEditOpen: boolean
  formModalKey: number
  viewOpen: boolean
  selectedMeeting: Meeting | null
  handleAdd: () => void
  handleEdit: (meeting: Meeting) => void
  handleView: (meeting: Meeting) => void
  handleCloseAddEdit: () => void
  handleCloseView: () => void
  handleSubmitMeeting: (payload: MeetingFormPayload) => void
}
