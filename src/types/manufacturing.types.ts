export interface ProductionOrder {
  id: number
  orderNumber: string
  product: string
  batchNumber: string
  quantity: number
  startDate: string
  endDate: string
  status: string
  priority: string
  productionLine: string
  materials: string[]
  completionRate: number
  estimatedCompletion: string
  supervisor: string
  qualityScore: number
}

export interface ProductionLine {
  id: number
  name: string
  status: string
  currentProduct: string | null
  capacity: number
  efficiency: number
  supervisor: string
  outputToday: number
  qualityScore: number
  downtime: number
}

export interface ManufacturingStats {
  totalOrders: number
  inProgressOrders: number
  completedOrders: number
  totalOutput: number
  avgQualityScore: number
}

export interface UseManufacturingReturn {
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
  paginatedData: ProductionOrder[]
  manufacturingStats: ManufacturingStats
  productionLines: ProductionLine[]
  getStatusColor: (status: string) => string
  getPriorityColor: (priority: string) => string
  getLineStatusColor: (status: string) => string
  // Modal state
  selectedOrder: ProductionOrder | null
  isViewOpen: boolean
  isEditOpen: boolean
  isDeleteOpen: boolean
  isAddOpen: boolean
  setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleView: (order: ProductionOrder) => void
  handleEdit: (order: ProductionOrder) => void
  handleDelete: (order: ProductionOrder) => void
  handleCloseView: () => void
  handleCloseEdit: () => void
  handleCloseDelete: () => void
  handleConfirmDelete: () => void
  handleUpdateOrder: (updated: ProductionOrder) => void
}
