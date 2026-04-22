import { Eye, Edit, Trash2, SearchX, Calendar, Clock, UserCheck } from "lucide-react"
import { Project } from "@/types/project.types"
import { PROJECT_STATUS_LABELS } from "@/constants/project"

interface ProjectCardsGridProps {
  paginatedProjects: Project[]
  filteredCount: number
  formatCurrency: (amount: number) => string
  formatDate: (dateString: string) => string
  getStatusColor: (status: string) => { bg: string; color: string; border: string }
  getPriorityColor: (priority: string) => string
  getProgressColor: (progress: number) => string
  onView: (project: Project) => void
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
  clearFilters: () => void
}

export function ProjectCardsGrid({
  paginatedProjects, filteredCount, formatCurrency, formatDate,
  getStatusColor, getPriorityColor, getProgressColor,
  onView, onEdit, onDelete, clearFilters,
}: ProjectCardsGridProps) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {paginatedProjects.map((project) => {
          const statusColors = getStatusColor(project.status)
          const priorityColor = getPriorityColor(project.priority)
          const progressColor = getProgressColor(project.progress)

          return (
            <div key={project.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              {/* Card Header */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">{project.name}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${statusColors.bg} ${statusColors.color} ${statusColors.border}`}>
                      {PROJECT_STATUS_LABELS[project.status]}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${priorityColor}`} title={`Priority: ${project.priority}`} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-slate-500">Project ID:</span><span className="font-medium text-slate-900 ml-1">{project.id}</span></div>
                  <div><span className="text-slate-500">Client:</span><span className="font-medium text-slate-900 ml-1">{project.client}</span></div>
                  <div><span className="text-slate-500">Budget:</span><span className="font-medium text-slate-900 ml-1">{formatCurrency(project.budget)}</span></div>
                  <div><span className="text-slate-500">Team Size:</span><span className="font-medium text-slate-900 ml-1">{project.employees} members</span></div>
                  <div><span className="text-slate-500">Rating:</span><span className="font-medium text-slate-900 ml-1">{project.rating}</span></div>
                  <div><span className="text-slate-500">Priority:</span><span className="font-medium text-slate-900 ml-1">{project.priority}</span></div>
                </div>
              </div>

              {/* Progress */}
              <div className="px-6 py-4 bg-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Progress</span>
                  <span className="text-sm font-semibold text-slate-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className={`h-2 rounded-full transition-all duration-300 ${progressColor}`} style={{ width: `${project.progress}%` }} />
                </div>
              </div>

              {/* Timeline */}
              <div className="px-6 py-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500">Start:</span>
                    <span className="font-medium text-slate-900">{formatDate(project.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500">End:</span>
                    <span className="font-medium text-slate-900">{formatDate(project.endDate)}</span>
                  </div>
                </div>
              </div>

              {/* Team Leadership */}
              <div className="px-6 py-4 border-t border-slate-100">
                <span className="text-sm font-medium text-slate-700 block mb-3">Team Leadership</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-indigo-500" />
                    <div>
                      <span className="text-slate-500">Coordinator:</span>
                      <span className="font-medium text-slate-900 ml-1">{project.projectCoordinator}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-green-500" />
                    <div>
                      <span className="text-slate-500">Lead:</span>
                      <span className="font-medium text-slate-900 ml-1">{project.projectLead}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-sm font-medium text-slate-700 block mb-2">Team Members ({project.team.length})</span>
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 6).map((member, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium border-2 border-white shadow-sm"
                        title={`${member.name} - ${member.role}`}
                      >
                        {member.avatar}
                      </div>
                    ))}
                    {project.team.length > 6 && (
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-medium border-2 border-white shadow-sm">
                        +{project.team.length - 6}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tags */}
              {project.tags.length > 0 && (
                <div className="px-6 py-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Last updated: {formatDate(project.endDate)}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => onView(project)} className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors" title="View Project Details">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => onEdit(project)} className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors" title="Edit Project">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(project)} className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors" title="Delete Project">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredCount === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
              <SearchX className="w-8 h-8 text-slate-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No projects found</h3>
              <p className="text-slate-500 text-sm max-w-md">
                Try adjusting your search filters or check spelling to find projects you&apos;re looking for.
              </p>
            </div>
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </>
  )
}
