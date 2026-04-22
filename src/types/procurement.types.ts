export interface PurchaseOrder {
  id: number
  orderNumber: string
  vendor: string
  date: string
  expectedDelivery: string
  status: string
  totalAmount: number
  items: number
  priority: string
  category: string
  requestor: string
  approvedBy: string | null
  description: string
}

export interface Vendor {
  id: number
  name: string
  email: string
  phone: string
  address: string
  category: string
  totalOrders: number
  totalSpent: number
  avgOrderValue: number
  rating: number
  paymentTerms: string
  status: string
}

export interface ProcurementStats {
  totalOrders: number
  pendingOrders: number
  totalValue: number
  activeVendors: number
}

export interface UseProcurementReturn {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  selectedStatus: string
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>
  selectedPriority: string
  setSelectedPriority: React.Dispatch<React.SetStateAction<string>>
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  entriesPerPage: number
  setEntriesPerPage: React.Dispatch<React.SetStateAction<number>>
  paginatedData: PurchaseOrder[]
  procurementStats: ProcurementStats
  vendors: Vendor[]
  formatCurrency: (amount: number) => string
  getStatusColor: (status: string) => string
  getPriorityColor: (priority: string) => string
  // Modal state
  selectedOrder: PurchaseOrder | null
  isViewOpen: boolean
  isEditOpen: boolean
  isDeleteOpen: boolean
  isAddOpen: boolean
  setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleView: (order: PurchaseOrder) => void
  handleEdit: (order: PurchaseOrder) => void
  handleDelete: (order: PurchaseOrder) => void
  handleCloseView: () => void
  handleCloseEdit: () => void
  handleCloseDelete: () => void
  handleConfirmDelete: () => void
  handleUpdateOrder: (updated: PurchaseOrder) => void
}
