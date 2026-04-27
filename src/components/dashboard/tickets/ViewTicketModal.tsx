"use client"

import { CalendarDays, CircleUserRound, Layers, Timer } from "lucide-react"
import { Modal } from "@/components/ui/Modal"
import { TICKET_PRIORITY_BADGE, TICKET_STATUS_BADGE } from "@/constants/ticket"
import { TicketItem } from "@/types/ticket.types"

interface ViewTicketModalProps {
  isOpen: boolean
  onClose: () => void
  ticket: TicketItem | null
}

export function ViewTicketModal({ isOpen, onClose, ticket }: ViewTicketModalProps) {
  if (!isOpen || !ticket) return null

  const infoCard = "rounded-xl border border-slate-200 bg-white p-4"

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={ticket.title}
      description={`Ticket ${ticket.id} details and activity context`}
      size="xl"
    >
      <div className="space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full border ${TICKET_STATUS_BADGE[ticket.status]}`}>
              {ticket.status.replace("_", " ")}
            </span>
            <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full border ${TICKET_PRIORITY_BADGE[ticket.priority]}`}>
              {ticket.priority}
            </span>
            <span className="inline-flex px-2.5 py-1 text-xs font-semibold rounded-full border border-slate-200 bg-slate-100 text-slate-700">
              {ticket.category}
            </span>
          </div>
          <p className="text-sm text-slate-700 mt-3 leading-6">{ticket.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={infoCard}>
            <p className="text-xs uppercase tracking-wide text-slate-500">Requester</p>
            <p className="text-sm font-semibold text-slate-900 mt-1 inline-flex items-center gap-2">
              <CircleUserRound className="w-4 h-4 text-slate-400" />
              {ticket.requesterName}
            </p>
            <p className="text-xs text-slate-500 mt-1">{ticket.requesterId}</p>
          </div>

          <div className={infoCard}>
            <p className="text-xs uppercase tracking-wide text-slate-500">Department</p>
            <p className="text-sm font-semibold text-slate-900 mt-1">{ticket.department}</p>
          </div>

          <div className={infoCard}>
            <p className="text-xs uppercase tracking-wide text-slate-500">Assigned To</p>
            <p className="text-sm font-semibold text-slate-900 mt-1 inline-flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-400" />
              {ticket.assignedTo}
            </p>
          </div>

          <div className={infoCard}>
            <p className="text-xs uppercase tracking-wide text-slate-500">Timeline</p>
            <p className="text-sm text-slate-900 mt-1 inline-flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-slate-400" />
              Created: {ticket.createdAt}
            </p>
            <p className="text-sm text-slate-900 mt-1 inline-flex items-center gap-2">
              <Timer className="w-4 h-4 text-slate-400" />
              Due: {ticket.dueDate}
            </p>
          </div>
        </div>

        <div className={infoCard}>
          <p className="text-xs uppercase tracking-wide text-slate-500">Comments</p>
          {ticket.comments.length === 0 ? (
            <p className="text-sm text-slate-500 mt-2">No comments added yet.</p>
          ) : (
            <div className="space-y-2 mt-3">
              {ticket.comments.map((comment) => (
                <div key={comment.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">{comment.author} ({comment.role}) • {comment.createdAt}</p>
                  <p className="text-sm text-slate-700 mt-1">{comment.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
