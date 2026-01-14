import { Card, CardContent } from "@/components/ui/Card"
import { cn } from "@/components/utils"
import type { LucideIcon } from "lucide-react"

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
  return (
    <Card className="bg-card border-border hover:border-primary/30 transition-colors">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className={cn("p-3 rounded-xl", iconBgColor)}>
            <Icon className={cn("h-6 w-6", iconColor)} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground truncate">{title}</p>
              <span className={cn("text-xs font-medium shrink-0", isPositive ? "text-success" : "text-destructive")}>
                {isPositive ? "↑" : "↓"} {change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{changeLabel}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
