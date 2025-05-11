"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import searchIcon from "@/shared/assets/Img/input-icon/ic_search.png";
import Link from "next/link";

import ProductList from "./ProductList";
import ProductSkeleton from "./ProductSkeleton";
import Pagination from "@/shared/components/pageNation/PageNation";
import SortDropDown from "@/shared/components/dropDown/SortDropDown";
import { useProducts } from "@/api/product/productHooks";

export default function ProductContainer() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"recent" | "favorites">("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  useEffect(() => {
    const updateProductsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1280) setProductsPerPage(10);
      else if (width >= 768) setProductsPerPage(8);
      else setProductsPerPage(4);
    };

    updateProductsPerPage();

    window.addEventListener("resize", updateProductsPerPage);
    return () => window.removeEventListener("resize", updateProductsPerPage);
  }, []);

  const { data, isPending, error } = useProducts({
    page: currentPage,
    sort: sortOrder,
    search,
    limit: productsPerPage,
  });

  const products = data?.products || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / productsPerPage);

  if (error) {
    return (
      <p className="text-center text-red-500">상품을 불러오지 못했습니다.</p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <section className="flex justify-between">
        <p className="text-xl text-custom-text-black-800 font-bold text-nowrap">
          판매 중인 상품
        </p>
        <Link
          href="/items/create"
          className="px-6 py-2 text-nowrap bg-custom-color-blue text-base text-white font-semibold rounded-lg"
        >
          상품 등록하기
        </Link>
      </section>

      <section className="relative flex gap-[13px] md:gap-[6px] xl:gap-[16px]">
        <input
          type="text"
          placeholder="검색할 상품을 입력해주세요"
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
        {isPending ? <ProductSkeleton /> : <ProductList products={products} />}
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
