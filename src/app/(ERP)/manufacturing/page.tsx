"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Label } from "@/components/ui/Label"
import { 
  Settings, 
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
  BarChart3,
  Activity,
  Wrench,
  Zap,
  Target
} from "lucide-react"

// Mock manufacturing data
const productionOrdersData = [
  {
    id: 1,
    orderNumber: "MO-001",
    product: "Laptop Model X",
    batchNumber: "BATCH-456",
    quantity: 150,
    startDate: "2024-03-15",
    endDate: "2024-03-20",
    status: "in-progress",
    priority: "high",
    productionLine: "Assembly Line 1",
    materials: ["Laptop Case", "Screen", "Keyboard", "Motherboard"],
    completionRate: 75,
    estimatedCompletion: "2024-03-22",
    supervisor: "John Smith",
    qualityScore: 4.2
  },
  {
    id: 2,
    orderNumber: "MO-002",
    product: "Office Chair Pro",
    batchNumber: "BATCH-457",
    quantity: 300,
    startDate: "2024-03-14",
    endDate: "2024-03-18",
    status: "completed",
    priority: "normal",
    productionLine: "Assembly Line 2",
    materials: ["Chair Frame", "Cushion", "Wheels", "Armrests"],
    completionRate: 100,
    estimatedCompletion: "2024-03-18",
    supervisor: "Emma Davis",
    qualityScore: 4.8
  },
  {
    id: 3,
    orderNumber: "MO-003",
    product: "Wireless Mouse",
    batchNumber: "BATCH-458",
    quantity: 500,
    startDate: "2024-03-13",
    endDate: "2024-03-21",
    status: "planned",
    priority: "low",
    productionLine: "Assembly Line 3",
    materials: ["Plastic", "Circuit Board", "Battery", "USB Connector"],
    completionRate: 0,
    estimatedCompletion: "2024-03-25",
    supervisor: "Chris Wilson",
    qualityScore: 0
  }
]

const productionLinesData = [
  {
    id: 1,
    name: "Assembly Line 1",
    status: "active",
    currentProduct: "Laptop Model X",
    capacity: 200,
    efficiency: 85,
    supervisor: "John Smith",
    outputToday: 150,
    qualityScore: 4.2,
    downtime: 15
  },
  {
    id: 2,
    name: "Assembly Line 2",
    status: "active",
    currentProduct: "Office Chair Pro",
    capacity: 400,
    efficiency: 92,
    supervisor: "Emma Davis",
    outputToday: 300,
    qualityScore: 4.8,
    downtime: 8
  },
  {
    id: 3,
    name: "Assembly Line 3",
    status: "maintenance",
    currentProduct: null,
    capacity: 250,
    efficiency: 0,
    supervisor: "Chris Wilson",
    outputToday: 0,
    qualityScore: 0,
    downtime: 480
  }
]

export default function ManufacturingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedPriority, setSelectedPriority] = useState("All Priorities")
  const [selectedLine, setSelectedLine] = useState("All Lines")
  const [activeTab, setActiveTab] = useState("production")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)

  const statuses = ["All Status", "planned", "in-progress", "completed", "on-hold", "cancelled"]
  const priorities = ["All Priorities", "high", "normal", "low"]
  const productionLines = ["All Lines", "Assembly Line 1", "Assembly Line 2", "Assembly Line 3"]

  // Filter data
  const filteredData = productionOrdersData.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
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
      case 'planned': return 'bg-gray-100 text-gray-700'
      case 'in-progress': return 'bg-blue-100 text-blue-700'
      case 'completed': return 'bg-green-100 text-green-700'
      case 'on-hold': return 'bg-yellow-100 text-yellow-700'
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

  const getLineStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'maintenance': return 'bg-yellow-100 text-yellow-700'
      case 'inactive': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const totalOrders = productionOrdersData.length
  const inProgressOrders = productionOrdersData.filter(o => o.status === 'in-progress').length
  const completedOrders = productionOrdersData.filter(o => o.status === 'completed').length
  const totalOutput = productionLinesData.reduce((sum, line) => sum + line.outputToday, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manufacturing</h1>
          <p className="text-slate-500 mt-1">Manage production orders and manufacturing operations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Production Report
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white cursor-pointer">
            <Plus className="w-4 h-4 mr-2" />
            New Production Order
          </Button>
        </div>
      </div>

      {/* Manufacturing Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Total Orders</p>
                <p className="text-2xl font-bold text-red-900">{totalOrders}</p>
                <p className="text-xs text-red-600 mt-1">{completedOrders} completed</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Settings className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-900">{inProgressOrders}</p>
                <p className="text-xs text-blue-600 mt-1">Active production</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Output</p>
                <p className="text-2xl font-bold text-green-900">{totalOutput.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">Units today</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Avg Quality</p>
                <p className="text-2xl font-bold text-yellow-900">4.5</p>
                <p className="text-xs text-yellow-600 mt-1">Score</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("production")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "production"
                ? "border-red-500 text-red-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Production Orders
          </button>
          <button
            onClick={() => setActiveTab("lines")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "lines"
                ? "border-red-500 text-red-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Production Lines
          </button>
          <button
            onClick={() => setActiveTab("quality")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "quality"
                ? "border-red-500 text-red-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Quality Control
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "analytics"
                ? "border-red-500 text-red-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Manufacturing Analytics
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "production" && (
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
                      placeholder="Search by order number or product..."
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
                      className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/20 appearance-none"
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
                      className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/20 appearance-none"
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

          {/* Production Orders Table */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-lg font-semibold">Production Orders</CardTitle>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-slate-700">Show</label>
                  <select
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                    className="h-8 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/20 appearance-none"
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
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Product</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Batch</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-700">Quantity</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Start Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">End Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Line</th>
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
                            <Package className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-900">{order.product}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-900">{order.batchNumber}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-sm font-medium text-slate-900">{order.quantity}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-700">{order.startDate}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-700">{order.endDate}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-900">{order.productionLine}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                            {order.priority}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status.replace('-', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-1">
                            <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="View Details">
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

      {activeTab === "lines" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Production Lines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productionLinesData.map((line) => (
                  <div key={line.id} className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{line.name}</h3>
                        <p className="text-sm text-slate-500">Supervisor: {line.supervisor}</p>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getLineStatusColor(line.status)}`}>
                        {line.status === 'active' ? 
                          <Activity className="w-5 h-5 text-white" /> : 
                          <Wrench className="w-5 h-5 text-white" />
                        }
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Current Product:</span>
                        <span className="text-sm text-slate-900">{line.currentProduct || 'Idle'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Capacity:</span>
                        <span className="text-sm text-slate-900">{line.capacity} units/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Efficiency:</span>
                        <span className="text-sm font-medium text-slate-900">{line.efficiency}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Output Today:</span>
                        <span className="text-sm text-slate-900">{line.outputToday} units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Quality Score:</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-slate-900">{line.qualityScore}</span>
                          <span className="text-sm text-slate-500">/5.0</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Downtime:</span>
                        <span className="text-sm text-slate-900">{line.downtime} min today</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "quality" && (
        <div className="space-y-6">
          <Card>
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Quality Control</h3>
              <p className="text-slate-500 mb-4">Manage quality inspections and compliance standards.</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" className="cursor-pointer">
                  Quality Reports
                </Button>
                <Button variant="outline" className="cursor-pointer">
                  Inspections
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white cursor-pointer">
                  Defect Tracking
                </Button>
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
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Manufacturing Analytics</h3>
              <p className="text-slate-500 mb-4">Generate comprehensive manufacturing reports and analytics.</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" className="cursor-pointer">
                  Production Efficiency
                </Button>
                <Button variant="outline" className="cursor-pointer">
                  Capacity Utilization
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white cursor-pointer">
                  Cost Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
