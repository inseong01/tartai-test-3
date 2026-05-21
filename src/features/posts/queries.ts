import { queryOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export type PostSummary = {
  id: number;
  title: string;
  postedAt: string;
};

export type PostDetail = {
  id: number;
  title: string;
  content: string;
  postedAt: string;
};

export type PostListResponse = {
  content: PostSummary[];
  totalCount: number;
  page: number;
  size: number;
};

export type CreatePostInput = {
  title: string;
  content: string;
};

export const postQueries = {
  list: () =>
    queryOptions({
      queryKey: ["posts", "list"],
      queryFn: () => apiFetch<PostListResponse>(`/posts`),
    }),
  detail: (postId: number) =>
    queryOptions({
      queryKey: ["posts", "detail", postId],
      queryFn: () => apiFetch<PostDetail>(`/posts/${postId}`),
      enabled: postId > 0,
    }),
};
