"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { 
  Handshake, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Building, 
  DollarSign, 
  Calendar,
  Filter,
  Plus,
  Search
} from "lucide-react"

interface PipelineViewProps {
  deals: Deal[]
  onFilterClick: () => void
  onAddDeal: () => void
  filters: FilterState
}

interface Deal {
  id: number
  company: string
  value: number
  stage: string
  probability: number
  contact: string
  daysInPipeline: number
}

interface FilterState {
  search: string
  stage: string
  valueRange: string
  company: string
  contactPerson: string
  dateRange: string
  probabilityRange: string
  sortBy: string
}

const STAGE_COLORS = {
  "Discovery": "bg-blue-100 text-blue-700 border-blue-200",
  "Qualification": "bg-purple-100 text-purple-700 border-purple-200", 
  "Proposal": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Negotiation": "bg-orange-100 text-orange-700 border-orange-200",
  "Closed-won": "bg-green-100 text-green-700 border-green-200",
  "Closed-lost": "bg-red-100 text-red-700 border-red-200"
}

export function PipelineView({ deals, onFilterClick, onAddDeal, filters }: PipelineViewProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter deals based on current filters
  const filteredDeals = deals.filter(deal => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      if (!deal.company.toLowerCase().includes(searchLower) && 
          !deal.contact.toLowerCase().includes(searchLower)) {
        return false
      }
    }

    // Stage filter
    if (filters.stage !== "All" && deal.stage !== filters.stage) {
      return false
    }

    // Company filter
    if (filters.company && !deal.company.toLowerCase().includes(filters.company.toLowerCase())) {
      return false
    }

    // Contact filter
    if (filters.contactPerson && !deal.contact.toLowerCase().includes(filters.contactPerson.toLowerCase())) {
      return false
    }

    // Value range filter
    if (filters.valueRange !== "All") {
      switch (filters.valueRange) {
        case "Under $10k":
          if (deal.value >= 10000) return false
          break
        case "$10k-$25k":
          if (deal.value < 10000 || deal.value > 25000) return false
          break
        case "$25k-$50k":
          if (deal.value < 25000 || deal.value > 50000) return false
          break
        case "$50k-$100k":
          if (deal.value < 50000 || deal.value > 100000) return false
          break
        case "Over $100k":
          if (deal.value <= 100000) return false
          break
      }
    }

    // Probability range filter
    if (filters.probabilityRange !== "All") {
      switch (filters.probabilityRange) {
        case "Low (0-25%)":
          if (deal.probability > 25) return false
          break
        case "Medium (26-50%)":
          if (deal.probability < 26 || deal.probability > 50) return false
          break
        case "High (51-75%)":
          if (deal.probability < 51 || deal.probability > 75) return false
          break
        case "Very High (76-100%)":
          if (deal.probability < 76) return false
          break
      }
    }

    return true
  })

  // Sort deals
  const sortedDeals = [...filteredDeals].sort((a, b) => {
    switch (filters.sortBy) {
      case "Most Recent":
        return b.id - a.id
      case "Highest Value":
        return b.value - a.value
      case "Lowest Value":
        return a.value - b.value
      case "Highest Probability":
        return b.probability - a.probability
      case "Longest in Pipeline":
        return b.daysInPipeline - a.daysInPipeline
      case "Shortest in Pipeline":
        return a.daysInPipeline - b.daysInPipeline
      default:
        return b.id - a.id
    }
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getTrendIcon = (current: number, target: number) => {
    if (current >= target) {
      return <TrendingUp className="w-4 h-4 text-green-600" />
    } else {
      return <TrendingDown className="w-4 h-4 text-red-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <Handshake className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Sales Pipeline</h2>
            <p className="text-sm text-slate-500">{filteredDeals.length} deals found</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Quick search..."
              className="h-10 w-64 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-900 pl-10 pr-4 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
          <Button
            variant="outline"
            onClick={onFilterClick}
            className="cursor-pointer flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            {(filters.search || filters.stage !== "All" || filters.valueRange !== "All" || filters.company || filters.contactPerson || filters.dateRange !== "All" || filters.probabilityRange !== "All") && (
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            )}
          </Button>
          <Button
            onClick={onAddDeal}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white cursor-pointer shadow-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Deal
          </Button>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Total Pipeline</p>
                <p className="text-lg font-bold text-slate-900">
                  {formatCurrency(filteredDeals.reduce((sum, deal) => sum + deal.value, 0))}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Avg Deal Size</p>
                <p className="text-lg font-bold text-slate-900">
                  {formatCurrency(filteredDeals.length > 0 ? filteredDeals.reduce((sum, deal) => sum + deal.value, 0) / filteredDeals.length : 0)}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Win Rate</p>
                <p className="text-lg font-bold text-slate-900">
                  {filteredDeals.length > 0 ? Math.round((filteredDeals.filter(d => d.stage === "Closed-won").length / filteredDeals.length) * 100) : 0}%
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Handshake className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Avg Pipeline Days</p>
                <p className="text-lg font-bold text-slate-900">
                  {filteredDeals.length > 0 ? Math.round(filteredDeals.reduce((sum, deal) => sum + deal.daysInPipeline, 0) / filteredDeals.length) : 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deals List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sortedDeals.map((deal) => (
          <Card key={deal.id} className="border border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{deal.company}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users className="w-4 h-4" />
                    {deal.contact}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${STAGE_COLORS[deal.stage as keyof typeof STAGE_COLORS] || STAGE_COLORS["Discovery"]}`}>
                    {deal.stage}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Deal Value</p>
                  <p className="text-lg font-bold text-green-600">{formatCurrency(deal.value)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Probability</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${deal.probability}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-900">{deal.probability}%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{deal.daysInPipeline} days in pipeline</span>
                </div>
                <div className="flex items-center gap-2">
                  {getTrendIcon(deal.probability, 70)}
                  <span className="text-xs text-slate-500">
                    {deal.probability >= 70 ? "High priority" : "Normal priority"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedDeals.length === 0 && (
        <Card className="border border-slate-200">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No deals found</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Try adjusting your filters or search terms to find the deals you're looking for.
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="cursor-pointer"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
