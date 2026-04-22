import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Eye, Edit, Trash2, MapPin, Calendar } from "lucide-react"
import { Employee } from "@/types/hr.types"
import { TABLE_HEADERS } from "@/constants/hr"

interface HREmployeesTableProps {
  paginatedData: Employee[]
  entriesPerPage: number
  setEntriesPerPage: React.Dispatch<React.SetStateAction<number>>
  formatCurrency: (amount: number) => string
  getStatusColor: (status: string) => string
  getPerformanceColor: (rating: number) => string
  onView: (employee: Employee) => void
  onEdit: (employee: Employee) => void
  onDelete: (employee: Employee) => void
}

export default function HREmployeesTable({
  paginatedData,
  entriesPerPage,
  setEntriesPerPage,
  formatCurrency,
  getStatusColor,
  getPerformanceColor,
  onView,
  onEdit,
  onDelete,
}: HREmployeesTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-lg font-semibold">Employees</CardTitle>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700">Show</label>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="h-8 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-purple-500 focus-visible:ring-2 focus-visible:ring-purple-500/20 appearance-none"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span className="text-sm text-slate-600">entries</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                {TABLE_HEADERS.map((header) => (
                  <th
                    key={header.label}
                    className={`${header.align} py-3 px-4 text-sm font-medium text-slate-700`}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        <span className="text-xs font-semibold text-purple-600">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{employee.name}</p>
                        <p className="text-xs text-slate-500">{employee.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-slate-700">{employee.department}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-slate-700">{employee.position}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-700">{employee.location}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-700">{employee.joinDate}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-sm font-medium text-slate-900">
                      {formatCurrency(employee.salary)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className={`text-sm font-bold ${getPerformanceColor(employee.performance)}`}
                      >
                        {employee.performance}
                      </span>
                      <span className="text-xs text-slate-500">/5.0</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => onView(employee)}
                        className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEdit(employee)}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Employee"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(employee)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Employee"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
