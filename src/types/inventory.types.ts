export interface InventoryItem {
  id: number
  sku: string
  name: string
  category: string
  quantity: number
  minStock: number
  maxStock: number
  unitPrice: number
  totalValue: number
  location: string
  supplier: string
  lastUpdated: string
  status: "in-stock" | "low-stock" | "out-of-stock"
  reorderPoint: number
}

export interface InventoryStats {
  totalItems: number
  totalValue: number
  lowStockCount: number
  outOfStockCount: number
  totalQuantity: number
}

export interface UseInventoryReturn {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedStatus: string
  setSelectedStatus: (status: string) => void
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  entriesPerPage: number
  setEntriesPerPage: (entries: number) => void
  filteredData: InventoryItem[]
  paginatedData: InventoryItem[]
  totalPages: number
  startIndex: number
  inventoryStats: InventoryStats
  formatCurrency: (amount: number) => string
  selectedItem: InventoryItem | null
  setSelectedItem: (item: InventoryItem | null) => void
  isViewOpen: boolean
  setIsViewOpen: (open: boolean) => void
  isEditOpen: boolean
  setIsEditOpen: (open: boolean) => void
  isDeleteOpen: boolean
  setIsDeleteOpen: (open: boolean) => void
  handleView: (item: InventoryItem) => void
  handleEdit: (item: InventoryItem) => void
  handleDelete: (item: InventoryItem) => void
  handleUpdate: (item: InventoryItem) => void
  handleConfirmDelete: () => void
}
