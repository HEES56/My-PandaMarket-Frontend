import { Article } from "@/types/types";
import { customFetch } from "../url";

export const fetchArticles = async ({
  page = 1,
  take = 10,
  sortBy = "recent",
  search = "",
}: {
  page?: number;
  take?: number;
  sortBy: "recent" | "favorites";
  search: string;
}): Promise<{ articles: Article[]; totalCount: number }> => {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("take", String(take));
  params.append("sortBy", sortBy);
  params.append("search", search);

  const res = await customFetch(`/articles?${params.toString()}`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("게시글 조회 실패");

  return res.json();
};

export const fetchArticleById = async (id: string): Promise<Article> => {
  const res = await customFetch(`/articles/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("서버 fetch 실패", errorText);
    throw new Error("게시글 조회 실패");
  }

  return res.json();
};

export const createArticle = async (
  formData: FormData
): Promise<{ id: string }> => {
  const res = await customFetch("/articles", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("게시글 생성 실패");
  const json = await res.json();

  return { id: json.data.id };
};

export const updateArticle = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}): Promise<{ id: string }> => {
  const res = await customFetch(`/articles/${id}`, {
    method: "PATCH",
    body: formData,
  });

  if (!res.ok) throw new Error("게시글 수정 실패");
  const json = await res.json();

  return { id: json.data.id };
};

export const deleteArticle = async ({
  id,
}: {
  id: string;
}): Promise<{ id: string }> => {
  const res = await customFetch(`/articles/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("게시글 삭제 실패");
  return res.json();
};

export const favoriteArticle = async (id: string): Promise<void> => {
  const res = await customFetch(`/articles/${id}/favorite`, {
    method: "PUT",
  });

  if (!res.ok) throw new Error("게시글 좋아요 추가 실패");
};

export const unfavoriteArticle = async (id: string): Promise<void> => {
  const res = await customFetch(`/articles/${id}/favorite`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("게시글 좋아요 취소 실패");
};
