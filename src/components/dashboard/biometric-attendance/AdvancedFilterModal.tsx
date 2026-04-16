"use client"

import { useState } from "react"
import { X, Filter, Calendar, Building2, Activity, Wifi, Fingerprint, Clock, Check } from "lucide-react"

interface AdvancedFilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: AdvancedFilters) => void
  onReset: () => void
}

interface AdvancedFilters {
  dateFrom: string
  dateTo: string
  departments: string[]
  statuses: string[]
  geofenceStatuses: string[]
  devices: string[]
  minWorkHours: number
  maxWorkHours: number
}

export default function AdvancedFilterModal({ isOpen, onClose, onApply, onReset }: AdvancedFilterModalProps) {
  const [filters, setFilters] = useState<AdvancedFilters>({
    dateFrom: "",
    dateTo: "",
    departments: [],
    statuses: [],
    geofenceStatuses: [],
    devices: [],
    minWorkHours: 0,
    maxWorkHours: 24,
  })

  const departments = ["Engineering", "Product", "Design", "Human Resources", "Marketing", "Sales", "Finance", "Support"]
  const statuses = ["present", "absent", "late", "leave"]
  const geofenceStatuses = ["inside", "outside", "exempt"]
  const devices = ["Fingerprint Scanner-01", "Fingerprint Scanner-02", "Face Recognition-01", "Face Recognition-02"]

  const toggleArray = (field: keyof AdvancedFilters, value: string) => {
    const current = filters[field] as string[]
    setFilters({
      ...filters,
      [field]: current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    })
  }

  const handleApply = () => {
    onApply(filters)
    onClose()
  }

  const handleReset = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      departments: [],
      statuses: [],
      geofenceStatuses: [],
      devices: [],
      minWorkHours: 0,
      maxWorkHours: 24,
    })
    onReset()
    onClose()
  }

  const hasActiveFilters =
    filters.dateFrom ||
    filters.dateTo ||
    filters.departments.length > 0 ||
    filters.statuses.length > 0 ||
    filters.geofenceStatuses.length > 0 ||
    filters.devices.length > 0 ||
    filters.minWorkHours > 0 ||
    filters.maxWorkHours < 24

  const activeFilterCount = [
    filters.departments.length,
    filters.statuses.length,
    filters.devices.length,
  ].reduce((a, b) => a + b, 0)

  const statusColorMap: Record<string, string> = {
    present: "border-green-200 text-green-600",
    absent: "border-red-200 text-red-600",
    late: "border-amber-200 text-amber-600",
    leave: "border-blue-200 text-blue-600",
  }

  const geofenceColorMap: Record<string, string> = {
    inside: "border-green-200 text-green-600",
    outside: "border-red-200 text-red-600",
    exempt: "border-slate-200 text-slate-500",
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-slate-900/55 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="animate-[fadeUp_0.22s_ease] bg-white rounded-[14px] w-full max-w-[620px] max-h-[90vh] overflow-y-auto flex flex-col shadow-[0_24px_60px_rgba(0,0,0,0.18),0_4px_16px_rgba(0,0,0,0.08)]">

        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-5 py-4 rounded-t-[14px] flex items-center justify-between">
          <div className="flex items-center gap-[11px]">
            <div className="w-[34px] h-[34px] rounded-[9px] bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center shadow-[0_4px_12px_rgba(15,23,42,0.25)]">
              <Filter className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-slate-900 leading-tight">Advanced Filters</div>
              <div className="text-[11.5px] text-slate-400 mt-[1px]">
                {hasActiveFilters ? `${activeFilterCount} filters active` : "No active filters"}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-[8px] border-[1.5px] border-slate-200 bg-transparent flex items-center justify-center hover:bg-slate-100 transition-colors flex-shrink-0"
          >
            <X className="w-[14px] h-[14px] text-slate-500" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-5 flex flex-col gap-4">

          {/* Date Range */}
          <div className="bg-slate-50 rounded-[10px] p-4 border border-slate-200">
            <div className="flex items-center gap-[6px] text-[11px] font-bold uppercase tracking-[0.07em] text-slate-500 mb-2">
              <Calendar className="w-3 h-3" />
              Date Range
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-slate-500 font-medium mb-[5px]">From</div>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                  className="w-full h-[42px] rounded-[9px] border-[1.5px] border-slate-200 bg-white px-[13px] text-[13.5px] text-slate-900 outline-none focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/[0.08] transition-all"
                />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium mb-[5px]">To</div>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                  className="w-full h-[42px] rounded-[9px] border-[1.5px] border-slate-200 bg-white px-[13px] text-[13.5px] text-slate-900 outline-none focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/[0.08] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Departments */}
          <div className="bg-slate-50 rounded-[10px] p-4 border border-slate-200">
            <div className="flex items-center gap-[6px] text-[11px] font-bold uppercase tracking-[0.07em] text-slate-500 mb-2">
              <Building2 className="w-3 h-3" />
              Departments
            </div>
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => {
                const isActive = filters.departments.includes(dept)
                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => toggleArray("departments", dept)}
                    className={`inline-flex items-center gap-[6px] px-[13px] py-2 rounded-[9px] border-[1.5px] text-[12.5px] font-semibold cursor-pointer transition-all hover:bg-slate-100
                      ${isActive
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-slate-50 text-slate-500 border-slate-200"
                      }`}
                  >
                    {isActive && <Check className="w-3 h-3" />}
                    {dept}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Attendance Status */}
          <div className="bg-slate-50 rounded-[10px] p-4 border border-slate-200">
            <div className="flex items-center gap-[6px] text-[11px] font-bold uppercase tracking-[0.07em] text-slate-500 mb-2">
              <Activity className="w-3 h-3" />
              Attendance Status
            </div>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => {
                const isActive = filters.statuses.includes(status)
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => toggleArray("statuses", status)}
                    className={`inline-flex items-center gap-[6px] px-[13px] py-2 rounded-[9px] border-[1.5px] text-[12.5px] font-semibold cursor-pointer transition-all
                      ${isActive
                        ? "bg-slate-900 text-white border-slate-900"
                        : `bg-slate-50 ${statusColorMap[status]}`
                      }`}
                  >
                    {isActive && <Check className="w-3 h-3" />}
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Geofence Status */}
          <div className="bg-slate-50 rounded-[10px] p-4 border border-slate-200">
            <div className="flex items-center gap-[6px] text-[11px] font-bold uppercase tracking-[0.07em] text-slate-500 mb-2">
              <Wifi className="w-3 h-3" />
              Geofence Status
            </div>
            <div className="flex flex-wrap gap-2">
              {geofenceStatuses.map((status) => {
                const isActive = filters.geofenceStatuses.includes(status)
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => toggleArray("geofenceStatuses", status)}
                    className={`inline-flex items-center gap-[6px] px-[13px] py-2 rounded-[9px] border-[1.5px] text-[12.5px] font-semibold cursor-pointer transition-all
                      ${isActive
                        ? "bg-slate-900 text-white border-slate-900"
                        : `bg-slate-50 ${geofenceColorMap[status]}`
                      }`}
                  >
                    {isActive && <Check className="w-3 h-3" />}
                    {(status === "inside" || status === "outside") && (
                      <Wifi className="w-3 h-3" />
                    )}
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Biometric Devices */}
          <div className="bg-slate-50 rounded-[10px] p-4 border border-slate-200">
            <div className="flex items-center gap-[6px] text-[11px] font-bold uppercase tracking-[0.07em] text-slate-500 mb-2">
              <Fingerprint className="w-3 h-3" />
              Biometric Devices
            </div>
            <div className="flex flex-wrap gap-2">
              {devices.map((device) => {
                const isActive = filters.devices.includes(device)
                return (
                  <button
                    key={device}
                    type="button"
                    onClick={() => toggleArray("devices", device)}
                    className={`inline-flex items-center gap-[6px] px-[13px] py-2 rounded-[9px] border-[1.5px] text-[12.5px] font-semibold cursor-pointer transition-all hover:bg-slate-100
                      ${isActive
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-slate-50 text-slate-500 border-slate-200"
                      }`}
                  >
                    {isActive && <Check className="w-3 h-3" />}
                    {device}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Work Hours Range */}
          <div className="bg-slate-50 rounded-[10px] p-4 border border-slate-200">
            <div className="flex items-center gap-[6px] text-[11px] font-bold uppercase tracking-[0.07em] text-slate-500 mb-2">
              <Clock className="w-3 h-3" />
              Work Hours Range
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="text-xs text-slate-500 font-medium mb-[5px]">Min Hours</div>
                <input
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={filters.minWorkHours}
                  onChange={(e) => setFilters({ ...filters, minWorkHours: Number(e.target.value) })}
                  className="w-full h-[42px] rounded-[9px] border-[1.5px] border-slate-200 bg-white px-[13px] text-[13.5px] text-slate-900 outline-none focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/[0.08] transition-all"
                />
              </div>
              <span className="text-sm text-slate-400 mt-[18px]">to</span>
              <div className="flex-1">
                <div className="text-xs text-slate-500 font-medium mb-[5px]">Max Hours</div>
                <input
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={filters.maxWorkHours}
                  onChange={(e) => setFilters({ ...filters, maxWorkHours: Number(e.target.value) })}
                  className="w-full h-[42px] rounded-[9px] border-[1.5px] border-slate-200 bg-white px-[13px] text-[13.5px] text-slate-900 outline-none focus:border-slate-700 focus:ring-[3px] focus:ring-slate-700/[0.08] transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 z-10 bg-white border-t border-slate-200 px-5 py-4 rounded-b-[14px] flex gap-[10px]">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center gap-[7px] px-5 py-[11px] rounded-[9px] text-[13.5px] font-semibold border-[1.5px] border-slate-200 bg-transparent text-slate-600 cursor-pointer transition-all hover:bg-slate-50 hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)]"
          >
            Cancel
          </button>
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-[7px] px-5 py-[11px] rounded-[9px] text-[13.5px] font-semibold border-[1.5px] border-red-200 bg-transparent text-red-600 cursor-pointer transition-all hover:bg-red-50 hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)]"
            >
              Reset All
            </button>
          )}
          <button
            onClick={handleApply}
            className="inline-flex flex-1 items-center justify-center gap-[7px] px-5 py-[11px] rounded-[9px] text-[13.5px] font-semibold bg-slate-900 text-white border-none cursor-pointer transition-all hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)]"
          >
            <Filter className="w-[14px] h-[14px]" />
            Apply Filters
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}