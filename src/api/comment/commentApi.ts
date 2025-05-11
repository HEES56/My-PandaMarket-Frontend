import { Comment } from "@/types/types";
import { customFetch } from "../url";

export const getComments = async (
  type: "article" | "product",
  id: string
): Promise<Comment[]> => {
  const url =
    type === "article"
      ? `/articles/${id}/comments`
      : `/products/${id}/comments`;

  const res = await customFetch(url, { method: "GET", cache: "no-store" });

  if (!res.ok) throw new Error("댓글 불러오기 실패");
  const json = await res.json();
  return json.data;
};

export const postComment = async (
  type: "article" | "product",
  id: string,
  content: string
) => {
  const url =
    type === "article"
      ? `/articles/${id}/comments`
      : `/products/${id}/comments`;

  const res = await customFetch(url, {
    method: "POST",
    body: { content },
  });

  if (!res.ok) throw new Error("댓글 등록 실패");
};

export const updateComment = async (commentId: string, content: string) => {
  const res = await customFetch(`/comments/${commentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) throw new Error("댓글 수정 실패");
};

export const deleteComment = async (commentId: string) => {
  const res = await customFetch(`/comments/${commentId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("댓글 삭제 실패");
};
