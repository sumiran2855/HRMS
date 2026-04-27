"use client"

import { X } from "lucide-react"
import { TERMINATION_STATUS_BADGE } from "@/constants/termination"
import { TerminationRequest } from "@/types/termination.types"

interface ViewTerminationModalProps {
  isOpen: boolean
  onClose: () => void
  request: TerminationRequest | null
}

export function ViewTerminationModal({ isOpen, onClose, request }: ViewTerminationModalProps) {
  if (!isOpen || !request) return null

  const card = "rounded-xl border border-slate-200 bg-slate-50 p-4"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={(e) => e.currentTarget === e.target && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-200 shadow-xl">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white text-sm font-semibold flex items-center justify-center">{request.avatar}</div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{request.employeeName}</h3>
              <p className="text-xs text-slate-500">{request.employeeId} • {request.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50"><X className="w-4 h-4" /></button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${TERMINATION_STATUS_BADGE[request.status]}`}>{request.status}</span>
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full border border-slate-200 bg-slate-100 text-slate-700">{request.terminationType}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={card}><p className="text-xs uppercase text-slate-500">Department</p><p className="text-sm text-slate-800 mt-1">{request.department}</p></div>
            <div className={card}><p className="text-xs uppercase text-slate-500">Designation</p><p className="text-sm text-slate-800 mt-1">{request.designation}</p></div>
            <div className={card}><p className="text-xs uppercase text-slate-500">Manager</p><p className="text-sm text-slate-800 mt-1">{request.managerName}</p></div>
            <div className={card}><p className="text-xs uppercase text-slate-500">Settlement</p><p className="text-sm text-slate-800 mt-1">{request.finalSettlementStatus}</p></div>
            <div className={card}><p className="text-xs uppercase text-slate-500">Initiated Date</p><p className="text-sm text-slate-800 mt-1">{request.initiatedDate}</p></div>
            <div className={card}><p className="text-xs uppercase text-slate-500">Effective Date</p><p className="text-sm text-slate-800 mt-1">{request.effectiveDate}</p></div>
          </div>

          <div className={card}>
            <p className="text-xs uppercase text-slate-500">Reason</p>
            <p className="text-sm text-slate-800 mt-1">{request.reason}</p>
          </div>

          <div className={card}>
            <p className="text-xs uppercase text-slate-500">History</p>
            {request.history.length === 0 ? (
              <p className="text-sm text-slate-500 mt-1">No updates yet.</p>
            ) : (
              <div className="space-y-2 mt-2">
                {request.history.map((entry) => (
                  <div key={entry.id} className="rounded-lg border border-slate-200 bg-white p-3">
                    <p className="text-xs text-slate-500">{entry.date} • {entry.actorName}</p>
                    <p className="text-sm text-slate-800 capitalize mt-1">{entry.action}</p>
                    {entry.remark && <p className="text-sm text-slate-700 mt-1">{entry.remark}</p>}
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
