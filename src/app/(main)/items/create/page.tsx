"use client";
import ClientLayout from "@/shared/components/Layout/ClientLayout";
import ProductForm from "../_components/ProductForm";

export default function CreateProductPage() {
  return (
    <ClientLayout>
      <ProductForm category="create" />
    </ClientLayout>
  );
}
