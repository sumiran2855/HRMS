import {
  MY_ATTENDANCE_PRIMARY_STATS,
  MY_ATTENDANCE_SECONDARY_STATS,
} from "@/constants/attendance";
import { formatOvertime } from "@/utils/formatters";
import type { MyAttendanceComputedStats } from "@/types/attendance.types";

interface MyAttendanceStatsCardsProps {
  computed: MyAttendanceComputedStats;
}

export function MyAttendanceStatsCards({ computed }: MyAttendanceStatsCardsProps) {
  const { stats, totalDays, attendancePercentage, avgWorkingHours } = computed;

  const getStatValue = (config: (typeof MY_ATTENDANCE_PRIMARY_STATS)[number]) => {
    if (config.key === "overtimeHours") {
      return formatOvertime(stats.overtimeHours);
    }
    return String(stats[config.key as keyof typeof stats]);
  };

  const getSecondaryValue = (key: string) => {
    switch (key) {
      case "avgWorkingHours":
        return avgWorkingHours;
      case "totalHalfDay":
        return stats.totalHalfDay;
      case "totalLeave":
        return stats.totalLeave;
      default:
        return 0;
    }
  };

  return (
    <>
      {/* Primary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MY_ATTENDANCE_PRIMARY_STATS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.key}
              className={`relative overflow-hidden bg-gradient-to-br ${card.gradient} rounded-2xl border ${card.borderColor} p-6 shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className={`text-sm font-medium ${card.textColor}`}>{card.label}</p>
                  <p className="text-3xl font-bold text-slate-900">{getStatValue(card)}</p>
                  <p className={`text-xs ${card.textColor} mt-1`}>{card.subtitle}</p>
                </div>
                <div className={`w-12 h-12 ${card.iconBg} rounded-2xl flex items-center justify-center shadow-sm`}>
                  <Icon className={`w-6 h-6 ${card.textColor}`} />
                </div>
              </div>
              {/* Decorative element */}
              <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${card.iconBg} rounded-full opacity-30`} />
            </div>
          );
        })}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {MY_ATTENDANCE_SECONDARY_STATS.map((card) => {
          const Icon = card.icon;
          const value = getSecondaryValue(card.key);
          return (
            <div
              key={card.key}
              className={`relative overflow-hidden bg-gradient-to-br ${card.gradient} rounded-2xl border ${card.borderColor} p-6 shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className={`text-sm font-medium ${card.textColor}`}>{card.label}</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {value}
                    {card.suffix || ""}
                  </p>
                  <p className={`text-xs ${card.textColor} mt-1`}>{card.subtitle}</p>
                </div>
                <div className={`w-12 h-12 ${card.iconBg} rounded-2xl flex items-center justify-center shadow-sm`}>
                  <Icon className={`w-6 h-6 ${card.textColor}`} />
                </div>
              </div>
              <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${card.iconBg} rounded-full opacity-30`} />
            </div>
          );
        })}
      </div>
    </>
  );
}
