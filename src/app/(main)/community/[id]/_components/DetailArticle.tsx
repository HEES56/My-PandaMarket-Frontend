"use client";

import { useParams, notFound } from "next/navigation";
import { useArticleById } from "@/api/article/articleHook";
import DetailArticleBoard from "./DetailArticleBoard";
import CommentList from "@/shared/components/comment/CommentList";

export default function DetailArticle() {
  const { id } = useParams();
  const safeId = typeof id === "string" ? id : undefined;

  const { data: article, isPending, error } = useArticleById(safeId);

  if (!safeId) {
    notFound();
  }

  if (isPending) {
    return <p className="text-center pt-10">게시글을 불러오는 중입니다...</p>;
  }

  if (error || !article) {
    return (
      <p className="text-center pt-10 text-red-500">
        게시글을 불러오지 못했습니다.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <DetailArticleBoard article={article} />{" "}
      <CommentList type="article" targetId={article.id} />
    </div>
  );
}
