"use client"

import { useState } from "react"
import {
  X, Download, Send, Printer, Save,
  FileText, Calendar, DollarSign, User,
  Mail, Building, Phone, CheckCircle
} from "lucide-react"

interface ViewSalarySlipModalProps {
  isOpen: boolean
  onClose: () => void
  employee: any
}

export function ViewSalarySlipModal({ isOpen, onClose, employee }: ViewSalarySlipModalProps) {
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)

  if (!isOpen || !employee) return null

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  const handlePrint = () => window.print()

  const handleDownload = () => {
    const printContent = document.getElementById("salary-slip-content")
    if (!printContent) return
    const printWindow = window.open("", "", "width=900,height=700")
    if (!printWindow) return
    printWindow.document.write(`
      <html>
        <head>
          <title>Salary Slip – ${employee.name}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'DM Sans', sans-serif; padding: 40px; color: #1e293b; }
            h1 { font-size: 22px; font-weight: 700; }
            h2 { font-size: 14px; font-weight: 500; color: #64748b; margin-top: 4px; }
            .divider { border-top: 2px solid #e2e8f0; margin: 24px 0; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
            .label { font-size: 12px; color: #94a3b8; margin-bottom: 2px; }
            .value { font-size: 13px; font-weight: 500; color: #1e293b; }
            .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
            .row.total { font-weight: 700; border-top: 2px solid #e2e8f0; border-bottom: none; padding-top: 12px; }
            .net-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; display: flex; justify-content: space-between; align-items: center; margin-top: 24px; }
            .net-amount { font-size: 24px; font-weight: 700; color: #16a34a; }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  const handleSave = () => alert("Salary slip saved successfully!")

  const handleSend = async () => {
    setIsSending(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSent(true)
      setTimeout(() => setSent(false), 3000)
    } catch {
      alert("Failed to send salary slip. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  // Salary calculations
  const basicSalary = employee.salary * 0.6
  const hra = employee.salary * 0.2
  const conveyance = employee.salary * 0.1
  const medical = employee.salary * 0.05
  const other = employee.salary * 0.05
  const grossSalary = basicSalary + hra + conveyance + medical + other
  const pf = basicSalary * 0.12
  const esi = basicSalary * 0.0075
  const professionalTax = 200
  const tds = grossSalary * 0.1
  const totalDeductions = pf + esi + professionalTax + tds
  const netSalary = grossSalary - totalDeductions

  const earnings = [
    { label: "Basic Salary", value: basicSalary },
    { label: "House Rent Allowance (HRA)", value: hra },
    { label: "Conveyance Allowance", value: conveyance },
    { label: "Medical Allowance", value: medical },
    { label: "Other Allowances", value: other },
  ]

  const deductions = [
    { label: "Provident Fund (PF)", value: pf },
    { label: "ESI Contribution", value: esi },
    { label: "Professional Tax", value: professionalTax },
    { label: "Tax Deducted at Source (TDS)", value: tds },
  ]

  const employeeInfo = [
    { icon: User, label: "Full Name", value: employee.name },
    { icon: FileText, label: "Employee ID", value: employee.id },
    { icon: Building, label: "Designation", value: employee.designation },
    { icon: Mail, label: "Email Address", value: employee.email },
  ]

  const employmentDetails = [
    { icon: Calendar, label: "Joining Date", value: formatDate(employee.joiningDate) },
    { icon: Phone, label: "Phone Number", value: "+1 (555) 000-0000" },
    { icon: DollarSign, label: "PAN Number", value: "ABCDE1234F" },
    { icon: FileText, label: "Bank Account", value: "****1234" },
  ]

  return (
    <>
      {/* Google Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');

        .salary-modal-overlay {
          font-family: 'DM Sans', sans-serif;
        }

        .salary-modal-overlay * {
          font-family: inherit;
        }

        .slip-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .slip-action-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .slip-action-btn:active {
          transform: translateY(0);
        }

        .slip-action-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-print  { background: #1e293b; color: #fff; }
        .btn-download { background: #0f766e; color: #fff; }
        .btn-save   { background: #7c3aed; color: #fff; }
        .btn-send   { background: #ea580c; color: #fff; }
        .btn-sent   { background: #16a34a; color: #fff; }
        .btn-close  { background: transparent; color: #64748b; border: 1.5px solid #e2e8f0; }
        .btn-close:hover { background: #f8fafc; }

        .info-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
        }

        .info-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 9px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .info-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .info-row:first-child {
          padding-top: 0;
        }

        .salary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #f1f5f9;
          font-size: 13.5px;
        }

        .salary-row:last-of-type {
          border-bottom: none;
        }

        .salary-total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0 0;
          margin-top: 8px;
          border-top: 2px solid #e2e8f0;
          font-weight: 700;
          font-size: 14px;
        }

        .section-heading {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #94a3b8;
          margin-bottom: 14px;
        }

        .signature-line {
          border-bottom: 1.5px solid #cbd5e1;
          margin-top: 40px;
          margin-bottom: 8px;
        }

        .modal-fade-in {
          animation: modalFadeIn 0.2s ease;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        @media print {
          .no-print { display: none !important; }
        }

        @media (max-width: 640px) {
          .salary-actions-row {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
          }
          .slip-action-btn {
            justify-content: center;
          }
        }
      `}</style>

      <div
        className="salary-modal-overlay"
        style={{
          position: "fixed", inset: 0,
          background: "rgba(15, 23, 42, 0.55)",
          backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 50, padding: "16px",
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="modal-fade-in"
          style={{
            background: "#fff",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "860px",
            maxHeight: "92vh",
            overflowY: "auto",
            boxShadow: "0 24px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* ── Sticky Header ── */}
          <div
            className="no-print"
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
              }}>
                <FileText style={{ width: 17, height: 17, color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Salary Slip</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 1 }}>
                  {employee.name} &nbsp;·&nbsp; {new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}
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

          {/* ── Action Buttons ── */}
          <div
            className="salary-actions-row no-print"
            style={{
              borderBottom: "1px solid #e2e8f0",
              padding: "12px 24px",
              display: "flex", flexWrap: "wrap", gap: 8,
            }}
          >
            <button className="slip-action-btn btn-print" onClick={handlePrint}>
              <Printer style={{ width: 14, height: 14 }} /> Print
            </button>
            <button className="slip-action-btn btn-download" onClick={handleDownload}>
              <Download style={{ width: 14, height: 14 }} /> Download
            </button>
            <button className="slip-action-btn btn-save" onClick={handleSave}>
              <Save style={{ width: 14, height: 14 }} /> Save
            </button>
            <button
              className={`slip-action-btn ${sent ? "btn-sent" : "btn-send"}`}
              onClick={handleSend}
              disabled={isSending}
            >
              {sent
                ? <><CheckCircle style={{ width: 14, height: 14 }} /> Sent!</>
                : isSending
                  ? <><span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} /> Sending…</>
                  : <><Send style={{ width: 14, height: 14 }} /> Send to Employee</>
              }
            </button>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>

          {/* ── Slip Body ── */}
          <div id="salary-slip-content" style={{ padding: "28px 24px", flex: 1 }}>

            {/* Company Letterhead */}
            <div style={{
              textAlign: "center",
              paddingBottom: 24,
              marginBottom: 24,
              borderBottom: "2px solid #e2e8f0",
            }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 10,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: "linear-gradient(135deg, #0f172a, #334155)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Building style={{ width: 22, height: 22, color: "#fff" }} />
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>CIS Technologies</div>
                  <div style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>Technology Solutions Provider</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>
                123 Business Avenue, Tech City, TC 12345 &nbsp;|&nbsp; (555) 123-4567 &nbsp;|&nbsp; hr@cistech.com
              </div>
              <div style={{
                display: "inline-block", marginTop: 14,
                background: "#f1f5f9",
                borderRadius: 8, padding: "6px 18px",
              }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#475569", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Payslip — {new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}
                </span>
              </div>
            </div>

            {/* Employee Info Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16, marginBottom: 24,
            }}>
              {/* Employee Information */}
              <div className="info-card">
                <div className="section-heading">Employee Information</div>
                {employeeInfo.map(({ icon: Icon, label, value }) => (
                  <div className="info-row" key={label}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 7,
                      background: "#e2e8f0",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Icon style={{ width: 14, height: 14, color: "#475569" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, marginBottom: 1 }}>{label}</div>
                      <div style={{ fontSize: 13, color: "#0f172a", fontWeight: 500 }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Employment Details */}
              <div className="info-card">
                <div className="section-heading">Employment Details</div>
                {employmentDetails.map(({ icon: Icon, label, value }) => (
                  <div className="info-row" key={label}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 7,
                      background: "#e2e8f0",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Icon style={{ width: 14, height: 14, color: "#475569" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, marginBottom: 1 }}>{label}</div>
                      <div style={{ fontSize: 13, color: "#0f172a", fontWeight: 500 }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Salary Breakdown */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16, marginBottom: 20,
            }}>
              {/* Earnings */}
              <div style={{
                border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden",
              }}>
                <div style={{
                  background: "linear-gradient(135deg, #0f766e, #0d9488)",
                  padding: "12px 18px",
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.75)" }}>Earnings</div>
                </div>
                <div style={{ padding: "4px 18px 16px" }}>
                  {earnings.map(({ label, value }) => (
                    <div className="salary-row" key={label}>
                      <span style={{ color: "#475569" }}>{label}</span>
                      <span style={{ color: "#0f172a", fontWeight: 500, fontFamily: "'DM Mono', monospace", fontSize: 13 }}>{formatCurrency(value)}</span>
                    </div>
                  ))}
                  <div className="salary-total-row">
                    <span style={{ color: "#0f172a" }}>Gross Salary</span>
                    <span style={{ color: "#0f766e", fontFamily: "'DM Mono', monospace" }}>{formatCurrency(grossSalary)}</span>
                  </div>
                </div>
              </div>

              {/* Deductions */}
              <div style={{
                border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden",
              }}>
                <div style={{
                  background: "linear-gradient(135deg, #dc2626, #ef4444)",
                  padding: "12px 18px",
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.75)" }}>Deductions</div>
                </div>
                <div style={{ padding: "4px 18px 16px" }}>
                  {deductions.map(({ label, value }) => (
                    <div className="salary-row" key={label}>
                      <span style={{ color: "#475569" }}>{label}</span>
                      <span style={{ color: "#0f172a", fontWeight: 500, fontFamily: "'DM Mono', monospace", fontSize: 13 }}>{formatCurrency(value)}</span>
                    </div>
                  ))}
                  <div className="salary-total-row">
                    <span style={{ color: "#0f172a" }}>Total Deductions</span>
                    <span style={{ color: "#dc2626", fontFamily: "'DM Mono', monospace" }}>{formatCurrency(totalDeductions)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Salary Banner */}
            <div style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              borderRadius: 12,
              padding: "20px 24px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              marginBottom: 28,
            }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
                  Net Salary (Take-Home)
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
                  After all deductions for {new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}
                </div>
              </div>
              <div style={{
                fontSize: "clamp(22px, 5vw, 30px)",
                fontWeight: 800,
                color: "#4ade80",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "-0.02em",
              }}>
                {formatCurrency(netSalary)}
              </div>
            </div>

            {/* Signatures */}
            <div style={{
              borderTop: "1px solid #e2e8f0",
              paddingTop: 24,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 24,
            }}>
              {["Employee Signature", "HR Manager", "Authorized Signatory"].map((label) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div className="signature-line" />
                  <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 20 }}>
              <div style={{
                display: "inline-block",
                fontSize: 11, color: "#cbd5e1",
                padding: "6px 14px",
                border: "1px solid #f1f5f9",
                borderRadius: 6,
              }}>
                This is a computer-generated document. No signature is required.
              </div>
            </div>
          </div>

          {/* ── Footer ── */}
          <div
            className="no-print"
            style={{
              borderTop: "1px solid #e2e8f0",
              padding: "14px 24px",
              display: "flex",
              justifyContent: "flex-end",
              background: "#fafafa",
              borderRadius: "0 0 16px 16px",
            }}
          >
            <button className="slip-action-btn btn-close" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}