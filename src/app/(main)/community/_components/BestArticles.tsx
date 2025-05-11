"use client";

import { useState, useEffect, useCallback } from "react";
import BestSkeleton from "./BestSkeleton";
import ArticleCard from "./ArticleCard";
import { useArticles } from "@/api/article/articleHook";

export default function BestArticles() {
  const [maxArticles, setMaxArticles] = useState(1);
  const { data, isPending } = useArticles(1, 100, "favorites", "");
  const articles = data?.articles ?? [];

  const updateMaxArticles = useCallback(() => {
    const width = window.innerWidth;
    if (width >= 1280) setMaxArticles(3);
    else if (width >= 768) setMaxArticles(2);
    else setMaxArticles(1);
  }, []);

  useEffect(() => {
    updateMaxArticles();
    window.addEventListener("resize", updateMaxArticles);
    return () => window.removeEventListener("resize", updateMaxArticles);
  }, [updateMaxArticles]);

  const bestArticles = Array.isArray(articles)
    ? [...articles]
        .sort((a, b) => (b.favoriteCount ?? 0) - (a.favoriteCount ?? 0))
        .slice(0, maxArticles)
    : [];

  return (
    <div className="flex flex-col items-start gap-6">
      <h2 className="text-xl text-custom-text-black-800 font-bold">
        베스트 게시글
      </h2>

      <div className="flex w-full md:gap-4 xl:gap-6">
        {isPending
          ? Array.from({ length: maxArticles }).map((_, i) => (
              <BestSkeleton key={i} />
            ))
          : bestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
      </div>
    </div>
  );
}
