"use client"

import { useState } from "react"
import { X, Save, Building2, Mail, DollarSign, Calendar, Phone, MapPin, Globe, Users, FileText, CheckCircle, Star, Briefcase, UserCheck, Clock, TrendingUp } from "lucide-react"

interface EditClientModalProps {
  isOpen: boolean
  onClose: () => void
  client: any
}

export function EditClientModal({ isOpen, onClose, client }: EditClientModalProps) {
  const [formData, setFormData] = useState({
    id: client?.id ?? "",
    companyName: client?.companyName ?? "",
    industry: client?.industry ?? "",
    contactPerson: client?.contactPerson ?? "",
    email: client?.email ?? "",
    phone: client?.phone ?? "",
    address: client?.address ?? "",
    website: client?.website ?? "",
    contractType: client?.contractType ?? "",
    contractValue: client?.contractValue ?? "",
    startDate: client?.startDate ?? "",
    endDate: client?.endDate ?? "",
    status: client?.status ?? "active",
    employees: client?.employees ?? "",
    projects: client?.projects ?? 0,
    rating: client?.rating ?? 0,
    paymentTerms: client?.paymentTerms ?? "",
    billingCycle: client?.billingCycle ?? "",
    accountManager: client?.accountManager ?? "",
    lastContactDate: client?.lastContactDate ?? "",
    nextFollowUp: client?.nextFollowUp ?? "",
    notes: client?.notes ?? "",
    services: client?.services ?? [],
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen || !client) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s: string) => s !== service)
        : [...prev.services, service]
    }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.companyName.trim()) e.companyName = "Company name is required"
    if (!formData.contactPerson.trim()) e.contactPerson = "Contact person is required"
    if (!formData.email.trim()) e.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Enter a valid email"
    if (!formData.phone.trim()) e.phone = "Phone number is required"
    if (!formData.address.trim()) e.address = "Address is required"
    if (!formData.industry) e.industry = "Industry is required"
    if (!formData.contractType) e.contractType = "Contract type is required"
    if (!formData.contractValue) e.contractValue = "Contract value is required"
    if (!formData.startDate) e.startDate = "Start date is required"
    if (!formData.endDate) e.endDate = "End date is required"
    if (!formData.paymentTerms) e.paymentTerms = "Payment terms are required"
    if (!formData.billingCycle) e.billingCycle = "Billing cycle is required"
    if (!formData.accountManager.trim()) e.accountManager = "Account manager is required"
    if (!formData.rating || formData.rating < 0 || formData.rating > 5) e.rating = "Rating must be between 0 and 5"
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
      alert("Failed to update client. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const industries = [
    "Technology", "Healthcare", "Finance", "Retail", "Education", "Logistics",
    "Manufacturing", "Consulting", "Media", "Agriculture", "Transportation", "Construction"
  ]

  const contractTypes = ["Long-term", "Annual", "Project-based", "Retainer", "Monthly"]
  const paymentTerms = ["Net 15", "Net 30", "Net 45", "Net 60", "COD"]
  const billingCycles = ["Monthly", "Quarterly", "Annually", "Milestone"]
  const availableServices = [
    "Software Development", "IT Consulting", "Cloud Services", "Security Audit",
    "Data Analytics", "EMR Implementation", "Healthcare IT", "Fintech Development",
    "POS Systems", "Inventory Management", "E-commerce", "LMS Development",
    "Training Programs", "Supply Chain Software", "Fleet Management", "Support"
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&display=swap');

        .edit-client-modal-overlay * {
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
        }

        .edit-client-modal-fade {
          animation: editClientModalFadeIn 0.2s ease;
        }

        @keyframes editClientModalFadeIn {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .section-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .section-card-header {
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .section-card-body {
          padding: 16px;
        }

        .section-card-body.two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .edit-client-field-group {
          margin-bottom: 16px;
        }

        .edit-client-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .edit-client-input-wrap {
          position: relative;
        }

        .edit-client-input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: #94a3b8;
          z-index: 1;
        }

        .edit-client-input {
          width: 100%;
          height: 44px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          padding: 0 14px 0 38px;
          font-size: 13.5px;
          color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }

        .edit-client-input.with-icon {
          padding-left: 38px;
        }

        .edit-client-input:focus {
          border-color: #334155;
          box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.1);
        }

        .edit-client-input.error {
          border-color: #ef4444;
          background: #fff5f5;
        }

        .edit-client-select {
          width: 100%;
          height: 44px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 14px center;
          padding: 0 38px 0 14px;
          font-size: 13.5px;
          color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          cursor: pointer;
          transition: border-color 0.15s, box-shadow 0.15s;
          appearance: none;
        }

        .edit-client-select.with-icon {
          padding-left: 38px;
        }

        .edit-client-select:focus {
          border-color: #334155;
          box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.1);
        }

        .edit-client-textarea {
          width: 100%;
          min-height: 100px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          padding: 12px 14px;
          font-size: 13.5px;
          color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          resize: vertical;
        }

        .edit-client-textarea:focus {
          border-color: #334155;
          box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.1);
        }

        .edit-client-error-msg {
          color: #dc2626;
          font-size: 11.5px;
          font-weight: 500;
          margin-top: 4px;
        }

        .service-chip {
          display: inline-flex;
          align-items: center;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
          margin-right: 8px;
          margin-bottom: 8px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          color: #475569;
        }

        .service-chip:hover {
          background: #f8fafc;
        }

        .service-chip.selected {
          background: #3b82f6;
          color: #fff;
          border-color: #3b82f6;
        }

        .edit-client-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'DM Sans', sans-serif;
        }

        .edit-client-btn-primary {
          background: #3b82f6;
          color: #fff;
        }

        .edit-client-btn-primary:hover:not(:disabled) {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .edit-client-btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .edit-client-btn-secondary {
          background: transparent;
          color: #64748b;
          border: 1.5px solid #e2e8f0;
        }

        .edit-client-btn-secondary:hover {
          background: #f8fafc;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .section-card-body.two-col {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div
        className="edit-client-modal-overlay"
        style={{
          position: "fixed", inset: 0,
          background: "rgba(15, 23, 42, 0.55)",
          backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 50, padding: 16,
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="edit-client-modal-fade"
          style={{
            background: "#fff",
            borderRadius: 16,
            width: "100%",
            maxWidth: 900,
            maxHeight: "92vh",
            overflowY: "auto",
            boxShadow: "0 24px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              position: "sticky", top: 0, zIndex: 10,
              background: "#fff",
              borderBottom: "1px solid #e2e8f0",
              padding: "16px 24px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              borderRadius: "16px 16px 0 0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "linear-gradient(135deg, #10b981, #059669)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Building2 style={{ width: 17, height: 17, color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Edit Client</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 1 }}>
                  Update client information and contract details
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 34, height: 34, borderRadius: 8,
                border: "1.5px solid #e2e8f0",
                background: "transparent", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <X style={{ width: 16, height: 16, color: "#64748b" }} />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} style={{ padding: "24px", flex: 1 }}>
            {/* Basic Information */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Building2 style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Basic Information
                </span>
              </div>
              <div className="section-card-body two-col">
                {/* Company Name */}
                <div className="edit-client-field-group">
                  <label className="edit-client-label">Company Name</label>
                  <div className="edit-client-input-wrap">
                    <Building2 className="edit-client-input-icon" />
                    <input
                      className={`edit-client-input with-icon${errors.companyName ? " error" : ""}`}
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter company name"
                    />
                  </div>
                  {errors.companyName && <div className="edit-client-error-msg">{errors.companyName}</div>}
                </div>

                {/* Industry */}
                <div className="edit-client-field-group">
                  <label className="edit-client-label">Industry</label>
                  <div className="edit-client-input-wrap">
                    <Globe className="edit-client-input-icon" />
                    <select
                      className="edit-client-select with-icon"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                    >
                      <option value="">Select Industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  {errors.industry && <div className="edit-client-error-msg">{errors.industry}</div>}
                </div>

                {/* Contact Person */}
                <div className="edit-client-field-group">
                  <label className="edit-client-label">Contact Person</label>
                  <div className="edit-client-input-wrap">
                    <Users className="edit-client-input-icon" />
                    <input
                      className={`edit-client-input with-icon${errors.contactPerson ? " error" : ""}`}
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.contactPerson && <div className="edit-client-error-msg">{errors.contactPerson}</div>}
                </div>

                {/* Email */}
                <div className="edit-client-field-group">
                  <label className="edit-client-label">Email Address</label>
                  <div className="edit-client-input-wrap">
                    <Mail className="edit-client-input-icon" />
                    <input
                      className={`edit-client-input with-icon${errors.email ? " error" : ""}`}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contact@company.com"
                    />
                  </div>
                  {errors.email && <div className="edit-client-error-msg">{errors.email}</div>}
                </div>

                {/* Phone */}
                <div className="edit-client-field-group">
                  <label className="edit-client-label">Phone Number</label>
                  <div className="edit-client-input-wrap">
                    <Phone className="edit-client-input-icon" />
                    <input
                      className={`edit-client-input with-icon${errors.phone ? " error" : ""}`}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  {errors.phone && <div className="edit-client-error-msg">{errors.phone}</div>}
                </div>

                {/* Website */}
                <div className="edit-client-field-group">
                  <label className="edit-client-label">Website</label>
                  <div className="edit-client-input-wrap">
                    <Globe className="edit-client-input-icon" />
                    <input
                      className="edit-client-input with-icon"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="www.example.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contract Information */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <FileText style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Contract Information
                </span>
              </div>
              <div className="section-card-body two-col">
                {/* Contract Type */}
                <div className="edit-client-field-group">
                  <label className="edit-client-label">Contract Type</label>
                  <div className="edit-client-input-wrap">
                    <Briefcase className="edit-client-input-icon" />
                    <select
                      className="edit-client-select with-icon"
                      name="contractType"
                      value={formData.contractType}
                      onChange={handleChange}
                    >
                      <option value="">Select Type</option>
                      {contractTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  {errors.contractType && <div className="edit-client-error-msg">{errors.contractType}</div>}
                </div>

                {/* Contract Value */}
                <div className="edit-client-field-group">
                  <label className="edit-client-label">Contract Value (USD)</label>
                  <div className="edit-client-input-wrap">
                    <DollarSign className="edit-client-input-icon" />
                    <input
                      className={`edit-client-input with-icon${errors.contractValue ? " error" : ""}`}
                      name="contractValue"
                      type="number"
                      value={formData.contractValue}
                      onChange={handleChange}
                      placeholder="0"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                  {errors.contractValue && <div className="edit-client-error-msg">{errors.contractValue}</div>}
                </div>

                {/* Start Date */}
                <div className="edit-client-field-group">
                  <label className="edit-client-label">Start Date</label>
                  <div className="edit-client-input-wrap">
                    <Calendar className="edit-client-input-icon" />
                    <input
                      className={`edit-client-input with-icon${errors.startDate ? " error" : ""}`}
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.startDate && <div className="edit-client-error-msg">{errors.startDate}</div>}
                </div>

                {/* End Date */}
                <div className="edit-client-field-group">
                  <label className="edit-client-label">End Date</label>
                  <div className="edit-client-input-wrap">
                    <Calendar className="edit-client-input-icon" />
                    <input
                      className={`edit-client-input with-icon${errors.endDate ? " error" : ""}`}
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.endDate && <div className="edit-client-error-msg">{errors.endDate}</div>}
                </div>

                {/* Payment Terms */}
                <div className="edit-client-field-group">
                  <label className="edit-client-label">Payment Terms</label>
                  <div className="edit-client-input-wrap">
                    <Clock className="edit-client-input-icon" />
                    <select
                      className="edit-client-select with-icon"
                      name="paymentTerms"
                      value={formData.paymentTerms}
                      onChange={handleChange}
                    >
                      <option value="">Select Terms</option>
                      {paymentTerms.map((terms) => (
                        <option key={terms} value={terms}>{terms}</option>
                      ))}
                    </select>
                  </div>
                  {errors.paymentTerms && <div className="edit-client-error-msg">{errors.paymentTerms}</div>}
                </div>

                {/* Billing Cycle */}
                <div className="edit-client-field-group">
                  <label className="edit-client-label">Billing Cycle</label>
                  <div className="edit-client-input-wrap">
                    <TrendingUp className="edit-client-input-icon" />
                    <select
                      className="edit-client-select with-icon"
                      name="billingCycle"
                      value={formData.billingCycle}
                      onChange={handleChange}
                    >
                      <option value="">Select Cycle</option>
                      {billingCycles.map((cycle) => (
                        <option key={cycle} value={cycle}>{cycle}</option>
                      ))}
                    </select>
                  </div>
                  {errors.billingCycle && <div className="edit-client-error-msg">{errors.billingCycle}</div>}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <UserCheck style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Additional Information
                </span>
              </div>
              <div className="section-card-body two-col">
                {/* Address */}
                <div className="edit-client-field-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="edit-client-label">Address</label>
                  <div className="edit-client-input-wrap">
                    <MapPin className="edit-client-input-icon" />
                    <input
                      className={`edit-client-input with-icon${errors.address ? " error" : ""}`}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Business St, City, State 12345"
                    />
                  </div>
                  {errors.address && <div className="edit-client-error-msg">{errors.address}</div>}
                </div>

                {/* Employees */}
                <div className="edit-client-field-group">
                  <label className="edit-client-label">Number of Employees</label>
                  <div className="edit-client-input-wrap">
                    <Users className="edit-client-input-icon" />
                    <input
                      className="edit-client-input with-icon"
                      name="employees"
                      type="number"
                      value={formData.employees}
                      onChange={handleChange}
                      placeholder="0"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                </div>

                {/* Projects */}
                <div className="edit-client-field-group">
                  <label className="edit-client-label">Active Projects</label>
                  <div className="edit-client-input-wrap">
                    <Briefcase className="edit-client-input-icon" />
                    <input
                      className="edit-client-input with-icon"
                      name="projects"
                      type="number"
                      value={formData.projects}
                      onChange={handleChange}
                      placeholder="0"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                </div>

                {/* Rating */}
                <div className="edit-client-field-group">
                  <label className="edit-client-label">Client Rating (0-5)</label>
                  <div className="edit-client-input-wrap">
                    <Star className="edit-client-input-icon" />
                    <input
                      className={`edit-client-input with-icon${errors.rating ? " error" : ""}`}
                      name="rating"
                      type="number"
                      value={formData.rating}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      max="5"
                      step="0.1"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                  {errors.rating && <div className="edit-client-error-msg">{errors.rating}</div>}
                </div>

                {/* Account Manager */}
                <div className="edit-client-field-group">
                  <label className="edit-client-label">Account Manager</label>
                  <div className="edit-client-input-wrap">
                    <UserCheck className="edit-client-input-icon" />
                    <input
                      className={`edit-client-input with-icon${errors.accountManager ? " error" : ""}`}
                      name="accountManager"
                      value={formData.accountManager}
                      onChange={handleChange}
                      placeholder="John Smith"
                    />
                  </div>
                  {errors.accountManager && <div className="edit-client-error-msg">{errors.accountManager}</div>}
                </div>

                {/* Status */}
                <div className="edit-client-field-group">
                  <label className="edit-client-label">Status</label>
                  <div className="edit-client-input-wrap">
                    <UserCheck className="edit-client-input-icon" />
                    <select
                      className="edit-client-select with-icon"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="edit-client-field-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="edit-client-label">Notes</label>
                  <textarea
                    className="edit-client-textarea"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Add any additional notes about this client..."
                  />
                </div>

                {/* Services */}
                <div className="edit-client-field-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="edit-client-label">Services</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {availableServices.map((service) => (
                      <div
                        key={service}
                        className={`service-chip ${formData.services.includes(service) ? "selected" : ""}`}
                        onClick={() => handleServiceChange(service)}
                      >
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div style={{
              display: "flex", justifyContent: "flex-end", gap: 12,
              paddingTop: 20, borderTop: "1px solid #e2e8f0",
            }}>
              <button
                type="button"
                onClick={onClose}
                className="edit-client-btn edit-client-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="edit-client-btn edit-client-btn-primary"
                disabled={isSaving || saved}
              >
                {saved ? (
                  <>
                    <CheckCircle style={{ width: 16, height: 16 }} />
                    Client Updated Successfully!
                  </>
                ) : isSaving ? (
                  <>
                    <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                    Updating Client...
                  </>
                ) : (
                  <>
                    <Save style={{ width: 16, height: 16 }} />
                    Update Client
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  )
}
