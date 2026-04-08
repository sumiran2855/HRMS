"use client"

import { useState } from "react"
import { X, Users, Phone, Mail, MapPin, Building2, DollarSign, Briefcase } from "lucide-react"

interface AddLeadModalProps {
  isOpen: boolean
  onClose: () => void
}

const INDUSTRIES = ["Fintech", "Healthcare", "E-commerce", "SaaS", "Education", "Manufacturing", "Real Estate", "Logistics", "Other"]
const COMPANY_SIZES = ["Startup (1-10)", "SME (11-50)", "Medium (51-200)", "Enterprise (200+)"]
const PROJECT_TYPES = ["Mobile App", "Web App", "AI/ML", "SaaS", "Maintenance", "Consulting", "Other"]
const TECHNOLOGIES = ["React Native", "Flutter", "React", "Vue", "Angular", "Node.js", "Python", "Java", "No preference"]
const BUDGET_RANGES = ["<$5k", "$5k-$10k", "$10k-$25k", "$25k-$50k", "$50k-$100k", ">$100k"]
const TIMELINES = ["Urgent (<1 month)", "1-3 months", "3-6 months", "6+ months", "Flexible"]
const ENGAGEMENT_MODELS = ["Fixed cost", "Hourly", "Dedicated team"]
const SOURCES = ["Website", "LinkedIn", "Upwork", "Referral", "Cold Email", "Conference", "Social Media", "Advertisement"]
const STATUSES = ["new", "contacted", "qualified", "proposal", "negotiation"]
const ASSIGNEES = ["Alex Johnson", "Emma Davis", "Chris Wilson", "Sarah Brown", "Mike Wilson"]

const INITIAL_FORM = {
  fullName: "", email: "", phone: "", companyName: "", designation: "",
  industry: "", companySize: "", location: "", website: "", linkedinProfile: "",
  projectType: "", requirementDescription: "", technologyPreference: "", useCase: "",
  budgetRange: "", timeline: "", engagementModel: "",
  source: "", campaign: "", assignedTo: ""
}

const STEPS = ["Basic Contact", "Company Context", "Requirements & Budget"]

export function AddLeadModal({ isOpen, onClose }: AddLeadModalProps) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(INITIAL_FORM)

  const set = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = () => {
    console.log("New lead:", form)
    setForm(INITIAL_FORM)
    setStep(0)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-blue-700" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 leading-tight">Add new lead</h2>
              <p className="text-xs text-slate-400 leading-tight">Fill in the details to create a new lead</p>
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
                  ? "border-blue-600 text-blue-700 bg-white"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">

          {/* Step 0 - Basic Contact Information */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" required icon={<Users className="w-3.5 h-3.5" />}>
                  <input value={form.fullName} onChange={e => set("fullName", e.target.value)}
                    placeholder="John Doe" className={inputCls} />
                </Field>
                <Field label="Email Address" required icon={<Mail className="w-3.5 h-3.5" />}>
                  <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
                    placeholder="john@company.com" className={inputCls} />
                </Field>
                <Field label="Phone / WhatsApp" required icon={<Phone className="w-3.5 h-3.5" />}>
                  <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
                    placeholder="+1 (555) 000-0000" className={inputCls} />
                </Field>
                <Field label="Company Name" required icon={<Building2 className="w-3.5 h-3.5" />}>
                  <input value={form.companyName} onChange={e => set("companyName", e.target.value)}
                    placeholder="Acme Corporation" className={inputCls} />
                </Field>
                <Field label="Designation / Role" required icon={<Briefcase className="w-3.5 h-3.5" />}>
                  <input value={form.designation} onChange={e => set("designation", e.target.value)}
                    placeholder="CTO, Founder, Manager" className={inputCls} />
                </Field>
              </div>
            </div>
          )}

          {/* Step 1 - Company & Business Context */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Industry" required>
                  <select value={form.industry} onChange={e => set("industry", e.target.value)} className={inputCls}>
                    <option value="">Select industry</option>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </Field>
                <Field label="Company Size" required>
                  <select value={form.companySize} onChange={e => set("companySize", e.target.value)} className={inputCls}>
                    <option value="">Select size</option>
                    {COMPANY_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Location" required icon={<MapPin className="w-3.5 h-3.5" />}>
                  <input value={form.location} onChange={e => set("location", e.target.value)}
                    placeholder="New York, USA" className={inputCls} />
                </Field>
                <Field label="Website">
                  <input type="url" value={form.website} onChange={e => set("website", e.target.value)}
                    placeholder="https://company.com" className={inputCls} />
                </Field>
                <Field label="LinkedIn Profile">
                  <input type="url" value={form.linkedinProfile} onChange={e => set("linkedinProfile", e.target.value)}
                    placeholder="https://linkedin.com/in/johndoe" className={inputCls} />
                </Field>
              </div>
            </div>
          )}

          {/* Step 2 - Requirements & Budget */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Project Type" required>
                  <select value={form.projectType} onChange={e => set("projectType", e.target.value)} className={inputCls}>
                    <option value="">Select type</option>
                    {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Technology Preference">
                  <select value={form.technologyPreference} onChange={e => set("technologyPreference", e.target.value)} className={inputCls}>
                    <option value="">Select technology</option>
                    {TECHNOLOGIES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Budget Range" required icon={<DollarSign className="w-3.5 h-3.5" />}>
                  <select value={form.budgetRange} onChange={e => set("budgetRange", e.target.value)} className={inputCls}>
                    <option value="">Select budget</option>
                    {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </Field>
                <Field label="Timeline" required>
                  <select value={form.timeline} onChange={e => set("timeline", e.target.value)} className={inputCls}>
                    <option value="">Select timeline</option>
                    {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Engagement Model" required>
                  <select value={form.engagementModel} onChange={e => set("engagementModel", e.target.value)} className={inputCls}>
                    <option value="">Select model</option>
                    {ENGAGEMENT_MODELS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </Field>
                <Field label="Lead Source" required>
                  <select value={form.source} onChange={e => set("source", e.target.value)} className={inputCls}>
                    <option value="">Select source</option>
                    {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Assigned To" required icon={<Users className="w-3.5 h-3.5" />}>
                  <select value={form.assignedTo} onChange={e => set("assignedTo", e.target.value)} className={inputCls}>
                    <option value="">Select assignee</option>
                    {ASSIGNEES.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </Field>
                <Field label="Campaign / Channel">
                  <input value={form.campaign} onChange={e => set("campaign", e.target.value)}
                    placeholder="e.g. Google Ads Q1 Campaign" className={inputCls} />
                </Field>
              </div>
              <Field label="Requirement Description" required>
                <textarea value={form.requirementDescription} onChange={e => set("requirementDescription", e.target.value)}
                  placeholder="Describe the project requirements in detail..."
                  rows={3} className={`${inputCls} !h-auto resize-none py-2 leading-relaxed`} />
              </Field>
              <Field label="Use Case / Problem Statement">
                <textarea value={form.useCase} onChange={e => set("useCase", e.target.value)}
                  placeholder="Example: Need a React Native app for school fee management with payment gateway..."
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
                className="h-8 px-4 rounded-lg bg-blue-700 hover:bg-blue-800 text-xs font-medium text-white transition-colors">
                Next
              </button>
            ) : (
              <button onClick={handleSubmit}
                className="h-8 px-4 rounded-lg bg-blue-700 hover:bg-blue-800 text-xs font-medium text-white transition-colors">
                Add lead
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

// Helpers
const inputCls = "w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"

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
