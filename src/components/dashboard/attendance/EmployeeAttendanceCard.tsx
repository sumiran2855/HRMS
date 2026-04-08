"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { CheckCircle, XCircle, Clock, AlertCircle, Mail, Phone, Building, Calendar, Eye } from "lucide-react"

interface EmployeeAttendanceCardProps {
  employee: {
    id: number
    name: string
    employeeId: string
    department: string
    position: string
    email: string
    phone: string
    avatar: string
    joinDate: string
    currentMonthStats: {
      present: number
      absent: number
      late: number
      halfDay: number
      totalWorkingDays: number
      attendancePercentage: number
    }
    recentAttendance: Array<{
      date: string
      checkIn: string
      checkOut: string
      status: string
      overtime: string
    }>
  }
  onViewDetails: () => void
}

export function EmployeeAttendanceCard({ employee, onViewDetails }: EmployeeAttendanceCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' }
      case 'absent':
        return { icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-50' }
      case 'late':
        return { icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-50' }
      case 'halfday':
        return { icon: AlertCircle, color: 'text-orange-600', bgColor: 'bg-orange-50' }
      default:
        return { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' }
    }
  }

  const attendanceColor = employee.currentMonthStats.attendancePercentage >= 90 ? 'text-green-600' :
                          employee.currentMonthStats.attendancePercentage >= 75 ? 'text-yellow-600' : 'text-red-600'

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-slate-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <span className="text-sm font-semibold text-blue-600">
                {employee.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">{employee.name}</h3>
              <p className="text-sm text-slate-500">{employee.employeeId}</p>
              <p className="text-xs text-slate-400">{employee.position}</p>
            </div>
          </div>
          <div className="text-right">
            <span className={`text-2xl font-bold ${attendanceColor}`}>
              {employee.currentMonthStats.attendancePercentage}%
            </span>
            <p className="text-xs text-slate-500">Attendance</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Employee Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <Building className="w-4 h-4 text-slate-400" />
            <span>{employee.department}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Mail className="w-4 h-4 text-slate-400" />
            <span className="truncate">{employee.email}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Phone className="w-4 h-4 text-slate-400" />
            <span>{employee.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Joined {employee.joinDate}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-5 gap-2 text-center">
          <div>
            <p className="text-xs text-slate-500">P</p>
            <p className="font-semibold text-green-600">{employee.currentMonthStats.present}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">A</p>
            <p className="font-semibold text-red-600">{employee.currentMonthStats.absent}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">L</p>
            <p className="font-semibold text-yellow-600">{employee.currentMonthStats.late}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">HD</p>
            <p className="font-semibold text-orange-600">{employee.currentMonthStats.halfDay}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Total</p>
            <p className="font-semibold text-slate-600">{employee.currentMonthStats.totalWorkingDays}</p>
          </div>
        </div>

        {/* Recent Attendance */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500">Recent Activity</p>
          <div className="space-y-1">
            {employee.recentAttendance.slice(0, 3).map((record, index) => {
              const config = getStatusIcon(record.status)
              const StatusIcon = config.icon
              
              return (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full ${config.bgColor} flex items-center justify-center`}>
                      <StatusIcon className={`w-3 h-3 ${config.color}`} />
                    </div>
                    <span className="text-slate-600">{record.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-900">{record.checkIn}</span>
                    {record.overtime !== "0h" && (
                      <span className="text-blue-600 ml-1">+{record.overtime}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={onViewDetails}
          variant="outline"
          className="w-full cursor-pointer"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Full Details
        </Button>
      </CardContent>
    </Card>
  )
}
