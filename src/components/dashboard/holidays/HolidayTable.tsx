import { Gift, Calendar, Clock, Sparkles, Edit2, Trash2 } from "lucide-react"
import type { Holiday } from "@/types/holiday.types"
import { HOLIDAY_TYPE_BADGE_MAP } from "@/constants/holidays"

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function TypeBadge({ type }: { type: string }) {
  const config = HOLIDAY_TYPE_BADGE_MAP[type] ?? HOLIDAY_TYPE_BADGE_MAP["public"]
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${config.bg} ${config.text} ${config.border} ${config.dark}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  )
}

function DurationCell({ duration }: { duration: string }) {
  const Icon = duration === "full-day" ? Calendar : Clock
  return (
    <div className="flex items-center gap-2 text-sm text-foreground">
      <span className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
        <Icon className="h-4 w-4" />
      </span>
      <span className="font-medium">{duration === "full-day" ? "Full Day" : "Half Day"}</span>
    </div>
  )
}

interface HolidayTableProps {
  holidays: Holiday[]
  searchTerm: string
  onEdit: (holiday: Holiday) => void
  onDelete: (id: string) => void
}

export function HolidayTable({ holidays, searchTerm, onEdit, onDelete }: HolidayTableProps) {
  return (
    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/50 dark:border-slate-800">
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Holiday Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {holidays.map((holiday) => {
              const typeConfig = HOLIDAY_TYPE_BADGE_MAP[holiday.type] ?? HOLIDAY_TYPE_BADGE_MAP["public"]
              return (
                <tr
                  key={holiday.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${typeConfig.gradient} shadow-lg`}
                      >
                        <Gift className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-foreground text-base">{holiday.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                          {holiday.description}
                        </div>
                        {holiday.recurring && (
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <Sparkles className="h-3 w-3 text-primary" />
                            <span className="text-xs font-medium text-primary">Recurring annually</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{formatDate(holiday.date)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <TypeBadge type={holiday.type} />
                  </td>
                  <td className="px-6 py-4">
                    <DurationCell duration={holiday.duration} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onEdit(holiday)}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </button>
                      <button
                        onClick={() => onDelete(holiday.id)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors group"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground group-hover:text-destructive transition-colors" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {holidays.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Gift className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No holidays found</h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            {searchTerm
              ? "Try adjusting your search terms or filters"
              : "Get started by adding your first holiday"}
          </p>
        </div>
      )}
    </div>
  )
}
