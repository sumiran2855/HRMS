"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/Modal"
import { Button } from "@/components/ui/Button"
import { TicketAction, TicketItem } from "@/types/ticket.types"

interface TicketActionModalProps {
  isOpen: boolean
  actionType: TicketAction | null
  ticket: TicketItem | null
  onClose: () => void
  onConfirm: (remark: string) => void
}

export function TicketActionModal({ isOpen, actionType, ticket, onClose, onConfirm }: TicketActionModalProps) {
  const [remark, setRemark] = useState("")

  if (!isOpen || !actionType || !ticket) return null

  const handleConfirm = () => {
    onConfirm(remark)
    setRemark("")
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ticket Action"
      description={`Apply action "${actionType}" on ${ticket.id}`}
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
