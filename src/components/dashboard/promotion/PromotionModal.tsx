"use client"

import { useMemo, useState } from "react"
import { Check, X, User, Briefcase, TrendingUp, FileText } from "lucide-react"
import { PROMOTION_DEPARTMENTS, PROMOTION_TYPE_OPTIONS } from "@/constants/promotion"

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

const STEPS = [
  { id: 1, label: "Employee", icon: User },
  { id: 2, label: "Role", icon: Briefcase },
  { id: 3, label: "Salary & Performance", icon: TrendingUp },
  { id: 4, label: "Justification", icon: FileText },
]

const INITIAL_FORM = {
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
}

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
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const departmentOptions = useMemo(() => PROMOTION_DEPARTMENTS.filter((d) => d !== "All Departments"), [])

  if (!isOpen) return null

  const inputClass =
    "w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 text-sm bg-white text-slate-800 placeholder:text-slate-400"

  const set = (key: keyof typeof INITIAL_FORM, value: unknown) =>
    setFormData((p) => ({ ...p, [key]: value }))

  const parseList = (value: string) =>
    value.split("\n").map((s) => s.trim()).filter(Boolean)

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

  const validateStep = (s: number): Record<string, string> => {
    const e: Record<string, string> = {}
    if (s === 1) {
      if (!formData.employeeId.trim()) e.employeeId = "Required"
      if (!formData.employeeName.trim()) e.employeeName = "Required"
      if (!formData.joiningDate) e.joiningDate = "Required"
    }
    if (s === 2) {
      if (!formData.currentDesignation.trim()) e.currentDesignation = "Required"
      if (!formData.reportingManager.trim()) e.reportingManager = "Required"
      if (!formData.proposedDesignation.trim()) e.proposedDesignation = "Required"
      if (!formData.proposedReportingManager.trim()) e.proposedReportingManager = "Required"
      if (!formData.requestedDate) e.requestedDate = "Required"
      if (!formData.effectiveDate) e.effectiveDate = "Required"
    }
    if (s === 3) {
      if (formData.currentSalary <= 0) e.currentSalary = "Must be greater than 0"
      if (formData.proposedSalary <= formData.currentSalary) e.proposedSalary = "Must exceed current salary"
      if (!formData.appraisalHistory.trim()) e.appraisalHistory = "Required"
    }
    if (s === 4) {
      if (!formData.justification.trim()) e.justification = "Required"
    }
    return e
  }

  const handleNext = () => {
    const e = validateStep(step)
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setErrors({})
    setStep((s) => s + 1)
  }

  const handleBack = () => { setErrors({}); setStep((s) => s - 1) }

  const handleClose = () => {
    setStep(1)
    setFormData(INITIAL_FORM)
    setErrors({})
    onClose()
  }

  const handleSubmit = () => {
    const e = validateStep(4)
    if (Object.keys(e).length > 0) { setErrors(e); return }
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
    handleClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
      onClick={(e) => e.currentTarget === e.target && handleClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-2xl border border-slate-200 shadow-2xl flex flex-col max-h-[92vh]">

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Create Promotion Request</h3>
            <p className="text-xs text-slate-400 mt-0.5">Step {step} of {STEPS.length}</p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-6 pt-5 pb-4 flex-shrink-0">
          <div className="flex items-center">
            {STEPS.map((s, i) => {
              const isCompleted = step > s.id
              const isCurrent = step === s.id
              const Icon = s.icon
              return (
                <div key={s.id} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                        isCompleted
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : isCurrent
                          ? "bg-white border-indigo-600 text-indigo-600"
                          : "bg-white border-slate-200 text-slate-400"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4" strokeWidth={2.5} />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>
                    <span
                      className={`text-[11px] font-medium whitespace-nowrap ${
                        isCurrent ? "text-indigo-600" : isCompleted ? "text-slate-600" : "text-slate-400"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mb-4 mx-2 rounded-full transition-all duration-300 ${
                        step > s.id ? "bg-indigo-600" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-2">

          {/* Step 1 – Employee Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Employee ID *" error={errors.employeeId}>
                  <input
                    className={inputClass}
                    placeholder="e.g. EMP-001"
                    value={formData.employeeId}
                    onChange={(e) => set("employeeId", e.target.value)}
                  />
                </Field>
                <Field label="Employee Name *" error={errors.employeeName}>
                  <input
                    className={inputClass}
                    placeholder="Full name"
                    value={formData.employeeName}
                    onChange={(e) => set("employeeName", e.target.value)}
                  />
                </Field>
                <Field label="Department *">
                  <select className={inputClass} value={formData.department} onChange={(e) => set("department", e.target.value)}>
                    {departmentOptions.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </Field>
                <Field label="Joining Date *" error={errors.joiningDate}>
                  <input
                    type="date"
                    className={inputClass}
                    value={formData.joiningDate}
                    onChange={(e) => set("joiningDate", e.target.value)}
                  />
                </Field>
              </div>
            </div>
          )}

          {/* Step 2 – Role & Promotion */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Role</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Current Designation *" error={errors.currentDesignation}>
                  <input
                    className={inputClass}
                    placeholder="e.g. Software Engineer"
                    value={formData.currentDesignation}
                    onChange={(e) => set("currentDesignation", e.target.value)}
                  />
                </Field>
                <Field label="Current Reporting Manager *" error={errors.reportingManager}>
                  <input
                    className={inputClass}
                    placeholder="Manager name"
                    value={formData.reportingManager}
                    onChange={(e) => set("reportingManager", e.target.value)}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Current Responsibilities (one per line)">
                    <textarea
                      rows={3}
                      className={inputClass}
                      placeholder="List key responsibilities..."
                      value={formData.currentResponsibilitiesText}
                      onChange={(e) => set("currentResponsibilitiesText", e.target.value)}
                    />
                  </Field>
                </div>
              </div>

              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-1">Proposed Promotion</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Proposed Designation *" error={errors.proposedDesignation}>
                  <input
                    className={inputClass}
                    placeholder="e.g. Senior Software Engineer"
                    value={formData.proposedDesignation}
                    onChange={(e) => set("proposedDesignation", e.target.value)}
                  />
                </Field>
                <Field label="Proposed Department *">
                  <select className={inputClass} value={formData.proposedDepartment} onChange={(e) => set("proposedDepartment", e.target.value)}>
                    {departmentOptions.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </Field>
                <Field label="New Reporting Manager *" error={errors.proposedReportingManager}>
                  <input
                    className={inputClass}
                    placeholder="New manager name"
                    value={formData.proposedReportingManager}
                    onChange={(e) => set("proposedReportingManager", e.target.value)}
                  />
                </Field>
                <Field label="Promotion Type *">
                  <select className={inputClass} value={formData.promotionType} onChange={(e) => set("promotionType", e.target.value as "vertical" | "lateral" | "temporary")}>
                    {PROMOTION_TYPE_OPTIONS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                  </select>
                </Field>
                <Field label="Requested Date *" error={errors.requestedDate}>
                  <input
                    type="date"
                    className={inputClass}
                    value={formData.requestedDate}
                    onChange={(e) => set("requestedDate", e.target.value)}
                  />
                </Field>
                <Field label="Effective Date *" error={errors.effectiveDate}>
                  <input
                    type="date"
                    className={inputClass}
                    value={formData.effectiveDate}
                    onChange={(e) => set("effectiveDate", e.target.value)}
                  />
                </Field>
                <Field label="Probation Period (months)">
                  <input
                    type="number"
                    min={0}
                    className={inputClass}
                    value={formData.probationMonths}
                    onChange={(e) => set("probationMonths", Number(e.target.value))}
                  />
                </Field>
              </div>
            </div>
          )}

          {/* Step 3 – Salary & Performance */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Salary Revision</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Field label="Current Salary *" error={errors.currentSalary}>
                  <input type="number" min={0} className={inputClass} value={formData.currentSalary} onChange={(e) => set("currentSalary", Number(e.target.value))} />
                </Field>
                <Field label="Proposed Salary *" error={errors.proposedSalary}>
                  <input type="number" min={0} className={inputClass} value={formData.proposedSalary} onChange={(e) => set("proposedSalary", Number(e.target.value))} />
                </Field>
                <Field label="Current Bonus">
                  <input type="number" min={0} className={inputClass} value={formData.oldBonus} onChange={(e) => set("oldBonus", Number(e.target.value))} />
                </Field>
                <Field label="New Bonus">
                  <input type="number" min={0} className={inputClass} value={formData.newBonus} onChange={(e) => set("newBonus", Number(e.target.value))} />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Allowance Changes (Name|Old|New, one per line)">
                  <textarea rows={3} className={inputClass} placeholder="Housing|5000|6000" value={formData.allowanceText} onChange={(e) => set("allowanceText", e.target.value)} />
                </Field>
                <Field label="Benefit Updates (Name|Old|New, one per line)">
                  <textarea rows={3} className={inputClass} placeholder="Health Insurance|Basic|Premium" value={formData.benefitText} onChange={(e) => set("benefitText", e.target.value)} />
                </Field>
              </div>

              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-1">Performance</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Performance Rating (1–5)">
                  <input type="number" min={1} max={5} step="0.1" className={inputClass} value={formData.performanceRating} onChange={(e) => set("performanceRating", Number(e.target.value))} />
                </Field>
                <Field label="Appraisal History Summary *" error={errors.appraisalHistory}>
                  <textarea rows={3} className={inputClass} placeholder="Summarise past appraisals..." value={formData.appraisalHistory} onChange={(e) => set("appraisalHistory", e.target.value)} />
                </Field>
                <Field label="KPIs (one per line)">
                  <textarea rows={3} className={inputClass} placeholder="Delivered X feature..." value={formData.kpiText} onChange={(e) => set("kpiText", e.target.value)} />
                </Field>
                <Field label="Achievements (one per line)">
                  <textarea rows={3} className={inputClass} placeholder="Reduced latency by 40%..." value={formData.achievementsText} onChange={(e) => set("achievementsText", e.target.value)} />
                </Field>
              </div>
            </div>
          )}

          {/* Step 4 – Justification & Docs */}
          {step === 4 && (
            <div className="space-y-4">
              <Field label="Reason for Promotion *" error={errors.justification}>
                <textarea
                  rows={5}
                  className={inputClass}
                  placeholder="Explain why this promotion is warranted..."
                  value={formData.justification}
                  onChange={(e) => set("justification", e.target.value)}
                />
              </Field>
              <Field label="Supporting Documents (one filename per line)">
                <textarea
                  rows={3}
                  className={inputClass}
                  placeholder={"Appraisal_Q4.pdf\nRecommendation.docx"}
                  value={formData.attachmentText}
                  onChange={(e) => set("attachmentText", e.target.value)}
                />
              </Field>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <input
                  id="higher-auth"
                  type="checkbox"
                  checked={formData.requiresHigherAuthority}
                  onChange={(e) => set("requiresHigherAuthority", e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 cursor-pointer"
                />
                <label htmlFor="higher-auth" className="text-sm text-slate-700 cursor-pointer select-none">
                  Requires higher authority approval
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between flex-shrink-0 bg-white rounded-b-2xl">
          <button
            type="button"
            onClick={step === 1 ? handleClose : handleBack}
            className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {step === 1 ? "Cancel" : "Back"}
          </button>

          <div className="flex items-center gap-2">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  s.id === step ? "w-5 bg-indigo-600" : s.id < step ? "w-2 bg-indigo-300" : "w-2 bg-slate-200"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={step === STEPS.length ? handleSubmit : handleNext}
            className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            {step === STEPS.length ? "Create Draft" : "Next"}
          </button>
        </div>
      </div>
    </div>
  )
}
