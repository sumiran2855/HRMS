"use client"

import { useState, useEffect } from "react"
import { X, Truck, Save, CheckCircle, Building, Calendar, DollarSign, Package, User, Tag, FileText } from "lucide-react"
import { PurchaseOrder } from "@/types/procurement.types"
import { STATUSES, PRIORITIES } from "@/constants/procurement"

interface EditOrderModalProps {
  isOpen: boolean
  onClose: () => void
  order: PurchaseOrder | null
  onSave: (updated: PurchaseOrder) => void
}

export default function EditOrderModal({ isOpen, onClose, order, onSave }: EditOrderModalProps) {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState<Omit<PurchaseOrder, "id"> | null>(null)

  useEffect(() => {
    if (order) {
      const { id: _id, ...rest } = order
      setForm(rest)
    }
  }, [order])

  if (!isOpen || !order || !form) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => prev ? { ...prev, [name]: name === "totalAmount" || name === "items" ? Number(value) : value } : prev)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      onSave({ ...order, ...form })
    }, 1200)
  }

  const fields = [
    { name: "vendor", label: "Vendor", icon: <Building className="w-4 h-4 text-slate-400" />, type: "text" },
    { name: "date", label: "Order Date", icon: <Calendar className="w-4 h-4 text-slate-400" />, type: "date" },
    { name: "expectedDelivery", label: "Expected Delivery", icon: <Calendar className="w-4 h-4 text-slate-400" />, type: "date" },
    { name: "totalAmount", label: "Total Amount ($)", icon: <DollarSign className="w-4 h-4 text-slate-400" />, type: "number" },
    { name: "items", label: "Items", icon: <Package className="w-4 h-4 text-slate-400" />, type: "number" },
    { name: "requestor", label: "Requestor", icon: <User className="w-4 h-4 text-slate-400" />, type: "text" },
    { name: "category", label: "Category", icon: <Tag className="w-4 h-4 text-slate-400" />, type: "text" },
  ]

  return (
    <div
      className="fixed inset-0 bg-slate-900/55 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="animate-in fade-in zoom-in-95 duration-200 bg-white rounded-2xl w-full max-w-[700px] max-h-[92vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <Truck className="w-[17px] h-[17px] text-white" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-slate-900">Edit Purchase Order</div>
              <div className="text-xs text-slate-400 mt-px">{order.orderNumber}</div>
            </div>
          </div>
          <button onClick={onClose} className="w-[34px] h-[34px] rounded-lg border-[1.5px] border-slate-200 hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gradient-to-br from-green-500 to-green-600 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <Truck className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Order Details</span>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-5">
              {fields.map(({ name, label, icon, type }) => (
                <div key={name}>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">{label}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 z-[1]">{icon}</span>
                    <input
                      name={name}
                      type={type}
                      value={(form as Record<string, unknown>)[name] as string}
                      onChange={handleChange}
                      className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10"
                    />
                  </div>
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white px-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 appearance-none">
                  {STATUSES.filter((s) => s !== "All Status").map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Priority</label>
                <select name="priority" value={form.priority} onChange={handleChange} className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white px-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 appearance-none">
                  {PRIORITIES.filter((p) => p !== "All Priorities").map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Description</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400 z-[1]" />
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded-[10px] border-[1.5px] border-slate-200 bg-white pl-[38px] pr-3.5 py-2.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="h-11 px-6 rounded-xl text-sm font-medium text-slate-600 border-[1.5px] border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">Cancel</button>
            <button type="submit" disabled={saved} className={`h-11 px-6 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer flex items-center gap-2 ${saved ? "bg-green-500" : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/25"}`}>
              {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
