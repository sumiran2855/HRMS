"use client"

import { useState } from "react"
import { X, Save, Building2, Users, Calendar, DollarSign, FileText, CheckCircle, Star, UserCheck, Clock, TrendingUp, Plus, Trash2 } from "lucide-react"

interface EditProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: any
}

export function EditProjectModal({ isOpen, onClose, project }: EditProjectModalProps) {
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
    rating: project?.rating ?? "",
    budget: project?.budget ?? "",
    client: project?.client ?? "",
    tags: project?.tags ?? [],
    team: project?.team ?? [],
    milestones: project?.milestones ?? [],
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen || !project) return null

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

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      team: [...prev.team, { name: "", role: "", avatar: "" }]
    }))
  }

  const updateTeamMember = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      team: prev.team.map((m: any, i: number) =>
        i === index ? { ...m, [field]: value, avatar: field === "name" ? value.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) : m.avatar } : m
      )
    }))
  }

  const removeTeamMember = (index: number) => {
    setFormData(prev => ({ ...prev, team: prev.team.filter((_: any, i: number) => i !== index) }))
  }

  const addMilestone = () => {
    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, { name: "", date: "", completed: false }]
    }))
  }

  const updateMilestone = (index: number, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.map((m: any, i: number) => i === index ? { ...m, [field]: value } : m)
    }))
  }

  const removeMilestone = (index: number) => {
    setFormData(prev => ({ ...prev, milestones: prev.milestones.filter((_: any, i: number) => i !== index) }))
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
      alert("Failed to update project. Please try again.")
    } finally {
      setIsSaving(false)
    }
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
      <div className="animate-in fade-in zoom-in-95 duration-200 bg-white rounded-2xl w-full max-w-[900px] max-h-[92vh] overflow-y-auto flex flex-col shadow-2xl [&::-webkit-scrollbar]:hidden">

        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shrink-0">
              <FileText className="w-[17px] h-[17px] text-white" />
             </div>
            <div>
              <div className="text-[15px] font-bold text-slate-900">Edit Project</div>
              <div className="text-xs text-slate-400 mt-px">
                Update project information and team details
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
            <div className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-br from-emerald-500 to-emerald-600">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-white" />
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
            <div className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-br from-violet-500 to-violet-600">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <Clock className="w-3.5 h-3.5 text-white" />
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
            <div className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-br from-violet-600 to-indigo-500">
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

              {/* Rating */}
              <div className="mb-0">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Rating (0–5)</label>
                <div className="relative">
                  <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 font-mono outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleChange}
                    placeholder="e.g. 4.5"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="border border-slate-200 rounded-xl overflow-hidden mb-5">
            <div className="flex items-center justify-between gap-2.5 px-4 py-3 bg-gradient-to-br from-blue-500 to-indigo-600">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Team Members</span>
              </div>
              <button type="button" onClick={addTeamMember} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[11px] font-medium transition-colors cursor-pointer">
                <Plus className="w-3 h-3" /> Add Member
              </button>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {formData.team.length === 0 && (
                <p className="text-[12px] text-slate-400 text-center py-2">No team members added yet. Click &quot;Add Member&quot; to begin.</p>
              )}
              {formData.team.map((member: any, index: number) => (
                <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-3 items-end">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">Name</label>
                    <input
                      className="w-full h-9 rounded-[8px] border-[1.5px] border-slate-200 bg-white px-3 text-[13px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                      value={member.name}
                      onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">Role</label>
                    <input
                      className="w-full h-9 rounded-[8px] border-[1.5px] border-slate-200 bg-white px-3 text-[13px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                      value={member.role}
                      onChange={(e) => updateTeamMember(index, "role", e.target.value)}
                      placeholder="e.g. Developer"
                    />
                  </div>
                  <button type="button" onClick={() => removeTeamMember(index)} className="h-9 w-9 flex items-center justify-center rounded-[8px] border border-red-200 bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="border border-slate-200 rounded-xl overflow-hidden mb-5">
            <div className="flex items-center justify-between gap-2.5 px-4 py-3 bg-gradient-to-br from-teal-500 to-emerald-600">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Milestones</span>
              </div>
              <button type="button" onClick={addMilestone} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[11px] font-medium transition-colors cursor-pointer">
                <Plus className="w-3 h-3" /> Add Milestone
              </button>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {formData.milestones.length === 0 && (
                <p className="text-[12px] text-slate-400 text-center py-2">No milestones added yet. Click &quot;Add Milestone&quot; to begin.</p>
              )}
              {formData.milestones.map((milestone: any, index: number) => (
                <div key={index} className="grid grid-cols-[1fr_1fr_auto_auto] gap-3 items-end">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">Milestone Name</label>
                    <input
                      className="w-full h-9 rounded-[8px] border-[1.5px] border-slate-200 bg-white px-3 text-[13px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                      value={milestone.name}
                      onChange={(e) => updateMilestone(index, "name", e.target.value)}
                      placeholder="Milestone name"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">Due Date</label>
                    <input
                      type="date"
                      className="w-full h-9 rounded-[8px] border-[1.5px] border-slate-200 bg-white px-3 text-[13px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                      value={milestone.date}
                      onChange={(e) => updateMilestone(index, "date", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <label className="text-[11px] font-medium text-slate-500">Done</label>
                    <input
                      type="checkbox"
                      checked={milestone.completed}
                      onChange={(e) => updateMilestone(index, "completed", e.target.checked)}
                      className="w-4 h-4 accent-teal-600 cursor-pointer"
                    />
                  </div>
                  <button type="button" onClick={() => removeMilestone(index)} className="h-9 w-9 flex items-center justify-center rounded-[8px] border border-red-200 bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
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
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] text-[13.5px] font-semibold border-none bg-emerald-500 text-white cursor-pointer transition-all hover:bg-emerald-600 hover:-translate-y-px hover:shadow-md hover:shadow-emerald-500/30 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isSaving || saved}
            >
              {saved ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Project Updated Successfully!
                </>
              ) : isSaving ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin shrink-0 inline-block" />
                  Updating Project...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Update Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
