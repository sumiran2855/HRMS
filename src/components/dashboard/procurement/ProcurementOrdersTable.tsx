"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Building, Calendar, Eye, Edit, Trash2 } from "lucide-react"
import { PurchaseOrder } from "@/types/procurement.types"

interface ProcurementOrdersTableProps {
  paginatedData: PurchaseOrder[]
  entriesPerPage: number
  setEntriesPerPage: React.Dispatch<React.SetStateAction<number>>
  formatCurrency: (amount: number) => string
  getStatusColor: (status: string) => string
  getPriorityColor: (priority: string) => string
  onView: (order: PurchaseOrder) => void
  onEdit: (order: PurchaseOrder) => void
  onDelete: (order: PurchaseOrder) => void
}

export default function ProcurementOrdersTable({
  paginatedData, entriesPerPage, setEntriesPerPage,
  formatCurrency, getStatusColor, getPriorityColor,
  onView, onEdit, onDelete,
}: ProcurementOrdersTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-lg font-semibold">Purchase Orders</CardTitle>
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
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">PO #</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Vendor</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Date</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-slate-700">Total</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Items</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Requestor</th>
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
                      <Building className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-900">{order.vendor}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-700">{order.date}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-sm font-medium text-slate-900">{formatCurrency(order.totalAmount)}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-sm text-slate-900">{order.items}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-slate-700">{order.requestor}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
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
