"use client"

import { useMemo, useState } from "react"
import { X } from "lucide-react"
import { PROMOTION_DEPARTMENTS, PROMOTION_TYPE_OPTIONS } from "@/constants/promotion"

interface PromotionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (payload: {
    employeeId: string
    employeeName: string
    joiningDate: string
    department: string
    currentDesignation: string
    currentResponsibilities: string[]
    proposedDesignation: string
    proposedDepartment: string
    reportingManager: string
    proposedReportingManager: string
    requestedDate: string
    effectiveDate: string
    currentSalary: number
    proposedSalary: number
    oldBonus: number
    newBonus: number
    allowanceChanges: Array<{ label: string; oldValue: number; newValue: number }>
    benefitChanges: Array<{ label: string; oldValue: string; newValue: string }>
    performanceRating: number
    kpis: string[]
    achievements: string[]
    appraisalHistory: string
    justification: string
    promotionType: "vertical" | "lateral" | "temporary"
    probationMonths: number
    requiresHigherAuthority: boolean
    attachmentNames: string[]
  }) => void
}

export function PromotionModal({ isOpen, onClose, onSubmit }: PromotionModalProps) {
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    joiningDate: "",
    department: "Engineering",
    currentDesignation: "",
    currentResponsibilitiesText: "",
    proposedDesignation: "",
    proposedDepartment: "Engineering",
    reportingManager: "",
    proposedReportingManager: "",
    requestedDate: "",
    effectiveDate: "",
    currentSalary: 0,
    proposedSalary: 0,
    oldBonus: 0,
    newBonus: 0,
    allowanceText: "",
    benefitText: "",
    performanceRating: 3.5,
    kpiText: "",
    achievementsText: "",
    appraisalHistory: "",
    justification: "",
    promotionType: "vertical" as "vertical" | "lateral" | "temporary",
    probationMonths: 3,
    requiresHigherAuthority: false,
    attachmentText: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const departmentOptions = useMemo(() => PROMOTION_DEPARTMENTS.filter((d) => d !== "All Departments"), [])

  if (!isOpen) return null

  const inputClass =
    "w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 text-sm"

  const parseList = (value: string) =>
    value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean)

  const parseAllowances = (value: string) =>
    parseList(value).map((line) => {
      const [label = "Allowance", oldV = "0", newV = "0"] = line.split("|").map((v) => v.trim())
      return { label, oldValue: Number(oldV), newValue: Number(newV) }
    })

  const parseBenefits = (value: string) =>
    parseList(value).map((line) => {
      const [label = "Benefit", oldV = "Old", newV = "New"] = line.split("|").map((v) => v.trim())
      return { label, oldValue: oldV, newValue: newV }
    })

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.employeeId.trim()) e.employeeId = "Employee ID is required"
    if (!formData.employeeName.trim()) e.employeeName = "Employee name is required"
    if (!formData.joiningDate) e.joiningDate = "Joining date is required"
    if (!formData.currentDesignation.trim()) e.currentDesignation = "Current designation is required"
    if (!formData.proposedDesignation.trim()) e.proposedDesignation = "Proposed designation is required"
    if (!formData.reportingManager.trim()) e.reportingManager = "Current reporting manager is required"
    if (!formData.proposedReportingManager.trim()) e.proposedReportingManager = "New reporting manager is required"
    if (!formData.requestedDate) e.requestedDate = "Requested date is required"
    if (!formData.effectiveDate) e.effectiveDate = "Effective date is required"
    if (formData.currentSalary <= 0) e.currentSalary = "Current salary must be greater than 0"
    if (formData.proposedSalary <= formData.currentSalary) e.proposedSalary = "Proposed salary must be greater than current salary"
    if (!formData.justification.trim()) e.justification = "Reason for promotion is required"
    if (!formData.appraisalHistory.trim()) e.appraisalHistory = "Appraisal history is required"
    return e
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }

    onSubmit({
      employeeId: formData.employeeId,
      employeeName: formData.employeeName,
      joiningDate: formData.joiningDate,
      department: formData.department,
      currentDesignation: formData.currentDesignation,
      currentResponsibilities: parseList(formData.currentResponsibilitiesText),
      proposedDesignation: formData.proposedDesignation,
      proposedDepartment: formData.proposedDepartment,
      reportingManager: formData.reportingManager,
      proposedReportingManager: formData.proposedReportingManager,
      requestedDate: formData.requestedDate,
      effectiveDate: formData.effectiveDate,
      currentSalary: formData.currentSalary,
      proposedSalary: formData.proposedSalary,
      oldBonus: formData.oldBonus,
      newBonus: formData.newBonus,
      allowanceChanges: parseAllowances(formData.allowanceText),
      benefitChanges: parseBenefits(formData.benefitText),
      performanceRating: formData.performanceRating,
      kpis: parseList(formData.kpiText),
      achievements: parseList(formData.achievementsText),
      appraisalHistory: formData.appraisalHistory,
      justification: formData.justification,
      promotionType: formData.promotionType,
      probationMonths: formData.probationMonths,
      requiresHigherAuthority: formData.requiresHigherAuthority,
      attachmentNames: parseList(formData.attachmentText),
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={(e) => e.currentTarget === e.target && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[92vh] overflow-y-auto border border-slate-200 shadow-xl">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Create Promotion Request</h3>
            <p className="text-xs text-slate-500 mt-0.5">Structured request for employee promotion decision-making.</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Employee ID</label>
              <input className={inputClass} value={formData.employeeId} onChange={(e) => setFormData((p) => ({ ...p, employeeId: e.target.value }))} />
              {errors.employeeId && <p className="mt-1 text-xs text-red-600">{errors.employeeId}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Employee Name</label>
              <input className={inputClass} value={formData.employeeName} onChange={(e) => setFormData((p) => ({ ...p, employeeName: e.target.value }))} />
              {errors.employeeName && <p className="mt-1 text-xs text-red-600">{errors.employeeName}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Department</label>
              <select className={inputClass} value={formData.department} onChange={(e) => setFormData((p) => ({ ...p, department: e.target.value }))}>
                {departmentOptions.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Joining Date</label>
              <input type="date" className={inputClass} value={formData.joiningDate} onChange={(e) => setFormData((p) => ({ ...p, joiningDate: e.target.value }))} />
              {errors.joiningDate && <p className="mt-1 text-xs text-red-600">{errors.joiningDate}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Current Designation</label>
              <input className={inputClass} value={formData.currentDesignation} onChange={(e) => setFormData((p) => ({ ...p, currentDesignation: e.target.value }))} />
              {errors.currentDesignation && <p className="mt-1 text-xs text-red-600">{errors.currentDesignation}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Current Reporting Manager</label>
              <input className={inputClass} value={formData.reportingManager} onChange={(e) => setFormData((p) => ({ ...p, reportingManager: e.target.value }))} />
              {errors.reportingManager && <p className="mt-1 text-xs text-red-600">{errors.reportingManager}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Current Responsibilities (one per line)</label>
              <textarea rows={3} className={inputClass} value={formData.currentResponsibilitiesText} onChange={(e) => setFormData((p) => ({ ...p, currentResponsibilitiesText: e.target.value }))} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Proposed Designation</label>
              <input className={inputClass} value={formData.proposedDesignation} onChange={(e) => setFormData((p) => ({ ...p, proposedDesignation: e.target.value }))} />
              {errors.proposedDesignation && <p className="mt-1 text-xs text-red-600">{errors.proposedDesignation}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Proposed Department</label>
              <select className={inputClass} value={formData.proposedDepartment} onChange={(e) => setFormData((p) => ({ ...p, proposedDepartment: e.target.value }))}>
                {departmentOptions.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Proposed Reporting Manager</label>
              <input className={inputClass} value={formData.proposedReportingManager} onChange={(e) => setFormData((p) => ({ ...p, proposedReportingManager: e.target.value }))} />
              {errors.proposedReportingManager && <p className="mt-1 text-xs text-red-600">{errors.proposedReportingManager}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Promotion Type</label>
              <select className={inputClass} value={formData.promotionType} onChange={(e) => setFormData((p) => ({ ...p, promotionType: e.target.value as "vertical" | "lateral" | "temporary" }))}>
                {PROMOTION_TYPE_OPTIONS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Requested Date</label>
              <input type="date" className={inputClass} value={formData.requestedDate} onChange={(e) => setFormData((p) => ({ ...p, requestedDate: e.target.value }))} />
              {errors.requestedDate && <p className="mt-1 text-xs text-red-600">{errors.requestedDate}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Promotion Start Date</label>
              <input type="date" className={inputClass} value={formData.effectiveDate} onChange={(e) => setFormData((p) => ({ ...p, effectiveDate: e.target.value }))} />
              {errors.effectiveDate && <p className="mt-1 text-xs text-red-600">{errors.effectiveDate}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Probation (months)</label>
              <input type="number" min={0} className={inputClass} value={formData.probationMonths} onChange={(e) => setFormData((p) => ({ ...p, probationMonths: Number(e.target.value) }))} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Current Salary</label>
              <input type="number" min={0} className={inputClass} value={formData.currentSalary} onChange={(e) => setFormData((p) => ({ ...p, currentSalary: Number(e.target.value) }))} />
              {errors.currentSalary && <p className="mt-1 text-xs text-red-600">{errors.currentSalary}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">New Salary</label>
              <input type="number" min={0} className={inputClass} value={formData.proposedSalary} onChange={(e) => setFormData((p) => ({ ...p, proposedSalary: Number(e.target.value) }))} />
              {errors.proposedSalary && <p className="mt-1 text-xs text-red-600">{errors.proposedSalary}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Old Bonus</label>
              <input type="number" min={0} className={inputClass} value={formData.oldBonus} onChange={(e) => setFormData((p) => ({ ...p, oldBonus: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">New Bonus</label>
              <input type="number" min={0} className={inputClass} value={formData.newBonus} onChange={(e) => setFormData((p) => ({ ...p, newBonus: Number(e.target.value) }))} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Allowance changes (one per line: Name|Old|New)</label>
              <textarea rows={3} className={inputClass} value={formData.allowanceText} onChange={(e) => setFormData((p) => ({ ...p, allowanceText: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Benefit updates (one per line: Name|Old|New)</label>
              <textarea rows={3} className={inputClass} value={formData.benefitText} onChange={(e) => setFormData((p) => ({ ...p, benefitText: e.target.value }))} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Performance rating</label>
              <input type="number" min={1} max={5} step="0.1" className={inputClass} value={formData.performanceRating} onChange={(e) => setFormData((p) => ({ ...p, performanceRating: Number(e.target.value) }))} />
            </div>
            <div className="flex items-end">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={formData.requiresHigherAuthority} onChange={(e) => setFormData((p) => ({ ...p, requiresHigherAuthority: e.target.checked }))} className="accent-indigo-600" />
                Requires higher authority approval
              </label>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">KPIs (one per line)</label>
              <textarea rows={3} className={inputClass} value={formData.kpiText} onChange={(e) => setFormData((p) => ({ ...p, kpiText: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Achievements (one per line)</label>
              <textarea rows={3} className={inputClass} value={formData.achievementsText} onChange={(e) => setFormData((p) => ({ ...p, achievementsText: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Appraisal history summary</label>
              <textarea rows={3} className={inputClass} value={formData.appraisalHistory} onChange={(e) => setFormData((p) => ({ ...p, appraisalHistory: e.target.value }))} />
              {errors.appraisalHistory && <p className="mt-1 text-xs text-red-600">{errors.appraisalHistory}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Supporting documents (one filename per line)</label>
              <textarea rows={3} className={inputClass} value={formData.attachmentText} onChange={(e) => setFormData((p) => ({ ...p, attachmentText: e.target.value }))} placeholder="Appraisal_Q4.pdf\nRecommendation.docx" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Reason for promotion</label>
            <textarea rows={4} className={inputClass} value={formData.justification} onChange={(e) => setFormData((p) => ({ ...p, justification: e.target.value }))} />
            {errors.justification && <p className="mt-1 text-xs text-red-600">{errors.justification}</p>}
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">Create Draft</button>
          </div>
        </form>
      </div>
    </div>
  )
}
