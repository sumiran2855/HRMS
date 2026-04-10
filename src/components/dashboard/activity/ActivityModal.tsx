"use client"

import { useState } from "react"
import { X, Save, Code, Palette, Server, FileText, CheckCircle, Calendar, Clock, UserCheck, Plus } from "lucide-react"

interface ActivityModalProps {
  isOpen: boolean
  onClose: () => void
  activity?: any
}

export function ActivityModal({ isOpen, onClose, activity }: ActivityModalProps) {
  const [formData, setFormData] = useState({
    id: activity?.id ?? "",
    title: activity?.title ?? "",
    type: activity?.type ?? "Development",
    category: activity?.category ?? "Backend",
    priority: activity?.priority ?? "medium",
    status: activity?.status ?? "pending",
    createdAt: activity?.createdAt ?? "",
    deadline: activity?.deadline ?? "",
    assignee: activity?.assignee ?? "",
    project: activity?.project ?? "",
    description: activity?.description ?? "",
    tags: activity?.tags ?? [],
    estimatedHours: activity?.estimatedHours ?? 0,
    actualHours: activity?.actualHours ?? 0,
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
    if (!formData.title.trim()) e.title = "Activity title is required"
    if (!formData.description.trim()) e.description = "Description is required"
    if (!formData.assignee.trim()) e.assignee = "Assignee is required"
    if (!formData.project.trim()) e.project = "Project is required"
    if (!formData.deadline) e.deadline = "Deadline is required"
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
      alert("Failed to save activity. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const generateActivityId = () => {
    const prefix = "ACT"
    const randomNum = Math.floor(Math.random() * 9000) + 1000
    return `${prefix}${randomNum}`
  }

  const activityTypes = ["Development", "Design", "DevOps", "Testing", "Documentation"]
  const categories = ["Backend", "Frontend", "Database", "UI/UX", "Infrastructure", "Quality Assurance"]
  const statuses = ["pending", "in-progress", "completed", "planning"]
  const priorities = ["high", "medium", "low"]
  const projects = ["HRMS Platform Development", "Mobile App Revamp", "Data Analytics Dashboard", "Cloud Migration Project"]
  const assignees = ["Michael Chen", "David Kim", "Lisa Anderson", "Emily Rodriguez", "James Wilson", "Patricia Garcia", "Robert Taylor", "Christopher Moore"]
  const availableTags = ["API", "Node.js", "Express", "UI/UX", "Tailwind", "Components", "Database", "PostgreSQL", "Schema", "Wireframes", "Figma", "Mobile", "AWS", "Cloud", "DevOps", "Testing", "Jest", "Unit Tests", "Performance", "Optimization", "Authentication", "JWT", "Security", "Migration", "Scripts", "Analytics", "Charts", "Real-time", "CI/CD", "GitHub Actions", "Automation", "Responsive"]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=DM+Mono:wght@400;500&display=swap');

        .activity-modal-overlay * {
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
        }

        .activity-modal-fade {
          animation: activityModalFadeIn 0.2s ease;
        }

        @keyframes activityModalFadeIn {
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

        .activity-field-group {
          margin-bottom: 16px;
        }

        .activity-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .activity-input-wrap {
          position: relative;
        }

        .activity-input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: #94a3b8;
          z-index: 1;
        }

        .activity-input {
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

        .activity-input.with-icon {
          padding-left: 38px;
        }

        .activity-input:focus {
          border-color: #334155;
          box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.1);
        }

        .activity-input.error {
          border-color: #ef4444;
          background: #fff5f5;
        }

        .activity-select {
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

        .activity-select.with-icon {
          padding-left: 38px;
        }

        .activity-select:focus {
          border-color: #334155;
          box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.1);
        }

        .activity-textarea {
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

        .activity-textarea:focus {
          border-color: #334155;
          box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.1);
        }

        .activity-error-msg {
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

        .activity-btn {
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

        .activity-btn-primary {
          background: #3b82f6;
          color: #fff;
        }

        .activity-btn-primary:hover:not(:disabled) {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .activity-btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .activity-btn-secondary {
          background: transparent;
          color: #64748b;
          border: 1.5px solid #e2e8f0;
        }

        .activity-btn-secondary:hover {
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
        className="activity-modal-overlay"
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
          className="activity-modal-fade"
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
                <Plus style={{ width: 17, height: 17, color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
                  {activity ? "Edit Activity" : "Add New Activity"}
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 1 }}>
                  Activity information and assignment details
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
                  <FileText style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Basic Information
                </span>
              </div>
              <div className="section-card-body two-col">
                {/* Activity Title */}
                <div className="activity-field-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="activity-label">Activity Title</label>
                  <div className="activity-input-wrap">
                    <FileText className="activity-input-icon" />
                    <input
                      className={`activity-input with-icon${errors.title ? " error" : ""}`}
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter activity title"
                    />
                  </div>
                  {errors.title && <div className="activity-error-msg">{errors.title}</div>}
                </div>

                {/* Type */}
                <div className="activity-field-group">
                  <label className="activity-label">Type</label>
                  <div className="activity-input-wrap">
                    <Code className="activity-input-icon" />
                    <select
                      className="activity-select with-icon"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      {activityTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Category */}
                <div className="activity-field-group">
                  <label className="activity-label">Category</label>
                  <div className="activity-input-wrap">
                    <Server className="activity-input-icon" />
                    <select
                      className="activity-select with-icon"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="activity-field-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="activity-label">Description</label>
                  <textarea
                    className={`activity-textarea${errors.description ? " error" : ""}`}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter activity description"
                  />
                  {errors.description && <div className="activity-error-msg">{errors.description}</div>}
                </div>
              </div>
            </div>

            {/* Activity Details */}
            <div className="section-card">
              <div className="section-card-header" style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Clock style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Activity Details
                </span>
              </div>
              <div className="section-card-body two-col">
                {/* Status */}
                <div className="activity-field-group">
                  <label className="activity-label">Status</label>
                  <div className="activity-input-wrap">
                    <UserCheck className="activity-input-icon" />
                    <select
                      className="activity-select with-icon"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Priority */}
                <div className="activity-field-group">
                  <label className="activity-label">Priority</label>
                  <div className="activity-input-wrap">
                    <Palette className="activity-input-icon" />
                    <select
                      className="activity-select with-icon"
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

                {/* Created At */}
                <div className="activity-field-group">
                  <label className="activity-label">Created At</label>
                  <div className="activity-input-wrap">
                    <Calendar className="activity-input-icon" />
                    <input
                      className="activity-input with-icon"
                      name="createdAt"
                      type="date"
                      value={formData.createdAt}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Deadline */}
                <div className="activity-field-group">
                  <label className="activity-label">Deadline</label>
                  <div className="activity-input-wrap">
                    <Clock className="activity-input-icon" />
                    <input
                      className={`activity-input with-icon${errors.deadline ? " error" : ""}`}
                      name="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.deadline && <div className="activity-error-msg">{errors.deadline}</div>}
                </div>

                {/* Estimated Hours */}
                <div className="activity-field-group">
                  <label className="activity-label">Estimated Hours</label>
                  <div className="activity-input-wrap">
                    <Clock className="activity-input-icon" />
                    <input
                      className="activity-input with-icon"
                      name="estimatedHours"
                      type="number"
                      value={formData.estimatedHours}
                      onChange={handleChange}
                      placeholder="0"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                </div>

                {/* Actual Hours */}
                <div className="activity-field-group">
                  <label className="activity-label">Actual Hours</label>
                  <div className="activity-input-wrap">
                    <Clock className="activity-input-icon" />
                    <input
                      className="activity-input with-icon"
                      name="actualHours"
                      type="number"
                      value={formData.actualHours}
                      onChange={handleChange}
                      placeholder="0"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Assignment */}
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
                  Assignment
                </span>
              </div>
              <div className="section-card-body two-col">
                {/* Project */}
                <div className="activity-field-group">
                  <label className="activity-label">Project</label>
                  <div className="activity-input-wrap">
                    <Server className="activity-input-icon" />
                    <select
                      className="activity-select with-icon"
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                    >
                      <option value="">Select Project</option>
                      {projects.map((project) => (
                        <option key={project} value={project}>{project}</option>
                      ))}
                    </select>
                  </div>
                  {errors.project && <div className="activity-error-msg">{errors.project}</div>}
                </div>

                {/* Assignee */}
                <div className="activity-field-group">
                  <label className="activity-label">Assignee</label>
                  <div className="activity-input-wrap">
                    <UserCheck className="activity-input-icon" />
                    <select
                      className="activity-select with-icon"
                      name="assignee"
                      value={formData.assignee}
                      onChange={handleChange}
                    >
                      <option value="">Select Assignee</option>
                      {assignees.map((assignee) => (
                        <option key={assignee} value={assignee}>{assignee}</option>
                      ))}
                    </select>
                  </div>
                  {errors.assignee && <div className="activity-error-msg">{errors.assignee}</div>}
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
                  <Palette style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.85)" }}>
                  Tags
                </span>
              </div>
              <div className="section-card-body">
                <div className="activity-field-group" style={{ marginBottom: 0 }}>
                  <label className="activity-label">Activity Tags</label>
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
                className="activity-btn activity-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="activity-btn activity-btn-primary"
                disabled={isSaving || saved}
              >
                {saved ? (
                  <>
                    <CheckCircle style={{ width: 16, height: 16 }} />
                    Activity Saved Successfully!
                  </>
                ) : isSaving ? (
                  <>
                    <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                    Saving Activity...
                  </>
                ) : (
                  <>
                    <Save style={{ width: 16, height: 16 }} />
                    {activity ? "Update Activity" : "Add Activity"}
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
