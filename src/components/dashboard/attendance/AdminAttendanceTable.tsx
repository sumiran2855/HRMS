"use client"

import { Star, Calendar, CheckCircle, AlertCircle, Clock, XCircle, Plane } from "lucide-react"

interface AdminAttendanceTableProps {
  data: Array<{
    id: number
    name: string
    avatar: string
    employeeId: string
    department: string
    attendance: string[]
  }>
  daysInMonth: number
}

export function AdminAttendanceTable({ data, daysInMonth }: AdminAttendanceTableProps) {
  const getAttendanceIcon = (status: string) => {
    switch (status) {
      case 'holiday':
        return { icon: Star, color: 'text-purple-600', bgColor: 'bg-purple-50' }
      case 'off':
        return { icon: Calendar, color: 'text-slate-600', bgColor: 'bg-slate-50' }
      case 'present':
        return { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' }
      case 'halfday':
        return { icon: AlertCircle, color: 'text-yellow-600', bgColor: 'bg-yellow-50' }
      case 'late':
        return { icon: Clock, color: 'text-orange-600', bgColor: 'bg-orange-50' }
      case 'absent':
        return { icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-50' }
      case 'leave':
        return { icon: Plane, color: 'text-blue-600', bgColor: 'bg-blue-50' }
      default:
        return { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' }
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="text-left py-3 px-4 font-semibold text-slate-700 sticky left-0 bg-slate-50 z-10">
              Employee
            </th>
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
              <th key={day} className="text-center py-3 px-2 font-semibold text-slate-700 min-w-[35px]">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr key={employee.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td className="py-3 px-4 sticky left-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    <span className="text-xs font-semibold text-blue-600">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{employee.name}</p>
                    <p className="text-xs text-slate-500">{employee.employeeId}</p>
                  </div>
                </div>
              </td>
              {employee.attendance.map((status, index) => {
                const config = getAttendanceIcon(status)
                const Icon = config.icon
                
                return (
                  <td key={index} className="text-center py-2 px-2">
                    <div className={`w-6 h-6 rounded-full ${config.bgColor} flex items-center justify-center mx-auto`}>
                      <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      
      {data.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No attendance records found</h3>
          <p className="text-slate-500">No attendance data available for the selected criteria.</p>
        </div>
      )}
    </div>
  )
}
