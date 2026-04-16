"use client"

import { useState } from "react"
import { X, Save, DollarSign, Calendar, Users, FileText, CheckCircle, Plus, Trash2 } from "lucide-react"

interface PayrollModalProps {
  isOpen: boolean
  onClose: () => void
  payroll?: any
}

export function PayrollModal({ isOpen, onClose, payroll }: PayrollModalProps) {
  const [formData, setFormData] = useState({
    id: payroll?.id ?? "",
    employeeId: payroll?.employeeId ?? "",
    employeeName: payroll?.employeeName ?? "",
    month: payroll?.month ?? new Date().toISOString().slice(0, 7),
    basicSalary: payroll?.basicSalary ?? "",
    hra: payroll?.hra ?? "",
    conveyance: payroll?.conveyance ?? "",
    medical: payroll?.medical ?? "",
    otherAllowances: payroll?.otherAllowances ?? "",
    grossSalary: payroll?.grossSalary ?? "",
    pf: payroll?.pf ?? "",
    esi: payroll?.esi ?? "",
    professionalTax: payroll?.professionalTax ?? "200",
    tds: payroll?.tds ?? "",
    totalDeductions: payroll?.totalDeductions ?? "",
    netSalary: payroll?.netSalary ?? "",
    status: payroll?.status ?? "pending",
    paymentDate: payroll?.paymentDate ?? "",
    paymentMethod: payroll?.paymentMethod ?? "bank_transfer",
    notes: payroll?.notes ?? "",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Auto-calculate gross salary when earnings change
    if (["basicSalary", "hra", "conveyance", "medical", "otherAllowances"].includes(name)) {
      const basic = parseFloat(formData.basicSalary) || 0
      const hraVal = parseFloat(formData.hra) || 0
      const conv = parseFloat(formData.conveyance) || 0
      const med = parseFloat(formData.medical) || 0
      const other = parseFloat(formData.otherAllowances) || 0
      
      let newGross = basic + hraVal + conv + med + other
      if (name === "basicSalary") newGross = parseFloat(value) || 0 + hraVal + conv + med + other
      else if (name === "hra") newGross = basic + parseFloat(value) || 0 + conv + med + other
      else if (name === "conveyance") newGross = basic + hraVal + parseFloat(value) || 0 + med + other
      else if (name === "medical") newGross = basic + hraVal + conv + parseFloat(value) || 0 + other
      else if (name === "otherAllowances") newGross = basic + hraVal + conv + med + parseFloat(value) || 0
      
      setFormData(prev => ({ ...prev, grossSalary: newGross.toString() }))
    }
    
    // Auto-calculate total deductions and net salary
    if (["pf", "esi", "professionalTax", "tds"].includes(name)) {
      const pfVal = parseFloat(formData.pf) || 0
      const esiVal = parseFloat(formData.esi) || 0
      const profTax = parseFloat(formData.professionalTax) || 0
      const tdsVal = parseFloat(formData.tds) || 0
      
      let newTotalDeductions = pfVal + esiVal + profTax + tdsVal
      if (name === "pf") newTotalDeductions = parseFloat(value) || 0 + esiVal + profTax + tdsVal
      else if (name === "esi") newTotalDeductions = pfVal + parseFloat(value) || 0 + profTax + tdsVal
      else if (name === "professionalTax") newTotalDeductions = pfVal + esiVal + parseFloat(value) || 0 + tdsVal
      else if (name === "tds") newTotalDeductions = pfVal + esiVal + profTax + parseFloat(value) || 0
      
      const gross = parseFloat(formData.grossSalary) || 0
      const netSalary = gross - newTotalDeductions
      
      setFormData(prev => ({ 
        ...prev, 
        totalDeductions: newTotalDeductions.toString(),
        netSalary: netSalary.toString()
      }))
    }
    
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.employeeId.trim()) e.employeeId = "Employee ID is required"
    if (!formData.employeeName.trim()) e.employeeName = "Employee name is required"
    if (!formData.month) e.month = "Month is required"
    if (!formData.basicSalary) e.basicSalary = "Basic salary is required"
    if (!formData.grossSalary) e.grossSalary = "Gross salary is required"
    if (!formData.netSalary) e.netSalary = "Net salary is required"
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
      alert("Failed to save payroll. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const employees = [
    { id: "EMP001", name: "John Doe" },
    { id: "EMP002", name: "Jane Smith" },
    { id: "EMP003", name: "Mike Johnson" },
    { id: "EMP004", name: "Sarah Williams" },
    { id: "EMP005", name: "David Brown" },
  ]

  const paymentMethods = [
    { value: "bank_transfer", label: "Bank Transfer" },
    { value: "cheque", label: "Cheque" },
    { value: "cash", label: "Cash" },
    { value: "upi", label: "UPI" },
  ]

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "processed", label: "Processed" },
    { value: "paid", label: "Paid" },
    { value: "cancelled", label: "Cancelled" },
  ]

  return (
    <div
      className="fixed inset-0 bg-slate-900/55 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="animate-in fade-in zoom-in-95 duration-200 bg-white rounded-2xl w-full max-w-[780px] max-h-[92vh] overflow-y-auto flex flex-col shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-teal-700 to-teal-500 flex items-center justify-center shrink-0">
              <DollarSign className="w-[17px] h-[17px] text-white" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-slate-900">
                {payroll ? "Edit Payroll" : "Create Payroll"}
              </div>
              <div className="text-xs text-slate-400 mt-px">
                {payroll ? `Payroll ID: ${payroll.id}` : "Generate new payroll entry"}
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
                <FileText className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Basic Information</span>
            </div>
            <div className="p-[18px] grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Employee Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Employee</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <select
                    className={`w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_14px_center] pl-[38px] pr-[38px] text-[13.5px] text-slate-900 outline-none cursor-pointer transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 appearance-none`}
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={(e) => {
                      const employee = employees.find(emp => emp.id === e.target.value)
                      setFormData(prev => ({
                        ...prev,
                        employeeId: e.target.value,
                        employeeName: employee?.name || ""
                      }))
                    }}
                  >
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>{emp.name} ({emp.id})</option>
                    ))}
                  </select>
                </div>
                {errors.employeeId && <div className="text-[11.5px] text-red-500 font-medium mt-0.5">{errors.employeeId}</div>}
              </div>

              {/* Month */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Payroll Month</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.month ? "border-red-500 ring-[3px] ring-red-500/[0.08]" : "border-slate-200"}`}
                    name="month"
                    type="month"
                    value={formData.month}
                    onChange={handleChange}
                  />
                </div>
                {errors.month && <div className="text-[11.5px] text-red-500 font-medium mt-0.5">{errors.month}</div>}
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Status</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <select
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white bg-[url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E&quot;)] bg-no-repeat bg-[right_14px_center] pl-[38px] pr-[38px] text-[13.5px] text-slate-900 outline-none cursor-pointer transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 appearance-none"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Payment Method</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <select
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white bg-[url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E&quot;)] bg-no-repeat bg-[right_14px_center] pl-[38px] pr-[38px] text-[13.5px] text-slate-900 outline-none cursor-pointer transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 appearance-none"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                  >
                    {paymentMethods.map((method) => (
                      <option key={method.value} value={method.value}>{method.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Earnings */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-[18px] py-3 bg-gradient-to-br from-green-600 to-green-500">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Earnings</span>
            </div>
            <div className="p-[18px] grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Basic Salary */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Basic Salary</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.basicSalary ? "border-red-500 ring-[3px] ring-red-500/[0.08]" : "border-slate-200"}`}
                    name="basicSalary"
                    type="number"
                    value={formData.basicSalary}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </div>
                {errors.basicSalary && <div className="text-[11.5px] text-red-500 font-medium mt-0.5">{errors.basicSalary}</div>}
              </div>

              {/* HRA */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">House Rent Allowance (HRA)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                    name="hra"
                    type="number"
                    value={formData.hra}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Conveyance */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Conveyance Allowance</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                    name="conveyance"
                    type="number"
                    value={formData.conveyance}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Medical */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Medical Allowance</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                    name="medical"
                    type="number"
                    value={formData.medical}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Other Allowances */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Other Allowances</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                    name="otherAllowances"
                    type="number"
                    value={formData.otherAllowances}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Gross Salary (Auto-calculated) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Gross Salary</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-slate-50 pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono outline-none transition-all ${errors.grossSalary ? "border-red-500 ring-[3px] ring-red-500/[0.08]" : "border-slate-200"}`}
                    name="grossSalary"
                    type="number"
                    value={formData.grossSalary}
                    onChange={handleChange}
                    placeholder="0.00"
                    readOnly
                  />
                </div>
                {errors.grossSalary && <div className="text-[11.5px] text-red-500 font-medium mt-0.5">{errors.grossSalary}</div>}
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-[18px] py-3 bg-gradient-to-br from-red-600 to-red-500">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <Trash2 className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Deductions</span>
            </div>
            <div className="p-[18px] grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* PF */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Provident Fund (PF)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                    name="pf"
                    type="number"
                    value={formData.pf}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* ESI */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">ESI Contribution</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                    name="esi"
                    type="number"
                    value={formData.esi}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Professional Tax */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Professional Tax</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                    name="professionalTax"
                    type="number"
                    value={formData.professionalTax}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* TDS */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Tax Deducted at Source (TDS)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                    name="tds"
                    type="number"
                    value={formData.tds}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Total Deductions (Auto-calculated) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Total Deductions</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-slate-50 pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono outline-none transition-all"
                    name="totalDeductions"
                    type="number"
                    value={formData.totalDeductions}
                    onChange={handleChange}
                    placeholder="0.00"
                    readOnly
                  />
                </div>
              </div>

              {/* Net Salary (Auto-calculated) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Net Salary</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-green-50 pl-[38px] pr-3.5 text-[13.5px] text-green-600 font-mono font-semibold outline-none transition-all ${errors.netSalary ? "border-red-500 ring-[3px] ring-red-500/[0.08]" : "border-slate-200"}`}
                    name="netSalary"
                    type="number"
                    value={formData.netSalary}
                    onChange={handleChange}
                    placeholder="0.00"
                    readOnly
                  />
                </div>
                {errors.netSalary && <div className="text-[11.5px] text-red-500 font-medium mt-0.5">{errors.netSalary}</div>}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-[10px] p-4">
            <div className="text-[13px] font-semibold text-slate-900 mb-3 uppercase tracking-wide">
              Payroll Summary
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100 text-[13px]">
              <span className="text-slate-500">Gross Salary</span>
              <span className="font-mono font-medium text-green-600">${parseFloat(formData.grossSalary || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100 text-[13px]">
              <span className="text-slate-500">Total Deductions</span>
              <span className="font-mono font-medium text-red-600">-${parseFloat(formData.totalDeductions || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-3 mt-1 border-t-2 border-slate-200 text-[13px] font-bold">
              <span className="text-slate-900">Net Salary</span>
              <span className="font-mono font-bold text-teal-700">${parseFloat(formData.netSalary || 0).toFixed(2)}</span>
            </div>
          </div>

          {/* Additional Information */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-[18px] py-3 bg-gradient-to-br from-violet-600 to-purple-600">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Additional Information</span>
            </div>
            <div className="p-[18px] grid gap-3.5">
              {/* Payment Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Payment Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-400 pointer-events-none" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                    name="paymentDate"
                    type="date"
                    value={formData.paymentDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500">Notes</label>
                <textarea
                  className="w-full min-h-[80px] rounded-[10px] border-[1.5px] border-slate-200 bg-white p-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 resize-y"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Enter any additional notes or comments..."
                />
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
                <><span className="w-3.5 h-3.5 border-2 border-white/35 border-t-white rounded-full animate-spin shrink-0" /> Saving...</>
              ) : (
                <><Save className="w-[15px] h-[15px]" /> {payroll ? "Update Payroll" : "Create Payroll"}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
