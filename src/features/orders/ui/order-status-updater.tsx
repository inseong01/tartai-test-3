"use client";

import { useState } from "react";
import { ORDER_STATUS, type OrderStatus } from "../queries";

const STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["PAID", "PREPARING", "SHIPPED", "DELIVERED", "CANCELLED"],
  PAID: ["PREPARING", "SHIPPED", "DELIVERED", "CANCELLED"],
  PREPARING: ["SHIPPED", "DELIVERED", "CANCELLED"],
  SHIPPED: ["DELIVERED", "CANCELLED"],
  DELIVERED: [],
  CANCELLED: [],
};

type Props = {
  currentStatus: OrderStatus;
  onStatusUpdate: (status: OrderStatus) => void;
  isUpdating: boolean;
};

export function OrderStatusUpdater({
  currentStatus,
  onStatusUpdate,
  isUpdating,
}: Props) {
  const allowedTransitions = STATUS_TRANSITIONS[currentStatus];
  const [selected, setSelected] = useState<OrderStatus>(
    allowedTransitions[0] ?? currentStatus,
  );

  return (
    <div className="flex items-center gap-2">
      {allowedTransitions.length === 0 ? (
        <span className="text-xs text-gray-400">변경 불가</span>
      ) : (
        <>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value as OrderStatus)}
            className="text-sm border border-gray-300 rounded px-2 py-1.5 bg-white"
          >
            {allowedTransitions.map((key) => (
              <option key={key} value={key}>
                {ORDER_STATUS[key]}
              </option>
            ))}
          </select>
          <button
            onClick={() => onStatusUpdate(selected)}
            disabled={isUpdating}
            className="px-3 py-1.5 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isUpdating ? "변경 중..." : "상태 변경"}
          </button>
        </>
      )}
    </div>
  );
}
