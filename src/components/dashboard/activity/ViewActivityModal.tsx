"use client"

import { X, Calendar, Clock, UserCheck, FileText, Code, Palette, Server, CheckCircle, PlayCircle, AlertCircle } from "lucide-react"

interface ViewActivityModalProps {
  isOpen: boolean
  onClose: () => void
  activity: any
}

export function ViewActivityModal({ isOpen, onClose, activity }: ViewActivityModalProps) {
  if (!isOpen || !activity) return null

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return { bg: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '#93c5fd' }
      case 'completed': return { bg: 'rgba(34,197,94,0.15)', color: '#22c55e', border: '#bbf7d0' }
      case 'pending': return { bg: 'rgba(250,204,21,0.15)', color: '#facc15', border: '#fde047' }
      case 'planning': return { bg: 'rgba(139,92,246,0.15)', color: '#8b5cf6', border: '#c4b5fd' }
      default: return { bg: 'rgba(148,163,184,0.15)', color: '#94a3b8', border: '#cbd5e1' }
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Development': return <Code className="w-5 h-5" />
      case 'Design': return <Palette className="w-5 h-5" />
      case 'DevOps': return <Server className="w-5 h-5" />
      case 'Testing': return <CheckCircle className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-progress': return <PlayCircle className="w-5 h-5" />
      case 'completed': return <CheckCircle className="w-5 h-5" />
      case 'pending': return <AlertCircle className="w-5 h-5" />
      case 'planning': return <FileText className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  const statusColors = getStatusColor(activity.status)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&display=swap');

        .view-activity-modal * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        .view-activity-fade {
          animation: viewActivityFadeIn 0.22s ease;
        }
        @keyframes viewActivityFadeIn {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .activity-section-title {
          font-size: 10.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: #94a3b8;
          margin-bottom: 12px;
        }

        .activity-info-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .activity-info-row:last-child { border-bottom: none; padding-bottom: 0; }
        .activity-info-row:first-child { padding-top: 0; }

        .activity-icon-box {
          width: 32px; height: 32px; border-radius: 8px;
          background: #f1f5f9;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .activity-metric-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .activity-metric-label {
          font-size: 11px;
          color: #94a3b8;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .activity-metric-value {
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
          font-family: 'DM Mono', monospace;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .activity-metric-sub {
          font-size: 11px;
          color: #94a3b8;
        }

        .activity-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
          background: #f1f5f9;
          color: #475569;
          margin-right: 6px;
          margin-bottom: 6px;
          border: 1px solid #e2e8f0;
        }

        .activity-close-btn {
          width: 34px; height: 34px; border-radius: 8px;
          border: 1.5px solid #e2e8f0; background: transparent; cursor: pointer;
          display: flex; align-items: center; justify-content: center; transition: background 0.15s;
        }
        .activity-close-btn:hover { background: #f1f5f9; }

        .activity-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          display: flex; align-items: center; justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 12px;
          flex-shrink: 0;
        }

        .activity-progress-bar {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .activity-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #2563eb);
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        @media (max-width: 540px) {
          .activity-metrics-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <div
        className="view-activity-modal"
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
          className="view-activity-fade"
          style={{
            background: "#fff",
            borderRadius: 16,
            width: "100%",
            maxWidth: 800,
            maxHeight: "92vh",
            overflowY: "auto",
            boxShadow: "0 24px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Hero Header */}
          <div style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
            borderRadius: "16px 16px 0 0",
            padding: "28px 24px 24px",
            position: "relative",
          }}>
            {/* Close */}
            <button
              className="activity-close-btn"
              onClick={onClose}
              style={{ position: "absolute", top: 16, right: 16, borderColor: "rgba(255,255,255,0.15)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <X style={{ width: 16, height: 16, color: "rgba(255,255,255,0.7)" }} />
            </button>

            {/* Activity identity */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: "rgba(255,255,255,0.1)",
                border: "1.5px solid rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {getTypeIcon(activity.type)}
                <span style={{ color: "rgba(255,255,255,0.7)" }} />
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                  {activity.title}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  <FileText style={{ width: 12, height: 12 }} />
                  {activity.id}
                </div>
              </div>
            </div>

            {/* Chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <span className="activity-tag" style={{ background: statusColors.bg, color: statusColors.color, border: `1px solid ${statusColors.border}` }}>
                {getStatusIcon(activity.status)}
                {activity.status === 'in-progress' ? 'In Progress' : activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
              </span>
              <span className="activity-tag" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.15)" }}>
                {activity.type}
              </span>
              <span className="activity-tag" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.15)" }}>
                {activity.category}
              </span>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Key Metrics */}
            <div>
              <div className="activity-section-title">Key Metrics</div>
              <div
                className="activity-metrics-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: 12,
                }}
              >
                <div className="activity-metric-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Clock style={{ width: 14, height: 14, color: "#7c3aed" }} />
                    <span className="activity-metric-label">Estimated Hours</span>
                  </div>
                  <div className="activity-metric-value">{activity.estimatedHours}</div>
                  <div className="activity-metric-sub">Hours</div>
                </div>

                <div className="activity-metric-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <CheckCircle style={{ width: 14, height: 14, color: "#22c55e" }} />
                    <span className="activity-metric-label">Actual Hours</span>
                  </div>
                  <div className="activity-metric-value">{activity.actualHours}</div>
                  <div className="activity-metric-sub">Hours</div>
                </div>

                <div className="activity-metric-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <FileText style={{ width: 14, height: 14, color: "#ea580c" }} />
                    <span className="activity-metric-label">Priority</span>
                  </div>
                  <div className="activity-metric-value" style={{ fontSize: 18 }}>{activity.priority}</div>
                  <div className="activity-metric-sub">Level</div>
                </div>

                <div className="activity-metric-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Calendar style={{ width: 14, height: 14, color: "#f59e0b" }} />
                    <span className="activity-metric-label">Deadline</span>
                  </div>
                  <div className="activity-metric-value" style={{ fontSize: 16 }}>{formatDate(activity.deadline)}</div>
                  <div className="activity-metric-sub">Due date</div>
                </div>
              </div>
            </div>

            {/* Progress */}
            {activity.actualHours > 0 && activity.estimatedHours > 0 && (
              <div>
                <div className="activity-section-title">Progress</div>
                <div style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "16px 18px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#475569" }}>
                      Completion Progress
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>
                      {Math.round((activity.actualHours / activity.estimatedHours) * 100)}%
                    </span>
                  </div>
                  <div className="activity-progress-bar">
                    <div
                      className="activity-progress-fill"
                      style={{ width: `${Math.min((activity.actualHours / activity.estimatedHours) * 100, 100)}%` }}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "#94a3b8" }}>
                    <span>{activity.actualHours}h completed</span>
                    <span>{activity.estimatedHours}h total</span>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Details */}
            <div>
              <div className="activity-section-title">Activity Details</div>
              <div style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: "16px 18px",
                fontSize: 13.5,
                lineHeight: 1.7,
                color: "#475569",
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                  <div>
                    <strong style={{ color: "#1e293b" }}>Project:</strong> {activity.project}
                  </div>
                  <div>
                    <strong style={{ color: "#1e293b" }}>Assignee:</strong> {activity.assignee}
                  </div>
                  <div>
                    <strong style={{ color: "#1e293b" }}>Created:</strong> {formatDate(activity.createdAt)}
                  </div>
                  <div>
                    <strong style={{ color: "#1e293b" }}>Deadline:</strong> {formatDate(activity.deadline)}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="activity-section-title">Description</div>
              <div style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: "16px",
                fontSize: 13.5,
                lineHeight: 1.7,
                color: "#475569",
              }}>
                {activity.description}
              </div>
            </div>

            {/* Tags */}
            {activity.tags && activity.tags.length > 0 && (
              <div>
                <div className="activity-section-title">Tags</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {activity.tags.map((tag: string, index: number) => (
                    <div key={index} className="activity-tag">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            borderTop: "1px solid #e2e8f0",
            padding: "14px 24px",
            display: "flex",
            justifyContent: "flex-end",
            background: "#fafafa",
            borderRadius: "0 0 16px 16px",
          }}>
            <button
              onClick={onClose}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "9px 20px",
                borderRadius: 10,
                border: "1.5px solid #e2e8f0",
                background: "transparent",
                color: "#475569",
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.transform = "translateY(-1px)" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
