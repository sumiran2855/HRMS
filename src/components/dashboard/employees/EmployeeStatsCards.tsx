import { Users, Sparkles, Briefcase, TrendingUp } from "lucide-react";
import { EmployeeStats } from "@/types/employee.types";

interface EmployeeStatsCardsProps {
  stats: EmployeeStats;
}

const cardConfig = [
  {
    key: "total",
    label: "Total Employees",
    badge: "Total",
    icon: Users,
    gradient: "from-blue-500 to-blue-600",
    shadow: "shadow-blue-500/25",
    badgeColor: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30",
  },
  {
    key: "active",
    label: "Active Employees",
    badge: "Active",
    icon: Sparkles,
    gradient: "from-emerald-500 to-emerald-600",
    shadow: "shadow-emerald-500/25",
    badgeColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    key: "uniqueDesignations",
    label: "Unique Designations",
    badge: "Designations",
    icon: Briefcase,
    gradient: "from-violet-500 to-violet-600",
    shadow: "shadow-violet-500/25",
    badgeColor: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30",
  },
  {
    key: "currentMonth",
    label: "This Month",
    badge: "Joined",
    icon: TrendingUp,
    gradient: "from-amber-500 to-amber-600",
    shadow: "shadow-amber-500/25",
    badgeColor: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30",
  },
] as const;

export function EmployeeStatsCards({ stats }: EmployeeStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardConfig.map(({ key, label, badge, icon: Icon, gradient, shadow, badgeColor }) => (
        <div
          key={key}
          className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 bg-gradient-to-br ${gradient} rounded-xl shadow-lg ${shadow}`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <span className={`text-xs font-semibold ${badgeColor} px-2 py-1 rounded-lg`}>
              {badge}
            </span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{stats[key]}</div>
          <div className="text-sm text-slate-500">{label}</div>
        </div>
      ))}
    </div>
  );
}
