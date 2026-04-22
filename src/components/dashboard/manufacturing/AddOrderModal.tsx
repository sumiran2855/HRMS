"use client"

import { useState } from "react"
import {
  X, Settings, Save, CheckCircle, Package, Calendar, User, Tag, Hash,
} from "lucide-react"
import { STATUSES, PRIORITIES, PRODUCTION_LINES_DATA } from "@/constants/manufacturing"

interface AddOrderModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

interface OrderFormData {
  orderNumber: string
  product: string
  batchNumber: string
  quantity: string
  startDate: string
  endDate: string
  estimatedCompletion: string
  priority: string
  productionLine: string
  supervisor: string
}

const INITIAL_FORM: OrderFormData = {
  orderNumber: "",
  product: "",
  batchNumber: "",
  quantity: "",
  startDate: "",
  endDate: "",
  estimatedCompletion: "",
  priority: "normal",
  productionLine: "",
  supervisor: "",
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
    if (!formData.product.trim()) e.product = "Product is required"
    if (!formData.batchNumber.trim()) e.batchNumber = "Batch number is required"
    if (!formData.quantity.trim()) e.quantity = "Quantity is required"
    if (!formData.startDate) e.startDate = "Start date is required"
    if (!formData.endDate) e.endDate = "End date is required"
    if (!formData.productionLine) e.productionLine = "Production line is required"
    if (!formData.supervisor.trim()) e.supervisor = "Supervisor is required"
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

  const lineNames = PRODUCTION_LINES_DATA.map((l) => l.name)

  const fields = [
    { name: "orderNumber", label: "Order Number", icon: <Hash className="w-4 h-4 text-slate-400" />, placeholder: "MO-004", type: "text" },
    { name: "product", label: "Product", icon: <Package className="w-4 h-4 text-slate-400" />, placeholder: "Product name", type: "text" },
    { name: "batchNumber", label: "Batch Number", icon: <Hash className="w-4 h-4 text-slate-400" />, placeholder: "BATCH-459", type: "text" },
    { name: "quantity", label: "Quantity", icon: <Tag className="w-4 h-4 text-slate-400" />, placeholder: "0", type: "number" },
    { name: "startDate", label: "Start Date", icon: <Calendar className="w-4 h-4 text-slate-400" />, placeholder: "", type: "date" },
    { name: "endDate", label: "End Date", icon: <Calendar className="w-4 h-4 text-slate-400" />, placeholder: "", type: "date" },
    { name: "estimatedCompletion", label: "Est. Completion", icon: <Calendar className="w-4 h-4 text-slate-400" />, placeholder: "", type: "date" },
    { name: "supervisor", label: "Supervisor", icon: <User className="w-4 h-4 text-slate-400" />, placeholder: "Supervisor name", type: "text" },
  ]

  return (
    <div
      className="fixed inset-0 bg-slate-900/55 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="animate-in fade-in zoom-in-95 duration-200 bg-white rounded-2xl w-full max-w-[900px] max-h-[92vh] overflow-y-auto flex flex-col shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
              <Settings className="w-[17px] h-[17px] text-white" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-slate-900">New Production Order</div>
              <div className="text-xs text-slate-400 mt-px">Fill in production details</div>
            </div>
          </div>
          <button onClick={onClose} className="w-[34px] h-[34px] rounded-lg border-[1.5px] border-slate-200 hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors shrink-0">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex-1">
          {/* Order Information */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-5">
            <div className="px-4 py-3 flex items-center gap-2.5 bg-gradient-to-br from-indigo-500 to-indigo-600">
              <div className="w-7 h-7 rounded-[7px] bg-white/15 flex items-center justify-center">
                <Settings className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">Order Information</span>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-5">
              {fields.map(({ name, label, icon, placeholder, type }) => (
                <div key={name}>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">{label}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 z-[1]">{icon}</span>
                    <input
                      name={name}
                      type={type}
                      value={(formData as unknown as Record<string, string>)[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white pl-[38px] pr-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 ${errors[name] ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    />
                  </div>
                  {errors[name] && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors[name]}</div>}
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Production Line</label>
                <select
                  name="productionLine"
                  value={formData.productionLine}
                  onChange={handleChange}
                  className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white px-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 appearance-none ${errors.productionLine ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                >
                  <option value="">Select line</option>
                  {lineNames.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
                {errors.productionLine && <div className="text-red-600 text-[11.5px] font-medium mt-1">{errors.productionLine}</div>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full h-11 rounded-[10px] border-[1.5px] border-slate-200 bg-white px-3.5 text-[13.5px] text-slate-900 outline-none transition-all focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/10 appearance-none"
                >
                  {PRIORITIES.filter((p) => p !== "All Priorities").map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="h-11 px-6 rounded-xl text-sm font-medium text-slate-600 border-[1.5px] border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">Cancel</button>
            <button type="submit" disabled={saved} className={`h-11 px-6 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer flex items-center gap-2 ${saved ? "bg-green-500 hover:bg-green-600" : "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/25"}`}>
              {saved ? <><CheckCircle className="w-4 h-4" /> Order Created!</> : <><Save className="w-4 h-4" /> Create Order</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
