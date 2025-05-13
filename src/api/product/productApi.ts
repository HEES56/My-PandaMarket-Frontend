import { Product } from "@/types/types";
import { customFetch } from "../url";

interface FetchProductsParams {
  page: number;
  sort: "recent" | "favorites";
  search: string;
  limit: number;
}

export const fetchProducts = async ({
  page,
  sort,
  search,
  limit,
}: FetchProductsParams): Promise<{
  products: Product[];
  totalCount: number;
}> => {
  const res = await customFetch(`/products`, {
    params: {
      page,
      limit,
      sortBy: sort,
      search,
    },
  });

  if (!res.ok) {
    throw new Error("상품 목록을 불러오지 못했습니다.");
  }

  return res.json();
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await customFetch(`/products/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ 상품 조회 실패:", errorText);
    throw new Error("상품을 불러오는 데 실패했습니다.");
  }

  return res.json();
};

export const createProduct = async (formData: FormData): Promise<void> => {
  const res = await customFetch("/products", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("상품 등록 실패");
};

export const updateProduct = async (
  id: string,
  formData: FormData
): Promise<string> => {
  const res = await customFetch(`/products/${id}`, {
    method: "PATCH",
    body: formData,
  });

  if (!res.ok) throw new Error("상품 수정 실패");
  return id;
};

export const deleteProduct = async (productId: string): Promise<void> => {
  const res = await customFetch(`/products/${productId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("상품 삭제 실패");
  }
};

export const likeProduct = async (id: string): Promise<void> => {
  const res = await customFetch(`/products/${id}/favorite`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("상품 좋아요 실패");
};

export const unlikeProduct = async (id: string): Promise<void> => {
  const res = await customFetch(`/products/${id}/favorite`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("상품 좋아요 취소 실패");
};

export const uploadImageToS3 = async (file: File): Promise<string> => {
  const fileType = file.type;
  const fileName = file.name;
  console.log("📦 Uploading file:", file.name, fileType);
  const res = await customFetch(
    `/products/presigned-url?fileType=${encodeURIComponent(
      fileType
    )}&fileName=${encodeURIComponent(fileName)}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error("Presigned URL 요청 실패");
  }

  const { uploadUrl, fileUrl } = await res.json();

  if (!uploadUrl || !fileUrl) {
    throw new Error("Presigned 응답에 URL 또는 Key 없음");
  }

  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": fileType },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error("S3 업로드 실패");
  }

  return fileUrl;
};
