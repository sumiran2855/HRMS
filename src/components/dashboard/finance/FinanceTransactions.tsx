import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import {
  Eye,
  Edit,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
} from "lucide-react"
import { STATUS_COLOR_MAP } from "@/constants/finance"
import type { Transaction } from "@/types/finance.types"

interface FinanceTransactionsProps {
  paginatedData: Transaction[]
  entriesPerPage: number
  setEntriesPerPage: (n: number) => void
  formatCurrency: (amount: number) => string
}

function getStatusIcon(status: string) {
  switch (status) {
    case "paid":
      return <CheckCircle className="w-4 h-4 text-green-600" />
    case "pending":
      return <Clock className="w-4 h-4 text-yellow-600" />
    case "overdue":
      return <AlertTriangle className="w-4 h-4 text-red-600" />
    default:
      return <FileText className="w-4 h-4 text-gray-600" />
  }
}

export function FinanceTransactions({
  paginatedData,
  entriesPerPage,
  setEntriesPerPage,
  formatCurrency,
}: FinanceTransactionsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-lg font-semibold">Transactions</CardTitle>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700">Show</label>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="h-8 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 appearance-none"
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
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Number</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Client/Vendor</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Description</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-slate-700">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Due Date</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Status</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((transaction) => {
                const statusColor =
                  STATUS_COLOR_MAP[transaction.status] || "bg-gray-100 text-gray-700"
                return (
                  <tr
                    key={transaction.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <span className="text-sm font-mono text-slate-900">{transaction.number}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {transaction.type === "invoice" ? (
                          <ArrowUpRight className="w-4 h-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-600" />
                        )}
                        <span
                          className={`text-sm font-medium capitalize ${
                            transaction.type === "invoice" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-slate-900">
                        {transaction.client || transaction.vendor}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-slate-700">{transaction.description}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`text-sm font-medium ${
                          transaction.type === "invoice" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.type === "invoice" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-slate-700">{transaction.date}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-slate-700">{transaction.dueDate}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {getStatusIcon(transaction.status)}
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
                        >
                          {transaction.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit Transaction"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
