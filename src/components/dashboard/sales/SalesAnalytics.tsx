import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { BarChart3 } from "lucide-react"

export default function SalesAnalytics() {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Sales Analytics</h3>
        <p className="text-slate-500 mb-4">
          Generate comprehensive sales reports and analytics.
        </p>
        <div className="flex gap-2 justify-center">
          <Button variant="outline" className="cursor-pointer">
            Revenue Report
          </Button>
          <Button variant="outline" className="cursor-pointer">
            Sales by Product
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white cursor-pointer">
            Customer Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
