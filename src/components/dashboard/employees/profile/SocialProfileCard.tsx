import { Globe, Linkedin, Twitter, Facebook, Instagram, Phone } from "lucide-react";
import { Employee } from "@/types/employee.types";
import { ProfileSectionCard } from "./ProfileSectionCard";
import { formatPhoneNumber } from "@/utils/formatters";
import { LucideIcon } from "lucide-react";

interface SocialProfileCardProps {
  employee: Employee;
  onEdit: () => void;
}

interface SocialLink {
  label: string;
  value: string;
  icon: LucideIcon;
  bg: string;
  hoverBg: string;
  iconBg: string;
  iconHoverBg: string;
}

function getSocialLinks(employee: Employee): SocialLink[] {
  return [
    {
      label: "LinkedIn",
      value: employee.socialProfile?.linkedin || "-",
      icon: Linkedin,
      bg: "bg-blue-50",
      hoverBg: "hover:bg-blue-100",
      iconBg: "bg-blue-600",
      iconHoverBg: "group-hover:bg-blue-700",
    },
    {
      label: "Twitter",
      value: employee.socialProfile?.twitter || "-",
      icon: Twitter,
      bg: "bg-sky-50",
      hoverBg: "hover:bg-sky-100",
      iconBg: "bg-sky-500",
      iconHoverBg: "group-hover:bg-sky-600",
    },
    {
      label: "Facebook",
      value: employee.socialProfile?.facebook || "-",
      icon: Facebook,
      bg: "bg-blue-50",
      hoverBg: "hover:bg-blue-100",
      iconBg: "bg-blue-700",
      iconHoverBg: "group-hover:bg-blue-800",
    },
    {
      label: "Instagram",
      value: employee.socialProfile?.instagram || "-",
      icon: Instagram,
      bg: "bg-pink-50",
      hoverBg: "hover:bg-pink-100",
      iconBg: "bg-pink-600",
      iconHoverBg: "group-hover:bg-pink-700",
    },
    {
      label: "WhatsApp",
      value: formatPhoneNumber(employee.socialProfile?.whatsapp || employee.contactNumber),
      icon: Phone,
      bg: "bg-green-50",
      hoverBg: "hover:bg-green-100",
      iconBg: "bg-green-600",
      iconHoverBg: "group-hover:bg-green-700",
    },
  ];
}

export function SocialProfileCard({ employee, onEdit }: SocialProfileCardProps) {
  const socialLinks = getSocialLinks(employee);

  return (
    <ProfileSectionCard
      title="Social Profile"
      icon={Globe}
      iconBgColor="bg-purple-100"
      iconColor="text-purple-600"
      editHoverColor="hover:bg-purple-50"
      onEdit={onEdit}
      className="h-full"
    >
      <div className="space-y-2">
        {socialLinks.map(({ label, value, icon: Icon, bg, hoverBg, iconBg, iconHoverBg }) => (
          <div
            key={label}
            className={`flex items-center gap-3 p-3 rounded-lg ${bg} ${hoverBg} transition-colors group`}
          >
            <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center ${iconHoverBg} transition-colors`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">{label}</p>
              <p className="text-xs text-slate-600 truncate">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </ProfileSectionCard>
  );
}
