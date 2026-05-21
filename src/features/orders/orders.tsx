"use client";

import { useOrderDetail } from "./hooks/use-order-detail";
import { useOrderList } from "./hooks/use-order-list";
import { useOrderStatus } from "./hooks/use-order-status";
import { OrderList } from "./ui/order-list";

type Props = {
  selectedId: string;
  onSelect: (id: string) => void;
};

export function Orders({ selectedId, onSelect }: Props) {
  const {
    data: listData,
    isLoading: isListLoading,
    error: listError,
  } = useOrderList();
  const { data: detailData, isLoading: isDetailLoading } =
    useOrderDetail(selectedId);
  const { updateStatus, isPending: isStatusPending } = useOrderStatus();

  const handleSelect = (orderId: string) => {
    onSelect(selectedId === orderId ? "" : orderId);
  };

  return (
    <section className="flex flex-2 flex-col gap-4 p-5 bg-white border border-gray-200 rounded-xl">
      <h2 className="font-semibold text-gray-900">주문 상태 조회</h2>

      {isListLoading && <p className="text-sm text-gray-400">불러오는 중...</p>}
      {listError && (
        <p className="text-sm text-red-500">오류: {listError.message}</p>
      )}

      {listData && (
        <OrderList
          orders={listData.content}
          selectedId={selectedId}
          onSelect={handleSelect}
          detail={detailData ?? null}
          isDetailLoading={selectedId !== "" && isDetailLoading}
          onClose={() => onSelect("")}
          onStatusUpdate={(status) => updateStatus(selectedId, status)}
          isUpdating={isStatusPending}
        />
      )}
    </section>
  );
}
