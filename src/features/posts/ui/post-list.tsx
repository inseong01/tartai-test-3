import type { PostSummary } from "../queries";

type Props = {
  posts: PostSummary[];
  selectedId: number;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
};

export function PostList({ posts, selectedId, onSelect, onDelete }: Props) {
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
            <tr
              key={post.id}
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
