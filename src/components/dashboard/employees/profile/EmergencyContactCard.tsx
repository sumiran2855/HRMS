import { Users, User } from "lucide-react";
import { Employee } from "@/types/employee.types";
import { ProfileSectionCard, InfoRow } from "./ProfileSectionCard";
import { formatPhoneNumber } from "@/utils/formatters";

interface EmergencyContactCardProps {
  employee: Employee;
  onEdit: () => void;
}

interface ContactConfig {
  type: "primary" | "secondary";
  label: string;
  gradient: string;
  border: string;
  iconBg: string;
}

const contactConfigs: ContactConfig[] = [
  {
    type: "primary",
    label: "Primary Contact",
    gradient: "bg-gradient-to-br from-red-50 to-pink-50",
    border: "border-red-100",
    iconBg: "bg-red-600",
  },
  {
    type: "secondary",
    label: "Secondary Contact",
    gradient: "bg-gradient-to-br from-orange-50 to-amber-50",
    border: "border-orange-100",
    iconBg: "bg-orange-600",
  },
];

export function EmergencyContactCard({ employee, onEdit }: EmergencyContactCardProps) {
  return (
    <ProfileSectionCard
      title="Emergency Contact"
      icon={Users}
      iconBgColor="bg-red-100"
      iconColor="text-red-600"
      editHoverColor="hover:bg-red-50"
      onEdit={onEdit}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {contactConfigs.map(({ type, label, gradient, border, iconBg }) => {
          const contact = employee.emergencyContact?.[type];
          return (
            <div key={type} className={`${gradient} rounded-xl p-5 ${border}`}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center`}>
                  <User className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900">{label}</h3>
              </div>
              <div className="space-y-3">
                <InfoRow label="Name" value={contact?.name || "-"} />
                <InfoRow label="Relationship" value={contact?.relationship || "-"} />
                <InfoRow
                  label="Phone"
                  value={formatPhoneNumber(contact?.phone)}
                  valueClassName="text-blue-600 hover:text-blue-800"
                />
                <InfoRow
                  label="Email"
                  value={contact?.email || "-"}
                  valueClassName="text-blue-600 hover:text-blue-800"
                />
                <InfoRow
                  label="Address"
                  value={contact?.address || "-"}
                  valueClassName="text-blue-600 hover:text-blue-800"
                />
              </div>
            </div>
          );
        })}
      </div>
    </ProfileSectionCard>
  );
}
