import type { ComponentProps } from "react";

type Props = {
  onSubmit: ComponentProps<"form">["onSubmit"];
  onCancel: () => void;
  isPending: boolean;
};

export function PostForm({ onSubmit, onCancel, isPending }: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg"
    >
      <h3 className="text-sm font-semibold text-gray-700">새 공지 작성</h3>
      <input
        name="title"
        type="text"
        placeholder="제목 (1~100자)"
        maxLength={100}
        required
        className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="content"
        placeholder="내용 (1~10000자)"
        maxLength={10000}
        required
        rows={4}
        className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="px-3 py-1.5 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "등록 중..." : "등록"}
        </button>
      </div>
    </form>
  );
}
