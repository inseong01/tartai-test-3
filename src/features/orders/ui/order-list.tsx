import type { OrderSummary } from "../queries";

type Props = {
  orders: OrderSummary[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function OrderList({ orders, selectedId, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-left text-gray-500">
            <th className="pb-2 font-medium">주문번호</th>
            <th className="pb-2 font-medium">상태</th>
            <th className="pb-2 font-medium text-right">금액</th>
            <th className="pb-2 font-medium w-36">주문일시</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 && (
            <tr>
              <td colSpan={4} className="py-6 text-center text-gray-400">
                주문이 없습니다.
              </td>
            </tr>
          )}
          {orders.map((order) => (
            <tr
              key={order.id}
              onClick={() => onSelect(order.id)}
              className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${selectedId === order.id ? "bg-blue-50" : ""}`}
            >
              <td className="py-2.5 pr-4 text-gray-800 font-mono text-xs">
                {order.id}
              </td>
              <td className="py-2.5 pr-4">
                <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">
                  {order.status}
                </span>
              </td>
              <td className="py-2.5 pr-4 text-right text-gray-800">
                {order.totalAmount.toLocaleString()}원
              </td>
              <td className="py-2.5 text-gray-500 text-xs">
                {order.orderedAt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
