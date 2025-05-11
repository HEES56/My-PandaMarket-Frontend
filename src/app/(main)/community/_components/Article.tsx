"use client";

import BestArticles from "./BestArticles";
import ArticleContainer from "./ArticleContainer";

export default function Article() {
  return (
    <div className="flex flex-col gap-6">
      <BestArticles />
      <ArticleContainer />
    </div>
  );
}
