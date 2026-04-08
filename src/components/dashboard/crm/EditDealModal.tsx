"use client"

import { useState, useEffect } from "react"
import { X, Handshake, Phone, Mail, MapPin, Building2, DollarSign, Calendar, Target, TrendingUp, Users } from "lucide-react"

interface Deal {
  id: number
  dealName: string
  companyName: string
  contactPerson: string
  email: string
  phone: string
  value: string
  stage: string
  probability: string
  expectedCloseDate: string
  assignedTo: string
  products: string
  source: string
  location: string
  description: string
}

interface EditDealModalProps {
  isOpen: boolean
  onClose: () => void
  deal: Deal | null
  onUpdate: (updatedDeal: Deal) => void
}

const STEPS = ["Deal Info", "Contact", "Pipeline"]

export function EditDealModal({ isOpen, onClose, deal, onUpdate }: EditDealModalProps) {
  const [step, setStep] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    dealName: "",
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    value: "",
    stage: "discovery",
    probability: "25",
    expectedCloseDate: "",
    assignedTo: "",
    products: "",
    source: "",
    location: "",
    description: ""
  })

  const stages = ["discovery", "qualified", "proposal", "negotiation", "closed-won", "closed-lost"]
  const sources = ["Website", "LinkedIn", "Referral", "Cold Email", "Conference", "Partner", "Existing Client"]
  const assignees = ["Alex Johnson", "Emma Davis", "Chris Wilson", "Sarah Brown", "Mike Wilson"]

  useEffect(() => {
    if (deal) {
      setFormData({
        dealName: deal.dealName,
        companyName: deal.companyName,
        contactPerson: deal.contactPerson,
        email: deal.email,
        phone: deal.phone,
        value: deal.value,
        stage: deal.stage,
        probability: deal.probability,
        expectedCloseDate: deal.expectedCloseDate,
        assignedTo: deal.assignedTo,
        products: deal.products,
        source: deal.source,
        location: deal.location,
        description: deal.description
      })
    }
  }, [deal])

  useEffect(() => {
    setMounted(true)
  }, [])

  const set = (field: string, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }))

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case 'discovery': return 'Discovery'
      case 'qualified': return 'Qualified'
      case 'proposal': return 'Proposal'
      case 'negotiation': return 'Negotiation'
      case 'closed-won': return 'Closed Won'
      case 'closed-lost': return 'Closed Lost'
      default: return stage
    }
  }

  const handleSubmit = () => {
    if (!deal) return

    const updatedDeal: Deal = {
      ...deal,
      dealName: formData.dealName,
      companyName: formData.companyName,
      contactPerson: formData.contactPerson,
      email: formData.email,
      phone: formData.phone,
      value: formData.value,
      stage: formData.stage,
      probability: formData.probability,
      expectedCloseDate: formData.expectedCloseDate,
      assignedTo: formData.assignedTo,
      products: formData.products,
      source: formData.source,
      location: formData.location,
      description: formData.description
    }

    onUpdate(updatedDeal)
    setStep(0)
    onClose()
  }

  if (!isOpen || !deal) return null

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
              <Handshake className="w-4 h-4 text-green-700" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 leading-tight">Edit Deal</h2>
              <p className="text-xs text-slate-400 leading-tight">Update deal information</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Step tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50 text-xs font-medium">
          {STEPS.map((label, i) => (
            <button
              key={label}
              onClick={() => setStep(i)}
              className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
                i === step
                  ? "border-green-600 text-green-700 bg-white"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">

          {/* Step 0 — Deal info */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Deal name" required>
                  <input value={formData.dealName} onChange={e => set("dealName", e.target.value)}
                    placeholder="e.g. Acme Corp — Enterprise" className={inputCls} />
                </Field>
                <Field label="Company name" required>
                  <input value={formData.companyName} onChange={e => set("companyName", e.target.value)}
                    placeholder="e.g. Acme Corporation" className={inputCls} />
                </Field>
                <Field label="Deal value" required icon={<DollarSign className="w-3.5 h-3.5" />}>
                  <input type="number" value={formData.value} onChange={e => set("value", e.target.value)}
                    placeholder="0.00" className={`${inputCls} pl-8`} />
                </Field>
                <Field label="Expected close date" required icon={<Calendar className="w-3.5 h-3.5" />}>
                  <input type="date" value={formData.expectedCloseDate} onChange={e => set("expectedCloseDate", e.target.value)}
                    className={inputCls} />
                </Field>
              </div>
              <Field label="Description">
                <textarea value={formData.description} onChange={e => set("description", e.target.value)}
                  placeholder="Describe the deal scope and key objectives..."
                  rows={3} className={`${inputCls} !h-auto resize-none py-2 leading-relaxed`} />
              </Field>
            </div>
          )}

          {/* Step 1 — Contact */}
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Contact person" required>
                <input value={formData.contactPerson} onChange={e => set("contactPerson", e.target.value)}
                  placeholder="Full name" className={inputCls} />
              </Field>
              <Field label="Email address" required icon={<Mail className="w-3.5 h-3.5" />}>
                <input type="email" value={formData.email} onChange={e => set("email", e.target.value)}
                  placeholder="name@company.com" className={inputCls} />
              </Field>
              <Field label="Phone number" required icon={<Phone className="w-3.5 h-3.5" />}>
                <input type="tel" value={formData.phone} onChange={e => set("phone", e.target.value)}
                  placeholder="+1 (555) 000-0000" className={inputCls} />
              </Field>
              <Field label="Location" icon={<MapPin className="w-3.5 h-3.5" />}>
                <input value={formData.location} onChange={e => set("location", e.target.value)}
                  placeholder="City, Country" className={inputCls} />
              </Field>
            </div>
          )}

          {/* Step 2 — Pipeline */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Deal stage" required>
                  <select value={formData.stage} onChange={e => set("stage", e.target.value)} className={inputCls}>
                    {stages.map(s => <option key={s} value={s}>{getStageLabel(s)}</option>)}
                  </select>
                </Field>
                <Field label="Probability (%)" required icon={<TrendingUp className="w-3.5 h-3.5" />}>
                  <input type="number" min="0" max="100" value={formData.probability}
                    onChange={e => set("probability", e.target.value)} placeholder="25" className={inputCls} />
                </Field>
                <Field label="Deal source" required>
                  <select value={formData.source} onChange={e => set("source", e.target.value)} className={inputCls}>
                    <option value="">Select source</option>
                    {sources.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Assigned to" required>
                  <select value={formData.assignedTo} onChange={e => set("assignedTo", e.target.value)} className={inputCls}>
                    <option value="">Select assignee</option>
                    {assignees.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Products / services">
                <textarea value={formData.products} onChange={e => set("products", e.target.value)}
                  placeholder="List products or services involved..."
                  rows={2} className={`${inputCls} !h-auto resize-none py-2 leading-relaxed`} />
              </Field>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-slate-50">
          <p className="text-xs text-slate-400">Step {step + 1} of {STEPS.length}</p>
          <div className="flex gap-2">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)}
                className="h-8 px-4 rounded-lg border border-slate-200 text-xs text-slate-500 hover:bg-white hover:text-slate-700 transition-colors">
                Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(s => s + 1)}
                className="h-8 px-4 rounded-lg bg-green-700 hover:bg-green-800 text-xs font-medium text-white transition-colors">
                Next
              </button>
            ) : (
              <button onClick={handleSubmit}
                className="h-8 px-4 rounded-lg bg-green-700 hover:bg-green-800 text-xs font-medium text-white transition-colors">
                Update Deal
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

// Helpers
const inputCls = "w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all"

function Field({ label, required, icon, children }: {
  label: string; required?: boolean; icon?: React.ReactNode; children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
        {icon && <span className="text-slate-400">{icon}</span>}
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">{children}</div>
    </div>
  )
}
