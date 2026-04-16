import { Clock, Eye, Edit, Trash2, Fingerprint, Wifi, Shield } from "lucide-react";
import { BiometricAttendance } from "@/types/attendance.types";
import { BIOMETRIC_STATUS_BADGE_MAP, GEOFENCE_STATUS_MAP } from "@/constants/attendance";

interface BiometricTableProps {
  data: BiometricAttendance[];
  searchTerm: string;
  selectedStatus: string;
  onAction: (action: string, employeeId: number) => void;
  onDelete: (id: number) => void;
}

function StatusBadge({ status }: { status: string }) {
  const config = BIOMETRIC_STATUS_BADGE_MAP[status] || BIOMETRIC_STATUS_BADGE_MAP.present;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border} ${config.darkBg} ${config.darkText} ${config.darkBorder}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

function GeofenceBadge({ status }: { status: string }) {
  const config = GEOFENCE_STATUS_MAP[status] || GEOFENCE_STATUS_MAP.exempt;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${config.bg} ${config.text} ${config.darkBg} ${config.darkText}`}
    >
      {status === "inside" && <Wifi className="h-3 w-3" />}
      {status === "outside" && <Shield className="h-3 w-3" />}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

const TABLE_HEADERS = [
  { label: "Employee", align: "text-left" },
  { label: "Department", align: "text-left" },
  { label: "Check In", align: "text-center" },
  { label: "Check Out", align: "text-center" },
  { label: "Work Hours", align: "text-center" },
  { label: "Status", align: "text-center" },
  { label: "Device", align: "text-left" },
  { label: "Geofence", align: "text-left" },
  { label: "Actions", align: "text-right" },
] as const;

export function BiometricTable({ data, searchTerm, selectedStatus, onAction, onDelete }: BiometricTableProps) {
  return (
    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800/30 border-b border-slate-200/50 dark:border-slate-800">
            <tr>
              {TABLE_HEADERS.map(({ label, align }) => (
                <th
                  key={label}
                  className={`px-6 py-4 ${align} text-xs font-semibold text-muted-foreground uppercase tracking-wider`}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.map((employee, index) => (
              <tr
                key={employee.id}
                className={`hover:bg-blue-50/50 dark:hover:bg-slate-800/30 transition-colors ${
                  index % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-slate-50/30 dark:bg-slate-800/10"
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Fingerprint className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{employee.name}</div>
                      <div className="text-sm text-muted-foreground">{employee.employeeId}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-foreground">{employee.department}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{employee.inTime}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{employee.outTime}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-sm font-medium text-foreground">
                    {employee.workHours > 0 ? `${employee.workHours}h` : "-"}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <StatusBadge status={employee.status} />
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-muted-foreground">{employee.device}</span>
                </td>
                <td className="px-6 py-4">
                  <GeofenceBadge status={employee.geofenceStatus} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onAction("view", employee.id)}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => onAction("edit", employee.id)}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => onDelete(employee.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Fingerprint className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No attendance records found</h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            {searchTerm || selectedStatus !== "All Status"
              ? "Try adjusting your search or filter criteria"
              : "No biometric attendance data available for the selected date"}
          </p>
        </div>
      )}
    </div>
  );
}
