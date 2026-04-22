import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Eye, Edit, Trash2, Calendar } from "lucide-react"
import { SalesOrder } from "@/types/sales.types"
import { TABLE_HEADERS } from "@/constants/sales"

interface SalesOrdersTableProps {
  paginatedData: SalesOrder[]
  entriesPerPage: number
  setEntriesPerPage: React.Dispatch<React.SetStateAction<number>>
  formatCurrency: (amount: number) => string
  getStatusColor: (status: string) => string
  getPaymentStatusColor: (status: string) => string
  onView: (order: SalesOrder) => void
  onEdit: (order: SalesOrder) => void
  onDelete: (order: SalesOrder) => void
}

export default function SalesOrdersTable({
  paginatedData,
  entriesPerPage,
  setEntriesPerPage,
  formatCurrency,
  getStatusColor,
  getPaymentStatusColor,
  onView,
  onEdit,
  onDelete,
}: SalesOrdersTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-lg font-semibold">Sales Orders</CardTitle>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700">Show</label>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="h-8 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 appearance-none"
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
              {paginatedData.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <span className="text-sm font-mono text-slate-900">
                      {order.orderNumber}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-slate-900">{order.customer}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-700">{order.date}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-sm font-medium text-slate-900">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-sm text-slate-900">{order.items}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-slate-700">{order.salesRep}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => onView(order)}
                        className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEdit(order)}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Order"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(order)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Order"
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
