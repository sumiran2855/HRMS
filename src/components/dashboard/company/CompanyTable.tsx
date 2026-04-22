import { Eye, Edit, Trash2, SearchX } from "lucide-react"
import { Company } from "@/types/company.types"

interface CompanyTableProps {
  paginatedCompanies: Company[]
  filteredCount: number
  formatCurrency: (amount: number) => string
  onView: (company: Company) => void
  onEdit: (company: Company) => void
  onDelete: (company: Company) => void
  clearFilters: () => void
}

const TABLE_HEADERS = ["Name", "Industry", "Email", "Contact", "Owner", "Rating", "Employees", "Revenue", "Status", "Actions"]

export function CompanyTable({
  paginatedCompanies, filteredCount, formatCurrency,
  onView, onEdit, onDelete, clearFilters,
}: CompanyTableProps) {
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
            {paginatedCompanies.map((company) => (
              <tr key={company.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{company.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                    {company.industry}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{company.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{company.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{company.ownerName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-slate-900">{company.rating}</span>
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">{company.employees}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">{formatCurrency(company.revenue)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    company.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {company.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onView(company)} className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors" title="View Company Details">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => onEdit(company)} className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors" title="Edit Company">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(company)} className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors" title="Delete Company">
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
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No companies found</h3>
              <p className="text-slate-500 text-sm max-w-md">
                Try adjusting your search filters or check spelling to find companies you&apos;re looking for.
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
