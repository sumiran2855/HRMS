import { Eye, Edit, Trash2, MapPin, Mail, Phone, Users } from "lucide-react"
import { STATUS_CONFIG, TABLE_HEADERS } from "@/constants/leads"
import type { Lead } from "@/types/leads.types"

interface LeadsTableProps {
  paginatedData: Lead[]
  handleAction: (action: string, leadId: number) => void
}

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("")
}

export function LeadsTable({ paginatedData, handleAction }: LeadsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            {TABLE_HEADERS.map(({ label, align, width, hidden }) => (
              <th
                key={label}
                className={`${align} ${width} ${hidden} py-2.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400`}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {paginatedData.map(lead => {
            const cfg = STATUS_CONFIG[lead.status]
            return (
              <tr key={lead.id} className="group hover:bg-slate-50/80 transition-colors duration-100">
                {/* Lead */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-blue-50 flex items-center justify-center">
                      <span className="text-[10px] font-semibold text-blue-600">
                        {getInitials(lead.name)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-800 truncate">{lead.name}</p>
                      <p className="text-xs text-slate-400 truncate">{lead.position}</p>
                    </div>
                  </div>
                </td>

                {/* Company */}
                <td className="py-3 px-4 hidden sm:table-cell">
                  <p className="font-medium text-slate-800 truncate">{lead.company}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{lead.location}</span>
                  </div>
                </td>

                {/* Contact */}
                <td className="py-3 px-4 hidden md:table-cell">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                    <Mail className="w-3 h-3 shrink-0 text-slate-400" />
                    <span className="truncate">{lead.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Phone className="w-3 h-3 shrink-0 text-slate-400" />
                    <span>{lead.phone}</span>
                  </div>
                </td>

                {/* Source */}
                <td className="py-3 px-4 hidden lg:table-cell">
                  <span className="text-xs text-slate-500">{lead.source}</span>
                </td>

                {/* Status */}
                <td className="py-3 px-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${cfg.pill}`}>
                    {cfg.label}
                  </span>
                </td>

                {/* Value */}
                <td className="py-3 px-4 text-right">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                    ${lead.value.toLocaleString()}
                  </span>
                </td>

                {/* Assigned To */}
                <td className="py-3 px-4 hidden xl:table-cell">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 shrink-0 rounded-full bg-emerald-50 flex items-center justify-center">
                      <span className="text-[9px] font-semibold text-emerald-600">
                        {getInitials(lead.assignedTo)}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 truncate">{lead.assignedTo}</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-0.5">
                    <button
                      onClick={() => handleAction("view", lead.id)}
                      title="View"
                      className="p-1.5 rounded-md text-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleAction("edit", lead.id)}
                      title="Edit"
                      className="p-1.5 rounded-md text-emerald-500 hover:bg-emerald-50 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleAction("delete", lead.id)}
                      title="Delete"
                      className="p-1.5 rounded-md text-red-400 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Empty state */}
      {paginatedData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-14 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
            <Users className="w-6 h-6 text-slate-300" />
          </div>
          <p className="text-sm font-medium text-slate-600">No leads found</p>
          <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  )
}
