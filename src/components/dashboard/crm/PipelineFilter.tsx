"use client"

import { useState } from "react"
import { X, Filter, Search, Calendar, DollarSign, Building, User, TrendingUp } from "lucide-react"

interface PipelineFilterProps {
  isOpen: boolean
  onClose: () => void
  onFilter: (filters: FilterState) => void
  currentFilters: FilterState
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

const STAGES = ["All", "Discovery", "Qualification", "Proposal", "Negotiation", "Closed-Won", "Closed-Lost"]
const VALUE_RANGES = ["All", "Under $10k", "$10k-$25k", "$25k-$50k", "$50k-$100k", "Over $100k"]
const DATE_RANGES = ["All", "Last 7 days", "Last 30 days", "Last 3 months", "Last 6 months", "Last year"]
const PROBABILITY_RANGES = ["All", "Low (0-25%)", "Medium (26-50%)", "High (51-75%)", "Very High (76-100%)"]
const SORT_OPTIONS = ["Most Recent", "Highest Value", "Lowest Value", "Highest Probability", "Longest in Pipeline", "Shortest in Pipeline"]

export function PipelineFilter({ isOpen, onClose, onFilter, currentFilters }: PipelineFilterProps) {
  const [filters, setFilters] = useState<FilterState>(currentFilters)

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const applyFilters = () => {
    onFilter(filters)
    onClose()
  }

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      search: "",
      stage: "All",
      valueRange: "All",
      company: "",
      contactPerson: "",
      dateRange: "All",
      probabilityRange: "All",
      sortBy: "Most Recent"
    }
    setFilters(defaultFilters)
    onFilter(defaultFilters)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
              <Filter className="w-4 h-4 text-green-700" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Filter Pipeline</h2>
              <p className="text-xs text-slate-400">Customize your pipeline view</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Search */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Search className="w-3.5 h-3.5" />
              Search Deals
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              placeholder="Search by company, contact, or keywords..."
              className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all"
            />
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Stage */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <TrendingUp className="w-3.5 h-3.5" />
                Deal Stage
              </label>
              <select
                value={filters.stage}
                onChange={(e) => handleFilterChange("stage", e.target.value)}
                className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all"
              >
                {STAGES.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>

            {/* Value Range */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <DollarSign className="w-3.5 h-3.5" />
                Deal Value
              </label>
              <select
                value={filters.valueRange}
                onChange={(e) => handleFilterChange("valueRange", e.target.value)}
                className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all"
              >
                {VALUE_RANGES.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            {/* Company */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <Building className="w-3.5 h-3.5" />
                Company Name
              </label>
              <input
                type="text"
                value={filters.company}
                onChange={(e) => handleFilterChange("company", e.target.value)}
                placeholder="Filter by company..."
                className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all"
              />
            </div>

            {/* Contact Person */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <User className="w-3.5 h-3.5" />
                Contact Person
              </label>
              <input
                type="text"
                value={filters.contactPerson}
                onChange={(e) => handleFilterChange("contactPerson", e.target.value)}
                placeholder="Filter by contact..."
                className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all"
              />
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange("dateRange", e.target.value)}
                className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all"
              >
                {DATE_RANGES.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            {/* Probability Range */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <TrendingUp className="w-3.5 h-3.5" />
                Probability
              </label>
              <select
                value={filters.probabilityRange}
                onChange={(e) => handleFilterChange("probabilityRange", e.target.value)}
                className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all"
              >
                {PROBABILITY_RANGES.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="space-y-2 sm:col-span-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <Filter className="w-3.5 h-3.5" />
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm px-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all"
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Summary */}
          {(filters.search || filters.stage !== "All" || filters.valueRange !== "All" || filters.company || filters.contactPerson || filters.dateRange !== "All" || filters.probabilityRange !== "All") && (
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-slate-700 mb-2">Active Filters:</h4>
              <div className="flex flex-wrap gap-2">
                {filters.search && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Search: {filters.search}
                  </span>
                )}
                {filters.stage !== "All" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Stage: {filters.stage}
                  </span>
                )}
                {filters.valueRange !== "All" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Value: {filters.valueRange}
                  </span>
                )}
                {filters.company && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Company: {filters.company}
                  </span>
                )}
                {filters.contactPerson && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Contact: {filters.contactPerson}
                  </span>
                )}
                {filters.dateRange !== "All" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Date: {filters.dateRange}
                  </span>
                )}
                {filters.probabilityRange !== "All" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Probability: {filters.probabilityRange}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-slate-50">
          <button
            onClick={resetFilters}
            className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
          >
            Reset all filters
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="h-8 px-4 rounded-lg border border-slate-200 text-xs text-slate-500 hover:bg-white hover:text-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={applyFilters}
              className="h-8 px-4 rounded-lg bg-green-700 hover:bg-green-800 text-xs font-medium text-white transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
