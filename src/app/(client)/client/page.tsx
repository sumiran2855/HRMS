"use client"

import { useState } from "react"
import { Plus, Search, Filter, Building2, Users, DollarSign, Mail, Phone, MapPin, Calendar, FileText, Eye, Edit, Trash2, TrendingUp, Globe, Briefcase, UserCheck, SearchX } from "lucide-react"
import { ClientModal } from "@/components/dashboard/client/ClientModal"
import { ViewClientModal } from "@/components/dashboard/client/ViewClientModal"
import { EditClientModal } from "@/components/dashboard/client/EditClientModal"
import { DeleteClientModal } from "@/components/dashboard/client/DeleteClientModal"

// Comprehensive client data structure for HRMS
const clientData = [
  {
    id: "CLI001",
    companyName: "Global Tech Solutions",
    industry: "Technology",
    contactPerson: "Sarah Johnson",
    email: "sarah.johnson@globaltech.com",
    phone: "+1 (555) 123-4567",
    address: "123 Innovation Drive, San Francisco, CA 94105",
    website: "www.globaltech.com",
    contractType: "Long-term",
    contractValue: 2500000,
    startDate: "2023-01-15",
    endDate: "2025-12-31",
    status: "active",
    employees: 150,
    projects: 12,
    rating: 4.8,
    paymentTerms: "Net 30",
    billingCycle: "Monthly",
    accountManager: "John Smith",
    lastContactDate: "2024-01-10",
    nextFollowUp: "2024-01-25",
    notes: "Premium enterprise client with ongoing software development projects.",
    services: ["Software Development", "IT Consulting", "Cloud Services"],
    documents: ["Contract_2023.pdf", "SOW_Q1_2024.pdf", "NDA_GlobalTech.pdf"]
  },
  {
    id: "CLI002",
    companyName: "Healthcare Plus Inc",
    industry: "Healthcare",
    contactPerson: "Dr. Michael Chen",
    email: "m.chen@healthcareplus.com",
    phone: "+1 (555) 234-5678",
    address: "456 Medical Center Blvd, Boston, MA 02115",
    website: "www.healthcareplus.com",
    contractType: "Annual",
    contractValue: 1800000,
    startDate: "2023-03-01",
    endDate: "2024-02-28",
    status: "active",
    employees: 200,
    projects: 8,
    rating: 4.5,
    paymentTerms: "Net 45",
    billingCycle: "Quarterly",
    accountManager: "Emily Davis",
    lastContactDate: "2024-01-08",
    nextFollowUp: "2024-01-22",
    notes: "Healthcare provider with EMR implementation and support services.",
    services: ["EMR Implementation", "Healthcare IT", "Data Analytics"],
    documents: ["Healthcare_Contract.pdf", "Compliance_Docs.pdf"]
  },
  {
    id: "CLI003",
    companyName: "Financial Services Corp",
    industry: "Finance",
    contactPerson: "Robert Williams",
    email: "r.williams@finserv.com",
    phone: "+1 (555) 345-6789",
    address: "789 Wall Street, New York, NY 10005",
    website: "www.finserv.com",
    contractType: "Project-based",
    contractValue: 850000,
    startDate: "2023-06-01",
    endDate: "2023-12-31",
    status: "completed",
    employees: 80,
    projects: 3,
    rating: 4.2,
    paymentTerms: "Net 15",
    billingCycle: "Milestone",
    accountManager: "Lisa Anderson",
    lastContactDate: "2023-12-15",
    nextFollowUp: "2024-02-01",
    notes: "Completed fintech application development project.",
    services: ["Fintech Development", "Security Audit", "Compliance"],
    documents: ["Project_Final_Report.pdf", "Invoice_Final.pdf"]
  },
  {
    id: "CLI004",
    companyName: "Retail Dynamics Ltd",
    industry: "Retail",
    contactPerson: "Jennifer Brown",
    email: "j.brown@retaildynamics.com",
    phone: "+1 (555) 456-7890",
    address: "321 Shopping Avenue, Chicago, IL 60601",
    website: "www.retaildynamics.com",
    contractType: "Retainer",
    contractValue: 1200000,
    startDate: "2023-04-01",
    endDate: "2024-03-31",
    status: "active",
    employees: 300,
    projects: 15,
    rating: 4.0,
    paymentTerms: "Net 30",
    billingCycle: "Monthly",
    accountManager: "Mark Thompson",
    lastContactDate: "2024-01-12",
    nextFollowUp: "2024-01-26",
    notes: "Retail chain with POS and inventory management solutions.",
    services: ["POS Systems", "Inventory Management", "E-commerce"],
    documents: ["Retainer_Agreement.pdf", "Service_Level_Agreement.pdf"]
  },
  {
    id: "CLI005",
    companyName: "Education First Academy",
    industry: "Education",
    contactPerson: "Patricia Garcia",
    email: "p.garcia@educationfirst.com",
    phone: "+1 (555) 567-8901",
    address: "987 Learning Lane, Austin, TX 78701",
    website: "www.educationfirst.com",
    contractType: "Annual",
    contractValue: 650000,
    startDate: "2023-09-01",
    endDate: "2024-08-31",
    status: "active",
    employees: 50,
    projects: 6,
    rating: 4.6,
    paymentTerms: "Net 60",
    billingCycle: "Quarterly",
    accountManager: "Kevin White",
    lastContactDate: "2024-01-11",
    nextFollowUp: "2024-01-24",
    notes: "Educational institution with learning management system implementation.",
    services: ["LMS Development", "Training Programs", "Support"],
    documents: ["Education_Contract.pdf", "Training_Materials.pdf"]
  },
  {
    id: "CLI006",
    companyName: "Logistics Pro Systems",
    industry: "Logistics",
    contactPerson: "David Martinez",
    email: "d.martinez@logisticspro.com",
    phone: "+1 (555) 678-9012",
    address: "147 Transport Way, Atlanta, GA 30301",
    website: "www.logisticspro.com",
    contractType: "Long-term",
    contractValue: 3200000,
    startDate: "2022-11-01",
    endDate: "2025-10-31",
    status: "active",
    employees: 180,
    projects: 20,
    rating: 4.9,
    paymentTerms: "Net 30",
    billingCycle: "Monthly",
    accountManager: "Nancy Taylor",
    lastContactDate: "2024-01-09",
    nextFollowUp: "2024-01-23",
    notes: "Major logistics company with comprehensive supply chain solutions.",
    services: ["Supply Chain Software", "Fleet Management", "Analytics"],
    documents: ["Master_Agreement.pdf", "SLA_Document.pdf", "Technical_Specs.pdf"]
  }
]

const industries = ["All Industries", "Technology", "Healthcare", "Finance", "Retail", "Education", "Logistics", "Manufacturing", "Consulting"]
const statuses = ["All Status", "active", "completed", "pending", "inactive"]
const contractTypes = ["All Types", "Long-term", "Annual", "Project-based", "Retainer", "Monthly"]

export default function ClientPage() {
  const [searchName, setSearchName] = useState("")
  const [searchContact, setSearchContact] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedContractType, setSelectedContractType] = useState("All Types")

  // Modal states
  const [clientModalOpen, setClientModalOpen] = useState(false)
  const [viewClientModalOpen, setViewClientModalOpen] = useState(false)
  const [editClientModalOpen, setEditClientModalOpen] = useState(false)
  const [deleteClientModalOpen, setDeleteClientModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 }).format(amount)

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })

  // Filter clients
  const filteredClients = clientData.filter((client) => {
    const matchesName = client.companyName.toLowerCase().includes(searchName.toLowerCase())
    const matchesContact = client.contactPerson.toLowerCase().includes(searchContact.toLowerCase())
    const matchesIndustry = selectedIndustry === "All Industries" || client.industry === selectedIndustry
    const matchesStatus = selectedStatus === "All Status" || client.status === selectedStatus
    const matchesContractType = selectedContractType === "All Types" || client.contractType === selectedContractType
    return matchesName && matchesContact && matchesIndustry && matchesStatus && matchesContractType
  })

  const handleView = (client: any) => {
    setSelectedClient(client)
    setViewClientModalOpen(true)
  }

  const handleEdit = (client: any) => {
    setSelectedClient(client)
    setEditClientModalOpen(true)
  }

  const handleDelete = (client: any) => {
    setSelectedClient(client)
    setDeleteClientModalOpen(true)
  }

  const handleAddClient = () => {
    setClientModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Client Management</h1>
          <p className="text-slate-500 mt-1">Manage your client relationships and contracts</p>
        </div>
        <button
          onClick={handleAddClient}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Clients</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{clientData.length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Active Projects</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {clientData.filter(c => c.status === 'active').reduce((sum, c) => sum + c.projects, 0)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {formatCurrency(clientData.reduce((sum, c) => sum + c.contractValue, 0))}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Active</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {clientData.filter(c => c.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by company name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search contact person..."
              value={searchContact}
              onChange={(e) => setSearchContact(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-3 py-2 pl-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 pl-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>{status === 'active' ? 'Active' : status === 'completed' ? 'Completed' : status === 'pending' ? 'Pending' : status === 'inactive' ? 'Inactive' : status}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <select
              value={selectedContractType}
              onChange={(e) => setSelectedContractType(e.target.value)}
              className="w-full px-3 py-2 pl-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {contractTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Client Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Industry</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contract</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Projects</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{client.companyName}</div>
                        <div className="text-xs text-slate-500">{client.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-slate-900">{client.contactPerson}</div>
                        <div className="text-xs text-slate-500">{client.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                        {client.industry}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-slate-900">{client.contractType}</div>
                        <div className="text-xs text-slate-500">{formatDate(client.startDate)} - {formatDate(client.endDate)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                      {formatCurrency(client.contractValue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{client.projects}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-slate-900">{client.rating}</span>
                        <svg className="ml-1 w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${client.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : client.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : client.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {client.status === 'active' ? 'Active' : client.status === 'completed' ? 'Completed' : client.status === 'pending' ? 'Pending' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleView(client)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Client Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(client)}
                          className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit Client"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(client)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Client"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* No Data Found Message */}
        {filteredClients.length === 0 && (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                <SearchX className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No clients found</h3>
                <p className="text-slate-500 text-sm max-w-md">
                  Try adjusting your search filters or check the spelling to find the clients you're looking for.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchName("")
                  setSearchContact("")
                  setSelectedIndustry("All Industries")
                  setSelectedStatus("All Status")
                  setSelectedContractType("All Types")
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Modals */}
        <ClientModal isOpen={clientModalOpen} onClose={() => setClientModalOpen(false)} />
        <ViewClientModal isOpen={viewClientModalOpen} onClose={() => setViewClientModalOpen(false)} client={selectedClient} />
        <EditClientModal isOpen={editClientModalOpen} onClose={() => setEditClientModalOpen(false)} client={selectedClient} />
        <DeleteClientModal isOpen={deleteClientModalOpen} onClose={() => setDeleteClientModalOpen(false)} client={selectedClient} />
      </div>
    </div>
  )
}
