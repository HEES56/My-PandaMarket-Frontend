"use client";

import BestProducts from "./BestProducts";
import ProductContainer from "./ProductContainer";

export default function Product() {
  return (
    <div className="flex flex-col w-full gap-6">
      <BestProducts />
      <ProductContainer />
    </div>
  );
}
