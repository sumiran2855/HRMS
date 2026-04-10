"use client"

import { X, Calendar, Users, DollarSign, FileText, UserCheck, Clock, TrendingUp, MapPin, Building2, Star } from "lucide-react"

interface ViewProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: any
}

export function ViewProjectModal({ isOpen, onClose, project }: ViewProjectModalProps) {
  if (!isOpen || !project) return null

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 }).format(amount)

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return { bg: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '#93c5fd' }
      case 'completed': return { bg: 'rgba(34,197,94,0.15)', color: '#22c55e', border: '#bbf7d0' }
      case 'planning': return { bg: 'rgba(250,204,21,0.15)', color: '#facc15', border: '#fde047' }
      case 'on-hold': return { bg: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '#fecaca' }
      default: return { bg: 'rgba(148,163,184,0.15)', color: '#94a3b8', border: '#cbd5e1' }
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-blue-500'
    if (progress >= 25) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const statusColors = getStatusColor(project.status)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&display=swap');

        .view-project-modal * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        .view-project-fade {
          animation: viewProjectFadeIn 0.22s ease;
        }
        @keyframes viewProjectFadeIn {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .project-section-title {
          font-size: 10.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: #94a3b8;
          margin-bottom: 12px;
        }

        .project-info-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .project-info-row:last-child { border-bottom: none; padding-bottom: 0; }
        .project-info-row:first-child { padding-top: 0; }

        .project-icon-box {
          width: 32px; height: 32px; border-radius: 8px;
          background: #f1f5f9;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .project-metric-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .project-metric-label {
          font-size: 11px;
          color: #94a3b8;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .project-metric-value {
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
          font-family: 'DM Mono', monospace;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .project-metric-sub {
          font-size: 11px;
          color: #94a3b8;
        }

        .project-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
        }

        .project-close-btn {
          width: 34px; height: 34px; border-radius: 8px;
          border: 1.5px solid #e2e8f0;
          background: transparent; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .project-close-btn:hover { background: #f1f5f9; }

        .project-website-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #0f766e;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.15s;
        }
        .project-website-link:hover { color: #0d9488; text-decoration: underline; }

        .project-service-chip {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 16px;
          font-size: 11px;
          font-weight: 500;
          background: #f1f5f9;
          color: #475569;
          margin-right: 6px;
          margin-bottom: 6px;
        }

        .project-document-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 12px;
          color: #475569;
          margin-bottom: 8px;
          background: #f8fafc;
        }

        .project-team-member {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .project-team-member:last-child { border-bottom: none; padding-bottom: 0; }
        .project-team-member:first-child { padding-top: 0; }

        .project-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          display: flex; align-items: center; justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 12px;
          flex-shrink: 0;
        }

        .project-member-info {
          flex: 1;
          min-width: 0;
        }

        .project-member-name {
          font-size: 13px;
          color: #0f172a;
          font-weight: 500;
          margin-bottom: 2px;
        }

        .project-member-role {
          font-size: 11px;
          color: #94a3b8;
          font-weight: 500;
        }

        @media (max-width: 540px) {
          .project-metrics-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <div
        className="view-project-modal"
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
          className="view-project-fade"
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
              className="project-close-btn"
              onClick={onClose}
              style={{ position: "absolute", top: 16, right: 16, borderColor: "rgba(255,255,255,0.15)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <X style={{ width: 16, height: 16, color: "rgba(255,255,255,0.7)" }} />
            </button>

            {/* Project identity */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: "rgba(255,255,255,0.1)",
                border: "1.5px solid rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Building2 style={{ width: 26, height: 26, color: "rgba(255,255,255,0.7)" }} />
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                  {project.name}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  <Building2 style={{ width: 12, height: 12 }} />
                  {project.client}
                </div>
              </div>
            </div>

            {/* Chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <span className="project-tag" style={{ background: statusColors.bg, color: statusColors.color, border: `1px solid ${statusColors.border}` }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} />
                {project.status === 'in-progress' ? 'In Progress' : project.status === 'on-hold' ? 'On Hold' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "3px 10px", borderRadius: 20,
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
                fontSize: 11, fontWeight: 500,
              }}>
                <Calendar style={{ width: 10, height: 10 }} />
                {formatDate(project.startDate)} - {formatDate(project.endDate)}
              </span>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "3px 10px", borderRadius: 20,
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
                fontSize: 11, fontWeight: 500,
              }}>
                <FileText style={{ width: 10, height: 10 }} />
                ID: {project.id}
              </span>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "3px 10px", borderRadius: 20,
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
                fontSize: 11, fontWeight: 500,
              }}>
                <Users style={{ width: 10, height: 10 }} />
                {project.employees} members
              </span>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "3px 10px", borderRadius: 20,
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
                fontSize: 11, fontWeight: 500,
              }}>
                <Star style={{ width: 10, height: 10 }} />
                {project.rating} / 5
              </span>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Key Metrics */}
            <div>
              <div className="project-section-title">Key Metrics</div>
              <div
                className="project-metrics-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: 12,
                }}
              >
                <div className="project-metric-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <DollarSign style={{ width: 14, height: 14, color: "#0f766e" }} />
                    <span className="project-metric-label">Budget</span>
                  </div>
                  <div className="project-metric-value">{formatCurrency(project.budget)}</div>
                  <div className="project-metric-sub">{project.priority} priority</div>
                </div>

                <div className="project-metric-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Users style={{ width: 14, height: 14, color: "#ea580c" }} />
                    <span className="project-metric-label">Team Size</span>
                  </div>
                  <div className="project-metric-value" style={{ fontSize: 20 }}>{project.employees}</div>
                  <div className="project-metric-sub">Active members</div>
                </div>

                <div className="project-metric-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <TrendingUp style={{ width: 14, height: 14, color: "#7c3aed" }} />
                    <span className="project-metric-label">Progress</span>
                  </div>
                  <div className="project-metric-value">{project.progress}%</div>
                  <div className="project-metric-sub">On track</div>
                </div>

                <div className="project-metric-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Star style={{ width: 14, height: 14, color: "#f59e0b" }} />
                    <span className="project-metric-label">Rating</span>
                  </div>
                  <div className="project-metric-value" style={{ fontSize: 20 }}>{project.rating}</div>
                  <div className="project-metric-sub">Out of 5</div>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div>
              <div className="project-section-title">Project Details</div>
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
                    <strong style={{ color: "#1e293b" }}>Project Type:</strong> {project.priority} priority
                  </div>
                  <div>
                    <strong style={{ color: "#1e293b" }}>Duration:</strong> {formatDate(project.startDate)} - {formatDate(project.endDate)}
                  </div>
                  <div>
                    <strong style={{ color: "#1e293b" }}>Client:</strong> {project.client}
                  </div>
                  <div>
                    <strong style={{ color: "#1e293b" }}>Coordinator:</strong> {project.projectCoordinator}
                  </div>
                  <div>
                    <strong style={{ color: "#1e293b" }}>Lead:</strong> {project.projectLead}
                  </div>
                </div>
              </div>
            </div>

            {/* Team Details */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
            }}>
              {/* Team Members */}
              <div style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                overflow: "hidden",
              }}>
                <div style={{
                  background: "linear-gradient(135deg, #1e293b, #334155)",
                  padding: "10px 16px",
                }}>
                  <span style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", color: "rgba(255,255,255,0.85)" }}>
                    Team Members
                  </span>
                </div>
                <div style={{ padding: "4px 16px 14px" }}>
                  {project.team.map((member: any, index: number) => (
                    <div key={index} className="project-team-member">
                      <div className="project-avatar">
                        {member.name.split(' ').map((name: string) => name[0]).join('')}
                      </div>
                      <div className="project-member-info">
                        <div className="project-member-name">{member.name}</div>
                        <div className="project-member-role">{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Description */}
              <div style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                overflow: "hidden",
              }}>
                <div style={{
                  background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                  padding: "10px 16px",
                }}>
                  <span style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", color: "rgba(255,255,255,0.85)" }}>
                    Project Description
                  </span>
                </div>
                <div style={{ padding: "16px", fontSize: 13.5, lineHeight: 1.7, color: "#475569" }}>
                  {project.description}
                </div>
              </div>
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div>
                <div className="project-section-title">Tags</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {project.tags.map((tag: string, index: number) => (
                    <div key={index} className="project-service-chip">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Milestones */}
            {project.milestones && project.milestones.length > 0 && (
              <div>
                <div className="project-section-title">Milestones</div>
                <div style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "16px",
                }}>
                  {project.milestones.map((milestone: any, index: number) => (
                    <div key={index} style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 0",
                      borderBottom: index < project.milestones.length - 1 ? "1px solid #e2e8f0" : "none",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: "50%",
                          background: milestone.completed ? "#22c55e" : "#e2e8f0",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          {milestone.completed && (
                            <svg style={{ width: 12, height: 12 }} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 00-1.414 0l-8-8a1 1 0 00-1.414 1.414L10 11.586l1.414 1.414a1 1 0 011.414 0l4.586 4.586a1 1 0 001.414 1.414L10 16.707a1 1 0 01-1.414-1.414l-8-8a1 1 0 00-1.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500, color: "#0f172a" }}>{milestone.name}</div>
                          <div style={{ fontSize: 11, color: "#94a3b8" }}>{formatDate(milestone.date)}</div>
                        </div>
                      </div>
                      <div style={{
                        fontSize: 11,
                        color: milestone.completed ? "#22c55e" : "#94a3b8",
                        fontWeight: 500,
                      }}>
                        {milestone.completed ? "Completed" : "Pending"}
                      </div>
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
