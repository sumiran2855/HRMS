"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Search, Plus, Phone, Eye, Facebook, Twitter, Linkedin, Youtube, Globe, ChevronDown } from "lucide-react"
import { AddEmployeeModal } from "@/components/dashboard/employees/AddEmployeeModal"
import Link from "next/link"

// Hardcoded employee data
const employeesData = [
  {
    id: "MD-0001",
    name: "Ethan Mitchell",
    designation: "Web Designer",
    avatar: "/api/placeholder/150/150"
  },
  {
    id: "EMP001",
    name: "Sarah Johnson",
    designation: "Senior Developer",
    avatar: "/api/placeholder/150/150"
  },
  {
    id: "EMP002",
    name: "Michael Chen",
    designation: "Product Manager",
    avatar: "/api/placeholder/150/150"
  },
  {
    id: "EMP003",
    name: "Emily Rodriguez",
    designation: "UX Designer",
    avatar: "/api/placeholder/150/150"
  },
  {
    id: "EMP004",
    name: "David Kim",
    designation: "DevOps Engineer",
    avatar: "/api/placeholder/150/150"
  },
  {
    id: "EMP005",
    name: "Jessica Taylor",
    designation: "HR Manager",
    avatar: "/api/placeholder/150/150"
  },
  {
    id: "EMP006",
    name: "Robert Anderson",
    designation: "Backend Developer",
    avatar: "/api/placeholder/150/150"
  },
  {
    id: "EMP007",
    name: "Lisa Martinez",
    designation: "Frontend Developer",
    avatar: "/api/placeholder/150/150"
  },
  {
    id: "EMP008",
    name: "James Wilson",
    designation: "QA Engineer",
    avatar: "/api/placeholder/150/150"
  },
  {
    id: "EMP009",
    name: "Emma Davis",
    designation: "Senior Developer",
    avatar: "/api/placeholder/150/150"
  }
]

const designations = ["Employee Designation", "Senior Developer", "Product Manager", "UX Designer", "DevOps Engineer", "HR Manager", "Backend Developer", "Frontend Developer", "QA Engineer"]

export default function EmployeesPage() {
  const [searchName, setSearchName] = useState("")
  const [searchId, setSearchId] = useState("")
  const [selectedDesignation, setSelectedDesignation] = useState("Employee Designation")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredEmployees = employeesData.filter(employee => {
    const matchesName = employee.name.toLowerCase().includes(searchName.toLowerCase())
    const matchesId = employee.id.toLowerCase().includes(searchId.toLowerCase())
    const matchesDesignation = selectedDesignation === "Employee Designation" || employee.designation === selectedDesignation
    return matchesName && matchesId && matchesDesignation
  })

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Employee Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Employee ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="relative">
            <select
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(e.target.value)}
              className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 appearance-none"
            >
              {designations.map(designation => (
                <option key={designation} value={designation}>{designation}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
          <div className="flex items-end">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white w-full cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Add Employee
            </Button>
          </div>
        </div>

      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-3">
                <span className="text-xl font-semibold text-blue-600">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="font-semibold text-slate-900 text-center">{employee.name}</h3>
              <p className="text-sm text-slate-500 text-center">{employee.designation}</p>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center gap-3 mb-4">
              <button className="w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4 text-blue-600" />
              </button>
              <button className="w-8 h-8 rounded-full bg-sky-100 hover:bg-sky-200 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 text-sky-600" />
              </button>
              <button className="w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4 text-blue-700" />
              </button>
              <button className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4 text-red-600" />
              </button>
              <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                <Globe className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white cursor-pointer">
                <Phone className="w-4 h-4" />
                Call
              </Button>
              <Link href={`/employees/${employee.id}`} className="flex-1">
                <Button variant="outline" className="w-full cursor-pointer">
                  <Eye className="w-4 h-4" />
                  View
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No employees found matching your criteria.</p>
        </div>
      )}

      {/* Add Employee Modal */}
      <AddEmployeeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}
