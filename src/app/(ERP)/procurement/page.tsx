"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Label } from "@/components/ui/Label"
import { 
  Truck, 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  TrendingUp, 
  TrendingDown,
  Filter,
  Download,
  Package,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Building,
  FileText,
  BarChart3
} from "lucide-react"

// Mock procurement data
const purchaseOrdersData = [
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

const vendorsData = [
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

export default function ProcurementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedPriority, setSelectedPriority] = useState("All Priorities")
  const [activeTab, setActiveTab] = useState("orders")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)

  const statuses = ["All Status", "pending", "approved", "delivered", "cancelled"]
  const priorities = ["All Priorities", "high", "normal", "low"]
  const categories = ["All Categories", "Electronics", "Furniture", "Raw Materials", "Office Supplies"]

  // Filter data
  const filteredData = purchaseOrdersData.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === "All Status" || order.status === selectedStatus
    const matchesPriority = selectedPriority === "All Priorities" || order.priority === selectedPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'approved': return 'bg-blue-100 text-blue-700'
      case 'delivered': return 'bg-green-100 text-green-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700'
      case 'normal': return 'bg-blue-100 text-blue-700'
      case 'low': return 'bg-green-100 text-green-700'
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

  const totalOrders = purchaseOrdersData.length
  const pendingOrders = purchaseOrdersData.filter(o => o.status === 'pending').length
  const totalValue = purchaseOrdersData.reduce((sum, o) => sum + o.totalAmount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Procurement Management</h1>
          <p className="text-slate-500 mt-1">Manage purchase orders and vendor relationships</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
            <Plus className="w-4 h-4 mr-2" />
            New Purchase Order
          </Button>
        </div>
      </div>

      {/* Procurement Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600">Total Orders</p>
                <p className="text-2xl font-bold text-indigo-900">{totalOrders}</p>
                <p className="text-xs text-indigo-600 mt-1">{pendingOrders} pending</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Total Value</p>
                <p className="text-2xl font-bold text-yellow-900">{formatCurrency(totalValue)}</p>
                <p className="text-xs text-yellow-600 mt-1">This month</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active Vendors</p>
                <p className="text-2xl font-bold text-green-900">{vendorsData.length}</p>
                <p className="text-xs text-green-600 mt-1">All categories</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Building className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(totalValue / totalOrders)}</p>
                <p className="text-xs text-blue-600 mt-1">Per order</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
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
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Purchase Orders
          </button>
          <button
            onClick={() => setActiveTab("vendors")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "vendors"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Vendors
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "analytics"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Procurement Analytics
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
                      placeholder="Search by order number or vendor..."
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
                      className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20 appearance-none"
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    {/* <Label htmlFor="priority" className="text-sm font-medium text-slate-700">Priority</Label> */}
                    <select
                      id="priority"
                      value={selectedPriority}
                      onChange={(e) => setSelectedPriority(e.target.value)}
                      className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20 appearance-none"
                    >
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purchase Orders Table */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-lg font-semibold">Purchase Orders</CardTitle>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-slate-700">Show</label>
                  <select
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                    className="h-8 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20 appearance-none"
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
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">PO #</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Vendor</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Date</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-700">Total</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Items</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Requestor</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Priority</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Status</th>
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
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-900">{order.vendor}</span>
                          </div>
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
                          <span className="text-sm text-slate-700">{order.requestor}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                            {order.priority}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-1">
                            <button className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Details">
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

      {activeTab === "vendors" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendorsData.map((vendor) => (
                  <div key={vendor.id} className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{vendor.name}</h3>
                        <p className="text-sm text-slate-500">{vendor.email}</p>
                      </div>
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Building className="w-5 h-5 text-indigo-600" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Category:</span>
                        <span className="text-sm text-slate-900">{vendor.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Total Orders:</span>
                        <span className="text-sm text-slate-900">{vendor.totalOrders}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Total Spent:</span>
                        <span className="text-sm font-medium text-green-600">{formatCurrency(vendor.totalSpent)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Avg Order:</span>
                        <span className="text-sm text-slate-900">{formatCurrency(vendor.avgOrderValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Rating:</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-slate-900">{vendor.rating}</span>
                          <span className="text-sm text-slate-500">/5.0</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Payment Terms:</span>
                        <span className="text-sm text-slate-900">{vendor.paymentTerms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${vendor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {vendor.status}
                        </span>
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
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Procurement Analytics</h3>
              <p className="text-slate-500 mb-4">Generate comprehensive procurement reports and analytics.</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" className="cursor-pointer">
                  Spend Analysis
                </Button>
                <Button variant="outline" className="cursor-pointer">
                  Vendor Performance
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
                  Cost Savings Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
