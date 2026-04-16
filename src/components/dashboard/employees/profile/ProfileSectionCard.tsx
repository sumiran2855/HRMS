import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LucideIcon } from "lucide-react";

interface ProfileSectionCardProps {
  title: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  editHoverColor: string;
  onEdit: () => void;
  children: React.ReactNode;
  className?: string;
}

export function ProfileSectionCard({
  title,
  icon: Icon,
  iconBgColor,
  iconColor,
  editHoverColor,
  onEdit,
  children,
  className = "",
}: ProfileSectionCardProps) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow p-6 ${className}`}>
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${iconBgColor} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        </div>
        <Button variant="ghost" size="sm" className={`${editHoverColor} cursor-pointer`} onClick={onEdit}>
          <Edit2 className="w-4 h-4 text-purple-600 cursor-pointer" />
        </Button>
      </div>
      {children}
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
  valueClassName?: string;
}

export function InfoRow({ label, value, valueClassName = "text-slate-900" }: InfoRowProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-slate-600">{label}</span>
      <span className={`text-sm font-semibold ${valueClassName} truncate`}>{value}</span>
    </div>
  );
}
