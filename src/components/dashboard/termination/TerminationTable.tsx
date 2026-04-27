import { Calendar, Eye, Pencil, SearchX } from "lucide-react"
import {
  getAllowedTerminationActions,
  TERMINATION_STATUS_BADGE,
} from "@/constants/termination"
import {
  TerminationAction,
  TerminationRequest,
  TerminationRole,
} from "@/types/termination.types"

interface TerminationTableProps {
  requests: TerminationRequest[]
  filteredCount: number
  clearFilters: () => void
  onView: (request: TerminationRequest) => void
  onEdit: (request: TerminationRequest) => void
  activeRole: TerminationRole
  onAction: (request: TerminationRequest, action: TerminationAction) => void
}

export function TerminationTable({ requests, filteredCount, clearFilters, onView, onEdit, activeRole, onAction }: TerminationTableProps) {
  if (filteredCount === 0) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
            <SearchX className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No termination requests found</h3>
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium cursor-pointer"
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
        <table className="w-full min-w-[1150px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Employee</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Department</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Termination Type</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Timeline</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Settlement</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center">{request.avatar}</div>
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
                <td className="px-6 py-4 text-sm text-slate-700">{request.terminationType}</td>
                <td className="px-6 py-4 text-sm text-slate-700">
                  <p className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /> {request.initiatedDate}</p>
                  <p className="text-xs text-slate-500 mt-1">Effective: {request.effectiveDate}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${request.finalSettlementStatus === "processed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                    {request.finalSettlementStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${TERMINATION_STATUS_BADGE[request.status]}`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button onClick={() => onView(request)} className="p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"><Eye className="w-4 h-4" /></button>
                    <button onClick={() => onEdit(request)} className="p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"><Pencil className="w-4 h-4" /></button>
                    {getAllowedTerminationActions(request.status, activeRole).map((action) => (
                      <button
                        key={`${request.id}-${action}`}
                        onClick={() => onAction(request, action)}
                        className="px-2 py-1 text-[11px] font-semibold rounded border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      >
                        {action}
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
