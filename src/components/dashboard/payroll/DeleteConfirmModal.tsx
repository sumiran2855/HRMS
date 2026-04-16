"use client"

import { useState } from "react"
import { X, Trash2, AlertTriangle, User, FileText, Building, Mail } from "lucide-react"

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  employee: any
}

export function DeleteConfirmModal({ isOpen, onClose, employee }: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const [inputError, setInputError] = useState("")

  if (!isOpen || !employee) return null

  const isConfirmed = confirmText === employee.id

  const handleDelete = async () => {
    if (!isConfirmed) {
      setInputError("Employee ID does not match. Please try again.")
      return
    }
    setIsDeleting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1600))
      onClose()
      setConfirmText("")
    } catch {
      alert("Failed to delete employee. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmText(e.target.value)
    if (inputError) setInputError("")
  }

  const details = [
    { icon: FileText, label: "Employee ID", value: employee.id },
    { icon: User,     label: "Full Name",   value: employee.name },
    { icon: Building, label: "Designation", value: employee.designation },
    { icon: Mail,     label: "Email",       value: employee.email },
  ]

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="animate-in fade-in zoom-in-95 duration-200 bg-white rounded-2xl w-full max-w-[460px] shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-[34px] h-[34px] rounded-[9px] bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center shrink-0">
              <Trash2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Delete Employee</div>
              <div className="text-[11.5px] text-slate-400 mt-px">This action is permanent and irreversible</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-[7px] border-[1.5px] border-slate-200 bg-transparent hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors shrink-0"
          >
            <X className="w-[15px] h-[15px] text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="pt-7 px-6 pb-6">

          {/* Warning Icon */}
          <div className="w-[72px] h-[72px] rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center mx-auto mb-5 animate-pulse shrink-0">
            <AlertTriangle className="w-[30px] h-[30px] text-red-600" />
          </div>

          {/* Warning Text */}
          <div className="text-center mb-[22px]">
            <div className="text-base font-bold text-slate-900 mb-2 leading-snug">
              Permanently delete this employee?
            </div>
            <div className="text-[13px] text-slate-500 leading-relaxed">
              All records including salary history, documents, and payslips associated with this employee will be <strong className="text-red-600">permanently removed</strong> and cannot be recovered.
            </div>
          </div>

          {/* Employee Details Card */}
          <div className="bg-red-50 border-[1.5px] border-red-200 rounded-xl px-4 pt-5 pb-3 mb-[22px]">
            {details.map(({ icon: Icon, label, value }) => (
              <div className="flex items-center gap-2.5 py-[9px] border-b border-red-200 last:border-b-0 first:pt-0" key={label}>
                <div className="w-7 h-7 rounded-[7px] bg-red-200 flex items-center justify-center shrink-0">
                  <Icon className="w-[13px] h-[13px] text-red-600" />
                </div>
                <div className="flex justify-between flex-1 items-center flex-wrap gap-1">
                  <span className="text-[11.5px] text-slate-400 font-medium">{label}</span>
                  <span className="text-[13px] text-slate-800 font-semibold">{value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Confirm Input */}
          <div className="mb-[22px]">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Type &nbsp;<span className="font-mono text-xs font-medium bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded tracking-wide">{employee.id}</span>&nbsp; to confirm deletion
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={handleInputChange}
              placeholder="Enter employee ID"
              className={`w-full h-11 rounded-[10px] border-[1.5px] bg-white px-3.5 text-[13.5px] font-mono tracking-wide text-slate-900 outline-none transition-all ${inputError ? "border-red-500 bg-red-50" : isConfirmed ? "border-green-600 ring-[3px] ring-green-600/10" : "border-slate-200 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/10"}`}
            />
            {inputError && (
              <div className="text-[11.5px] text-red-500 font-medium mt-1.5">
                {inputError}
              </div>
            )}
            {isConfirmed && (
              <div className="text-[11.5px] text-green-600 font-medium mt-1.5">
                ✓ ID confirmed — you may proceed with deletion
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2.5">
            <button
              className="flex-1 inline-flex items-center justify-center gap-[7px] py-[11px] px-5 rounded-[10px] text-[13.5px] font-semibold border-[1.5px] border-slate-200 bg-transparent text-slate-500 cursor-pointer transition-all hover:bg-slate-50 hover:-translate-y-px hover:shadow-md active:translate-y-0 disabled:opacity-45 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="flex-1 inline-flex items-center justify-center gap-[7px] py-[11px] px-5 rounded-[10px] text-[13.5px] font-semibold border-none bg-gradient-to-br from-red-600 to-red-500 text-white cursor-pointer transition-all hover:-translate-y-px hover:shadow-md active:translate-y-0 disabled:opacity-45 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              onClick={handleDelete}
              disabled={isDeleting || !isConfirmed}
              type="button"
            >
              {isDeleting
                ? <><span className="w-3.5 h-3.5 border-2 border-white/35 border-t-white rounded-full animate-spin shrink-0" /> Deleting…</>
                : <><Trash2 className="w-[15px] h-[15px]" /> Delete Employee</>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}