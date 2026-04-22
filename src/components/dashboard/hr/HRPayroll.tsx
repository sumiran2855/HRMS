import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { DollarSign } from "lucide-react"

export default function HRPayroll() {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <DollarSign className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Payroll Management</h3>
        <p className="text-slate-500 mb-4">
          Process payroll, manage compensation, and handle tax compliance.
        </p>
        <div className="flex gap-2 justify-center">
          <Button variant="outline" className="cursor-pointer">
            Process Payroll
          </Button>
          <Button variant="outline" className="cursor-pointer">
            Tax Reports
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
            Salary History
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
