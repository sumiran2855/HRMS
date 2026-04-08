"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Label } from "@/components/ui/Label"
import { 
  Package, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Filter,
  Download,
  Eye,
  BarChart3,
  Warehouse,
  Truck
} from "lucide-react"

// Mock inventory data
const inventoryData = [
  {
    id: 1,
    sku: "LAP-001",
    name: "Laptop Model X",
    category: "Electronics",
    quantity: 45,
    minStock: 20,
    maxStock: 100,
    unitPrice: 1299.99,
    totalValue: 58499.55,
    location: "Warehouse A",
    supplier: "Tech Supplies Inc.",
    lastUpdated: "2024-03-15",
    status: "in-stock",
    reorderPoint: 25
  },
  {
    id: 2,
    sku: "OFF-002",
    name: "Office Chair Pro",
    category: "Furniture",
    quantity: 18,
    minStock: 15,
    maxStock: 50,
    unitPrice: 299.99,
    totalValue: 5399.82,
    location: "Warehouse B",
    supplier: "Furniture Plus",
    lastUpdated: "2024-03-14",
    status: "low-stock",
    reorderPoint: 20
  },
  {
    id: 3,
    sku: "PEN-003",
    name: "Wireless Mouse",
    category: "Electronics",
    quantity: 156,
    minStock: 50,
    maxStock: 200,
    unitPrice: 29.99,
    totalValue: 4678.44,
    location: "Warehouse A",
    supplier: "Tech Supplies Inc.",
    lastUpdated: "2024-03-16",
    status: "in-stock",
    reorderPoint: 60
  },
  {
    id: 4,
    sku: "PAP-004",
    name: "A4 Paper Pack",
    category: "Office Supplies",
    quantity: 8,
    minStock: 25,
    maxStock: 100,
    unitPrice: 19.99,
    totalValue: 159.92,
    location: "Warehouse C",
    supplier: "Office Depot",
    lastUpdated: "2024-03-13",
    status: "out-of-stock",
    reorderPoint: 30
  }
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)

  const categories = ["All Categories", "Electronics", "Furniture", "Office Supplies", "Raw Materials"]
  const statuses = ["All Status", "in-stock", "low-stock", "out-of-stock"]

  // Filter data
  const filteredData = inventoryData.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory
    const matchesStatus = selectedStatus === "All Status" || item.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-700'
      case 'low-stock': return 'bg-yellow-100 text-yellow-700'
      case 'out-of-stock': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStockIcon = (quantity: number, minStock: number, maxStock: number) => {
    if (quantity <= 0) return <AlertTriangle className="w-4 h-4 text-red-600" />
    if (quantity <= minStock) return <TrendingDown className="w-4 h-4 text-yellow-600" />
    if (quantity >= maxStock) return <TrendingUp className="w-4 h-4 text-blue-600" />
    return <Package className="w-4 h-4 text-green-600" />
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const totalInventoryValue = inventoryData.reduce((sum, item) => sum + item.totalValue, 0)
  const lowStockItems = inventoryData.filter(item => item.status === 'low-stock').length
  const outOfStockItems = inventoryData.filter(item => item.status === 'out-of-stock').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
          <p className="text-slate-500 mt-1">Track and manage your inventory</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Items</p>
                <p className="text-2xl font-bold text-blue-900">{inventoryData.length}</p>
                <p className="text-xs text-blue-600 mt-1">Value: {formatCurrency(totalInventoryValue)}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-900">{lowStockItems}</p>
                <p className="text-xs text-yellow-600 mt-1">Need reordering</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-900">{outOfStockItems}</p>
                <p className="text-xs text-red-600 mt-1">Immediate action needed</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Quantity</p>
                <p className="text-2xl font-bold text-green-900">
                  {inventoryData.reduce((sum, item) => sum + item.quantity, 0).toLocaleString()}
                </p>
                <p className="text-xs text-green-600 mt-1">Across all items</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
                  placeholder="Search by name, SKU, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                {/* <Label htmlFor="category" className="text-sm font-medium text-slate-700">Category</Label> */}
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 appearance-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                {/* <Label htmlFor="status" className="text-sm font-medium text-slate-700">Status</Label> */}
                <select
                  id="status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 appearance-none"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-lg font-semibold">Inventory Items</CardTitle>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Show</label>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="h-8 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 appearance-none"
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
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">SKU</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Item Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Category</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Quantity</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Min/Max</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-700">Unit Price</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-700">Total Value</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Location</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Status</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <span className="text-sm font-mono text-slate-900">{item.sku}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getStockIcon(item.quantity, item.minStock, item.maxStock)}
                        <span className="text-sm font-medium text-slate-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-slate-700">{item.category}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-sm font-medium text-slate-900">{item.quantity}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-sm text-slate-700">{item.minStock}/{item.maxStock}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-sm text-slate-900">{formatCurrency(item.unitPrice)}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-sm font-medium text-slate-900">{formatCurrency(item.totalValue)}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Warehouse className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-700">{item.location}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit Item">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Item">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-slate-600">
                Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredData.length)} of {filteredData.length} entries
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="cursor-pointer"
                >
                  Previous
                </Button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "primary" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={`cursor-pointer ${currentPage === page ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="cursor-pointer"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
