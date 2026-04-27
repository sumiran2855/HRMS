"use client"

import { useState } from "react"
import { ClipboardList, UserRound } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Modal } from "@/components/ui/Modal"
import {
  TICKET_CATEGORY_OPTIONS,
  TICKET_DEPARTMENT_OPTIONS,
  TICKET_PRIORITY_OPTIONS,
} from "@/constants/ticket"
import { TicketItem, TicketPriority } from "@/types/ticket.types"

interface TicketModalProps {
  isOpen: boolean
  onClose: () => void
  ticket?: TicketItem | null
  onSubmit: (payload: {
    title: string
    description: string
    category: string
    requesterName: string
    requesterId: string
    department: string
    assignedTo: string
    dueDate: string
    priority: TicketPriority
  }) => void
}

type TicketFormState = {
  title: string
  description: string
  category: string
  requesterName: string
  requesterId: string
  department: string
  assignedTo: string
  dueDate: string
  priority: TicketPriority
}

function getDefaultState(ticket?: TicketItem | null): TicketFormState {
  return {
    title: ticket?.title ?? "",
    description: ticket?.description ?? "",
    category: ticket?.category ?? "Hardware",
    requesterName: ticket?.requesterName ?? "",
    requesterId: ticket?.requesterId ?? "",
    department: ticket?.department ?? "Engineering",
    assignedTo: ticket?.assignedTo ?? "",
    dueDate: ticket?.dueDate ?? "",
    priority: (ticket?.priority ?? "medium") as TicketPriority,
  }
}

export function TicketModal({ isOpen, onClose, ticket, onSubmit }: TicketModalProps) {
  const [formData, setFormData] = useState<TicketFormState>(() => getDefaultState(ticket))
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isEditMode = Boolean(ticket)

  const updateField = <K extends keyof TicketFormState>(key: K, value: TicketFormState[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }))
    }
  }

  const validate = () => {
    const nextErrors: Record<string, string> = {}

    if (!formData.title.trim()) nextErrors.title = "Ticket title is required"
    if (!formData.requesterName.trim()) nextErrors.requesterName = "Requester name is required"
    if (!formData.requesterId.trim()) nextErrors.requesterId = "Requester ID is required"
    if (!formData.assignedTo.trim()) nextErrors.assignedTo = "Assignee is required"
    if (!formData.dueDate) nextErrors.dueDate = "Due date is required"
    if (!formData.description.trim()) nextErrors.description = "Description is required"

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
      title={isEditMode ? "Edit Ticket" : "Add Ticket"}
      description={
        isEditMode
          ? "Update assignment, priority, and timeline details."
          : "Create a new support ticket with requester and assignment details."
      }
      size="xl"
    >
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="w-4 h-4 text-indigo-600" />
            <h4 className="text-sm font-semibold text-slate-900">Ticket Details</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Title</label>
              <Input value={formData.title} onChange={(e) => updateField("title", e.target.value)} placeholder="Short issue summary" />
              {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Category</label>
              <select value={formData.category} onChange={(e) => updateField("category", e.target.value)} className={selectClass}>
                {TICKET_CATEGORY_OPTIONS.filter((item) => item !== "All Categories").map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Priority</label>
              <select value={formData.priority} onChange={(e) => updateField("priority", e.target.value as TicketPriority)} className={selectClass}>
                {TICKET_PRIORITY_OPTIONS.filter((item) => item.value !== "all").map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={4}
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all hover:border-slate-300 focus-visible:border-indigo-500 focus-visible:ring-4 focus-visible:ring-indigo-500/10"
                placeholder="Describe the issue, observed impact, and context"
              />
              {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 mb-4">
            <UserRound className="w-4 h-4 text-indigo-600" />
            <h4 className="text-sm font-semibold text-slate-900">Ownership & Timeline</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Requester Name</label>
              <Input value={formData.requesterName} onChange={(e) => updateField("requesterName", e.target.value)} placeholder="Employee full name" />
              {errors.requesterName && <p className="mt-1 text-xs text-red-600">{errors.requesterName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Requester ID</label>
              <Input value={formData.requesterId} onChange={(e) => updateField("requesterId", e.target.value)} placeholder="EMP-0000" />
              {errors.requesterId && <p className="mt-1 text-xs text-red-600">{errors.requesterId}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Department</label>
              <select value={formData.department} onChange={(e) => updateField("department", e.target.value)} className={selectClass}>
                {TICKET_DEPARTMENT_OPTIONS.map((department) => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Assigned To</label>
              <Input value={formData.assignedTo} onChange={(e) => updateField("assignedTo", e.target.value)} placeholder="Support owner" />
              {errors.assignedTo && <p className="mt-1 text-xs text-red-600">{errors.assignedTo}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Due Date</label>
              <Input type="date" value={formData.dueDate} onChange={(e) => updateField("dueDate", e.target.value)} />
              {errors.dueDate && <p className="mt-1 text-xs text-red-600">{errors.dueDate}</p>}
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="cursor-pointer">Cancel</Button>
          <Button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
            {isEditMode ? "Update Ticket" : "Create Ticket"}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
