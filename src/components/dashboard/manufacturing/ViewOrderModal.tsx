"use client"

import { X, Settings, Package, Calendar, User, Tag, Hash, CheckCircle, FileText } from "lucide-react"
import { ProductionOrder } from "@/types/manufacturing.types"

interface ViewOrderModalProps {
  isOpen: boolean
  onClose: () => void
  order: ProductionOrder | null
  getStatusColor: (status: string) => string
  getPriorityColor: (priority: string) => string
}

export default function ViewOrderModal({
  isOpen, onClose, order, getStatusColor, getPriorityColor,
}: ViewOrderModalProps) {
  if (!isOpen || !order) return null

  const rows = [
    { icon: <Package className="w-4 h-4 text-slate-400" />, label: "Product", value: order.product },
    { icon: <Hash className="w-4 h-4 text-slate-400" />, label: "Batch Number", value: order.batchNumber },
    { icon: <Tag className="w-4 h-4 text-slate-400" />, label: "Quantity", value: String(order.quantity) },
    { icon: <Calendar className="w-4 h-4 text-slate-400" />, label: "Start Date", value: order.startDate },
    { icon: <Calendar className="w-4 h-4 text-slate-400" />, label: "End Date", value: order.endDate },
    { icon: <Calendar className="w-4 h-4 text-slate-400" />, label: "Est. Completion", value: order.estimatedCompletion },
    { icon: <Settings className="w-4 h-4 text-slate-400" />, label: "Production Line", value: order.productionLine },
    { icon: <User className="w-4 h-4 text-slate-400" />, label: "Supervisor", value: order.supervisor },
    { icon: <CheckCircle className="w-4 h-4 text-slate-400" />, label: "Completion Rate", value: `${order.completionRate}%` },
    {
      icon: <Tag className="w-4 h-4 text-slate-400" />,
      label: "Quality Score",
      value: order.qualityScore > 0 ? `${order.qualityScore} / 5.0` : "N/A",
    },
  ]

  return (
    <div
      className="fixed inset-0 bg-slate-900/55 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="animate-in fade-in zoom-in-95 duration-200 bg-white rounded-2xl w-full max-w-[620px] max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
              <Settings className="w-[17px] h-[17px] text-white" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-slate-900">Production Order Details</div>
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
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>{order.status.replace("-", " ")}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(order.priority)}`}>{order.priority} priority</span>
          </div>

          {/* Progress */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">Completion Progress</span>
              <span className="font-semibold text-slate-900">{order.completionRate}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full transition-all"
                style={{ width: `${order.completionRate}%` }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <Settings className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Order Information</span>
            </div>
            <div className="p-4 space-y-3">
              {rows.map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  {icon}
                  <span className="text-sm text-slate-500 w-40 shrink-0">{label}</span>
                  <span className="text-sm font-medium text-slate-900">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gradient-to-br from-slate-500 to-slate-600 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Materials</span>
            </div>
            <div className="p-4 flex flex-wrap gap-2">
              {order.materials.map((m) => (
                <span key={m} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">{m}</span>
              ))}
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
