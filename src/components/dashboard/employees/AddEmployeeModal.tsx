"use client"

import { useState } from "react"
import { X, Upload, User, Briefcase, CreditCard, Camera, CheckCircle, Save, Mail, Phone, MapPin, Building2, Calendar, Users } from "lucide-react"
import { useEmployee } from "@/hooks/employee/useEmployee"
import { EmployeeFormData } from "@/types/employee.types"

interface AddEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function AddEmployeeModal({ isOpen, onClose, onSuccess }: AddEmployeeModalProps) {
  const { createEmployee, loading, error, clearError } = useEmployee()
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    userName: "",
    employeeId: "",
    address: "",
    employeeDesignation: "",
    joiningDate: "",
    bankDetails: {
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
      branchName: "",
      bicCode: "",
      salary: ""
    },
    employeePhoto: null,
    socialProfile: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
      whatsapp: ""
    },
    emergencyContact: {
      primary: {
        name: "",
        relationship: "",
        phone: ""
      },
      secondary: {
        name: "",
        relationship: "",
        phone: ""
      }
    },
    education: [],
    experience: [],
    passport: {
      passportNumber: "",
      nationality: "",
      issueDate: "",
      expiryDate: "",
      scanCopy: ""
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'accountHolderName' || name === 'accountNumber' || name === 'bankName' || name === 'branchName' || name === 'bicCode' || name === 'salary') {
      setFormData(prev => ({
        ...prev,
        bankDetails: {
          ...prev.bankDetails,
          [name]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({
      ...prev,
      employeePhoto: file
    }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.firstName.trim()) e.firstName = "First name is required"
    if (!formData.lastName.trim()) e.lastName = "Last name is required"
    if (!formData.contactNumber.trim()) e.contactNumber = "Phone number is required"
    if (!formData.email.trim()) e.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Enter a valid email"
    if (!formData.userName.trim()) e.userName = "Username is required"
    if (!formData.employeeId.trim()) e.employeeId = "Employee ID is required"
    if (!formData.address.trim()) e.address = "Address is required"
    if (!formData.employeeDesignation) e.employeeDesignation = "Designation is required"
    if (!formData.joiningDate) e.joiningDate = "Joining date is required"
    if (!formData.bankDetails.accountHolderName.trim()) e.accountHolderName = "Account holder name is required"
    if (!formData.bankDetails.accountNumber.trim()) e.accountNumber = "Account number is required"
    if (!formData.bankDetails.bankName.trim()) e.bankName = "Bank name is required"
    if (!formData.bankDetails.branchName.trim()) e.branchName = "Branch name is required"
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    try {
      const submitData = {
        ...formData,
        contactInfo: {
          phone: formData.contactNumber,
          email: formData.email,
          address: formData.address,
          hireDate: formData.joiningDate,
          userName: formData.userName
        },
        bankDetails: {
          accountHolderName: formData.bankDetails.accountHolderName,
          accountNumber: formData.bankDetails.accountNumber,
          bankName: formData.bankDetails.bankName,
          branchName: formData.bankDetails.branchName,
          bicCode: formData.bankDetails.bicCode,
          salary: formData.bankDetails.salary ? formData.bankDetails.salary : undefined
        }
      }
      await createEmployee(submitData)
      setSaved(true)
      setTimeout(() => {
        setSaved(false)
        setFormData({
          firstName: "",
          lastName: "",
          contactNumber: "",
          email: "",
          userName: "",
          employeeId: "",
          address: "",
          employeeDesignation: "",
          joiningDate: "",
          bankDetails: {
            accountHolderName: "",
            accountNumber: "",
            bankName: "",
            branchName: "",
            bicCode: "",
            salary: ""
          },
          employeePhoto: null,
          socialProfile: {
            linkedin: "",
            twitter: "",
            facebook: "",
            instagram: "",
            whatsapp: ""
          },
          emergencyContact: {
            primary: {
              name: "",
              relationship: "",
              phone: ""
            },
            secondary: {
              name: "",
              relationship: "",
              phone: ""
            }
          },
          education: [],
          experience: [],
          passport: {
            passportNumber: "",
            nationality: "",
            issueDate: "",
            expiryDate: "",
            scanCopy: ""
          }
        })
        onClose()
        if (onSuccess) onSuccess()
      }, 1500)
    } catch (err) {
      console.error("Failed to create employee:", err)
    }
  }

  if (!isOpen) return null

  const designations = [
    "Senior Developer", "Product Manager", "UX Designer", "DevOps Engineer",
    "HR Manager", "Backend Developer", "Frontend Developer", "QA Engineer"
  ]

  return (
    <div
      className="fixed inset-0 bg-slate-900/55 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="animate-in fade-in zoom-in-95 duration-200 bg-white rounded-2xl w-full max-w-[900px] max-h-[92vh] overflow-y-auto flex flex-col shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <User className="w-[17px] h-[17px] text-white" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-slate-900">Add New Employee</div>
              <div className="text-xs text-slate-400 mt-px">Employee personal, work, and bank information</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-[34px] h-[34px] rounded-lg border-[1.5px] border-slate-200 bg-transparent hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex-1">

          {/* Personal Information */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-5">
            <div className="px-4 py-3 flex items-center gap-2.5 bg-gradient-to-br from-blue-500 to-blue-600">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Personal Information</span>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.firstName ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                  />
                </div>
                {errors.firstName && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.firstName}</div>}
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.lastName ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                  />
                </div>
                {errors.lastName && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.lastName}</div>}
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Contact Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.contactNumber ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                  />
                </div>
                {errors.contactNumber && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.contactNumber}</div>}
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.email ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    type="email"
                  />
                </div>
                {errors.email && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.email}</div>}
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-5">
            <div className="px-4 py-3 flex items-center gap-2.5 bg-gradient-to-br from-emerald-500 to-emerald-600">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <Briefcase className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Work Information</span>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Username</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.userName ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    placeholder="Enter username"
                  />
                </div>
                {errors.userName && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.userName}</div>}
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Employee ID</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.employeeId ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    placeholder="EMP-001"
                  />
                </div>
                {errors.employeeId && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.employeeId}</div>}
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Designation</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <select
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_14px_center] pl-[38px] pr-[38px] text-[13.5px] text-slate-900 outline-none cursor-pointer transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 appearance-none ${errors.employeeDesignation ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="employeeDesignation"
                    value={formData.employeeDesignation}
                    onChange={handleInputChange}
                  >
                    <option value="">Select designation</option>
                    {designations.map((designation) => (
                      <option key={designation} value={designation}>{designation}</option>
                    ))}
                  </select>
                </div>
                {errors.employeeDesignation && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.employeeDesignation}</div>}
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Joining Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.joiningDate ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleInputChange}
                    type="date"
                  />
                </div>
                {errors.joiningDate && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.joiningDate}</div>}
              </div>

              <div className="mb-4 md:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.address ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Street, City, State 12345"
                  />
                </div>
                {errors.address && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.address}</div>}
              </div>
            </div>
          </div>

          {/* Bank Information */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-5">
            <div className="px-4 py-3 flex items-center gap-2.5 bg-gradient-to-br from-violet-500 to-violet-600">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <CreditCard className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Bank Information</span>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Account Holder Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.accountHolderName ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="accountHolderName"
                    value={formData.bankDetails.accountHolderName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                </div>
                {errors.accountHolderName && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.accountHolderName}</div>}
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Account Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.accountNumber ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="accountNumber"
                    value={formData.bankDetails.accountNumber}
                    onChange={handleInputChange}
                    placeholder="1234567890"
                  />
                </div>
                {errors.accountNumber && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.accountNumber}</div>}
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Bank Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.bankName ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="bankName"
                    value={formData.bankDetails.bankName}
                    onChange={handleInputChange}
                    placeholder="Bank of America"
                  />
                </div>
                {errors.bankName && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.bankName}</div>}
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Branch Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.branchName ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="branchName"
                    value={formData.bankDetails.branchName}
                    onChange={handleInputChange}
                    placeholder="Main Branch"
                  />
                </div>
                {errors.branchName && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.branchName}</div>}
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">BIC Code</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.bicCode ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="bicCode"
                    value={formData.bankDetails.bicCode}
                    onChange={handleInputChange}
                    placeholder="e.g. CHASUS33"
                  />
                </div>
                {errors.bicCode && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.bicCode}</div>}
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Salary</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.salary ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="salary"
                    type="number"
                    value={formData.bankDetails.salary}
                    onChange={handleInputChange}
                    placeholder="e.g. 50000"
                  />
                </div>
                {errors.salary && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.salary}</div>}
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-5">
            <div className="px-4 py-3 flex items-center gap-2.5 bg-gradient-to-br from-amber-500 to-amber-600">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <Camera className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Employee Photo</span>
            </div>
            <div className="p-4">
              <input
                type="file"
                id="employeePhoto"
                name="employeePhoto"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <label htmlFor="employeePhoto" className="block border-2 border-dashed border-slate-200 rounded-[10px] p-8 text-center transition-all cursor-pointer hover:border-blue-500 hover:bg-slate-50">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-6 h-6 text-blue-500" />
                </div>
                <div className="text-slate-900 text-sm font-semibold mb-1">
                  {formData.employeePhoto ? formData.employeePhoto.name : "Click to upload photo"}
                </div>
                <div className="text-slate-400 text-xs">
                  PNG, JPG, GIF up to 10MB
                </div>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-5 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] text-[13.5px] font-semibold border-[1.5px] border-slate-200 bg-transparent text-slate-500 cursor-pointer transition-all hover:bg-slate-50 hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              disabled={loading || saved}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] text-[13.5px] font-semibold border-none cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none ${saved ? "bg-green-600 text-white hover:bg-green-700 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(22,163,74,0.3)]" : "bg-blue-500 text-white hover:bg-blue-600 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(59,130,246,0.3)]"}`}
              disabled={loading || saved}
            >
              {saved ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Employee Added Successfully!
                </>
              ) : loading ? (
                "Submitting..."
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Add Employee
                </>
              )}
            </button>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-[10px] text-red-600 text-[13px] font-medium">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
