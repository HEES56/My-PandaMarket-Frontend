"use client";

import { useParams, notFound } from "next/navigation";
import { useProductById } from "@/api/product/productHooks";
import DetailProductBoard from "./DetailProductBoard";
import CommentList from "@/shared/components/comment/CommentList";

export default function DetailProduct() {
  const { id } = useParams();
  const safeId = typeof id === "string" ? id : undefined;

  const { data: product, isPending, error } = useProductById(safeId);

  if (!safeId) return notFound();

  if (isPending) {
    return <p className="pt-10 text-center">상품을 불러오는 중입니다...</p>;
  }

  if (error || !product) {
    return (
      <p className="pt-10 text-center text-red-500">
        상품 정보를 불러오지 못했습니다.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-10 ">
      <DetailProductBoard product={product} />
      <CommentList type="product" targetId={product.id} />
    </div>
  );
}
