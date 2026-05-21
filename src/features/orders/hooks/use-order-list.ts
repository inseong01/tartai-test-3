"use client";

import { useQuery } from "@tanstack/react-query";
import { orderQueries } from "../queries";

export function useOrderList() {
  const { data, isLoading, error } = useQuery(orderQueries.list());
  return { data, isLoading, error };
}
