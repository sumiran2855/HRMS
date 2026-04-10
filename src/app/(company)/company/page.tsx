"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Search, Plus, Eye, Edit, Trash2, Building, Users, MapPin, Mail, Phone, Filter, Globe, SearchX } from "lucide-react"
import { ViewCompanyModal } from "@/components/dashboard/company/ViewCompanyModal"
import { EditCompanyModal } from "@/components/dashboard/company/EditCompanyModal"
import { DeleteCompanyModal } from "@/components/dashboard/company/DeleteCompanyModal"
import { CompanyModal } from "@/components/dashboard/company/CompanyModal"

// Hardcoded company data
const companyData = [
  {
    id: "CMP001",
    name: "Tech Solutions Inc.",
    industry: "Technology",
    email: "contact@techsolutions.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, Silicon Valley, CA 94025",
    website: "www.techsolutions.com",
    employees: 150,
    revenue: 5000000,
    status: "active",
    foundedDate: "2015-03-15",
    description: "Leading technology solutions provider specializing in enterprise software development.",
    contact: "John Smith",
    rating: 4.5,
    ownerName: "Michael Johnson"
  },
  {
    id: "CMP002", 
    name: "Global Finance Corp",
    industry: "Finance",
    email: "info@globalfinance.com",
    phone: "+1 (555) 234-5678",
    address: "456 Wall Street, New York, NY 10005",
    website: "www.globalfinance.com",
    employees: 300,
    revenue: 15000000,
    status: "active",
    foundedDate: "2010-07-20",
    description: "International financial services company offering banking and investment solutions.",
    contact: "Sarah Williams",
    rating: 4.8,
    ownerName: "Robert Davis"
  },
  {
    id: "CMP003",
    name: "Healthcare Plus",
    industry: "Healthcare",
    email: "support@healthcareplus.com",
    phone: "+1 (555) 345-6789",
    address: "789 Medical Blvd, Boston, MA 02115",
    website: "www.healthcareplus.com",
    employees: 200,
    revenue: 8000000,
    status: "active",
    foundedDate: "2012-11-10",
    description: "Comprehensive healthcare services provider with focus on patient care and medical innovation.",
    contact: "Dr. Emily Chen",
    rating: 4.2,
    ownerName: "Dr. James Wilson"
  },
  {
    id: "CMP004",
    name: "Retail Dynamics",
    industry: "Retail",
    email: "sales@retaildynamics.com",
    phone: "+1 (555) 456-7890",
    address: "321 Shopping Ave, Chicago, IL 60601",
    website: "www.retaildynamics.com",
    employees: 500,
    revenue: 25000000,
    status: "active",
    foundedDate: "2008-05-12",
    description: "Leading retail chain with stores across multiple states offering quality products at competitive prices.",
    contact: "Lisa Anderson",
    rating: 3.9,
    ownerName: "David Martinez"
  },
  {
    id: "CMP005",
    name: "Energy Systems Ltd",
    industry: "Energy",
    email: "info@energysystems.com",
    phone: "+1 (555) 567-8901",
    address: "654 Power Road, Houston, TX 77001",
    website: "www.energysystems.com",
    employees: 180,
    revenue: 12000000,
    status: "inactive",
    foundedDate: "2014-09-18",
    description: "Renewable energy solutions provider specializing in solar and wind power systems.",
    contact: "Mark Thompson",
    rating: 4.1,
    ownerName: "Jennifer Brown"
  },
  {
    id: "CMP006",
    name: "Education First",
    industry: "Education",
    email: "admin@educationfirst.com",
    phone: "+1 (555) 678-9012",
    address: "987 Learning Lane, Boston, MA 02116",
    website: "www.educationfirst.com",
    employees: 120,
    revenue: 3000000,
    status: "active",
    foundedDate: "2016-02-28",
    description: "Innovative educational institution providing online and classroom-based learning programs.",
    contact: "Patricia Garcia",
    rating: 4.6,
    ownerName: "Richard Lee"
  },
  {
    id: "CMP007",
    name: "Logistics Pro",
    industry: "Logistics",
    email: "service@logisticspro.com",
    phone: "+1 (555) 789-0123",
    address: "147 Transport Way, Atlanta, GA 30301",
    website: "www.logisticspro.com",
    employees: 250,
    revenue: 9000000,
    status: "active",
    foundedDate: "2011-12-05",
    description: "Comprehensive logistics and supply chain management solutions for businesses of all sizes.",
    contact: "Kevin White",
    rating: 4.3,
    ownerName: "Maria Rodriguez"
  },
  {
    id: "CMP008",
    name: "Food & Beverage Co",
    industry: "Food & Beverage",
    email: "orders@foodbeverage.com",
    phone: "+1 (555) 890-1234",
    address: "258 Culinary Drive, Los Angeles, CA 90001",
    website: "www.foodbeverage.com",
    employees: 350,
    revenue: 18000000,
    status: "active",
    foundedDate: "2013-06-15",
    description: "Premium food and beverage company specializing in organic and natural products.",
    contact: "Nancy Taylor",
    rating: 4.7,
    ownerName: "Thomas Anderson"
  },
  {
    id: "CMP009",
    name: "Real Estate Masters",
    industry: "Real Estate",
    email: "info@realestatemasters.com",
    phone: "+1 (555) 901-2345",
    address: "369 Property Blvd, Miami, FL 33101",
    website: "www.realestatemasters.com",
    employees: 80,
    revenue: 6000000,
    status: "active",
    foundedDate: "2017-08-22",
    description: "Full-service real estate company offering residential and commercial property solutions.",
    contact: "Christopher Moore",
    rating: 4.0,
    ownerName: "Linda Jackson"
  }
]

const industries = ["All Industries", "Technology", "Finance", "Healthcare", "Retail", "Energy", "Education", "Logistics", "Food & Beverage", "Real Estate"]
const statusOptions = ["All Status", "active", "inactive"]

export default function CompanyPage() {
  const [searchName, setSearchName] = useState("")
  const [searchId, setSearchId] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [companyModalOpen, setCompanyModalOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<any>(null)

  const filteredCompanies = companyData.filter(company => {
    const matchesName = company.name.toLowerCase().includes(searchName.toLowerCase())
    const matchesId = company.id.toLowerCase().includes(searchId.toLowerCase())
    const matchesIndustry = selectedIndustry === "All Industries" || company.industry === selectedIndustry
    const matchesStatus = selectedStatus === "All Status" || company.status === selectedStatus
    return matchesName && matchesId && matchesIndustry && matchesStatus
  })

  const handleView = (company: any) => {
    setSelectedCompany(company)
    setViewModalOpen(true)
  }

  const handleEdit = (company: any) => {
    setSelectedCompany(company)
    setEditModalOpen(true)
  }

  const handleDelete = (company: any) => {
    setSelectedCompany(company)
    setDeleteModalOpen(true)
  }

  const handleCompany = () => {
    setCompanyModalOpen(true)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Company Management</h1>
          <p className="text-slate-500 mt-1">Manage company information and business relationships</p>
        </div>
        <Button onClick={handleCompany} className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
          <Plus className="w-4 h-4" />
          Add Company
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Companies</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{companyData.length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {formatCurrency(companyData.reduce((sum, comp) => sum + comp.revenue, 0))}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Globe className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Active</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {companyData.filter(comp => comp.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Employees</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {companyData.reduce((sum, comp) => sum + comp.employees, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search by name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search by ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="relative">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 appearance-none"
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 appearance-none"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
      </div>

      {/* Company Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Industry</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Employees</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{company.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {company.industry}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{company.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{company.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{company.ownerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-slate-900">{company.rating}</span>
                      <svg className="ml-1 w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">{company.employees}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">{formatCurrency(company.revenue)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      company.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {company.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(company)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Company Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(company)}
                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Company"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(company)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Company"
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
        
        {/* No Data Found Message */}
        {filteredCompanies.length === 0 && (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                <SearchX className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No companies found</h3>
                <p className="text-slate-500 text-sm max-w-md">
                  Try adjusting your search filters or check spelling to find companies you're looking for.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchName("")
                  setSearchId("")
                  setSelectedIndustry("All Industries")
                  setSelectedStatus("All Status")
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedCompany && (
        <>
          <ViewCompanyModal
            isOpen={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            company={selectedCompany}
          />
          
          <EditCompanyModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            company={selectedCompany}
          />
          
          <DeleteCompanyModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            company={selectedCompany}
          />
        </>
      )}
      
      <CompanyModal
        isOpen={companyModalOpen}
        onClose={() => setCompanyModalOpen(false)}
      />
    </div>
  )
}
