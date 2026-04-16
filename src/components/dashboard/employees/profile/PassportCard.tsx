import { FileText } from "lucide-react";
import { Employee } from "@/types/employee.types";
import { ProfileSectionCard, InfoRow } from "./ProfileSectionCard";
import { formatDate } from "@/utils/formatters";

interface PassportCardProps {
  employee: Employee;
  onEdit: () => void;
}

export function PassportCard({ employee, onEdit }: PassportCardProps) {
  const passport = employee.passport;

  return (
    <ProfileSectionCard
      title="Passport Information"
      icon={FileText}
      iconBgColor="bg-indigo-100"
      iconColor="text-indigo-600"
      editHoverColor="hover:bg-indigo-50"
      onEdit={onEdit}
    >
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
        <div className="space-y-4">
          <InfoRow
            label="Passport Number"
            value={passport?.passportNumber || "-"}
            valueClassName="text-slate-900 font-mono"
          />
          <InfoRow label="Nationality" value={passport?.nationality || "-"} />
          <InfoRow label="Issue Date" value={formatDate(passport?.issueDate)} />
          <InfoRow label="Expiry Date" value={formatDate(passport?.expiryDate)} />
          <InfoRow label="Scan Copy" value={passport?.scanCopy || "-"} valueClassName="text-slate-500" />
        </div>
      </div>
    </ProfileSectionCard>
  );
}
