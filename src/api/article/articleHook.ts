import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createArticle,
  favoriteArticle,
  fetchArticleById,
  unfavoriteArticle,
  updateArticle,
} from "./articleApi";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "./articleApi";
import { Article } from "@/types/types";

export const useArticles = (
  page: number,
  take: number,
  sortBy: "recent" | "favorites",
  search: string
) => {
  return useQuery<{ articles: Article[]; totalCount: number }, Error>({
    queryKey: ["articles", page, take, sortBy, search],
    queryFn: () => fetchArticles({ page, take, sortBy, search }),
  });
};

export const useArticleById = (id?: string) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticleById(id as string),
    enabled: !!id,
  });
};

export const useCreateArticle = (onSuccess?: (id: string) => void) =>
  useMutation({
    mutationFn: createArticle,
    onSuccess: (data) => {
      onSuccess?.(data.id);
    },
  });

export const useUpdateArticle = (onSuccess?: (id: string) => void) =>
  useMutation({
    mutationFn: updateArticle,
    onSuccess: (data) => {
      onSuccess?.(data.id);
    },
  });

export const useFavoriteArticle = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => favoriteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["article", id] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useUnfavoriteArticle = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => unfavoriteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["article", id] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};
