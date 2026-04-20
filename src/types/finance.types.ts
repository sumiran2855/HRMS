export interface Transaction {
  id: number
  type: "invoice" | "expense"
  number: string
  client?: string
  vendor?: string
  amount: number
  date: string
  dueDate: string
  status: "paid" | "pending" | "overdue" | "cancelled"
  category: string
  description: string
  paymentMethod: string
}

export interface Account {
  id: number
  name: string
  type: "Asset" | "Liability"
  balance: number
  currency: string
  bankName: string
  accountNumber: string
  lastUpdated: string
}

export interface FinanceStats {
  totalRevenue: number
  totalExpenses: number
  pendingInvoices: number
  pendingInvoiceCount: number
  totalBalance: number
}

export interface UseFinanceReturn {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedType: string
  setSelectedType: (type: string) => void
  selectedStatus: string
  setSelectedStatus: (status: string) => void
  activeTab: string
  setActiveTab: (tab: string) => void
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  entriesPerPage: number
  setEntriesPerPage: (n: number) => void
  filteredData: Transaction[]
  paginatedData: Transaction[]
  totalPages: number
  startIndex: number
  financeStats: FinanceStats
  accounts: Account[]
  formatCurrency: (amount: number) => string
}
