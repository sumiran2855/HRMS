import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Search } from "lucide-react"
import { ORDER_STATUSES, PAYMENT_STATUSES } from "@/constants/sales"

interface SalesFiltersProps {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  selectedStatus: string
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>
  selectedPaymentStatus: string
  setSelectedPaymentStatus: React.Dispatch<React.SetStateAction<string>>
}

export default function SalesFilters({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  selectedPaymentStatus,
  setSelectedPaymentStatus,
}: SalesFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            {/* <Label htmlFor="search" className="text-sm font-medium text-slate-700">Search</Label> */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                id="search"
                type="text"
                placeholder="Search by order number or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              {/* <Label htmlFor="status" className="text-sm font-medium text-slate-700">Status</Label> */}
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 appearance-none"
              >
                {ORDER_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {/* <Label htmlFor="payment" className="text-sm font-medium text-slate-700">Payment</Label> */}
              <select
                id="payment"
                value={selectedPaymentStatus}
                onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all outline-none hover:border-slate-300 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 appearance-none"
              >
                {PAYMENT_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
