"use client"

import { useState } from "react"
import { FileWarning, UserRound } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Modal } from "@/components/ui/Modal"
import {
  TERMINATION_DEPARTMENT_OPTIONS,
  TERMINATION_TYPE_OPTIONS,
} from "@/constants/termination"
import { TerminationRequest, TerminationType } from "@/types/termination.types"

interface TerminationModalProps {
  isOpen: boolean
  onClose: () => void
  request?: TerminationRequest | null
  onSubmit: (payload: {
    employeeId: string
    employeeName: string
    department: string
    designation: string
    managerName: string
    terminationType: TerminationType
    reason: string
    effectiveDate: string
    initiatedDate: string
    finalSettlementStatus: "pending" | "processed"
  }) => void
}

type TerminationFormState = {
  employeeId: string
  employeeName: string
  department: string
  designation: string
  managerName: string
  terminationType: TerminationType
  reason: string
  effectiveDate: string
  initiatedDate: string
  finalSettlementStatus: "pending" | "processed"
}

function getDefaultState(request?: TerminationRequest | null): TerminationFormState {
  return {
    employeeId: request?.employeeId ?? "",
    employeeName: request?.employeeName ?? "",
    department: request?.department ?? "Engineering",
    designation: request?.designation ?? "",
    managerName: request?.managerName ?? "",
    terminationType: (request?.terminationType ?? "Performance") as TerminationType,
    reason: request?.reason ?? "",
    effectiveDate: request?.effectiveDate ?? "",
    initiatedDate: request?.initiatedDate ?? "",
    finalSettlementStatus: request?.finalSettlementStatus ?? "pending",
  }
}

export function TerminationModal({ isOpen, onClose, request, onSubmit }: TerminationModalProps) {
  const [formData, setFormData] = useState<TerminationFormState>(() => getDefaultState(request))
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isEditMode = Boolean(request)

  const updateField = <K extends keyof TerminationFormState>(key: K, value: TerminationFormState[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }))
    }
  }

  const validate = () => {
    const nextErrors: Record<string, string> = {}

    if (!formData.employeeId.trim()) nextErrors.employeeId = "Employee ID is required"
    if (!formData.employeeName.trim()) nextErrors.employeeName = "Employee name is required"
    if (!formData.designation.trim()) nextErrors.designation = "Designation is required"
    if (!formData.managerName.trim()) nextErrors.managerName = "Manager name is required"
    if (!formData.reason.trim()) nextErrors.reason = "Reason is required"
    if (!formData.initiatedDate) nextErrors.initiatedDate = "Initiated date is required"
    if (!formData.effectiveDate) nextErrors.effectiveDate = "Effective date is required"

    return nextErrors
  }

  const handleSubmit = () => {
    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    onSubmit(formData)
  }

  const selectClass =
    "w-full h-12 rounded-xl border-2 border-slate-200 bg-white px-4 text-sm text-slate-800 shadow-sm outline-none transition-all hover:border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-4 focus-visible:ring-indigo-500/10"

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Termination Request" : "Add Termination Request"}
      description={
        isEditMode
          ? "Update employee termination details and approval context."
          : "Create a new termination request with complete employee and timeline details."
      }
      size="xl"
    >
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
          <div className="flex items-center gap-2 mb-4">
            <UserRound className="w-4 h-4 text-indigo-600" />
            <h4 className="text-sm font-semibold text-slate-900">Employee Details</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Employee ID</label>
              <Input value={formData.employeeId} onChange={(e) => updateField("employeeId", e.target.value)} placeholder="EMP-0000" />
              {errors.employeeId && <p className="mt-1 text-xs text-red-600">{errors.employeeId}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Employee Name</label>
              <Input value={formData.employeeName} onChange={(e) => updateField("employeeName", e.target.value)} placeholder="Employee full name" />
              {errors.employeeName && <p className="mt-1 text-xs text-red-600">{errors.employeeName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Department</label>
              <select value={formData.department} onChange={(e) => updateField("department", e.target.value)} className={selectClass}>
                {TERMINATION_DEPARTMENT_OPTIONS.map((department) => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Designation</label>
              <Input value={formData.designation} onChange={(e) => updateField("designation", e.target.value)} placeholder="Current designation" />
              {errors.designation && <p className="mt-1 text-xs text-red-600">{errors.designation}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Manager Name</label>
              <Input value={formData.managerName} onChange={(e) => updateField("managerName", e.target.value)} placeholder="Reporting manager" />
              {errors.managerName && <p className="mt-1 text-xs text-red-600">{errors.managerName}</p>}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 mb-4">
            <FileWarning className="w-4 h-4 text-indigo-600" />
            <h4 className="text-sm font-semibold text-slate-900">Termination Context</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Termination Type</label>
              <select value={formData.terminationType} onChange={(e) => updateField("terminationType", e.target.value as TerminationType)} className={selectClass}>
                {TERMINATION_TYPE_OPTIONS.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Final Settlement</label>
              <select value={formData.finalSettlementStatus} onChange={(e) => updateField("finalSettlementStatus", e.target.value as "pending" | "processed")} className={selectClass}>
                <option value="pending">Pending</option>
                <option value="processed">Processed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Initiated Date</label>
              <Input type="date" value={formData.initiatedDate} onChange={(e) => updateField("initiatedDate", e.target.value)} />
              {errors.initiatedDate && <p className="mt-1 text-xs text-red-600">{errors.initiatedDate}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Effective Date</label>
              <Input type="date" value={formData.effectiveDate} onChange={(e) => updateField("effectiveDate", e.target.value)} />
              {errors.effectiveDate && <p className="mt-1 text-xs text-red-600">{errors.effectiveDate}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Reason</label>
              <textarea
                value={formData.reason}
                onChange={(e) => updateField("reason", e.target.value)}
                rows={4}
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all hover:border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-4 focus-visible:ring-indigo-500/10"
                placeholder="Provide clear reason and relevant context"
              />
              {errors.reason && <p className="mt-1 text-xs text-red-600">{errors.reason}</p>}
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="cursor-pointer">Cancel</Button>
          <Button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
            {isEditMode ? "Update Request" : "Create Request"}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
