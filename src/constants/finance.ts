import type { Transaction, Account } from "@/types/finance.types"

export const TRANSACTIONS_DATA: Transaction[] = [
  {
    id: 1,
    type: "invoice",
    number: "INV-001",
    client: "Tech Solutions Inc.",
    amount: 15430.0,
    date: "2024-03-15",
    dueDate: "2024-04-15",
    status: "paid",
    category: "Sales",
    description: "Software license renewal",
    paymentMethod: "Bank Transfer",
  },
  {
    id: 2,
    type: "expense",
    number: "EXP-002",
    vendor: "Office Supplies Co.",
    amount: 3250.0,
    date: "2024-03-14",
    dueDate: "2024-03-14",
    status: "paid",
    category: "Office Supplies",
    description: "Monthly office supplies",
    paymentMethod: "Credit Card",
  },
  {
    id: 3,
    type: "invoice",
    number: "INV-003",
    client: "Global Manufacturing",
    amount: 28750.0,
    date: "2024-03-13",
    dueDate: "2024-04-13",
    status: "pending",
    category: "Sales",
    description: "Equipment purchase",
    paymentMethod: "Pending",
  },
  {
    id: 4,
    type: "expense",
    number: "EXP-004",
    vendor: "Cloud Services Ltd.",
    amount: 890.0,
    date: "2024-03-12",
    dueDate: "2024-03-12",
    status: "paid",
    category: "Software",
    description: "Cloud storage subscription",
    paymentMethod: "Auto-pay",
  },
]

export const ACCOUNTS_DATA: Account[] = [
  {
    id: 1,
    name: "Business Checking",
    type: "Asset",
    balance: 125430.5,
    currency: "USD",
    bankName: "National Bank",
    accountNumber: "****4582",
    lastUpdated: "2024-03-15",
  },
  {
    id: 2,
    name: "Savings Account",
    type: "Asset",
    balance: 45680.0,
    currency: "USD",
    bankName: "National Bank",
    accountNumber: "****7891",
    lastUpdated: "2024-03-14",
  },
  {
    id: 3,
    name: "Credit Card",
    type: "Liability",
    balance: -8234.75,
    currency: "USD",
    bankName: "Business Credit Corp",
    accountNumber: "****2345",
    lastUpdated: "2024-03-15",
  },
]

export const TRANSACTION_TYPES = ["All Types", "invoice", "expense", "payment", "refund"]

export const TRANSACTION_STATUSES = ["All Status", "paid", "pending", "overdue", "cancelled"]

export const STATUS_COLOR_MAP: Record<string, string> = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  overdue: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-700",
}

export const FINANCE_TABS = [
  { key: "transactions", label: "Transactions" },
  { key: "accounts", label: "Accounts" },
  { key: "reports", label: "Reports" },
]
