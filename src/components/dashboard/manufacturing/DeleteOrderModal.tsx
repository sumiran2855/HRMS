"use client"

import { X, Settings, Trash2, AlertTriangle } from "lucide-react"
import { ProductionOrder } from "@/types/manufacturing.types"

interface DeleteOrderModalProps {
  isOpen: boolean
  onClose: () => void
  order: ProductionOrder | null
  onConfirm: () => void
}

export default function DeleteOrderModal({ isOpen, onClose, order, onConfirm }: DeleteOrderModalProps) {
  if (!isOpen || !order) return null

  return (
    <div
      className="fixed inset-0 bg-slate-900/55 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="animate-in fade-in zoom-in-95 duration-200 bg-white rounded-2xl w-full max-w-[480px] shadow-2xl">
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <Settings className="w-[17px] h-[17px] text-white" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-slate-900">Delete Production Order</div>
              <div className="text-xs text-slate-400 mt-px">{order.orderNumber}</div>
            </div>
          </div>
          <button onClick={onClose} className="w-[34px] h-[34px] rounded-lg border-[1.5px] border-slate-200 hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-red-700 mb-1">This action cannot be undone</p>
              <p className="text-sm text-red-600">You are about to permanently delete this production order and all associated data.</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Order Number</span>
              <span className="font-mono font-semibold text-slate-900">{order.orderNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Product</span>
              <span className="text-slate-900">{order.product}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Quantity</span>
              <span className="font-semibold text-slate-900">{order.quantity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Status</span>
              <span className="text-slate-900 capitalize">{order.status.replace("-", " ")}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button onClick={onClose} className="h-11 px-6 rounded-xl text-sm font-medium text-slate-600 border-[1.5px] border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">Cancel</button>
            <button onClick={onConfirm} className="h-11 px-6 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 transition-all cursor-pointer flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Delete Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
