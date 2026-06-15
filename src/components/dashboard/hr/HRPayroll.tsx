"use client"

import { useState } from "react"
import { DollarSign, Search, X, TrendingUp, Users, Banknote, CreditCard } from "lucide-react"
import { Employee } from "@/types/employee.types"

interface HRPayrollProps {
  employees: Employee[]
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase()
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(amount)
}

function getSalary(employee: Employee): number {
  return employee.bankDetails?.salary ?? employee.salary ?? 0
}

export default function HRPayroll({ employees }: HRPayrollProps) {
  const [search, setSearch] = useState("")

  const filtered = employees.filter((e) => {
    const name = `${e.firstName} ${e.lastName}`.toLowerCase()
    const id = (e.employeeId ?? "").toLowerCase()
    const term = search.toLowerCase()
    return name.includes(term) || id.includes(term)
  })

  const totalPayroll = employees.reduce((sum, e) => sum + getSalary(e), 0)
  const avgSalary = employees.length > 0 ? Math.round(totalPayroll / employees.length) : 0
  const highestSalary = employees.length > 0 ? Math.max(...employees.map(getSalary)) : 0

  const statCards = [
    {
      label: "Total Payroll",
      value: formatCurrency(totalPayroll),
      sub: `${employees.length} employees`,
      icon: Banknote,
      gradient: "from-purple-50 to-purple-100",
      border: "border-purple-200",
      text: "text-purple-700",
      iconBg: "bg-purple-100",
    },
    {
      label: "Average Salary",
      value: formatCurrency(avgSalary),
      sub: "Per employee",
      icon: TrendingUp,
      gradient: "from-blue-50 to-blue-100",
      border: "border-blue-200",
      text: "text-blue-700",
      iconBg: "bg-blue-100",
    },
    {
      label: "Highest Salary",
      value: formatCurrency(highestSalary),
      sub: "Top earner",
      icon: DollarSign,
      gradient: "from-emerald-50 to-emerald-100",
      border: "border-emerald-200",
      text: "text-emerald-700",
      iconBg: "bg-emerald-100",
    },
    {
      label: "Total Employees",
      value: employees.length,
      sub: "On payroll",
      icon: Users,
      gradient: "from-amber-50 to-amber-100",
      border: "border-amber-200",
      text: "text-amber-700",
      iconBg: "bg-amber-100",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, sub, icon: Icon, gradient, border, text, iconBg }) => (
          <div key={label} className={`bg-gradient-to-br ${gradient} border ${border} rounded-2xl p-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wide ${text}`}>{label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
                <p className={`text-xs mt-1 ${text}`}>{sub}</p>
              </div>
              <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${text}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Employee Payroll</h3>
            <p className="text-xs text-slate-500 mt-0.5">{filtered.length} of {employees.length} employees</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-slate-50"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 hover:bg-slate-200 rounded">
                <X className="w-3.5 h-3.5 text-slate-400" />
              </button>
            )}
          </div>
        </div>

        {employees.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <CreditCard className="w-7 h-7 text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-600">No payroll data available</p>
            <p className="text-xs text-slate-400 mt-1">Employee salary data will appear here</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-slate-500">No employees match your search</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Employee</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">ID</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Designation</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Bank</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Account</th>
                  <th className="text-right py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Salary</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((employee) => {
                  const salary = getSalary(employee)
                  return (
                    <tr key={employee._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-purple-600">
                              {getInitials(employee.firstName, employee.lastName)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{employee.firstName} {employee.lastName}</p>
                            <p className="text-xs text-slate-400">{employee.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {employee.employeeId || "—"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-600">{employee.employeeDesignation || "—"}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-600">{employee.bankDetails?.bankName || "—"}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-500 font-mono">
                          {employee.bankDetails?.accountNumber
                            ? `****${employee.bankDetails.accountNumber.slice(-4)}`
                            : "—"}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-right">
                        {salary > 0 ? (
                          <span className="text-sm font-semibold text-emerald-600">{formatCurrency(salary)}</span>
                        ) : (
                          <span className="text-sm text-slate-400">Not set</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

