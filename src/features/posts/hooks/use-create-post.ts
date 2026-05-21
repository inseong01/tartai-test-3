"use client";

import { ComponentProps } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type CreatePostInput } from "../queries";
import { apiFetch } from "@/lib/api";

export function useCreatePost(onSuccess: () => void) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (input: CreatePostInput) =>
      apiFetch("/posts", { method: "POST", body: JSON.stringify(input) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "list"] });
      onSuccess();
    },
  });

  const handleSubmit: ComponentProps<"form">["onSubmit"] = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const content = (form.elements.namedItem("content") as HTMLTextAreaElement)
      .value;
    mutation.mutate({ title, content });
  };

  return { handleSubmit, isPending: mutation.isPending };
}
