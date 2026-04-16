import { Edit2, Trash2, Users, Briefcase } from "lucide-react";
import { Designation } from "@/types/designation.types";
import { DESIGNATION_STATUS_BADGE_MAP } from "@/constants/designations";

interface DesignationGridProps {
  designations: Designation[];
  searchTerm: string;
  selectedDepartment: string;
  selectedLevel: string;
  onEdit: (designation: Designation) => void;
  onDelete: (id: number) => void;
}

function StatusBadge({ status }: { status: string }) {
  const config = DESIGNATION_STATUS_BADGE_MAP[status] || DESIGNATION_STATUS_BADGE_MAP.inactive;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border} ${config.darkBg} ${config.darkText} ${config.darkBorder}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

function SkillTags({ skills }: { skills: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {skills.slice(0, 3).map((skill, index) => (
        <span
          key={index}
          className="inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
        >
          {skill}
        </span>
      ))}
      {skills.length > 3 && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
          +{skills.length - 3} more
        </span>
      )}
    </div>
  );
}

function DesignationCard({
  designation,
  onEdit,
  onDelete,
}: {
  designation: Designation;
  onEdit: (d: Designation) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900/50 dark:to-slate-900/30 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${
              designation.status === "active"
                ? "from-emerald-500 to-emerald-600"
                : "from-slate-500 to-slate-600"
            } shadow-lg`}
          >
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-base">{designation.title}</h3>
            <div className="flex gap-2 mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">
                {designation.department}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400">
                {designation.level}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(designation)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group/btn"
          >
            <Edit2 className="h-4 w-4 text-muted-foreground group-hover/btn:text-primary transition-colors" />
          </button>
          <button
            onClick={() => onDelete(designation.id)}
            className="p-2 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors group/btn"
          >
            <Trash2 className="h-4 w-4 text-muted-foreground group-hover/btn:text-destructive transition-colors" />
          </button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{designation.description}</p>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground font-medium">{designation.employeeCount}</span>
          <span className="text-muted-foreground">Employees</span>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1.5">Key skills</p>
          <SkillTags skills={designation.skills} />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Salary range</p>
            <p className="text-sm font-medium text-foreground">
              ${designation.minSalary.toLocaleString()} – ${designation.maxSalary.toLocaleString()}
            </p>
          </div>
          <StatusBadge status={designation.status} />
        </div>
      </div>
    </div>
  );
}

export function DesignationGrid({
  designations,
  searchTerm,
  selectedDepartment,
  selectedLevel,
  onEdit,
  onDelete,
}: DesignationGridProps) {
  if (designations.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-sm">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Briefcase className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No designations found</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">
          {searchTerm || selectedDepartment !== "All Departments" || selectedLevel !== "All Levels"
            ? "Try adjusting your search or filters"
            : "Get started by adding your first designation"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {designations.map((designation) => (
        <DesignationCard
          key={designation.id}
          designation={designation}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
