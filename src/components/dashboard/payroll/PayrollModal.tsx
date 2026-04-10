"use client"

import { useState } from "react"
import { X, Save, DollarSign, Calendar, Users, FileText, CheckCircle, Plus, Trash2 } from "lucide-react"

interface PayrollModalProps {
  isOpen: boolean
  onClose: () => void
  payroll?: any
}

export function PayrollModal({ isOpen, onClose, payroll }: PayrollModalProps) {
  const [formData, setFormData] = useState({
    id: payroll?.id ?? "",
    employeeId: payroll?.employeeId ?? "",
    employeeName: payroll?.employeeName ?? "",
    month: payroll?.month ?? new Date().toISOString().slice(0, 7),
    basicSalary: payroll?.basicSalary ?? "",
    hra: payroll?.hra ?? "",
    conveyance: payroll?.conveyance ?? "",
    medical: payroll?.medical ?? "",
    otherAllowances: payroll?.otherAllowances ?? "",
    grossSalary: payroll?.grossSalary ?? "",
    pf: payroll?.pf ?? "",
    esi: payroll?.esi ?? "",
    professionalTax: payroll?.professionalTax ?? "200",
    tds: payroll?.tds ?? "",
    totalDeductions: payroll?.totalDeductions ?? "",
    netSalary: payroll?.netSalary ?? "",
    status: payroll?.status ?? "pending",
    paymentDate: payroll?.paymentDate ?? "",
    paymentMethod: payroll?.paymentMethod ?? "bank_transfer",
    notes: payroll?.notes ?? "",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Auto-calculate gross salary when earnings change
    if (["basicSalary", "hra", "conveyance", "medical", "otherAllowances"].includes(name)) {
      const basic = parseFloat(formData.basicSalary) || 0
      const hraVal = parseFloat(formData.hra) || 0
      const conv = parseFloat(formData.conveyance) || 0
      const med = parseFloat(formData.medical) || 0
      const other = parseFloat(formData.otherAllowances) || 0
      
      let newGross = basic + hraVal + conv + med + other
      if (name === "basicSalary") newGross = parseFloat(value) || 0 + hraVal + conv + med + other
      else if (name === "hra") newGross = basic + parseFloat(value) || 0 + conv + med + other
      else if (name === "conveyance") newGross = basic + hraVal + parseFloat(value) || 0 + med + other
      else if (name === "medical") newGross = basic + hraVal + conv + parseFloat(value) || 0 + other
      else if (name === "otherAllowances") newGross = basic + hraVal + conv + med + parseFloat(value) || 0
      
      setFormData(prev => ({ ...prev, grossSalary: newGross.toString() }))
    }
    
    // Auto-calculate total deductions and net salary
    if (["pf", "esi", "professionalTax", "tds"].includes(name)) {
      const pfVal = parseFloat(formData.pf) || 0
      const esiVal = parseFloat(formData.esi) || 0
      const profTax = parseFloat(formData.professionalTax) || 0
      const tdsVal = parseFloat(formData.tds) || 0
      
      let newTotalDeductions = pfVal + esiVal + profTax + tdsVal
      if (name === "pf") newTotalDeductions = parseFloat(value) || 0 + esiVal + profTax + tdsVal
      else if (name === "esi") newTotalDeductions = pfVal + parseFloat(value) || 0 + profTax + tdsVal
      else if (name === "professionalTax") newTotalDeductions = pfVal + esiVal + parseFloat(value) || 0 + tdsVal
      else if (name === "tds") newTotalDeductions = pfVal + esiVal + profTax + parseFloat(value) || 0
      
      const gross = parseFloat(formData.grossSalary) || 0
      const netSalary = gross - newTotalDeductions
      
      setFormData(prev => ({ 
        ...prev, 
        totalDeductions: newTotalDeductions.toString(),
        netSalary: netSalary.toString()
      }))
    }
    
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.employeeId.trim()) e.employeeId = "Employee ID is required"
    if (!formData.employeeName.trim()) e.employeeName = "Employee name is required"
    if (!formData.month) e.month = "Month is required"
    if (!formData.basicSalary) e.basicSalary = "Basic salary is required"
    if (!formData.grossSalary) e.grossSalary = "Gross salary is required"
    if (!formData.netSalary) e.netSalary = "Net salary is required"
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
      alert("Failed to save payroll. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const employees = [
    { id: "EMP001", name: "John Doe" },
    { id: "EMP002", name: "Jane Smith" },
    { id: "EMP003", name: "Mike Johnson" },
    { id: "EMP004", name: "Sarah Williams" },
    { id: "EMP005", name: "David Brown" },
  ]

  const paymentMethods = [
    { value: "bank_transfer", label: "Bank Transfer" },
    { value: "cheque", label: "Cheque" },
    { value: "cash", label: "Cash" },
    { value: "upi", label: "UPI" },
  ]

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "processed", label: "Processed" },
    { value: "paid", label: "Paid" },
    { value: "cancelled", label: "Cancelled" },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&display=swap');

        .payroll-modal-overlay * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        .payroll-modal-fade {
          animation: payrollFadeIn 0.2s ease;
        }
        @keyframes payrollFadeIn {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .payroll-field-group { display: flex; flex-direction: column; gap: 6px; }

        .payroll-label {
          font-size: 11.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #64748b;
        }

        .payroll-input-wrap { position: relative; }

        .payroll-input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 15px;
          height: 15px;
          color: #94a3b8;
          pointer-events: none;
        }

        .payroll-input {
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

        .payroll-input.with-icon { padding-left: 38px; }

        .payroll-input:focus {
          border-color: #334155;
          box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.1);
        }

        .payroll-input.error {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.08);
        }

        .payroll-input:disabled {
          background: #f8fafc;
          color: #94a3b8;
          cursor: not-allowed;
        }

        .payroll-select {
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

        .payroll-select:focus {
          border-color: #334155;
          box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.1);
        }

        .payroll-textarea {
          width: 100%;
          min-height: 80px;
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

        .payroll-textarea:focus {
          border-color: #334155;
          box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.1);
        }

        .payroll-error-msg {
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

        .payroll-btn {
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

        .payroll-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }

        .payroll-btn:active:not(:disabled) { transform: translateY(0); }

        .payroll-btn:disabled { opacity: 0.6; cursor: not-allowed; }

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

        .summary-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 16px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f1f5f9;
          font-size: 13px;
        }

        .summary-row:last-child {
          border-bottom: none;
        }

        .summary-row.total {
          font-weight: 700;
          border-top: 2px solid #e2e8f0;
          padding-top: 12px;
          margin-top: 4px;
        }

        .amount-display {
          font-family: 'DM Mono', monospace;
          font-weight: 500;
        }

        .amount-display.positive { color: #16a34a; }
        .amount-display.negative { color: #dc2626; }
        .amount-display.net { color: #0f766e; font-weight: 700; }
      `}</style>

      <div
        className="payroll-modal-overlay"
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
          className="payroll-modal-fade"
          style={{
            background: "#fff",
            borderRadius: 16,
            width: "100%",
            maxWidth: 780,
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
                background: "linear-gradient(135deg, #0f766e, #0d9488)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <DollarSign style={{ width: 17, height: 17, color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
                  {payroll ? "Edit Payroll" : "Create Payroll"}
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 1 }}>
                  {payroll ? `Payroll ID: ${payroll.id}` : "Generate new payroll entry"}
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
                  <FileText style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Basic Information
                </span>
              </div>
              <div className="section-card-body two-col">
                {/* Employee Selection */}
                <div className="payroll-field-group">
                  <label className="payroll-label">Employee</label>
                  <div className="payroll-input-wrap">
                    <Users className="payroll-input-icon" />
                    <select
                      className="payroll-select with-icon"
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={(e) => {
                        const employee = employees.find(emp => emp.id === e.target.value)
                        setFormData(prev => ({ 
                          ...prev, 
                          employeeId: e.target.value,
                          employeeName: employee?.name || ""
                        }))
                      }}
                      style={{ paddingLeft: 38 }}
                    >
                      <option value="">Select Employee</option>
                      {employees.map((emp) => (
                        <option key={emp.id} value={emp.id}>{emp.name} ({emp.id})</option>
                      ))}
                    </select>
                  </div>
                  {errors.employeeId && <div className="payroll-error-msg">{errors.employeeId}</div>}
                </div>

                {/* Month */}
                <div className="payroll-field-group">
                  <label className="payroll-label">Payroll Month</label>
                  <div className="payroll-input-wrap">
                    <Calendar className="payroll-input-icon" />
                    <input
                      className={`payroll-input with-icon${errors.month ? " error" : ""}`}
                      name="month"
                      type="month"
                      value={formData.month}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.month && <div className="payroll-error-msg">{errors.month}</div>}
                </div>

                {/* Status */}
                <div className="payroll-field-group">
                  <label className="payroll-label">Status</label>
                  <div className="payroll-input-wrap">
                    <FileText className="payroll-input-icon" />
                    <select
                      className="payroll-select with-icon"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      style={{ paddingLeft: 38 }}
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="payroll-field-group">
                  <label className="payroll-label">Payment Method</label>
                  <div className="payroll-input-wrap">
                    <DollarSign className="payroll-input-icon" />
                    <select
                      className="payroll-select with-icon"
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      style={{ paddingLeft: 38 }}
                    >
                      {paymentMethods.map((method) => (
                        <option key={method.value} value={method.value}>{method.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Earnings */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #16a34a, #22c55e)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Plus style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Earnings
                </span>
              </div>
              <div className="section-card-body two-col">
                {/* Basic Salary */}
                <div className="payroll-field-group">
                  <label className="payroll-label">Basic Salary</label>
                  <div className="payroll-input-wrap">
                    <DollarSign className="payroll-input-icon" />
                    <input
                      className={`payroll-input with-icon${errors.basicSalary ? " error" : ""}`}
                      name="basicSalary"
                      type="number"
                      value={formData.basicSalary}
                      onChange={handleChange}
                      placeholder="0.00"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                  {errors.basicSalary && <div className="payroll-error-msg">{errors.basicSalary}</div>}
                </div>

                {/* HRA */}
                <div className="payroll-field-group">
                  <label className="payroll-label">House Rent Allowance (HRA)</label>
                  <div className="payroll-input-wrap">
                    <DollarSign className="payroll-input-icon" />
                    <input
                      className="payroll-input with-icon"
                      name="hra"
                      type="number"
                      value={formData.hra}
                      onChange={handleChange}
                      placeholder="0.00"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                </div>

                {/* Conveyance */}
                <div className="payroll-field-group">
                  <label className="payroll-label">Conveyance Allowance</label>
                  <div className="payroll-input-wrap">
                    <DollarSign className="payroll-input-icon" />
                    <input
                      className="payroll-input with-icon"
                      name="conveyance"
                      type="number"
                      value={formData.conveyance}
                      onChange={handleChange}
                      placeholder="0.00"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                </div>

                {/* Medical */}
                <div className="payroll-field-group">
                  <label className="payroll-label">Medical Allowance</label>
                  <div className="payroll-input-wrap">
                    <DollarSign className="payroll-input-icon" />
                    <input
                      className="payroll-input with-icon"
                      name="medical"
                      type="number"
                      value={formData.medical}
                      onChange={handleChange}
                      placeholder="0.00"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                </div>

                {/* Other Allowances */}
                <div className="payroll-field-group">
                  <label className="payroll-label">Other Allowances</label>
                  <div className="payroll-input-wrap">
                    <DollarSign className="payroll-input-icon" />
                    <input
                      className="payroll-input with-icon"
                      name="otherAllowances"
                      type="number"
                      value={formData.otherAllowances}
                      onChange={handleChange}
                      placeholder="0.00"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                </div>

                {/* Gross Salary (Auto-calculated) */}
                <div className="payroll-field-group">
                  <label className="payroll-label">Gross Salary</label>
                  <div className="payroll-input-wrap">
                    <DollarSign className="payroll-input-icon" />
                    <input
                      className={`payroll-input with-icon${errors.grossSalary ? " error" : ""}`}
                      name="grossSalary"
                      type="number"
                      value={formData.grossSalary}
                      onChange={handleChange}
                      placeholder="0.00"
                      style={{ fontFamily: "'DM Mono', monospace", background: "#f8fafc" }}
                      readOnly
                    />
                  </div>
                  {errors.grossSalary && <div className="payroll-error-msg">{errors.grossSalary}</div>}
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #dc2626, #ef4444)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Trash2 style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Deductions
                </span>
              </div>
              <div className="section-card-body two-col">
                {/* PF */}
                <div className="payroll-field-group">
                  <label className="payroll-label">Provident Fund (PF)</label>
                  <div className="payroll-input-wrap">
                    <DollarSign className="payroll-input-icon" />
                    <input
                      className="payroll-input with-icon"
                      name="pf"
                      type="number"
                      value={formData.pf}
                      onChange={handleChange}
                      placeholder="0.00"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                </div>

                {/* ESI */}
                <div className="payroll-field-group">
                  <label className="payroll-label">ESI Contribution</label>
                  <div className="payroll-input-wrap">
                    <DollarSign className="payroll-input-icon" />
                    <input
                      className="payroll-input with-icon"
                      name="esi"
                      type="number"
                      value={formData.esi}
                      onChange={handleChange}
                      placeholder="0.00"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                </div>

                {/* Professional Tax */}
                <div className="payroll-field-group">
                  <label className="payroll-label">Professional Tax</label>
                  <div className="payroll-input-wrap">
                    <DollarSign className="payroll-input-icon" />
                    <input
                      className="payroll-input with-icon"
                      name="professionalTax"
                      type="number"
                      value={formData.professionalTax}
                      onChange={handleChange}
                      placeholder="0.00"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                </div>

                {/* TDS */}
                <div className="payroll-field-group">
                  <label className="payroll-label">Tax Deducted at Source (TDS)</label>
                  <div className="payroll-input-wrap">
                    <DollarSign className="payroll-input-icon" />
                    <input
                      className="payroll-input with-icon"
                      name="tds"
                      type="number"
                      value={formData.tds}
                      onChange={handleChange}
                      placeholder="0.00"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                </div>

                {/* Total Deductions (Auto-calculated) */}
                <div className="payroll-field-group">
                  <label className="payroll-label">Total Deductions</label>
                  <div className="payroll-input-wrap">
                    <DollarSign className="payroll-input-icon" />
                    <input
                      className="payroll-input with-icon"
                      name="totalDeductions"
                      type="number"
                      value={formData.totalDeductions}
                      onChange={handleChange}
                      placeholder="0.00"
                      style={{ fontFamily: "'DM Mono', monospace", background: "#f8fafc" }}
                      readOnly
                    />
                  </div>
                </div>

                {/* Net Salary (Auto-calculated) */}
                <div className="payroll-field-group">
                  <label className="payroll-label">Net Salary</label>
                  <div className="payroll-input-wrap">
                    <DollarSign className="payroll-input-icon" />
                    <input
                      className={`payroll-input with-icon${errors.netSalary ? " error" : ""}`}
                      name="netSalary"
                      type="number"
                      value={formData.netSalary}
                      onChange={handleChange}
                      placeholder="0.00"
                      style={{ fontFamily: "'DM Mono', monospace", background: "#f0fdf4", color: "#16a34a", fontWeight: 600 }}
                      readOnly
                    />
                  </div>
                  {errors.netSalary && <div className="payroll-error-msg">{errors.netSalary}</div>}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="summary-box">
              <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Payroll Summary
              </div>
              <div className="summary-row">
                <span style={{ color: "#64748b" }}>Gross Salary</span>
                <span className="amount-display positive">${parseFloat(formData.grossSalary || 0).toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span style={{ color: "#64748b" }}>Total Deductions</span>
                <span className="amount-display negative">-${parseFloat(formData.totalDeductions || 0).toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span style={{ color: "#0f172a" }}>Net Salary</span>
                <span className="amount-display net">${parseFloat(formData.netSalary || 0).toFixed(2)}</span>
              </div>
            </div>

            {/* Additional Information */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #7c3aed, #9333ea)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <FileText style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Additional Information
                </span>
              </div>
              <div className="section-card-body">
                {/* Payment Date */}
                <div className="payroll-field-group">
                  <label className="payroll-label">Payment Date</label>
                  <div className="payroll-input-wrap">
                    <Calendar className="payroll-input-icon" />
                    <input
                      className="payroll-input with-icon"
                      name="paymentDate"
                      type="date"
                      value={formData.paymentDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="payroll-field-group">
                  <label className="payroll-label">Notes</label>
                  <textarea
                    className="payroll-textarea"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Enter any additional notes or comments..."
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
              <button type="button" className="payroll-btn btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className={`payroll-btn ${saved ? "btn-success" : "btn-primary"}`}
                disabled={isSaving}
              >
                {saved ? (
                  <><CheckCircle style={{ width: 15, height: 15 }} /> Saved!</>
                ) : isSaving ? (
                  <><span className="spinner" /> Saving...</>
                ) : (
                  <><Save style={{ width: 15, height: 15 }} /> {payroll ? "Update Payroll" : "Create Payroll"}</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
