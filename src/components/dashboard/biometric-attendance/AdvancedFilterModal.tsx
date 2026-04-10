"use client"

import { useState } from "react"
import { X, Filter, Calendar, Building2, Activity, Wifi, Fingerprint, Clock, Check } from "lucide-react"

interface AdvancedFilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: AdvancedFilters) => void
  onReset: () => void
}

interface AdvancedFilters {
  dateFrom: string
  dateTo: string
  departments: string[]
  statuses: string[]
  geofenceStatuses: string[]
  devices: string[]
  minWorkHours: number
  maxWorkHours: number
}

export default function AdvancedFilterModal({ isOpen, onClose, onApply, onReset }: AdvancedFilterModalProps) {
  const [filters, setFilters] = useState<AdvancedFilters>({
    dateFrom: "",
    dateTo: "",
    departments: [],
    statuses: [],
    geofenceStatuses: [],
    devices: [],
    minWorkHours: 0,
    maxWorkHours: 24,
  })

  const departments = ["Engineering", "Product", "Design", "Human Resources", "Marketing", "Sales", "Finance", "Support"]
  const statuses = ["present", "absent", "late", "leave"]
  const geofenceStatuses = ["inside", "outside", "exempt"]
  const devices = ["Fingerprint Scanner-01", "Fingerprint Scanner-02", "Face Recognition-01", "Face Recognition-02"]

  const toggleArray = (field: keyof AdvancedFilters, value: string) => {
    const current = filters[field] as string[]
    setFilters({
      ...filters,
      [field]: current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    })
  }

  const handleApply = () => {
    onApply(filters)
    onClose()
  }

  const handleReset = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      departments: [],
      statuses: [],
      geofenceStatuses: [],
      devices: [],
      minWorkHours: 0,
      maxWorkHours: 24,
    })
    onReset()
    onClose()
  }

  const hasActiveFilters =
    filters.dateFrom ||
    filters.dateTo ||
    filters.departments.length > 0 ||
    filters.statuses.length > 0 ||
    filters.geofenceStatuses.length > 0 ||
    filters.devices.length > 0 ||
    filters.minWorkHours > 0 ||
    filters.maxWorkHours < 24

  if (!isOpen) return null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        .af * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        .af-fade { animation: afFade 0.22s ease; }
        @keyframes afFade {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .af-input {
          width: 100%; height: 42px;
          border-radius: 9px; border: 1.5px solid #e2e8f0;
          background: #fff; padding: 0 13px;
          font-size: 13.5px; color: #0f172a;
          outline: none; transition: border-color 0.15s, box-shadow 0.15s;
        }
        .af-input:focus { border-color: #334155; box-shadow: 0 0 0 3px rgba(51,65,85,0.08); }

        .af-label {
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.07em;
          color: #64748b; display: flex; align-items: center; gap: 6px;
          margin-bottom: 8px;
        }

        .af-chip {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 13px; border-radius: 9px;
          border: 1.5px solid #e2e8f0; background: #f8fafc;
          font-size: 12.5px; font-weight: 600; color: #64748b;
          cursor: pointer; transition: all 0.15s;
        }
        .af-chip:hover { background: #f1f5f9; }
        .af-chip.active {
          background: #0f172a; color: #fff;
          border-color: #0f172a;
        }

        .af-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 7px;
          padding: 11px 20px; border-radius: 9px; font-size: 13.5px; font-weight: 600;
          border: none; cursor: pointer; transition: all 0.15s;
        }
        .af-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(0,0,0,0.12); }
        .af-btn-cancel  { background: transparent; color: #475569; border: 1.5px solid #e2e8f0; }
        .af-btn-cancel:hover { background: #f8fafc; }
        .af-btn-reset   { background: transparent; color: #dc2626; border: 1.5px solid #fecaca; }
        .af-btn-reset:hover { background: #fef2f2; }
        .af-btn-apply   { background: #0f172a; color: #fff; }

        .af-close {
          width: 32px; height: 32px; border-radius: 8px;
          border: 1.5px solid #e2e8f0; background: transparent;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.15s; flex-shrink: 0;
        }
        .af-close:hover { background: #f1f5f9; }

        .af-section {
          background: #f8fafc; border-radius: 10px; padding: 16px;
          border: 1px solid #e2e8f0;
        }

        .af-range-inputs {
          display: flex; align-items: center; gap: 8px;
        }
        .af-range-inputs .af-input { width: 80px; }
      `}</style>

      <div
        className="af"
        style={{
          position: "fixed", inset: 0,
          background: "rgba(15,23,42,0.55)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 50, padding: 16,
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="af-fade"
          style={{
            background: "#fff", borderRadius: 14, width: "100%", maxWidth: 620,
            maxHeight: "90vh", overflowY: "auto",
            boxShadow: "0 24px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
            display: "flex", flexDirection: "column",
          }}
        >
          {/* Header */}
          <div style={{
            position: "sticky", top: 0, zIndex: 10,
            background: "#fff", borderBottom: "1px solid #e2e8f0",
            padding: "16px 20px", borderRadius: "14px 14px 0 0",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9,
                background: "linear-gradient(135deg, #0f172a, #1e293b)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(15,23,42,0.25)",
              }}>
                <Filter style={{ width: 16, height: 16, color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Advanced Filters</div>
                <div style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 1 }}>
                  {hasActiveFilters ? `${[filters.departments.length, filters.statuses.length, filters.devices.length].reduce((a, b) => a + b, 0)} filters active` : "No active filters"}
                </div>
              </div>
            </div>
            <button className="af-close" onClick={onClose}>
              <X style={{ width: 14, height: 14, color: "#64748b" }} />
            </button>
          </div>

          {/* Filters */}
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Date Range */}
            <div className="af-section">
              <div className="af-label"><Calendar style={{ width: 12, height: 12 }} />Date Range</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 5, fontWeight: 500 }}>From</div>
                  <input
                    className="af-input"
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 5, fontWeight: 500 }}>To</div>
                  <input
                    className="af-input"
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Departments */}
            <div className="af-section">
              <div className="af-label"><Building2 style={{ width: 12, height: 12 }} />Departments</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {departments.map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    className={`af-chip ${filters.departments.includes(dept) ? "active" : ""}`}
                    onClick={() => toggleArray("departments", dept)}
                  >
                    {filters.departments.includes(dept) && <Check style={{ width: 12, height: 12 }} />}
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="af-section">
              <div className="af-label"><Activity style={{ width: 12, height: 12 }} />Attendance Status</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {statuses.map((status) => {
                  const color = status === "present" ? "#16a34a" : status === "absent" ? "#dc2626" : status === "late" ? "#d97706" : "#2563eb"
                  return (
                    <button
                      key={status}
                      type="button"
                      className={`af-chip ${filters.statuses.includes(status) ? "active" : ""}`}
                      onClick={() => toggleArray("statuses", status)}
                      style={filters.statuses.includes(status) ? {} : { borderColor: color + "40", color: color }}
                    >
                      {filters.statuses.includes(status) && <Check style={{ width: 12, height: 12 }} />}
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Geofence Status */}
            <div className="af-section">
              <div className="af-label"><Wifi style={{ width: 12, height: 12 }} />Geofence Status</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {geofenceStatuses.map((status) => {
                  const color = status === "inside" ? "#16a34a" : status === "outside" ? "#dc2626" : "#64748b"
                  return (
                    <button
                      key={status}
                      type="button"
                      className={`af-chip ${filters.geofenceStatuses.includes(status) ? "active" : ""}`}
                      onClick={() => toggleArray("geofenceStatuses", status)}
                      style={filters.geofenceStatuses.includes(status) ? {} : { borderColor: color + "40", color: color }}
                    >
                      {filters.geofenceStatuses.includes(status) && <Check style={{ width: 12, height: 12 }} />}
                      {status === "inside" && <Wifi style={{ width: 12, height: 12 }} />}
                      {status === "outside" && <Wifi style={{ width: 12, height: 12 }} />}
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Devices */}
            <div className="af-section">
              <div className="af-label"><Fingerprint style={{ width: 12, height: 12 }} />Biometric Devices</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {devices.map((device) => (
                  <button
                    key={device}
                    type="button"
                    className={`af-chip ${filters.devices.includes(device) ? "active" : ""}`}
                    onClick={() => toggleArray("devices", device)}
                  >
                    {filters.devices.includes(device) && <Check style={{ width: 12, height: 12 }} />}
                    {device}
                  </button>
                ))}
              </div>
            </div>

            {/* Work Hours Range */}
            <div className="af-section">
              <div className="af-label"><Clock style={{ width: 12, height: 12 }} />Work Hours Range</div>
              <div className="af-range-inputs">
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 5, fontWeight: 500 }}>Min Hours</div>
                  <input
                    className="af-input"
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    value={filters.minWorkHours}
                    onChange={(e) => setFilters({ ...filters, minWorkHours: Number(e.target.value) })}
                  />
                </div>
                <span style={{ color: "#94a3b8", fontSize: 14, marginTop: 18 }}>to</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 5, fontWeight: 500 }}>Max Hours</div>
                  <input
                    className="af-input"
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    value={filters.maxWorkHours}
                    onChange={(e) => setFilters({ ...filters, maxWorkHours: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{
            position: "sticky", bottom: 0, zIndex: 10,
            background: "#fff", borderTop: "1px solid #e2e8f0",
            padding: "16px 20px", borderRadius: "0 0 14px 14px",
            display: "flex", gap: 10,
          }}>
            <button className="af-btn af-btn-cancel" onClick={onClose}>
              Cancel
            </button>
            {hasActiveFilters && (
              <button className="af-btn af-btn-reset" onClick={handleReset}>
                Reset All
              </button>
            )}
            <button className="af-btn af-btn-apply" onClick={handleApply} style={{ flex: 1 }}>
              <Filter style={{ width: 14, height: 14 }} /> Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
