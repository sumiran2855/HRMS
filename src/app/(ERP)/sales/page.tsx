"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Label } from "@/components/ui/Label"
import { 
  ShoppingCart, 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  TrendingUp, 
  TrendingDown,
  Filter,
  Download,
  Truck,
  Package,
  DollarSign,
  Users,
  Calendar,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react"

// Mock sales data
const salesOrdersData = [
  {
    id: 1,
    orderNumber: "SO-001",
    customer: "Tech Solutions Inc.",
    date: "2024-03-15",
    deliveryDate: "2024-03-22",
    status: "delivered",
    totalAmount: 15430.00,
    items: 15,
    salesRep: "John Smith",
    paymentStatus: "paid",
    shippingAddress: "123 Tech Street, San Francisco, CA",
    trackingNumber: "TRK123456789"
  },
  {
    id: 2,
    orderNumber: "SO-002",
    customer: "Global Manufacturing",
    date: "2024-03-14",
    deliveryDate: "2024-03-21",
    status: "processing",
    totalAmount: 28750.00,
    items: 8,
    salesRep: "Emma Davis",
    paymentStatus: "pending",
    shippingAddress: "456 Industrial Ave, New York, NY",
    trackingNumber: "TRK987654321"
  },
  {
    id: 3,
    orderNumber: "SO-003",
    customer: "Office Supplies Co.",
    date: "2024-03-13",
    deliveryDate: "2024-03-20",
    status: "shipped",
    totalAmount: 8900.00,
    items: 25,
    salesRep: "Chris Wilson",
    paymentStatus: "paid",
    shippingAddress: "789 Commerce Blvd, Los Angeles, CA",
    trackingNumber: "TRK456789123"
  }
]

const customersData = [
  {
    id: 1,
    name: "Tech Solutions Inc.",
    email: "contact@techsolutions.com",
    phone: "+1 415-555-0123",
    totalOrders: 45,
    totalRevenue: 1250000.00,
    lastOrderDate: "2024-03-15",
    status: "active",
    creditLimit: 50000.00,
    outstandingBalance: 5430.00
  },
  {
    id: 2,
    name: "Global Manufacturing",
    email: "orders@globalmfg.com",
    phone: "+1 212-555-0456",
    totalOrders: 28,
    totalRevenue: 890000.00,
    lastOrderDate: "2024-03-14",
    status: "active",
    creditLimit: 75000.00,
    outstandingBalance: 28750.00
  }
]

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("All Payment")
  const [activeTab, setActiveTab] = useState("orders")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)

  const statuses = ["All Status", "pending", "processing", "shipped", "delivered", "cancelled"]
  const paymentStatuses = ["All Payment", "paid", "pending", "overdue", "refunded"]

  // Filter data
  const filteredData = salesOrdersData.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === "All Status" || order.status === selectedStatus
    const matchesPaymentStatus = selectedPaymentStatus === "All Payment" || order.paymentStatus === selectedPaymentStatus

    return matchesSearch && matchesStatus && matchesPaymentStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700'
      case 'shipped': return 'bg-blue-100 text-blue-700'
      case 'processing': return 'bg-yellow-100 text-yellow-700'
      case 'pending': return 'bg-gray-100 text-gray-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'overdue': return 'bg-red-100 text-red-700'
      case 'refunded': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const totalRevenue = salesOrdersData
    .filter(o => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.totalAmount, 0)
  
  const pendingOrders = salesOrdersData.filter(o => o.status === 'pending' || o.status === 'processing').length
  const deliveredOrders = salesOrdersData.filter(o => o.status === 'delivered').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sales & Distribution</h1>
          <p className="text-slate-500 mt-1">Manage sales orders and customer relationships</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white cursor-pointer">
            <Plus className="w-4 h-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Sales Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Total Revenue</p>
                <p className="text-2xl font-bold text-orange-900">{formatCurrency(totalRevenue)}</p>
                <p className="text-xs text-orange-600 mt-1">↑+12% from last month</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Orders</p>
                <p className="text-2xl font-bold text-blue-900">{salesOrdersData.length}</p>
                <p className="text-xs text-blue-600 mt-1">{deliveredOrders} delivered</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Pending Orders</p>
                <p className="text-2xl font-bold text-yellow-900">{pendingOrders}</p>
                <p className="text-xs text-yellow-600 mt-1">Need attention</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Customers</p>
                <p className="text-2xl font-bold text-green-900">{customersData.length}</p>
                <p className="text-xs text-green-600 mt-1">Active accounts</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("orders")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "orders"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Sales Orders
          </button>
          <button
            onClick={() => setActiveTab("customers")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "customers"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Customers
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "analytics"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Sales Analytics
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  {/* <Label htmlFor="search" className="text-sm font-medium text-slate-700">Search</Label> */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search by order number or customer..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    {/* <Label htmlFor="status" className="text-sm font-medium text-slate-700">Status</Label> */}
                    <select
                      id="status"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 appearance-none"
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    {/* <Label htmlFor="payment" className="text-sm font-medium text-slate-700">Payment</Label> */}
                    <select
                      id="payment"
                      value={selectedPaymentStatus}
                      onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                      className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 appearance-none"
                    >
                      {paymentStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-lg font-semibold">Sales Orders</CardTitle>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-slate-700">Show</label>
                  <select
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                    className="h-8 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 appearance-none"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                  <span className="text-sm text-slate-600">entries</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Order #</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Date</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-700">Total</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Items</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Sales Rep</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Status</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Payment</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((order) => (
                      <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <span className="text-sm font-mono text-slate-900">{order.orderNumber}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-900">{order.customer}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-700">{order.date}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-sm font-medium text-slate-900">{formatCurrency(order.totalAmount)}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-sm text-slate-900">{order.items}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-700">{order.salesRep}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-1">
                            <button className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="View Details">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit Order">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "customers" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customersData.map((customer) => (
                  <div key={customer.id} className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{customer.name}</h3>
                        <p className="text-sm text-slate-500">{customer.email}</p>
                      </div>
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-orange-600" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Total Orders:</span>
                        <span className="text-lg font-bold text-slate-900">{customer.totalOrders}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Total Revenue:</span>
                        <span className="text-lg font-bold text-green-600">{formatCurrency(customer.totalRevenue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Credit Limit:</span>
                        <span className="text-lg font-bold text-blue-600">{formatCurrency(customer.creditLimit)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Outstanding:</span>
                        <span className="text-lg font-bold text-red-600">{formatCurrency(customer.outstandingBalance)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6">
          <Card>
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Sales Analytics</h3>
              <p className="text-slate-500 mb-4">Generate comprehensive sales reports and analytics.</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" className="cursor-pointer">
                  Revenue Report
                </Button>
                <Button variant="outline" className="cursor-pointer">
                  Sales by Product
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white cursor-pointer">
                  Customer Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
