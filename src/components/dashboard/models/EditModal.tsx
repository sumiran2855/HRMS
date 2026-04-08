"use client"

import { X, UserCircle2 } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  onSave?: () => void
  description?: string
  lastUpdated?: string
}

export function EditModal({
  isOpen,
  onClose,
  title,
  children,
  onSave,
  description = "Update the details below and save your changes.",
  lastUpdated,
}: EditModalProps) {
  if (!isOpen) return null

  const handleSave = () => {
    if (onSave) onSave()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-slate-200 shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <UserCircle2 className="w-4.5 h-4.5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-[15px] font-medium text-slate-900 leading-tight">{title}</h2>
              <p className="text-[12px] text-slate-400 leading-tight mt-0.5">{description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
          <span className="text-[12px] text-slate-400">
            {lastUpdated ? `Last updated ${lastUpdated}` : "All fields are editable"}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="h-8 px-4 rounded-lg text-[13px] text-slate-500 border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="h-8 px-4 rounded-lg text-[13px] font-medium bg-slate-900 text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Save changes
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}