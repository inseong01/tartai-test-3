"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export function useDeletePost(
  selectedId: number,
  onDeleteSelected: () => void,
) {
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (postId: number) =>
      apiFetch(`/posts/${postId}`, { method: "DELETE" }),
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ["posts", "list"] });
      if (selectedId === postId) onDeleteSelected();
      setPendingDeleteId(null);
    },
    onError: () => setPendingDeleteId(null),
  });

  const handleDelete = (postId: number) => setPendingDeleteId(postId);

  const handleConfirmDelete = () => {
    if (pendingDeleteId !== null) mutation.mutate(pendingDeleteId);
  };

  return {
    pendingDeleteId,
    setPendingDeleteId,
    handleDelete,
    handleConfirmDelete,
    isPending: mutation.isPending,
  };
}
