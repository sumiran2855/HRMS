import { EditModal } from "@/components/dashboard/models/EditModal"
import { Employee } from "@/types/hr.types"
import { MapPin, Mail, Phone, Briefcase, Calendar, Users, Award, DollarSign } from "lucide-react"

interface ViewEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  employee: Employee | null
  formatCurrency: (amount: number) => string
  getStatusColor: (status: string) => string
  getPerformanceColor: (rating: number) => string
}

export default function ViewEmployeeModal({
  isOpen,
  onClose,
  employee,
  formatCurrency,
  getStatusColor,
  getPerformanceColor,
}: ViewEmployeeModalProps) {
  if (!employee) return null

  return (
    <EditModal
      isOpen={isOpen}
      onClose={onClose}
      title={employee.name}
      description="Employee details and information"
    >
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
            <span className="text-xl font-bold text-purple-600">
              {employee.name.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{employee.name}</h3>
            <p className="text-sm text-slate-500">{employee.position}</p>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
              {employee.status}
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailRow icon={Mail} label="Email" value={employee.email} />
          <DetailRow icon={Phone} label="Phone" value={employee.phone} />
          <DetailRow icon={Briefcase} label="Department" value={employee.department} />
          <DetailRow icon={MapPin} label="Location" value={employee.location} />
          <DetailRow icon={Calendar} label="Join Date" value={employee.joinDate} />
          <DetailRow icon={Users} label="Manager" value={employee.manager} />
          <DetailRow icon={DollarSign} label="Salary" value={formatCurrency(employee.salary)} />
          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
            <Award className="w-4 h-4 text-slate-400 mt-0.5" />
            <div>
              <p className="text-xs text-slate-500">Performance</p>
              <p className={`text-sm font-semibold ${getPerformanceColor(employee.performance)}`}>
                {employee.performance}/5.0
              </p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Skills</p>
          <div className="flex flex-wrap gap-2">
            {employee.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium border border-purple-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </EditModal>
  )
}

function DetailRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
      <Icon className="w-4 h-4 text-slate-400 mt-0.5" />
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-medium text-slate-900">{value}</p>
      </div>
    </div>
  )
}
