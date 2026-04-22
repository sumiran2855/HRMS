import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Building } from "lucide-react"
import { Department } from "@/types/hr.types"

interface HRDepartmentsProps {
  departments: Department[]
  formatCurrency: (amount: number) => string
}

export default function HRDepartments({ departments, formatCurrency }: HRDepartmentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Departments Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div
              key={dept.name}
              className="bg-slate-50 rounded-lg p-6 border border-slate-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">{dept.name}</h3>
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Building className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Employees:</span>
                  <span className="text-lg font-bold text-slate-900">{dept.employees}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Avg Salary:</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatCurrency(dept.avgSalary)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Head:</span>
                  <span className="text-sm text-slate-900">Department Manager</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
