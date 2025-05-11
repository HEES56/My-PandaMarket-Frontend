"use client";

import { useParams } from "next/navigation";
import ProductForm from "../../_components/ProductForm";
import { useProductById } from "@/api/product/productHooks";

export default function ModifyProductPage() {
  const { id } = useParams();
  const { data, isPending, error } = useProductById(id as string);

  if (isPending) return <p className="pt-10 text-center">불러오는 중...</p>;
  if (error || !data)
    return (
      <p className="pt-10 text-center text-red-500">
        상품을 불러오지 못했습니다.
      </p>
    );

  return <ProductForm category="edit" initialData={data} />;
}
