import { Fragment } from "react";
import type { PostSummary, PostDetail } from "../queries";
import { PostDetailPanel } from "./post-detail";

type Props = {
  posts: PostSummary[];
  selectedId: number;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  detail: PostDetail | null;
  isDetailLoading: boolean;
  onClose: () => void;
};

export function PostList({
  posts,
  selectedId,
  onSelect,
  onDelete,
  detail,
  isDetailLoading,
  onClose,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-left text-gray-500">
            <th className="pb-2 font-medium">제목</th>
            <th className="pb-2 font-medium w-36">등록일시</th>
            <th className="pb-2 w-16" />
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 && (
            <tr>
              <td colSpan={3} className="py-6 text-center text-gray-400">
                게시글이 없습니다.
              </td>
            </tr>
          )}
          {posts.map((post) => (
            <Fragment key={post.id}>
              <tr
                className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${selectedId === post.id ? "bg-blue-50" : ""}`}
              >
                <td
                  className="py-2.5 pr-4 text-gray-800"
                  onClick={() => onSelect(post.id)}
                >
                  {post.title}
                </td>
                <td
                  className="py-2.5 text-gray-500 text-xs"
                  onClick={() => onSelect(post.id)}
                >
                  {post.postedAt}
                </td>
                <td className="py-2.5 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(post.id);
                    }}
                    className="px-2 py-1 text-xs text-red-500 border border-red-200 rounded hover:bg-red-50"
                  >
                    삭제
                  </button>
                </td>
              </tr>
              {selectedId === post.id && (
                <tr>
                  <td colSpan={3} className="pb-2">
                    {isDetailLoading && (
                      <p className="text-sm text-gray-400 px-1 py-2">
                        상세 불러오는 중...
                      </p>
                    )}
                    {detail && (
                      <PostDetailPanel post={detail} onClose={onClose} />
                    )}
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
