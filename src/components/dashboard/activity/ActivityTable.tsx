import { Eye, Edit, Trash2, Calendar, Clock, Code, Palette, Server, FileText, SearchX } from "lucide-react"
import { Activity } from "@/types/activity.types"
import { ACTIVITY_STATUS_LABELS } from "@/constants/activity"

interface ActivityTableProps {
  paginatedActivities: Activity[]
  filteredCount: number
  formatDate: (dateString: string) => string
  getStatusColor: (status: string) => string
  getPriorityColor: (priority: string) => string
  onView: (activity: Activity) => void
  onEdit: (activity: Activity) => void
  clearFilters: () => void
}

function getTypeIcon(type: string) {
  switch (type) {
    case "Development":
      return <Code className="w-4 h-4" />
    case "Design":
      return <Palette className="w-4 h-4" />
    case "DevOps":
      return <Server className="w-4 h-4" />
    default:
      return <FileText className="w-4 h-4" />
  }
}

export function ActivityTable({
  paginatedActivities,
  filteredCount,
  formatDate,
  getStatusColor,
  getPriorityColor,
  onView,
  onEdit,
  clearFilters,
}: ActivityTableProps) {
  if (filteredCount === 0) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
            <SearchX className="w-8 h-8 text-slate-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No activities found</h3>
            <p className="text-slate-500 text-sm max-w-md">
              Try adjusting your search filters or check spelling to find activities you&apos;re looking for.
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
    )
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Activity</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Created</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Deadline</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Assignee</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {paginatedActivities.map((activity) => (
              <tr key={activity.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{activity.title}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(activity.type)}
                    <span className="text-sm text-slate-700">{activity.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-700">{activity.category}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(activity.status)}`}>
                    {ACTIVITY_STATUS_LABELS[activity.status]}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(activity.priority)}`}>
                    {activity.priority.charAt(0).toUpperCase() + activity.priority.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {formatDate(activity.createdAt)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {formatDate(activity.deadline)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold">
                      {activity.assignee.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="text-sm text-slate-700">{activity.assignee}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onView(activity)} className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => onEdit(activity)} className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
