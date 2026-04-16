import { GraduationCap } from "lucide-react";
import { Employee } from "@/types/employee.types";
import { ProfileSectionCard } from "./ProfileSectionCard";
import { formatDate } from "@/utils/formatters";

interface EducationCardProps {
  employee: Employee;
  onEdit: () => void;
}

export function EducationCard({ employee, onEdit }: EducationCardProps) {
  return (
    <ProfileSectionCard
      title="Education Qualification"
      icon={GraduationCap}
      iconBgColor="bg-emerald-100"
      iconColor="text-emerald-600"
      editHoverColor="hover:bg-emerald-50"
      onEdit={onEdit}
    >
      <div className="space-y-4">
        {employee.education && employee.education.length > 0 ? (
          employee.education.map((edu, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-slate-900">{edu.degree || "-"}</p>
                  <p className="text-sm text-slate-600">{edu.institution || "-"}</p>
                </div>
              </div>
              <div className="flex gap-4 text-xs text-slate-500">
                <span>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500">
            <p>No education data available</p>
          </div>
        )}
      </div>
    </ProfileSectionCard>
  );
}
