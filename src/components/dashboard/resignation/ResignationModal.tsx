"use client"

import { useMemo, useState } from "react"
import { X } from "lucide-react"
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

export function ResignationModal({ isOpen, onClose, onSubmit }: ResignationModalProps) {
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    department: "Engineering",
    designation: "",
    reportingManager: "",
    appliedDate: "",
    lastWorkingDate: "",
    noticePeriodDays: 30,
    reason: "",
  })

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
    const nextErrors: Record<string, string> = {}

    if (!formData.employeeId.trim()) nextErrors.employeeId = "Employee ID is required"
    if (!formData.employeeName.trim()) nextErrors.employeeName = "Employee name is required"
    if (!formData.designation.trim()) nextErrors.designation = "Designation is required"
    if (!formData.reportingManager.trim()) nextErrors.reportingManager = "Reporting manager is required"
    if (!formData.appliedDate) nextErrors.appliedDate = "Applied date is required"
    if (!formData.lastWorkingDate) nextErrors.lastWorkingDate = "Last working date is required"
    if (!formData.reason.trim()) nextErrors.reason = "Reason is required"

    return nextErrors
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    onSubmit(formData)
    setFormData({
      employeeId: "",
      employeeName: "",
      department: "Engineering",
      designation: "",
      reportingManager: "",
      appliedDate: "",
      lastWorkingDate: "",
      noticePeriodDays: 30,
      reason: "",
    })
    setErrors({})
  }

  const inputClass =
    "w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 text-sm"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={(e) => e.currentTarget === e.target && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-200 shadow-xl">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Add Resignation Request</h3>
            <p className="text-xs text-slate-500 mt-0.5">Capture employee resignation details for review.</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Employee ID</label>
              <input
                value={formData.employeeId}
                onChange={(e) => handleChange("employeeId", e.target.value)}
                placeholder="EMP-0000"
                className={inputClass}
              />
              {errors.employeeId && <p className="mt-1 text-xs text-red-600">{errors.employeeId}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Employee Name</label>
              <input
                value={formData.employeeName}
                onChange={(e) => handleChange("employeeName", e.target.value)}
                placeholder="Employee full name"
                className={inputClass}
              />
              {errors.employeeName && <p className="mt-1 text-xs text-red-600">{errors.employeeName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Department</label>
              <select
                value={formData.department}
                onChange={(e) => handleChange("department", e.target.value)}
                className={inputClass}
              >
                {departmentOptions.map((department) => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Designation</label>
              <input
                value={formData.designation}
                onChange={(e) => handleChange("designation", e.target.value)}
                placeholder="Current designation"
                className={inputClass}
              />
              {errors.designation && <p className="mt-1 text-xs text-red-600">{errors.designation}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Reporting Manager</label>
              <input
                value={formData.reportingManager}
                onChange={(e) => handleChange("reportingManager", e.target.value)}
                placeholder="Manager name"
                className={inputClass}
              />
              {errors.reportingManager && <p className="mt-1 text-xs text-red-600">{errors.reportingManager}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Notice Period (days)</label>
              <input
                type="number"
                min={1}
                value={formData.noticePeriodDays}
                onChange={(e) => handleChange("noticePeriodDays", Number(e.target.value))}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Applied Date</label>
              <input
                type="date"
                value={formData.appliedDate}
                onChange={(e) => handleChange("appliedDate", e.target.value)}
                className={inputClass}
              />
              {errors.appliedDate && <p className="mt-1 text-xs text-red-600">{errors.appliedDate}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Last Working Date</label>
              <input
                type="date"
                value={formData.lastWorkingDate}
                onChange={(e) => handleChange("lastWorkingDate", e.target.value)}
                className={inputClass}
              />
              {errors.lastWorkingDate && <p className="mt-1 text-xs text-red-600">{errors.lastWorkingDate}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Resignation Reason</label>
            <textarea
              value={formData.reason}
              onChange={(e) => handleChange("reason", e.target.value)}
              rows={4}
              placeholder="Add context for resignation request..."
              className={inputClass}
            />
            {errors.reason && <p className="mt-1 text-xs text-red-600">{errors.reason}</p>}
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
