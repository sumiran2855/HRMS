import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { DollarSign, CreditCard } from "lucide-react"
import type { Account } from "@/types/finance.types"

interface FinanceAccountsProps {
  accounts: Account[]
  formatCurrency: (amount: number) => string
}

export function FinanceAccounts({ accounts, formatCurrency }: FinanceAccountsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <div key={account.id} className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{account.name}</h3>
                  <p className="text-sm text-slate-500">{account.bankName}</p>
                </div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    account.type === "Asset" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {account.type === "Asset" ? (
                    <DollarSign className="w-5 h-5 text-green-600" />
                  ) : (
                    <CreditCard className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Balance:</span>
                  <span
                    className={`text-lg font-bold ${
                      account.balance >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {formatCurrency(account.balance)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Account:</span>
                  <span className="text-sm text-slate-900">{account.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Updated:</span>
                  <span className="text-sm text-slate-900">{account.lastUpdated}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
