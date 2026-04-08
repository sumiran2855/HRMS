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
  createdDate: string
  lastUpdated: string
}

interface ViewDealModalProps {
  isOpen: boolean
  onClose: () => void
  deal: Deal | null
}

const STEPS = ["Deal Info", "Contact", "Pipeline"]

export function ViewDealModal({ isOpen, onClose, deal }: ViewDealModalProps) {
  const [step, setStep] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'discovery': return 'bg-slate-50 text-slate-700 border border-slate-100'
      case 'qualified': return 'bg-blue-50 text-blue-700 border border-blue-100'
      case 'proposal': return 'bg-violet-50 text-violet-700 border border-violet-100'
      case 'negotiation': return 'bg-orange-50 text-orange-700 border border-orange-100'
      case 'closed-won': return 'bg-emerald-50 text-emerald-700 border border-emerald-100'
      case 'closed-lost': return 'bg-red-50 text-red-700 border border-red-100'
      default: return 'bg-slate-50 text-slate-700 border border-slate-100'
    }
  }

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

  const getProbabilityColor = (probability: string) => {
    const prob = parseInt(probability)
    if (prob >= 75) return 'text-emerald-600'
    if (prob >= 50) return 'text-blue-600'
    if (prob >= 25) return 'text-amber-600'
    return 'text-red-600'
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
              <h2 className="text-sm font-semibold text-slate-900 leading-tight">View Deal Details</h2>
              <p className="text-xs text-slate-400 leading-tight">Complete deal information and pipeline status</p>
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

          {/* Step 0 — Deal Info */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    Deal Name
                  </label>
                  <div className="relative">
                    <div className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 py-2 outline-none">
                      {deal.dealName}
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    Company Name
                  </label>
                  <div className="relative">
                    <div className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 py-2 outline-none">
                      {deal.companyName}
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    Deal Value
                  </label>
                  <div className="relative">
                    <div className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 py-2 outline-none">
                      ${deal.value}
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Expected Close Date
                  </label>
                  <div className="relative">
                    <div className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 py-2 outline-none">
                      {deal.expectedCloseDate}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Target className="w-3.5 h-3.5 text-slate-400" />
                  Deal Description
                </label>
                <div className="relative">
                  <div className="w-full min-h-[80px] rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 py-2 outline-none resize-none leading-relaxed">
                    {deal.description || 'No description provided'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1 — Contact */}
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  Contact Person
                </label>
                <div className="relative">
                  <div className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 py-2 outline-none">
                    {deal.contactPerson}
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  Email Address
                </label>
                <div className="relative">
                  <div className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 py-2 outline-none">
                    {deal.email}
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  Phone Number
                </label>
                <div className="relative">
                  <div className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 py-2 outline-none">
                    {deal.phone}
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Location
                </label>
                <div className="relative">
                  <div className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 py-2 outline-none">
                    {deal.location || 'Not specified'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Pipeline */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Target className="w-3.5 h-3.5 text-slate-400" />
                    Deal Stage
                  </label>
                  <div className="relative">
                    <div className={`w-full h-9 rounded-lg border border-slate-200 text-sm px-3 py-2 outline-none ${getStageColor(deal.stage)}`}>
                      {getStageLabel(deal.stage)}
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                    Probability
                  </label>
                  <div className="relative">
                    <div className={`w-full h-9 rounded-lg border border-slate-200 text-sm px-3 py-2 outline-none ${getProbabilityColor(deal.probability)}`}>
                      {deal.probability}%
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Target className="w-3.5 h-3.5 text-slate-400" />
                    Deal Source
                  </label>
                  <div className="relative">
                    <div className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 py-2 outline-none">
                      {deal.source}
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    Assigned To
                  </label>
                  <div className="relative">
                    <div className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 py-2 outline-none">
                      {deal.assignedTo}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Target className="w-3.5 h-3.5 text-slate-400" />
                  Products/Services
                </label>
                <div className="relative">
                  <div className="w-full min-h-[80px] rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 py-2 outline-none resize-none leading-relaxed">
                    {deal.products || 'No products specified'}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Created Date
                  </label>
                  <div className="relative">
                    <div className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 py-2 outline-none">
                      {deal.createdDate}
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Last Updated
                  </label>
                  <div className="relative">
                    <div className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 py-2 outline-none">
                      {deal.lastUpdated}
                    </div>
                  </div>
                </div>
              </div>
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
              <button onClick={onClose}
                className="h-8 px-4 rounded-lg bg-green-700 hover:bg-green-800 text-xs font-medium text-white transition-colors">
                Close
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
