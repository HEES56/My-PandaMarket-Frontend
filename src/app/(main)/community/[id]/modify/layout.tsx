"use client";

import ClientLayout from "@/shared/components/Layout/ClientLayout";

export default function ArticleModifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
