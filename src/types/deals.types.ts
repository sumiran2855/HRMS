export interface Deal {
  id: number
  dealName: string
  companyName: string
  contactPerson: string
  email: string
  phone: string
  value: number
  stage: string
  probability: number
  expectedCloseDate: string
  assignedTo: string
  location: string
  products: string[]
  source: string
  description?: string
  createdDate?: string
  lastUpdated?: string
}

export interface DealStats {
  total: number
  discovery: number
  qualified: number
  proposal: number
  negotiation: number
  closedWon: number
  closedLost: number
  totalValue: number
  weightedValue: number
}

export interface DealStageConfig {
  label: string
  pill: string
}

export interface DealStatCardConfig {
  key: string
  label: string
  subtitle: string
  gradient: string
  borderColor: string
  textColor: string
  valueColor: string
  icon: string
  iconBg: string
  format?: "count" | "currency"
}

export interface DealPipelineCardConfig {
  key: keyof DealStats
  label: string
  gradient: string
  borderColor: string
  textColor: string
  valueColor: string
}

export interface UseDealsReturn {
  searchTerm: string
  setSearchTerm: (s: string) => void
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  entriesPerPage: number
  setEntriesPerPage: (n: number) => void
  selectedStage: string
  setSelectedStage: (s: string) => void
  selectedSource: string
  setSelectedSource: (s: string) => void
  isAddDealModalOpen: boolean
  setIsAddDealModalOpen: (b: boolean) => void
  isEditDealModalOpen: boolean
  setIsEditDealModalOpen: (b: boolean) => void
  isViewDealModalOpen: boolean
  setIsViewDealModalOpen: (b: boolean) => void
  isDeleteModalOpen: boolean
  setIsDeleteModalOpen: (b: boolean) => void
  selectedDeal: Deal | null
  filteredData: Deal[]
  paginatedData: Deal[]
  totalPages: number
  safePage: number
  startIndex: number
  endIndex: number
  stats: DealStats
  updateFilter: (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
  handleAction: (action: string, dealId: number) => void
  handleUpdateDeal: (updatedDeal: any) => void
  handleDeleteDeal: () => void
}
