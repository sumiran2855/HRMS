"use client"

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { X, Users, Phone, Mail, MapPin, Building2, DollarSign, Target, Calendar } from "lucide-react"

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
  createdDate: string
  lastContact: string
}

interface ViewLeadModalProps {
  isOpen: boolean
  onClose: () => void
  lead: Lead | null
}

export function ViewLeadModal({ isOpen, onClose, lead }: ViewLeadModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700'
      case 'contacted': return 'bg-yellow-100 text-yellow-700'
      case 'qualified': return 'bg-green-100 text-green-700'
      case 'proposal': return 'bg-purple-100 text-purple-700'
      case 'negotiation': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  if (!isOpen || !lead) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 rounded-t-2xl min-w-0 z-10">
          <div className="flex items-center justify-between min-w-0">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold text-slate-900 truncate">Lead Details</h2>
                <p className="text-sm text-slate-500">View complete lead information</p>
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

        {/* Content */}
        <div className="p-8 space-y-8 min-w-0">
          {/* Personal Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Personal Information</h3>
            </div>
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600 w-24">Name:</span>
                    <span className="text-sm text-slate-900 font-medium">{lead.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-900">{lead.email}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-900">{lead.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-900">{lead.location || 'Not specified'}</span>
                  </div>
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
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600 w-24">Company:</span>
                    <span className="text-sm text-slate-900 font-medium">{lead.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600 w-24">Position:</span>
                    <span className="text-sm text-slate-900 font-medium">{lead.position}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600 w-24">Source:</span>
                    <span className="text-sm text-slate-900 font-medium">{lead.source}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-900">Created: {lead.createdDate}</span>
                  </div>
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
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-900 font-medium">${lead.value || '0'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {getStatusLabel(lead.status)}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600">Assigned To:</span>
                    <span className="text-sm text-slate-900 font-medium">{lead.assignedTo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-900">Last Contact: {lead.lastContact}</span>
                  </div>
                </div>
              </div>
              {lead.notes && (
                <div className="mt-6">
                  <div className="text-sm font-medium text-slate-600 mb-2">Notes:</div>
                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <p className="text-sm text-slate-900">{lead.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-6 border-t border-slate-200">
            <Button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
