"use client"

import { useState } from "react"
import { X, Save, Building2, Mail, DollarSign, Calendar, Phone, MapPin, Globe, Users, FileText, CheckCircle, Star, Briefcase, UserCheck, Clock, TrendingUp } from "lucide-react"

interface ClientModalProps {
  isOpen: boolean
  onClose: () => void
  client?: any
}

export function ClientModal({ isOpen, onClose, client }: ClientModalProps) {
  const [formData, setFormData] = useState({
    id: client?.id ?? "",
    companyName: client?.companyName ?? "",
    industry: client?.industry ?? "",
    contactPerson: client?.contactPerson ?? "",
    email: client?.email ?? "",
    phone: client?.phone ?? "",
    address: client?.address ?? "",
    website: client?.website ?? "",
    contractType: client?.contractType ?? "",
    contractValue: client?.contractValue ?? "",
    startDate: client?.startDate ?? "",
    endDate: client?.endDate ?? "",
    status: client?.status ?? "active",
    employees: client?.employees ?? "",
    projects: client?.projects ?? 0,
    rating: client?.rating ?? 0,
    paymentTerms: client?.paymentTerms ?? "",
    billingCycle: client?.billingCycle ?? "",
    accountManager: client?.accountManager ?? "",
    lastContactDate: client?.lastContactDate ?? "",
    nextFollowUp: client?.nextFollowUp ?? "",
    notes: client?.notes ?? "",
    services: client?.services ?? [],
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s:any) => s !== service)
        : [...prev.services, service]
    }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.companyName.trim()) e.companyName = "Company name is required"
    if (!formData.contactPerson.trim()) e.contactPerson = "Contact person is required"
    if (!formData.email.trim()) e.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Enter a valid email"
    if (!formData.phone.trim()) e.phone = "Phone number is required"
    if (!formData.address.trim()) e.address = "Address is required"
    if (!formData.industry) e.industry = "Industry is required"
    if (!formData.contractType) e.contractType = "Contract type is required"
    if (!formData.contractValue) e.contractValue = "Contract value is required"
    if (!formData.startDate) e.startDate = "Start date is required"
    if (!formData.endDate) e.endDate = "End date is required"
    if (!formData.paymentTerms) e.paymentTerms = "Payment terms are required"
    if (!formData.billingCycle) e.billingCycle = "Billing cycle is required"
    if (!formData.accountManager.trim()) e.accountManager = "Account manager is required"
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
      alert("Failed to save client. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const industries = [
    "Technology", "Healthcare", "Finance", "Retail", "Education", "Logistics",
    "Manufacturing", "Consulting", "Media", "Agriculture", "Transportation", "Construction"
  ]

  const contractTypes = ["Long-term", "Annual", "Project-based", "Retainer", "Monthly"]
  const paymentTerms = ["Net 15", "Net 30", "Net 45", "Net 60", "COD"]
  const billingCycles = ["Monthly", "Quarterly", "Annually", "Milestone"]
  const availableServices = [
    "Software Development", "IT Consulting", "Cloud Services", "Security Audit",
    "Data Analytics", "EMR Implementation", "Healthcare IT", "Fintech Development",
    "POS Systems", "Inventory Management", "E-commerce", "LMS Development",
    "Training Programs", "Supply Chain Software", "Fleet Management", "Support"
  ]

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="relative bg-white rounded-3xl w-full max-w-[820px] max-h-[92vh] overflow-hidden shadow-[0_32px_80px_-12px_rgba(0,0,0,0.25)] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">

            <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            {/* Header */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-lg border-b border-slate-100 px-8 py-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">New Client</h2>
                  <p className="text-[13px] text-slate-400 mt-0.5">Fill in the details below</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="group w-9 h-9 rounded-xl bg-slate-100 hover:bg-red-50 flex items-center justify-center transition-all duration-200"
              >
                <X className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors" />
              </button>
            </div>

            {/* Scrollable Form */}
            <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(92vh-140px)]">
              <div className="px-8 py-6 space-y-8">

                {/* ── Basic Information ── */}
                <section>
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                    <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">Basic Information</h3>
                    <div className="flex-1 h-px bg-slate-100 ml-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-x-5 gap-y-5">
                    {/* Company Name */}
                    <div className="group">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Company Name *</label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                        <input
                          className={`w-full h-11 pl-11 pr-4 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 shadow-sm ${errors.companyName ? "bg-red-50 border-[1.5px] border-red-400 ring-2 ring-red-100" : "bg-white border-[1.5px] border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"}`}
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="Acme Corporation"
                        />
                      </div>
                      {errors.companyName && <p className="text-[11px] text-red-500 mt-1.5 font-medium">{errors.companyName}</p>}
                    </div>

                    {/* Industry */}
                    <div className="group">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Industry *</label>
                      <div className="relative">
                        <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                        <select
                          className="w-full h-11 pl-11 pr-4 rounded-xl text-sm font-medium text-slate-800 bg-white border-[1.5px] border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 appearance-none cursor-pointer shadow-sm"
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                        >
                          <option value="">Select industry</option>
                          {industries.map((industry) => (
                            <option key={industry} value={industry}>{industry}</option>
                          ))}
                        </select>
                      </div>
                      {errors.industry && <p className="text-[11px] text-red-500 mt-1.5 font-medium">{errors.industry}</p>}
                    </div>

                    {/* Contact Person */}
                    <div className="group">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Contact Person *</label>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                        <input
                          className={`w-full h-11 pl-11 pr-4 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 shadow-sm ${errors.contactPerson ? "bg-red-50 border-[1.5px] border-red-400 ring-2 ring-red-100" : "bg-white border-[1.5px] border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"}`}
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleChange}
                          placeholder="Jane Smith"
                        />
                      </div>
                      {errors.contactPerson && <p className="text-[11px] text-red-500 mt-1.5 font-medium">{errors.contactPerson}</p>}
                    </div>

                    {/* Email */}
                    <div className="group">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                        <input
                          className={`w-full h-11 pl-11 pr-4 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 shadow-sm ${errors.email ? "bg-red-50 border-[1.5px] border-red-400 ring-2 ring-red-100" : "bg-white border-[1.5px] border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"}`}
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="hello@acme.com"
                        />
                      </div>
                      {errors.email && <p className="text-[11px] text-red-500 mt-1.5 font-medium">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="group">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Phone *</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                        <input
                          className={`w-full h-11 pl-11 pr-4 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 shadow-sm ${errors.phone ? "bg-red-50 border-[1.5px] border-red-400 ring-2 ring-red-100" : "bg-white border-[1.5px] border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"}`}
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      {errors.phone && <p className="text-[11px] text-red-500 mt-1.5 font-medium">{errors.phone}</p>}
                    </div>

                    {/* Website */}
                    <div className="group">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Website</label>
                      <div className="relative">
                        <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                        <input
                          className="w-full h-11 pl-11 pr-4 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-white border-[1.5px] border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 shadow-sm"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder="www.acme.com"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* ── Contract Details ── */}
                <section>
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">Contract Details</h3>
                    <div className="flex-1 h-px bg-slate-100 ml-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-x-5 gap-y-5">
                    {/* Contract Type */}
                    <div className="group">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Contract Type *</label>
                      <div className="relative">
                        <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                        <select
                          className="w-full h-11 pl-11 pr-4 rounded-xl text-sm font-medium text-slate-800 bg-white border-[1.5px] border-slate-300 hover:border-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all duration-200 appearance-none cursor-pointer shadow-sm"
                          name="contractType"
                          value={formData.contractType}
                          onChange={handleChange}
                        >
                          <option value="">Select type</option>
                          {contractTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      {errors.contractType && <p className="text-[11px] text-red-500 mt-1.5 font-medium">{errors.contractType}</p>}
                    </div>

                    {/* Contract Value */}
                    <div className="group">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Value (USD) *</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                          className={`w-full h-11 pl-11 pr-4 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 tabular-nums shadow-sm ${errors.contractValue ? "bg-red-50 border-[1.5px] border-red-400 ring-2 ring-red-100" : "bg-white border-[1.5px] border-slate-300 hover:border-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"}`}
                          name="contractValue"
                          type="number"
                          value={formData.contractValue}
                          onChange={handleChange}
                          placeholder="50,000"
                        />
                      </div>
                      {errors.contractValue && <p className="text-[11px] text-red-500 mt-1.5 font-medium">{errors.contractValue}</p>}
                    </div>

                    {/* Start Date */}
                    <div className="group">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Start Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                          className={`w-full h-11 pl-11 pr-4 rounded-xl text-sm font-medium text-slate-800 outline-none transition-all duration-200 shadow-sm ${errors.startDate ? "bg-red-50 border-[1.5px] border-red-400 ring-2 ring-red-100" : "bg-white border-[1.5px] border-slate-300 hover:border-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"}`}
                          name="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.startDate && <p className="text-[11px] text-red-500 mt-1.5 font-medium">{errors.startDate}</p>}
                    </div>

                    {/* End Date */}
                    <div className="group">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">End Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                          className={`w-full h-11 pl-11 pr-4 rounded-xl text-sm font-medium text-slate-800 outline-none transition-all duration-200 shadow-sm ${errors.endDate ? "bg-red-50 border-[1.5px] border-red-400 ring-2 ring-red-100" : "bg-white border-[1.5px] border-slate-300 hover:border-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"}`}
                          name="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.endDate && <p className="text-[11px] text-red-500 mt-1.5 font-medium">{errors.endDate}</p>}
                    </div>

                    {/* Payment Terms */}
                    <div className="group">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Payment Terms *</label>
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                        <select
                          className="w-full h-11 pl-11 pr-4 rounded-xl text-sm font-medium text-slate-800 bg-white border-[1.5px] border-slate-300 hover:border-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all duration-200 appearance-none cursor-pointer shadow-sm"
                          name="paymentTerms"
                          value={formData.paymentTerms}
                          onChange={handleChange}
                        >
                          <option value="">Select terms</option>
                          {paymentTerms.map((terms) => (
                            <option key={terms} value={terms}>{terms}</option>
                          ))}
                        </select>
                      </div>
                      {errors.paymentTerms && <p className="text-[11px] text-red-500 mt-1.5 font-medium">{errors.paymentTerms}</p>}
                    </div>

                    {/* Billing Cycle */}
                    <div className="group">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Billing Cycle *</label>
                      <div className="relative">
                        <TrendingUp className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                        <select
                          className="w-full h-11 pl-11 pr-4 rounded-xl text-sm font-medium text-slate-800 bg-white border-[1.5px] border-slate-300 hover:border-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all duration-200 appearance-none cursor-pointer shadow-sm"
                          name="billingCycle"
                          value={formData.billingCycle}
                          onChange={handleChange}
                        >
                          <option value="">Select cycle</option>
                          {billingCycles.map((cycle) => (
                            <option key={cycle} value={cycle}>{cycle}</option>
                          ))}
                        </select>
                      </div>
                      {errors.billingCycle && <p className="text-[11px] text-red-500 mt-1.5 font-medium">{errors.billingCycle}</p>}
                    </div>
                  </div>
                </section>

                {/* ── Additional Details ── */}
                <section>
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
                      <UserCheck className="w-3.5 h-3.5 text-violet-600" />
                    </div>
                    <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">Additional Details</h3>
                    <div className="flex-1 h-px bg-slate-100 ml-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-x-5 gap-y-5">
                    {/* Address - full width */}
                    <div className="col-span-2 group">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Address *</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-violet-500 transition-colors" />
                        <input
                          className={`w-full h-11 pl-11 pr-4 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 shadow-sm ${errors.address ? "bg-red-50 border-[1.5px] border-red-400 ring-2 ring-red-100" : "bg-white border-[1.5px] border-slate-300 hover:border-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"}`}
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="123 Business Ave, Suite 100, New York, NY 10001"
                        />
                      </div>
                      {errors.address && <p className="text-[11px] text-red-500 mt-1.5 font-medium">{errors.address}</p>}
                    </div>

                    {/* Employees */}
                    <div className="group">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Employees</label>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-violet-500 transition-colors" />
                        <input
                          className="w-full h-11 pl-11 pr-4 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-white border-[1.5px] border-slate-300 hover:border-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none transition-all duration-200 tabular-nums shadow-sm"
                          name="employees"
                          type="number"
                          value={formData.employees}
                          onChange={handleChange}
                          placeholder="250"
                        />
                      </div>
                    </div>

                    {/* Projects */}
                    <div className="group">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Active Projects</label>
                      <div className="relative">
                        <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-violet-500 transition-colors" />
                        <input
                          className="w-full h-11 pl-11 pr-4 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-white border-[1.5px] border-slate-300 hover:border-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none transition-all duration-200 tabular-nums shadow-sm"
                          name="projects"
                          type="number"
                          value={formData.projects}
                          onChange={handleChange}
                          placeholder="5"
                        />
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="group">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Rating (0-5) *</label>
                      <div className="relative">
                        <Star className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-violet-500 transition-colors" />
                        <input
                          className={`w-full h-11 pl-11 pr-4 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 tabular-nums shadow-sm ${errors.rating ? "bg-red-50 border-[1.5px] border-red-400 ring-2 ring-red-100" : "bg-white border-[1.5px] border-slate-300 hover:border-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"}`}
                          name="rating"
                          type="number"
                          value={formData.rating}
                          onChange={handleChange}
                          placeholder="4.5"
                          min="0"
                          max="5"
                          step="0.1"
                        />
                      </div>
                      {errors.rating && <p className="text-[11px] text-red-500 mt-1.5 font-medium">{errors.rating}</p>}
                    </div>

                    {/* Account Manager */}
                    <div className="group">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Account Manager *</label>
                      <div className="relative">
                        <UserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-violet-500 transition-colors" />
                        <input
                          className={`w-full h-11 pl-11 pr-4 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 shadow-sm ${errors.accountManager ? "bg-red-50 border-[1.5px] border-red-400 ring-2 ring-red-100" : "bg-white border-[1.5px] border-slate-300 hover:border-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"}`}
                          name="accountManager"
                          value={formData.accountManager}
                          onChange={handleChange}
                          placeholder="Alex Johnson"
                        />
                      </div>
                      {errors.accountManager && <p className="text-[11px] text-red-500 mt-1.5 font-medium">{errors.accountManager}</p>}
                    </div>

                    {/* Status */}
                    <div className="col-span-2 group">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-2.5 uppercase tracking-wider">Status</label>
                      <div className="flex gap-2">
                        {[
                          { value: "active", label: "Active", color: "bg-emerald-500" },
                          { value: "pending", label: "Pending", color: "bg-amber-500" },
                          { value: "completed", label: "Completed", color: "bg-blue-500" },
                          { value: "inactive", label: "Inactive", color: "bg-slate-400" },
                        ].map((s) => (
                          <button
                            key={s.value}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, status: s.value }))}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                              formData.status === s.value
                                ? "bg-slate-900 text-white shadow-md"
                                : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                            }`}
                          >
                            <span className={`w-2 h-2 rounded-full ${formData.status === s.value ? "bg-white" : s.color}`} />
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notes - full width */}
                    <div className="col-span-2 group">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Notes</label>
                      <textarea
                        className="w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-white border-[1.5px] border-slate-300 hover:border-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none transition-all duration-200 resize-none min-h-[88px] shadow-sm"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Any additional context about this client..."
                      />
                    </div>

                    {/* Services - full width */}
                    <div className="col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-3 uppercase tracking-wider">Services</label>
                      <div className="flex flex-wrap gap-2">
                        {availableServices.map((service) => (
                          <button
                            key={service}
                            type="button"
                            onClick={() => handleServiceChange(service)}
                            className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                              formData.services.includes(service)
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-[1.02]"
                                : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                            }`}
                          >
                            {service}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Sticky Footer */}
              <div className="sticky bottom-0 bg-white/95 backdrop-blur-lg border-t border-slate-100 px-8 py-4 flex items-center justify-between">
                <p className="text-xs text-slate-400">* Required fields</p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving || saved}
                    className={`px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-200 ${
                      saved
                        ? "bg-emerald-500 text-white"
                        : isSaving
                          ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-0.5 active:translate-y-0"
                    }`}
                  >
                    {saved ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Saved!
                      </>
                    ) : isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Add Client
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
