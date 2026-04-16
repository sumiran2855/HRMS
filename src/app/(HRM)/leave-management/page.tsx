"use client"

import { useState, useMemo, useCallback } from "react"
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  User,
  FileText,
  Check,
  X,
  Search,
  Umbrella,
  Briefcase,
  Heart,
  TrendingUp,
  MoreHorizontal,
  Bell,
  Settings,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react"

/* ─── Types ─────────────────────────────────────────────────── */
interface LeaveRequest {
  id: string
  employeeName: string
  employeeId: string
  avatar: string
  type: string
  startDate: string
  endDate: string
  days: number
  reason: string
  status: "pending" | "approved" | "rejected"
  appliedDate: string
}

interface LeaveBalance {
  type: string
  icon: React.ElementType
  color: string
  total: number
  used: number
  remaining: number
  gradient: string
}

/* ─── Data ───────────────────────────────────────────────────── */
const leaveRequests: LeaveRequest[] = [
  { id: "1", employeeName: "John Doe", employeeId: "EMP001", avatar: "JD", type: "Sick Leave", startDate: "2024-01-15", endDate: "2024-01-16", days: 2, reason: "Fever and flu", status: "pending", appliedDate: "2024-01-14" },
  { id: "2", employeeName: "Jane Smith", employeeId: "EMP002", avatar: "JS", type: "Annual Leave", startDate: "2024-01-20", endDate: "2024-01-25", days: 5, reason: "Family vacation", status: "approved", appliedDate: "2024-01-10" },
  { id: "3", employeeName: "Bob Johnson", employeeId: "EMP003", avatar: "BJ", type: "Personal Leave", startDate: "2024-01-22", endDate: "2024-01-22", days: 1, reason: "Personal matters", status: "rejected", appliedDate: "2024-01-18" },
  { id: "4", employeeName: "Sara Lee", employeeId: "EMP004", avatar: "SL", type: "Annual Leave", startDate: "2024-01-28", endDate: "2024-02-02", days: 4, reason: "Travel", status: "pending", appliedDate: "2024-01-20" },
]

const leaveBalances: LeaveBalance[] = [
  { type: "Annual Leave", icon: Umbrella, color: "#6366f1", gradient: "linear-gradient(135deg,#6366f1,#818cf8)", total: 21, used: 5, remaining: 16 },
  { type: "Sick Leave", icon: Heart, color: "#f43f5e", gradient: "linear-gradient(135deg,#f43f5e,#fb7185)", total: 10, used: 2, remaining: 8 },
  { type: "Personal Leave", icon: User, color: "#0ea5e9", gradient: "linear-gradient(135deg,#0ea5e9,#38bdf8)", total: 5, used: 1, remaining: 4 },
  { type: "Parental Leave", icon: Briefcase, color: "#10b981", gradient: "linear-gradient(135deg,#10b981,#34d399)", total: 90, used: 0, remaining: 90 },
]

const myLeaves: LeaveRequest[] = [
  { id: "5", employeeName: "Current User", employeeId: "EMP001", avatar: "ME", type: "Sick Leave", startDate: "2024-01-10", endDate: "2024-01-11", days: 2, reason: "Medical appointment", status: "approved", appliedDate: "2024-01-09" },
  { id: "6", employeeName: "Current User", employeeId: "EMP001", avatar: "ME", type: "Annual Leave", startDate: "2024-02-01", endDate: "2024-02-05", days: 5, reason: "Vacation", status: "pending", appliedDate: "2024-01-20" },
  { id: "7", employeeName: "Current User", employeeId: "EMP001", avatar: "ME", type: "Personal Leave", startDate: "2024-03-10", endDate: "2024-03-10", days: 1, reason: "House shifting", status: "rejected", appliedDate: "2024-03-05" },
]

/* ─── Helpers ────────────────────────────────────────────────── */
const statusConfig = {
  approved: { label: "Approved", dot: "#10b981", bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" },
  rejected: { label: "Rejected", dot: "#ef4444", bg: "#fee2e2", text: "#991b1b", border: "#fca5a5" },
  pending:  { label: "Pending",  dot: "#f59e0b", bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
const pct = (used: number, total: number) => Math.round((used / total) * 100)

/* ─── Mini Components ────────────────────────────────────────── */
const Avatar = ({ initials, size = 40, color = "#6366f1" }: { initials: string; size?: number; color?: string }) => (
  <div style={{
    width: size, height: size, borderRadius: size * 0.28, background: color + "22",
    border: `1.5px solid ${color}44`, display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size * 0.35, fontWeight: 700, color, flexShrink: 0, letterSpacing: "-0.02em"
  }}>{initials}</div>
)

const StatusBadge = ({ status }: { status: keyof typeof statusConfig }) => {
  const c = statusConfig[status]
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px",
      borderRadius: 100, fontSize: 12, fontWeight: 600, color: c.text,
      background: c.bg, border: `1px solid ${c.border}`, whiteSpace: "nowrap"
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
      {c.label}
    </span>
  )
}

const ProgressBar = ({ pct: p, color }: { pct: number; color: string }) => (
  <div style={{ height: 6, borderRadius: 100, background: color + "20", overflow: "hidden" }}>
    <div style={{ height: "100%", width: `${p}%`, borderRadius: 100, background: color, transition: "width .4s ease" }} />
  </div>
)

/* ─── Main Page ──────────────────────────────────────────────── */
export default function LeaveManagementPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [formData, setFormData] = useState({ type: "", startDate: "", endDate: "", reason: "" })
  const [submitted, setSubmitted] = useState(false)

  const monthLabel = useMemo(() =>
    selectedMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    [selectedMonth]
  )

  const prevMonth = useCallback(() =>
    setSelectedMonth(p => { const d = new Date(p); d.setMonth(d.getMonth() - 1); return d }), [])
  const nextMonth = useCallback(() =>
    setSelectedMonth(p => { const d = new Date(p); d.setMonth(d.getMonth() + 1); return d }), [])

  const filtered = (list: LeaveRequest[]) =>
    list.filter(r =>
      (r.employeeName + r.type + r.reason).toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "all" || r.status === statusFilter)
    )

  const tabs = [
    { id: "overview",  label: "Overview",       icon: TrendingUp },
    { id: "apply",     label: "Apply Leave",    icon: Plus       },
    { id: "my-leaves", label: "My Leaves",      icon: FileText   },
    { id: "approve",   label: "Approvals",      icon: Check      },
    { id: "calendar",  label: "Calendar",       icon: Calendar   },
  ]

  /* ── Calendar helpers ── */
  const calYear  = selectedMonth.getFullYear()
  const calMonth = selectedMonth.getMonth()
  const firstDay = new Date(calYear, calMonth, 1).getDay()
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate()
  const calCells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  const allLeaves = [...leaveRequests, ...myLeaves]
  const leaveDays = new Set(
    allLeaves.flatMap(r => {
      const days: string[] = []
      const d = new Date(r.startDate)
      const e = new Date(r.endDate)
      while (d <= e) { days.push(d.toISOString().slice(0, 10)); d.setDate(d.getDate() + 1) }
      return days
    }).filter(d => d.startsWith(`${calYear}-${String(calMonth + 1).padStart(2, "0")}`))
      .map(d => parseInt(d.slice(8)))
  )

  /* ── Styles ── */
  const s = {
    page: {
      // minHeight: "100vh",
      background: "linear-gradient(180deg, #f8f9fc 0%, #f1f5f9 100%)",
      fontFamily: "'DM Sans', 'Outfit', system-ui, sans-serif",
      padding: "0",
      overflowX: "hidden",
    } as React.CSSProperties,
    inner: { maxWidth: 1440, margin: "0 auto", padding: "0 20px 48px", overflow: "visible" } as React.CSSProperties,

    /* section header */
    sectionCard: {
      background: "#fff",
      borderRadius: 20,
      border: "1px solid #edf0f7",
      marginBottom: 20,
      boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)",
    } as React.CSSProperties,
  }

  return (
    <div style={s.page}>
      <div style={s.inner}>
        {/* ── Page Title ── */}
        <div style={{ padding: "28px 0 20px" }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", margin: 0, letterSpacing: "-0.03em" }}>
            Leave Management
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", margin: "4px 0 0" }}>
            Manage, apply, and approve leave requests — all in one place.
          </p>
        </div>

        {/* ── Tabs ── */}
        <div style={{ ...s.sectionCard, marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 0 }}>
            {tabs.map(tab => {
              const Icon = tab.icon
              const active = activeTab === tab.id
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  flex: "1 1 auto", minWidth: 120, padding: "16px 20px",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  border: "none", background: "transparent", cursor: "pointer",
                  fontSize: 13, fontWeight: active ? 700 : 500,
                  color: active ? "#6366f1" : "#6b7280",
                  borderBottom: active ? "2.5px solid #6366f1" : "2.5px solid transparent",
                  whiteSpace: "nowrap", transition: "all .2s ease", fontFamily: "inherit",
                  position: "relative"
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.color = "#4f46e5"
                    e.currentTarget.style.background = "#f8fafc"
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.color = "#6b7280"
                    e.currentTarget.style.background = "transparent"
                  }
                }}
                >
                  <Icon style={{ width: 16, height: 16 }} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* ═══ OVERVIEW ═══ */}
        {activeTab === "overview" && (
          <div>
            {/* Stat strip */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 24 }}>
              {[
                { label: "Pending",        val: leaveRequests.filter(r => r.status==="pending").length,  color: "#f59e0b", bg:"#fffbeb", icon: Clock },
                { label: "Approved",       val: leaveRequests.filter(r => r.status==="approved").length, color: "#10b981", bg:"#ecfdf5", icon: CheckCircle },
                { label: "Rejected",       val: leaveRequests.filter(r => r.status==="rejected").length, color: "#ef4444", bg:"#fef2f2", icon: XCircle },
                { label: "Days Used (me)", val: myLeaves.reduce((s,r)=>s+r.days,0),                      color: "#6366f1", bg:"#eef2ff", icon: Calendar },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} style={{
                    background: "#fff", borderRadius: 16, border: "1px solid #edf0f7",
                    padding: "20px 22px", display: "flex", alignItems: "center", gap: 16,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    transition: "all 0.2s ease",
                    cursor: "default"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)"
                  }}
                  >
                    <div style={{ width: 46, height: 46, borderRadius: 14, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon style={{ width: 22, height: 22, color: item.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 26, fontWeight: 800, color: "#111827", lineHeight: 1 }}>{item.val}</div>
                      <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3, fontWeight: 500 }}>{item.label}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Balances */}
            <div style={{ ...s.sectionCard, padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Your Leave Balances</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>Remaining days per category</div>
                </div>
                <button style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#6366f1", background: "none", border: "none", cursor: "pointer" }}>
                  View all <ArrowUpRight style={{ width: 14, height: 14 }} />
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
                {leaveBalances.map((b, i) => {
                  const Icon = b.icon
                  const p = pct(b.used, b.total)
                  return (
                    <div key={i} style={{
                      borderRadius: 16, border: "1px solid #edf0f7", overflow: "hidden",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "translateY(-2px)"
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)"
                    }}
                    >
                      <div style={{ height: 5, background: b.gradient }} />
                      <div style={{ padding: 18 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                          <div style={{ width: 36, height: 36, borderRadius: 10, background: b.color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon style={{ width: 18, height: 18, color: b.color }} />
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{b.type}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 10 }}>
                          <div>
                            <div style={{ fontSize: 28, fontWeight: 800, color: "#111827", lineHeight: 1 }}>{b.remaining}</div>
                            <div style={{ fontSize: 11, color: "#9ca3af" }}>days left</div>
                          </div>
                          <div style={{ textAlign: "right", fontSize: 12, color: "#6b7280" }}>
                            <div>{b.used} used</div>
                            <div style={{ color: "#9ca3af" }}>of {b.total}</div>
                          </div>
                        </div>
                        <ProgressBar pct={p} color={b.color} />
                        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 5 }}>{p}% used</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ═══ APPLY ═══ */}
        {activeTab === "apply" && (
          <div style={{ ...s.sectionCard }}>
            {submitted ? (
              <div style={{ padding: 80, textAlign: "center" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <CheckCircle style={{ width: 36, height: 36, color: "#10b981" }} />
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Request Submitted!</div>
                <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 28 }}>Your leave request has been sent for approval.</div>
                <button onClick={() => setSubmitted(false)} style={{ padding: "10px 28px", borderRadius: 10, background: "#6366f1", color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  Apply Another
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", minHeight: 500 }}>
                {/* Form */}
                <div style={{ padding: 36, borderRight: "1px solid #edf0f7" }}>
                  <div style={{ marginBottom: 28 }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>Apply for Leave</div>
                    <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>Fill in the details below to submit your request</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {/* Leave type */}
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Leave Type *</label>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
                        {leaveBalances.map(b => {
                          const Icon = b.icon
                          const sel = formData.type === b.type
                          return (
                            <button key={b.type} onClick={() => setFormData(f => ({ ...f, type: b.type }))} style={{
                              padding: "12px 14px", borderRadius: 12,
                              border: `2px solid ${sel ? b.color : "#edf0f7"}`,
                              background: sel ? b.color + "10" : "#fff",
                              cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
                              transition: "all .15s", fontFamily: "inherit"
                            }}>
                              <Icon style={{ width: 16, height: 16, color: b.color }} />
                              <span style={{ fontSize: 13, fontWeight: 600, color: sel ? b.color : "#374151" }}>{b.type}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Dates */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      {[["Start Date", "startDate"], ["End Date", "endDate"]].map(([label, key]) => (
                        <div key={key}>
                          <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>{label} *</label>
                          <input type="date" value={(formData as any)[key]}
                            onChange={e => setFormData(f => ({ ...f, [key]: e.target.value }))}
                            style={{
                              width: "100%", height: 44, borderRadius: 10, border: "1.5px solid #e5e7eb",
                              padding: "0 12px", fontSize: 13, color: "#111827", fontFamily: "inherit",
                              outline: "none", background: "#fafafa", boxSizing: "border-box"
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Reason */}
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Reason *</label>
                      <textarea rows={4} placeholder="Briefly describe the reason for your leave..."
                        value={formData.reason}
                        onChange={e => setFormData(f => ({ ...f, reason: e.target.value }))}
                        style={{
                          width: "100%", borderRadius: 10, border: "1.5px solid #e5e7eb",
                          padding: 12, fontSize: 13, color: "#111827", fontFamily: "inherit",
                          outline: "none", background: "#fafafa", resize: "vertical", boxSizing: "border-box"
                        }}
                      />
                    </div>

                    {/* Attachment */}
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Attachment <span style={{ color: "#9ca3af", fontWeight: 400 }}>(optional)</span></label>
                      <div style={{
                        height: 80, borderRadius: 10, border: "2px dashed #e5e7eb", background: "#fafafa",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer"
                      }}>
                        <FileText style={{ width: 20, height: 20, color: "#9ca3af" }} />
                        <span style={{ fontSize: 13, color: "#6b7280" }}>Click to upload a file</span>
                      </div>
                    </div>

                    <button
                      onClick={() => { if (formData.type && formData.startDate && formData.endDate && formData.reason) setSubmitted(true) }}
                      style={{
                        height: 48, borderRadius: 12, background: "linear-gradient(135deg,#6366f1,#818cf8)",
                        color: "#fff", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer",
                        letterSpacing: "0.02em", transition: "opacity .15s", fontFamily: "inherit"
                      }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                    >
                      Submit Leave Request →
                    </button>
                  </div>
                </div>

                {/* Sidebar balance */}
                <div style={{ padding: 28, background: "#fafbff" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 16 }}>Your Balances</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {leaveBalances.map(b => {
                      const Icon = b.icon
                      const p = pct(b.used, b.total)
                      return (
                        <div key={b.type} style={{ padding: 14, borderRadius: 14, background: "#fff", border: "1px solid #edf0f7" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <Icon style={{ width: 14, height: 14, color: b.color }} />
                              <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{b.type}</span>
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 700, color: b.color }}>{b.remaining}d</span>
                          </div>
                          <ProgressBar pct={p} color={b.color} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ MY LEAVES ═══ */}
        {activeTab === "my-leaves" && (
          <div style={s.sectionCard}>
            <FilterBar search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
            <LeaveTable rows={filtered(myLeaves)} showEmployee={false} />
          </div>
        )}

        {/* ═══ APPROVE ═══ */}
        {activeTab === "approve" && (
          <div style={s.sectionCard}>
            <FilterBar search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
            <ApprovalTable rows={filtered(leaveRequests)} />
          </div>
        )}

        {/* ═══ CALENDAR ═══ */}
        {activeTab === "calendar" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
            <div style={{ ...s.sectionCard, padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{monthLabel}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={prevMonth} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ChevronLeft style={{ width: 16, height: 16, color: "#6b7280" }} />
                  </button>
                  <button onClick={nextMonth} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ChevronRight style={{ width: 16, height: 16, color: "#6b7280" }} />
                  </button>
                </div>
              </div>
              {/* Day labels */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 8 }}>
                {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
                  <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: "#9ca3af", padding: "4px 0" }}>{d}</div>
                ))}
              </div>
              {/* Date cells */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
                {calCells.map((day, i) => {
                  if (!day) return <div key={i} />
                  const today = new Date()
                  const isToday = today.getDate() === day && today.getMonth() === calMonth && today.getFullYear() === calYear
                  const hasLeave = leaveDays.has(day)
                  return (
                    <div key={i} style={{
                      aspectRatio: "1", borderRadius: 10, display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: isToday ? 700 : 500,
                      color: isToday ? "#fff" : hasLeave ? "#6366f1" : "#374151",
                      background: isToday ? "linear-gradient(135deg,#6366f1,#818cf8)" : hasLeave ? "#eef2ff" : "transparent",
                      border: hasLeave && !isToday ? "1.5px solid #c7d2fe" : "1.5px solid transparent",
                      cursor: "default", position: "relative",
                    }}>
                      {day}
                      {hasLeave && !isToday && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#6366f1", position: "absolute", bottom: 4 }} />}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Sidebar: upcoming leaves */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ ...s.sectionCard, padding: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 14 }}>Upcoming Leaves</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {allLeaves.filter(r => r.status !== "rejected").slice(0, 5).map(r => (
                    <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 12, background: "#f8f9fc" }}>
                      <Avatar initials={r.avatar} size={34} color="#6366f1" />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.employeeName}</div>
                        <div style={{ fontSize: 11, color: "#9ca3af" }}>{r.type} · {r.days}d</div>
                      </div>
                      <StatusBadge status={r.status} />
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ ...s.sectionCard, padding: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 14 }}>Legend</div>
                {[
                  { color: "#6366f1", label: "Leave days" },
                  { color: "#6366f1", bg: "linear-gradient(135deg,#6366f1,#818cf8)", label: "Today" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 4, background: item.bg || item.color + "20", border: `1.5px solid ${item.color}` }} />
                    <span style={{ fontSize: 13, color: "#6b7280" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Filter Bar ─────────────────────────────────────────────── */
function FilterBar({ search, setSearch, statusFilter, setStatusFilter }: any) {
  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .filter-bar-container {
            flex-direction: column !important;
          }
          .filter-search {
            min-width: 100% !important;
          }
          .filter-buttons {
            width: 100% !important;
          }
          .filter-buttons button {
            flex: 1 !important;
            min-width: 70px !important;
          }
        }
      `}</style>
      <div className="filter-bar-container" style={{ padding: "16px 20px", borderBottom: "1px solid #edf0f7", display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div className="filter-search" style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <Search style={{ position: "absolute", left: 12, top: 12, width: 16, height: 16, color: "#9ca3af", pointerEvents: "none" }} />
          <input placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} style={{
            width: "100%", height: 40, borderRadius: 10, border: "1.5px solid #e5e7eb",
            paddingLeft: 36, paddingRight: 12, fontSize: 13, color: "#111827", outline: "none",
            fontFamily: "inherit", background: "#fafafa", boxSizing: "border-box"
          }} />
        </div>
        <div className="filter-buttons" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[["all","All"],["pending","Pending"],["approved","Approved"],["rejected","Rejected"]].map(([val, label]) => (
            <button key={val} onClick={() => setStatusFilter(val)} style={{
              padding: "0 14px", height: 40, borderRadius: 10, fontSize: 13, fontWeight: 600,
              border: statusFilter === val ? "1.5px solid #6366f1" : "1.5px solid #e5e7eb",
              background: statusFilter === val ? "#eef2ff" : "#fff",
              color: statusFilter === val ? "#6366f1" : "#6b7280",
              cursor: "pointer", transition: "all .15s", fontFamily: "inherit"
            }}>{label}</button>
          ))}
        </div>
      </div>
    </>
  )
}

/* ─── Leave Table (My Leaves) ────────────────────────────────── */
function LeaveTable({ rows, showEmployee }: { rows: LeaveRequest[]; showEmployee: boolean }) {
  if (!rows.length) return (
    <div style={{ padding: 60, textAlign: "center" }}>
      <Calendar style={{ width: 40, height: 40, color: "#d1d5db", margin: "0 auto 12px" }} />
      <div style={{ fontSize: 16, fontWeight: 600, color: "#374151" }}>No leave requests found</div>
      <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>Try adjusting filters or apply a new leave.</div>
    </div>
  )
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f9fafb" }}>
            {["Type","Duration","Days","Reason","Status","Applied"].map(h => (
              <th key={h} style={{ padding: "13px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em", whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.id} style={{ borderTop: "1px solid #f3f4f6" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#fafbff")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <td style={{ padding: "14px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Calendar style={{ width: 16, height: 16, color: "#6366f1" }} />
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{r.type}</span>
                </div>
              </td>
              <td style={{ padding: "14px 20px", fontSize: 13, color: "#6b7280", whiteSpace: "nowrap" }}>{fmt(r.startDate)} – {fmt(r.endDate)}</td>
              <td style={{ padding: "14px 20px" }}><span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{r.days}d</span></td>
              <td style={{ padding: "14px 20px", fontSize: 13, color: "#6b7280", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.reason}</td>
              <td style={{ padding: "14px 20px" }}><StatusBadge status={r.status} /></td>
              <td style={{ padding: "14px 20px", fontSize: 13, color: "#9ca3af", whiteSpace: "nowrap" }}>{fmt(r.appliedDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ─── Approval Table ─────────────────────────────────────────── */
function ApprovalTable({ rows }: { rows: LeaveRequest[] }) {
  const [list, setList] = useState(rows)
  const approve = (id: string) => setList(l => l.map(r => r.id === id ? { ...r, status: "approved" as const } : r))
  const reject  = (id: string) => setList(l => l.map(r => r.id === id ? { ...r, status: "rejected" as const } : r))

  if (!list.length) return (
    <div style={{ padding: 60, textAlign: "center" }}>
      <CheckCircle style={{ width: 40, height: 40, color: "#d1d5db", margin: "0 auto 12px" }} />
      <div style={{ fontSize: 16, fontWeight: 600, color: "#374151" }}>No requests found</div>
    </div>
  )
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f9fafb" }}>
            {["Employee","Type","Duration","Reason","Status","Actions"].map(h => (
              <th key={h} style={{ padding: "13px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em", whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map(r => (
            <tr key={r.id} style={{ borderTop: "1px solid #f3f4f6" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#fafbff")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <td style={{ padding: "14px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar initials={r.avatar} size={36} color="#6366f1" />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{r.employeeName}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>{r.employeeId}</div>
                  </div>
                </div>
              </td>
              <td style={{ padding: "14px 20px", fontSize: 13, fontWeight: 600, color: "#374151" }}>{r.type}</td>
              <td style={{ padding: "14px 20px" }}>
                <div style={{ fontSize: 13, color: "#6b7280", whiteSpace: "nowrap" }}>{fmt(r.startDate)} – {fmt(r.endDate)}</div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}>{r.days} days</div>
              </td>
              <td style={{ padding: "14px 20px", fontSize: 13, color: "#6b7280", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.reason}</td>
              <td style={{ padding: "14px 20px" }}><StatusBadge status={r.status} /></td>
              <td style={{ padding: "14px 20px" }}>
                {r.status === "pending" ? (
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => approve(r.id)} style={{
                      width: 34, height: 34, borderRadius: 8, border: "1.5px solid #10b981", background: "#fff",
                      color: "#10b981", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all .15s"
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#10b981"; e.currentTarget.style.color = "#fff" }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#10b981" }}
                      title="Approve">
                      <Check style={{ width: 15, height: 15 }} />
                    </button>
                    <button onClick={() => reject(r.id)} style={{
                      width: 34, height: 34, borderRadius: 8, border: "1.5px solid #ef4444", background: "#fff",
                      color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all .15s"
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#ef4444"; e.currentTarget.style.color = "#fff" }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#ef4444" }}
                      title="Reject">
                      <X style={{ width: 15, height: 15 }} />
                    </button>
                    <button style={{ width: 34, height: 34, borderRadius: 8, border: "1.5px solid #e5e7eb", background: "#fff", color: "#6b7280", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <MoreHorizontal style={{ width: 15, height: 15 }} />
                    </button>
                  </div>
                ) : (
                  <span style={{ fontSize: 12, color: "#d1d5db" }}>—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}