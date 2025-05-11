"use client";

import { useEffect, useState, useCallback } from "react";
import ProductCard from "./ProductCard";
import { useProducts } from "@/api/product/productHooks";
import BestSkeleton from "./BestSkeleton";

export default function BestProducts() {
  const { data, isPending } = useProducts({
    page: 1,
    limit: 100,
    sort: "favorites",
    search: "",
  });
  const [visibleCount, setVisibleCount] = useState(1);

  const updateVisibleCount = useCallback(() => {
    const width = window.innerWidth;
    if (width >= 1280) setVisibleCount(4);
    else if (width >= 768) setVisibleCount(2);
    else setVisibleCount(1);
  }, []);

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [updateVisibleCount]);

  const bestProducts = [...(data?.products ?? [])]
    .sort((a, b) => (b.favoriteCount ?? 0) - (a.favoriteCount ?? 0))
    .slice(0, visibleCount);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-custom-text-black-800">
        베스트 상품
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6 w-full">
        {isPending
          ? Array.from({ length: visibleCount }).map((_, i) => (
              <BestSkeleton key={i} />
            ))
          : bestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
