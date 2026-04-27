import { Calendar, Eye, Pencil, SearchX } from "lucide-react"
import {
  getAllowedTicketActions,
  TICKET_PRIORITY_BADGE,
  TICKET_STATUS_BADGE,
} from "@/constants/ticket"
import { TicketAction, TicketItem, TicketRole } from "@/types/ticket.types"

interface TicketTableProps {
  tickets: TicketItem[]
  filteredCount: number
  clearFilters: () => void
  onView: (ticket: TicketItem) => void
  onEdit: (ticket: TicketItem) => void
  activeRole: TicketRole
  onAction: (ticket: TicketItem, action: TicketAction) => void
}

export function TicketTable({ tickets, filteredCount, clearFilters, onView, onEdit, activeRole, onAction }: TicketTableProps) {
  if (filteredCount === 0) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
            <SearchX className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No tickets found</h3>
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
        <table className="w-full min-w-[1100px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Ticket</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Requester</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Category</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Dates</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Priority</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900">{ticket.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{ticket.id} • {ticket.assignedTo}</p>
                </td>
                <td className="px-6 py-4 text-sm text-slate-700">
                  <p>{ticket.requesterName}</p>
                  <p className="text-xs text-slate-500">{ticket.requesterId} • {ticket.department}</p>
                </td>
                <td className="px-6 py-4 text-sm text-slate-700">{ticket.category}</td>
                <td className="px-6 py-4 text-sm text-slate-700">
                  <p className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /> {ticket.createdAt}</p>
                  <p className="text-xs text-slate-500 mt-1">Due: {ticket.dueDate}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${TICKET_PRIORITY_BADGE[ticket.priority]}`}>
                    {ticket.priority.replace("_", " ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${TICKET_STATUS_BADGE[ticket.status]}`}>
                    {ticket.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button onClick={() => onView(ticket)} className="p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => onEdit(ticket)} className="p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">
                      <Pencil className="w-4 h-4" />
                    </button>
                    {getAllowedTicketActions(ticket.status, activeRole).map((action) => (
                      <button
                        key={`${ticket.id}-${action}`}
                        onClick={() => onAction(ticket, action)}
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
