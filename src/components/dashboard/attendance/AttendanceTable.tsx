"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { CheckCircle, XCircle, Clock, AlertCircle, Eye, Edit2 } from "lucide-react"

interface AttendanceRecord {
  id: number
  employeeId: string
  employeeName: string
  date: string
  checkIn: string
  checkOut: string
  status: string
  department: string
  overtime: string
}

interface AttendanceTableProps {
  data: AttendanceRecord[]
}

export function AttendanceTable({ data }: AttendanceTableProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'present':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          label: 'Present'
        }
      case 'absent':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          label: 'Absent'
        }
      case 'late':
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          label: 'Late'
        }
      default:
        return {
          icon: AlertCircle,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          label: 'Half Day'
        }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Daily Attendance Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Employee</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Department</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Check In</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Check Out</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Overtime</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((record) => {
                const statusConfig = getStatusConfig(record.status)
                const StatusIcon = statusConfig.icon
                
                return (
                  <tr key={record.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-slate-900">{record.employeeName}</p>
                        <p className="text-sm text-slate-500">{record.employeeId}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        {record.department}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-900">{record.checkIn}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-900">{record.checkOut}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${
                        record.overtime !== "0h" ? "text-blue-600" : "text-slate-500"
                      }`}>
                        {record.overtime}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-blue-50 cursor-pointer"
                        >
                          <Eye className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-green-50 cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4 text-green-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        
        {data.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No attendance records found</h3>
            <p className="text-slate-500">No attendance data available for the selected date and filters.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
