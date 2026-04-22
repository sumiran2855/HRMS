import { X, AlertTriangle } from "lucide-react"
import { Employee } from "@/types/hr.types"

interface DeleteEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  employee: Employee | null
  onConfirm: () => void
}

export default function DeleteEmployeeModal({
  isOpen,
  onClose,
  employee,
  onConfirm,
}: DeleteEmployeeModalProps) {
  if (!isOpen || !employee) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md border border-slate-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4.5 h-4.5 text-red-500" />
            </div>
            <div>
              <h2 className="text-[15px] font-medium text-slate-900 leading-tight">Delete Employee</h2>
              <p className="text-[12px] text-slate-400 leading-tight mt-0.5">This action cannot be undone</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-purple-600">
                  {employee.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{employee.name}</p>
                <p className="text-xs text-slate-500">{employee.position} • {employee.department}</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-600">
            Are you sure you want to delete <span className="font-semibold text-slate-900">{employee.name}</span>? 
            All associated data including attendance records, payroll history, and documents will be permanently removed.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="h-8 px-4 rounded-lg text-[13px] text-slate-500 border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="h-8 px-4 rounded-lg text-[13px] font-medium bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
          >
            Delete Employee
          </button>
        </div>
      </div>
    </div>
  )
}
