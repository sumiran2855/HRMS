"use client"

import { useState } from "react"
import { X, Building2, Users, Mail, Phone, CheckCircle } from "lucide-react"
import { Department } from "@/types/department.types"

interface DepartmentModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (department: Omit<Department, "id">) => void
  editingDepartment?: Department | null
}

export default function DepartmentModal({ isOpen, onClose, onSave, editingDepartment }: DepartmentModalProps) {
  const [formData, setFormData] = useState({
    name: editingDepartment?.name || "",
    description: editingDepartment?.description || "",
    head: editingDepartment?.head || "",
    employeeCount: editingDepartment?.employeeCount || 0,
    email: editingDepartment?.email || "",
    phone: editingDepartment?.phone || "",
    status: editingDepartment?.status || "active" as "active" | "inactive"
  })
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const statusConfig = {
    active: { label: "Active", color: "#16a34a", bg: "#dcfce7", accent: "linear-gradient(135deg,#16a34a,#22c55e)" },
    inactive: { label: "Inactive", color: "#64748b", bg: "#f1f5f9", accent: "linear-gradient(135deg,#64748b,#94a3b8)" },
  }
  const sc = statusConfig[formData.status]

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.name.trim()) e.name = "Department name is required"
    if (!formData.head.trim()) e.head = "Department head is required"
    if (!formData.email.trim()) e.email = "Email is required"
    if (!formData.phone.trim()) e.phone = "Phone is required"
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSaved(true)
    setTimeout(() => {
      onSave(formData)
      onClose()
      setSaved(false)
    }, 900)
  }

  const set = (k: string, v: any) => {
    setFormData(p => ({ ...p, [k]: v }))
    if (errors[k]) setErrors(p => { const n = { ...p }; delete n[k]; return n })
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&display=swap');

        .dm * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        .dm-fade { animation: dmFade 0.22s ease; }
        @keyframes dmFade {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .dm-input {
          width: 100%; height: 44px;
          border-radius: 10px; border: 1.5px solid #e2e8f0;
          background: #fff; padding: 0 14px;
          font-size: 13.5px; color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.15s, box-shadow 0.15s;
          appearance: none;
        }
        .dm-input:focus { border-color: #334155; box-shadow: 0 0 0 3px rgba(51,65,85,0.08); }
        .dm-input.err   { border-color: #ef4444; background: #fff5f5; }

        .dm-textarea {
          width: 100%; border-radius: 10px; border: 1.5px solid #e2e8f0;
          background: #fff; padding: 12px 14px;
          font-size: 13.5px; color: #0f172a; line-height: 1.65;
          font-family: 'DM Sans', sans-serif;
          outline: none; resize: vertical;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .dm-textarea:focus { border-color: #334155; box-shadow: 0 0 0 3px rgba(51,65,85,0.08); }

        .dm-label {
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.07em;
          color: #64748b; display: flex; align-items: center; gap: 6px;
          margin-bottom: 7px;
        }

        .dm-status-pill {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 10px 8px; border-radius: 10px;
          border: 1.5px solid #e2e8f0; background: #f8fafc;
          font-size: 12.5px; font-weight: 600; color: #64748b;
          cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif;
        }

        .dm-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 7px;
          padding: 11px 20px; border-radius: 10px; font-size: 13.5px; font-weight: 600;
          border: none; cursor: pointer; transition: all 0.15s;
          font-family: 'DM Sans', sans-serif; flex: 1;
        }
        .dm-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(0,0,0,0.12); }
        .dm-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none !important; }
        .dm-btn-cancel  { background: transparent; color: #475569; border: 1.5px solid #e2e8f0; }
        .dm-btn-cancel:hover { background: #f8fafc; }
        .dm-btn-submit  { background: #0f172a; color: #fff; }
        .dm-btn-saved   { background: #16a34a; color: #fff; }

        .dm-close {
          width: 34px; height: 34px; border-radius: 8px;
          border: 1.5px solid #e2e8f0; background: transparent;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.15s; flex-shrink: 0;
        }
        .dm-close:hover { background: #f1f5f9; }

        .dm-err-msg { font-size: 11.5px; color: #ef4444; font-weight: 500; margin-top: 4px; }

        @media (max-width: 540px) {
          .dm-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div
        className="dm"
        style={{
          position: "fixed", inset: 0,
          background: "rgba(15,23,42,0.55)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 50, padding: 16,
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="dm-fade"
          style={{
            background: "#fff", borderRadius: 16, width: "100%", maxWidth: 560,
            maxHeight: "92vh", overflowY: "auto",
            boxShadow: "0 24px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
            display: "flex", flexDirection: "column",
          }}
        >
          {/* Header */}
          <div style={{
            position: "sticky", top: 0, zIndex: 10,
            background: "#fff", borderBottom: "1px solid #e2e8f0",
            padding: "16px 22px", borderRadius: "16px 16px 0 0",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: sc.accent,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 4px 12px ${sc.color}30`,
                transition: "background 0.3s",
              }}>
                <Building2 style={{ width: 17, height: 17, color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
                  {editingDepartment ? "Edit Department" : "Add Department"}
                </div>
                <div style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 1 }}>
                  {editingDepartment ? "Update department details" : "Create a new department"}
                </div>
              </div>
            </div>
            <button className="dm-close" onClick={onClose}>
              <X style={{ width: 15, height: 15, color: "#64748b" }} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ padding: "22px", display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Department Name */}
            <div>
              <div className="dm-label"><Building2 style={{ width: 12, height: 12 }} />Department Name</div>
              <input
                className={`dm-input${errors.name ? " err" : ""}`}
                type="text"
                value={formData.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. Human Resources, Engineering, Sales…"
              />
              {errors.name && <div className="dm-err-msg">{errors.name}</div>}
            </div>

            {/* Description */}
            <div>
              <div className="dm-label"><Building2 style={{ width: 12, height: 12 }} />Description</div>
              <textarea
                className="dm-textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Describe the department's purpose and responsibilities…"
              />
            </div>

            {/* Department Head + Employee Count row */}
            <div className="dm-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <div className="dm-label"><Users style={{ width: 12, height: 12 }} />Department Head</div>
                <input
                  className={`dm-input${errors.head ? " err" : ""}`}
                  type="text"
                  value={formData.head}
                  onChange={(e) => set("head", e.target.value)}
                  placeholder="Full name"
                />
                {errors.head && <div className="dm-err-msg">{errors.head}</div>}
              </div>

              <div>
                <div className="dm-label"><Users style={{ width: 12, height: 12 }} />Employee Count</div>
                <input
                  className="dm-input"
                  type="number"
                  value={formData.employeeCount}
                  onChange={(e) => set("employeeCount", parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            {/* Email + Phone row */}
            <div className="dm-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <div className="dm-label"><Mail style={{ width: 12, height: 12 }} />Email</div>
                <input
                  className={`dm-input${errors.email ? " err" : ""}`}
                  type="email"
                  value={formData.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="dept@company.com"
                />
                {errors.email && <div className="dm-err-msg">{errors.email}</div>}
              </div>

              <div>
                <div className="dm-label"><Phone style={{ width: 12, height: 12 }} />Phone</div>
                <input
                  className={`dm-input${errors.phone ? " err" : ""}`}
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+1 234-567-8900"
                />
                {errors.phone && <div className="dm-err-msg">{errors.phone}</div>}
              </div>
            </div>

            {/* Status pill selector */}
            <div>
              <div className="dm-label"><Building2 style={{ width: 12, height: 12 }} />Status</div>
              <div style={{ display: "flex", gap: 10 }}>
                {(["active", "inactive"] as const).map((s) => {
                  const cfg = statusConfig[s]
                  const active = formData.status === s
                  return (
                    <button
                      key={s} type="button"
                      className="dm-status-pill"
                      onClick={() => set("status", s)}
                      style={active ? {
                        background: cfg.bg, color: cfg.color,
                        borderColor: cfg.color + "60",
                      } : {}}
                    >
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: active ? cfg.color : "#cbd5e1", flexShrink: 0 }} />
                      {cfg.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10, paddingTop: 4, borderTop: "1px solid #f1f5f9" }}>
              <button type="button" className="dm-btn dm-btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className={`dm-btn ${saved ? "dm-btn-saved" : "dm-btn-submit"}`} disabled={saved}>
                {saved
                  ? <><CheckCircle style={{ width: 15, height: 15 }} /> Saved!</>
                  : <><Building2 style={{ width: 15, height: 15 }} />{editingDepartment ? "Update Department" : "Add Department"}</>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
