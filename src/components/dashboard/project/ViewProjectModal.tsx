"use client"

import { X, Calendar, Users, DollarSign, FileText, TrendingUp, Building2, Star } from "lucide-react"

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

  const statusColors = getStatusColor(project.status)

  return (
    <div
      className="fixed inset-0 bg-slate-900/55 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="animate-in fade-in zoom-in-95 duration-200 bg-white rounded-2xl w-full max-w-[800px] max-h-[92vh] overflow-y-auto flex flex-col shadow-2xl">

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-slate-900 to-[#1e3a5f] rounded-t-2xl px-6 pt-7 pb-6 relative">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-[34px] h-[34px] rounded-lg border-[1.5px] border-white/15 bg-transparent hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-white/70" />
          </button>

          {/* Project identity */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-[14px] bg-white/10 border-[1.5px] border-white/15 flex items-center justify-center shrink-0">
              <Building2 className="w-[26px] h-[26px] text-white/70" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white tracking-tight leading-tight">
                {project.name}
              </div>
              <div className="text-[13px] text-white/50 mt-1 flex items-center gap-1.5">
                <Building2 className="w-3 h-3" />
                {project.client}
              </div>
            </div>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-2">
            <span
              className="inline-flex items-center gap-[5px] px-2.5 py-[3px] rounded-full text-[11px] font-medium"
              style={{ background: statusColors.bg, color: statusColors.color, border: `1px solid ${statusColors.border}` }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {project.status === 'in-progress' ? 'In Progress' : project.status === 'on-hold' ? 'On Hold' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
            <span className="inline-flex items-center gap-[5px] px-2.5 py-[3px] rounded-full bg-white/[0.08] text-white/60 text-[11px] font-medium">
              <Calendar className="w-2.5 h-2.5" />
              {formatDate(project.startDate)} - {formatDate(project.endDate)}
            </span>
            <span className="inline-flex items-center gap-[5px] px-2.5 py-[3px] rounded-full bg-white/[0.08] text-white/60 text-[11px] font-medium">
              <FileText className="w-2.5 h-2.5" />
              ID: {project.id}
            </span>
            <span className="inline-flex items-center gap-[5px] px-2.5 py-[3px] rounded-full bg-white/[0.08] text-white/60 text-[11px] font-medium">
              <Users className="w-2.5 h-2.5" />
              {project.employees} members
            </span>
            <span className="inline-flex items-center gap-[5px] px-2.5 py-[3px] rounded-full bg-white/[0.08] text-white/60 text-[11px] font-medium">
              <Star className="w-2.5 h-2.5" />
              {project.rating} / 5
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5">

          {/* Key Metrics */}
          <div>
            <div className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-slate-400 mb-3">Key Metrics</div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3">
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-[18px] py-4 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-teal-700" />
                  <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">Budget</span>
                </div>
                <div className="text-[22px] font-extrabold text-slate-900 font-mono tracking-tight leading-none">{formatCurrency(project.budget)}</div>
                <div className="text-[11px] text-slate-400">{project.priority} priority</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl px-[18px] py-4 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-orange-600" />
                  <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">Team Size</span>
                </div>
                <div className="text-xl font-extrabold text-slate-900 font-mono tracking-tight leading-none">{project.employees}</div>
                <div className="text-[11px] text-slate-400">Active members</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl px-[18px] py-4 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-violet-600" />
                  <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">Progress</span>
                </div>
                <div className="text-[22px] font-extrabold text-slate-900 font-mono tracking-tight leading-none">{project.progress}%</div>
                <div className="text-[11px] text-slate-400">On track</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl px-[18px] py-4 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">Rating</span>
                </div>
                <div className="text-xl font-extrabold text-slate-900 font-mono tracking-tight leading-none">{project.rating}</div>
                <div className="text-[11px] text-slate-400">Out of 5</div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div>
            <div className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-slate-400 mb-3">Project Details</div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-[18px] py-4 text-[13.5px] leading-[1.7] text-slate-600">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                <div>
                  <strong className="text-slate-800">Project Type:</strong> {project.priority} priority
                </div>
                <div>
                  <strong className="text-slate-800">Duration:</strong> {formatDate(project.startDate)} - {formatDate(project.endDate)}
                </div>
                <div>
                  <strong className="text-slate-800">Client:</strong> {project.client}
                </div>
                <div>
                  <strong className="text-slate-800">Coordinator:</strong> {project.projectCoordinator}
                </div>
                <div>
                  <strong className="text-slate-800">Lead:</strong> {project.projectLead}
                </div>
              </div>
            </div>
          </div>

          {/* Team Details */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {/* Team Members */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-br from-slate-800 to-slate-600 px-4 py-2.5">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-white/85">Team Members</span>
              </div>
              <div className="px-4 pt-1 pb-3.5">
                {project.team.map((member: any, index: number) => (
                  <div key={index} className={`flex items-center gap-2 py-1.5 ${index < project.team.length - 1 ? "border-b border-slate-100" : ""}`}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-xs shrink-0">
                      {member.name.split(' ').map((name: string) => name[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] text-slate-900 font-medium mb-0.5">{member.name}</div>
                      <div className="text-[11px] text-slate-400 font-medium">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Description */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-br from-violet-500 to-violet-600 px-4 py-2.5">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-white/85">Project Description</span>
              </div>
              <div className="p-4 text-[13.5px] leading-[1.7] text-slate-600">
                {project.description}
              </div>
            </div>
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-slate-400 mb-3">Tags</div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string, index: number) => (
                  <div key={index} className="inline-flex items-center px-2.5 py-1 rounded-2xl text-[11px] font-medium bg-slate-100 text-slate-600">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Milestones */}
          {project.milestones && project.milestones.length > 0 && (
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-slate-400 mb-3">Milestones</div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                {project.milestones.map((milestone: any, index: number) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between py-2 ${index < project.milestones.length - 1 ? "border-b border-slate-200" : ""}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${milestone.completed ? "bg-green-500" : "bg-slate-200"}`}>
                        {milestone.completed && (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 00-1.414 0l-8-8a1 1 0 00-1.414 1.414L10 11.586l1.414 1.414a1 1 0 011.414 0l4.586 4.586a1 1 0 001.414 1.414L10 16.707a1 1 0 01-1.414-1.414l-8-8a1 1 0 00-1.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-slate-900">{milestone.name}</div>
                        <div className="text-[11px] text-slate-400">{formatDate(milestone.date)}</div>
                      </div>
                    </div>
                    <div className={`text-[11px] font-medium ${milestone.completed ? "text-green-500" : "text-slate-400"}`}>
                      {milestone.completed ? "Completed" : "Pending"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-3.5 flex justify-end bg-[#fafafa] rounded-b-2xl">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center px-5 py-[9px] rounded-[10px] border-[1.5px] border-slate-200 bg-transparent text-slate-600 text-[13.5px] font-semibold cursor-pointer transition-all hover:bg-slate-50 hover:-translate-y-px active:translate-y-0"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
