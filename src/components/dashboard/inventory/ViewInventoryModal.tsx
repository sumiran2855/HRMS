import {
  X,
  Package,
  MapPin,
  Truck,
  Calendar,
  DollarSign,
  BarChart3,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { STATUS_CONFIG } from "@/constants/inventory"
import type { InventoryItem } from "@/types/inventory.types"

interface ViewInventoryModalProps {
  isOpen: boolean
  onClose: () => void
  item: InventoryItem | null
  formatCurrency: (amount: number) => string
}

export function ViewInventoryModal({ isOpen, onClose, item, formatCurrency }: ViewInventoryModalProps) {
  if (!isOpen || !item) return null

  const statusCfg = STATUS_CONFIG[item.status] || {
    bg: "bg-gray-50",
    text: "text-gray-700",
    dot: "bg-gray-500",
    label: item.status,
  }

  const stockPct = Math.min((item.quantity / item.maxStock) * 100, 100)
  const stockColor =
    stockPct <= 20 ? "bg-red-500" : stockPct <= 50 ? "bg-amber-500" : "bg-emerald-500"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Item Details</h2>
              <p className="text-xs text-slate-500">{item.sku}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Item name + status */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusCfg.bg} ${statusCfg.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
              {statusCfg.label}
            </span>
          </div>

          {/* Stock level bar */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Stock Level</span>
              <span className="text-sm font-bold text-slate-900">{item.quantity} / {item.maxStock}</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${stockColor} transition-all duration-500`} style={{ width: `${stockPct}%` }} />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
              <span>Min: {item.minStock}</span>
              <span>Reorder: {item.reorderPoint}</span>
              <span>Max: {item.maxStock}</span>
            </div>
          </div>

          {/* Detail grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailCard icon={<Package className="w-4 h-4 text-indigo-500" />} label="Category" value={item.category} />
            <DetailCard icon={<MapPin className="w-4 h-4 text-emerald-500" />} label="Location" value={item.location} />
            <DetailCard icon={<Truck className="w-4 h-4 text-blue-500" />} label="Supplier" value={item.supplier} />
            <DetailCard icon={<Calendar className="w-4 h-4 text-violet-500" />} label="Last Updated" value={item.lastUpdated} />
            <DetailCard icon={<DollarSign className="w-4 h-4 text-green-500" />} label="Unit Price" value={formatCurrency(item.unitPrice)} />
            <DetailCard icon={<BarChart3 className="w-4 h-4 text-amber-500" />} label="Total Value" value={formatCurrency(item.totalValue)} />
          </div>

          {item.quantity <= item.minStock && item.quantity > 0 && (
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                Stock is below minimum threshold ({item.minStock}). Consider reordering from <span className="font-semibold">{item.supplier}</span>.
              </p>
            </div>
          )}

          {item.quantity <= 0 && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-800">
                This item is out of stock. Immediate reorder required from <span className="font-semibold">{item.supplier}</span>.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4">
          <Button variant="outline" onClick={onClose} className="cursor-pointer w-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

function DetailCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm font-semibold text-slate-900">{value}</p>
    </div>
  )
}
