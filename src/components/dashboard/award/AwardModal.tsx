"use client"

import { useEffect, useMemo, useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Sparkles, X } from "lucide-react"
import {
  AWARD_CATEGORY_OPTIONS,
  AWARD_DEPARTMENTS,
  AWARD_NOMINATION_SOURCE_OPTIONS,
  AWARD_REWARD_KIND_OPTIONS,
  AWARD_TYPE_OPTIONS,
  AWARD_VISIBILITY_OPTIONS,
} from "@/constants/award"
import { AwardCreatePayload, AwardRequest, NominationSource, RewardKind, AwardVisibility } from "@/types/award.types"

interface AwardModalProps {
  isOpen: boolean
  onClose: () => void
  mode?: "create" | "edit"
  initialRequest?: AwardRequest | null
  onSubmit: (payload: AwardCreatePayload) => void
}

type AwardFormData = {
  employeeCode: string
  employeeName: string
  department: string
  designation: string
  manager: string
  location: string
  joiningDate: string
  awardType: string
  category: string
  awardTitle: string
  citation: string
  nominationSource: NominationSource
  nominatorName: string
  achievementDate: string
  awardPeriod: string
  businessJustification: string
  linkedValuesText: string
  competenciesText: string
  rewardKind: RewardKind
  rewardValue: number
  currency: string
  taxable: boolean
  financeSettlementRequired: boolean
  visibility: AwardVisibility
  publishDate: string
  rating: number
  kpisText: string
  achievementsText: string
  appraisalSummary: string
  attachmentText: string
}

const getDefaultFormData = (): AwardFormData => ({
    employeeCode: "",
    employeeName: "",
    department: "Engineering",
    designation: "",
    manager: "",
    location: "",
    joiningDate: "",
    awardType: AWARD_TYPE_OPTIONS[0],
    category: AWARD_CATEGORY_OPTIONS[0],
    awardTitle: "",
    citation: "",
    nominationSource: "manager" as NominationSource,
    nominatorName: "",
    achievementDate: "",
    awardPeriod: "",
    businessJustification: "",
    linkedValuesText: "",
    competenciesText: "",
    rewardKind: "cash" as RewardKind,
    rewardValue: 0,
    currency: "INR",
    taxable: true,
    financeSettlementRequired: true,
    visibility: "company_wide" as AwardVisibility,
    publishDate: "",
    rating: 4,
    kpisText: "",
    achievementsText: "",
    appraisalSummary: "",
    attachmentText: "",
})

const toFormData = (request: AwardRequest): AwardFormData => ({
  employeeCode: request.employee.employeeCode,
  employeeName: request.employee.employeeName,
  department: request.employee.department,
  designation: request.employee.designation,
  manager: request.employee.manager,
  location: request.employee.location,
  joiningDate: request.employee.joiningDate,
  awardType: request.summary.awardType,
  category: request.summary.category,
  awardTitle: request.summary.awardTitle,
  citation: request.summary.citation,
  nominationSource: request.nomination.nominationSource,
  nominatorName: request.nomination.nominatorName,
  achievementDate: request.summary.achievementDate,
  awardPeriod: request.summary.awardPeriod,
  businessJustification: request.nomination.businessJustification,
  linkedValuesText: request.nomination.linkedValues.join("\n"),
  competenciesText: request.nomination.competencies.join("\n"),
  rewardKind: request.reward.rewardKind,
  rewardValue: request.reward.rewardValue,
  currency: request.reward.currency,
  taxable: request.reward.taxable,
  financeSettlementRequired: request.reward.financeSettlementRequired,
  visibility: request.summary.visibility,
  publishDate: request.summary.publishDate,
  rating: request.performance.rating,
  kpisText: request.performance.kpis.join("\n"),
  achievementsText: request.performance.achievements.join("\n"),
  appraisalSummary: request.performance.appraisalSummary,
  attachmentText: request.attachments.map((attachment) => attachment.name).join("\n"),
})

const AWARD_FORM_STEPS = [
  { id: "employee", label: "Employee" },
  { id: "award", label: "Award" },
  { id: "evidence", label: "Evidence" },
  { id: "reward", label: "Reward" },
  { id: "review", label: "Review" },
] as const

export function AwardModal({ isOpen, onClose, mode = "create", initialRequest, onSubmit }: AwardModalProps) {
  const [formData, setFormData] = useState<AwardFormData>(getDefaultFormData())
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState(0)

  const departmentOptions = useMemo(() => AWARD_DEPARTMENTS.filter((department) => department !== "All Departments"), [])

  useEffect(() => {
    if (!isOpen) return
    if (mode === "edit" && initialRequest) {
      setFormData(toFormData(initialRequest))
    } else {
      setFormData(getDefaultFormData())
    }
    setErrors({})
    setCurrentStep(0)
  }, [isOpen, mode, initialRequest])

  if (!isOpen) return null

  const inputClass =
    "w-full rounded-xl border border-fuchsia-100 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-fuchsia-300 focus-visible:ring-2 focus-visible:ring-fuchsia-400/30"

  const sectionClass = "rounded-2xl border border-fuchsia-100/80 bg-gradient-to-br from-white via-rose-50/50 to-violet-50/60 p-4 shadow-sm"

  const parseList = (value: string) =>
    value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean)

  const validate = () => {
    const next: Record<string, string> = {}
    if (!formData.employeeCode.trim()) next.employeeCode = "Employee code is required"
    if (!formData.employeeName.trim()) next.employeeName = "Employee name is required"
    if (!formData.designation.trim()) next.designation = "Designation is required"
    if (!formData.manager.trim()) next.manager = "Manager name is required"
    if (!formData.location.trim()) next.location = "Location is required"
    if (!formData.joiningDate) next.joiningDate = "Joining date is required"
    if (!formData.awardTitle.trim()) next.awardTitle = "Award title is required"
    if (!formData.citation.trim()) next.citation = "Citation is required"
    if (!formData.nominatorName.trim()) next.nominatorName = "Nominator name is required"
    if (!formData.achievementDate) next.achievementDate = "Achievement date is required"
    if (!formData.awardPeriod.trim()) next.awardPeriod = "Award period is required"
    if (!formData.businessJustification.trim()) next.businessJustification = "Business justification is required"
    if (formData.rewardValue < 0) next.rewardValue = "Reward value cannot be negative"
    if (!formData.publishDate) next.publishDate = "Publish date is required"
    if (!formData.appraisalSummary.trim()) next.appraisalSummary = "Performance summary is required"
    return next
  }

  const getStepFieldKeys = (step: number): Array<keyof AwardFormData> => {
    if (step === 0) {
      return ["employeeCode", "employeeName", "designation", "manager", "location", "joiningDate"]
    }

    if (step === 1) {
      return ["awardTitle", "citation", "nominatorName", "achievementDate", "awardPeriod", "businessJustification", "publishDate"]
    }

    if (step === 2) {
      return ["appraisalSummary"]
    }

    if (step === 3) {
      return ["rewardValue"]
    }

    return []
  }

  const validateStep = (step: number) => {
    const allErrors = validate()
    const keys = getStepFieldKeys(step)
    const stepErrors = keys.reduce<Record<string, string>>((acc, key) => {
      if (allErrors[key]) {
        acc[key] = allErrors[key]
      }
      return acc
    }, {})

    return stepErrors
  }

  const goNextStep = () => {
    const stepErrors = validateStep(currentStep)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }

    setErrors({})
    setCurrentStep((prev) => Math.min(prev + 1, AWARD_FORM_STEPS.length - 1))
  }

  const goPrevStep = () => {
    setErrors({})
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const jumpToStep = (stepIndex: number) => {
    if (stepIndex === currentStep) return
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex)
      return
    }

    goNextStep()
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const next = validate()
    if (Object.keys(next).length > 0) {
      setErrors(next)
      return
    }

    onSubmit({
      employeeCode: formData.employeeCode,
      employeeName: formData.employeeName,
      department: formData.department,
      designation: formData.designation,
      manager: formData.manager,
      location: formData.location,
      joiningDate: formData.joiningDate,
      awardType: formData.awardType,
      category: formData.category,
      awardTitle: formData.awardTitle,
      citation: formData.citation,
      nominationSource: formData.nominationSource,
      nominatorName: formData.nominatorName,
      achievementDate: formData.achievementDate,
      awardPeriod: formData.awardPeriod,
      businessJustification: formData.businessJustification,
      linkedValues: parseList(formData.linkedValuesText),
      competencies: parseList(formData.competenciesText),
      rewardKind: formData.rewardKind,
      rewardValue: formData.rewardValue,
      currency: formData.currency,
      taxable: formData.taxable,
      financeSettlementRequired: formData.financeSettlementRequired,
      visibility: formData.visibility,
      publishDate: formData.publishDate,
      rating: formData.rating,
      kpis: parseList(formData.kpisText),
      achievements: parseList(formData.achievementsText),
      appraisalSummary: formData.appraisalSummary,
      attachmentNames: parseList(formData.attachmentText),
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={(e) => e.currentTarget === e.target && onClose()}>
      <div className="w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-3xl border border-fuchsia-100 bg-white shadow-[0_35px_120px_-50px_rgba(190,24,93,0.45)]">
        <div className="sticky top-0 z-10 border-b border-fuchsia-100 bg-gradient-to-r from-rose-50 via-white to-violet-50 px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-100 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-fuchsia-700">
                <Sparkles className="h-3.5 w-3.5" />
                {mode === "edit" ? "Edit nomination" : "Create nomination"}
              </div>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                {mode === "edit" ? "Edit Award Nomination" : "Create Award Nomination"}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {mode === "edit"
                  ? "Update recognition details while keeping workflow history and activity trace linked."
                  : "Capture recognition details, reward context, and evidence in one connected workflow."}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="hidden items-center gap-2 rounded-xl border border-fuchsia-100 bg-white px-3 py-2 text-xs text-slate-600 md:inline-flex">
                <Calendar className="h-4 w-4 text-fuchsia-500" />
                {mode === "edit" ? "Editing existing record" : "Creating new draft"}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="h-9 w-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50"
                aria-label="Close award modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {AWARD_FORM_STEPS.map((step, index) => {
              const isActive = index === currentStep
              const isDone = index < currentStep

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => jumpToStep(index)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    isActive
                      ? "border-fuchsia-300 bg-fuchsia-100 text-fuchsia-700"
                      : isDone
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-white text-slate-500"
                  }`}
                >
                  <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                    isActive
                      ? "bg-fuchsia-600 text-white"
                      : isDone
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-200 text-slate-600"
                  }`}
                  >
                    {index + 1}
                  </span>
                  {step.label}
                </button>
              )
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {currentStep === 0 && (
            <div className={sectionClass}>
              <h4 className="mb-3 text-sm font-semibold text-slate-800">Employee Information</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Employee Code</label>
              <input className={inputClass} value={formData.employeeCode} onChange={(e) => setFormData((p) => ({ ...p, employeeCode: e.target.value }))} />
              {errors.employeeCode && <p className="mt-1 text-xs text-red-600">{errors.employeeCode}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Employee Name</label>
              <input className={inputClass} value={formData.employeeName} onChange={(e) => setFormData((p) => ({ ...p, employeeName: e.target.value }))} />
              {errors.employeeName && <p className="mt-1 text-xs text-red-600">{errors.employeeName}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Department</label>
              <select className={inputClass} value={formData.department} onChange={(e) => setFormData((p) => ({ ...p, department: e.target.value }))}>
                {departmentOptions.map((department) => <option key={department} value={department}>{department}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Designation</label>
              <input className={inputClass} value={formData.designation} onChange={(e) => setFormData((p) => ({ ...p, designation: e.target.value }))} />
              {errors.designation && <p className="mt-1 text-xs text-red-600">{errors.designation}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Manager</label>
              <input className={inputClass} value={formData.manager} onChange={(e) => setFormData((p) => ({ ...p, manager: e.target.value }))} />
              {errors.manager && <p className="mt-1 text-xs text-red-600">{errors.manager}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Location</label>
              <input className={inputClass} value={formData.location} onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))} />
              {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Joining Date</label>
              <input type="date" className={inputClass} value={formData.joiningDate} onChange={(e) => setFormData((p) => ({ ...p, joiningDate: e.target.value }))} />
              {errors.joiningDate && <p className="mt-1 text-xs text-red-600">{errors.joiningDate}</p>}
            </div>
            </div>
          </div>
          )}

          {currentStep === 1 && (
            <div className={sectionClass}>
              <h4 className="mb-3 text-sm font-semibold text-slate-800">Award Context</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Award Type</label>
              <select className={inputClass} value={formData.awardType} onChange={(e) => setFormData((p) => ({ ...p, awardType: e.target.value }))}>
                {AWARD_TYPE_OPTIONS.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Category</label>
              <select className={inputClass} value={formData.category} onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}>
                {AWARD_CATEGORY_OPTIONS.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nomination Source</label>
              <select className={inputClass} value={formData.nominationSource} onChange={(e) => setFormData((p) => ({ ...p, nominationSource: e.target.value as NominationSource }))}>
                {AWARD_NOMINATION_SOURCE_OPTIONS.map((source) => <option key={source.value} value={source.value}>{source.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Visibility</label>
              <select className={inputClass} value={formData.visibility} onChange={(e) => setFormData((p) => ({ ...p, visibility: e.target.value as AwardVisibility }))}>
                {AWARD_VISIBILITY_OPTIONS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Award Title</label>
              <input className={inputClass} value={formData.awardTitle} onChange={(e) => setFormData((p) => ({ ...p, awardTitle: e.target.value }))} />
              {errors.awardTitle && <p className="mt-1 text-xs text-red-600">{errors.awardTitle}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nominator Name</label>
              <input className={inputClass} value={formData.nominatorName} onChange={(e) => setFormData((p) => ({ ...p, nominatorName: e.target.value }))} />
              {errors.nominatorName && <p className="mt-1 text-xs text-red-600">{errors.nominatorName}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Award Period</label>
              <input className={inputClass} value={formData.awardPeriod} onChange={(e) => setFormData((p) => ({ ...p, awardPeriod: e.target.value }))} placeholder="Q2 2026" />
              {errors.awardPeriod && <p className="mt-1 text-xs text-red-600">{errors.awardPeriod}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Achievement Date</label>
              <input type="date" className={inputClass} value={formData.achievementDate} onChange={(e) => setFormData((p) => ({ ...p, achievementDate: e.target.value }))} />
              {errors.achievementDate && <p className="mt-1 text-xs text-red-600">{errors.achievementDate}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Publish Date</label>
              <input type="date" className={inputClass} value={formData.publishDate} onChange={(e) => setFormData((p) => ({ ...p, publishDate: e.target.value }))} />
              {errors.publishDate && <p className="mt-1 text-xs text-red-600">{errors.publishDate}</p>}
            </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Citation / Reason</label>
                <textarea rows={3} className={inputClass} value={formData.citation} onChange={(e) => setFormData((p) => ({ ...p, citation: e.target.value }))} />
                {errors.citation && <p className="mt-1 text-xs text-red-600">{errors.citation}</p>}
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Business Justification</label>
                <textarea rows={4} className={inputClass} value={formData.businessJustification} onChange={(e) => setFormData((p) => ({ ...p, businessJustification: e.target.value }))} />
                {errors.businessJustification && <p className="mt-1 text-xs text-red-600">{errors.businessJustification}</p>}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className={sectionClass}>
              <h4 className="mb-3 text-sm font-semibold text-slate-800">Business & Performance Evidence</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Linked Values (one per line)</label>
              <textarea rows={3} className={inputClass} value={formData.linkedValuesText} onChange={(e) => setFormData((p) => ({ ...p, linkedValuesText: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Competencies (one per line)</label>
              <textarea rows={3} className={inputClass} value={formData.competenciesText} onChange={(e) => setFormData((p) => ({ ...p, competenciesText: e.target.value }))} />
            </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">KPIs / Metrics (one per line)</label>
                  <textarea rows={3} className={inputClass} value={formData.kpisText} onChange={(e) => setFormData((p) => ({ ...p, kpisText: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Achievements (one per line)</label>
                  <textarea rows={3} className={inputClass} value={formData.achievementsText} onChange={(e) => setFormData((p) => ({ ...p, achievementsText: e.target.value }))} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Performance Summary</label>
                  <textarea rows={3} className={inputClass} value={formData.appraisalSummary} onChange={(e) => setFormData((p) => ({ ...p, appraisalSummary: e.target.value }))} />
                  {errors.appraisalSummary && <p className="mt-1 text-xs text-red-600">{errors.appraisalSummary}</p>}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className={sectionClass}>
              <h4 className="mb-3 text-sm font-semibold text-slate-800">Reward & Compensation</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Reward Kind</label>
              <select className={inputClass} value={formData.rewardKind} onChange={(e) => setFormData((p) => ({ ...p, rewardKind: e.target.value as RewardKind }))}>
                {AWARD_REWARD_KIND_OPTIONS.map((kind) => <option key={kind.value} value={kind.value}>{kind.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Reward Value</label>
              <input type="number" min={0} className={inputClass} value={formData.rewardValue} onChange={(e) => setFormData((p) => ({ ...p, rewardValue: Number(e.target.value) }))} />
              {errors.rewardValue && <p className="mt-1 text-xs text-red-600">{errors.rewardValue}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Currency</label>
              <input className={inputClass} value={formData.currency} onChange={(e) => setFormData((p) => ({ ...p, currency: e.target.value.toUpperCase() }))} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Performance Rating</label>
              <input type="number" min={1} max={5} step="0.1" className={inputClass} value={formData.rating} onChange={(e) => setFormData((p) => ({ ...p, rating: Number(e.target.value) }))} />
            </div>
            <div className="md:col-span-2 flex items-center gap-6 rounded-xl border border-fuchsia-100 bg-white px-4 py-3">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={formData.taxable} onChange={(e) => setFormData((p) => ({ ...p, taxable: e.target.checked }))} className="accent-fuchsia-600" />
                Taxable reward
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={formData.financeSettlementRequired} onChange={(e) => setFormData((p) => ({ ...p, financeSettlementRequired: e.target.checked }))} className="accent-fuchsia-600" />
                Requires finance settlement
              </label>
            </div>
            </div>
          </div>
          )}

          {currentStep === 4 && (
            <div className={sectionClass}>
              <h4 className="mb-3 text-sm font-semibold text-slate-800">Attachments & Review</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Attachment Names (one per line)</label>
              <textarea rows={6} className={inputClass} value={formData.attachmentText} onChange={(e) => setFormData((p) => ({ ...p, attachmentText: e.target.value }))} placeholder="Appraisal.pdf\nClientMail.msg" />
            </div>

            <div className="rounded-xl border border-fuchsia-100 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-fuchsia-700">Review summary</p>
              <div className="mt-3 space-y-1.5 text-sm text-slate-700">
                <p><span className="font-semibold">Employee:</span> {formData.employeeName || "—"} ({formData.employeeCode || "—"})</p>
                <p><span className="font-semibold">Award:</span> {formData.awardTitle || "—"}</p>
                <p><span className="font-semibold">Type:</span> {formData.awardType}</p>
                <p><span className="font-semibold">Reward:</span> {formData.currency} {formData.rewardValue.toLocaleString()}</p>
                <p><span className="font-semibold">Publish Date:</span> {formData.publishDate || "—"}</p>
                <p><span className="font-semibold">Mode:</span> {mode === "edit" ? "Updating existing nomination" : "Creating new draft"}</p>
              </div>
            </div>
              </div>
          </div>
          )}

          <div className="pt-2 flex items-center justify-between gap-3 border-t border-fuchsia-100">
            <div className="pt-3 text-xs text-slate-500">
              Step {currentStep + 1} of {AWARD_FORM_STEPS.length}: {AWARD_FORM_STEPS[currentStep].label}
            </div>

            <div className="pt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={goPrevStep}
                disabled={currentStep === 0}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>

            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50">Cancel</button>

              {currentStep < AWARD_FORM_STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={goNextStep}
                  className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-300/40 hover:opacity-95"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="rounded-lg bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-300/40 hover:opacity-95"
                >
                  {mode === "edit" ? "Save Changes" : "Create Draft"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
