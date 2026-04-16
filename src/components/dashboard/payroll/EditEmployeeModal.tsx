"use client"

import { useState } from "react"
import { X, Save, User, Mail, DollarSign, Calendar, Building, Phone, MapPin, CreditCard, FileText, CheckCircle } from "lucide-react"

interface EditEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  employee: any
}

export function EditEmployeeModal({ isOpen, onClose, employee }: EditEmployeeModalProps) {
  const [formData, setFormData] = useState({
    id: employee?.id ?? "",
    name: employee?.name ?? "",
    designation: employee?.designation ?? "",
    email: employee?.email ?? "",
    joiningDate: employee?.joiningDate ?? "",
    salary: employee?.salary ?? "",
    phone: "+1 (555) 000-0000",
    address: "123 Main St, City, State 12345",
    pan: "ABCDE1234F",
    bankAccount: "****1234",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen || !employee) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.name.trim()) e.name = "Full name is required"
    if (!formData.email.trim()) e.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Enter a valid email"
    if (!formData.salary) e.salary = "Salary is required"
    if (!formData.joiningDate) e.joiningDate = "Joining date is required"
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1600))
      setSaved(true)
      setTimeout(() => { setSaved(false); onClose() }, 1800)
    } catch {
      alert("Failed to update employee information. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const designations = [
    "Web Designer", "Senior Developer", "Product Manager",
    "UX Designer", "DevOps Engineer", "HR Manager",
    "Backend Developer", "Frontend Developer", "QA Engineer",
  ]

  return (
    <div
      className="fixed inset-0 bg-slate-900/55 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="animate-in fade-in zoom-in-95 duration-200 bg-white rounded-2xl w-full max-w-[680px] max-h-[92vh] overflow-y-auto flex flex-col shadow-2xl">

        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-slate-800 to-slate-500 flex items-center justify-center shrink-0">
              <User className="w-[17px] h-[17px] text-white" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-slate-900">Edit Employee</div>
              <div className="text-xs text-slate-400 mt-px">
                {employee.name} &nbsp;·&nbsp; ID: {employee.id}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-[34px] h-[34px] rounded-lg border-[1.5px] border-slate-200 bg-transparent hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 flex-1">

          {/* Basic Information */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-[18px] py-3 bg-gradient-to-br from-slate-800 to-slate-600">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Basic Information</span>
            </div>
            <div className="p-[18px] grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Employee ID */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Employee ID</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-slate-50 pl-[38px] pr-3.5 text-[13.5px] text-slate-400 outline-none cursor-not-allowed"
                    name="id"
                    value={formData.id}
                    disabled
                  />
                </div>
              </div>

              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.name ? "border-red-500 ring-[3px] ring-red-500/[0.08]" : "border-slate-200"}`}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <div className="text-[11.5px] text-red-500 font-medium mt-0.5">{errors.name}</div>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.email ? "border-red-500 ring-[3px] ring-red-500/[0.08]" : "border-slate-200"}`}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                  />
                </div>
                {errors.email && <div className="text-[11.5px] text-red-500 font-medium mt-0.5">{errors.email}</div>}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Employment Details */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-[18px] py-3 bg-gradient-to-br from-teal-700 to-teal-500">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <Building className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Employment Details</span>
            </div>
            <div className="p-[18px] grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Designation */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Designation</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <select
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white bg-[url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E&quot;)] bg-no-repeat bg-[right_14px_center] pl-[38px] pr-[38px] text-[13.5px] text-slate-900 outline-none cursor-pointer transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 appearance-none"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                  >
                    {designations.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Joining Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Joining Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.joiningDate ? "border-red-500 ring-[3px] ring-red-500/[0.08]" : "border-slate-200"}`}
                    name="joiningDate"
                    type="date"
                    value={formData.joiningDate}
                    onChange={handleChange}
                  />
                </div>
                {errors.joiningDate && <div className="text-[11.5px] text-red-500 font-medium mt-0.5">{errors.joiningDate}</div>}
              </div>

              {/* Salary */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Annual Salary (USD)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.salary ? "border-red-500 ring-[3px] ring-red-500/[0.08]" : "border-slate-200"}`}
                    name="salary"
                    type="number"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="75000"
                  />
                </div>
                {errors.salary && <div className="text-[11.5px] text-red-500 font-medium mt-0.5">{errors.salary}</div>}
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main St, City, State"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-[18px] py-3 bg-gradient-to-br from-violet-600 to-purple-600">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <CreditCard className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Financial Information</span>
            </div>
            <div className="p-[18px] grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* PAN */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">PAN Number</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono tracking-wide outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                    name="pan"
                    value={formData.pan}
                    onChange={handleChange}
                    placeholder="ABCDE1234F"
                  />
                </div>
              </div>

              {/* Bank Account */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Bank Account Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono tracking-wide outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                    name="bankAccount"
                    value={formData.bankAccount}
                    onChange={handleChange}
                    placeholder="Last 4 digits"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2.5 pt-1">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-[7px] px-5 py-2.5 rounded-[10px] text-[13.5px] font-semibold border-[1.5px] border-slate-200 bg-transparent text-slate-500 cursor-pointer transition-all hover:bg-slate-50 hover:-translate-y-px hover:shadow-md active:translate-y-0"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`inline-flex items-center justify-center gap-[7px] px-5 py-2.5 rounded-[10px] text-[13.5px] font-semibold border-none cursor-pointer transition-all hover:-translate-y-px hover:shadow-md active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none ${saved ? "bg-green-600 text-white" : "bg-slate-900 text-white"}`}
              disabled={isSaving}
            >
              {saved ? (
                <><CheckCircle className="w-[15px] h-[15px]" /> Saved!</>
              ) : isSaving ? (
                <><span className="w-3.5 h-3.5 border-2 border-white/35 border-t-white rounded-full animate-spin shrink-0" /> Saving…</>
              ) : (
                <><Save className="w-[15px] h-[15px]" /> Save Changes</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}