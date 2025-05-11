"use client";

import ClientLayout from "@/shared/components/Layout/ClientLayout";
import ArticleForm from "../_components/ArticleForm";

export default function CreateArticlePage() {
  return (
    <ClientLayout>
      <ArticleForm category="create" />
    </ClientLayout>
  );
}
