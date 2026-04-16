import { Users, X } from "lucide-react";

interface EmployeeListStateProps {
  type: "loading" | "error" | "empty";
  message?: string;
  hasActiveFilters?: boolean;
}

const stateConfig = {
  loading: {
    icon: Users,
    iconBg: "bg-slate-100 dark:bg-slate-800",
    iconColor: "text-slate-400",
    title: "Loading employees...",
    defaultMessage: "Please wait while we fetch the data",
  },
  error: {
    icon: X,
    iconBg: "bg-red-100 dark:bg-red-950/30",
    iconColor: "text-red-500",
    title: "Error loading employees",
    defaultMessage: "Something went wrong",
  },
  empty: {
    icon: Users,
    iconBg: "bg-slate-100 dark:bg-slate-800",
    iconColor: "text-slate-400",
    title: "No employees found",
    defaultMessage: "Get started by adding your first employee",
  },
};

export function EmployeeListState({ type, message, hasActiveFilters }: EmployeeListStateProps) {
  const config = stateConfig[type];
  const Icon = config.icon;

  const displayMessage =
    type === "empty" && hasActiveFilters
      ? "Try adjusting your search filters"
      : message || config.defaultMessage;

  return (
    <div className="text-center py-16 bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-xl">
      <div className={`w-16 h-16 ${config.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
        <Icon className={`h-8 w-8 ${config.iconColor}`} />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{config.title}</h3>
      <p className="text-slate-500 max-w-sm mx-auto">{displayMessage}</p>
    </div>
  );
}
