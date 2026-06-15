export interface PayrollEmployee {
  id: string
  _id?: string
  name: string
  designation: string
  email: string
  joiningDate: string
  salary: number
  status: "paid" | "pending"
  paymentDate: string | null
  phone?: string
  bankAccount?: string
  bankName?: string
  address?: string
}

export interface PayrollStats {
  totalEmployees: number
  totalPayroll: number
  paidCount: number
  pendingCount: number
}

export interface UsePayrollReturn {
  searchName: string
  setSearchName: React.Dispatch<React.SetStateAction<string>>
  searchId: string
  setSearchId: React.Dispatch<React.SetStateAction<string>>
  selectedDesignation: string
  setSelectedDesignation: React.Dispatch<React.SetStateAction<string>>
  selectedStatus: string
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>
  filteredEmployees: PayrollEmployee[]
  paginatedEmployees: PayrollEmployee[]
  totalCount: number
  currentPage: number
  totalPages: number
  rowsPerPage: number
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  goToPage: (page: number) => void
  stats: PayrollStats
  formatCurrency: (amount: number) => string
  formatDate: (dateString: string | null) => string
  clearFilters: () => void
  // Modal state
  selectedEmployee: PayrollEmployee | null
  viewModalOpen: boolean
  editModalOpen: boolean
  deleteModalOpen: boolean
  payrollModalOpen: boolean
  setPayrollModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleView: (employee: PayrollEmployee) => void | Promise<void>
  handleEdit: (employee: PayrollEmployee) => void | Promise<void>
  handleDelete: (employee: PayrollEmployee) => void
  handleCloseView: () => void
  handleCloseEdit: () => void
  handleCloseDelete: () => void
}
