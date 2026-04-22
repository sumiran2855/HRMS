import { PurchaseOrder, Vendor } from "@/types/procurement.types"

export const PURCHASE_ORDERS_DATA: PurchaseOrder[] = [
  {
    id: 1,
    orderNumber: "PO-001",
    vendor: "Tech Supplies Inc.",
    date: "2024-03-15",
    expectedDelivery: "2024-03-22",
    status: "pending",
    totalAmount: 15430.00,
    items: 15,
    priority: "high",
    category: "Electronics",
    requestor: "John Smith",
    approvedBy: null,
    description: "Laptops and monitors for engineering team"
  },
  {
    id: 2,
    orderNumber: "PO-002",
    vendor: "Office Furniture Co.",
    date: "2024-03-14",
    expectedDelivery: "2024-03-21",
    status: "approved",
    totalAmount: 8900.00,
    items: 25,
    priority: "normal",
    category: "Furniture",
    requestor: "Emma Davis",
    approvedBy: "Michael Chen",
    description: "Office chairs and desks for new office space"
  },
  {
    id: 3,
    orderNumber: "PO-003",
    vendor: "Industrial Parts Ltd.",
    date: "2024-03-13",
    expectedDelivery: "2024-03-20",
    status: "delivered",
    totalAmount: 12450.00,
    items: 8,
    priority: "low",
    category: "Raw Materials",
    requestor: "Chris Wilson",
    approvedBy: "Sarah Brown",
    description: "Replacement parts for manufacturing line"
  }
]

export const VENDORS_DATA: Vendor[] = [
  {
    id: 1,
    name: "Tech Supplies Inc.",
    email: "contact@techsupplies.com",
    phone: "+1 555-012-3456",
    address: "123 Tech Street, San Francisco, CA",
    category: "Electronics",
    totalOrders: 45,
    totalSpent: 1250000.00,
    avgOrderValue: 27777.78,
    rating: 4.5,
    paymentTerms: "Net 30",
    status: "active"
  },
  {
    id: 2,
    name: "Office Furniture Co.",
    email: "orders@officefurniture.com",
    phone: "+1 555-012-7890",
    address: "456 Commerce Blvd, Los Angeles, CA",
    category: "Furniture",
    totalOrders: 28,
    totalSpent: 890000.00,
    avgOrderValue: 31785.71,
    rating: 4.2,
    paymentTerms: "Net 45",
    status: "active"
  },
  {
    id: 3,
    name: "Industrial Parts Ltd.",
    email: "procurement@industrialparts.com",
    phone: "+1 555-012-2345",
    address: "789 Industrial Ave, Detroit, MI",
    category: "Raw Materials",
    totalOrders: 67,
    totalSpent: 2340000.00,
    avgOrderValue: 34925.37,
    rating: 3.8,
    paymentTerms: "Net 60",
    status: "active"
  }
]

export const STATUSES = ["All Status", "pending", "approved", "delivered", "cancelled"]
export const PRIORITIES = ["All Priorities", "high", "normal", "low"]

export const STATUS_COLOR_MAP: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
}

export const PRIORITY_COLOR_MAP: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  normal: "bg-blue-100 text-blue-700",
  low: "bg-green-100 text-green-700",
}

export const PROCUREMENT_TABS = [
  { key: "orders", label: "Purchase Orders" },
  { key: "vendors", label: "Vendors" },
  { key: "analytics", label: "Procurement Analytics" },
]
