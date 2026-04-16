"use client"

import { useState } from "react"
import {
  X, Save, Code, Palette, Server, FileText,
  CheckCircle, Calendar, Clock, UserCheck, Plus, Tag
} from "lucide-react"

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
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }))
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

  const activityTypes = ["Development", "Design", "DevOps", "Testing", "Documentation"]
  const categories = ["Backend", "Frontend", "Database", "UI/UX", "Infrastructure", "Quality Assurance"]
  const statuses = ["pending", "in-progress", "completed", "planning"]
  const priorities = ["high", "medium", "low"]
  const projects = ["HRMS Platform Development", "Mobile App Revamp", "Data Analytics Dashboard", "Cloud Migration Project"]
  const assignees = ["Michael Chen", "David Kim", "Lisa Anderson", "Emily Rodriguez", "James Wilson", "Patricia Garcia", "Robert Taylor", "Christopher Moore"]
  const availableTags = ["API", "Node.js", "Express", "UI/UX", "Tailwind", "Components", "Database", "PostgreSQL", "Schema", "Wireframes", "Figma", "Mobile", "AWS", "Cloud", "DevOps", "Testing", "Jest", "Unit Tests", "Performance", "Optimization", "Authentication", "JWT", "Security", "Migration", "Scripts", "Analytics", "Charts", "Real-time", "CI/CD", "GitHub Actions", "Automation", "Responsive"]

  const inputBase = "w-full h-11 rounded-xl border-[1.5px] border-slate-200 bg-white pl-10 pr-4 text-[13.5px] text-slate-900 outline-none transition-all duration-150 focus:border-slate-500 focus:ring-[3px] focus:ring-slate-500/10 placeholder:text-slate-400"
  const inputError = "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/10"
  const selectBase = "w-full h-11 rounded-xl border-[1.5px] border-slate-200 bg-white pl-10 pr-10 text-[13.5px] text-slate-900 outline-none transition-all duration-150 focus:border-slate-500 focus:ring-[3px] focus:ring-slate-500/10 appearance-none cursor-pointer"
  const labelBase = "block text-[11px] font-700 uppercase tracking-[0.07em] text-slate-500 mb-1.5"

  return (
    <>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.97) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .modal-in { animation: modalIn 0.22s cubic-bezier(0.16,1,0.3,1); }
        .spinner { animation: spin 0.7s linear infinite; }
        .select-arrow {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
        }
      `}</style>

      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Modal */}
        <div className="modal-in bg-white rounded-2xl w-full max-w-[860px] max-h-[92vh] overflow-y-auto flex flex-col shadow-[0_32px_64px_rgba(0,0,0,0.2),0_8px_24px_rgba(0,0,0,0.08)]">

          {/* Header */}
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-100 px-6 py-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                <Plus className="w-[17px] h-[17px] text-white" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-slate-900 leading-tight">
                  {activity ? "Edit Activity" : "Add New Activity"}
                </h2>
                <p className="text-[11.5px] text-slate-400 mt-0.5">
                  Activity information and assignment details
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg border-[1.5px] border-slate-200 bg-transparent flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 p-6">

            {/* ── Basic Information ─────────────────────── */}
            <div className="mb-5 rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="px-4 py-3 flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                  <FileText className="w-[14px] h-[14px] text-white" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/90">
                  Basic Information
                </span>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Title — full width */}
                <div className="md:col-span-2">
                  <label className={labelBase}>Activity Title</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      className={`${inputBase} ${errors.title ? inputError : ""}`}
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter activity title"
                    />
                  </div>
                  {errors.title && <p className="text-[11.5px] text-red-500 font-medium mt-1">{errors.title}</p>}
                </div>

                {/* Type */}
                <div>
                  <label className={labelBase}>Type</label>
                  <div className="relative">
                    <Code className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                    <select className={`${selectBase} select-arrow`} name="type" value={formData.type} onChange={handleChange}>
                      {activityTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className={labelBase}>Category</label>
                  <div className="relative">
                    <Server className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                    <select className={`${selectBase} select-arrow`} name="category" value={formData.category} onChange={handleChange}>
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Description — full width */}
                <div className="md:col-span-2">
                  <label className={labelBase}>Description</label>
                  <textarea
                    className={`w-full min-h-[96px] rounded-xl border-[1.5px] bg-white px-4 py-3 text-[13.5px] text-slate-900 outline-none transition-all duration-150 resize-vertical placeholder:text-slate-400 focus:ring-[3px] ${errors.description ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/10" : "border-slate-200 focus:border-slate-500 focus:ring-slate-500/10"}`}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter activity description"
                  />
                  {errors.description && <p className="text-[11.5px] text-red-500 font-medium mt-1">{errors.description}</p>}
                </div>
              </div>
            </div>

            {/* ── Activity Details ───────────────────────── */}
            <div className="mb-5 rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="px-4 py-3 flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-emerald-500">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                  <Clock className="w-[14px] h-[14px] text-white" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/90">
                  Activity Details
                </span>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Status */}
                <div>
                  <label className={labelBase}>Status</label>
                  <div className="relative">
                    <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                    <select className={`${selectBase} select-arrow`} name="status" value={formData.status} onChange={handleChange}>
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s === "in-progress" ? "In Progress" : s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label className={labelBase}>Priority</label>
                  <div className="relative">
                    <Palette className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                    <select className={`${selectBase} select-arrow`} name="priority" value={formData.priority} onChange={handleChange}>
                      {priorities.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                    </select>
                  </div>
                </div>

                {/* Created At */}
                <div>
                  <label className={labelBase}>Created At</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                    <input className={inputBase} type="date" name="createdAt" value={formData.createdAt} onChange={handleChange} />
                  </div>
                </div>

                {/* Deadline */}
                <div>
                  <label className={labelBase}>Deadline</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                    <input
                      className={`${inputBase} ${errors.deadline ? inputError : ""}`}
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.deadline && <p className="text-[11.5px] text-red-500 font-medium mt-1">{errors.deadline}</p>}
                </div>

                {/* Estimated Hours */}
                <div>
                  <label className={labelBase}>Estimated Hours</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                    <input className={`${inputBase} font-mono`} type="number" name="estimatedHours" value={formData.estimatedHours} onChange={handleChange} placeholder="0" />
                  </div>
                </div>

                {/* Actual Hours */}
                <div>
                  <label className={labelBase}>Actual Hours</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                    <input className={`${inputBase} font-mono`} type="number" name="actualHours" value={formData.actualHours} onChange={handleChange} placeholder="0" />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Assignment ─────────────────────────────── */}
            <div className="mb-5 rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="px-4 py-3 flex items-center gap-3 bg-gradient-to-r from-violet-600 to-violet-500">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                  <UserCheck className="w-[14px] h-[14px] text-white" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/90">
                  Assignment
                </span>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Project */}
                <div>
                  <label className={labelBase}>Project</label>
                  <div className="relative">
                    <Server className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                    <select className={`${selectBase} select-arrow`} name="project" value={formData.project} onChange={handleChange}>
                      <option value="">Select Project</option>
                      {projects.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  {errors.project && <p className="text-[11.5px] text-red-500 font-medium mt-1">{errors.project}</p>}
                </div>

                {/* Assignee */}
                <div>
                  <label className={labelBase}>Assignee</label>
                  <div className="relative">
                    <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
                    <select className={`${selectBase} select-arrow`} name="assignee" value={formData.assignee} onChange={handleChange}>
                      <option value="">Select Assignee</option>
                      {assignees.map((a) => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                  {errors.assignee && <p className="text-[11.5px] text-red-500 font-medium mt-1">{errors.assignee}</p>}
                </div>
              </div>
            </div>

            {/* ── Tags ───────────────────────────────────── */}
            <div className="mb-6 rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="px-4 py-3 flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-400">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                  <Tag className="w-[14px] h-[14px] text-white" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/90">
                  Tags
                </span>
              </div>
              <div className="p-5">
                <label className={labelBase}>Activity Tags</label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => {
                    const isSelected = formData.tags.includes(tag)
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagChange(tag)}
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-[12px] font-medium border-[1.5px] cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/25"
                            : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {tag}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* ── Actions ────────────────────────────────── */}
            <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[13.5px] font-semibold border-[1.5px] border-slate-200 bg-transparent text-slate-600 cursor-pointer transition-all hover:bg-slate-50 hover:-translate-y-px hover:shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving || saved}
                className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[13.5px] font-semibold text-white cursor-pointer transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 ${
                  saved
                    ? "bg-emerald-600 shadow-lg shadow-emerald-600/25"
                    : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-px hover:shadow-lg hover:shadow-blue-600/25"
                }`}
              >
                {saved ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Activity Saved Successfully!
                  </>
                ) : isSaving ? (
                  <>
                    <div className="spinner w-4 h-4 rounded-full border-2 border-white/40 border-t-white" />
                    Saving Activity...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {activity ? "Update Activity" : "Add Activity"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}