"use client"

import { X, AlertTriangle, Trash2 } from "lucide-react"

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  itemName: string
  itemType: 'lead' | 'deal'
}

export function DeleteConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  itemName,
  itemType 
}: DeleteConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4 text-red-700" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 leading-tight">Delete {itemType === 'lead' ? 'Lead' : 'Deal'}</h2>
              <p className="text-xs text-slate-400 leading-tight">This action cannot be undone</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            
            <div className="space-y-3">
              <p className="text-slate-900 font-medium text-sm">{message}</p>
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">{itemType === 'lead' ? 'Lead' : 'Deal'}:</span> {itemName}
                </p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-amber-800">
                ⚠️ All associated data will be permanently deleted
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-slate-50">
          <p className="text-xs text-slate-400">Confirm deletion</p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="h-8 px-4 rounded-lg border border-slate-200 text-xs text-slate-500 hover:bg-white hover:text-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="h-8 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-xs font-medium text-white transition-colors"
            >
              Delete {itemType === 'lead' ? 'Lead' : 'Deal'}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
