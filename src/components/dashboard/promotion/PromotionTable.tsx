import { Eye, SearchX, TrendingUp } from "lucide-react"
import {
  getAllowedPromotionActions,
  PROMOTION_STATUS_BADGE,
  PROMOTION_STATUS_LABELS,
} from "@/constants/promotion"
import { PromotionAction, PromotionRequest, PromotionRole } from "@/types/promotion.types"

interface PromotionTableProps {
  requests: PromotionRequest[]
  filteredCount: number
  clearFilters: () => void
  onView: (request: PromotionRequest) => void
  activeRole: PromotionRole
  onAction: (request: PromotionRequest, action: PromotionAction) => void
}

export function PromotionTable({ requests, filteredCount, clearFilters, onView, activeRole, onAction }: PromotionTableProps) {
  if (filteredCount === 0) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
            <SearchX className="w-8 h-8 text-slate-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No promotion requests found</h3>
            <p className="text-slate-500 text-sm max-w-md">
              Try adjusting your filters to view promotion submissions.
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
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Current → Proposed</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Salary Revision</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Timeline</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Approvals</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {requests.map((request) => {
              const salaryDiff = request.salaryRevision.newSalary - request.salaryRevision.oldSalary
              const salaryPercent = Math.round((salaryDiff / request.salaryRevision.oldSalary) * 100)

              return (
                <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center">
                        {request.employee.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{request.employee.name}</p>
                        <p className="text-xs text-slate-500">{request.employee.id} • {request.id}</p>
                        <p className="text-xs text-slate-500">{request.employee.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    <p>{request.currentRole.designation}</p>
                    <p className="text-xs text-indigo-600 font-medium">→ {request.proposedPromotion.designation}</p>
                    <p className="text-xs text-slate-500 mt-0.5 capitalize">{request.proposedPromotion.promotionType} promotion</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    <p>₹{request.salaryRevision.oldSalary.toLocaleString()} → ₹{request.salaryRevision.newSalary.toLocaleString()}</p>
                    <p className="text-xs text-green-600 font-medium">+{salaryPercent}%</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    <div className="inline-flex items-center gap-1.5 text-slate-700">
                      <TrendingUp className="w-4 h-4 text-indigo-500" />
                      {request.performanceSummary.rating.toFixed(1)} / 5
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    <p>{request.timeline.promotionStartDate}</p>
                    <p className="text-xs text-slate-500">Probation: {request.timeline.probationMonths} months</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <span className={`inline-flex px-2 py-0.5 text-[11px] font-semibold rounded border w-fit ${request.approvalWorkflow.manager.status === "approved" ? "text-green-700 bg-green-50 border-green-200" : request.approvalWorkflow.manager.status === "rejected" ? "text-red-700 bg-red-50 border-red-200" : "text-slate-700 bg-slate-50 border-slate-200"}`}>
                        Manager: {request.approvalWorkflow.manager.status.replace("_", " ")}
                      </span>
                      <span className={`inline-flex px-2 py-0.5 text-[11px] font-semibold rounded border w-fit ${request.approvalWorkflow.hr.status === "approved" ? "text-green-700 bg-green-50 border-green-200" : request.approvalWorkflow.hr.status === "rejected" ? "text-red-700 bg-red-50 border-red-200" : "text-slate-700 bg-slate-50 border-slate-200"}`}>
                        HR: {request.approvalWorkflow.hr.status.replace("_", " ")}
                      </span>
                      {request.requiresHigherAuthority && (
                        <span className={`inline-flex px-2 py-0.5 text-[11px] font-semibold rounded border w-fit ${request.approvalWorkflow.higherAuthority.status === "approved" ? "text-green-700 bg-green-50 border-green-200" : request.approvalWorkflow.higherAuthority.status === "rejected" ? "text-red-700 bg-red-50 border-red-200" : "text-slate-700 bg-slate-50 border-slate-200"}`}>
                          Exec: {request.approvalWorkflow.higherAuthority.status.replace("_", " ")}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${PROMOTION_STATUS_BADGE[request.status]}`}>
                      {PROMOTION_STATUS_LABELS[request.status]}
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
                      {getAllowedPromotionActions(request, activeRole).map((action) => (
                        <button
                          key={`${request.id}-${action}`}
                          onClick={() => onAction(request, action)}
                          className={`px-2 py-1 text-[11px] font-semibold rounded border transition-colors ${
                            action === "submit"
                              ? "text-indigo-700 bg-indigo-50 border-indigo-200 hover:bg-indigo-100"
                              :
                            action === "approve"
                              ? "text-green-700 bg-green-50 border-green-200 hover:bg-green-100"
                              : action === "reject"
                                ? "text-red-700 bg-red-50 border-red-200 hover:bg-red-100"
                                : "text-slate-700 bg-slate-50 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {action === "submit" ? "Submit" : action.charAt(0).toUpperCase() + action.slice(1)}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
