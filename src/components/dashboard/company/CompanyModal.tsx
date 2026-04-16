"use client"

import { useState } from "react"
import { X, Save, Building, Mail, DollarSign, Calendar, Phone, MapPin, Globe, Users, FileText, CheckCircle, Star } from "lucide-react"

interface CompanyModalProps {
  isOpen: boolean
  onClose: () => void
  company?: any
}

export function CompanyModal({ isOpen, onClose, company }: CompanyModalProps) {
  const [formData, setFormData] = useState({
    id: company?.id ?? "",
    name: company?.name ?? "",
    industry: company?.industry ?? "",
    email: company?.email ?? "",
    phone: company?.phone ?? "",
    address: company?.address ?? "",
    website: company?.website ?? "",
    employees: company?.employees ?? "",
    revenue: company?.revenue ?? "",
    status: company?.status ?? "active",
    foundedDate: company?.foundedDate ?? "",
    description: company?.description ?? "",
    contact: company?.contact ?? "",
    rating: company?.rating ?? 0,
    ownerName: company?.ownerName ?? "",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.name.trim()) e.name = "Company name is required"
    if (!formData.email.trim()) e.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Enter a valid email"
    if (!formData.phone.trim()) e.phone = "Phone number is required"
    if (!formData.address.trim()) e.address = "Address is required"
    if (!formData.industry) e.industry = "Industry is required"
    if (!formData.employees) e.employees = "Number of employees is required"
    if (!formData.revenue) e.revenue = "Annual revenue is required"
    if (!formData.contact.trim()) e.contact = "Phone number is required"
    if (!formData.ownerName.trim()) e.ownerName = "Owner name is required"
    if (!formData.rating || formData.rating < 0 || formData.rating > 5) e.rating = "Rating must be between 0 and 5"
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
      alert("Failed to save company. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const industries = [
    "Technology", "Finance", "Healthcare", "Retail", "Energy",
    "Education", "Logistics", "Food & Beverage", "Real Estate", "Manufacturing",
    "Consulting", "Media", "Agriculture", "Transportation", "Construction"
  ]

  // Generate company ID if not provided
  const generateCompanyId = () => {
    const prefix = "CMP"
    const randomNum = Math.floor(Math.random() * 9000) + 1000
    return `${prefix}${randomNum}`
  }

  return (
    <div
      className="fixed inset-0 bg-slate-900/55 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="animate-in fade-in zoom-in-95 duration-200 bg-white rounded-2xl w-full max-w-[720px] max-h-[92vh] overflow-y-auto flex flex-col shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-teal-700 to-teal-500 flex items-center justify-center shrink-0">
              <Building className="w-[17px] h-[17px] text-white" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-slate-900">
                {company ? "Edit Company" : "Add New Company"}
              </div>
              <div className="text-xs text-slate-400 mt-px">
                {company ? `Company ID: ${company.id}` : "Create a new company profile"}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-[34px] h-[34px] rounded-lg border-[1.5px] border-slate-200 bg-transparent hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors"
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
                <Building className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">
                Basic Information
              </span>
            </div>
            <div className="p-[18px] grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Company ID */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Company ID</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
                    name="id"
                    value={formData.id || (company ? "" : generateCompanyId())}
                    disabled={!company}
                    placeholder={company ? "" : "Auto-generated"}
                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Company Name</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.name ? "border-red-500 ring-[3px] ring-red-500/[0.08]" : "border-slate-200"}`}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter company name"
                  />
                </div>
                {errors.name && <div className="text-[11.5px] text-red-500 font-medium mt-0.5">{errors.name}</div>}
              </div>

              {/* Industry */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Industry</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <select
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-10 text-[13.5px] text-slate-900 outline-none cursor-pointer transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2712%27%20height=%2712%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%2394a3b8%27%20stroke-width=%272.5%27%3E%3Cpath%20d=%27M6%209l6%206%206-6%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_14px_center]"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                  >
                    <option value="">Select Industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                {errors.industry && <div className="text-[11.5px] text-red-500 font-medium mt-0.5">{errors.industry}</div>}
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Status</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <select
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-10 text-[13.5px] text-slate-900 outline-none cursor-pointer transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2712%27%20height=%2712%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%2394a3b8%27%20stroke-width=%272.5%27%3E%3Cpath%20d=%27M6%209l6%206%206-6%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_14px_center]"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Founded Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Founded Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                    name="foundedDate"
                    type="date"
                    value={formData.foundedDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Website */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="www.example.com"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-[18px] py-3 bg-gradient-to-br from-teal-700 to-teal-500">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <Mail className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">
                Contact Information
              </span>
            </div>
            <div className="p-[18px] grid gap-3.5">
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
                    placeholder="contact@company.com"
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
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.phone ? "border-red-500 ring-[3px] ring-red-500/[0.08]" : "border-slate-200"}`}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                {errors.phone && <div className="text-[11.5px] text-red-500 font-medium mt-0.5">{errors.phone}</div>}
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.address ? "border-red-500 ring-[3px] ring-red-500/[0.08]" : "border-slate-200"}`}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Business St, City, State 12345"
                  />
                </div>
                {errors.address && <div className="text-[11.5px] text-red-500 font-medium mt-0.5">{errors.address}</div>}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.contact ? "border-red-500 ring-[3px] ring-red-500/[0.08]" : "border-slate-200"}`}
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                {errors.contact && <div className="text-[11.5px] text-red-500 font-medium mt-0.5">{errors.contact}</div>}
              </div>

              {/* Owner Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Owner Name</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.ownerName ? "border-red-500 ring-[3px] ring-red-500/[0.08]" : "border-slate-200"}`}
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    placeholder="Michael Johnson"
                  />
                </div>
                {errors.ownerName && <div className="text-[11.5px] text-red-500 font-medium mt-0.5">{errors.ownerName}</div>}
              </div>
            </div>
          </div>

          {/* Business Metrics */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-[18px] py-3 bg-gradient-to-br from-violet-600 to-purple-600">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <Users className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">
                Business Metrics
              </span>
            </div>
            <div className="p-[18px] grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Employees */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Number of Employees</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.employees ? "border-red-500 ring-[3px] ring-red-500/[0.08]" : "border-slate-200"}`}
                    name="employees"
                    type="number"
                    value={formData.employees}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
                {errors.employees && <div className="text-[11.5px] text-red-500 font-medium mt-0.5">{errors.employees}</div>}
              </div>

              {/* Revenue */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Annual Revenue (USD)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.revenue ? "border-red-500 ring-[3px] ring-red-500/[0.08]" : "border-slate-200"}`}
                    name="revenue"
                    type="number"
                    value={formData.revenue}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
                {errors.revenue && <div className="text-[11.5px] text-red-500 font-medium mt-0.5">{errors.revenue}</div>}
              </div>

              {/* Rating */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Company Rating (0-5)</label>
                <div className="relative">
                  <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.rating ? "border-red-500 ring-[3px] ring-red-500/[0.08]" : "border-slate-200"}`}
                    name="rating"
                    type="number"
                    value={formData.rating}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>
                {errors.rating && <div className="text-[11.5px] text-red-500 font-medium mt-0.5">{errors.rating}</div>}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-[18px] py-3 bg-gradient-to-br from-orange-600 to-orange-500">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">
                Company Description
              </span>
            </div>
            <div className="p-[18px] grid gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Description</label>
                <textarea
                  className="w-full min-h-[100px] rounded-[10px] border-[1.5px] border-slate-200 bg-white px-3.5 py-2.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 resize-y"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter a detailed description of the company..."
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2.5 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-[7px] px-5 py-2.5 rounded-[10px] text-[13.5px] font-semibold border-[1.5px] border-slate-200 bg-transparent text-slate-500 cursor-pointer transition-all whitespace-nowrap hover:-translate-y-px hover:shadow-md hover:bg-slate-50 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`inline-flex items-center justify-center gap-[7px] px-5 py-2.5 rounded-[10px] text-[13.5px] font-semibold border-none cursor-pointer transition-all whitespace-nowrap hover:-translate-y-px hover:shadow-md active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed ${saved ? "bg-green-600 text-white" : "bg-slate-900 text-white"}`}
            >
              {saved ? (
                <><CheckCircle className="w-[15px] h-[15px]" /> Saved!</>
              ) : isSaving ? (
                <><span className="w-3.5 h-3.5 border-2 border-white/35 border-t-white rounded-full animate-spin shrink-0" /> Saving...</>
              ) : (
                <><Save className="w-[15px] h-[15px]" /> {company ? "Update Company" : "Add Company"}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
