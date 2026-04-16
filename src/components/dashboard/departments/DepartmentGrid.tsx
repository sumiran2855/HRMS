import { Edit2, Trash2, Users, Building2, Mail, Phone } from "lucide-react";
import { Department } from "@/types/department.types";
import { DEPARTMENT_STATUS_BADGE_MAP } from "@/constants/departments";

interface DepartmentGridProps {
  departments: Department[];
  searchTerm: string;
  onEdit: (department: Department) => void;
  onDelete: (id: string) => void;
}

function StatusBadge({ status }: { status: string }) {
  const config = DEPARTMENT_STATUS_BADGE_MAP[status] || DEPARTMENT_STATUS_BADGE_MAP.inactive;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold border ${config.bg} ${config.text} ${config.border} ${config.darkBg} ${config.darkText} ${config.darkBorder}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

function DepartmentCard({
  department,
  onEdit,
  onDelete,
}: {
  department: Department;
  onEdit: (d: Department) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900/50 dark:to-slate-900/30 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${
              department.status === "active"
                ? "from-emerald-500 to-emerald-600"
                : "from-slate-500 to-slate-600"
            } shadow-lg`}
          >
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-base">{department.name}</h3>
            <StatusBadge status={department.status} />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(department)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group/btn"
          >
            <Edit2 className="h-4 w-4 text-muted-foreground group-hover/btn:text-primary transition-colors" />
          </button>
          <button
            onClick={() => onDelete(department.id)}
            className="p-2 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors group/btn"
          >
            <Trash2 className="h-4 w-4 text-muted-foreground group-hover/btn:text-destructive transition-colors" />
          </button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{department.description}</p>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground font-medium">{department.employeeCount}</span>
          <span className="text-muted-foreground">Employees</span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Head:</span>
            <span className="text-foreground font-medium">{department.head}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{department.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{department.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DepartmentGrid({ departments, searchTerm, onEdit, onDelete }: DepartmentGridProps) {
  if (departments.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-sm">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Building2 className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No departments found</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">
          {searchTerm
            ? "Try adjusting your search terms"
            : "Get started by adding your first department"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {departments.map((department) => (
        <DepartmentCard
          key={department.id}
          department={department}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
