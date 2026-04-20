import { Button } from "@/components/ui/Button"
import {
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Warehouse,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { STATUS_CONFIG, TABLE_HEADERS } from "@/constants/inventory"
import type { InventoryItem } from "@/types/inventory.types"

interface InventoryTableProps {
  paginatedData: InventoryItem[]
  filteredData: InventoryItem[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number
  startIndex: number
  entriesPerPage: number
  setEntriesPerPage: (n: number) => void
  formatCurrency: (amount: number) => string
  onView: (item: InventoryItem) => void
  onEdit: (item: InventoryItem) => void
  onDelete: (item: InventoryItem) => void
}

function StockIcon({ quantity, minStock, maxStock }: { quantity: number; minStock: number; maxStock: number }) {
  if (quantity <= 0) return <AlertTriangle className="w-4 h-4 text-red-500" />
  if (quantity <= minStock) return <TrendingDown className="w-4 h-4 text-amber-500" />
  if (quantity >= maxStock) return <TrendingUp className="w-4 h-4 text-blue-500" />
  return <Package className="w-4 h-4 text-emerald-500" />
}

function QuantityBar({ quantity, maxStock }: { quantity: number; maxStock: number }) {
  const pct = Math.min((quantity / maxStock) * 100, 100)
  const color =
    pct <= 20 ? "bg-red-500" : pct <= 50 ? "bg-amber-500" : "bg-emerald-500"
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-slate-900 tabular-nums w-8 text-center">{quantity}</span>
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-[40px]">
        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function InventoryTable({
  paginatedData,
  filteredData,
  currentPage,
  setCurrentPage,
  totalPages,
  startIndex,
  entriesPerPage,
  setEntriesPerPage,
  formatCurrency,
  onView,
  onEdit,
  onDelete,
}: InventoryTableProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
      {/* Table header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-base font-semibold text-slate-900">Inventory Items</h3>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>Show</span>
          <div className="relative">
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="h-8 rounded-lg border border-slate-200 bg-white pl-3 pr-7 text-sm font-medium text-slate-700 shadow-sm outline-none hover:border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20 appearance-none cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <span>entries</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              {TABLE_HEADERS.map((h) => (
                <th
                  key={h.key}
                  className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500 ${
                    h.align === "center" ? "text-center" : h.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={TABLE_HEADERS.length} className="py-12 text-center">
                  <Package className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-medium text-slate-500">No items found</p>
                  <p className="text-xs text-slate-400 mt-1">Try adjusting your filters</p>
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => {
                const statusCfg = STATUS_CONFIG[item.status] || {
                  bg: "bg-gray-50",
                  text: "text-gray-700",
                  dot: "bg-gray-500",
                  label: item.status,
                }
                return (
                  <tr
                    key={item.id}
                    className="group hover:bg-indigo-50/40 transition-colors duration-150"
                  >
                    <td className="py-3.5 px-4">
                      <span className="text-sm font-mono font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {item.sku}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <StockIcon quantity={item.quantity} minStock={item.minStock} maxStock={item.maxStock} />
                        <span className="text-sm font-medium text-slate-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-sm text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">{item.category}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <QuantityBar quantity={item.quantity} maxStock={item.maxStock} />
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-xs text-slate-500 tabular-nums">{item.minStock} / {item.maxStock}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-sm text-slate-700 tabular-nums">{formatCurrency(item.unitPrice)}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-sm font-semibold text-slate-900 tabular-nums">{formatCurrency(item.totalValue)}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <Warehouse className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-sm text-slate-600">{item.location}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusCfg.bg} ${statusCfg.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                        {statusCfg.label}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-center gap-0.5">
                        <button
                          onClick={() => onView(item)}
                          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEdit(item)}
                          className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Edit Item"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(item)}
                          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/30">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-700">{startIndex + 1}</span> to{" "}
            <span className="font-medium text-slate-700">{Math.min(startIndex + entriesPerPage, filteredData.length)}</span>{" "}
            of <span className="font-medium text-slate-700">{filteredData.length}</span> items
          </p>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="cursor-pointer h-8 w-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "primary" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={`cursor-pointer h-8 w-8 p-0 text-xs ${
                  currentPage === page
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 border-indigo-600"
                    : "text-slate-600"
                }`}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="cursor-pointer h-8 w-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
