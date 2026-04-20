import Link from "next/link"
import { ArrowRight, Grid3X3, CircleCheck } from "lucide-react"
import { MODULE_COLOR_MAP, MODULE_BADGE_MAP } from "@/constants/erp"
import type { ErpModule } from "@/types/erp.types"

const MODULE_GLOW_MAP: Record<string, string> = {
  blue: "hover:shadow-blue-100",
  green: "hover:shadow-emerald-100",
  purple: "hover:shadow-purple-100",
  orange: "hover:shadow-orange-100",
  indigo: "hover:shadow-indigo-100",
  red: "hover:shadow-red-100",
  teal: "hover:shadow-teal-100",
}

const MODULE_BORDER_MAP: Record<string, string> = {
  blue: "hover:border-blue-200",
  green: "hover:border-emerald-200",
  purple: "hover:border-purple-200",
  orange: "hover:border-orange-200",
  indigo: "hover:border-indigo-200",
  red: "hover:border-red-200",
  teal: "hover:border-teal-200",
}

interface ErpModulesProps {
  modules: ErpModule[]
}

export function ErpModules({ modules }: ErpModulesProps) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center shadow-md shadow-slate-200">
            <Grid3X3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">ERP Modules</h2>
            <p className="text-sm text-slate-500">{modules.length} active modules configured</p>
          </div>
        </div>
      </div>

      {/* Module Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {modules.map((module) => {
          const gradientCls = MODULE_COLOR_MAP[module.color] || "from-gray-500 to-gray-600"
          const badgeCls = MODULE_BADGE_MAP[module.color] || "bg-gray-100 text-gray-700"
          const glowCls = MODULE_GLOW_MAP[module.color] || "hover:shadow-slate-100"
          const borderCls = MODULE_BORDER_MAP[module.color] || "hover:border-slate-300"

          return (
            <Link
              key={module.id}
              href={`/${module.id}`}
              className={`group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm shadow-slate-200/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${glowCls} ${borderCls}`}
            >
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${gradientCls} rounded-xl flex items-center justify-center shadow-lg shadow-black/10 group-hover:scale-105 transition-transform duration-300`}>
                    <module.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ring-black/5 ${badgeCls}`}>
                    <CircleCheck className="w-3 h-3" />
                    Active
                  </span>
                </div>

                <h3 className="text-base font-semibold text-slate-900 mb-1.5 group-hover:text-slate-700 transition-colors">
                  {module.label}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">
                  {module.description}
                </p>

                <div className="flex items-center text-sm font-medium text-slate-400 group-hover:text-slate-700 transition-colors">
                  <span>Manage Module</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
