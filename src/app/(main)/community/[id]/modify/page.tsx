"use client";
import { useParams } from "next/navigation";
import ArticleForm from "../../_components/ArticleForm";
import ClientLayout from "@/shared/components/Layout/ClientLayout";
import { useArticleById } from "@/api/article/articleHook";

export default function ModifyPage() {
  const { id } = useParams();
  const { data, isPending, error } = useArticleById(id as string);

  if (isPending) return <p className="pt-10 text-center">불러오는 중...</p>;
  if (error || !data)
    return (
      <p className="pt-10 text-center text-red-500">
        게시글을 불러오지 못했습니다.
      </p>
    );

  return (
    <ClientLayout>
      <ArticleForm category="edit" initialData={data} />
    </ClientLayout>
  );
}
