import { SalesOrder, Customer } from "@/types/sales.types"

export const SALES_ORDERS_DATA: SalesOrder[] = [
  {
    id: 1,
    orderNumber: "SO-001",
    customer: "Tech Solutions Inc.",
    date: "2024-03-15",
    deliveryDate: "2024-03-22",
    status: "delivered",
    totalAmount: 15430.0,
    items: 15,
    salesRep: "John Smith",
    paymentStatus: "paid",
    shippingAddress: "123 Tech Street, San Francisco, CA",
    trackingNumber: "TRK123456789",
  },
  {
    id: 2,
    orderNumber: "SO-002",
    customer: "Global Manufacturing",
    date: "2024-03-14",
    deliveryDate: "2024-03-21",
    status: "processing",
    totalAmount: 28750.0,
    items: 8,
    salesRep: "Emma Davis",
    paymentStatus: "pending",
    shippingAddress: "456 Industrial Ave, New York, NY",
    trackingNumber: "TRK987654321",
  },
  {
    id: 3,
    orderNumber: "SO-003",
    customer: "Office Supplies Co.",
    date: "2024-03-13",
    deliveryDate: "2024-03-20",
    status: "shipped",
    totalAmount: 8900.0,
    items: 25,
    salesRep: "Chris Wilson",
    paymentStatus: "paid",
    shippingAddress: "789 Commerce Blvd, Los Angeles, CA",
    trackingNumber: "TRK456789123",
  },
]

export const CUSTOMERS_DATA: Customer[] = [
  {
    id: 1,
    name: "Tech Solutions Inc.",
    email: "contact@techsolutions.com",
    phone: "+1 415-555-0123",
    totalOrders: 45,
    totalRevenue: 1250000.0,
    lastOrderDate: "2024-03-15",
    status: "active",
    creditLimit: 50000.0,
    outstandingBalance: 5430.0,
  },
  {
    id: 2,
    name: "Global Manufacturing",
    email: "orders@globalmfg.com",
    phone: "+1 212-555-0456",
    totalOrders: 28,
    totalRevenue: 890000.0,
    lastOrderDate: "2024-03-14",
    status: "active",
    creditLimit: 75000.0,
    outstandingBalance: 28750.0,
  },
]

export const ORDER_STATUSES = [
  "All Status",
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]

export const PAYMENT_STATUSES = [
  "All Payment",
  "paid",
  "pending",
  "overdue",
  "refunded",
]

export const STATUS_COLOR_MAP: Record<string, string> = {
  delivered: "bg-green-100 text-green-700",
  shipped: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  pending: "bg-gray-100 text-gray-700",
  cancelled: "bg-red-100 text-red-700",
}

export const PAYMENT_STATUS_COLOR_MAP: Record<string, string> = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  overdue: "bg-red-100 text-red-700",
  refunded: "bg-gray-100 text-gray-700",
}

export const SALES_TABS = [
  { key: "orders", label: "Sales Orders" },
  { key: "customers", label: "Customers" },
  { key: "analytics", label: "Sales Analytics" },
]

export const TABLE_HEADERS = [
  { label: "Order #", align: "text-left" },
  { label: "Customer", align: "text-left" },
  { label: "Date", align: "text-left" },
  { label: "Total", align: "text-right" },
  { label: "Items", align: "text-center" },
  { label: "Sales Rep", align: "text-left" },
  { label: "Status", align: "text-center" },
  { label: "Payment", align: "text-center" },
  { label: "Actions", align: "text-center" },
]
