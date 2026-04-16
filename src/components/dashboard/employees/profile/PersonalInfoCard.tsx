import { Phone, Mail, Calendar, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Employee } from "@/types/employee.types";
import { ProfileSectionCard } from "./ProfileSectionCard";
import { formatPhoneNumber, formatDate, getInitials } from "@/utils/formatters";
import { LucideIcon } from "lucide-react";

interface PersonalInfoCardProps {
  employee: Employee;
  onEdit: () => void;
}

interface ContactField {
  label: string;
  value: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  hoverBorder: string;
}

function getContactFields(employee: Employee): ContactField[] {
  return [
    {
      label: "Phone",
      value: formatPhoneNumber(employee.contactInfo?.phone || employee.contactNumber),
      icon: Phone,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      hoverBorder: "hover:border-blue-300",
    },
    {
      label: "Email",
      value: employee.contactInfo?.email || employee.email || "-",
      icon: Mail,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      hoverBorder: "hover:border-blue-300",
    },
    {
      label: "Hire Date",
      value: formatDate(employee.contactInfo?.hireDate || employee.hireDate || employee.joiningDate),
      icon: Calendar,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      hoverBorder: "hover:border-blue-300",
    },
    {
      label: "Address",
      value: employee.contactInfo?.address || employee.address || "-",
      icon: MapPin,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      hoverBorder: "hover:border-blue-300",
    },
    {
      label: "Username",
      value: employee.contactInfo?.userName || employee.userName || "-",
      icon: User,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      hoverBorder: "hover:border-blue-300",
    },
  ];
}

export function PersonalInfoCard({ employee, onEdit }: PersonalInfoCardProps) {
  const fullName = `${employee.firstName} ${employee.lastName}`;
  const contactFields = getContactFields(employee);

  return (
    <ProfileSectionCard
      title="Personal Information"
      icon={User}
      iconBgColor="bg-blue-100"
      iconColor="text-blue-600"
      editHoverColor="hover:bg-purple-50"
      onEdit={onEdit}
      className="xl:col-span-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Employee Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              {employee.employeePhoto ? (
                <img
                  src={employee.employeePhoto as string}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-semibold text-blue-600">
                  {getInitials(fullName)}
                </span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-slate-900">{fullName}</h3>
              <p className="text-slate-600 text-sm">
                {employee.position || employee.employeeDesignation || "-"}
              </p>
              <p className="text-slate-700 text-sm mt-2">
                <span className="font-semibold">Employee ID :</span>{" "}
                {employee.employeeId || employee._id}
              </p>
              <p className="text-slate-700 text-sm">
                <span className="font-semibold">Date of Join :</span>{" "}
                {formatDate(employee.joiningDate)}
              </p>
            </div>
          </div>

          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transition-all py-3 text-base font-semibold">
            Send Message
          </Button>
        </div>

        {/* Right Column: Contact Details */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-600" />
            Contact Information
          </h4>
          <div className="space-y-4">
            {contactFields.map(({ label, value, icon: Icon, iconBg, iconColor, hoverBorder }) => (
              <div
                key={label}
                className={`flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200 ${hoverBorder} transition-colors`}
              >
                <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-600">{label}</p>
                  <p className="text-sm font-semibold text-slate-900 truncate">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProfileSectionCard>
  );
}
