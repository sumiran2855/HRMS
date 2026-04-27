"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Modal } from "@/components/ui/Modal"
import { TerminationAction, TerminationRequest } from "@/types/termination.types"

interface TerminationActionModalProps {
  isOpen: boolean
  actionType: TerminationAction | null
  request: TerminationRequest | null
  onClose: () => void
  onConfirm: (remark: string) => void
}

export function TerminationActionModal({ isOpen, actionType, request, onClose, onConfirm }: TerminationActionModalProps) {
  const [remark, setRemark] = useState("")

  if (!isOpen || !actionType || !request) return null

  const handleConfirm = () => {
    onConfirm(remark)
    setRemark("")
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Termination Workflow Action"
      description={`Apply ${actionType} for ${request.employeeName} (${request.id})`}
      size="md"
    >
      <div className="space-y-4">
        <textarea
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          rows={4}
          placeholder="Optional remark"
          className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="cursor-pointer">Cancel</Button>
          <Button onClick={handleConfirm} className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">Confirm</Button>
        </div>
      </div>
    </Modal>
  )
}
