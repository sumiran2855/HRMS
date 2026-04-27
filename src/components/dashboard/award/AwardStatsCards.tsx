import { Award, CheckCircle2, CircleDollarSign, Clock3, Megaphone } from "lucide-react"
import { AwardStats } from "@/types/award.types"

interface AwardStatsCardsProps {
  stats: AwardStats
}

export function AwardStatsCards({ stats }: AwardStatsCardsProps) {
  const cards = [
    {
      label: "Total Awards",
      value: stats.total,
      icon: Award,
      iconClass: "text-fuchsia-700",
      shellClass: "border-fuchsia-200 bg-gradient-to-br from-white via-fuchsia-50 to-rose-50",
      valueClass: "text-slate-900",
    },
    {
      label: "Pending Review",
      value: stats.pending,
      icon: Clock3,
      iconClass: "text-amber-700",
      shellClass: "border-amber-200 bg-gradient-to-br from-white via-amber-50 to-orange-50",
      valueClass: "text-amber-700",
    },
    {
      label: "Approved",
      value: stats.approved,
      icon: CheckCircle2,
      iconClass: "text-emerald-700",
      shellClass: "border-emerald-200 bg-gradient-to-br from-white via-emerald-50 to-teal-50",
      valueClass: "text-emerald-700",
    },
    {
      label: "Published",
      value: stats.published,
      icon: Megaphone,
      iconClass: "text-violet-700",
      shellClass: "border-violet-200 bg-gradient-to-br from-white via-violet-50 to-fuchsia-50",
      valueClass: "text-violet-700",
    },
    {
      label: "Budget Used",
      value: `₹${stats.budgetUsed.toLocaleString()}`,
      icon: CircleDollarSign,
      iconClass: "text-cyan-700",
      shellClass: "border-cyan-200 bg-gradient-to-br from-white via-cyan-50 to-sky-50",
      valueClass: "text-cyan-700",
    },
  ] as const

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <div key={card.label} className={`group rounded-3xl border p-4 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.5)] transition-transform hover:-translate-y-0.5 ${card.shellClass}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{card.label}</p>
                <p className={`mt-3 text-2xl font-bold ${card.valueClass}`}>{card.value}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 shadow-sm">
                <Icon className={`h-5 w-5 ${card.iconClass}`} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
