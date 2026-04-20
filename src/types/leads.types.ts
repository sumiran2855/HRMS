export interface Lead {
  id: number
  name: string
  position: string
  company: string
  location: string
  email: string
  phone: string
  source: string
  status: string
  value: number
  assignedTo: string
  notes?: string
  createdDate?: string
  lastContact?: string
}

export interface LeadStats {
  total: number
  new: number
  contacted: number
  qualified: number
  proposal: number
  negotiation: number
  totalValue: number
}

export interface LeadStatusConfig {
  label: string
  pill: string
}

export interface LeadStatCardConfig {
  key: keyof LeadStats
  label: string
  gradient: string
  borderColor: string
  textColor: string
  valueColor: string
}

export interface UseLeadsReturn {
  searchTerm: string
  setSearchTerm: (s: string) => void
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  entriesPerPage: number
  setEntriesPerPage: (n: number) => void
  selectedStatus: string
  setSelectedStatus: (s: string) => void
  selectedSource: string
  setSelectedSource: (s: string) => void
  isAddLeadModalOpen: boolean
  setIsAddLeadModalOpen: (b: boolean) => void
  isEditLeadModalOpen: boolean
  setIsEditLeadModalOpen: (b: boolean) => void
  isViewLeadModalOpen: boolean
  setIsViewLeadModalOpen: (b: boolean) => void
  isDeleteModalOpen: boolean
  setIsDeleteModalOpen: (b: boolean) => void
  selectedLead: Lead | null
  filteredData: Lead[]
  paginatedData: Lead[]
  totalPages: number
  safePage: number
  startIndex: number
  endIndex: number
  stats: LeadStats
  updateFilter: (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
  handleAction: (action: string, leadId: number) => void
  handleUpdateLead: (updatedLead: any) => void
  handleDeleteLead: () => void
}
