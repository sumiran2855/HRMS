import { useState, useEffect } from "react"
import { EditModal } from "@/components/dashboard/models/EditModal"
import { Employee } from "@/types/hr.types"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

interface EditEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  employee: Employee | null
  onSave: (updated: Employee) => void
}

export default function EditEmployeeModal({
  isOpen,
  onClose,
  employee,
  onSave,
}: EditEmployeeModalProps) {
  const [formData, setFormData] = useState<Employee | null>(null)

  useEffect(() => {
    if (employee) {
      setFormData({ ...employee })
    }
  }, [employee])

  if (!formData) return null

  const handleChange = (field: keyof Employee, value: string | number) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  const handleSkillsChange = (value: string) => {
    setFormData((prev) =>
      prev ? { ...prev, skills: value.split(",").map((s) => s.trim()) } : prev
    )
  }

  const handleSave = () => {
    if (formData) onSave(formData)
  }

  return (
    <EditModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit ${employee?.name}`}
      description="Update employee information below"
      onSave={handleSave}
    >
      <div className="space-y-5">
        {/* Personal Information */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Personal Information</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-xs text-slate-500">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-xs text-slate-500">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-xs text-slate-500">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="location" className="text-xs text-slate-500">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Job Information */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Job Information</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="department" className="text-xs text-slate-500">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => handleChange("department", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="position" className="text-xs text-slate-500">Position</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleChange("position", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="manager" className="text-xs text-slate-500">Manager</Label>
              <Input
                id="manager"
                value={formData.manager}
                onChange={(e) => handleChange("manager", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="salary" className="text-xs text-slate-500">Salary</Label>
              <Input
                id="salary"
                type="number"
                value={formData.salary}
                onChange={(e) => handleChange("salary", Number(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Skills</h4>
          <div>
            <Label htmlFor="skills" className="text-xs text-slate-500">Skills (comma-separated)</Label>
            <Input
              id="skills"
              value={formData.skills.join(", ")}
              onChange={(e) => handleSkillsChange(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </EditModal>
  )
}
