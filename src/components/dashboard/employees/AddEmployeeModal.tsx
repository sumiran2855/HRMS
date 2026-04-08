"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { DatePicker } from "@/components/ui/DatePicker"
import { X, Calendar, Upload, User, Briefcase, CreditCard, Camera } from "lucide-react"

interface AddEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddEmployeeModal({ isOpen, onClose }: AddEmployeeModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    userName: "",
    employeeId: "",
    address: "",
    employeeDesignation: "",
    joiningDate: "",
    accountHolderName: "",
    accountNumber: "",
    bankName: "",
    branchName: "",
    employeePhoto: null as File | null
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({
      ...prev,
      employeePhoto: file
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 rounded-t-2xl min-w-0 z-10">
          <div className="flex items-center justify-between min-w-0">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold text-slate-900 truncate">Add New Employee</h2>
                <p className="text-sm text-slate-500">Fill in the employee details below</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-100 transition-all duration-200 group flex-shrink-0 cursor-pointer"
            >
              <X className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8 min-w-0">
          {/* Personal Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Personal Information</h3>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-0">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Contact Number</label>
                  <Input
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Enter contact number"
                    type="tel"
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    type="email"
                    required
                    className="bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Work Information</h3>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-0">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">User Name</label>
                  <Input
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    placeholder="Enter username"
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Employee ID</label>
                  <Input
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    placeholder="Enter employee ID"
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Employee Designation</label>
                  <select
                    name="employeeDesignation"
                    value={formData.employeeDesignation}
                    onChange={handleInputChange}
                    className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 appearance-none"
                    required
                  >
                    <option value="">Select designation</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="UX Designer">UX Designer</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="QA Engineer">QA Engineer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Joining Date</label>
                  <DatePicker
                    value={formData.joiningDate}
                    onChange={(value) => setFormData(prev => ({ ...prev, joiningDate: value }))}
                    required
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                  required
                  className="bg-white"
                />
              </div>
            </div>
          </div>

          {/* Bank Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Bank Information</h3>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-0">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Account Holder Name</label>
                  <Input
                    name="accountHolderName"
                    value={formData.accountHolderName}
                    onChange={handleInputChange}
                    placeholder="Enter account holder name"
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Account Number</label>
                  <Input
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    placeholder="Enter account number"
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Bank Name</label>
                  <Input
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    placeholder="Enter bank name"
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Branch Name</label>
                  <Input
                    name="branchName"
                    value={formData.branchName}
                    onChange={handleInputChange}
                    placeholder="Enter branch name"
                    required
                    className="bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Camera className="w-4 h-4 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Employee Photo</h3>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 min-w-0">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="employeePhoto"
                  name="employeePhoto"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <label 
                  htmlFor="employeePhoto"
                  className="cursor-pointer flex flex-col items-center gap-4 w-full"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {formData.employeePhoto ? formData.employeePhoto.name : "Click to upload photo"}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white cursor-pointer shadow-lg"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
