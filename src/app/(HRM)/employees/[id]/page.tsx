"use client"

import { useEmployeeProfile } from "@/hooks/employee/useEmployeeProfile"
import { EmployeeModals } from "@/components/dashboard/models/EmployeeModals"
import { PersonalInfoCard } from "@/components/dashboard/employees/profile/PersonalInfoCard"
import { SocialProfileCard } from "@/components/dashboard/employees/profile/SocialProfileCard"
import { EmergencyContactCard } from "@/components/dashboard/employees/profile/EmergencyContactCard"
import { EducationCard } from "@/components/dashboard/employees/profile/EducationCard"
import { ExperienceCard } from "@/components/dashboard/employees/profile/ExperienceCard"
import { BankAccountCard } from "@/components/dashboard/employees/profile/BankAccountCard"
import { PassportCard } from "@/components/dashboard/employees/profile/PassportCard"
import { mapEmployeeToModalData } from "@/utils/employeeMapper"

export default function EmployeeProfile() {
  const {
    employeeData,
    loading,
    error,
    activeModal,
    uploadedFile,
    openModal,
    closeModal,
    handleFileUpload,
    removeFile,
    fetchEmployee,
  } = useEmployeeProfile()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-slate-500">Loading employee details...</p>
      </div>
    )
  }

  if (error || !employeeData) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-red-500">{error || "Employee not found"}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <PersonalInfoCard employee={employeeData} onEdit={() => openModal("personal")} />
        <SocialProfileCard employee={employeeData} onEdit={() => openModal("social")} />
      </div>

      <EmergencyContactCard employee={employeeData} onEdit={() => openModal("emergency")} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EducationCard employee={employeeData} onEdit={() => openModal("education")} />
        <ExperienceCard employee={employeeData} onEdit={() => openModal("experience")} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BankAccountCard employee={employeeData} onEdit={() => openModal("bank")} />
        <PassportCard employee={employeeData} onEdit={() => openModal("passport")} />
      </div>

      <EmployeeModals
        activeModal={activeModal}
        closeModal={closeModal}
        employeeData={mapEmployeeToModalData(employeeData)}
        employeeId={employeeData._id}
        uploadedFile={uploadedFile}
        handleFileUpload={handleFileUpload}
        removeFile={removeFile}
        onSave={fetchEmployee}
      />
    </div>
  )
}
