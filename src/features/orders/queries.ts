import { queryOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export type OrderSummary = {
  id: string;
  status: string;
  totalAmount: number;
  orderedAt: string;
};

export type OrderItem = {
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type OrderDetail = {
  id: string;
  status: string;
  items: OrderItem[];
  totalAmount: number;
  orderedAt: string;
};

export type OrderListResponse = {
  content: OrderSummary[];
  totalCount: number;
  page: number;
  size: number;
};

export const ORDER_STATUS = {
  PENDING: "결제 대기",
  PAID: "결제 완료",
  PREPARING: "상품 준비 중",
  SHIPPED: "배송 중",
  DELIVERED: "배송 완료",
  CANCELLED: "취소됨",
} as const;

export type OrderStatus = keyof typeof ORDER_STATUS;

export const orderQueries = {
  list: () =>
    queryOptions({
      queryKey: ["orders", "list"],
      queryFn: () => apiFetch<OrderListResponse>(`/orders`),
    }),
  detail: (orderId: string) =>
    queryOptions({
      queryKey: ["orders", "detail", orderId],
      queryFn: () => apiFetch<OrderDetail>(`/orders/${orderId}`),
      enabled: orderId !== "",
    }),
};
