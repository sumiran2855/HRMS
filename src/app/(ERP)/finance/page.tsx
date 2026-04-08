"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Label } from "@/components/ui/Label"
import { 
  DollarSign, 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  TrendingUp, 
  TrendingDown,
  Filter,
  Download,
  Receipt,
  CreditCard,
  Calculator,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3
} from "lucide-react"

// Mock finance data
const transactionsData = [
  {
    id: 1,
    type: "invoice",
    number: "INV-001",
    client: "Tech Solutions Inc.",
    amount: 15430.00,
    date: "2024-03-15",
    dueDate: "2024-04-15",
    status: "paid",
    category: "Sales",
    description: "Software license renewal",
    paymentMethod: "Bank Transfer"
  },
  {
    id: 2,
    type: "expense",
    number: "EXP-002",
    vendor: "Office Supplies Co.",
    amount: 3250.00,
    date: "2024-03-14",
    dueDate: "2024-03-14",
    status: "paid",
    category: "Office Supplies",
    description: "Monthly office supplies",
    paymentMethod: "Credit Card"
  },
  {
    id: 3,
    type: "invoice",
    number: "INV-003",
    client: "Global Manufacturing",
    amount: 28750.00,
    date: "2024-03-13",
    dueDate: "2024-04-13",
    status: "pending",
    category: "Sales",
    description: "Equipment purchase",
    paymentMethod: "Pending"
  },
  {
    id: 4,
    type: "expense",
    number: "EXP-004",
    vendor: "Cloud Services Ltd.",
    amount: 890.00,
    date: "2024-03-12",
    dueDate: "2024-03-12",
    status: "paid",
    category: "Software",
    description: "Cloud storage subscription",
    paymentMethod: "Auto-pay"
  }
]

const accountsData = [
  {
    id: 1,
    name: "Business Checking",
    type: "Asset",
    balance: 125430.50,
    currency: "USD",
    bankName: "National Bank",
    accountNumber: "****4582",
    lastUpdated: "2024-03-15"
  },
  {
    id: 2,
    name: "Savings Account",
    type: "Asset",
    balance: 45680.00,
    currency: "USD",
    bankName: "National Bank",
    accountNumber: "****7891",
    lastUpdated: "2024-03-14"
  },
  {
    id: 3,
    name: "Credit Card",
    type: "Liability",
    balance: -8234.75,
    currency: "USD",
    bankName: "Business Credit Corp",
    accountNumber: "****2345",
    lastUpdated: "2024-03-15"
  }
]

export default function FinancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [activeTab, setActiveTab] = useState("transactions")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)

  const types = ["All Types", "invoice", "expense", "payment", "refund"]
  const statuses = ["All Status", "paid", "pending", "overdue", "cancelled"]

  // Filter data
  const filteredData = transactionsData.filter(transaction => {
    const matchesSearch = 
      transaction.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.vendor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = selectedType === "All Types" || transaction.type === selectedType
    const matchesStatus = selectedStatus === "All Status" || transaction.status === selectedStatus

    return matchesSearch && matchesType && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'overdue': return 'bg-red-100 text-red-700'
      case 'cancelled': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />
      case 'overdue': return <AlertTriangle className="w-4 h-4 text-red-600" />
      default: return <FileText className="w-4 h-4 text-gray-600" />
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

  const totalRevenue = transactionsData
    .filter(t => t.type === 'invoice' && t.status === 'paid')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const totalExpenses = transactionsData
    .filter(t => t.type === 'expense' && t.status === 'paid')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const pendingInvoices = transactionsData
    .filter(t => t.type === 'invoice' && t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalBalance = accountsData.reduce((sum, account) => sum + account.balance, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Finance & Accounting</h1>
          <p className="text-slate-500 mt-1">Manage financial transactions and accounts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white cursor-pointer">
            <Plus className="w-4 h-4 mr-2" />
            New Transaction
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(totalRevenue)}</p>
                <p className="text-xs text-green-600 mt-1">↑+15% from last month</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-900">{formatCurrency(totalExpenses)}</p>
                <p className="text-xs text-red-600 mt-1">↑+8% from last month</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <ArrowDownRight className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Pending Invoices</p>
                <p className="text-2xl font-bold text-yellow-900">{formatCurrency(pendingInvoices)}</p>
                <p className="text-xs text-yellow-600 mt-1">{transactionsData.filter(t => t.type === 'invoice' && t.status === 'pending').length} invoices</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Balance</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(totalBalance)}</p>
                <p className="text-xs text-blue-600 mt-1">Across all accounts</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("transactions")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "transactions"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveTab("accounts")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "accounts"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Accounts
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "reports"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Reports
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "transactions" && (
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
                      placeholder="Search by number, client, or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    {/* <Label htmlFor="type" className="text-sm font-medium text-slate-700">Type</Label> */}
                    <select
                      id="type"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 appearance-none"
                    >
                      {types.map(type => (
                        <option key={type} value={type}>{type}</option>
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

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-lg font-semibold">Transactions</CardTitle>
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
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Number</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Client/Vendor</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Description</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-700">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Due Date</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Status</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <span className="text-sm font-mono text-slate-900">{transaction.number}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {transaction.type === 'invoice' ? 
                              <ArrowUpRight className="w-4 h-4 text-green-600" /> : 
                              <ArrowDownRight className="w-4 h-4 text-red-600" />
                            }
                            <span className={`text-sm font-medium capitalize ${
                              transaction.type === 'invoice' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.type}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-900">{transaction.client || transaction.vendor}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-700">{transaction.description}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className={`text-sm font-medium ${
                            transaction.type === 'invoice' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'invoice' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-700">{transaction.date}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-700">{transaction.dueDate}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {getStatusIcon(transaction.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                              {transaction.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-1">
                            <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit Transaction">
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

      {activeTab === "accounts" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accountsData.map((account) => (
                  <div key={account.id} className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{account.name}</h3>
                        <p className="text-sm text-slate-500">{account.bankName}</p>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        account.type === 'Asset' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {account.type === 'Asset' ? 
                          <DollarSign className="w-5 h-5 text-green-600" /> : 
                          <CreditCard className="w-5 h-5 text-red-600" />
                        }
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Balance:</span>
                        <span className={`text-lg font-bold ${
                          account.balance >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatCurrency(account.balance)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Account:</span>
                        <span className="text-sm text-slate-900">{account.accountNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Updated:</span>
                        <span className="text-sm text-slate-900">{account.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "reports" && (
        <div className="space-y-6">
          <Card>
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Financial Reports</h3>
              <p className="text-slate-500 mb-4">Generate comprehensive financial reports and analytics.</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" className="cursor-pointer">
                  Profit & Loss
                </Button>
                <Button variant="outline" className="cursor-pointer">
                  Cash Flow
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                  Balance Sheet
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
