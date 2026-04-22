"use client"

import { Eye, Edit, Trash2, SearchX } from "lucide-react"
import { PayrollEmployee } from "@/types/payroll.types"

interface PayrollTableProps {
  paginatedEmployees: PayrollEmployee[]
  filteredCount: number
  formatCurrency: (amount: number) => string
  formatDate: (dateString: string | null) => string
  onView: (employee: PayrollEmployee) => void
  onEdit: (employee: PayrollEmployee) => void
  onDelete: (employee: PayrollEmployee) => void
  clearFilters: () => void
}

export function PayrollTable({
  paginatedEmployees, filteredCount, formatCurrency, formatDate,
  onView, onEdit, onDelete, clearFilters,
}: PayrollTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {["Employee ID", "Name", "Designation", "Email", "Joining Date", "Salary", "Status", "Actions"].map((h) => (
                <th key={h} className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {paginatedEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{employee.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{employee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{employee.designation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{employee.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{formatDate(employee.joiningDate)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">{formatCurrency(employee.salary)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    employee.status === "paid" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                  }`}>
                    {employee.status === "paid" ? "Paid" : "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onView(employee)} className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors" title="View Salary Slip">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => onEdit(employee)} className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors" title="Edit Employee">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(employee)} className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors" title="Delete Employee">
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
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No employees found</h3>
              <p className="text-slate-500 text-sm max-w-md">
                Try adjusting your search filters or check spelling to find employees you&apos;re looking for.
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
