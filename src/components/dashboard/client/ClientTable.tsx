import { Eye, Edit, Trash2, SearchX } from "lucide-react"
import { Client } from "@/types/client.types"
import { CLIENT_STATUS_LABELS, CLIENT_STATUS_COLORS } from "@/constants/client"

interface ClientTableProps {
  paginatedClients: Client[]
  filteredCount: number
  formatCurrency: (amount: number) => string
  formatDate: (dateString: string) => string
  onView: (client: Client) => void
  onEdit: (client: Client) => void
  onDelete: (client: Client) => void
  clearFilters: () => void
}

const TABLE_HEADERS = ["Company", "Contact", "Industry", "Contract", "Value", "Projects", "Rating", "Status", "Actions"]

export function ClientTable({
  paginatedClients, filteredCount, formatCurrency, formatDate,
  onView, onEdit, onDelete, clearFilters,
}: ClientTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {TABLE_HEADERS.map((h) => (
                <th key={h} className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {paginatedClients.map((client) => (
              <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-900">{client.companyName}</div>
                  <div className="text-xs text-slate-500">{client.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900">{client.contactPerson}</div>
                  <div className="text-xs text-slate-500">{client.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                    {client.industry}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900">{client.contractType}</div>
                  <div className="text-xs text-slate-500">{formatDate(client.startDate)} – {formatDate(client.endDate)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                  {formatCurrency(client.contractValue)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{client.projects}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-slate-900">{client.rating}</span>
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${CLIENT_STATUS_COLORS[client.status]}`}>
                    {CLIENT_STATUS_LABELS[client.status]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onView(client)} className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors" title="View Client Details">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => onEdit(client)} className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors" title="Edit Client">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(client)} className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors" title="Delete Client">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCount === 0 && (
        <div className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
              <SearchX className="w-8 h-8 text-slate-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No clients found</h3>
              <p className="text-slate-500 text-sm max-w-md">
                Try adjusting your search filters or check the spelling to find the clients you&apos;re looking for.
              </p>
            </div>
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
