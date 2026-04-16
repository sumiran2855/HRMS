import { DepartmentStats } from "@/types/department.types";
import { DEPARTMENT_STAT_CARDS } from "@/constants/departments";

interface DepartmentStatsCardsProps {
  stats: DepartmentStats;
}

export function DepartmentStatsCards({ stats }: DepartmentStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {DEPARTMENT_STAT_CARDS.map(
        ({ key, label, subtitle, icon: Icon, gradient, borderColor, textColor, iconBg }) => (
          <div
            key={key}
            className={`relative overflow-hidden bg-gradient-to-br ${gradient} rounded-2xl border ${borderColor} p-6 shadow-sm hover:shadow-md transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className={`text-sm font-medium ${textColor}`}>{label}</p>
                <p className="text-3xl font-bold text-slate-900">{stats[key]}</p>
                <p className={`text-xs ${textColor} mt-1`}>{subtitle}</p>
              </div>
              <div className={`w-12 h-12 ${iconBg} rounded-2xl flex items-center justify-center shadow-sm`}>
                <Icon className={`w-6 h-6 ${textColor}`} />
              </div>
            </div>
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${iconBg} rounded-full opacity-30`} />
          </div>
        )
      )}
    </div>
  );
}
