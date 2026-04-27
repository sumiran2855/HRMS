"use client"

import { X, Calendar, UserCheck, BriefcaseBusiness, FileText, Clock3 } from "lucide-react"
import { RESIGNATION_STATUS_BADGE } from "@/constants/resignation"
import { ResignationRequest } from "@/types/resignation.types"

interface ViewResignationModalProps {
  isOpen: boolean
  onClose: () => void
  request: ResignationRequest | null
}

export function ViewResignationModal({ isOpen, onClose, request }: ViewResignationModalProps) {
  if (!isOpen || !request) return null

  const infoCard = "rounded-xl border border-slate-200 bg-slate-50 p-4"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={(e) => e.currentTarget === e.target && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-200 shadow-xl">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white text-sm font-semibold flex items-center justify-center">
              {request.avatar}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{request.employeeName}</h3>
              <p className="text-xs text-slate-500">{request.employeeId} • {request.id}</p>
            </div>
          </div>

          <button onClick={onClose} className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${RESIGNATION_STATUS_BADGE[request.status]}`}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full border border-slate-200 bg-slate-100 text-slate-700">
              {request.department}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={infoCard}>
              <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Employee Details</div>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex items-center gap-2"><BriefcaseBusiness className="w-4 h-4 text-slate-400" /> {request.designation}</div>
                <div className="flex items-center gap-2"><UserCheck className="w-4 h-4 text-slate-400" /> {request.reportingManager}</div>
              </div>
            </div>

            <div className={infoCard}>
              <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Timeline</div>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /> Applied: {request.appliedDate}</div>
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /> Last working day: {request.lastWorkingDate}</div>
                <div className="flex items-center gap-2"><Clock3 className="w-4 h-4 text-slate-400" /> Notice period: {request.noticePeriodDays} days</div>
              </div>
            </div>
          </div>

          <div className={infoCard}>
            <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Handover Progress</div>
            <div className="h-2.5 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${request.handoverProgress}%` }} />
            </div>
            <p className="mt-1.5 text-xs text-slate-600">{request.handoverProgress}% completed</p>
          </div>

          <div className={infoCard}>
            <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Reason</div>
            <p className="text-sm text-slate-700 leading-6 flex items-start gap-2">
              <FileText className="w-4 h-4 text-slate-400 mt-1" />
              <span>{request.reason}</span>
            </p>
          </div>

          <div className={infoCard}>
            <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Exit Interview</div>
            <p className="text-sm font-medium text-slate-700">
              {request.exitInterviewScheduled ? "Scheduled" : "Not yet scheduled"}
            </p>
          </div>

          <div className={infoCard}>
            <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Workflow History</div>
            {request.workflowHistory.length === 0 ? (
              <p className="text-sm text-slate-500">No workflow updates yet.</p>
            ) : (
              <div className="space-y-2.5">
                {request.workflowHistory.map((entry) => (
                  <div key={entry.id} className="rounded-lg border border-slate-200 bg-white p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-800 capitalize">{entry.action}</p>
                      <span className="text-xs text-slate-500">{entry.date}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">By {entry.actorName} ({entry.actorRole.toUpperCase()})</p>
                    {entry.remark && <p className="text-sm text-slate-700 mt-1.5">{entry.remark}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
