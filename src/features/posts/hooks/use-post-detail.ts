"use client";

import { useQuery } from "@tanstack/react-query";
import { postQueries } from "../queries";

export function usePostDetail(id: number) {
  const { data, isLoading } = useQuery(postQueries.detail(id));
  return { data, isLoading };
}
