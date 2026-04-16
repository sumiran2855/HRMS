import { Employee } from "@/types/employee.types";
import { EmployeeData } from "@/components/dashboard/models/types";
import { formatDateForInput } from "@/utils/formatters";

export function mapEmployeeToModalData(employee: Employee): EmployeeData {
  return {
    id: employee.employeeId || employee._id,
    name: `${employee.firstName} ${employee.lastName}`,
    jobTitle: employee.position || employee.employeeDesignation || "",
    position: employee.position || employee.employeeDesignation || "",
    dateOfJoin: formatDateForInput(employee.joiningDate) || "",
    phone: employee.contactNumber || "",
    email: employee.email || "",
    birthday: formatDateForInput(employee.birthday) || "",
    address: employee.address || "",
    gender: employee.gender || "",
    departmentId: employee.departmentId || "",
    hireDate: formatDateForInput(employee.hireDate) || "",
    socialProfiles: {
      linkedin: employee.socialProfile?.linkedin || "-",
      twitter: employee.socialProfile?.twitter || "-",
      facebook: employee.socialProfile?.facebook || "-",
      instagram: employee.socialProfile?.instagram || "-",
      whatsapp: employee.socialProfile?.whatsapp || employee.contactNumber || "-",
    },
    emergencyContact: {
      primary: {
        name: employee.emergencyContact?.primary?.name || "-",
        relationship: employee.emergencyContact?.primary?.relationship || "-",
        phone: employee.emergencyContact?.primary?.phone || "-",
        email: employee.emergencyContact?.primary?.email || "-",
        address: employee.emergencyContact?.primary?.address || "-",
      },
      secondary: {
        name: employee.emergencyContact?.secondary?.name || "-",
        relationship: employee.emergencyContact?.secondary?.relationship || "-",
        phone: employee.emergencyContact?.secondary?.phone || "-",
        email: employee.emergencyContact?.secondary?.email || "-",
        address: employee.emergencyContact?.secondary?.address || "-",
      },
    },
    experience:
      employee.experience?.map((exp) => ({
        company: exp.company || "",
        position: exp.position || "",
        startDate: exp.startDate || "",
        endDate: exp.endDate || "",
      })) || [],
    education:
      employee.education?.map((edu) => ({
        degree: edu.degree || "",
        institution: edu.institution || "",
        fieldOfStudy: edu.fieldOfStudy || "",
        cgpa: edu.cgpa || "",
        startDate: edu.startDate || "",
        endDate: edu.endDate || "",
      })) || [],
    bankAccount: {
      accountHolderName: employee.bankDetails?.accountHolderName || "",
      accountNumber: employee.bankDetails?.accountNumber || "",
      bankName: employee.bankDetails?.bankName || "",
      branchName: employee.bankDetails?.branchName || "",
      bicCode: employee.bankDetails?.bicCode || "",
      salary: employee.bankDetails?.salary || "",
    },
    passport: {
      passportNumber: employee.passport?.passportNumber || "-",
      nationality: employee.passport?.nationality || "-",
      issueDate: employee.passport?.issueDate || "-",
      expiryDate: employee.passport?.expiryDate || "-",
      scanCopy: employee.passport?.scanCopy || "-",
    },
  };
}
