import { Eye, Edit, Trash2, MapPin, Mail, Phone, Calendar, Handshake } from "lucide-react"
import { STAGE_CONFIG, TABLE_HEADERS } from "@/constants/deals"
import type { Deal } from "@/types/deals.types"

interface DealsTableProps {
  paginatedData: Deal[]
  handleAction: (action: string, dealId: number) => void
}

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("")
}

export function DealsTable({ paginatedData, handleAction }: DealsTableProps) {
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
          {paginatedData.map(deal => {
            const cfg = STAGE_CONFIG[deal.stage]
            return (
              <tr key={deal.id} className="group hover:bg-slate-50/80 transition-colors duration-100">
                {/* Deal */}
                <td className="py-3 px-4">
                  <div className="min-w-0">
                    <p className="font-medium text-slate-800 truncate">{deal.dealName}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {deal.products.slice(0, 2).map((product, index) => (
                        <span key={index} className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                          {product}
                        </span>
                      ))}
                      {deal.products.length > 2 && (
                        <span className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                          +{deal.products.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Company */}
                <td className="py-3 px-4 hidden sm:table-cell">
                  <p className="font-medium text-slate-800 truncate">{deal.companyName}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{deal.location}</span>
                  </div>
                </td>

                {/* Contact */}
                <td className="py-3 px-4 hidden md:table-cell">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span className="font-medium text-slate-700 truncate">{deal.contactPerson}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Mail className="w-3 h-3 shrink-0 text-slate-400" />
                      <span className="truncate">{deal.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Phone className="w-3 h-3 shrink-0 text-slate-400" />
                      <span>{deal.phone}</span>
                    </div>
                  </div>
                </td>

                {/* Stage */}
                <td className="py-3 px-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${cfg.pill}`}>
                    {cfg.label}
                  </span>
                </td>

                {/* Probability */}
                <td className="py-3 px-4 hidden lg:table-cell">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-full max-w-[50px] bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          deal.probability >= 80 ? "bg-emerald-500" :
                          deal.probability >= 60 ? "bg-amber-500" :
                          deal.probability >= 40 ? "bg-orange-500" : "bg-red-500"
                        }`}
                        style={{ width: `${deal.probability}%` }}
                      />
                    </div>
                    <span className={`text-xs font-medium ${
                      deal.probability >= 80 ? "text-emerald-600" :
                      deal.probability >= 60 ? "text-amber-600" :
                      deal.probability >= 40 ? "text-orange-600" : "text-red-600"
                    }`}>
                      {deal.probability}%
                    </span>
                  </div>
                </td>

                {/* Value */}
                <td className="py-3 px-4 text-right">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                    ${(deal.value / 1000).toFixed(0)}K
                  </span>
                </td>

                {/* Close Date */}
                <td className="py-3 px-4 hidden xl:table-cell">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Calendar className="w-3 h-3 shrink-0 text-slate-400" />
                    <span>{deal.expectedCloseDate}</span>
                  </div>
                </td>

                {/* Assigned To */}
                <td className="py-3 px-4 hidden 2xl:table-cell">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 shrink-0 rounded-full bg-emerald-50 flex items-center justify-center">
                      <span className="text-[9px] font-semibold text-emerald-600">
                        {getInitials(deal.assignedTo)}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 truncate">{deal.assignedTo}</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-0.5">
                    <button
                      onClick={() => handleAction("view", deal.id)}
                      title="View"
                      className="p-1.5 rounded-md text-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleAction("edit", deal.id)}
                      title="Edit"
                      className="p-1.5 rounded-md text-emerald-500 hover:bg-emerald-50 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleAction("delete", deal.id)}
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
            <Handshake className="w-6 h-6 text-slate-300" />
          </div>
          <p className="text-sm font-medium text-slate-600">No deals found</p>
          <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  )
}
