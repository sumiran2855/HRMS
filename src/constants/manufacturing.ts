import { ProductionOrder, ProductionLine } from "@/types/manufacturing.types"

export const PRODUCTION_ORDERS_DATA: ProductionOrder[] = [
  {
    id: 1,
    orderNumber: "MO-001",
    product: "Laptop Model X",
    batchNumber: "BATCH-456",
    quantity: 150,
    startDate: "2024-03-15",
    endDate: "2024-03-20",
    status: "in-progress",
    priority: "high",
    productionLine: "Assembly Line 1",
    materials: ["Laptop Case", "Screen", "Keyboard", "Motherboard"],
    completionRate: 75,
    estimatedCompletion: "2024-03-22",
    supervisor: "John Smith",
    qualityScore: 4.2,
  },
  {
    id: 2,
    orderNumber: "MO-002",
    product: "Office Chair Pro",
    batchNumber: "BATCH-457",
    quantity: 300,
    startDate: "2024-03-14",
    endDate: "2024-03-18",
    status: "completed",
    priority: "normal",
    productionLine: "Assembly Line 2",
    materials: ["Chair Frame", "Cushion", "Wheels", "Armrests"],
    completionRate: 100,
    estimatedCompletion: "2024-03-18",
    supervisor: "Emma Davis",
    qualityScore: 4.8,
  },
  {
    id: 3,
    orderNumber: "MO-003",
    product: "Wireless Mouse",
    batchNumber: "BATCH-458",
    quantity: 500,
    startDate: "2024-03-13",
    endDate: "2024-03-21",
    status: "planned",
    priority: "low",
    productionLine: "Assembly Line 3",
    materials: ["Plastic", "Circuit Board", "Battery", "USB Connector"],
    completionRate: 0,
    estimatedCompletion: "2024-03-25",
    supervisor: "Chris Wilson",
    qualityScore: 0,
  },
]

export const PRODUCTION_LINES_DATA: ProductionLine[] = [
  {
    id: 1,
    name: "Assembly Line 1",
    status: "active",
    currentProduct: "Laptop Model X",
    capacity: 200,
    efficiency: 85,
    supervisor: "John Smith",
    outputToday: 150,
    qualityScore: 4.2,
    downtime: 15,
  },
  {
    id: 2,
    name: "Assembly Line 2",
    status: "active",
    currentProduct: "Office Chair Pro",
    capacity: 400,
    efficiency: 92,
    supervisor: "Emma Davis",
    outputToday: 300,
    qualityScore: 4.8,
    downtime: 8,
  },
  {
    id: 3,
    name: "Assembly Line 3",
    status: "maintenance",
    currentProduct: null,
    capacity: 250,
    efficiency: 0,
    supervisor: "Chris Wilson",
    outputToday: 0,
    qualityScore: 0,
    downtime: 480,
  },
]

export const STATUSES = ["All Status", "planned", "in-progress", "completed", "on-hold", "cancelled"]
export const PRIORITIES = ["All Priorities", "high", "normal", "low"]

export const STATUS_COLOR_MAP: Record<string, string> = {
  planned: "bg-gray-100 text-gray-700",
  "in-progress": "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  "on-hold": "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
}

export const PRIORITY_COLOR_MAP: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  normal: "bg-blue-100 text-blue-700",
  low: "bg-green-100 text-green-700",
}

export const LINE_STATUS_COLOR_MAP: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  maintenance: "bg-yellow-100 text-yellow-700",
  inactive: "bg-red-100 text-red-700",
}

export const MANUFACTURING_TABS = [
  { key: "production", label: "Production Orders" },
  { key: "lines", label: "Production Lines" },
  { key: "quality", label: "Quality Control" },
  { key: "analytics", label: "Manufacturing Analytics" },
]
