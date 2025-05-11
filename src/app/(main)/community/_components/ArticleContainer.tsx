"use client";

import { useState } from "react";
import Image from "next/image";
import searchIcon from "@/shared/assets/Img/input-icon/ic_search.png";
import { useArticles } from "@/api/article/articleHook";
import Pagination from "@/shared/components/pageNation/PageNation";
import SortDropDown from "@/shared/components/dropDown/SortDropDown";
import ProductSkeleton from "./ArticleSkeleton";
import Link from "next/link";
import { PATH } from "@/constants";
import ArticleList from "./ArticleList";

const ARTICLES_PER_PAGE = 5;

export default function ArticleContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"recent" | "favorites">("recent");

  const { data, isPending } = useArticles(
    currentPage,
    ARTICLES_PER_PAGE,
    sortOrder,
    search
  );
  const articles = data?.articles ?? [];
  const totalCount = data?.totalCount ?? 0;

  const totalPages = Math.ceil(totalCount / ARTICLES_PER_PAGE);

  return (
    <div className="flex flex-col gap-2">
      <section className="flex justify-between items-center">
        <p className="text-xl text-custom-text-black-800 font-bold text-nowrap">
          게시글
        </p>
        <Link
          href={`${PATH.community}/create`}
          className="px-6 py-2 text-nowrap bg-custom-color-blue text-base text-white font-semibold rounded-lg "
        >
          글쓰기
        </Link>
      </section>

      <section className="relative flex gap-[13px] md:gap-[6px] xl:gap-[16px]">
        <input
          type="text"
          placeholder="검색할 게시글을 입력해주세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-[40px] py-[9px] bg-custom-input-gray-100 rounded-xl focus:outline-none"
        />
        <Image
          src={searchIcon}
          alt="검색 아이콘"
          width={24}
          className="absolute w-[24px] left-[16px] top-1/2 transform -translate-y-1/2"
        />
        <SortDropDown value={sortOrder} onChange={setSortOrder} />
      </section>

      <section>
        {isPending ? <ProductSkeleton /> : <ArticleList articles={articles} />}
      </section>

      <section className="flex justify-center mt-4">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </section>
    </div>
  );
}
