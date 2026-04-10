"use client"

import { useState } from "react"
import { X, Save, Building, Mail, DollarSign, Calendar, Phone, MapPin, Globe, Users, FileText, CheckCircle, Star } from "lucide-react"

interface EditCompanyModalProps {
  isOpen: boolean
  onClose: () => void
  company: any
}

export function EditCompanyModal({ isOpen, onClose, company }: EditCompanyModalProps) {
  const [formData, setFormData] = useState({
    id: company?.id ?? "",
    name: company?.name ?? "",
    industry: company?.industry ?? "",
    email: company?.email ?? "",
    phone: company?.phone ?? "",
    address: company?.address ?? "",
    website: company?.website ?? "",
    employees: company?.employees ?? "",
    revenue: company?.revenue ?? "",
    status: company?.status ?? "active",
    foundedDate: company?.foundedDate ?? "",
    description: company?.description ?? "",
    contact: company?.contact ?? "",
    rating: company?.rating ?? 0,
    ownerName: company?.ownerName ?? "",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen || !company) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.name.trim()) e.name = "Company name is required"
    if (!formData.email.trim()) e.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Enter a valid email"
    if (!formData.phone.trim()) e.phone = "Phone number is required"
    if (!formData.address.trim()) e.address = "Address is required"
    if (!formData.industry) e.industry = "Industry is required"
    if (!formData.employees) e.employees = "Number of employees is required"
    if (!formData.revenue) e.revenue = "Annual revenue is required"
    if (!formData.contact.trim()) e.contact = "Phone number is required"
    if (!formData.ownerName.trim()) e.ownerName = "Owner name is required"
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
      alert("Failed to update company information. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const industries = [
    "Technology", "Finance", "Healthcare", "Retail", "Energy",
    "Education", "Logistics", "Food & Beverage", "Real Estate", "Manufacturing",
    "Consulting", "Media", "Agriculture", "Transportation", "Construction"
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&display=swap');

        .edit-company-modal-overlay * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        .edit-company-modal-fade {
          animation: editCompanyFadeIn 0.2s ease;
        }
        @keyframes editCompanyFadeIn {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .edit-company-field-group { display: flex; flex-direction: column; gap: 6px; }

        .edit-company-label {
          font-size: 11.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #64748b;
        }

        .edit-company-input-wrap { position: relative; }

        .edit-company-input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 15px;
          height: 15px;
          color: #94a3b8;
          pointer-events: none;
        }

        .edit-company-input {
          width: 100%;
          height: 44px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          padding: 0 14px;
          font-size: 13.5px;
          color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
          appearance: none;
        }

        .edit-company-input.with-icon { padding-left: 38px; }

        .edit-company-input:focus {
          border-color: #334155;
          box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.1);
        }

        .edit-company-input.error {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.08);
        }

        .edit-company-input:disabled {
          background: #f8fafc;
          color: #94a3b8;
          cursor: not-allowed;
        }

        .edit-company-select {
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

        .edit-company-select.with-icon {
          padding-left: 38px;
        }

        .edit-company-select:focus {
          border-color: #334155;
          box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.1);
        }

        .edit-company-textarea {
          width: 100%;
          min-height: 100px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          padding: 10px 14px;
          font-size: 13.5px;
          color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          resize: vertical;
        }

        .edit-company-textarea:focus {
          border-color: #334155;
          box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.1);
        }

        .edit-company-error-msg {
          font-size: 11.5px;
          color: #ef4444;
          font-weight: 500;
          margin-top: 2px;
        }

        .section-card {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
        }

        .section-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
        }

        .section-card-body {
          padding: 18px;
          display: grid;
          gap: 14px;
        }

        .two-col {
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }

        .edit-company-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }

        .edit-company-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }

        .edit-company-btn:active:not(:disabled) { transform: translateY(0); }

        .edit-company-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .btn-primary   { background: #0f172a; color: #fff; }
        .btn-success   { background: #16a34a; color: #fff; }
        .btn-cancel    { background: transparent; color: #475569; border: 1.5px solid #e2e8f0; }
        .btn-cancel:hover:not(:disabled) { background: #f8fafc; }

        .spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        @media print { .no-print { display: none !important; } }
      `}</style>

      <div
        className="edit-company-modal-overlay"
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
          className="edit-company-modal-fade"
          style={{
            background: "#fff",
            borderRadius: 16,
            width: "100%",
            maxWidth: 720,
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
                background: "linear-gradient(135deg, #1e293b, #475569)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Building style={{ width: 17, height: 17, color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Edit Company</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 1 }}>
                  {company.name} &nbsp;·&nbsp; ID: {company.id}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 34, height: 34, borderRadius: 8,
                border: "1.5px solid #e2e8f0", background: "transparent",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <X style={{ width: 16, height: 16, color: "#64748b" }} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>

            {/* Basic Information */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #1e293b, #334155)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Building style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Basic Information
                </span>
              </div>
              <div className="section-card-body two-col">
                {/* Company ID */}
                <div className="edit-company-field-group">
                  <label className="edit-company-label">Company ID</label>
                  <div className="edit-company-input-wrap">
                    <FileText className="edit-company-input-icon" />
                    <input
                      className="edit-company-input with-icon"
                      name="id"
                      value={formData.id}
                      disabled
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div className="edit-company-field-group">
                  <label className="edit-company-label">Company Name</label>
                  <div className="edit-company-input-wrap">
                    <Building className="edit-company-input-icon" />
                    <input
                      className={`edit-company-input with-icon${errors.name ? " error" : ""}`}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter company name"
                    />
                  </div>
                  {errors.name && <div className="edit-company-error-msg">{errors.name}</div>}
                </div>

                {/* Industry */}
                <div className="edit-company-field-group">
                  <label className="edit-company-label">Industry</label>
                  <div className="edit-company-input-wrap">
                    <Globe className="edit-company-input-icon" />
                    <select
                      className="edit-company-select with-icon"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                    >
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  {errors.industry && <div className="edit-company-error-msg">{errors.industry}</div>}
                </div>

                {/* Status */}
                <div className="edit-company-field-group">
                  <label className="edit-company-label">Status</label>
                  <div className="edit-company-input-wrap">
                    <FileText className="edit-company-input-icon" />
                    <select
                      className="edit-company-select with-icon"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Founded Date */}
                <div className="edit-company-field-group">
                  <label className="edit-company-label">Founded Date</label>
                  <div className="edit-company-input-wrap">
                    <Calendar className="edit-company-input-icon" />
                    <input
                      className="edit-company-input with-icon"
                      name="foundedDate"
                      type="date"
                      value={formData.foundedDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Website */}
                <div className="edit-company-field-group">
                  <label className="edit-company-label">Website</label>
                  <div className="edit-company-input-wrap">
                    <Globe className="edit-company-input-icon" />
                    <input
                      className="edit-company-input with-icon"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="www.example.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #0f766e, #0d9488)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Mail style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Contact Information
                </span>
              </div>
              <div className="section-card-body">
                {/* Email */}
                <div className="edit-company-field-group">
                  <label className="edit-company-label">Email Address</label>
                  <div className="edit-company-input-wrap">
                    <Mail className="edit-company-input-icon" />
                    <input
                      className={`edit-company-input with-icon${errors.email ? " error" : ""}`}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contact@company.com"
                    />
                  </div>
                  {errors.email && <div className="edit-company-error-msg">{errors.email}</div>}
                </div>

                {/* Phone */}
                <div className="edit-company-field-group">
                  <label className="edit-company-label">Phone Number</label>
                  <div className="edit-company-input-wrap">
                    <Phone className="edit-company-input-icon" />
                    <input
                      className={`edit-company-input with-icon${errors.phone ? " error" : ""}`}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  {errors.phone && <div className="edit-company-error-msg">{errors.phone}</div>}
                </div>

                {/* Address */}
                <div className="edit-company-field-group">
                  <label className="edit-company-label">Address</label>
                  <div className="edit-company-input-wrap">
                    <MapPin className="edit-company-input-icon" />
                    <input
                      className={`edit-company-input with-icon${errors.address ? " error" : ""}`}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Business St, City, State 12345"
                    />
                  </div>
                  {errors.address && <div className="edit-company-error-msg">{errors.address}</div>}
                </div>

                {/* Phone Number */}
                <div className="edit-company-field-group">
                  <label className="edit-company-label">Phone Number</label>
                  <div className="edit-company-input-wrap">
                    <Phone className="edit-company-input-icon" />
                    <input
                      className={`edit-company-input with-icon${errors.contact ? " error" : ""}`}
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  {errors.contact && <div className="edit-company-error-msg">{errors.contact}</div>}
                </div>

                {/* Owner Name */}
                <div className="edit-company-field-group">
                  <label className="edit-company-label">Owner Name</label>
                  <div className="edit-company-input-wrap">
                    <Users className="edit-company-input-icon" />
                    <input
                      className={`edit-company-input with-icon${errors.ownerName ? " error" : ""}`}
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      placeholder="Michael Johnson"
                    />
                  </div>
                  {errors.ownerName && <div className="edit-company-error-msg">{errors.ownerName}</div>}
                </div>
              </div>
            </div>

            {/* Business Metrics */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #7c3aed, #9333ea)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Users style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Business Metrics
                </span>
              </div>
              <div className="section-card-body two-col">
                {/* Employees */}
                <div className="edit-company-field-group">
                  <label className="edit-company-label">Number of Employees</label>
                  <div className="edit-company-input-wrap">
                    <Users className="edit-company-input-icon" />
                    <input
                      className={`edit-company-input with-icon${errors.employees ? " error" : ""}`}
                      name="employees"
                      type="number"
                      value={formData.employees}
                      onChange={handleChange}
                      placeholder="0"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                  {errors.employees && <div className="edit-company-error-msg">{errors.employees}</div>}
                </div>

                {/* Revenue */}
                <div className="edit-company-field-group">
                  <label className="edit-company-label">Annual Revenue (USD)</label>
                  <div className="edit-company-input-wrap">
                    <DollarSign className="edit-company-input-icon" />
                    <input
                      className={`edit-company-input with-icon${errors.revenue ? " error" : ""}`}
                      name="revenue"
                      type="number"
                      value={formData.revenue}
                      onChange={handleChange}
                      placeholder="0"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                  {errors.revenue && <div className="edit-company-error-msg">{errors.revenue}</div>}
                </div>

                {/* Rating */}
                <div className="edit-company-field-group">
                  <label className="edit-company-label">Company Rating (0-5)</label>
                  <div className="edit-company-input-wrap">
                    <Star className="edit-company-input-icon" />
                    <input
                      className={`edit-company-input with-icon${errors.rating ? " error" : ""}`}
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
                  {errors.rating && <div className="edit-company-error-msg">{errors.rating}</div>}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #ea580c, #f97316)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <FileText style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Company Description
                </span>
              </div>
              <div className="section-card-body">
                <div className="edit-company-field-group">
                  <label className="edit-company-label">Description</label>
                  <textarea
                    className="edit-company-textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter a detailed description of the company..."
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              paddingTop: 4,
            }}>
              <button type="button" className="edit-company-btn btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className={`edit-company-btn ${saved ? "btn-success" : "btn-primary"}`}
                disabled={isSaving}
              >
                {saved ? (
                  <><CheckCircle style={{ width: 15, height: 15 }} /> Saved!</>
                ) : isSaving ? (
                  <><span className="spinner" /> Saving...</>
                ) : (
                  <><Save style={{ width: 15, height: 15 }} /> Save Changes</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
