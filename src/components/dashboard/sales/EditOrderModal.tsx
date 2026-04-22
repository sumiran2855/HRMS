import { useState, useEffect } from "react"
import { EditModal } from "@/components/dashboard/models/EditModal"
import { SalesOrder } from "@/types/sales.types"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

interface EditOrderModalProps {
  isOpen: boolean
  onClose: () => void
  order: SalesOrder | null
  onSave: (updated: SalesOrder) => void
}

export default function EditOrderModal({
  isOpen,
  onClose,
  order,
  onSave,
}: EditOrderModalProps) {
  const [formData, setFormData] = useState<SalesOrder | null>(null)

  useEffect(() => {
    if (order) {
      setFormData({ ...order })
    }
  }, [order])

  if (!formData) return null

  const handleChange = (field: keyof SalesOrder, value: string | number) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  const handleSave = () => {
    if (formData) onSave(formData)
  }

  return (
    <EditModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit ${order?.orderNumber}`}
      description="Update order information below"
      onSave={handleSave}
    >
      <div className="space-y-5">
        {/* Order Information */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Order Information</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="orderNumber" className="text-xs text-slate-500">Order Number</Label>
              <Input
                id="orderNumber"
                value={formData.orderNumber}
                onChange={(e) => handleChange("orderNumber", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="customer" className="text-xs text-slate-500">Customer</Label>
              <Input
                id="customer"
                value={formData.customer}
                onChange={(e) => handleChange("customer", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="date" className="text-xs text-slate-500">Order Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="deliveryDate" className="text-xs text-slate-500">Delivery Date</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => handleChange("deliveryDate", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Financial Details */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Financial Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="totalAmount" className="text-xs text-slate-500">Total Amount</Label>
              <Input
                id="totalAmount"
                type="number"
                value={formData.totalAmount}
                onChange={(e) => handleChange("totalAmount", Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="items" className="text-xs text-slate-500">Items</Label>
              <Input
                id="items"
                type="number"
                value={formData.items}
                onChange={(e) => handleChange("items", Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="salesRep" className="text-xs text-slate-500">Sales Rep</Label>
              <Input
                id="salesRep"
                value={formData.salesRep}
                onChange={(e) => handleChange("salesRep", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Shipping Details */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Shipping Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label htmlFor="shippingAddress" className="text-xs text-slate-500">Shipping Address</Label>
              <Input
                id="shippingAddress"
                value={formData.shippingAddress}
                onChange={(e) => handleChange("shippingAddress", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="trackingNumber" className="text-xs text-slate-500">Tracking Number</Label>
              <Input
                id="trackingNumber"
                value={formData.trackingNumber}
                onChange={(e) => handleChange("trackingNumber", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </div>
    </EditModal>
  )
}
