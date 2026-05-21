"use client";

import { useState } from "react";
import { usePostList } from "./hooks/use-post-list";
import { usePostDetail } from "./hooks/use-post-detail";
import { useCreatePost } from "./hooks/use-create-post";
import { useDeletePost } from "./hooks/use-delete-post";
import { PostForm } from "./ui/post-form";
import { PostList } from "./ui/post-list";
import { ConfirmModal } from "@/components/confirm-modal";

export function Posts() {
  const [selectedId, setSelectedId] = useState(0);
  const [isCreating, setIsCreating] = useState(false);

  const {
    data: listData,
    isLoading: isListLoading,
    error: listError,
  } = usePostList();
  const { data: detailData, isLoading: isDetailLoading } =
    usePostDetail(selectedId);
  const { handleSubmit, isPending: isCreatePending } = useCreatePost(() =>
    setIsCreating(false),
  );
  const {
    pendingDeleteId,
    setPendingDeleteId,
    handleDelete,
    handleConfirmDelete,
    isPending: isDeleting,
  } = useDeletePost(selectedId, () => setSelectedId(0));

  const handleSelect = (postId: number) => {
    setSelectedId((prev) => (prev === postId ? 0 : postId));
  };

  return (
    <section className="flex flex-col flex-1 gap-4 p-5 bg-white border border-gray-200 rounded-xl">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">공지 / 게시판</h2>
        <button
          onClick={() => setIsCreating((v) => !v)}
          className="px-3 py-1.5 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50"
        >
          {isCreating ? "취소" : "+ 새 공지"}
        </button>
      </div>

      {isCreating && (
        <PostForm
          onSubmit={handleSubmit}
          onCancel={() => setIsCreating(false)}
          isPending={isCreatePending}
        />
      )}

      {isListLoading && <p className="text-sm text-gray-400">불러오는 중...</p>}
      {listError && (
        <p className="text-sm text-red-500">오류: {listError.message}</p>
      )}

      {listData && (
        <PostList
          posts={listData.content}
          selectedId={selectedId}
          onSelect={handleSelect}
          onDelete={handleDelete}
          detail={detailData ?? null}
          isDetailLoading={selectedId > 0 && isDetailLoading}
          onClose={() => setSelectedId(0)}
        />
      )}

      <ConfirmModal
        open={pendingDeleteId !== null}
        title="게시글을 삭제할까요?"
        description="삭제하면 복구할 수 없습니다."
        confirmLabel="삭제"
        isPending={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </section>
  );
}
