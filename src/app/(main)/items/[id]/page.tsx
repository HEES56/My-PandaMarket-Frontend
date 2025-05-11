"use client";

import ClientLayout from "@/shared/components/Layout/ClientLayout";
import DetailProduct from "./_components/DetailProduct";

export const dynamic = "force-dynamic";

export default function ProductDetailPage() {
  return (
    <ClientLayout>
      <DetailProduct />
    </ClientLayout>
  );
}
