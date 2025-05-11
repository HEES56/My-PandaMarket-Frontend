"use client";

import ClientLayout from "@/shared/components/Layout/ClientLayout";

export default function ProductModifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
