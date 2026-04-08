"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { CheckCircle, XCircle, Clock, AlertCircle, TrendingUp, Users } from "lucide-react"

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

interface AttendanceOverviewProps {
  data: AttendanceRecord[]
}

export function AttendanceOverview({ data }: AttendanceOverviewProps) {
  const presentCount = data.filter(r => r.status === 'present').length
  const absentCount = data.filter(r => r.status === 'absent').length
  const lateCount = data.filter(r => r.status === 'late').length
  
  const recentActivity = data.slice(0, 5).map(record => ({
    ...record,
    statusIcon: record.status === 'present' ? CheckCircle : 
                record.status === 'absent' ? XCircle : 
                record.status === 'late' ? Clock : AlertCircle,
    statusColor: record.status === 'present' ? 'text-green-600' : 
                 record.status === 'absent' ? 'text-red-600' : 
                 record.status === 'late' ? 'text-yellow-600' : 'text-blue-600',
    statusBg: record.status === 'present' ? 'bg-green-50' : 
              record.status === 'absent' ? 'bg-red-50' : 
              record.status === 'late' ? 'bg-yellow-50' : 'bg-blue-50'
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Quick Stats */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-400" />
              Today's Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-900">{presentCount}</p>
                    <p className="text-sm text-green-700">Present</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-900">{absentCount}</p>
                    <p className="text-sm text-red-700">Absent</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-900">{lateCount}</p>
                    <p className="text-sm text-yellow-700">Late</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => {
                const StatusIcon = activity.statusIcon
                return (
                  <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${activity.statusBg} flex items-center justify-center`}>
                        <StatusIcon className={`w-4 h-4 ${activity.statusColor}`} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{activity.employeeName}</p>
                        <p className="text-sm text-slate-500">{activity.employeeId} • {activity.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-slate-900 capitalize">{activity.status}</p>
                      <p className="text-sm text-slate-500">
                        {activity.checkIn !== "-" ? activity.checkIn : "No check-in"}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Breakdown */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-slate-400" />
              Department Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Engineering', 'HR', 'Design', 'Marketing'].map((dept) => {
                const deptData = data.filter(d => d.department === dept)
                const present = deptData.filter(d => d.status === 'present').length
                const total = deptData.length
                const percentage = total > 0 ? Math.round((present / total) * 100) : 0
                
                return (
                  <div key={dept} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700">{dept}</span>
                      <span className="text-slate-500">{present}/{total} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200">
              <p className="font-medium text-blue-900">Mark All Present</p>
              <p className="text-sm text-blue-700">Mark all employees as present for today</p>
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors border border-green-200">
              <p className="font-medium text-green-900">Generate Report</p>
              <p className="text-sm text-green-700">Create daily attendance report</p>
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors border border-purple-200">
              <p className="font-medium text-purple-900">Send Notifications</p>
              <p className="text-sm text-purple-700">Notify absent employees</p>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
