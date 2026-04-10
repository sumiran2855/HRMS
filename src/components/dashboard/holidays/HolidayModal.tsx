"use client"

import { useState } from "react"
import { X, Calendar, Sparkles, Gift, RefreshCw, CheckCircle } from "lucide-react"

interface Holiday {
  id: string
  name: string
  date: string
  type: "public" | "company" | "optional"
  duration: "full-day" | "half-day"
  description: string
  recurring: boolean
}

interface HolidayModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (holiday: Omit<Holiday, "id">) => void
  editingHoliday?: Holiday | null
}

export default function HolidayModal({ isOpen, onClose, onSave, editingHoliday }: HolidayModalProps) {
  const [formData, setFormData] = useState({
    name:        editingHoliday?.name        || "",
    date:        editingHoliday?.date        || "",
    type:        editingHoliday?.type        || "public" as "public" | "company" | "optional",
    duration:    editingHoliday?.duration    || "full-day" as "full-day" | "half-day",
    description: editingHoliday?.description || "",
    recurring:   editingHoliday?.recurring   || false,
  })
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const typeConfig = {
    public:   { label: "Public Holiday",  color: "#1d4ed8", bg: "#dbeafe", accent: "linear-gradient(135deg,#1d4ed8,#3b82f6)" },
    company:  { label: "Company Holiday", color: "#065f46", bg: "#d1fae5", accent: "linear-gradient(135deg,#059669,#10b981)" },
    optional: { label: "Optional Holiday", color: "#92400e", bg: "#fef3c7", accent: "linear-gradient(135deg,#d97706,#f59e0b)" },
  }
  const tc = typeConfig[formData.type]

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.name.trim()) e.name = "Holiday name is required"
    if (!formData.date) e.date = "Date is required"
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

        .hm * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        .hm-fade { animation: hmFade 0.22s ease; }
        @keyframes hmFade {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes hmSpin { to { transform: rotate(360deg); } }

        .hm-input {
          width: 100%; height: 44px;
          border-radius: 10px; border: 1.5px solid #e2e8f0;
          background: #fff; padding: 0 14px;
          font-size: 13.5px; color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.15s, box-shadow 0.15s;
          appearance: none;
        }
        .hm-input:focus { border-color: #334155; box-shadow: 0 0 0 3px rgba(51,65,85,0.08); }
        .hm-input.err   { border-color: #ef4444; background: #fff5f5; }

        .hm-select {
          width: 100%; height: 44px;
          border-radius: 10px; border: 1.5px solid #e2e8f0;
          background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 14px center;
          padding: 0 38px 0 14px;
          font-size: 13.5px; color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          outline: none; cursor: pointer; appearance: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .hm-select:focus { border-color: #334155; box-shadow: 0 0 0 3px rgba(51,65,85,0.08); }

        .hm-textarea {
          width: 100%; border-radius: 10px; border: 1.5px solid #e2e8f0;
          background: #fff; padding: 12px 14px;
          font-size: 13.5px; color: #0f172a; line-height: 1.65;
          font-family: 'DM Sans', sans-serif;
          outline: none; resize: vertical;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .hm-textarea:focus { border-color: #334155; box-shadow: 0 0 0 3px rgba(51,65,85,0.08); }

        .hm-label {
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.07em;
          color: #64748b; display: flex; align-items: center; gap: 6px;
          margin-bottom: 7px;
        }

        .hm-type-pill {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 10px 8px; border-radius: 10px;
          border: 1.5px solid #e2e8f0; background: #f8fafc;
          font-size: 12.5px; font-weight: 600; color: #64748b;
          cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif;
        }

        .hm-dur-pill {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 10px 8px; border-radius: 10px;
          border: 1.5px solid #e2e8f0; background: #f8fafc;
          font-size: 12.5px; font-weight: 600; color: #64748b;
          cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif;
        }

        .hm-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 7px;
          padding: 11px 20px; border-radius: 10px; font-size: 13.5px; font-weight: 600;
          border: none; cursor: pointer; transition: all 0.15s;
          font-family: 'DM Sans', sans-serif; flex: 1;
        }
        .hm-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(0,0,0,0.12); }
        .hm-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none !important; }
        .hm-btn-cancel  { background: transparent; color: #475569; border: 1.5px solid #e2e8f0; }
        .hm-btn-cancel:hover { background: #f8fafc; }
        .hm-btn-submit  { background: #0f172a; color: #fff; }
        .hm-btn-saved   { background: #16a34a; color: #fff; }

        .hm-close {
          width: 34px; height: 34px; border-radius: 8px;
          border: 1.5px solid #e2e8f0; background: transparent;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.15s; flex-shrink: 0;
        }
        .hm-close:hover { background: #f1f5f9; }

        .hm-err-msg { font-size: 11.5px; color: #ef4444; font-weight: 500; margin-top: 4px; }

        @media (max-width: 540px) {
          .hm-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div
        className="hm"
        style={{
          position: "fixed", inset: 0,
          background: "rgba(15,23,42,0.55)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 50, padding: 16,
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="hm-fade"
          style={{
            background: "#fff", borderRadius: 16, width: "100%", maxWidth: 560,
            maxHeight: "92vh", overflowY: "auto",
            boxShadow: "0 24px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
            display: "flex", flexDirection: "column",
          }}
        >
          {/* ── Header ── */}
          <div style={{
            position: "sticky", top: 0, zIndex: 10,
            background: "#fff", borderBottom: "1px solid #e2e8f0",
            padding: "16px 22px", borderRadius: "16px 16px 0 0",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: tc.accent,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 4px 12px ${tc.color}30`,
                transition: "background 0.3s",
              }}>
                <Gift style={{ width: 17, height: 17, color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
                  {editingHoliday ? "Edit Holiday" : "Add Holiday"}
                </div>
                <div style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 1 }}>
                  {editingHoliday ? "Update the holiday details" : "Create a new holiday entry"}
                </div>
              </div>
            </div>
            <button className="hm-close" onClick={onClose}>
              <X style={{ width: 15, height: 15, color: "#64748b" }} />
            </button>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} style={{ padding: "22px", display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Holiday Name */}
            <div>
              <div className="hm-label"><Gift style={{ width: 12, height: 12 }} />Holiday Name</div>
              <input
                className={`hm-input${errors.name ? " err" : ""}`}
                type="text"
                value={formData.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. Christmas Day, Diwali, Republic Day…"
              />
              {errors.name && <div className="hm-err-msg">{errors.name}</div>}
            </div>

            {/* Date + Duration row */}
            <div className="hm-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <div className="hm-label"><Calendar style={{ width: 12, height: 12 }} />Date</div>
                <input
                  className={`hm-input${errors.date ? " err" : ""}`}
                  type="date"
                  value={formData.date}
                  onChange={(e) => set("date", e.target.value)}
                />
                {errors.date && <div className="hm-err-msg">{errors.date}</div>}
              </div>

              <div>
                <div className="hm-label"><Calendar style={{ width: 12, height: 12 }} />Duration</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {(["full-day", "half-day"] as const).map((d) => (
                    <button
                      key={d} type="button"
                      className="hm-dur-pill"
                      onClick={() => set("duration", d)}
                      style={formData.duration === d ? {
                        background: "#0f172a", color: "#fff", borderColor: "#0f172a",
                      } : {}}
                    >
                      {d === "full-day" ? "Full Day" : "Half Day"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Type pill selector */}
            <div>
              <div className="hm-label"><Sparkles style={{ width: 12, height: 12 }} />Holiday Type</div>
              <div style={{ display: "flex", gap: 10 }}>
                {(["public", "company", "optional"] as const).map((t) => {
                  const cfg = typeConfig[t]
                  const active = formData.type === t
                  return (
                    <button
                      key={t} type="button"
                      className="hm-type-pill"
                      onClick={() => set("type", t)}
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

            {/* Description */}
            <div>
              <div className="hm-label"><Sparkles style={{ width: 12, height: 12 }} />Description</div>
              <textarea
                className="hm-textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Add a brief note or description about this holiday…"
              />
            </div>

            {/* Recurring toggle */}
            <div
              onClick={() => set("recurring", !formData.recurring)}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 16px", borderRadius: 12, cursor: "pointer",
                background: formData.recurring ? "#f0fdf4" : "#f8fafc",
                border: `1.5px solid ${formData.recurring ? "#bbf7d0" : "#e2e8f0"}`,
                transition: "all 0.15s",
              }}
            >
              <div style={{
                width: 42, height: 24, borderRadius: 99,
                background: formData.recurring ? "#16a34a" : "#e2e8f0",
                position: "relative", transition: "background 0.2s", flexShrink: 0,
              }}>
                <div style={{
                  position: "absolute", top: 3,
                  left: formData.recurring ? 21 : 3,
                  width: 18, height: 18, borderRadius: "50%", background: "#fff",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.15)", transition: "left 0.2s",
                }} />
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: formData.recurring ? "#15803d" : "#0f172a" }}>
                  Recurring Holiday
                </div>
                <div style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 1 }}>
                  This holiday repeats every year
                </div>
              </div>
              {formData.recurring && <CheckCircle style={{ width: 16, height: 16, color: "#16a34a", marginLeft: "auto" }} />}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10, paddingTop: 4, borderTop: "1px solid #f1f5f9" }}>
              <button type="button" className="hm-btn hm-btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className={`hm-btn ${saved ? "hm-btn-saved" : "hm-btn-submit"}`} disabled={saved}>
                {saved
                  ? <><CheckCircle style={{ width: 15, height: 15 }} /> Saved!</>
                  : <><Gift style={{ width: 15, height: 15 }} />{editingHoliday ? "Update Holiday" : "Add Holiday"}</>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}