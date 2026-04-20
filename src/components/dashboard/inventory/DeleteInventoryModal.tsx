import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import type { InventoryItem } from "@/types/inventory.types"

interface DeleteInventoryModalProps {
  isOpen: boolean
  onClose: () => void
  item: InventoryItem | null
  onConfirm: () => void
}

export function DeleteInventoryModal({ isOpen, onClose, item, onConfirm }: DeleteInventoryModalProps) {
  if (!isOpen || !item) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Delete Item</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600">
            Are you sure you want to delete this inventory item? This action cannot be undone.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-red-900">{item.name}</p>
            <p className="text-xs text-red-700 mt-1">SKU: {item.sku} &middot; {item.category} &middot; Qty: {item.quantity}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100">
          <Button variant="outline" onClick={onClose} className="cursor-pointer">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white cursor-pointer">
            Delete Item
          </Button>
        </div>
      </div>
    </div>
  )
}
