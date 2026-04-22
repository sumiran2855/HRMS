"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Package, Calendar, Eye, Edit, Trash2 } from "lucide-react"
import { ProductionOrder } from "@/types/manufacturing.types"

interface ProductionOrdersTableProps {
  paginatedData: ProductionOrder[]
  entriesPerPage: number
  setEntriesPerPage: React.Dispatch<React.SetStateAction<number>>
  getStatusColor: (status: string) => string
  getPriorityColor: (priority: string) => string
  onView: (order: ProductionOrder) => void
  onEdit: (order: ProductionOrder) => void
  onDelete: (order: ProductionOrder) => void
}

export default function ProductionOrdersTable({
  paginatedData, entriesPerPage, setEntriesPerPage,
  getStatusColor, getPriorityColor,
  onView, onEdit, onDelete,
}: ProductionOrdersTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-lg font-semibold">Production Orders</CardTitle>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700">Show</label>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="h-8 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 shadow-sm outline-none hover:border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20 appearance-none"
            >
              {[5, 10, 25, 50].map((n) => <option key={n} value={n}>{n}</option>)}
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
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Order #</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Product</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Batch</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-slate-700">Quantity</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Start Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">End Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Line</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Priority</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Status</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((order) => (
                <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <span className="text-sm font-mono text-slate-900">{order.orderNumber}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-900">{order.product}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-slate-900">{order.batchNumber}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-sm font-medium text-slate-900">{order.quantity}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-700">{order.startDate}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-700">{order.endDate}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-slate-900">{order.productionLine}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.replace("-", " ")}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => onView(order)} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => onEdit(order)} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit Order">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(order)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete Order">
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
