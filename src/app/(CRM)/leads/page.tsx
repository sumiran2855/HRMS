"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Search, Users, Plus, Eye, Edit, Trash2, ChevronLeft, ChevronRight, Filter, Download, Phone, Mail, MapPin } from "lucide-react"
import { AddLeadModal } from "@/components/dashboard/crm/AddLeadModal"
import { EditLeadModal } from "@/components/dashboard/crm/EditLeadModal"
import { ViewLeadModal } from "@/components/dashboard/crm/ViewLeadModal"
import { DeleteConfirmModal } from "@/components/dashboard/crm/DeleteConfirmModal"

// ─── Sample data (replace with your actual leadsData) ───────────────────────
const leadsData = [
  { id:1,  name:"Sarah Chen",    position:"VP of Sales",       company:"Nexus Corp",     location:"San Francisco, CA", email:"sarah@nexus.io",      phone:"+1 415-555-0101", source:"LinkedIn",   status:"qualified",   value:48000,  assignedTo:"Alex Kim"   },
  { id:2,  name:"Marcus Webb",   position:"CTO",               company:"Pixel Dynamics", location:"Austin, TX",        email:"m.webb@pixel.dev",    phone:"+1 512-555-0188", source:"Conference", status:"proposal",    value:91500,  assignedTo:"Jamie Lee"  },
  { id:3,  name:"Priya Nair",    position:"Head of Ops",       company:"BlueOcean Ltd",  location:"London, UK",        email:"p.nair@blueocean.co", phone:" +44 20-5554-0203",source:"Referral",   status:"new",         value:22000,  assignedTo:"Alex Kim"   },
  { id:4,  name:"David Ramos",   position:"CEO",               company:"Lumen AI",       location:"Chicago, IL",       email:"dramos@lumen.ai",     phone:" +1 312-555-0144", source:"Website",    status:"contacted",   value:67000,  assignedTo:"Sam Torres" },
  { id:5,  name:"Elena Kovács",  position:"Procurement Lead",  company:"Argon Systems",  location:"Berlin, DE",        email:"e.kovacs@argon.de",   phone:" +49 30-555-0177", source:"Cold Email", status:"negotiation", value:115000, assignedTo:"Jamie Lee"  },
  { id:6,  name:"Tom Bradley",   position:"IT Director",       company:"Crestfield Inc", location:"New York, NY",      email:"t.bradley@crest.com", phone:" +1 212-555-0166", source:"LinkedIn",   status:"qualified",   value:39500,  assignedTo:"Sam Torres" },
  { id:7,  name:"Aisha Diallo",  position:"CFO",               company:"Solaris Group",  location:"Dubai, UAE",        email:"adiallo@solaris.ae",  phone:" +971-4-555-0199", source:"Conference", status:"proposal",    value:84000,  assignedTo:"Alex Kim"   },
  { id:8,  name:"Oliver Grant",  position:"Founder",           company:"Quarx Labs",     location:"Toronto, CA",       email:"ogrant@quarx.io",     phone:" +1 416-555-0122", source:"Referral",   status:"new",         value:18000,  assignedTo:"Jamie Lee"  },
  { id:9,  name:"Mei Zhang",     position:"Purchasing Mgr",    company:"Horizons Co",    location:"Singapore, SG",     email:"mzhang@horizons.sg",  phone:" +65-6555-0133",   source:"Website",    status:"contacted",   value:55000,  assignedTo:"Sam Torres" },
  { id:10, name:"Rafael Souza",  position:"COO",               company:"PrimeTech",      location:"São Paulo, BR",     email:"r.souza@primetech.br",phone:" +55-11-5555-0155",source:"Cold Email", status:"negotiation", value:132000, assignedTo:"Alex Kim"   },
  { id:11, name:"Nina Petrov",   position:"Product Manager",   company:"Velox Ltd",      location:"Stockholm, SE",     email:"nina@velox.se",       phone:" +46-8-555-0177",  source:"LinkedIn",   status:"qualified",   value:44000,  assignedTo:"Jamie Lee"  },
  { id:12, name:"Chris Adeyemi", position:"Sales Manager",     company:"Brightline AG",  location:"Zurich, CH",        email:"c.adeyemi@bright.ch", phone:" +41-44-555-0188", source:"Conference", status:"new",         value:29000,  assignedTo:"Sam Torres" },
]

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedSource, setSelectedSource] = useState("All Sources")
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false)
  const [isEditLeadModalOpen, setIsEditLeadModalOpen] = useState(false)
  const [isViewLeadModalOpen, setIsViewLeadModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<any>(null)

  // Filter logic
  const filteredData = leadsData.filter(lead => {
    const q = searchTerm.toLowerCase()
    const matchSearch =
      !q ||
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.company.toLowerCase().includes(q) ||
      lead.assignedTo.toLowerCase().includes(q)
    const matchStatus = selectedStatus === "All Status" || lead.status === selectedStatus
    const matchSource = selectedSource === "All Sources" || lead.source === selectedSource
    return matchSearch && matchStatus && matchSource
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

  // ─── Status config ────────────────────────────────────────────────────────────
  const STATUS_CONFIG: Record<string, { label: string; pill: string }> = {
    new:         { label: "New",         pill: "bg-blue-50 text-blue-700 border border-blue-100"       },
    contacted:   { label: "Contacted",   pill: "bg-emerald-50 text-emerald-700 border border-emerald-100" },
    qualified:   { label: "Qualified",   pill: "bg-violet-50 text-violet-700 border border-violet-100"   },
    proposal:    { label: "Proposal",    pill: "bg-amber-50 text-amber-700 border border-amber-100"      },
    negotiation: { label: "Negotiation", pill: "bg-orange-50 text-orange-700 border border-orange-100"   },
  }

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("")
  }

  // Calculate statistics
  const stats = {
    total: leadsData.length,
    new: leadsData.filter(l => l.status === 'new').length,
    contacted: leadsData.filter(l => l.status === 'contacted').length,
    qualified: leadsData.filter(l => l.status === 'qualified').length,
    proposal: leadsData.filter(l => l.status === 'proposal').length,
    negotiation: leadsData.filter(l => l.status === 'negotiation').length,
    totalValue: leadsData.reduce((sum, l) => sum + l.value, 0)
  }

  const handleAction = (action: string, leadId: number) => {
    const lead = leadsData.find(l => l.id === leadId)
    if (!lead) return

    switch (action) {
      case 'view':
        setSelectedLead(lead)
        setIsViewLeadModalOpen(true)
        break
      case 'edit':
        setSelectedLead(lead)
        setIsEditLeadModalOpen(true)
        break
      case 'delete':
        setSelectedLead(lead)
        setIsDeleteModalOpen(true)
        break
    }
  }

  const handleUpdateLead = (updatedLead: any) => {
    const index = leadsData.findIndex(l => l.id === updatedLead.id)
    if (index !== -1) {
      leadsData[index] = updatedLead
    }
  }

  const handleDeleteLead = () => {
    const index = leadsData.findIndex(l => l.id === selectedLead?.id)
    if (index !== -1) {
      leadsData.splice(index, 1)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads Management</h1>
          <p className="text-slate-500 mt-1">Track and manage your sales leads</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            onClick={() => setIsAddLeadModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-blue-600">Total Leads</p>
              <p className="text-xl font-bold text-blue-900">{stats.total}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-blue-600">New</p>
              <p className="text-xl font-bold text-blue-900">{stats.new}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-yellow-600">Contacted</p>
              <p className="text-xl font-bold text-yellow-900">{stats.contacted}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-green-600">Qualified</p>
              <p className="text-xl font-bold text-green-900">{stats.qualified}</p>
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
      </div>

      {/* Total Value Card */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-green-600">Total Pipeline Value</p>
              <p className="text-3xl font-bold text-green-900">${stats.totalValue.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">Across all leads</p>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

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

              {/* Status */}
              <select value={selectedStatus} onChange={updateFilter(setSelectedStatus)} className={selectCls + " pr-6"}>
                <option>All Status</option>
                {Object.keys(STATUS_CONFIG).map(s => (
                  <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
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
                placeholder="Search name, email, company…"
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
                    ["Lead",       "text-left",   "w-48"],
                    ["Company",    "text-left",   "w-40 hidden sm:table-cell"],
                    ["Contact",    "text-left",   "w-48 hidden md:table-cell"],
                    ["Source",     "text-left",   "w-28 hidden lg:table-cell"],
                    ["Status",     "text-center", "w-28"],
                    ["Value",      "text-right",  "w-28"],
                    ["Assigned To","text-left",   "w-32 hidden xl:table-cell"],
                    ["Actions",    "text-center", "w-24"],
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
                {paginatedData.map(lead => {
                  const cfg = STATUS_CONFIG[lead.status]
                  return (
                    <tr
                      key={lead.id}
                      className="group hover:bg-slate-50/80 transition-colors duration-100"
                    >
                      {/* Lead */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 shrink-0 rounded-full bg-blue-50 flex items-center justify-center">
                            <span className="text-[10px] font-semibold text-blue-600">
                              {getInitials(lead.name)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-slate-800 truncate">{lead.name}</p>
                            <p className="text-xs text-slate-400 truncate">{lead.position}</p>
                          </div>
                        </div>
                      </td>

                      {/* Company */}
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <p className="font-medium text-slate-800 truncate">{lead.company}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate">{lead.location}</span>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-3 px-4 hidden md:table-cell">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                          <Mail className="w-3 h-3 shrink-0 text-slate-400" />
                          <span className="truncate">{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Phone className="w-3 h-3 shrink-0 text-slate-400" />
                          <span>{lead.phone}</span>
                        </div>
                      </td>

                      {/* Source */}
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <span className="text-xs text-slate-500">{lead.source}</span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${cfg.pill}`}>
                          {cfg.label}
                        </span>
                      </td>

                      {/* Value */}
                      <td className="py-3 px-4 text-right">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                          ${lead.value.toLocaleString()}
                        </span>
                      </td>

                      {/* Assigned To */}
                      <td className="py-3 px-4 hidden xl:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 shrink-0 rounded-full bg-emerald-50 flex items-center justify-center">
                            <span className="text-[9px] font-semibold text-emerald-600">
                              {getInitials(lead.assignedTo)}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 truncate">{lead.assignedTo}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-0.5">
                          <button
                            onClick={() => handleAction("view", lead.id)}
                            title="View"
                            className="p-1.5 rounded-md text-blue-500 hover:bg-blue-50 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleAction("edit", lead.id)}
                            title="Edit"
                            className="p-1.5 rounded-md text-emerald-500 hover:bg-emerald-50 transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleAction("delete", lead.id)}
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
                  <Users className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-sm font-medium text-slate-600">No leads found</p>
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
                {filteredData.length !== leadsData.length && (
                  <span className="text-slate-400"> (filtered from {leadsData.length} total)</span>
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

      {/* Add Lead Modal */}
      <AddLeadModal
        isOpen={isAddLeadModalOpen}
        onClose={() => setIsAddLeadModalOpen(false)}
      />

      {/* Edit Lead Modal */}
      <EditLeadModal
        isOpen={isEditLeadModalOpen}
        onClose={() => setIsEditLeadModalOpen(false)}
        lead={selectedLead}
        onUpdate={handleUpdateLead}
      />

      {/* View Lead Modal */}
      <ViewLeadModal
        isOpen={isViewLeadModalOpen}
        onClose={() => setIsViewLeadModalOpen(false)}
        lead={selectedLead}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteLead}
        title="Delete Lead"
        message="Are you sure you want to delete this lead? This action cannot be undone."
        itemName={selectedLead?.name || ''}
        itemType="lead"
      />
    </div>
  )
}
