"use client";

import { useQuery } from "@tanstack/react-query";
import { orderQueries } from "../queries";

export function useOrderDetail(id: string) {
  const { data, isLoading } = useQuery(orderQueries.detail(id));
  return { data, isLoading };
}
