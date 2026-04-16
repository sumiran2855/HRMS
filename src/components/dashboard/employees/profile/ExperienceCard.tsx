import { Briefcase } from "lucide-react";
import { Employee } from "@/types/employee.types";
import { ProfileSectionCard } from "./ProfileSectionCard";
import { formatDate } from "@/utils/formatters";

interface ExperienceCardProps {
  employee: Employee;
  onEdit: () => void;
}

export function ExperienceCard({ employee, onEdit }: ExperienceCardProps) {
  return (
    <ProfileSectionCard
      title="Experience Details"
      icon={Briefcase}
      iconBgColor="bg-blue-100"
      iconColor="text-blue-600"
      editHoverColor="hover:bg-blue-50"
      onEdit={onEdit}
    >
      <div className="space-y-4">
        {employee.experience && employee.experience.length > 0 ? (
          employee.experience.map((exp, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-slate-900">{exp.position || "-"}</p>
                  <p className="text-sm text-slate-600">{exp.company || "-"}</p>
                </div>
              </div>
              <div className="flex gap-4 text-xs text-slate-500">
                <span>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500">
            <p>No experience data available</p>
          </div>
        )}
      </div>
    </ProfileSectionCard>
  );
}
