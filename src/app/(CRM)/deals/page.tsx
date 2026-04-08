"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Search, Handshake, Plus, Eye, Edit, Trash2, ChevronLeft, ChevronRight, Filter, Download, Phone, Mail, MapPin, Calendar, DollarSign, TrendingUp } from "lucide-react"
import { AddDealModal } from "@/components/dashboard/crm/AddDealModal"
import { EditDealModal } from "@/components/dashboard/crm/EditDealModal"
import { ViewDealModal } from "@/components/dashboard/crm/ViewDealModal"
import { DeleteConfirmModal } from "@/components/dashboard/crm/DeleteConfirmModal"

// ─── Sample data (replace with your actual dealsData) ───────────────────────
const dealsData = [
  { id:1,  dealName:"Enterprise Software License", companyName:"Tech Solutions Inc.", contactPerson:"John Smith", email:"john.smith@company.com", phone:" +1 234-567-8901", value:250000, stage:"proposal", probability:75, expectedCloseDate:"2024-04-15", assignedTo:"Alex Johnson", location:"New York, USA", products:["Software License", "Support Package"], source:"Website" },
  { id:2,  dealName:"Marketing Automation Platform", companyName:"Digital Marketing Co.", contactPerson:"Sarah Williams", email:"sarah.williams@business.com", phone:" +1 234-567-8902", value:120000, stage:"negotiation", probability:90, expectedCloseDate:"2024-04-10", assignedTo:"Emma Davis", location:"Los Angeles, USA", products:["Marketing Platform", "Training"], source:"LinkedIn" },
  { id:3,  dealName:"Cloud Infrastructure Setup", companyName:"StartupHub", contactPerson:"Michael Brown", email:"michael.brown@startup.io", phone:" +1 234-567-8903", value:180000, stage:"qualified", probability:60, expectedCloseDate:"2024-05-01", assignedTo:"Chris Wilson", location:"San Francisco, USA", products:["Cloud Services", "Migration Support"], source:"Referral" },
  { id:4,  dealName:"ERP System Implementation", companyName:"Enterprise Solutions", contactPerson:"Emily Davis", email:"emily.davis@enterprise.com", phone:" +1 234-567-8904", value:450000, stage:"discovery", probability:25, expectedCloseDate:"2024-06-15", assignedTo:"Alex Johnson", location:"Chicago, USA", products:["ERP System", "Customization"], source:"Cold Email" },
  { id:5,  dealName:"Cybersecurity Package", companyName:"TechCorp International", contactPerson:"David Martinez", email:"david.martinez@techcorp.com", phone:" +1 234-567-8905", value:95000, stage:"closed-won", probability:100, expectedCloseDate:"2024-03-20", assignedTo:"Emma Davis", location:"Houston, USA", products:["Security Suite", "Monitoring"], source:"Conference" },
  { id:6,  dealName:"Data Analytics Platform", companyName:"Retail Giants", contactPerson:"Lisa Anderson", email:"lisa.anderson@retail.com", phone:" +1 234-567-8906", value:200000, stage:"proposal", probability:80, expectedCloseDate:"2024-04-20", assignedTo:"Chris Wilson", location:"Miami, USA", products:["Analytics Platform", "BI Tools"], source:"Website" },
  { id:7,  dealName:"Mobile App Development", companyName:"Finance Hub", contactPerson:"Robert Taylor", email:"robert.taylor@finance.com", phone:" +1 234-567-8907", value:150000, stage:"qualified", probability:55, expectedCloseDate:"2024-05-15", assignedTo:"Alex Johnson", location:"Boston, USA", products:["App Development", "Maintenance"], source:"Referral" },
  { id:8,  dealName:"Healthcare Management System", companyName:"Healthcare Plus", contactPerson:"Jennifer White", email:"jennifer.white@healthcare.com", phone:" +1 234-567-8908", value:320000, stage:"negotiation", probability:85, expectedCloseDate:"2024-04-05", assignedTo:"Emma Davis", location:"Seattle, USA", products:["HMS Software", "Training"], source:"LinkedIn" },
  { id:9,  dealName:"Supply Chain Solution", companyName:"Manufacturing Pro", contactPerson:"James Thompson", email:"james.thompson@manufacturing.com", phone:" +1 234-567-8909", value:280000, stage:"discovery", probability:30, expectedCloseDate:"2024-06-30", assignedTo:"Chris Wilson", location:"Dallas, USA", products:["SCM Software", "Integration"], source:"Cold Email" },
  { id:10, dealName:"E-commerce Platform", companyName:"Consulting Group", contactPerson:"Maria Garcia", email:"maria.garcia@consulting.com", phone:" +1 234-567-8910", value:175000, stage:"proposal", probability:70, expectedCloseDate:"2024-04-25", assignedTo:"Alex Johnson", location:"Phoenix, USA", products:["E-commerce Platform", "Payment Gateway"], source:"Conference" },
  { id:11, dealName:"Real Estate CRM", companyName:"Real Estate Ventures", contactPerson:"William Jones", email:"william.jones@realestate.com", phone:" +1 234-567-8911", value:125000, stage:"closed-lost", probability:0, expectedCloseDate:"2024-03-15", assignedTo:"Emma Davis", location:"Denver, USA", products:["CRM Software", "Mobile App"], source:"Website" },
  { id:12, dealName:"Legal Practice Management", companyName:"Legal Services", contactPerson:"Patricia Miller", email:"patricia.miller@legal.com", phone:" +1 234-567-8912", value:95000, stage:"qualified", probability:65, expectedCloseDate:"2024-05-10", assignedTo:"Chris Wilson", location:"Atlanta, USA", products:["Practice Management", "Document Management"], source:"Referral" },
]

export default function DealsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [selectedStage, setSelectedStage] = useState("All Stages")
  const [selectedSource, setSelectedSource] = useState("All Sources")
  const [isAddDealModalOpen, setIsAddDealModalOpen] = useState(false)
  const [isEditDealModalOpen, setIsEditDealModalOpen] = useState(false)
  const [isViewDealModalOpen, setIsViewDealModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedDeal, setSelectedDeal] = useState<any>(null)

  // Filter logic
  const filteredData = dealsData.filter(deal => {
    const q = searchTerm.toLowerCase()
    const matchSearch =
      !q ||
      deal.dealName.toLowerCase().includes(q) ||
      deal.companyName.toLowerCase().includes(q) ||
      deal.contactPerson.toLowerCase().includes(q) ||
      deal.assignedTo.toLowerCase().includes(q)
    const matchStage = selectedStage === "All Stages" || deal.stage === selectedStage
    const matchSource = selectedSource === "All Sources" || deal.source === selectedSource
    return matchSearch && matchStage && matchSource
  })

  const totalPages  = Math.max(1, Math.ceil(filteredData.length / entriesPerPage))
  const safePage    = Math.min(currentPage, totalPages)
  const startIndex  = (safePage - 1) * entriesPerPage
  const endIndex    = startIndex + entriesPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  const updateFilter = (setter:any) => (e:any) => { setter(e.target.value); setCurrentPage(1) }

  // Compact select classes
  const selectCls =
    "h-9 rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm text-slate-800 " +
    "shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 appearance-none cursor-pointer"

  // Calculate statistics
  const stats = {
    total: dealsData.length,
    discovery: dealsData.filter(d => d.stage === 'discovery').length,
    qualified: dealsData.filter(d => d.stage === 'qualified').length,
    proposal: dealsData.filter(d => d.stage === 'proposal').length,
    negotiation: dealsData.filter(d => d.stage === 'negotiation').length,
    closedWon: dealsData.filter(d => d.stage === 'closed-won').length,
    closedLost: dealsData.filter(d => d.stage === 'closed-lost').length,
    totalValue: dealsData.reduce((sum, d) => sum + d.value, 0),
    weightedValue: dealsData.reduce((sum, d) => sum + (d.value * d.probability / 100), 0)
  }

  // ─── Stage config ────────────────────────────────────────────────────────────
  const STAGE_CONFIG: Record<string, { label: string; pill: string }> = {
    discovery:   { label: "Discovery",   pill: "bg-slate-50 text-slate-700 border border-slate-100"   },
    qualified:   { label: "Qualified",   pill: "bg-blue-50 text-blue-700 border border-blue-100"       },
    proposal:    { label: "Proposal",    pill: "bg-violet-50 text-violet-700 border border-violet-100"   },
    negotiation: { label: "Negotiation", pill: "bg-orange-50 text-orange-700 border border-orange-100"   },
    'closed-won': { label: "Won",         pill: "bg-emerald-50 text-emerald-700 border border-emerald-100" },
    'closed-lost':{ label: "Lost",         pill: "bg-red-50 text-red-700 border border-red-100"       },
  }

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("")
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600'
    if (probability >= 60) return 'text-yellow-600'
    if (probability >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const handleAction = (action: string, dealId: number) => {
    const deal = dealsData.find(d => d.id === dealId)
    if (!deal) return

    switch (action) {
      case 'view':
        setSelectedDeal(deal)
        setIsViewDealModalOpen(true)
        break
      case 'edit':
        setSelectedDeal(deal)
        setIsEditDealModalOpen(true)
        break
      case 'delete':
        setSelectedDeal(deal)
        setIsDeleteModalOpen(true)
        break
    }
  }

  const handleUpdateDeal = (updatedDeal: any) => {
    const index = dealsData.findIndex(d => d.id === updatedDeal.id)
    if (index !== -1) {
      dealsData[index] = updatedDeal
    }
  }

  const handleDeleteDeal = () => {
    const index = dealsData.findIndex(d => d.id === selectedDeal?.id)
    if (index !== -1) {
      dealsData.splice(index, 1)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Deals Management</h1>
          <p className="text-slate-500 mt-1">Track and manage your sales deals pipeline</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button 
            onClick={() => setIsAddDealModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Deal
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Deals</p>
                <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
                <p className="text-xs text-blue-600 mt-1">Active pipeline</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Handshake className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Closed Won</p>
                <p className="text-2xl font-bold text-green-900">{stats.closedWon}</p>
                <p className="text-xs text-green-600 mt-1">Successfully closed</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Value</p>
                <p className="text-2xl font-bold text-purple-900">${(stats.totalValue / 1000).toFixed(0)}K</p>
                <p className="text-xs text-purple-600 mt-1">Pipeline value</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Weighted Value</p>
                <p className="text-2xl font-bold text-orange-900">${(stats.weightedValue / 1000).toFixed(0)}K</p>
                <p className="text-xs text-orange-600 mt-1">Expected revenue</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Stages Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Discovery</p>
              <p className="text-xl font-bold text-gray-900">{stats.discovery}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-blue-600">Qualified</p>
              <p className="text-xl font-bold text-blue-900">{stats.qualified}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-purple-600">Proposal</p>
              <p className="text-xl font-bold text-purple-900">{stats.proposal}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-orange-600">Negotiation</p>
              <p className="text-xl font-bold text-orange-900">{stats.negotiation}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-green-600">Won</p>
              <p className="text-xl font-bold text-green-900">{stats.closedWon}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-red-600">Lost</p>
              <p className="text-xl font-bold text-red-900">{stats.closedLost}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Controls */}
      <Card className="overflow-hidden border border-slate-200 shadow-sm rounded-xl">
        <CardHeader className="px-5 py-4 border-b border-slate-100">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

            {/* Left: selects */}
            <div className="flex flex-wrap gap-2 items-center">

              {/* Entries */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1) }}
                  className={selectCls + " pr-6"}
                >
                  {[10, 25, 50, 100].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              {/* Stage */}
              <select value={selectedStage} onChange={updateFilter(setSelectedStage)} className={selectCls + " pr-6"}>
                <option>All Stages</option>
                {Object.keys(STAGE_CONFIG).map(s => (
                  <option key={s} value={s}>{STAGE_CONFIG[s].label}</option>
                ))}
              </select>

              {/* Source */}
              <select value={selectedSource} onChange={updateFilter(setSelectedSource)} className={selectCls + " pr-6"}>
                {["All Sources","Website","LinkedIn","Referral","Cold Email","Conference"].map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Right: search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
              <Input
                placeholder="Search deal, company, contact…"
                value={searchTerm}
                onChange={updateFilter(setSearchTerm)}
                className="pl-9 h-9 text-sm w-full rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              {/* Head */}
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {[
                    ["Deal",        "text-left",   "w-48"],
                    ["Company",     "text-left",   "w-40 hidden sm:table-cell"],
                    ["Contact",     "text-left",   "w-48 hidden md:table-cell"],
                    ["Stage",       "text-center", "w-28"],
                    ["Probability", "text-center", "w-32 hidden lg:table-cell"],
                    ["Value",       "text-right",  "w-28"],
                    ["Close Date",  "text-center", "w-32 hidden xl:table-cell"],
                    ["Assigned To", "text-left",   "w-32 hidden 2xl:table-cell"],
                    ["Actions",     "text-center", "w-24"],
                  ].map(([label, align, w]) => (
                    <th
                      key={label}
                      className={`${align} ${w} py-2.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400`}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-slate-100">
                {paginatedData.map(deal => {
                  const cfg = STAGE_CONFIG[deal.stage]
                  return (
                    <tr
                      key={deal.id}
                      className="group hover:bg-slate-50/80 transition-colors duration-100"
                    >
                      {/* Deal */}
                      <td className="py-3 px-4">
                        <div className="min-w-0">
                          <p className="font-medium text-slate-800 truncate">{deal.dealName}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {deal.products.slice(0, 2).map((product, index) => (
                              <span key={index} className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                {product}
                              </span>
                            ))}
                            {deal.products.length > 2 && (
                              <span className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                +{deal.products.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Company */}
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <p className="font-medium text-slate-800 truncate">{deal.companyName}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate">{deal.location}</span>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-3 px-4 hidden md:table-cell">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <span className="font-medium text-slate-700 truncate">{deal.contactPerson}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Mail className="w-3 h-3 shrink-0 text-slate-400" />
                            <span className="truncate">{deal.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Phone className="w-3 h-3 shrink-0 text-slate-400" />
                            <span>{deal.phone}</span>
                          </div>
                        </div>
                      </td>

                      {/* Stage */}
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${cfg.pill}`}>
                          {cfg.label}
                        </span>
                      </td>

                      {/* Probability */}
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-full max-w-[50px] bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${
                                deal.probability >= 80 ? 'bg-emerald-500' :
                                deal.probability >= 60 ? 'bg-amber-500' :
                                deal.probability >= 40 ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${deal.probability}%` }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${
                            deal.probability >= 80 ? 'text-emerald-600' :
                            deal.probability >= 60 ? 'text-amber-600' :
                            deal.probability >= 40 ? 'text-orange-600' : 'text-red-600'
                          }`}>
                            {deal.probability}%
                          </span>
                        </div>
                      </td>

                      {/* Value */}
                      <td className="py-3 px-4 text-right">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                          ${(deal.value / 1000).toFixed(0)}K
                        </span>
                      </td>

                      {/* Close Date */}
                      <td className="py-3 px-4 hidden xl:table-cell">
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Calendar className="w-3 h-3 shrink-0 text-slate-400" />
                          <span>{deal.expectedCloseDate}</span>
                        </div>
                      </td>

                      {/* Assigned To */}
                      <td className="py-3 px-4 hidden 2xl:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 shrink-0 rounded-full bg-emerald-50 flex items-center justify-center">
                            <span className="text-[9px] font-semibold text-emerald-600">
                              {getInitials(deal.assignedTo)}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 truncate">{deal.assignedTo}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-0.5">
                          <button
                            onClick={() => handleAction("view", deal.id)}
                            title="View"
                            className="p-1.5 rounded-md text-blue-500 hover:bg-blue-50 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleAction("edit", deal.id)}
                            title="Edit"
                            className="p-1.5 rounded-md text-emerald-500 hover:bg-emerald-50 transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleAction("delete", deal.id)}
                            title="Delete"
                            className="p-1.5 rounded-md text-red-400 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {/* Empty state */}
            {paginatedData.length === 0 && (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <Handshake className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-sm font-medium text-slate-600">No deals found</p>
                <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search term.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card className="border border-slate-200 shadow-sm rounded-xl">
          <CardContent className="p-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              {/* Info */}
              <p className="text-xs text-slate-500">
                Showing{" "}
                <span className="font-medium text-slate-700">{startIndex + 1}</span>
                {" "}–{" "}
                <span className="font-medium text-slate-700">
                  {Math.min(endIndex, filteredData.length)}
                </span>
                {" "}of{" "}
                <span className="font-medium text-slate-700">{filteredData.length}</span>
                {" "}entries
                {filteredData.length !== dealsData.length && (
                  <span className="text-slate-400"> (filtered from {dealsData.length} total)</span>
                )}
              </p>

              {/* Pages */}
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={safePage === 1}
                  className="h-8 px-2.5 text-xs gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Prev
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={`h-8 w-8 text-xs cursor-pointer ${
                        safePage === page
                          ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                          : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={safePage === totalPages}
                  className="h-8 px-2.5 text-xs gap-1 cursor-pointer"
                >
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Deal Modal */}
      <AddDealModal 
        isOpen={isAddDealModalOpen} 
        onClose={() => setIsAddDealModalOpen(false)} 
      />

      {/* Edit Deal Modal */}
      <EditDealModal 
        isOpen={isEditDealModalOpen} 
        onClose={() => setIsEditDealModalOpen(false)} 
        deal={selectedDeal}
        onUpdate={handleUpdateDeal}
      />

      {/* View Deal Modal */}
      <ViewDealModal 
        isOpen={isViewDealModalOpen} 
        onClose={() => setIsViewDealModalOpen(false)} 
        deal={selectedDeal}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteDeal}
        title="Delete Deal"
        message="Are you sure you want to delete this deal? This action cannot be undone."
        itemName={selectedDeal?.dealName || ''}
        itemType="deal"
      />
    </div>
  )
}
