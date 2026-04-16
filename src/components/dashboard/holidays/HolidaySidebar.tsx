import { Calendar, Gift, Sparkles } from "lucide-react"
import type { Holiday, HolidayStats } from "@/types/holiday.types"
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

interface HolidaySidebarProps {
  upcomingHolidays: Holiday[]
  stats: HolidayStats
}

export function HolidaySidebar({ upcomingHolidays, stats }: HolidaySidebarProps) {
  return (
    <div className="space-y-6">
      {/* Upcoming Holidays */}
      <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg shadow-primary/20">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Upcoming Holidays</h3>
        </div>
        <div className="space-y-4">
          {upcomingHolidays.map((holiday) => {
            const typeConfig = HOLIDAY_TYPE_BADGE_MAP[holiday.type] ?? HOLIDAY_TYPE_BADGE_MAP["public"]
            return (
              <div
                key={holiday.id}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div
                  className={`p-2 rounded-lg bg-gradient-to-br ${typeConfig.gradient} shadow-md flex-shrink-0`}
                >
                  <Gift className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground text-sm">{holiday.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{formatDate(holiday.date)}</div>
                </div>
              </div>
            )
          })}
          {upcomingHolidays.length === 0 && (
            <div className="text-center py-4 text-sm text-muted-foreground">No upcoming holidays</div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 backdrop-blur-xl rounded-2xl p-6 border border-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg shadow-primary/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Quick Stats</h3>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-slate-900/50 rounded-xl">
            <span className="text-sm text-muted-foreground">Total Days Off</span>
            <span className="font-bold text-foreground">{stats.totalHolidays}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-slate-900/50 rounded-xl">
            <span className="text-sm text-muted-foreground">This Month</span>
            <span className="font-bold text-foreground">0</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-slate-900/50 rounded-xl">
            <span className="text-sm text-muted-foreground">Next Holiday</span>
            <span className="font-bold text-foreground">
              {upcomingHolidays[0] ? formatDate(upcomingHolidays[0].date) : "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
