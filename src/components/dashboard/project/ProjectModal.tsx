"use client"

import { useState } from "react"
import { X, Save, Building2, Users, Calendar, DollarSign, FileText, CheckCircle, Plus, Star, UserCheck, Clock, TrendingUp, MapPin } from "lucide-react"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project?: any
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [formData, setFormData] = useState({
    id: project?.id ?? "",
    name: project?.name ?? "",
    description: project?.description ?? "",
    status: project?.status ?? "planning",
    priority: project?.priority ?? "medium",
    startDate: project?.startDate ?? "",
    endDate: project?.endDate ?? "",
    progress: project?.progress ?? 0,
    employees: project?.employees ?? 0,
    projectCoordinator: project?.projectCoordinator ?? "",
    projectLead: project?.projectLead ?? "",
    budget: project?.budget ?? "",
    client: project?.client ?? "",
    tags: project?.tags ?? [],
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTagChange = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t: string) => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.name.trim()) e.name = "Project name is required"
    if (!formData.description.trim()) e.description = "Description is required"
    if (!formData.client.trim()) e.client = "Client is required"
    if (!formData.projectCoordinator.trim()) e.projectCoordinator = "Project coordinator is required"
    if (!formData.projectLead.trim()) e.projectLead = "Project lead is required"
    if (!formData.budget) e.budget = "Budget is required"
    if (!formData.startDate) e.startDate = "Start date is required"
    if (!formData.endDate) e.endDate = "End date is required"
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1600))
      setSaved(true)
      setTimeout(() => { setSaved(false); onClose() }, 1800)
    } catch {
      alert("Failed to save project. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const generateProjectId = () => {
    const prefix = "PRJ"
    const randomNum = Math.floor(Math.random() * 9000) + 1000
    return `${prefix}${randomNum}`
  }

  const statuses = ["planning", "in-progress", "completed", "on-hold"]
  const priorities = ["high", "medium", "low"]
  const clients = ["Global Tech Solutions", "Retail Dynamics Ltd", "Financial Services Corp", "Healthcare Plus Inc"]
  const availableTags = ["Development", "Design", "Analytics", "Mobile", "Cloud", "Migration", "High Priority", "Low Priority"]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&display=swap');

        .project-modal-overlay * {
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
        }

        .project-modal-fade {
          animation: projectModalFadeIn 0.2s ease;
        }

        @keyframes projectModalFadeIn {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .section-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .section-card-header {
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .section-card-body {
          padding: 16px;
        }

        .section-card-body.two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .project-field-group {
          margin-bottom: 16px;
        }

        .project-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .project-input-wrap {
          position: relative;
        }

        .project-input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: #94a3b8;
          z-index: 1;
        }

        .project-input {
          width: 100%;
          height: 44px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          padding: 0 14px 0 38px;
          font-size: 13.5px;
          color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }

        .project-input.with-icon {
          padding-left: 38px;
        }

        .project-input:focus {
          border-color: #334155;
          box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.1);
        }

        .project-input.error {
          border-color: #ef4444;
          background: #fff5f5;
        }

        .project-select {
          width: 100%;
          height: 44px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 14px center;
          padding: 0 38px 0 14px;
          font-size: 13.5px;
          color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          cursor: pointer;
          transition: border-color 0.15s, box-shadow 0.15s;
          appearance: none;
        }

        .project-select.with-icon {
          padding-left: 38px;
        }

        .project-select:focus {
          border-color: #334155;
          box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.1);
        }

        .project-textarea {
          width: 100%;
          min-height: 100px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          padding: 12px 14px;
          font-size: 13.5px;
          color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          resize: vertical;
        }

        .project-textarea:focus {
          border-color: #334155;
          box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.1);
        }

        .project-error-msg {
          color: #dc2626;
          font-size: 11.5px;
          font-weight: 500;
          margin-top: 4px;
        }

        .tag-chip {
          display: inline-flex;
          align-items: center;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
          margin-right: 8px;
          margin-bottom: 8px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          color: #475569;
        }

        .tag-chip:hover {
          background: #f8fafc;
        }

        .tag-chip.selected {
          background: #3b82f6;
          color: #fff;
          border-color: #3b82f6;
        }

        .project-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'DM Sans', sans-serif;
        }

        .project-btn-primary {
          background: #3b82f6;
          color: #fff;
        }

        .project-btn-primary:hover:not(:disabled) {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .project-btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .project-btn-secondary {
          background: transparent;
          color: #64748b;
          border: 1.5px solid #e2e8f0;
        }

        .project-btn-secondary:hover {
          background: #f8fafc;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .section-card-body.two-col {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div
        className="project-modal-overlay"
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
          className="project-modal-fade"
          style={{
            background: "#fff",
            borderRadius: 16,
            width: "100%",
            maxWidth: 900,
            maxHeight: "92vh",
            overflowY: "auto",
            boxShadow: "0 24px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              position: "sticky", top: 0, zIndex: 10,
              background: "#fff",
              borderBottom: "1px solid #e2e8f0",
              padding: "16px 24px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              borderRadius: "16px 16px 0 0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Building2 style={{ width: 17, height: 17, color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
                  {project ? "Edit Project" : "Add New Project"}
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 1 }}>
                  Project information and team details
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 34, height: 34, borderRadius: 8,
                border: "1.5px solid #e2e8f0",
                background: "transparent", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <X style={{ width: 16, height: 16, color: "#64748b" }} />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} style={{ padding: "24px", flex: 1 }}>
            {/* Basic Information */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Building2 style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Basic Information
                </span>
              </div>
              <div className="section-card-body two-col">
                {/* Project Name */}
                <div className="project-field-group">
                  <label className="project-label">Project Name</label>
                  <div className="project-input-wrap">
                    <Building2 className="project-input-icon" />
                    <input
                      className={`project-input with-icon${errors.name ? " error" : ""}`}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter project name"
                    />
                  </div>
                  {errors.name && <div className="project-error-msg">{errors.name}</div>}
                </div>

                {/* Client */}
                <div className="project-field-group">
                  <label className="project-label">Client</label>
                  <div className="project-input-wrap">
                    <Users className="project-input-icon" />
                    <select
                      className="project-select with-icon"
                      name="client"
                      value={formData.client}
                      onChange={handleChange}
                    >
                      <option value="">Select Client</option>
                      {clients.map((client) => (
                        <option key={client} value={client}>{client}</option>
                      ))}
                    </select>
                  </div>
                  {errors.client && <div className="project-error-msg">{errors.client}</div>}
                </div>

                {/* Description */}
                <div className="project-field-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="project-label">Description</label>
                  <textarea
                    className={`project-textarea${errors.description ? " error" : ""}`}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter project description"
                  />
                  {errors.description && <div className="project-error-msg">{errors.description}</div>}
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <FileText style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Project Details
                </span>
              </div>
              <div className="section-card-body two-col">
                {/* Status */}
                <div className="project-field-group">
                  <label className="project-label">Status</label>
                  <div className="project-input-wrap">
                    <UserCheck className="project-input-icon" />
                    <select
                      className="project-select with-icon"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status === 'in-progress' ? 'In Progress' : status === 'on-hold' ? 'On Hold' : status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Priority */}
                <div className="project-field-group">
                  <label className="project-label">Priority</label>
                  <div className="project-input-wrap">
                    <Star className="project-input-icon" />
                    <select
                      className="project-select with-icon"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                    >
                      {priorities.map((priority) => (
                        <option key={priority} value={priority}>
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Start Date */}
                <div className="project-field-group">
                  <label className="project-label">Start Date</label>
                  <div className="project-input-wrap">
                    <Calendar className="project-input-icon" />
                    <input
                      className={`project-input with-icon${errors.startDate ? " error" : ""}`}
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.startDate && <div className="project-error-msg">{errors.startDate}</div>}
                </div>

                {/* End Date */}
                <div className="project-field-group">
                  <label className="project-label">End Date</label>
                  <div className="project-input-wrap">
                    <Calendar className="project-input-icon" />
                    <input
                      className={`project-input with-icon${errors.endDate ? " error" : ""}`}
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.endDate && <div className="project-error-msg">{errors.endDate}</div>}
                </div>

                {/* Budget */}
                <div className="project-field-group">
                  <label className="project-label">Budget (USD)</label>
                  <div className="project-input-wrap">
                    <DollarSign className="project-input-icon" />
                    <input
                      className={`project-input with-icon${errors.budget ? " error" : ""}`}
                      name="budget"
                      type="number"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="0"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                  {errors.budget && <div className="project-error-msg">{errors.budget}</div>}
                </div>

                {/* Employees */}
                <div className="project-field-group">
                  <label className="project-label">Team Size</label>
                  <div className="project-input-wrap">
                    <Users className="project-input-icon" />
                    <input
                      className="project-input with-icon"
                      name="employees"
                      type="number"
                      value={formData.employees}
                      onChange={handleChange}
                      placeholder="0"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Team Leadership */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <UserCheck style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Team Leadership
                </span>
              </div>
              <div className="section-card-body two-col">
                {/* Project Coordinator */}
                <div className="project-field-group">
                  <label className="project-label">Project Coordinator</label>
                  <div className="project-input-wrap">
                    <UserCheck className="project-input-icon" />
                    <input
                      className={`project-input with-icon${errors.projectCoordinator ? " error" : ""}`}
                      name="projectCoordinator"
                      value={formData.projectCoordinator}
                      onChange={handleChange}
                      placeholder="Enter coordinator name"
                    />
                  </div>
                  {errors.projectCoordinator && <div className="project-error-msg">{errors.projectCoordinator}</div>}
                </div>

                {/* Project Lead */}
                <div className="project-field-group">
                  <label className="project-label">Project Lead</label>
                  <div className="project-input-wrap">
                    <UserCheck className="project-input-icon" />
                    <input
                      className={`project-input with-icon${errors.projectLead ? " error" : ""}`}
                      name="projectLead"
                      value={formData.projectLead}
                      onChange={handleChange}
                      placeholder="Enter lead name"
                    />
                  </div>
                  {errors.projectLead && <div className="project-error-msg">{errors.projectLead}</div>}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <TrendingUp style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Tags
                </span>
              </div>
              <div className="section-card-body">
                <div className="project-field-group" style={{ marginBottom: 0 }}>
                  <label className="project-label">Project Tags</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {availableTags.map((tag) => (
                      <div
                        key={tag}
                        className={`tag-chip ${formData.tags.includes(tag) ? "selected" : ""}`}
                        onClick={() => handleTagChange(tag)}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div style={{
              display: "flex", justifyContent: "flex-end", gap: 12,
              paddingTop: 20, borderTop: "1px solid #e2e8f0",
            }}>
              <button
                type="button"
                onClick={onClose}
                className="project-btn project-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="project-btn project-btn-primary"
                disabled={isSaving || saved}
              >
                {saved ? (
                  <>
                    <CheckCircle style={{ width: 16, height: 16 }} />
                    Project Saved Successfully!
                  </>
                ) : isSaving ? (
                  <>
                    <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                    Saving Project...
                  </>
                ) : (
                  <>
                    <Save style={{ width: 16, height: 16 }} />
                    {project ? "Update Project" : "Add Project"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  )
}
