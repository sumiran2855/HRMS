import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Users } from "lucide-react"
import { Customer } from "@/types/sales.types"

interface SalesCustomersProps {
  customers: Customer[]
  formatCurrency: (amount: number) => string
}

export default function SalesCustomers({ customers, formatCurrency }: SalesCustomersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="bg-slate-50 rounded-lg p-6 border border-slate-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{customer.name}</h3>
                  <p className="text-sm text-slate-500">{customer.email}</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Total Orders:</span>
                  <span className="text-lg font-bold text-slate-900">
                    {customer.totalOrders}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Total Revenue:</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatCurrency(customer.totalRevenue)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Credit Limit:</span>
                  <span className="text-lg font-bold text-blue-600">
                    {formatCurrency(customer.creditLimit)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Outstanding:</span>
                  <span className="text-lg font-bold text-red-600">
                    {formatCurrency(customer.outstandingBalance)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
