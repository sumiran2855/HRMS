import { Calendar, Eye, SearchX } from "lucide-react"
import { getAllowedActions, RESIGNATION_STATUS_BADGE } from "@/constants/resignation"
import { ResignationRequest, ResignationRole, WorkflowAction } from "@/types/resignation.types"

interface ResignationTableProps {
  requests: ResignationRequest[]
  filteredCount: number
  clearFilters: () => void
  onView: (request: ResignationRequest) => void
  activeRole: ResignationRole
  onAction: (request: ResignationRequest, action: WorkflowAction) => void
}

export function ResignationTable({ requests, filteredCount, clearFilters, onView, activeRole, onAction }: ResignationTableProps) {
  if (filteredCount === 0) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
            <SearchX className="w-8 h-8 text-slate-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No resignation requests found</h3>
            <p className="text-slate-500 text-sm max-w-md">
              Try adjusting your filters to view resignation submissions.
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
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Department</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Applied</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Last Working Day</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Notice</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Handover</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center">
                      {request.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{request.employeeName}</p>
                      <p className="text-xs text-slate-500">{request.employeeId} • {request.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-700">
                  <p>{request.department}</p>
                  <p className="text-xs text-slate-500">{request.designation}</p>
                </td>
                <td className="px-6 py-4 text-sm text-slate-700">
                  <div className="inline-flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {request.appliedDate}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-700">{request.lastWorkingDate}</td>
                <td className="px-6 py-4 text-sm text-slate-700">{request.noticePeriodDays} days</td>
                <td className="px-6 py-4">
                  <div className="w-28">
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${request.handoverProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{request.handoverProgress}%</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${RESIGNATION_STATUS_BADGE[request.status]}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onView(request)}
                      className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {getAllowedActions(request.status, activeRole).map((action) => (
                      <button
                        key={`${request.id}-${action}`}
                        onClick={() => onAction(request, action)}
                        className={`px-2 py-1 text-[11px] font-semibold rounded border transition-colors ${
                          action === "approve"
                            ? "text-green-700 bg-green-50 border-green-200 hover:bg-green-100"
                            : action === "reject"
                              ? "text-red-700 bg-red-50 border-red-200 hover:bg-red-100"
                              : "text-slate-700 bg-slate-50 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {action.charAt(0).toUpperCase() + action.slice(1)}
                      </button>
                    ))}
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
