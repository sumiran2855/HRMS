export interface SalesOrder {
  id: number
  orderNumber: string
  customer: string
  date: string
  deliveryDate: string
  status: string
  totalAmount: number
  items: number
  salesRep: string
  paymentStatus: string
  shippingAddress: string
  trackingNumber: string
}

export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  totalOrders: number
  totalRevenue: number
  lastOrderDate: string
  status: string
  creditLimit: number
  outstandingBalance: number
}

export interface SalesStats {
  totalRevenue: number
  totalOrders: number
  deliveredOrders: number
  pendingOrders: number
  totalCustomers: number
}

export interface UseSalesReturn {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  selectedStatus: string
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>
  selectedPaymentStatus: string
  setSelectedPaymentStatus: React.Dispatch<React.SetStateAction<string>>
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  entriesPerPage: number
  setEntriesPerPage: React.Dispatch<React.SetStateAction<number>>
  paginatedData: SalesOrder[]
  salesStats: SalesStats
  customers: Customer[]
  formatCurrency: (amount: number) => string
  getStatusColor: (status: string) => string
  getPaymentStatusColor: (status: string) => string
  // Modal state
  selectedOrder: SalesOrder | null
  isViewOpen: boolean
  isEditOpen: boolean
  isDeleteOpen: boolean
  isAddOpen: boolean
  setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleView: (order: SalesOrder) => void
  handleEdit: (order: SalesOrder) => void
  handleDelete: (order: SalesOrder) => void
  handleCloseView: () => void
  handleCloseEdit: () => void
  handleCloseDelete: () => void
  handleConfirmDelete: () => void
  handleUpdateOrder: (updated: SalesOrder) => void
}
