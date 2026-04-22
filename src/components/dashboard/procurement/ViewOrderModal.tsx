"use client"

import { X, Truck, Building, Calendar, DollarSign, Package, User, Tag, FileText, CheckCircle } from "lucide-react"
import { PurchaseOrder } from "@/types/procurement.types"

interface ViewOrderModalProps {
  isOpen: boolean
  onClose: () => void
  order: PurchaseOrder | null
  formatCurrency: (amount: number) => string
  getStatusColor: (status: string) => string
  getPriorityColor: (priority: string) => string
}

export default function ViewOrderModal({
  isOpen, onClose, order, formatCurrency, getStatusColor, getPriorityColor,
}: ViewOrderModalProps) {
  if (!isOpen || !order) return null

  const rows = [
    { icon: <Building className="w-4 h-4 text-slate-400" />, label: "Vendor", value: order.vendor },
    { icon: <Calendar className="w-4 h-4 text-slate-400" />, label: "Order Date", value: order.date },
    { icon: <Calendar className="w-4 h-4 text-slate-400" />, label: "Expected Delivery", value: order.expectedDelivery },
    { icon: <DollarSign className="w-4 h-4 text-slate-400" />, label: "Total Amount", value: formatCurrency(order.totalAmount) },
    { icon: <Package className="w-4 h-4 text-slate-400" />, label: "Items", value: String(order.items) },
    { icon: <Tag className="w-4 h-4 text-slate-400" />, label: "Category", value: order.category },
    { icon: <User className="w-4 h-4 text-slate-400" />, label: "Requestor", value: order.requestor },
    { icon: <CheckCircle className="w-4 h-4 text-slate-400" />, label: "Approved By", value: order.approvedBy ?? "Pending approval" },
  ]

  return (
    <div
      className="fixed inset-0 bg-slate-900/55 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="animate-in fade-in zoom-in-95 duration-200 bg-white rounded-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
              <Truck className="w-[17px] h-[17px] text-white" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-slate-900">Purchase Order Details</div>
              <div className="text-xs text-slate-400 mt-px">{order.orderNumber}</div>
            </div>
          </div>
          <button onClick={onClose} className="w-[34px] h-[34px] rounded-lg border-[1.5px] border-slate-200 hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Badges */}
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>{order.status}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(order.priority)}`}>{order.priority} priority</span>
          </div>

          {/* Details */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <Truck className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Order Information</span>
            </div>
            <div className="p-4 space-y-3">
              {rows.map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  {icon}
                  <span className="text-sm text-slate-500 w-36 shrink-0">{label}</span>
                  <span className="text-sm font-medium text-slate-900">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gradient-to-br from-slate-500 to-slate-600 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Description</span>
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-700">{order.description}</p>
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={onClose} className="h-11 px-6 rounded-xl text-sm font-medium text-slate-600 border-[1.5px] border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
