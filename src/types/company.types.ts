export interface Company {
  id: string
  name: string
  industry: string
  email: string
  phone: string
  address: string
  website: string
  employees: number
  revenue: number
  status: "active" | "inactive"
  foundedDate: string
  description: string
  contact: string
  rating: number
  ownerName: string
}

export interface CompanyStats {
  totalCompanies: number
  totalRevenue: number
  activeCount: number
  totalEmployees: number
}

export interface UseCompanyReturn {
  searchName: string
  setSearchName: React.Dispatch<React.SetStateAction<string>>
  searchId: string
  setSearchId: React.Dispatch<React.SetStateAction<string>>
  selectedIndustry: string
  setSelectedIndustry: React.Dispatch<React.SetStateAction<string>>
  selectedStatus: string
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>
  filteredCompanies: Company[]
  paginatedCompanies: Company[]
  currentPage: number
  totalPages: number
  rowsPerPage: number
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  goToPage: (page: number) => void
  stats: CompanyStats
  formatCurrency: (amount: number) => string
  formatDate: (dateString: string) => string
  clearFilters: () => void
  // Modal state
  selectedCompany: Company | null
  viewModalOpen: boolean
  editModalOpen: boolean
  deleteModalOpen: boolean
  companyModalOpen: boolean
  setCompanyModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleView: (company: Company) => void
  handleEdit: (company: Company) => void
  handleDelete: (company: Company) => void
  handleCloseView: () => void
  handleCloseEdit: () => void
  handleCloseDelete: () => void
}
