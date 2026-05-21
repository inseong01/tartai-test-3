import { ORDER_STATUS, type OrderDetail, type OrderStatus } from "../queries";
import { OrderStatusUpdater } from "./order-status-updater";

type Props = {
  order: OrderDetail;
  onClose: () => void;
  onStatusUpdate: (status: OrderStatus) => void;
  isUpdating: boolean;
};

export function OrderDetailPanel({
  order,
  onClose,
  onStatusUpdate,
  isUpdating,
}: Props) {
  const currentStatus =
    (Object.keys(ORDER_STATUS) as OrderStatus[]).find(
      (k) => ORDER_STATUS[k] === order.status,
    ) ?? "PENDING";

  return (
    <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="font-mono text-xs text-gray-500">{order.id}</span>
          <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 text-gray-700 rounded-full">
            {order.status}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-lg leading-none"
        >
          x
        </button>
      </div>
      <p className="text-xs text-gray-500 mb-3">{order.orderedAt}</p>

      <table className="w-full text-sm mb-3">
        <thead>
          <tr className="border-b border-blue-200 text-left text-gray-500">
            <th className="pb-1.5 font-medium">상품명</th>
            <th className="pb-1.5 font-medium text-right">수량</th>
            <th className="pb-1.5 font-medium text-right">단가</th>
            <th className="pb-1.5 font-medium text-right">소계</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, i) => (
            <tr key={i} className="border-b border-blue-100">
              <td className="py-1.5 text-gray-800">{item.itemName}</td>
              <td className="py-1.5 text-right text-gray-600">
                {item.quantity}
              </td>
              <td className="py-1.5 text-right text-gray-600">
                {item.unitPrice.toLocaleString()}원
              </td>
              <td className="py-1.5 text-right text-gray-800">
                {item.totalPrice.toLocaleString()}원
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between pt-3 border-t border-blue-200">
        <span className="text-sm font-semibold text-gray-900">
          합계 {order.totalAmount.toLocaleString()}원
        </span>
        <OrderStatusUpdater
          currentStatus={currentStatus}
          onStatusUpdate={onStatusUpdate}
          isUpdating={isUpdating}
        />
      </div>
    </div>
  );
}
