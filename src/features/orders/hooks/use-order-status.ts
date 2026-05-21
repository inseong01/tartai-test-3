"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { OrderStatus } from "../queries";

export function useOrderStatus() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: string;
      status: OrderStatus;
    }) =>
      apiFetch(`/orders/${orderId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries({
        queryKey: ["orders", "detail", orderId],
      });
      queryClient.invalidateQueries({ queryKey: ["orders", "list"] });
    },
  });

  return {
    updateStatus: (orderId: string, status: OrderStatus) =>
      mutation.mutate({ orderId, status }),
    isPending: mutation.isPending,
  };
}
