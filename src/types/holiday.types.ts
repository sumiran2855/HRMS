export type HolidayType = "public" | "company" | "optional"

export type HolidayDuration = "full-day" | "half-day"

export interface Holiday {
  id: string
  name: string
  date: string
  type: HolidayType
  duration: HolidayDuration
  location?: string
  description: string
  recurring: boolean
}

export interface HolidayStats {
  totalHolidays: number
  publicHolidays: number
  companyHolidays: number
  optionalHolidays: number
}

export interface HolidayTypeBadgeConfig {
  bg: string
  text: string
  border: string
  dark: string
  dot: string
  label: string
  gradient: string
}

export interface HolidayStatCardConfig {
  key: keyof HolidayStats
  label: string
  badgeLabel: string
  icon: string
  gradient: string
  shadow: string
  badgeBg: string
  badgeText: string
}

export interface UseHolidaysReturn {
  searchTerm: string
  setSearchTerm: (value: string) => void
  selectedYear: string
  setSelectedYear: (value: string) => void
  showAddModal: boolean
  setShowAddModal: (value: boolean) => void
  editingHoliday: Holiday | null
  filteredHolidays: Holiday[]
  stats: HolidayStats
  upcomingHolidays: Holiday[]
  handleAddHoliday: (data: Omit<Holiday, "id">) => void
  handleEditHoliday: (data: Omit<Holiday, "id">) => void
  handleDeleteHoliday: (id: string) => void
  openEditModal: (holiday: Holiday) => void
  closeModal: () => void
}
