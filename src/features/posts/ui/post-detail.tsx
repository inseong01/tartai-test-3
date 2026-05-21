import type { PostDetail } from "../queries";

type Props = {
  post: PostDetail;
  onClose: () => void;
};

export function PostDetailPanel({ post, onClose }: Props) {
  return (
    <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-semibold text-gray-900 leading-snug">
          {post.title}
        </h3>
        <button
          onClick={onClose}
          className="shrink-0 text-gray-400 hover:text-gray-600 text-lg leading-none"
        >
          ×
        </button>
      </div>
      <p className="text-xs text-gray-500 mb-3">{post.postedAt}</p>
      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
        {post.content}
      </p>
    </div>
  );
}
