"use client"

import { useState, useEffect } from "react"
import { Modal } from "@/components/ui/Modal"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { DollarSign, FileText, Save, X } from "lucide-react"
import type { Transaction } from "@/types/finance.types"

interface TransactionFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<Transaction, "id">) => void
  transaction?: Transaction | null
  isLoading?: boolean
}

const INITIAL_FORM: Omit<Transaction, "id"> = {
  type: "invoice",
  number: "",
  client: "",
  vendor: "",
  amount: 0,
  date: "",
  dueDate: "",
  status: "pending",
  category: "",
  description: "",
  paymentMethod: "",
}

export function TransactionFormModal({
  isOpen,
  onClose,
  onSubmit,
  transaction,
  isLoading = false,
}: TransactionFormModalProps) {
  const isEdit = !!transaction
  const [form, setForm] = useState<Omit<Transaction, "id">>(INITIAL_FORM)

  useEffect(() => {
    if (transaction) {
      const { id, ...rest } = transaction
      setForm(rest)
    } else {
      setForm(INITIAL_FORM)
    }
  }, [transaction, isOpen])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Transaction" : "New Transaction"}
      description={
        isEdit
          ? "Update the transaction details below."
          : "Fill in the details to create a new transaction."
      }
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-5 mt-2">
        {/* Type & Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Transaction Type</Label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 appearance-none cursor-pointer"
            >
              <option value="invoice">Invoice</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="number">Transaction Number</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="number"
                name="number"
                value={form.number}
                onChange={handleChange}
                placeholder="e.g. INV-005"
                className="pl-10"
                required
              />
            </div>
          </div>
        </div>

        {/* Client / Vendor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="client">
              {form.type === "invoice" ? "Client" : "Vendor"}
            </Label>
            <Input
              id="client"
              name={form.type === "invoice" ? "client" : "vendor"}
              value={form.type === "invoice" ? (form.client || "") : (form.vendor || "")}
              onChange={handleChange}
              placeholder={
                form.type === "invoice" ? "Client name" : "Vendor name"
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g. Sales, Office Supplies"
              required
            />
          </div>
        </div>

        {/* Amount & Payment Method */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                value={form.amount || ""}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 appearance-none cursor-pointer"
            >
              <option value="">Select method</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Auto-pay">Auto-pay</option>
              <option value="Cash">Cash</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 appearance-none cursor-pointer"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
            placeholder="Brief description of the transaction"
            className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 resize-none"
            required
          />
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100" />

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-1">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="cursor-pointer"
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </div>
            ) : (
              <>
                <Save className="w-4 h-4 mr-1" />
                {isEdit ? "Update Transaction" : "Create Transaction"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
