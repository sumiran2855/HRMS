"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { X, Users, Phone, Mail, MapPin, Building2, DollarSign, Target } from "lucide-react"

interface Lead {
  id: number
  name: string
  email: string
  phone: string
  company: string
  position: string
  source: string
  status: string
  value: string
  location: string
  assignedTo: string
  notes: string
}

interface EditLeadModalProps {
  isOpen: boolean
  onClose: () => void
  lead: Lead | null
  onUpdate: (updatedLead: Lead) => void
}

export function EditLeadModal({ isOpen, onClose, lead, onUpdate }: EditLeadModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    source: "",
    value: "",
    status: "new",
    location: "",
    assignedTo: "",
    notes: ""
  })

  const sources = ["Website", "LinkedIn", "Referral", "Cold Email", "Conference", "Social Media", "Advertisement"]
  const statuses = ["new", "contacted", "qualified", "proposal", "negotiation"]
  const assignees = ["Alex Johnson", "Emma Davis", "Chris Wilson", "Sarah Brown", "Mike Wilson"]

  useEffect(() => {
    if (lead) {
      const nameParts = lead.name.split(' ')
      setFormData({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(' ') || "",
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        position: lead.position,
        source: lead.source,
        value: lead.value,
        status: lead.status,
        location: lead.location,
        assignedTo: lead.assignedTo,
        notes: lead.notes
      })
    }
  }, [lead])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!lead) return

    const updatedLead: Lead = {
      ...lead,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      position: formData.position,
      source: formData.source,
      value: formData.value,
      status: formData.status,
      location: formData.location,
      assignedTo: formData.assignedTo,
      notes: formData.notes
    }

    onUpdate(updatedLead)
    onClose()
  }

  if (!isOpen || !lead) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 rounded-t-2xl min-w-0 z-10">
          <div className="flex items-center justify-between min-w-0">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold text-slate-900 truncate">Edit Lead</h2>
                <p className="text-sm text-slate-500">Update lead information</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-100 transition-all duration-200 group flex-shrink-0 cursor-pointer"
            >
              <X className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8 min-w-0">
          {/* Personal Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Personal Information</h3>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-0">
                <div className="space-y-3">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="Enter first name"
                    required
                    className="bg-white"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Enter last name"
                    required
                    className="bg-white"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                    required
                    className="bg-white"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                    required
                    className="bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Company Information</h3>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-0">
                <div className="space-y-3">
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    placeholder="Enter company name"
                    required
                    className="bg-white"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="position">Position/Title *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                    placeholder="Enter position or title"
                    required
                    className="bg-white"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Enter location"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="source">Lead Source *</Label>
                  <select
                    id="source"
                    value={formData.source}
                    onChange={(e) => handleInputChange("source", e.target.value)}
                    className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 appearance-none"
                    required
                  >
                    <option value="">Select source</option>
                    {sources.map(source => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Lead Details</h3>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-0">
                <div className="space-y-3">
                  <Label htmlFor="value" className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Deal Value
                  </Label>
                  <Input
                    id="value"
                    type="number"
                    value={formData.value}
                    onChange={(e) => handleInputChange("value", e.target.value)}
                    placeholder="Enter estimated value"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="status">Status *</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                    className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 appearance-none"
                    required
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="assignedTo">Assigned To *</Label>
                  <select
                    id="assignedTo"
                    value={formData.assignedTo}
                    onChange={(e) => handleInputChange("assignedTo", e.target.value)}
                    className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 appearance-none"
                    required
                  >
                    <option value="">Select assignee</option>
                    {assignees.map(assignee => (
                      <option key={assignee} value={assignee}>{assignee}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Add any additional notes about this lead..."
                  rows={3}
                  className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white cursor-pointer shadow-lg"
            >
              Update Lead
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
