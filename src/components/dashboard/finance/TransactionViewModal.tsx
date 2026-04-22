"use client"

import { Modal } from "@/components/ui/Modal"
import { Button } from "@/components/ui/Button"
import {
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  CreditCard,
  Tag,
  FileText,
  User,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
} from "lucide-react"
import { STATUS_COLOR_MAP } from "@/constants/finance"
import type { Transaction } from "@/types/finance.types"

interface TransactionViewModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction | null
  formatCurrency: (amount: number) => string
}

function getStatusIcon(status: string) {
  switch (status) {
    case "paid":
      return <CheckCircle className="w-4 h-4 text-green-600" />
    case "pending":
      return <Clock className="w-4 h-4 text-yellow-600" />
    case "overdue":
      return <AlertTriangle className="w-4 h-4 text-red-600" />
    default:
      return <FileText className="w-4 h-4 text-gray-600" />
  }
}

export function TransactionViewModal({
  isOpen,
  onClose,
  transaction,
  formatCurrency,
}: TransactionViewModalProps) {
  if (!transaction) return null

  const statusColor =
    STATUS_COLOR_MAP[transaction.status] || "bg-gray-100 text-gray-700"
  const isInvoice = transaction.type === "invoice"

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction Details"
      description={`Viewing ${transaction.number}`}
      size="md"
    >
      <div className="space-y-5 mt-2">
        {/* Amount Banner */}
        <div
          className={`flex items-center justify-between rounded-xl p-5 ${
            isInvoice
              ? "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
              : "bg-gradient-to-r from-red-50 to-rose-50 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isInvoice ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {isInvoice ? (
                <ArrowUpRight className="w-5 h-5 text-green-600" />
              ) : (
                <ArrowDownRight className="w-5 h-5 text-red-600" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 capitalize">
                {transaction.type}
              </p>
              <p className="text-xs text-slate-400">{transaction.number}</p>
            </div>
          </div>
          <p
            className={`text-2xl font-bold ${
              isInvoice ? "text-green-700" : "text-red-700"
            }`}
          >
            {isInvoice ? "+" : "-"}
            {formatCurrency(transaction.amount)}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <DetailItem
            icon={<User className="w-4 h-4" />}
            label={isInvoice ? "Client" : "Vendor"}
            value={transaction.client || transaction.vendor || "—"}
          />
          <DetailItem
            icon={<Tag className="w-4 h-4" />}
            label="Category"
            value={transaction.category}
          />
          <DetailItem
            icon={<Calendar className="w-4 h-4" />}
            label="Date"
            value={transaction.date}
          />
          <DetailItem
            icon={<Calendar className="w-4 h-4" />}
            label="Due Date"
            value={transaction.dueDate}
          />
          <DetailItem
            icon={<CreditCard className="w-4 h-4" />}
            label="Payment Method"
            value={transaction.paymentMethod}
          />
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              {getStatusIcon(transaction.status)}
              Status
            </p>
            <span
              className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor}`}
            >
              {transaction.status}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4" />
            Description
          </p>
          <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-3 border border-slate-100 leading-relaxed">
            {transaction.description}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100" />

        {/* Close Button */}
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose} className="cursor-pointer">
            <X className="w-4 h-4 mr-1" />
            Close
          </Button>
        </div>
      </div>
    </Modal>
  )
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
        {icon}
        {label}
      </p>
      <p className="text-sm font-medium text-slate-800">{value}</p>
    </div>
  )
}
