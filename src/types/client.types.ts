export interface Client {
  id: string
  companyName: string
  industry: string
  contactPerson: string
  email: string
  phone: string
  address: string
  website: string
  contractType: string
  contractValue: number
  startDate: string
  endDate: string
  status: "active" | "completed" | "pending" | "inactive"
  employees: number
  projects: number
  rating: number
  paymentTerms: string
  billingCycle: string
  accountManager: string
  lastContactDate: string
  nextFollowUp: string
  notes: string
  services: string[]
  documents: string[]
}

export interface ClientStats {
  totalClients: number
  activeProjects: number
  totalRevenue: number
  activeCount: number
}

export interface UseClientReturn {
  searchName: string
  setSearchName: React.Dispatch<React.SetStateAction<string>>
  searchContact: string
  setSearchContact: React.Dispatch<React.SetStateAction<string>>
  selectedIndustry: string
  setSelectedIndustry: React.Dispatch<React.SetStateAction<string>>
  selectedStatus: string
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>
  selectedContractType: string
  setSelectedContractType: React.Dispatch<React.SetStateAction<string>>
  filteredClients: Client[]
  paginatedClients: Client[]
  currentPage: number
  totalPages: number
  rowsPerPage: number
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  goToPage: (page: number) => void
  stats: ClientStats
  formatCurrency: (amount: number) => string
  formatDate: (dateString: string) => string
  clearFilters: () => void
  // Modal state
  selectedClient: Client | null
  clientModalOpen: boolean
  viewClientModalOpen: boolean
  editClientModalOpen: boolean
  deleteClientModalOpen: boolean
  setClientModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleView: (client: Client) => void
  handleEdit: (client: Client) => void
  handleDelete: (client: Client) => void
  handleCloseView: () => void
  handleCloseEdit: () => void
  handleCloseDelete: () => void
}
