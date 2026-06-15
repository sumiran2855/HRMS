"use client"

import { useState } from "react"
import {
  X,
  ShoppingCart,
  User,
  Truck,
  DollarSign,
  CheckCircle,
  Save,
  Calendar,
  Package,
  MapPin,
  Hash,
  CreditCard,
} from "lucide-react"

interface AddOrderModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

interface OrderFormData {
  orderNumber: string
  customer: string
  date: string
  deliveryDate: string
  totalAmount: string
  items: string
  salesRep: string
  paymentStatus: string
  shippingAddress: string
  trackingNumber: string
}

const INITIAL_FORM: OrderFormData = {
  orderNumber: "",
  customer: "",
  date: "",
  deliveryDate: "",
  totalAmount: "",
  items: "",
  salesRep: "",
  paymentStatus: "pending",
  shippingAddress: "",
  trackingNumber: "",
}

export default function AddOrderModal({ isOpen, onClose, onSuccess }: AddOrderModalProps) {
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<OrderFormData>(INITIAL_FORM)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.orderNumber.trim()) e.orderNumber = "Order number is required"
    if (!formData.customer.trim()) e.customer = "Customer name is required"
    if (!formData.date) e.date = "Order date is required"
    if (!formData.deliveryDate) e.deliveryDate = "Delivery date is required"
    if (!formData.totalAmount.trim()) e.totalAmount = "Total amount is required"
    if (!formData.items.trim()) e.items = "Number of items is required"
    if (!formData.salesRep.trim()) e.salesRep = "Sales rep is required"
    if (!formData.shippingAddress.trim()) e.shippingAddress = "Shipping address is required"
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      setFormData(INITIAL_FORM)
      onClose()
      if (onSuccess) onSuccess()
    }, 1500)
  }

  if (!isOpen) return null

  const salesReps = ["John Smith", "Emma Davis", "Chris Wilson", "Sarah Brown", "Michael Chen"]
  const paymentOptions = ["pending", "paid"]

  return (
    <div
      className="fixed inset-0 bg-slate-900/55 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="animate-in fade-in zoom-in-95 duration-200 bg-white rounded-2xl w-full max-w-[900px] max-h-[92vh] overflow-y-auto flex flex-col shadow-2xl [&::-webkit-scrollbar]:hidden">

        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <ShoppingCart className="w-[17px] h-[17px] text-white" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-slate-900">Add New Order</div>
              <div className="text-xs text-slate-400 mt-px">Order, customer, and shipping information</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-[34px] h-[34px] rounded-lg border-[1.5px] border-slate-200 bg-transparent hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex-1">

          {/* Order Information */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-5">
            <div className="px-4 py-3 flex items-center gap-2.5 bg-gradient-to-br from-orange-500 to-orange-600">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <ShoppingCart className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Order Information</span>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Order Number</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.orderNumber ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleChange}
                    placeholder="SO-004"
                  />
                </div>
                {errors.orderNumber && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.orderNumber}</div>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Customer</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.customer ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="customer"
                    value={formData.customer}
                    onChange={handleChange}
                    placeholder="Customer name"
                  />
                </div>
                {errors.customer && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.customer}</div>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Order Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.date ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    type="date"
                  />
                </div>
                {errors.date && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.date}</div>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Delivery Date</label>
                <div className="relative">
                  <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.deliveryDate ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    type="date"
                  />
                </div>
                {errors.deliveryDate && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.deliveryDate}</div>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Sales Representative</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <select
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 appearance-none ${errors.salesRep ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="salesRep"
                    value={formData.salesRep}
                    onChange={handleChange}
                  >
                    <option value="">Select sales rep</option>
                    {salesReps.map((rep) => (
                      <option key={rep} value={rep}>{rep}</option>
                    ))}
                  </select>
                </div>
                {errors.salesRep && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.salesRep}</div>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Payment Status</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <select
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 appearance-none"
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handleChange}
                  >
                    {paymentOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-5">
            <div className="px-4 py-3 flex items-center gap-2.5 bg-gradient-to-br from-green-500 to-green-600">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <DollarSign className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Financial Details</span>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Total Amount ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.totalAmount ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="totalAmount"
                    value={formData.totalAmount}
                    onChange={handleChange}
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                  />
                </div>
                {errors.totalAmount && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.totalAmount}</div>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Number of Items</label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.items ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="items"
                    value={formData.items}
                    onChange={handleChange}
                    placeholder="0"
                    type="number"
                  />
                </div>
                {errors.items && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.items}</div>}
              </div>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-5">
            <div className="px-4 py-3 flex items-center gap-2.5 bg-gradient-to-br from-blue-500 to-blue-600">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <Truck className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Shipping Details</span>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Shipping Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors.shippingAddress ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    placeholder="Full shipping address"
                  />
                </div>
                {errors.shippingAddress && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.shippingAddress}</div>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Tracking Number (Optional)</label>
                <div className="relative">
                  <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-[1]" />
                  <input
                    className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                    name="trackingNumber"
                    value={formData.trackingNumber}
                    onChange={handleChange}
                    placeholder="TRK000000000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-11 px-6 rounded-xl text-sm font-medium text-slate-600 border-[1.5px] border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saved}
              className={`h-11 px-6 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer flex items-center gap-2 ${
                saved
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/25"
              }`}
            >
              {saved ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Order Created!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Create Order
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
