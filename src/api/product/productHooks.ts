import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  fetchProductById,
  fetchProducts,
  likeProduct,
  unlikeProduct,
  updateProduct,
} from "./productApi";

interface UseProductsParams {
  page: number;
  sort: "recent" | "favorites";
  search: string;
  limit: number;
}

export const useProducts = ({
  page,
  sort,
  search,
  limit,
}: UseProductsParams) => {
  return useQuery({
    queryKey: ["products", page, sort, search, limit],
    queryFn: () => fetchProducts({ page, sort, search, limit }),
    placeholderData: (prev) => prev,
  });
};
export const useProductById = (id?: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id as string),
    enabled: !!id,
  });
};

export const useCreateProduct = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      options?.onSuccess?.();
    },
  });
};

export const useEditProduct = (
  id: string,
  options?: { onSuccess?: (id: string) => void }
) => {
  const queryClient = useQueryClient();
  return useMutation<string, Error, FormData>({
    mutationFn: (formData: FormData) => updateProduct(id, formData),
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      options?.onSuccess?.(id);
    },
  });
};

export const useLikeProduct = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likeProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });
};

export const useUnlikeProduct = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => unlikeProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });
};
