import { Card, CardContent } from "@/components/ui/Card"
import { cn } from "@/components/utils"
import type { LucideIcon } from "lucide-react"
import { TrendingUp, TrendingDown, Sparkles } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  changeLabel: string
  icon: LucideIcon
  iconBgColor: string
  iconColor: string
  isPositive?: boolean
}

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconBgColor,
  iconColor,
  isPositive = true,
}: StatCardProps) {
  const changeValue = parseFloat(change.replace('%', '').replace('+', ''))
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

  return (
    <Card className="group relative bg-gradient-to-br from-card via-card to-card/50 border border-border/60 hover:border-primary/50 hover:shadow-xl transition-all duration-300 overflow-hidden backdrop-blur-sm cursor-pointer">
      <div className={cn(
        "absolute top-0 right-0 w-40 h-32 opacity-5 transition-opacity duration-300 group-hover:opacity-10",
        isPositive ? "bg-success" : "bg-destructive"
      )}
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 0 0)"
        }} />

      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        "bg-gradient-to-br",
        isPositive
          ? "from-success/5 via-transparent to-transparent"
          : "from-destructive/5 via-transparent to-transparent"
      )} />

      <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-300"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      <CardContent className="relative p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              {title}
            </span>
            <div className="h-0.5 w-8 bg-gradient-to-r from-primary/60 to-transparent rounded-full group-hover:w-12 transition-all duration-300" />
          </div>

          <div className={cn(
            "relative p-2.5 rounded-xl transition-all duration-300 shadow-sm",
            iconBgColor,
            "group-hover:scale-110 group-hover:shadow-lg group-hover:rotate-3"
          )}>
            <div className={cn(
              "absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300",
              iconBgColor
            )} />
            <Icon className={cn("h-6 w-6 relative z-10", iconColor)} strokeWidth={2.5} />
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-4xl font-bold text-foreground tracking-tight leading-none mb-2 group-hover:scale-105 transition-transform duration-200 origin-left">
            {value}
          </h3>
          <div className="h-1 w-16 bg-gradient-to-r from-primary/40 via-primary/20 to-transparent rounded-full group-hover:w-24 transition-all duration-300" />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/40 group-hover:border-border/60 transition-colors duration-300">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-sm shadow-primary/50" />
              {changeLabel}
            </span>
          </div>

          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all duration-200 shadow-sm",
            isPositive
              ? "bg-success/15 text-success group-hover:bg-success/25 group-hover:shadow-success/20"
              : "bg-destructive/15 text-destructive group-hover:bg-destructive/25 group-hover:shadow-destructive/20"
          )}>
            <TrendIcon className="h-3.5 w-3.5" strokeWidth={3} />
            <span>{Math.abs(changeValue)}%</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </CardContent>
    </Card>
  )
}
