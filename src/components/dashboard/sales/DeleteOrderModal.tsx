import { X, AlertTriangle } from "lucide-react"
import { SalesOrder } from "@/types/sales.types"

interface DeleteOrderModalProps {
  isOpen: boolean
  onClose: () => void
  order: SalesOrder | null
  onConfirm: () => void
  formatCurrency: (amount: number) => string
}

export default function DeleteOrderModal({
  isOpen,
  onClose,
  order,
  onConfirm,
  formatCurrency,
}: DeleteOrderModalProps) {
  if (!isOpen || !order) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md border border-slate-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4.5 h-4.5 text-red-500" />
            </div>
            <div>
              <h2 className="text-[15px] font-medium text-slate-900 leading-tight">Delete Order</h2>
              <p className="text-[12px] text-slate-400 leading-tight mt-0.5">This action cannot be undone</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-orange-600 font-mono">
                  {order.orderNumber}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{order.customer}</p>
                <p className="text-xs text-slate-500">
                  {formatCurrency(order.totalAmount)} • {order.items} items
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-600">
            Are you sure you want to delete order{" "}
            <span className="font-semibold text-slate-900">{order.orderNumber}</span>?
            All associated invoice records, shipping details, and payment history will be
            permanently removed.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="h-8 px-4 rounded-lg text-[13px] text-slate-500 border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="h-8 px-4 rounded-lg text-[13px] font-medium bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
          >
            Delete Order
          </button>
        </div>
      </div>
    </div>
  )
}
