import { CreditCard } from "lucide-react";
import { Employee } from "@/types/employee.types";
import { ProfileSectionCard, InfoRow } from "./ProfileSectionCard";
import { formatCurrency } from "@/utils/formatters";

interface BankAccountCardProps {
  employee: Employee;
  onEdit: () => void;
}

export function BankAccountCard({ employee, onEdit }: BankAccountCardProps) {
  const bank = employee.bankDetails;
  const salary = bank?.salary || employee.salary;

  return (
    <ProfileSectionCard
      title="Bank Account"
      icon={CreditCard}
      iconBgColor="bg-green-100"
      iconColor="text-green-600"
      editHoverColor="hover:bg-green-50"
      onEdit={onEdit}
    >
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
        <div className="space-y-4">
          <InfoRow label="Account Holder Name" value={bank?.accountHolderName || "-"} />
          <InfoRow label="Account Number" value={bank?.accountNumber || "-"} valueClassName="text-slate-900 font-mono" />
          <InfoRow label="Bank Name" value={bank?.bankName || "-"} />
          <InfoRow label="Branch Name" value={bank?.branchName || "-"} />
          <InfoRow label="Salary" value={formatCurrency(salary)} />
        </div>
      </div>
    </ProfileSectionCard>
  );
}
