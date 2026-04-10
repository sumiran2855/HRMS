"use client"

import { useState } from "react"
import { X, Trash2, AlertTriangle, Building2, FileText, Globe, Mail, Users } from "lucide-react"

interface DeleteProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: any
}

export function DeleteProjectModal({ isOpen, onClose, project }: DeleteProjectModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const [inputError, setInputError] = useState("")

  if (!isOpen || !project) return null

  const isConfirmed = confirmText === project.name

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmText(e.target.value)
    if (inputError) setInputError("")
  }

  const handleDelete = async () => {
    if (!isConfirmed) {
      setInputError("Project name does not match. Please try again.")
      return
    }
    setIsDeleting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1600))
      onClose()
      setConfirmText("")
    } catch {
      alert("Failed to delete project. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&display=swap');

        .dpm * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        .dpm-fade {
          animation: dpmFade 0.2s ease;
        }
        @keyframes dpmFade {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes dpmPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.22); }
          50%       { box-shadow: 0 0 0 9px rgba(239,68,68,0); }
        }
        @keyframes dpmSpin { to { transform: rotate(360deg); } }

        .dpm-input {
          width: 100%;
          height: 44px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          padding: 0 14px;
          font-size: 13px;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.04em;
          color: #0f172a;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
        }
        .dpm-input:focus          { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.1); }
        .dpm-input.has-error      { border-color: #ef4444; background: #fff5f5; }
        .dpm-input.is-confirmed   { border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,0.08); }

        .dpm-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 7px;
          padding: 10px 20px; border-radius: 10px;
          font-size: 13px; font-weight: 600; border: none; cursor: pointer;
          transition: all 0.15s; font-family: 'DM Sans', sans-serif;
        }
        .dpm-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none !important; box-shadow: none !important; }
        .dpm-btn-cancel  { background: transparent; color: #475569; border: 1.5px solid #e2e8f0; }
        .dpm-btn-cancel:hover:not(:disabled)  { background: #f8fafc; transform: translateY(-1px); }
        .dpm-btn-danger  { background: linear-gradient(135deg, #dc2626, #ef4444); color: #fff; }
        .dpm-btn-danger:hover:not(:disabled)  { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(220,38,38,0.35); }

        .dpm-close-btn {
          width: 32px; height: 32px; border-radius: 7px;
          border: 1.5px solid #e2e8f0; background: transparent; cursor: pointer;
          display: flex; align-items: center; justify-content: center; transition: background 0.15s;
        }
        .dpm-close-btn:hover { background: #f1f5f9; }

        .dpm-name-badge {
          font-family: 'DM Mono', monospace;
          font-size: 11px; font-weight: 500;
          background: #fef2f2; color: #dc2626;
          border: 1px solid #fecaca;
          padding: 2px 8px; border-radius: 5px;
          letter-spacing: 0.03em;
        }
      `}</style>

      <div
        className="dpm"
        style={{
          position: "fixed", inset: 0,
          background: "rgba(15,23,42,0.58)",
          backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 50, padding: 16,
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="dpm-fade"
          style={{
            background: "#fff", borderRadius: 16, width: "100%", maxWidth: 440,
            boxShadow: "0 24px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{
            padding: "15px 20px", borderBottom: "1px solid #e2e8f0",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9,
                background: "linear-gradient(135deg, #dc2626, #ef4444)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Trash2 style={{ width: 15, height: 15, color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>Delete Project</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>Permanent and irreversible action</div>
              </div>
            </div>
            <button className="dpm-close-btn" onClick={onClose}>
              <X style={{ width: 15, height: 15, color: "#64748b" }} />
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Warning */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12 }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "#fef2f2", border: "2px solid #fecaca",
                display: "flex", alignItems: "center", justifyContent: "center",
                animation: "dpmPulse 2s ease-in-out infinite",
              }}>
                <AlertTriangle style={{ width: 28, height: 28, color: "#dc2626" }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>
                  Delete "{project.name}"?
                </div>
                <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>
                  This will permanently delete the project and all associated data. <strong style={{ color: "#dc2626" }}>This cannot be undone.</strong>
                </div>
              </div>
            </div>

            {/* Compact project card */}
            <div style={{
              background: "#fff5f5", border: "1.5px solid #fecaca",
              borderRadius: 12, padding: "14px 16px",
              display: "flex", flexDirection: "column", gap: 10,
            }}>
              {[
                { icon: FileText,  label: "Project ID",    value: project.id },
                { icon: Building2, label: "Project",      value: project.name },
                { icon: Globe,     label: "Client",        value: project.client },
                { icon: Users,     label: "Team Size",    value: `${project.employees} members` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: 6, background: "#fecaca",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Icon style={{ width: 12, height: 12, color: "#dc2626" }} />
                    </div>
                    <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>{label}</span>
                  </div>
                  <span style={{ fontSize: 13, color: "#1e293b", fontWeight: 600, textAlign: "right", wordBreak: "break-all" }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Confirm input */}
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Type &nbsp;<span className="dpm-name-badge">{project.name}</span>&nbsp; to confirm
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={handleInputChange}
                placeholder="Enter project name"
                disabled={isDeleting}
                className={`dpm-input${inputError ? " has-error" : ""}${isConfirmed ? " is-confirmed" : ""}`}
              />
              {inputError && (
                <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 500, marginTop: 4 }}>{inputError}</div>
              )}
              {isConfirmed && (
                <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 500, marginTop: 4 }}>✓ Confirmed — ready to delete</div>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10 }}>
              <button className="dpm-btn dpm-btn-cancel" onClick={onClose} disabled={isDeleting} style={{ flex: 1 }}>
                Cancel
              </button>
              <button
                className="dpm-btn dpm-btn-danger"
                onClick={handleDelete}
                disabled={isDeleting || !isConfirmed}
                style={{ flex: 1 }}
              >
                {isDeleting ? (
                  <>
                    <span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "dpmSpin 0.7s linear infinite" }} />
                    Deleting…
                  </>
                ) : (
                  <>
                    <Trash2 style={{ width: 14, height: 14 }} />
                    Delete Project
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
