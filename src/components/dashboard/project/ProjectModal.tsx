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
    <div
      className="fixed inset-0 bg-slate-900/55 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="animate-in fade-in zoom-in-95 duration-200 bg-white rounded-2xl w-full max-w-[900px] max-h-[92vh] overflow-y-auto flex flex-col shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0">
              <Building2 className="w-[17px] h-[17px] text-white" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-slate-900">
                {project ? "Edit Project" : "Add New Project"}
              </div>
              <div className="text-xs text-slate-400 mt-px">
                Project information and team details
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-[34px] h-[34px] rounded-lg border-[1.5px] border-slate-200 bg-transparent hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex-1">
          {/* Basic Information */}
          <div className="border border-slate-200 rounded-xl overflow-hidden mb-5">
            <div className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-br from-blue-500 to-blue-600">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <Building2 className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Basic Information</span>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Project Name */}
              <div className="mb-0">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Project Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.name ? "border-red-500 bg-red-50/50" : "border-slate-200"}`}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter project name"
                  />
                </div>
                {errors.name && <div className="text-[11.5px] text-red-600 font-medium mt-1">{errors.name}</div>}
              </div>

              {/* Client */}
              <div className="mb-0">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Client</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <select
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white bg-[url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E&quot;)] bg-no-repeat bg-[right_14px_center] pl-[38px] pr-[38px] text-[13.5px] text-slate-900 outline-none cursor-pointer transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 appearance-none"
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
                {errors.client && <div className="text-[11.5px] text-red-600 font-medium mt-1">{errors.client}</div>}
              </div>

              {/* Description */}
              <div className="col-span-full mb-0">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Description</label>
                <textarea
                  className={`w-full min-h-[100px] rounded-[10px] border-[1.5px] bg-white p-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 resize-y ${errors.description ? "border-red-500 bg-red-50/50" : "border-slate-200"}`}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter project description"
                />
                {errors.description && <div className="text-[11.5px] text-red-600 font-medium mt-1">{errors.description}</div>}
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="border border-slate-200 rounded-xl overflow-hidden mb-5">
            <div className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-br from-emerald-500 to-emerald-600">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Project Details</span>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Status */}
              <div className="mb-0">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Status</label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <select
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white bg-[url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E&quot;)] bg-no-repeat bg-[right_14px_center] pl-[38px] pr-[38px] text-[13.5px] text-slate-900 outline-none cursor-pointer transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 appearance-none"
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
              <div className="mb-0">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Priority</label>
                <div className="relative">
                  <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <select
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white bg-[url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E&quot;)] bg-no-repeat bg-[right_14px_center] pl-[38px] pr-[38px] text-[13.5px] text-slate-900 outline-none cursor-pointer transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 appearance-none"
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
              <div className="mb-0">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.startDate ? "border-red-500 bg-red-50/50" : "border-slate-200"}`}
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
                {errors.startDate && <div className="text-[11.5px] text-red-600 font-medium mt-1">{errors.startDate}</div>}
              </div>

              {/* End Date */}
              <div className="mb-0">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">End Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.endDate ? "border-red-500 bg-red-50/50" : "border-slate-200"}`}
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>
                {errors.endDate && <div className="text-[11.5px] text-red-600 font-medium mt-1">{errors.endDate}</div>}
              </div>

              {/* Budget */}
              <div className="mb-0">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Budget (USD)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.budget ? "border-red-500 bg-red-50/50" : "border-slate-200"}`}
                    name="budget"
                    type="number"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
                {errors.budget && <div className="text-[11.5px] text-red-600 font-medium mt-1">{errors.budget}</div>}
              </div>

              {/* Employees */}
              <div className="mb-0">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Team Size</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                    name="employees"
                    type="number"
                    value={formData.employees}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Team Leadership */}
          <div className="border border-slate-200 rounded-xl overflow-hidden mb-5">
            <div className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-br from-violet-500 to-violet-600">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <UserCheck className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Team Leadership</span>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Project Coordinator */}
              <div className="mb-0">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Project Coordinator</label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.projectCoordinator ? "border-red-500 bg-red-50/50" : "border-slate-200"}`}
                    name="projectCoordinator"
                    value={formData.projectCoordinator}
                    onChange={handleChange}
                    placeholder="Enter coordinator name"
                  />
                </div>
                {errors.projectCoordinator && <div className="text-[11.5px] text-red-600 font-medium mt-1">{errors.projectCoordinator}</div>}
              </div>

              {/* Project Lead */}
              <div className="mb-0">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Project Lead</label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.projectLead ? "border-red-500 bg-red-50/50" : "border-slate-200"}`}
                    name="projectLead"
                    value={formData.projectLead}
                    onChange={handleChange}
                    placeholder="Enter lead name"
                  />
                </div>
                {errors.projectLead && <div className="text-[11.5px] text-red-600 font-medium mt-1">{errors.projectLead}</div>}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="border border-slate-200 rounded-xl overflow-hidden mb-5">
            <div className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-br from-amber-500 to-amber-600">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Tags</span>
            </div>
            <div className="p-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Project Tags</label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <div
                      key={tag}
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all border-[1.5px] ${
                        formData.tags.includes(tag)
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
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
          <div className="flex justify-end gap-3 pt-5 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] text-[13.5px] font-semibold border-[1.5px] border-slate-200 bg-transparent text-slate-500 cursor-pointer transition-all hover:bg-slate-50 hover:-translate-y-px hover:shadow-md active:translate-y-0"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] text-[13.5px] font-semibold border-none bg-blue-500 text-white cursor-pointer transition-all hover:bg-blue-600 hover:-translate-y-px hover:shadow-md hover:shadow-blue-500/30 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isSaving || saved}
            >
              {saved ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Project Saved Successfully!
                </>
              ) : isSaving ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin shrink-0 inline-block" />
                  Saving Project...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {project ? "Update Project" : "Add Project"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
