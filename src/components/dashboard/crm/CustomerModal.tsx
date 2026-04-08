"use client"

import { useState } from "react"
import { X, Users, Phone, Mail, MapPin, Building2, DollarSign, Calendar, UserPlus, MessageSquare } from "lucide-react"

interface CustomerModalProps {
  isOpen: boolean
  onClose: () => void
  mode?: "add" | "contact"
}

const INDUSTRIES = ["Fintech", "Healthcare", "E-commerce", "SaaS", "Education", "Manufacturing", "Real Estate", "Logistics", "Other"]
const COMPANY_SIZES = ["Startup (1-10)", "SME (11-50)", "Medium (51-200)", "Enterprise (200+)"]
const CONTACT_TYPES = ["General Inquiry", "Support", "Sales", "Partnership", "Feedback", "Complaint"]
const PRIORITIES = ["Low", "Medium", "High", "Urgent"]
const STATUSES = ["Active", "Inactive", "Prospect", "Churned"]

const INITIAL_CUSTOMER_FORM = {
  companyName: "", industry: "", companySize: "", website: "", location: "",
  contactPerson: "", email: "", phone: "", designation: "", annualRevenue: "",
  status: "Active", notes: ""
}

const INITIAL_CONTACT_FORM = {
  customerId: "", contactType: "", subject: "", message: "", priority: "Medium",
  preferredContact: "email", followUpDate: "", assignedTo: ""
}

const STEPS = {
  add: ["Company Info", "Contact Details", "Business Details"],
  contact: ["Customer Selection", "Contact Details", "Follow-up"]
}

export function CustomerModal({ isOpen, onClose, mode = "add" }: CustomerModalProps) {
  const [step, setStep] = useState(0)
  const [customerForm, setCustomerForm] = useState(INITIAL_CUSTOMER_FORM)
  const [contactForm, setContactForm] = useState(INITIAL_CONTACT_FORM)

  const setCustomer = (field: string, value: string) =>
    setCustomerForm(prev => ({ ...prev, [field]: value }))

  const setContact = (field: string, value: string) =>
    setContactForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = () => {
    if (mode === "add") {
      console.log("New customer:", customerForm)
      setCustomerForm(INITIAL_CUSTOMER_FORM)
    } else {
      console.log("Customer contact:", contactForm)
      setContactForm(INITIAL_CONTACT_FORM)
    }
    setStep(0)
    onClose()
  }

  if (!isOpen) return null

  const currentSteps = STEPS[mode]
  const isLastStep = step === currentSteps.length - 1

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 ${mode === "add" ? "bg-blue-50" : "bg-purple-50"} rounded-lg flex items-center justify-center shrink-0`}>
              {mode === "add" ? (
                <UserPlus className="w-4 h-4 text-blue-700" />
              ) : (
                <MessageSquare className="w-4 h-4 text-purple-700" />
              )}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 leading-tight">
                {mode === "add" ? "Add new customer" : "Contact customer"}
              </h2>
              <p className="text-xs text-slate-400 leading-tight">
                {mode === "add" ? "Fill in the details to create a new customer" : "Reach out to an existing customer"}
              </p>
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
          {currentSteps.map((label, i) => (
            <button
              key={label}
              onClick={() => setStep(i)}
              className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
                i === step
                  ? `border-${mode === "add" ? "blue" : "purple"}-600 text-${mode === "add" ? "blue" : "purple"}-700 bg-white`
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {mode === "add" ? (
            // Add Customer Steps
            <>
              {/* Step 0 - Company Info */}
              {step === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Company Name" required icon={<Building2 className="w-3.5 h-3.5" />}>
                      <input value={customerForm.companyName} onChange={e => setCustomer("companyName", e.target.value)}
                        placeholder="e.g. Acme Corporation" className={inputCls} />
                    </Field>
                    <Field label="Industry" required>
                      <select value={customerForm.industry} onChange={e => setCustomer("industry", e.target.value)} className={inputCls}>
                        <option value="">Select industry</option>
                        {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                      </select>
                    </Field>
                    <Field label="Company Size" required>
                      <select value={customerForm.companySize} onChange={e => setCustomer("companySize", e.target.value)} className={inputCls}>
                        <option value="">Select size</option>
                        {COMPANY_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>
                    <Field label="Website" icon={<Building2 className="w-3.5 h-3.5" />}>
                      <input type="url" value={customerForm.website} onChange={e => setCustomer("website", e.target.value)}
                        placeholder="https://company.com" className={inputCls} />
                    </Field>
                    <Field label="Location" required icon={<MapPin className="w-3.5 h-3.5" />}>
                      <input value={customerForm.location} onChange={e => setCustomer("location", e.target.value)}
                        placeholder="New York, USA" className={inputCls} />
                    </Field>
                  </div>
                </div>
              )}

              {/* Step 1 - Contact Details */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Contact Person" required icon={<Users className="w-3.5 h-3.5" />}>
                      <input value={customerForm.contactPerson} onChange={e => setCustomer("contactPerson", e.target.value)}
                        placeholder="John Doe" className={inputCls} />
                    </Field>
                    <Field label="Designation" required>
                      <input value={customerForm.designation} onChange={e => setCustomer("designation", e.target.value)}
                        placeholder="e.g. CEO, Manager" className={inputCls} />
                    </Field>
                    <Field label="Email Address" required icon={<Mail className="w-3.5 h-3.5" />}>
                      <input type="email" value={customerForm.email} onChange={e => setCustomer("email", e.target.value)}
                        placeholder="john@company.com" className={inputCls} />
                    </Field>
                    <Field label="Phone Number" required icon={<Phone className="w-3.5 h-3.5" />}>
                      <input type="tel" value={customerForm.phone} onChange={e => setCustomer("phone", e.target.value)}
                        placeholder="+1 (555) 000-0000" className={inputCls} />
                    </Field>
                  </div>
                </div>
              )}

              {/* Step 2 - Business Details */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Annual Revenue" icon={<DollarSign className="w-3.5 h-3.5" />}>
                      <input type="number" value={customerForm.annualRevenue} onChange={e => setCustomer("annualRevenue", e.target.value)}
                        placeholder="0.00" className={inputCls} />
                    </Field>
                    <Field label="Status" required>
                      <select value={customerForm.status} onChange={e => setCustomer("status", e.target.value)} className={inputCls}>
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field label="Notes">
                    <textarea value={customerForm.notes} onChange={e => setCustomer("notes", e.target.value)}
                      placeholder="Add any additional notes about this customer..."
                      rows={3} className={`${inputCls} !h-auto resize-none py-2 leading-relaxed`} />
                  </Field>
                </div>
              )}
            </>
          ) : (
            // Contact Customer Steps
            <>
              {/* Step 0 - Customer Selection */}
              {step === 0 && (
                <div className="space-y-4">
                  <Field label="Search Customer" required icon={<Users className="w-3.5 h-3.5" />}>
                    <input value={contactForm.customerId} onChange={e => setContact("customerId", e.target.value)}
                      placeholder="Type customer name or ID..." className={inputCls} />
                  </Field>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-600 mb-2">Recent Customers:</p>
                    <div className="space-y-2">
                      {["Acme Corporation", "Tech Solutions Inc", "Global Enterprises"].map((customer, index) => (
                        <button
                          key={index}
                          onClick={() => setContact("customerId", customer)}
                          className="w-full text-left p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                        >
                          <p className="text-sm font-medium text-slate-900">{customer}</p>
                          <p className="text-xs text-slate-500">Last contact: {index + 1} days ago</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1 - Contact Details */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Contact Type" required>
                      <select value={contactForm.contactType} onChange={e => setContact("contactType", e.target.value)} className={inputCls}>
                        <option value="">Select type</option>
                        {CONTACT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </Field>
                    <Field label="Priority" required>
                      <select value={contactForm.priority} onChange={e => setContact("priority", e.target.value)} className={inputCls}>
                        {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </Field>
                    <Field label="Preferred Contact" required>
                      <select value={contactForm.preferredContact} onChange={e => setContact("preferredContact", e.target.value)} className={inputCls}>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="both">Both</option>
                      </select>
                    </Field>
                    <Field label="Follow-up Date" icon={<Calendar className="w-3.5 h-3.5" />}>
                      <input type="date" value={contactForm.followUpDate} onChange={e => setContact("followUpDate", e.target.value)}
                        className={inputCls} />
                    </Field>
                  </div>
                  <Field label="Subject" required>
                    <input value={contactForm.subject} onChange={e => setContact("subject", e.target.value)}
                      placeholder="Brief subject of your contact..." className={inputCls} />
                  </Field>
                  <Field label="Message" required>
                    <textarea value={contactForm.message} onChange={e => setContact("message", e.target.value)}
                      placeholder="Detailed message or notes..."
                      rows={4} className={`${inputCls} !h-auto resize-none py-2 leading-relaxed`} />
                  </Field>
                </div>
              )}

              {/* Step 2 - Follow-up */}
              {step === 2 && (
                <div className="space-y-4">
                  <Field label="Assigned To" required icon={<Users className="w-3.5 h-3.5" />}>
                    <select value={contactForm.assignedTo} onChange={e => setContact("assignedTo", e.target.value)} className={inputCls}>
                      <option value="">Select team member</option>
                      <option value="Alex Johnson">Alex Johnson</option>
                      <option value="Emma Davis">Emma Davis</option>
                      <option value="Chris Wilson">Chris Wilson</option>
                      <option value="Sarah Brown">Sarah Brown</option>
                    </select>
                  </Field>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">Contact Summary</h4>
                    <div className="space-y-1">
                      <p className="text-xs text-blue-800"><strong>Customer:</strong> {contactForm.customerId || "Not selected"}</p>
                      <p className="text-xs text-blue-800"><strong>Type:</strong> {contactForm.contactType || "Not selected"}</p>
                      <p className="text-xs text-blue-800"><strong>Priority:</strong> {contactForm.priority}</p>
                      <p className="text-xs text-blue-800"><strong>Subject:</strong> {contactForm.subject || "Not provided"}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-slate-50">
          <p className="text-xs text-slate-400">Step {step + 1} of {currentSteps.length}</p>
          <div className="flex gap-2">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)}
                className="h-8 px-4 rounded-lg border border-slate-200 text-xs text-slate-500 hover:bg-white hover:text-slate-700 transition-colors">
                Back
              </button>
            )}
            <button
              onClick={isLastStep ? handleSubmit : () => setStep(s => s + 1)}
              className={`h-8 px-4 rounded-lg text-xs font-medium text-white transition-colors ${
                mode === "add"
                  ? "bg-blue-700 hover:bg-blue-800"
                  : "bg-purple-700 hover:bg-purple-800"
              }`}
            >
              {isLastStep ? (mode === "add" ? "Add Customer" : "Send Contact") : "Next"}
            </button>
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
