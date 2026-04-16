import { Phone, Eye, Building2, MapPin, Mail } from "lucide-react";
import { Employee } from "@/types/employee.types";
import Link from "next/link";

interface EmployeeCardProps {
  employee: Employee;
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`
    .split(" ")
    .map((n) => n[0])
    .join("");
}

const infoFields = [
  { key: "employeeId", icon: Building2 },
  { key: "email", icon: Mail },
  { key: "contactNumber", icon: Phone },
  { key: "address", icon: MapPin },
] as const;

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const fullName = `${employee.firstName} ${employee.lastName}`;

  return (
    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-none transition-all duration-300 group">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-3">
          <span className="text-xl font-bold text-blue-600">
            {getInitials(employee.firstName, employee.lastName)}
          </span>
        </div>
        <h3 className="font-semibold text-slate-900 text-base text-center">{fullName}</h3>
        <p className="text-sm text-slate-500 text-center mb-3">
          {employee.employeeDesignation || "-"}
        </p>
        {employee.isActive !== false && (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Active
          </span>
        )}
      </div>

      {/* Employee Info */}
      <div className="space-y-3">
        {infoFields.map(({ key, icon: Icon }) => (
          <div key={key} className="flex items-center gap-2 text-sm">
            <Icon className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900 truncate">
              {employee[key] || "-"}
            </span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
        <a
          href={`tel:${employee.contactNumber}`}
          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-medium text-sm transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
        <Link href={`/employees/${employee._id}`} className="flex-1">
          <button className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium text-sm transition-all duration-200">
            <Eye className="h-4 w-4" />
            View
          </button>
        </Link>
      </div>
    </div>
  );
}
