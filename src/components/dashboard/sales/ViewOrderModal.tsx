import { EditModal } from "@/components/dashboard/models/EditModal"
import { SalesOrder } from "@/types/sales.types"
import { Calendar, Truck, Package, DollarSign, Users, MapPin, Hash } from "lucide-react"

interface ViewOrderModalProps {
  isOpen: boolean
  onClose: () => void
  order: SalesOrder | null
  formatCurrency: (amount: number) => string
  getStatusColor: (status: string) => string
  getPaymentStatusColor: (status: string) => string
}

export default function ViewOrderModal({
  isOpen,
  onClose,
  order,
  formatCurrency,
  getStatusColor,
  getPaymentStatusColor,
}: ViewOrderModalProps) {
  if (!order) return null

  return (
    <EditModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Order ${order.orderNumber}`}
      description="Sales order details and tracking information"
    >
      <div className="space-y-6">
        {/* Order Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{order.customer}</h3>
            <p className="text-sm text-slate-500">Sales Rep: {order.salesRep}</p>
          </div>
          <div className="flex gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
              {order.paymentStatus}
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailRow icon={Hash} label="Order Number" value={order.orderNumber} />
          <DetailRow icon={DollarSign} label="Total Amount" value={formatCurrency(order.totalAmount)} />
          <DetailRow icon={Calendar} label="Order Date" value={order.date} />
          <DetailRow icon={Truck} label="Delivery Date" value={order.deliveryDate} />
          <DetailRow icon={Package} label="Items" value={String(order.items)} />
          <DetailRow icon={Users} label="Sales Rep" value={order.salesRep} />
        </div>

        {/* Shipping Info */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Shipping Information</h4>
          <div className="space-y-3">
            <DetailRow icon={MapPin} label="Shipping Address" value={order.shippingAddress} />
            <DetailRow icon={Truck} label="Tracking Number" value={order.trackingNumber} />
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
