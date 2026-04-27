import { Crown, Eye, SearchX, Sparkles, Wallet } from "lucide-react"
import { AWARD_STATUS_BADGE, AWARD_STATUS_LABELS, getAllowedAwardActions } from "@/constants/award"
import { AwardAction, AwardRequest, AwardRole } from "@/types/award.types"

interface AwardTableProps {
  requests: AwardRequest[]
  filteredCount: number
  clearFilters: () => void
  onView: (request: AwardRequest) => void
  activeRole: AwardRole
  onAction: (request: AwardRequest, action: AwardAction) => void
}

const actionClasses: Record<AwardAction, string> = {
  submit: "text-indigo-700 bg-indigo-50 border-indigo-200 hover:bg-indigo-100",
  approve: "text-green-700 bg-green-50 border-green-200 hover:bg-green-100",
  reject: "text-red-700 bg-red-50 border-red-200 hover:bg-red-100",
  return: "text-orange-700 bg-orange-50 border-orange-200 hover:bg-orange-100",
  publish: "text-fuchsia-700 bg-fuchsia-50 border-fuchsia-200 hover:bg-fuchsia-100",
  fulfill: "text-cyan-700 bg-cyan-50 border-cyan-200 hover:bg-cyan-100",
  cancel: "text-slate-700 bg-slate-50 border-slate-200 hover:bg-slate-100",
}

export function AwardTable({ requests, filteredCount, clearFilters, onView, activeRole, onAction }: AwardTableProps) {
  if (filteredCount === 0) {
    return (
      <div className="rounded-[28px] border border-fuchsia-100 bg-gradient-to-br from-white via-rose-50 to-violet-50 p-12 text-center shadow-[0_22px_60px_-45px_rgba(217,70,239,0.45)]">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
            <SearchX className="w-8 h-8 text-fuchsia-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No award requests found</h3>
            <p className="text-slate-500 text-sm max-w-md">
              Try updating the filters to review nominations, approvals, and publication records.
            </p>
          </div>
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-fuchsia-200/30 transition-colors hover:bg-slate-900 cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {requests.map((request) => (
        <article
          key={request.id}
          className="overflow-hidden rounded-[28px] border border-fuchsia-100 bg-gradient-to-br from-white via-[#fff8fb] to-[#faf5ff] shadow-[0_24px_70px_-45px_rgba(217,70,239,0.45)] transition-transform hover:-translate-y-1"
        >
          <div className="border-b border-fuchsia-100/80 bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-400 p-[1px]">
            <div className="flex flex-col gap-4 rounded-t-[27px] bg-white/95 px-5 py-4 backdrop-blur sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-fuchsia-300/40">
                  {request.employee.avatar}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-slate-900">{request.summary.awardTitle}</h3>
                    <span className={`inline-flex px-2.5 py-1 text-[11px] font-semibold rounded-full border ${AWARD_STATUS_BADGE[request.status]}`}>
                      {AWARD_STATUS_LABELS[request.status]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-slate-700">{request.employee.employeeName}</p>
                  <p className="text-xs text-slate-500">{request.employee.employeeCode} • {request.employee.department} • {request.id}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-50 px-3 py-1 text-[11px] font-semibold text-fuchsia-700 border border-fuchsia-100">
                  <Crown className="h-3.5 w-3.5" />
                  {request.summary.awardType}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700 border border-amber-100 capitalize">
                  <Sparkles className="h-3.5 w-3.5" />
                  {request.summary.visibility.replace("_", " ")}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-5">
            <p className="text-sm leading-6 text-slate-600 line-clamp-2">{request.summary.citation}</p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-fuchsia-100 bg-white/90 p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-fuchsia-700">
                  <Wallet className="h-4 w-4" />
                  Reward snapshot
                </div>
                <p className="text-base font-semibold text-slate-900">{request.reward.currency} {request.reward.rewardValue.toLocaleString()}</p>
                <p className="mt-1 text-sm text-slate-600 capitalize">{request.reward.rewardKind} • {request.reward.fulfillmentStatus.replace("_", " ")}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {request.reward.financeSettlementRequired ? "Finance settlement required" : "No finance settlement required"}
                </p>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-white/90 p-4 shadow-sm">
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Nomination source</div>
                <p className="text-base font-semibold text-slate-900">{request.nomination.nominatorName}</p>
                <p className="mt-1 text-sm capitalize text-slate-600">{request.nomination.nominationSource.replace("_", " ")} nomination</p>
                <p className="mt-1 text-xs text-slate-500">Values: {request.nomination.linkedValues.join(", ") || "—"}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white/85 p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Workflow progress</p>
                <span className="text-xs text-slate-500">Achievement: {request.summary.awardPeriod}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex px-2.5 py-1 text-[11px] font-semibold rounded-full border ${request.workflow.manager.status === "approved" ? "text-green-700 bg-green-50 border-green-200" : request.workflow.manager.status === "rejected" ? "text-red-700 bg-red-50 border-red-200" : "text-slate-700 bg-slate-50 border-slate-200"}`}>
                  Manager: {request.workflow.manager.status.replace("_", " ")}
                </span>
                <span className={`inline-flex px-2.5 py-1 text-[11px] font-semibold rounded-full border ${request.workflow.hr.status === "approved" ? "text-green-700 bg-green-50 border-green-200" : request.workflow.hr.status === "rejected" ? "text-red-700 bg-red-50 border-red-200" : request.workflow.hr.status === "not_required" ? "text-slate-500 bg-slate-50 border-slate-200" : "text-slate-700 bg-slate-50 border-slate-200"}`}>
                  HR: {request.workflow.hr.status.replace("_", " ")}
                </span>
                <span className={`inline-flex px-2.5 py-1 text-[11px] font-semibold rounded-full border ${request.workflow.finance.status === "approved" ? "text-green-700 bg-green-50 border-green-200" : request.workflow.finance.status === "rejected" ? "text-red-700 bg-red-50 border-red-200" : request.workflow.finance.status === "not_required" ? "text-slate-500 bg-slate-50 border-slate-200" : "text-slate-700 bg-slate-50 border-slate-200"}`}>
                  Finance: {request.workflow.finance.status.replace("_", " ")}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-fuchsia-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-slate-500">
                <span className="font-medium text-slate-700">Category:</span> {request.summary.category}
                <span className="mx-2 text-slate-300">•</span>
                <span className="font-medium text-slate-700">Rating:</span> {request.performance.rating.toFixed(1)} / 5
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onView(request)}
                  className="inline-flex items-center gap-2 rounded-xl border border-fuchsia-100 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-fuchsia-200 hover:text-fuchsia-700"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </button>
                {getAllowedAwardActions(request, activeRole).map((action) => (
                  <button
                    key={`${request.id}-${action}`}
                    onClick={() => onAction(request, action)}
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${actionClasses[action]}`}
                  >
                    {action.charAt(0).toUpperCase() + action.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
