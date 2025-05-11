import Image from "next/image";
import Link from "next/link";
import likeImg from "@/shared/assets/Img/button-image/Like_Icon.png";

import medal from "@/shared/assets/Img/ic_medal.png";
import { formatDay, getImageUrl } from "@/lib/utill";
import { Article } from "@/types/types";
import ImageWrapper from "@/shared/components/ImageWrapper/ImageWrapper";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/community/${article.id}`}
      className="flex flex-col w-full bg-custom-color-card-gray px-[24px] pb-[16px] gap-[16px]"
    >
      <section className="flex justify-center w-[102px] py-[2px] bg-custom-color-blue rounded-b-2xl gap-[5px]">
        <Image
          src={medal}
          alt="medal Icon"
          className="w-[14px] object-contain"
        />
        <p className="text-base font-semibold text-white">Best</p>
      </section>

      <div className="flex flex-col gap-[40px] xl:gap-[18px]">
        <section className="flex justify-between ">
          <p className="text-lg text-custom-text-gray-800 font-semibold">
            {article.title}
          </p>
          <ImageWrapper
            src={getImageUrl(article.imageUrls?.[0])}
            alt="상품 Image"
            width={64}
            height={75}
            className="object-contain"
          />
        </section>

        <section className="flex justify-between ">
          <div className="flex gap-[8px]">
            <p className="text-sm text-custom-text-gray-400 font-normal">
              {article.user?.nickname ?? "알 수 없음"}
            </p>
            <div className="flex items-center gap-[4px]">
              <Image
                src={likeImg}
                alt="like Icon"
                className="w-[13px] object-contain"
              />
              <p className="text-sm text-custom-text-gray-200 font-normal">
                {(article.favoriteCount ?? 0) + "+"}
              </p>
            </div>
          </div>
          <p className="text-sm text-custom-text-gray-50 font-normal">
            {formatDay(article.createdAt)}
          </p>
        </section>
      </div>
    </Link>
  );
}
