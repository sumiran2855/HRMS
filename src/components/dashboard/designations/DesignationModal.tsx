"use client"

import { useState } from "react"
import { X, Briefcase, DollarSign, Users, CheckCircle, Plus, X as XIcon } from "lucide-react"

interface Designation {
  id: number
  title: string
  department: string
  level: string
  employeeCount: number
  description: string
  skills: string[]
  minSalary: number
  maxSalary: number
  status: "active" | "inactive"
  createdAt: string
}

interface DesignationModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (designation: Omit<Designation, "id" | "createdAt">) => void
  editingDesignation?: Designation | null
}

export default function DesignationModal({ isOpen, onClose, onSave, editingDesignation }: DesignationModalProps) {
  const [formData, setFormData] = useState({
    title: editingDesignation?.title || "",
    department: editingDesignation?.department || "",
    level: editingDesignation?.level || "",
    employeeCount: editingDesignation?.employeeCount || 0,
    description: editingDesignation?.description || "",
    skills: editingDesignation?.skills.join(", ") || "",
    minSalary: editingDesignation?.minSalary || 0,
    maxSalary: editingDesignation?.maxSalary || 0,
    status: editingDesignation?.status || "active" as "active" | "inactive"
  })
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const departments = ["Engineering", "Product", "Design", "Human Resources", "Marketing", "Sales", "Finance"]
  const levels = ["Junior", "Mid", "Senior", "Lead", "Principal"]

  const statusConfig = {
    active: { label: "Active", color: "#16a34a", bg: "#dcfce7", accent: "linear-gradient(135deg,#16a34a,#22c55e)" },
    inactive: { label: "Inactive", color: "#64748b", bg: "#f1f5f9", accent: "linear-gradient(135deg,#64748b,#94a3b8)" },
  }
  const sc = statusConfig[formData.status]

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.title.trim()) e.title = "Title is required"
    if (!formData.department.trim()) e.department = "Department is required"
    if (!formData.level.trim()) e.level = "Level is required"
    if (formData.minSalary < 0) e.minSalary = "Minimum salary must be positive"
    if (formData.maxSalary < formData.minSalary) e.maxSalary = "Maximum salary must be greater than minimum"
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSaved(true)
    setTimeout(() => {
      onSave({
        ...formData,
        skills: formData.skills.split(",").map(s => s.trim()).filter(s => s),
        employeeCount: formData.employeeCount || 0,
        minSalary: formData.minSalary || 0,
        maxSalary: formData.maxSalary || 0
      })
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

        .desig * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        .desig-fade { animation: desigFade 0.22s ease; }
        @keyframes desigFade {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .desig-input {
          width: 100%; height: 44px;
          border-radius: 10px; border: 1.5px solid #e2e8f0;
          background: #fff; padding: 0 14px;
          font-size: 13.5px; color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.15s, box-shadow 0.15s;
          appearance: none;
        }
        .desig-input:focus { border-color: #334155; box-shadow: 0 0 0 3px rgba(51,65,85,0.08); }
        .desig-input.err   { border-color: #ef4444; background: #fff5f5; }

        .desig-select {
          width: 100%; height: 44px;
          border-radius: 10px; border: 1.5px solid #e2e8f0;
          background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 14px center;
          padding: 0 38px 0 14px;
          font-size: 13.5px; color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          outline: none; cursor: pointer; appearance: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .desig-select:focus { border-color: #334155; box-shadow: 0 0 0 3px rgba(51,65,85,0.08); }

        .desig-textarea {
          width: 100%; border-radius: 10px; border: 1.5px solid #e2e8f0;
          background: #fff; padding: 12px 14px;
          font-size: 13.5px; color: #0f172a; line-height: 1.65;
          font-family: 'DM Sans', sans-serif;
          outline: none; resize: vertical;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .desig-textarea:focus { border-color: #334155; box-shadow: 0 0 0 3px rgba(51,65,85,0.08); }

        .desig-label {
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.07em;
          color: #64748b; display: flex; align-items: center; gap: 6px;
          margin-bottom: 7px;
        }

        .desig-level-pill, .desig-dept-pill {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 10px 8px; border-radius: 10px;
          border: 1.5px solid #e2e8f0; background: #f8fafc;
          font-size: 12.5px; font-weight: 600; color: #64748b;
          cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif;
        }

        .desig-status-pill {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 10px 8px; border-radius: 10px;
          border: 1.5px solid #e2e8f0; background: #f8fafc;
          font-size: 12.5px; font-weight: 600; color: #64748b;
          cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif;
        }

        .desig-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 7px;
          padding: 11px 20px; border-radius: 10px; font-size: 13.5px; font-weight: 600;
          border: none; cursor: pointer; transition: all 0.15s;
          font-family: 'DM Sans', sans-serif; flex: 1;
        }
        .desig-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(0,0,0,0.12); }
        .desig-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none !important; }
        .desig-btn-cancel  { background: transparent; color: #475569; border: 1.5px solid #e2e8f0; }
        .desig-btn-cancel:hover { background: #f8fafc; }
        .desig-btn-submit  { background: #0f172a; color: #fff; }
        .desig-btn-saved   { background: #16a34a; color: #fff; }

        .desig-close {
          width: 34px; height: 34px; border-radius: 8px;
          border: 1.5px solid #e2e8f0; background: transparent;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.15s; flex-shrink: 0;
        }
        .desig-close:hover { background: #f1f5f9; }

        .desig-err-msg { font-size: 11.5px; color: #ef4444; font-weight: 500; margin-top: 4px; }

        @media (max-width: 540px) {
          .desig-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div
        className="desig"
        style={{
          position: "fixed", inset: 0,
          background: "rgba(15,23,42,0.55)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 50, padding: 16,
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="desig-fade"
          style={{
            background: "#fff", borderRadius: 16, width: "100%", maxWidth: 580,
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
                <Briefcase style={{ width: 17, height: 17, color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
                  {editingDesignation ? "Edit Designation" : "Add Designation"}
                </div>
                <div style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 1 }}>
                  {editingDesignation ? "Update designation details" : "Create a new designation"}
                </div>
              </div>
            </div>
            <button className="desig-close" onClick={onClose}>
              <X style={{ width: 15, height: 15, color: "#64748b" }} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ padding: "22px", display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Title */}
            <div>
              <div className="desig-label"><Briefcase style={{ width: 12, height: 12 }} />Designation Title</div>
              <input
                className={`desig-input${errors.title ? " err" : ""}`}
                type="text"
                value={formData.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. Senior Software Engineer, Product Manager…"
              />
              {errors.title && <div className="desig-err-msg">{errors.title}</div>}
            </div>

            {/* Department + Level row */}
            <div className="desig-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <div className="desig-label"><Briefcase style={{ width: 12, height: 12 }} />Department</div>
                <select
                  className={`desig-select${errors.department ? " err" : ""}`}
                  value={formData.department}
                  onChange={(e) => set("department", e.target.value)}
                >
                  <option value="">Select department</option>
                  {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                </select>
                {errors.department && <div className="desig-err-msg">{errors.department}</div>}
              </div>

              <div>
                <div className="desig-label"><Users style={{ width: 12, height: 12 }} />Level</div>
                <select
                  className={`desig-select${errors.level ? " err" : ""}`}
                  value={formData.level}
                  onChange={(e) => set("level", e.target.value)}
                >
                  <option value="">Select level</option>
                  {levels.map(level => <option key={level} value={level}>{level}</option>)}
                </select>
                {errors.level && <div className="desig-err-msg">{errors.level}</div>}
              </div>
            </div>

            {/* Salary Range row */}
            <div className="desig-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <div className="desig-label"><DollarSign style={{ width: 12, height: 12 }} />Min Salary</div>
                <input
                  className={`desig-input${errors.minSalary ? " err" : ""}`}
                  type="number"
                  value={formData.minSalary || ""}
                  onChange={(e) => set("minSalary", parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                />
                {errors.minSalary && <div className="desig-err-msg">{errors.minSalary}</div>}
              </div>

              <div>
                <div className="desig-label"><DollarSign style={{ width: 12, height: 12 }} />Max Salary</div>
                <input
                  className={`desig-input${errors.maxSalary ? " err" : ""}`}
                  type="number"
                  value={formData.maxSalary || ""}
                  onChange={(e) => set("maxSalary", parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                />
                {errors.maxSalary && <div className="desig-err-msg">{errors.maxSalary}</div>}
              </div>
            </div>

            {/* Employee Count */}
            <div>
              <div className="desig-label"><Users style={{ width: 12, height: 12 }} />Employee Count</div>
              <input
                className="desig-input"
                type="number"
                value={formData.employeeCount || ""}
                onChange={(e) => set("employeeCount", parseInt(e.target.value) || 0)}
                placeholder="0"
                min="0"
              />
            </div>

            {/* Skills */}
            <div>
              <div className="desig-label"><Briefcase style={{ width: 12, height: 12 }} />Skills (comma separated)</div>
              <input
                className="desig-input"
                type="text"
                value={formData.skills}
                onChange={(e) => set("skills", e.target.value)}
                placeholder="e.g. React, TypeScript, Node.js…"
              />
            </div>

            {/* Description */}
            <div>
              <div className="desig-label"><Briefcase style={{ width: 12, height: 12 }} />Description</div>
              <textarea
                className="desig-textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Describe the role and responsibilities…"
              />
            </div>

            {/* Status pill selector */}
            <div>
              <div className="desig-label"><Briefcase style={{ width: 12, height: 12 }} />Status</div>
              <div style={{ display: "flex", gap: 10 }}>
                {(["active", "inactive"] as const).map((s) => {
                  const cfg = statusConfig[s]
                  const active = formData.status === s
                  return (
                    <button
                      key={s} type="button"
                      className="desig-status-pill"
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
              <button type="button" className="desig-btn desig-btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className={`desig-btn ${saved ? "desig-btn-saved" : "desig-btn-submit"}`} disabled={saved}>
                {saved
                  ? <><CheckCircle style={{ width: 15, height: 15 }} /> Saved!</>
                  : <><Briefcase style={{ width: 15, height: 15 }} />{editingDesignation ? "Update Designation" : "Add Designation"}</>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
