import { useState, useEffect } from "react"
import { X, Edit, Save } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { CATEGORIES, STATUSES } from "@/constants/inventory"
import type { InventoryItem } from "@/types/inventory.types"

interface EditInventoryModalProps {
  isOpen: boolean
  onClose: () => void
  item: InventoryItem | null
  onUpdate: (updatedItem: InventoryItem) => void
}

export function EditInventoryModal({ isOpen, onClose, item, onUpdate }: EditInventoryModalProps) {
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    category: "",
    quantity: 0,
    minStock: 0,
    maxStock: 0,
    unitPrice: 0,
    location: "",
    supplier: "",
    status: "in-stock" as InventoryItem["status"],
    reorderPoint: 0,
  })

  useEffect(() => {
    if (item) {
      setFormData({
        sku: item.sku,
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        minStock: item.minStock,
        maxStock: item.maxStock,
        unitPrice: item.unitPrice,
        location: item.location,
        supplier: item.supplier,
        status: item.status,
        reorderPoint: item.reorderPoint,
      })
    }
  }, [item])

  if (!isOpen || !item) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate({
      ...item,
      ...formData,
      totalValue: formData.quantity * formData.unitPrice,
      lastUpdated: new Date().toISOString().split("T")[0],
    })
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl [&::-webkit-scrollbar]:hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Edit className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Edit Item</h2>
              <p className="text-xs text-slate-500">{item.sku} — {item.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Basic Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sku" className="text-sm font-medium text-slate-700">SKU</Label>
                  <Input id="sku" value={formData.sku} onChange={(e) => handleChange("sku", e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-slate-700">Item Name</Label>
                  <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="category" className="text-sm font-medium text-slate-700">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className="mt-1 w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none hover:border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20"
                  >
                    {CATEGORIES.filter((c) => c !== "All Categories").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="status" className="text-sm font-medium text-slate-700">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="mt-1 w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none hover:border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20"
                  >
                    {STATUSES.filter((s) => s !== "All Status").map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Stock Info */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Stock & Pricing</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="quantity" className="text-sm font-medium text-slate-700">Quantity</Label>
                  <Input id="quantity" type="number" value={formData.quantity} onChange={(e) => handleChange("quantity", Number(e.target.value))} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="minStock" className="text-sm font-medium text-slate-700">Min Stock</Label>
                  <Input id="minStock" type="number" value={formData.minStock} onChange={(e) => handleChange("minStock", Number(e.target.value))} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="maxStock" className="text-sm font-medium text-slate-700">Max Stock</Label>
                  <Input id="maxStock" type="number" value={formData.maxStock} onChange={(e) => handleChange("maxStock", Number(e.target.value))} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="unitPrice" className="text-sm font-medium text-slate-700">Unit Price ($)</Label>
                  <Input id="unitPrice" type="number" step="0.01" value={formData.unitPrice} onChange={(e) => handleChange("unitPrice", Number(e.target.value))} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="reorderPoint" className="text-sm font-medium text-slate-700">Reorder Point</Label>
                  <Input id="reorderPoint" type="number" value={formData.reorderPoint} onChange={(e) => handleChange("reorderPoint", Number(e.target.value))} className="mt-1" />
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Location & Supplier</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location" className="text-sm font-medium text-slate-700">Location</Label>
                  <Input id="location" value={formData.location} onChange={(e) => handleChange("location", e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="supplier" className="text-sm font-medium text-slate-700">Supplier</Label>
                  <Input id="supplier" value={formData.supplier} onChange={(e) => handleChange("supplier", e.target.value)} className="mt-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer">
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
