"use client"

import { useState } from "react"
import { X, Save, User, Mail, DollarSign, Calendar, Building, Phone, MapPin, CreditCard, FileText, CheckCircle } from "lucide-react"

interface EditEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  employee: any
}

export function EditEmployeeModal({ isOpen, onClose, employee }: EditEmployeeModalProps) {
  const [formData, setFormData] = useState({
    id: employee?.id ?? "",
    name: employee?.name ?? "",
    designation: employee?.designation ?? "",
    email: employee?.email ?? "",
    joiningDate: employee?.joiningDate ?? "",
    salary: employee?.salary ?? "",
    phone: "+1 (555) 000-0000",
    address: "123 Main St, City, State 12345",
    pan: "ABCDE1234F",
    bankAccount: "****1234",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen || !employee) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.name.trim()) e.name = "Full name is required"
    if (!formData.email.trim()) e.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Enter a valid email"
    if (!formData.salary) e.salary = "Salary is required"
    if (!formData.joiningDate) e.joiningDate = "Joining date is required"
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
      alert("Failed to update employee information. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const designations = [
    "Web Designer", "Senior Developer", "Product Manager",
    "UX Designer", "DevOps Engineer", "HR Manager",
    "Backend Developer", "Frontend Developer", "QA Engineer",
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&display=swap');

        .edit-modal-overlay * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        .edit-modal-fade {
          animation: editFadeIn 0.2s ease;
        }
        @keyframes editFadeIn {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .edit-field-group { display: flex; flex-direction: column; gap: 6px; }

        .edit-label {
          font-size: 11.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #64748b;
        }

        .edit-input-wrap { position: relative; }

        .edit-input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 15px;
          height: 15px;
          color: #94a3b8;
          pointer-events: none;
        }

        .edit-input {
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

        .edit-input.with-icon { padding-left: 38px; }

        .edit-input:focus {
          border-color: #334155;
          box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.1);
        }

        .edit-input.error {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.08);
        }

        .edit-input:disabled {
          background: #f8fafc;
          color: #94a3b8;
          cursor: not-allowed;
        }

        .edit-select {
          width: 100%;
          height: 44px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 14px center;
          padding: 0 38px 0 38px;
          font-size: 13.5px;
          color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          cursor: pointer;
          transition: border-color 0.15s, box-shadow 0.15s;
          appearance: none;
        }

        .edit-select:focus {
          border-color: #334155;
          box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.1);
        }

        .edit-error-msg {
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

        .edit-btn {
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

        .edit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }

        .edit-btn:active:not(:disabled) { transform: translateY(0); }

        .edit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

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
        className="edit-modal-overlay"
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
          className="edit-modal-fade"
          style={{
            background: "#fff",
            borderRadius: 16,
            width: "100%",
            maxWidth: 680,
            maxHeight: "92vh",
            overflowY: "auto",
            boxShadow: "0 24px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* ── Sticky Header ── */}
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
                <User style={{ width: 17, height: 17, color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Edit Employee</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 1 }}>
                  {employee.name} &nbsp;·&nbsp; ID: {employee.id}
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

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>

            {/* Basic Information */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #1e293b, #334155)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <User style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Basic Information
                </span>
              </div>
              <div className="section-card-body two-col">
                {/* Employee ID */}
                <div className="edit-field-group">
                  <label className="edit-label">Employee ID</label>
                  <div className="edit-input-wrap">
                    <FileText className="edit-input-icon" />
                    <input
                      className="edit-input with-icon"
                      name="id"
                      value={formData.id}
                      disabled
                    />
                  </div>
                </div>

                {/* Full Name */}
                <div className="edit-field-group">
                  <label className="edit-label">Full Name</label>
                  <div className="edit-input-wrap">
                    <User className="edit-input-icon" />
                    <input
                      className={`edit-input with-icon${errors.name ? " error" : ""}`}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && <div className="edit-error-msg">{errors.name}</div>}
                </div>

                {/* Email */}
                <div className="edit-field-group">
                  <label className="edit-label">Email Address</label>
                  <div className="edit-input-wrap">
                    <Mail className="edit-input-icon" />
                    <input
                      className={`edit-input with-icon${errors.email ? " error" : ""}`}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                    />
                  </div>
                  {errors.email && <div className="edit-error-msg">{errors.email}</div>}
                </div>

                {/* Phone */}
                <div className="edit-field-group">
                  <label className="edit-label">Phone Number</label>
                  <div className="edit-input-wrap">
                    <Phone className="edit-input-icon" />
                    <input
                      className="edit-input with-icon"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Employment Details */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #0f766e, #0d9488)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Building style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Employment Details
                </span>
              </div>
              <div className="section-card-body two-col">
                {/* Designation */}
                <div className="edit-field-group">
                  <label className="edit-label">Designation</label>
                  <div className="edit-input-wrap">
                    <Building className="edit-input-icon" />
                    <select
                      className="edit-select"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                    >
                      {designations.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Joining Date */}
                <div className="edit-field-group">
                  <label className="edit-label">Joining Date</label>
                  <div className="edit-input-wrap">
                    <Calendar className="edit-input-icon" />
                    <input
                      className={`edit-input with-icon${errors.joiningDate ? " error" : ""}`}
                      name="joiningDate"
                      type="date"
                      value={formData.joiningDate}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.joiningDate && <div className="edit-error-msg">{errors.joiningDate}</div>}
                </div>

                {/* Salary */}
                <div className="edit-field-group">
                  <label className="edit-label">Annual Salary (USD)</label>
                  <div className="edit-input-wrap">
                    <DollarSign className="edit-input-icon" />
                    <input
                      className={`edit-input with-icon${errors.salary ? " error" : ""}`}
                      name="salary"
                      type="number"
                      value={formData.salary}
                      onChange={handleChange}
                      placeholder="75000"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                  {errors.salary && <div className="edit-error-msg">{errors.salary}</div>}
                </div>

                {/* Address */}
                <div className="edit-field-group">
                  <label className="edit-label">Address</label>
                  <div className="edit-input-wrap">
                    <MapPin className="edit-input-icon" />
                    <input
                      className="edit-input with-icon"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main St, City, State"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #7c3aed, #9333ea)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <CreditCard style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Financial Information
                </span>
              </div>
              <div className="section-card-body two-col">
                {/* PAN */}
                <div className="edit-field-group">
                  <label className="edit-label">PAN Number</label>
                  <div className="edit-input-wrap">
                    <FileText className="edit-input-icon" />
                    <input
                      className="edit-input with-icon"
                      name="pan"
                      value={formData.pan}
                      onChange={handleChange}
                      placeholder="ABCDE1234F"
                      style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em" }}
                    />
                  </div>
                </div>

                {/* Bank Account */}
                <div className="edit-field-group">
                  <label className="edit-label">Bank Account Number</label>
                  <div className="edit-input-wrap">
                    <CreditCard className="edit-input-icon" />
                    <input
                      className="edit-input with-icon"
                      name="bankAccount"
                      value={formData.bankAccount}
                      onChange={handleChange}
                      placeholder="Last 4 digits"
                      style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em" }}
                    />
                  </div>
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
              <button type="button" className="edit-btn btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className={`edit-btn ${saved ? "btn-success" : "btn-primary"}`}
                disabled={isSaving}
              >
                {saved ? (
                  <><CheckCircle style={{ width: 15, height: 15 }} /> Saved!</>
                ) : isSaving ? (
                  <><span className="spinner" /> Saving…</>
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