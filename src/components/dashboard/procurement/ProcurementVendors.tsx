"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Building } from "lucide-react"
import { Vendor } from "@/types/procurement.types"

interface ProcurementVendorsProps {
  vendors: Vendor[]
  formatCurrency: (amount: number) => string
}

export default function ProcurementVendors({ vendors, formatCurrency }: ProcurementVendorsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Vendors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{vendor.name}</h3>
                  <p className="text-sm text-slate-500">{vendor.email}</p>
                </div>
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Building className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Category", value: vendor.category },
                  { label: "Total Orders", value: String(vendor.totalOrders) },
                  { label: "Total Spent", value: formatCurrency(vendor.totalSpent), className: "text-green-600 font-medium" },
                  { label: "Avg Order", value: formatCurrency(vendor.avgOrderValue) },
                  { label: "Rating", value: `${vendor.rating} / 5.0` },
                  { label: "Payment Terms", value: vendor.paymentTerms },
                ].map(({ label, value, className }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-sm text-slate-600">{label}:</span>
                    <span className={`text-sm text-slate-900 ${className ?? ""}`}>{value}</span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${vendor.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                    {vendor.status}
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
