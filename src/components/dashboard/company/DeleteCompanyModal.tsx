"use client"

import { useState } from "react"
import { X, Trash2, AlertTriangle, Building, FileText, Globe, Mail, Users, TrendingUp, Phone } from "lucide-react"

interface DeleteCompanyModalProps {
  isOpen: boolean
  onClose: () => void
  company: any
}

export function DeleteCompanyModal({ isOpen, onClose, company }: DeleteCompanyModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const [inputError, setInputError] = useState("")

  if (!isOpen || !company) return null

  const isConfirmed = confirmText === company.id

  const handleDelete = async () => {
    if (!isConfirmed) {
      setInputError("Company ID does not match. Please try again.")
      return
    }
    setIsDeleting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1600))
      onClose()
      setConfirmText("")
    } catch {
      alert("Failed to delete company. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmText(e.target.value)
    if (inputError) setInputError("")
  }

  const details = [
    { icon: FileText, label: "Company ID", value: company.id },
    { icon: Building, label: "Company Name", value: company.name },
    { icon: Globe, label: "Industry", value: company.industry },
    { icon: Phone, label: "Phone Number", value: company.contact },
    { icon: Users, label: "Owner Name", value: company.ownerName },
    { icon: TrendingUp, label: "Rating", value: `${company.rating} / 5` },
    { icon: Mail, label: "Email", value: company.email },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&display=swap');

        .delete-company-modal-overlay * {
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
        }

        .delete-company-modal-fade {
          animation: deleteCompanyFadeIn 0.2s ease;
        }

        @keyframes deleteCompanyFadeIn {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        @keyframes pulseWarn {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.25); }
          50%       { box-shadow: 0 0 0 10px rgba(239,68,68,0); }
        }

        .warn-icon-ring {
          width: 72px; height: 72px;
          border-radius: 50%;
          background: #fef2f2;
          border: 2px solid #fecaca;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
          animation: pulseWarn 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        .delete-company-detail-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 0;
          border-bottom: 1px solid #fecaca;
        }

        .delete-company-detail-row:last-child { border-bottom: none; }
        .delete-company-detail-row:first-child { padding-top: 0; }

        .delete-company-confirm-input {
          width: 100%;
          height: 44px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          padding: 0 14px;
          font-size: 13.5px;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.05em;
          color: #0f172a;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }

        .delete-company-confirm-input:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
        }

        .delete-company-confirm-input.error {
          border-color: #ef4444;
          background: #fff5f5;
        }

        .delete-company-confirm-input.success {
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22,163,74,0.1);
        }

        .del-company-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 11px 20px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: 'DM Sans', sans-serif;
          flex: 1;
        }

        .del-company-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }

        .del-company-btn:active:not(:disabled) { transform: translateY(0); }

        .del-company-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none !important; box-shadow: none !important; }

        .btn-del-cancel {
          background: transparent;
          color: #475569;
          border: 1.5px solid #e2e8f0;
        }

        .btn-del-cancel:hover:not(:disabled) { background: #f8fafc; }

        .btn-del-confirm {
          background: linear-gradient(135deg, #dc2626, #ef4444);
          color: #fff;
        }

        .spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        .id-badge {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
          padding: 2px 8px;
          border-radius: 5px;
          letter-spacing: 0.04em;
        }
      `}</style>

      <div
        className="delete-company-modal-overlay"
        style={{
          position: "fixed", inset: 0,
          background: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 50, padding: 16,
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="delete-company-modal-fade"
          style={{
            background: "#fff",
            borderRadius: 16,
            width: "100%",
            maxWidth: 460,
            boxShadow: "0 24px 60px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{
            padding: "16px 20px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9,
                background: "linear-gradient(135deg, #dc2626, #ef4444)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Trash2 style={{ width: 16, height: 16, color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>Delete Company</div>
                <div style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 1 }}>This action is permanent and irreversible</div>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 32, height: 32, borderRadius: 7,
                border: "1.5px solid #e2e8f0", background: "transparent",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <X style={{ width: 15, height: 15, color: "#64748b" }} />
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: "28px 24px 24px" }}>

            {/* Warning Icon */}
            <div className="warn-icon-ring">
              <AlertTriangle style={{ width: 30, height: 30, color: "#dc2626" }} />
            </div>

            {/* Warning Text */}
            <div style={{ textAlign: "center", marginBottom: 22 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8, lineHeight: 1.4 }}>
                Permanently delete this company?
              </div>
              <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>
                All records including company data, associated employees, documents, and transaction history will be <strong style={{ color: "#dc2626" }}>permanently removed</strong> and cannot be recovered.
              </div>
            </div>

            {/* Company Details Card */}
            <div style={{
              background: "#fff5f5",
              border: "1.5px solid #fecaca",
              borderRadius: 12,
              padding: "4px 16px 12px",
              marginBottom: 22,
            }}>
              {details.map(({ icon: Icon, label, value }) => (
                <div className="delete-company-detail-row" key={label}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 7,
                    background: "#fecaca",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon style={{ width: 13, height: 13, color: "#dc2626" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", flex: 1, alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                    <span style={{ fontSize: 11.5, color: "#94a3b8", fontWeight: 500 }}>{label}</span>
                    <span style={{ fontSize: 13, color: "#1e293b", fontWeight: 600 }}>{value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Confirm Input */}
            <div style={{ marginBottom: 22 }}>
              <label style={{
                display: "block",
                fontSize: 12, fontWeight: 600,
                color: "#475569",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 8,
              }}>
                Type &nbsp;<span className="id-badge">{company.id}</span>&nbsp; to confirm deletion
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={handleInputChange}
                placeholder="Enter company ID"
                className={`delete-company-confirm-input${inputError ? " error" : ""}${isConfirmed ? " success" : ""}`}
              />
              {inputError && (
                <div style={{ fontSize: 11.5, color: "#ef4444", fontWeight: 500, marginTop: 5 }}>
                  {inputError}
                </div>
              )}
              {isConfirmed && (
                <div style={{ fontSize: 11.5, color: "#16a34a", fontWeight: 500, marginTop: 5 }}>
                  Ìd confirmed â you may proceed with deletion
                </div>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10 }}>
              <button className="del-company-btn btn-del-cancel" onClick={onClose} type="button">
                Cancel
              </button>
              <button
                className="del-company-btn btn-del-confirm"
                onClick={handleDelete}
                disabled={isDeleting || !isConfirmed}
                type="button"
              >
                {isDeleting
                  ? <><span className="spinner" /> Deleting...</>
                  : <><Trash2 style={{ width: 15, height: 15 }} /> Delete Company</>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
