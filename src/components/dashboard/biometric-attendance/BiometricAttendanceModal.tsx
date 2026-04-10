"use client"

import { useState } from "react"
import { X, Fingerprint, Clock, MapPin, Wifi, Shield, Activity, Edit3, Trash2, CheckCircle, Save } from "lucide-react"

interface BiometricAttendance {
  id: number
  employeeId: string
  name: string
  department: string
  inTime: string
  outTime: string
  date: string
  status: "present" | "absent" | "late" | "leave"
  location: string
  workHours: number
  device: string
  geofenceStatus: "inside" | "outside" | "exempt"
}

interface BiometricAttendanceModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "view" | "edit" | "delete"
  attendance: BiometricAttendance | null
  onSave?: (attendance: BiometricAttendance) => void
  onDelete?: (id: number) => void
}

export default function BiometricAttendanceModal({ isOpen, onClose, mode, attendance, onSave, onDelete }: BiometricAttendanceModalProps) {
  const [formData, setFormData] = useState({
    inTime: attendance?.inTime || "",
    outTime: attendance?.outTime || "",
    status: attendance?.status || "present" as "present" | "absent" | "late" | "leave",
    location: attendance?.location || "",
    device: attendance?.device || "",
    geofenceStatus: attendance?.geofenceStatus || "inside" as "inside" | "outside" | "exempt"
  })
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen || !attendance) return null

  const devices = ["Fingerprint Scanner-01", "Fingerprint Scanner-02", "Face Recognition-01", "Face Recognition-02"]
  const locations = ["Main Gate", "Side Gate", "Rear Entrance", "Remote Office"]
  const statuses = ["present", "absent", "late", "leave"] as const
  const geofenceStatuses = ["inside", "outside", "exempt"] as const

  const statusConfig = {
    present: { label: "Present", color: "#16a34a", bg: "#dcfce7", accent: "linear-gradient(135deg,#16a34a,#22c55e)" },
    absent: { label: "Absent", color: "#dc2626", bg: "#fef2f2", accent: "linear-gradient(135deg,#dc2626,#ef4444)" },
    late: { label: "Late", color: "#d97706", bg: "#fef3c7", accent: "linear-gradient(135deg,#d97706,#f59e0b)" },
    leave: { label: "On Leave", color: "#2563eb", bg: "#dbeafe", accent: "linear-gradient(135deg,#2563eb,#3b82f6)" },
  }
  const sc = statusConfig[formData.status]

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.inTime.trim()) e.inTime = "Check-in time is required"
    if (mode === "edit" && !formData.outTime.trim()) e.outTime = "Check-out time is required"
    if (!formData.location.trim()) e.location = "Location is required"
    return e
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSaved(true)
    setTimeout(() => {
      if (onSave) {
        onSave({
          ...attendance,
          inTime: formData.inTime,
          outTime: formData.outTime,
          status: formData.status,
          location: formData.location,
          device: formData.device,
          geofenceStatus: formData.geofenceStatus,
          workHours: calculateWorkHours(formData.inTime, formData.outTime)
        })
      }
      onClose()
      setSaved(false)
    }, 900)
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(attendance.id)
      onClose()
    }
  }

  const calculateWorkHours = (inTime: string, outTime: string): number => {
    if (!inTime || !outTime || outTime === "-") return 0
    // Simple calculation - in production would use actual time parsing
    return 8 // Placeholder
  }

  const set = (k: string, v: any) => {
    setFormData(p => ({ ...p, [k]: v }))
    if (errors[k]) setErrors(p => { const n = { ...p }; delete n[k]; return n })
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&display=swap');

        .bio * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        .bio-fade { animation: bioFade 0.22s ease; }
        @keyframes bioFade {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .bio-input {
          width: 100%; height: 44px;
          border-radius: 10px; border: 1.5px solid #e2e8f0;
          background: #fff; padding: 0 14px;
          font-size: 13.5px; color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.15s, box-shadow 0.15s;
        }
        .bio-input:focus { border-color: #334155; box-shadow: 0 0 0 3px rgba(51,65,85,0.08); }
        .bio-input:disabled { background: #f8fafc; cursor: not-allowed; }
        .bio-input.err   { border-color: #ef4444; background: #fff5f5; }

        .bio-select {
          width: 100%; height: 44px;
          border-radius: 10px; border: 1.5px solid #e2e8f0;
          background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 14px center;
          padding: 0 38px 0 14px;
          font-size: 13.5px; color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          outline: none; cursor: pointer; appearance: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .bio-select:focus { border-color: #334155; box-shadow: 0 0 0 3px rgba(51,65,85,0.08); }
        .bio-select:disabled { background: #f8fafc; cursor: not-allowed; opacity: 0.6; }

        .bio-label {
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.07em;
          color: #64748b; display: flex; align-items: center; gap: 6px;
          margin-bottom: 7px;
        }

        .bio-status-pill {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 10px 8px; border-radius: 10px;
          border: 1.5px solid #e2e8f0; background: #f8fafc;
          font-size: 12.5px; font-weight: 600; color: #64748b;
          cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif;
        }

        .bio-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 7px;
          padding: 11px 20px; border-radius: 10px; font-size: 13.5px; font-weight: 600;
          border: none; cursor: pointer; transition: all 0.15s;
          font-family: 'DM Sans', sans-serif; flex: 1;
        }
        .bio-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(0,0,0,0.12); }
        .bio-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none !important; }
        .bio-btn-cancel  { background: transparent; color: #475569; border: 1.5px solid #e2e8f0; }
        .bio-btn-cancel:hover { background: #f8fafc; }
        .bio-btn-submit  { background: #0f172a; color: #fff; }
        .bio-btn-saved   { background: #16a34a; color: #fff; }
        .bio-btn-delete  { background: #dc2626; color: #fff; }

        .bio-close {
          width: 34px; height: 34px; border-radius: 8px;
          border: 1.5px solid #e2e8f0; background: transparent;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.15s; flex-shrink: 0;
        }
        .bio-close:hover { background: #f1f5f9; }

        .bio-err-msg { font-size: 11.5px; color: #ef4444; font-weight: 500; margin-top: 4px; }

        .bio-info-row {
          display: flex; align-items: center; gap: 12px; padding: 12px;
          background: #f8fafc; border-radius: 10px;
        }
        .bio-info-icon {
          width: 36px; height: 36px; border-radius: 8px;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .bio-info-content { flex: 1; }
        .bio-info-label { font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
        .bio-info-value { font-size: 14px; color: #0f172a; font-weight: 600; margin-top: 2px; }

        @media (max-width: 540px) {
          .bio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div
        className="bio"
        style={{
          position: "fixed", inset: 0,
          background: "rgba(15,23,42,0.55)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 50, padding: 16,
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="bio-fade"
          style={{
            background: "#fff", borderRadius: 16, width: "100%", maxWidth: mode === "delete" ? 480 : 580,
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
                background: mode === "delete" ? "linear-gradient(135deg,#dc2626,#ef4444)" : sc.accent,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 4px 12px ${mode === "delete" ? "#dc2626" : sc.color}30`,
              }}>
                {mode === "delete" ? <Trash2 style={{ width: 17, height: 17, color: "#fff" }} /> : <Fingerprint style={{ width: 17, height: 17, color: "#fff" }} />}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
                  {mode === "view" ? "View Attendance" : mode === "edit" ? "Edit Attendance" : "Delete Attendance"}
                </div>
                <div style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 1 }}>
                  {mode === "view" ? `Viewing ${attendance.name}'s attendance record`
                    : mode === "edit" ? `Edit ${attendance.name}'s attendance record`
                    : `Delete ${attendance.name}'s attendance record?`}
                </div>
              </div>
            </div>
            <button className="bio-close" onClick={onClose}>
              <X style={{ width: 15, height: 15, color: "#64748b" }} />
            </button>
          </div>

          {mode === "delete" ? (
            <div style={{ padding: "24px", textAlign: "center" }}>
              <div style={{
                width: 64, height: 64, borderRadius: 16,
                background: "#fef2f2",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px"
              }}>
                <Trash2 style={{ width: 28, height: 28, color: "#dc2626" }} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>
                Delete Attendance Record
              </h3>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, marginBottom: 24 }}>
                Are you sure you want to delete this attendance record for <strong>{attendance.name}</strong>? 
                This action cannot be undone and will remove all associated data from the system.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="bio-btn bio-btn-cancel" onClick={onClose}>
                  Cancel
                </button>
                <button className="bio-btn bio-btn-delete" onClick={handleDelete}>
                  <Trash2 style={{ width: 15, height: 15 }} /> Delete Record
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} style={{ padding: "22px", display: "flex", flexDirection: "column", gap: 18 }}>
              {/* View Mode Info */}
              {mode === "view" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div className="bio-info-row">
                    <div className="bio-info-icon"><Fingerprint style={{ width: 18, height: 18, color: "#fff" }} /></div>
                    <div className="bio-info-content">
                      <div className="bio-info-label">Employee ID</div>
                      <div className="bio-info-value">{attendance.employeeId}</div>
                    </div>
                  </div>
                  <div className="bio-info-row">
                    <div className="bio-info-icon"><Activity style={{ width: 18, height: 18, color: "#fff" }} /></div>
                    <div className="bio-info-content">
                      <div className="bio-info-label">Department</div>
                      <div className="bio-info-value">{attendance.department}</div>
                    </div>
                  </div>
                  <div className="bio-info-row">
                    <div className="bio-info-icon"><Clock style={{ width: 18, height: 18, color: "#fff" }} /></div>
                    <div className="bio-info-content">
                      <div className="bio-info-label">Work Hours</div>
                      <div className="bio-info-value">{attendance.workHours > 0 ? `${attendance.workHours} hours` : "Not completed"}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Check In/Out */}
              <div className="bio-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <div className="bio-label"><Clock style={{ width: 12, height: 12 }} />Check In Time</div>
                  <input
                    className={`bio-input${mode === "view" ? "" : errors.inTime ? " err" : ""}`}
                    type="time"
                    value={formData.inTime}
                    onChange={(e) => set("inTime", e.target.value)}
                    disabled={mode === "view"}
                  />
                  {errors.inTime && <div className="bio-err-msg">{errors.inTime}</div>}
                </div>

                <div>
                  <div className="bio-label"><Clock style={{ width: 12, height: 12 }} />Check Out Time</div>
                  <input
                    className={`bio-input${mode === "view" ? "" : errors.outTime ? " err" : ""}`}
                    type="time"
                    value={formData.outTime}
                    onChange={(e) => set("outTime", e.target.value)}
                    disabled={mode === "view"}
                  />
                  {errors.outTime && <div className="bio-err-msg">{errors.outTime}</div>}
                </div>
              </div>

              {/* Location + Device */}
              <div className="bio-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <div className="bio-label"><MapPin style={{ width: 12, height: 12 }} />Location</div>
                  <select
                    className={`bio-select${mode === "view" ? "" : errors.location ? " err" : ""}`}
                    value={formData.location}
                    onChange={(e) => set("location", e.target.value)}
                    disabled={mode === "view"}
                  >
                    {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                  {errors.location && <div className="bio-err-msg">{errors.location}</div>}
                </div>

                <div>
                  <div className="bio-label"><Fingerprint style={{ width: 12, height: 12 }} />Device</div>
                  <select
                    className="bio-select"
                    value={formData.device}
                    onChange={(e) => set("device", e.target.value)}
                    disabled={mode === "view"}
                  >
                    {devices.map(dev => <option key={dev} value={dev}>{dev}</option>)}
                  </select>
                </div>
              </div>

              {/* Status */}
              <div>
                <div className="bio-label"><Activity style={{ width: 12, height: 12 }} />Status</div>
                <div style={{ display: "flex", gap: 10 }}>
                  {statuses.map((s) => {
                    const cfg = statusConfig[s]
                    const active = formData.status === s
                    return (
                      <button
                        key={s} type="button"
                        className="bio-status-pill"
                        onClick={() => mode !== "view" && set("status", s)}
                        style={active ? {
                          background: cfg.bg, color: cfg.color,
                          borderColor: cfg.color + "60",
                        } : mode === "view" ? { opacity: 0.6 } : {}}
                        disabled={mode === "view"}
                      >
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: active ? cfg.color : "#cbd5e1", flexShrink: 0 }} />
                        {cfg.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Geofence Status */}
              <div>
                <div className="bio-label"><Wifi style={{ width: 12, height: 12 }} />Geofence Status</div>
                <div style={{ display: "flex", gap: 10 }}>
                  {geofenceStatuses.map((s) => {
                    const active = formData.geofenceStatus === s
                    const color = s === "inside" ? "#16a34a" : s === "outside" ? "#dc2626" : "#64748b"
                    return (
                      <button
                        key={s} type="button"
                        className="bio-status-pill"
                        onClick={() => mode !== "view" && set("geofenceStatus", s)}
                        style={active ? {
                          background: s === "inside" ? "#dcfce7" : s === "outside" ? "#fef2f2" : "#f1f5f9",
                          color: color,
                          borderColor: color + "60",
                        } : mode === "view" ? { opacity: 0.6 } : {}}
                        disabled={mode === "view"}
                      >
                        {s === "inside" && <Wifi style={{ width: 12, height: 12 }} />}
                        {s === "outside" && <Shield style={{ width: 12, height: 12 }} />}
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Actions */}
              {mode !== "view" && (
                <div style={{ display: "flex", gap: 10, paddingTop: 4, borderTop: "1px solid #f1f5f9" }}>
                  <button type="button" className="bio-btn bio-btn-cancel" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className={`bio-btn ${saved ? "bio-btn-saved" : "bio-btn-submit"}`} disabled={saved}>
                    {saved
                      ? <><CheckCircle style={{ width: 15, height: 15 }} /> Saved!</>
                      : <><Save style={{ width: 15, height: 15 }} /> Save Changes</>
                    }
                  </button>
                </div>
              )}

              {mode === "view" && (
                <div style={{ display: "flex", gap: 10, paddingTop: 4, borderTop: "1px solid #f1f5f9" }}>
                  <button type="button" className="bio-btn bio-btn-cancel" onClick={onClose}>
                    Close
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </>
  )
}
