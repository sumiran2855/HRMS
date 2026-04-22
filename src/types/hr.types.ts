export interface Employee {
  id: number
  name: string
  email: string
  phone: string
  department: string
  position: string
  location: string
  joinDate: string
  status: string
  salary: number
  manager: string
  skills: string[]
  performance: number
}

export interface Department {
  name: string
  employees: number
  avgSalary: number
}

export interface HRStats {
  totalEmployees: number
  activeEmployees: number
  avgSalary: number
  newHiresThisMonth: number
  departmentCount: number
  activePercentage: number
}

export interface UseHRReturn {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  selectedDepartment: string
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>
  selectedStatus: string
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  entriesPerPage: number
  setEntriesPerPage: React.Dispatch<React.SetStateAction<number>>
  paginatedData: Employee[]
  hrStats: HRStats
  departments: Department[]
  formatCurrency: (amount: number) => string
  getStatusColor: (status: string) => string
  getPerformanceColor: (rating: number) => string
  // Modal state
  isAddOpen: boolean
  setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedEmployee: Employee | null
  isViewOpen: boolean
  isEditOpen: boolean
  isDeleteOpen: boolean
  handleView: (employee: Employee) => void
  handleEdit: (employee: Employee) => void
  handleDelete: (employee: Employee) => void
  handleCloseView: () => void
  handleCloseEdit: () => void
  handleCloseDelete: () => void
  handleConfirmDelete: () => void
  handleUpdateEmployee: (updated: Employee) => void
}
