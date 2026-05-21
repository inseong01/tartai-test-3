"use client";

import { useQuery } from "@tanstack/react-query";
import { postQueries } from "../queries";

export function usePostList() {
  const { data, isLoading, error } = useQuery(postQueries.list());
  return { data, isLoading, error };
}
