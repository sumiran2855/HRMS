"use client"

import { useMemo, useState } from "react"
import { X, UserMinus, User, Building2, CalendarDays, Clock, FileText } from "lucide-react"
import { RESIGNATION_DEPARTMENTS } from "@/constants/resignation"

interface ResignationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (payload: {
    employeeId: string
    employeeName: string
    department: string
    designation: string
    reportingManager: string
    appliedDate: string
    lastWorkingDate: string
    noticePeriodDays: number
    reason: string
  }) => void
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

const INITIAL_FORM = {
  employeeId: "",
  employeeName: "",
  department: "Engineering",
  designation: "",
  reportingManager: "",
  appliedDate: "",
  lastWorkingDate: "",
  noticePeriodDays: 30,
  reason: "",
}

export function ResignationModal({ isOpen, onClose, onSubmit }: ResignationModalProps) {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const departmentOptions = useMemo(
    () => RESIGNATION_DEPARTMENTS.filter((item) => item !== "All Departments"),
    []
  )

  if (!isOpen) return null

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.employeeId.trim()) e.employeeId = "Required"
    if (!formData.employeeName.trim()) e.employeeName = "Required"
    if (!formData.designation.trim()) e.designation = "Required"
    if (!formData.reportingManager.trim()) e.reportingManager = "Required"
    if (!formData.appliedDate) e.appliedDate = "Required"
    if (!formData.lastWorkingDate) e.lastWorkingDate = "Required"
    if (!formData.reason.trim()) e.reason = "Required"
    return e
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    onSubmit(formData)
    setFormData(INITIAL_FORM)
    setErrors({})
    onClose()
  }

  const handleClose = () => {
    setFormData(INITIAL_FORM)
    setErrors({})
    onClose()
  }

  const inputClass =
    "w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:border-blue-400 text-sm bg-white text-slate-800 placeholder:text-slate-400 transition-colors"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
      onClick={(e) => e.currentTarget === e.target && handleClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-2xl border border-slate-200 shadow-2xl flex flex-col max-h-[92vh]">

        {/* Header */}
        <div className="relative bg-gradient-to-br from-purple-400 to-purple-500 rounded-t-2xl px-6 py-5 flex-shrink-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-white rounded-full" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white rounded-full" />
          </div>
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 flex-shrink-0">
                <UserMinus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Resignation Request</h3>
                <p className="text-xs text-blue-100 mt-0.5">Submit a formal resignation for review</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 pt-5 pb-6 space-y-5">

            {/* Employee Details */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee Details</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <Field label="Employee ID *" error={errors.employeeId}>
                  <input
                    value={formData.employeeId}
                    onChange={(e) => handleChange("employeeId", e.target.value)}
                    placeholder="e.g. EMP-001"
                    className={inputClass}
                  />
                </Field>
                <Field label="Employee Name *" error={errors.employeeName}>
                  <input
                    value={formData.employeeName}
                    onChange={(e) => handleChange("employeeName", e.target.value)}
                    placeholder="Full name"
                    className={inputClass}
                  />
                </Field>
                <Field label="Designation *" error={errors.designation}>
                  <input
                    value={formData.designation}
                    onChange={(e) => handleChange("designation", e.target.value)}
                    placeholder="Current designation"
                    className={inputClass}
                  />
                </Field>
                <Field label="Reporting Manager *" error={errors.reportingManager}>
                  <input
                    value={formData.reportingManager}
                    onChange={(e) => handleChange("reportingManager", e.target.value)}
                    placeholder="Manager name"
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>

            {/* Department */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <Field label="Department *">
                  <select
                    value={formData.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                    className={inputClass}
                  >
                    {departmentOptions.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center">
                  <CalendarDays className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Timeline</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <Field label="Applied Date *" error={errors.appliedDate}>
                  <input
                    type="date"
                    value={formData.appliedDate}
                    onChange={(e) => handleChange("appliedDate", e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Last Working Date *" error={errors.lastWorkingDate}>
                  <input
                    type="date"
                    value={formData.lastWorkingDate}
                    onChange={(e) => handleChange("lastWorkingDate", e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Notice Period (days)">
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                    <input
                      type="number"
                      min={1}
                      value={formData.noticePeriodDays}
                      onChange={(e) => handleChange("noticePeriodDays", Number(e.target.value))}
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </Field>
              </div>
            </div>

            {/* Reason */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Reason</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <Field label="Resignation Reason *" error={errors.reason}>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => handleChange("reason", e.target.value)}
                    rows={4}
                    placeholder="Provide a brief reason for the resignation..."
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-white rounded-b-2xl flex-shrink-0">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors shadow-sm hover:shadow-md"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

