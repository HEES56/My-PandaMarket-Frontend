"use client";

import Image from "next/image";
import Link from "next/link";
import userIcon from "@/shared/assets/Img/user-icon/ic_profile.png";
import likeIcon from "@/shared/assets/Img/button-image/Like_Icon.png";
import { formatDay, getImageUrl } from "@/lib/utill";
import { Article } from "@/types/types";
import ImageWrapper from "@/shared/components/ImageWrapper/ImageWrapper";

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles = [] }: ArticleListProps) {
  return (
    <div className="flex flex-col gap-6">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/community/${article.id}`}
          className="flex flex-col w-full gap-6 bg-custom-color-list-gray border-b border-custom-color-border-gray pb-6"
        >
          <section className="flex justify-between items-start">
            <p className="text-xl font-semibold text-custom-text-gray-800">
              {article.title}
            </p>
            <ImageWrapper
              src={getImageUrl(article.imageUrls?.[0])}
              alt="게시글 이미지"
              width={64}
              height={50}
              className="object-cover rounded-md"
            />
          </section>

          <section className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image src={userIcon} alt="유저 아이콘" className="w-6 h-6" />
              <p className="text-sm text-custom-text-gray-400">
                {article.user?.nickname || "알 수 없음"}
              </p>
              <p className="text-sm text-custom-text-gray-50">
                {formatDay(article.createdAt)}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <Image src={likeIcon} alt="좋아요 아이콘" className="w-5 h-5" />
              <p className="text-base font-normal text-custom-text-gray-200">
                {article.favoriteCount ?? 0}+
              </p>
            </div>
          </section>
        </Link>
      ))}
    </div>
  );
}
