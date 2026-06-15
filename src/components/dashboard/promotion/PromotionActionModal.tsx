"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, X } from "lucide-react"
import { PromotionAction, PromotionRequest } from "@/types/promotion.types"

interface PromotionActionModalProps {
  isOpen: boolean
  actionType: PromotionAction | null
  request: PromotionRequest | null
  onClose: () => void
  onConfirm: (remark: string) => void
}

const ACTION_LABELS: Record<PromotionAction, string> = {
  submit: "Submit",
  approve: "Approve",
  reject: "Reject",
}

export function PromotionActionModal({ isOpen, actionType, request, onClose, onConfirm }: PromotionActionModalProps) {
  const [remark, setRemark] = useState("")

  useEffect(() => {
    if (isOpen) setRemark("")
  }, [isOpen])

  if (!isOpen || !actionType || !request) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={(e) => e.currentTarget === e.target && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-lg border border-slate-200 shadow-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-semibold text-slate-900">Confirm {ACTION_LABELS[actionType]}</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-sm text-slate-600 leading-6">
            You are about to <span className="font-semibold text-slate-900">{ACTION_LABELS[actionType].toLowerCase()}</span> promotion request
            <span className="font-semibold text-slate-900"> {request.id}</span> for
            <span className="font-semibold text-slate-900"> {request.employee.name}</span>.
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Remarks (optional)</label>
            <textarea
              rows={4}
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Add optional comments for audit trail..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 text-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50">Cancel</button>
            <button type="button" onClick={() => onConfirm(remark)} className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
              Confirm {ACTION_LABELS[actionType]}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
